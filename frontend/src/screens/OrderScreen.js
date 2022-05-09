import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import Invoice from "../components/Invoice";
import Colors from "../components/Colors";
import { Typography } from "@mui/material";

const OrderScreen = () => {
  const params = useParams();
  const navigation = useNavigate();
  const orderId = params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigation("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      // console.log(clientId);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    orderId,
    successPay,
    order,
    successDeliver,
    userInfo,
    navigation,
  ]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const RupeesToDollor = (value) => {
    var dollars = (value / 73.0835).toFixed(2);
    return dollars;
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Typography variant="h4" style={{ marginBottom: "1.5em" }}>
        Order {order._id}
      </Typography>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item
              style={{
                backgroundColor: "rgb(34 43 69)",
                borderColor: Colors.SubWhite,
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                color: Colors.white,
              }}
            >
              {/* <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p> */}
              <Row className="d-flex flex-lg-row flex-md-row flex-sm-column flex-xs-column">
                <Col>
                  <h4>Shipping</h4>
                  <p>
                    <strong>Name: </strong> {order.user?.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{" "}
                    <a
                      href={`mailto:${order.user?.email}`}
                      style={{ color: Colors.white }}
                    >
                      {order.user?.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                </Col>
                {order.isPaid && (
                <Col className="d-flex justify-content-md-end align-items-start justify-content-sm-start">
                  <PDFDownloadLink
                    document={<Invoice order={order} />}
                    fileName="invoice.pdf"
                    className="btn btn-sm btn-primary"
                    style={{backgroundColor:Colors.orange}}
                  >
                    Download Invoice
                  </PDFDownloadLink>
                </Col>
                )}
              </Row>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item
              style={{
                backgroundColor: "rgb(34 43 69)",
                borderColor: Colors.SubWhite,
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                color: Colors.white,
              }}
            >
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item
              style={{
                backgroundColor: "rgb(34 43 69)",
                borderColor: Colors.SubWhite,
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                color: Colors.white,
              }}
            >
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        backgroundColor: "rgb(34 43 69)",
                        borderColor: Colors.SubWhite,
                        backgroundImage:
                          "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                        boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                        color: Colors.white,
                      }}
                    >
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product}`}
                            style={{ color: Colors.white }}
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} >
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item style={{
                  backgroundColor: "rgb(34 43 69)",
                  borderColor: Colors.SubWhite,
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                  boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                  color: Colors.white,
                }}>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item style={{
                  backgroundColor: "rgb(34 43 69)",
                  borderColor: Colors.SubWhite,
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                  boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                  color: Colors.white,
                }}>
                <Row>
                  <Col>Items</Col>
                  <Col>₹{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{
                  backgroundColor: "rgb(34 43 69)",
                  borderColor: Colors.SubWhite,
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                  boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                  color: Colors.white,
                }}>
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{
                  backgroundColor: "rgb(34 43 69)",
                  borderColor: Colors.SubWhite,
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                  boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                  color: Colors.white,
                }}>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item style={{
                  backgroundColor: "rgb(34 43 69)",
                  borderColor: Colors.SubWhite,
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                  boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                  color: Colors.white,
                }}>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item style={{
                  backgroundColor: "rgb(34 43 69)",
                  borderColor: Colors.SubWhite,
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                  boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                  color: Colors.white,
                }}>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={RupeesToDollor(order.totalPrice)}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item style={{
                    backgroundColor: "rgb(34 43 69)",
                    borderColor: Colors.SubWhite,
                    backgroundImage:
                      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                    boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                    color: Colors.white,
                  }}>
                    <Button
                      type="button"
                      className="btn btn-block"
                      style={{backgroundColor:Colors.orange}}
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
