import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "../../styles/videocontainer.css";
import Peer from "simple-peer";
import Head from "./Header";
import Foot from "./Foot";

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
    ref.current.srcObject = peer.streams[0];
  }, [peer, peer._connected]);

  return (
    <div className="video-item">
      <video playsInline autoPlay ref={ref} />
    </div>
  );
};

export default function Room() {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const ReturnSignal = useRef([]);
  const navigate = useNavigate();
  const { roomID } = useParams();
  const socket = io("https://teamsphere-ckxa.onrender.com", {
  // const socket = io("http://localhost:5000", {
    withCredentials: true,
    query: {
      roomId: roomID,
      token: localStorage.getItem("token")
    },
  });

  
  useEffect(()=> {
    console.log(peers)
  }, [peers])

  useEffect(() => {
    document.body.style.overflow = "hidden";
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1920, height: 1080 }, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socket.emit("joinroom", roomID);
        socket.on("connectedUsers", (users) => {
          const peers = [];
          users.forEach(({ socketID }) => {
            const peerExists = peersRef.current.some(
              (peer) => peer.peerID === socketID
            );
            if (peerExists) {
              return;
            }

            const peer = createPeer(socketID, socket.id, stream);
            peersRef.current.push({
              peerID: socketID,
              peer,
            });

            peers.push(peer);
          });
          setPeers(peers);
        });

        socket.on("userJoined", ({ signal, callerID }) => {
          const peerExists = peersRef.current.some(
            (peer) => peer.peerID === callerID
          );
          if (peerExists) {
            return;
          }

          const peer = addPeer(signal, callerID, stream);
          peersRef.current.push({
            peerID: callerID,
            peer,
          });

          setPeers((prevPeers) => [...prevPeers, peer]);
        });

        socket.on("receiveReturnSignal", ({ signal, id }) => {
          const item = peersRef.current.find((p) => p.peerID === id);

          if (ReturnSignal.current.includes(item.peerID)) {
            console.log(item, "Return signal");
            return;
          }

          if (item) {
            ReturnSignal.current.push(item.peerID);
            item.peer.signal(signal);
          }
        });
      });

    socket.on("alreadyinroom", (user) => {
      console.log("You are already in this room", user);
    });

    socket.on("roomfull", () => {
      console.log("Room is full");
    });

    socket.on("notauthorized", () => {
      return navigate("/login");
    });

    return () => {
      document.body.style.overflow = "auto";
    };
  });

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("sendSignal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returnSignal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function handleCallEnd() {
    socket.emit("endcall");
    navigate("/create");
  }

  socket.on("receiveEndCall",({ id })=> {
    console.log("Received")
    const item = peersRef.current.find((p) => p.peerID === id);

    console.log(item)
    if (item) {
      item.peer.destroy();
      console.log("beforeDestroy", peersRef.current.length, peers.length)
      peersRef.current = peersRef.current.filter((p) => p.peerID !== id);
      setPeers((prevPeers) => prevPeers.filter((p) => p.peerID !== id));
      console.log("AfterDestroy", peersRef.current.length, peers.length)
    }
  })

  return (
    <>
      <div className="body">
        <span style={{ width: "100%" }}>
          <Head />
        </span>
        <div className="video-grid">
          <div className="video-item">
            <video ref={userVideo} autoPlay playsInline></video>
          </div>
          {peersRef.current.map(({peer, peerID}) => {
            return <Video peer={peer} key={peerID} />;
          })}
        </div>
        <span
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Foot onCallEnd={handleCallEnd} />
        </span>
      </div>
    </>
  );
}
