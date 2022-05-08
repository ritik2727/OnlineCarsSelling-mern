import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import LoginWithGoogle from "../components/LoginWithGoogle";
import "../StylesUI.css";
import DividerWithText from "../components/DividerWithText";
import { Grid } from "@mui/material";
import LoginWithFb from "../components/LoginWithFb";
import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import Colors from "../components/Colors";

const LoginScreen = () => {
  // const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState();
  const [formErrors, setFormErrors] = useState({}); //error

  let errorStatus = false;
  const [loginfailure, setloginfailure] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    setloginfailure(false);

    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    validate(data);
    if (!errorStatus) {
      dispatch(login(email, password));
    }
  };

  const validate = (data) => {
    const errors = {};
    const email_regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);
    console.log(errors);
    // console.log(Object.entries(errors).length);
    if (Object.entries(errors).length > 0) errorStatus = true;
    console.log(errorStatus);
    return errors;
  };

  return (
    <FormContainer>
      <Typography variant="h4" style={{ marginBottom: "1.5em" }}>
        Sign In
      </Typography>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" style={{ marginBottom: "1em" }}>
          <Form.Label style={{ color: Colors.white }}>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {formErrors?.email && (
          <div style={{ color: "red" }}>{formErrors.email}</div>
        )}

        <Form.Group controlId="password" style={{ marginBottom: "1em" }}>
          <Form.Label style={{ color: Colors.white }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {formErrors?.password && (
          <div style={{ color: "red" }}>{formErrors.password}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          style={{ marginTop: 10, backgroundColor: Colors.orange }}
        >
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          <Link
            style={{ color: Colors.SubWhite }}
            to={
              redirect
                ? `/reset-password?redirect=${redirect}`
                : "/reset-password"
            }
          >
            Forgot password ?
          </Link>
        </Col>
        <Col style={{color:Colors.SubWhite}}>
          New Customer?{" "}
          <Link style={{color:Colors.SubWhite}} to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
      <>
        <div>
          <div className="flex items-center justify-center mt-3">
            <DividerWithText>OR</DividerWithText>
            {/* <div className="divideV h-1 w-28 bg-gray-600 mt-1" style={{height:'0.5px',color:'red'}}></div>
            &nbsp; OR &nbsp;
            <div className="divideV h-1 w-28 bg-gray-600 mt-1"></div>
          </div> */}
          </div>
        </div>

        <Grid
          container
          direction={matchesMD ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item style={{ marginTop: "1em", marginBottom: "1em" }}>
            <LoginWithGoogle />
            {/* <GoogleSocialAuth /> */}
          </Grid>

          <Grid item style={{ marginTop: "1em", marginBottom: "1em" }}>
            {/* <LoginWithGoogle /> */}
            <LoginWithFb />
            {/* <FacebookSocialAuth /> */}
          </Grid>
        </Grid>
      </>
    </FormContainer>
  );
};

export default LoginScreen;
