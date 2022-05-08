import React, { useState, useEffect } from 'react'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { Typography } from '@mui/material'
import Colors from '../components/Colors'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const [errors, setErrors] = useState();
  const [formErrors, setFormErrors] = useState({}); //error

  let errorStatus = false;
  const [loginfailure, setloginfailure] = useState(false);

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    setloginfailure(false);
    e.preventDefault()
    let data = {
      name:name,
      email: email,
      password: password,
      confirmPassword:confirmPassword
    };
    validate(data);
    if (!errorStatus) {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }
  }

  const validate = (data) => {
    const errors = {};
    const email_regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Password does not match";
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
    <FormContainer>
      <Typography variant="h4" style={{ marginBottom: "1.5em"}}>Sign Up</Typography>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name' style={{ marginBottom: "1em" }}>
          <Form.Label style={{ color: Colors.white }}>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {formErrors?.name && (
          <div style={{color:'red'}}>{formErrors.name}</div>
        )
        }

        <Form.Group controlId='email' style={{ marginBottom: "1em" }}>
          <Form.Label style={{ color: Colors.white }}>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {formErrors?.email && (
          <div style={{color:'red'}}>{formErrors.email}</div>
        )
        }

        <Form.Group controlId='password' style={{ marginBottom: "1em" }}>
          <Form.Label style={{ color: Colors.white }}>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {formErrors?.password && (
          <div style={{color:'red'}}>{formErrors.password}</div>
        )
        }

        <Form.Group controlId='confirmPassword' style={{ marginBottom: "1em" }}>
          <Form.Label style={{ color: Colors.white }}>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {formErrors?.confirmPassword && (
          <div style={{color:'red'}}>{formErrors.confirmPassword}</div>
        )
        }

        <Button type='submit' variant='primary' style={{marginTop:10,backgroundColor:Colors.orange}}>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col style={{ color: Colors.SubWhite }}>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} style={{ color: Colors.SubWhite }}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen