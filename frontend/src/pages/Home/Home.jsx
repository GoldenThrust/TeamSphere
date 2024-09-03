// import Footer from './footer';
import Header from "./header";
import Footer from "./footer";
import "../../styles/header.css";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import realTimeImage from "../../assets/realTime.png";
import secureImage from "../../assets/secure.png";
import userfriendlyImage from "../../assets/userfriendly.png";
import { useAuth } from "../../context/useContext";


const Item = styled(Typography)(() => ({
  fontSize: "2rem",
  fontWeight: "lighter",
}));

function Home() {
  const auth = useAuth();

  return (
    <>
      <div id="home">
        <Header />
        <Typography
          variant="h2"
          sx={{ width: "50%", marginTop: "20px", lineHeight: 1.8 }}
          gutterBottom
        >
          Streamline <br />
          Your Team collaboration Effortlessly
        </Typography>
        <Typography variant="body1" sx={{ color: "grey" }}>
          Elevate Your Teamwork to New Heights
        </Typography>
        {auth?.isLoggedIn && auth?.user ? (
          <Button
            className="button"
            variant="contained"
            sx={{
              marginTop: "20px",
              borderRadius: "0 50px 50px",
              height: "50px",
            }}
            href="create"
          >
            Create Meeting
          </Button>
        ) : (
          <Button
            className="button"
            variant="contained"
            sx={{
              marginTop: "20px",
              borderRadius: "0 50px 50px",
              height: "50px",
            }}
            href="signup"
          >
            Get Started
          </Button>
        )}
        <div className="features">
          <Typography
            variant="h2"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10ch",
              fontWeight: "400",
            }}
            id="features"
          >
            Features That Drive Success
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid xs={6}>
                <img src={realTimeImage} alt="Real Time" />
              </Grid>
              <Grid xs={6} sx={{ marginTop: "10ch" }}>
                <Typography variant="h3">Real-Time Collaboration</Typography>
                <Item>
                  Work together in real-time, <br /> no matter where your team
                  members are located, with
                  <br /> seamless and instant communication <br /> and sharing.
                </Item>
              </Grid>
              <Grid xs={6} sx={{ marginTop: "10ch" }}>
                <Typography variant="h3">User-Friendly Interface</Typography>
                <Item>
                  Intuitive design and user-friendly <br />
                  interface make it easy for <br />
                  everyone to participate and <br /> contribute, regardless of
                  technical <br />
                  expertise.
                </Item>
              </Grid>
              <Grid xs={6}>
                <img src={userfriendlyImage} alt="User friendly" />
              </Grid>
              <Grid xs={6}>
                <img src={secureImage} alt="secure" />
              </Grid>
              <Grid xs={6} sx={{ marginTop: "10ch" }}>
                <Typography variant="h3">Secure and Reliable</Typography>
                <Item>
                  Rest assured knowing that your data
                  <br /> is safe and your communication
                  <br /> is secure with our robust security
                  <br /> measures and reliable infrastructure.
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
