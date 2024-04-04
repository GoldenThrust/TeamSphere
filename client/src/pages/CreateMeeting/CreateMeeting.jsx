
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { v1 as uuid } from "uuid";

export default function CreateMeeting() {
  const auth = useAuth();
  const navigate = useNavigate();

  const HandClick = () => {
    const id = uuid();
    navigate(`/room/${id}`);
  }

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
            <Link to={"/"}>
              <img src="/TeamSphere.svg" alt="TeamSphere Logo" />
            </Link>
          </div>
        </header>
        <main className="center">
          <Typography
            component="h1"
            variant="h3"
            sx={{ textAlign: "center", margin: "auto" }}
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
              onClick={HandClick}
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
