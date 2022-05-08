import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import Colors from '../../colors/Colors';
import {
  SiBmw,
  SiFerrari,
  SiTesla,
  SiLamborghini,
  SiMercedes,
  SiBugatti,
  SiLandrover,
  SiJaguar
} from "react-icons/si";

import BrandCard from "./BrandCard";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    paddingLeft: "2em",
    paddingRight: "2em",
    paddingTop: "1em",
    paddingBottom: "10em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "1em",
      paddingRight: "1em",
      paddingTop: "1em",
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
      paddingTop: "0.5em",
    },
  },
}));
const icons = [
  { name: SiBmw, brand: "BMW", category: "Cars" },
  { name: SiFerrari, brand: "Ferrari", category: "Cars" },
  { name: SiTesla, brand: "Tesla", category: "Cars" },
  { name: SiLamborghini, brand: "Lamborghini", category: "Cars" },
  { name: SiMercedes, brand: "Mercedes-Benz", category: "Cars" },
  { name: SiBugatti, brand: "Bugatti", category: "Cars" },
  { name: SiJaguar, brand: "Jaguar", category: "Cars" },
  { name: SiLandrover, brand: "Landrover", category: "Cars" },
];

function ProductBrand(props) {
  const classes = useStyles();

  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.rowContainer}
    >
      <Grid item style={{ marginBottom: "5em", marginTop: "2em" }}>
        <Typography variant="h4" align="center">
          Brands
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={3}
      >
        {icons &&
          icons.map((doc, idx) => (
            <Grid item key={idx}>
              <Button
                onClick={() =>
                  navigate(`/category/${doc.category}/${doc.brand}`)
                }
              >
                <BrandCard icon={doc.name} />
              </Button>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default ProductBrand;
