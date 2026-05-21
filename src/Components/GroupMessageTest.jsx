// GroupMessageTest.jsx
import { Grid } from "@mui/material";
import React from "react";

const GroupMessageTest = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Grid container sx={{ height: "100%", width: "100%" }}>
        <Grid
          item
          xs={4}
          sx={{
            background: "#fa1d09",
            height: "100%",
          }}
        />

        <Grid
          item
          xs={8}
          sx={{
            background: "#25f139",
            height: "100%",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xs={4}
              sx={{
                height: "200px",
                background: "#5d1509",
              }}
            />

            <Grid
              item
              xs={8}
              sx={{
                height: "200px",
                background: "#000000",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default GroupMessageTest;