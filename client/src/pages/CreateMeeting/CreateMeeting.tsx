import TeamSphereLogo from "/TeamSphere.svg";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "../../context/useContext";
import { useNavigate } from "react-router-dom";

export default function CreateMeeting() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.isLoggedIn) {
      return navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <>
      <div id="body" style={{ padding: "20px" }}>
        <header>
          <div>
            <img src={TeamSphereLogo} alt="TeamSphere Logo" />
          </div>
        </header>
        <main className="center">
          <Typography
            component="h1"
            variant="h3"
            sx={{ textAlign: "center", margin: "auto"}}
          >
            Video calls and meetings are for everyone
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              margin: "30px auto",
              fontSize: "20px",
            }}
          >
            Team sphere provide you secure and easy-to-use video calls.
          </Typography>
          <Stack
            spacing={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="medium"
              className="button"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                height: "45px",
              }}
            >
              Create instant meeting
            </Button>
            <Button
              variant="contained"
              size="medium"
              className="button"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "50%",
                height: "45px",
              }}
            >
              Schedule a meeting
            </Button>
          </Stack>
        </main>
      </div>
    </>
  );
}