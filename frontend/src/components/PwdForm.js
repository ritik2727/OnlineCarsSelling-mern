import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import axios from "axios";
import Colors from "./Colors";

const PwdForm = ({ email }) => {
  //   const [email, setEmail] = useState("");
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [otpForm, showForm] = useState(true);
  const [errors, setErrors] = useState();
  const [formErrors, setFormErrors] = useState({}); //error

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

  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     dispatch(login(email, password));
  //   };

  const handleChnagePwd = async (e) => {
    setloginfailure(false);
    e.preventDefault();
    // console.log(formData);

    // console.log(errorStatus);

    let data = {
      email: email,
      otpCode: otp,
      password: password,
      cpassword:cpassword
    };
    console.log(data);
    validate(data);
    // // console.log(data2);
    if (!errorStatus) {
      console.log("api hitting");
      await axios
        .post("/api/users/change-password", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("suceee", res.data.message);
          navigate(redirect ? `/login?redirect=${redirect}` : "/login")
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
    if (!data.otpCode) {
      errors.otpCode = "OTP is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    if (data.password !== data.cpassword) {
      errors.cpassword = "Password does not match";
      // setFormErrors({...formErrors, password2: errors.password2})
    }
    setFormErrors(errors);
    console.log(errors)
    // console.log(Object.entries(errors).length);
    if (Object.entries(errors).length > 0) errorStatus = true;
    console.log(errorStatus);
    return errors;
  };

  return (
    <>
      {loginfailure && <Message variant="danger">{errors}</Message>}
    
      <Form onSubmit={handleChnagePwd}>
        <Form.Group controlId="email" style={{ marginBottom: "1em" }}>
          <Form.Label style={{ color: Colors.white }}>OTP Code</Form.Label>
          <Form.Control
            // type='otp'
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            // ref={emailRef}
          ></Form.Control>
        </Form.Group>

        {formErrors?.otpCode && (
          <div style={{color:'red'}}>{formErrors.otpCode}</div>
        )
        }
    

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
          <div style={{color:'red'}}>{formErrors.password}</div>
        )}

        <Form.Group controlId="password" style={{ marginBottom: "1em" }}>
          <Form.Label style={{ color: Colors.white }}>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Confirm password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {formErrors?.cpassword && (
          <div style={{color:'red'}}>{formErrors.cpassword}</div>
        )}

        <Button type="submit" variant="primary" style={{ marginTop: 10,backgroundColor:Colors.orange }}>
          change Password
        </Button>
      </Form>
    </>
  );
};

export default PwdForm;
