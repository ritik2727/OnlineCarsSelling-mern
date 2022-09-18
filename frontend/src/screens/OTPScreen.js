import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import axios from "axios";
import PwdForm from "../components/PwdForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
import Colors from "../components/Colors";

const OTPScreen = () => {
  //   const [email, setEmail] = useState("");
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  // setOtp(443343);
  const [cpassword, setCPassword] = useState("");
  const [otpForm, showForm] = useState(true);
  // int a = 4;
  // a =5;

  const [formErrors, setFormErrors] = useState({}); //error
  const [errors, setErrors] = useState();
  let errorStatus = false;
  const [loginfailure, setloginfailure] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = async (e) => {
   
    setloginfailure(false);
    e.preventDefault();

    let data = {
      email: emailRef.current.value,
    };
    validate(data);
    console.log(data);
    if (!errorStatus) {
      await axios
        .post("/api/users/email-send", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("suceee", res.data.message);
          toast.success("OTP sent")
          showForm(false);
        })
        .catch((error) => {
          console.log("ERRor", error.response.data.message);
          setErrors(error.response.data.message);
          setloginfailure(true);
        });
    }
  }; 

  const validate = (data) => {
    const errors = {};
    const email_regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!data.email) {
      errors.email = "Email is required";
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
      <ToastContainer />
      <Typography variant="h4" style={{ marginTop: 50,marginBottom:'1.5em' }}>Reset Password</Typography>
      {loginfailure && <Message variant="danger">{errors}</Message>}
      {formErrors?.email && (
        <Message variant="danger">{formErrors.email}</Message>
      )}
      {loading && <Loader />}
      {otpForm ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email" style={{ marginBottom: "1em" }}>
            <Form.Label style={{ color: Colors.white }}>Enter recovery email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
            ></Form.Control>
          </Form.Group>

          {/* <h1 style={{color:'red'}}>{formErrors.email}</h1> */}

          <Button type="submit" variant="primary" style={{ marginTop: 10,backgroundColor:Colors.orange }}>
            Send OTP
          </Button>
        </Form>
      ) : (
        <PwdForm email={emailRef.current.value} />
      )}

      <Row className="py-3">
        <Col >
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} style={{ color: Colors.SubWhite }}>
            Back To Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default OTPScreen;
