// import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "../../context/useContext";
import { useNavigate } from "react-router-dom";

export default function Room() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      return navigate("/login");
    }
  }, [auth, navigate]);


  return (
    <div style={{ flexGrow: 1 }}>
    </div>
  );
}

      // <Grid container spacing={2}>
      //   {participants.map((participant, index) => (
      //     <Grid item xs={12 / numCols} key={index}>
      //       {/* Render video element for each participant */}
      //       <video src={participant.videoStream} autoPlay={true} />
      //     </Grid>
      //   ))}
      // </Grid>