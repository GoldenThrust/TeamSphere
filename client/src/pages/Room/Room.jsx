//@ts-nocheck
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
// import { useAuth } from "../../context/useContext";
// import { useNavigate } from "react-router-dom";
import Peer from "simple-peer";

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <video playsInline autoPlay ref={ref} />;
};

export default function Room() {
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const { roomID } = useParams();
  const socket = io("http://localhost:5000", { withCredentials: true });

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socket.emit("joinroom", roomID);
        socket.on("connectedUsers", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socket.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socket.on("userJoined", ({ signal, callerID }) => {
          const peer = addPeer(signal, callerID, stream);
          peersRef.current.push({
            peerID: callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });

        socket.on("receiveReturnSignal", ({ signal, id }) => {
          const item = peersRef.current.find((p) => p.peerID === id);
          item.peer.signal(signal);
        });
      });

      socket.on("alreadyinroom", ()=> {
        console.log("You are already in this room")
      })

      socket.on("roomfull", ()=>{
        console.log("Room is full")
      })
  }, [roomID]);

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

  return (
    <Grid container spacing={2} style={{ padding: 20, height: "100vh" }}>
      <video ref={userVideo} autoPlay playsInline></video>
      {peers.map((peer, index) => {
        return (
          <Grid key={index} item xs={12} sm={6}>
            <Video peer={peer} />
          </Grid>
        );
      })}
    </Grid>
  );
}
