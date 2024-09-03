import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";

export default function Head() {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSoon = (event) => {
    alert("Coming Soon!");
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "-30px"}}>
      <Grid item xs={5}>
        <Typography
          variant="h6"
          component="h1"
          sx={{ color: "white", paddingLeft: "30px" }}
        >
          TeamSphere
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Sketch" onClick={handleSoon} className="tab" />
          <Tab label="Meet" className="tab" />
        </Tabs>
      </Grid>
    </Grid>
  );
}
