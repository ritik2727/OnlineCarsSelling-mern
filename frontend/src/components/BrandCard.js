import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";

import { AnimatedDiv } from "../components/animated";
import { Button, IconButton } from "@mui/material";
import Colors from "./Colors";

export default function BrandCard({ title, icon, id }) {
  // const { dt} = useContext(DarkThemeContext)
  // const [darkTheme] = dt;
  const Icon = icon;

  return (
    <AnimatedDiv
      style={{ borderRadius: 15 }}
      whileHover={{
        scale: 1.2,
        boxShadow: "0px 0px 8px #1976D2",
      }}
    >
      {/* <Button> */}
        <Box
          style={{ padding: "1em" }}
          sx={{
            width: 140,
            height: 140,
            borderRadius: 3,
            backgroundColor: "transprant",
            border: `1.7px solid ${Colors.orange} !important`,
            boxShadow: ` 0 8px 15px 0 ${Colors.orange} `,
            overflow: `hidden !important`,
            justifyContent:'center',
            alignItems:'center',
            // backgroundColor: "rgb(34 43 69)",
            // borderBottom: "#F037A5",
            // backgroundImage:
            //   "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
            // boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
          }}
        >
          <Icon
            style={{
              width: 100,
              height: 100,
              color:Colors.white
            }}
          />
        </Box>
      {/* </Button> */}
    </AnimatedDiv>
  );
}
