// import Footer from './footer';
import Header from "./header";
import "../../styles/header.css";
import { Typography } from "@mui/material";

function Home() {
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
        <div className="features">
          <Typography variant="h3" sx={{ margin: "auto" }}>
            Features That Drive Success
          </Typography>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Home;
