import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstant";
import ApplyCoupon from "../components/ApplyCoupon";
import {
  couponCancel,
  listCart,
  userDbCartDelete,
} from "../actions/cartActions";
import {
  CART_LIST_RESET,
  DB_CART_CLEAR_RESET,
} from "../constants/cartConstants";
import {
  APPLY_COUPON_RESET,
  CANCEL_COUPON_RESET,
} from "../constants/couponConstants";
// import Message from "../components/Message";
import { useAlert } from "react-alert";
import Loader from "../components/Loader";
import Colors from "../components/Colors";
import { Typography } from "@mui/material";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  const Navigate = useNavigate();
  const alert = useAlert();

  if (!cart.shippingAddress.address) {
    Navigate("/shipping");
  } else if (!cart.paymentMethod) {
    Navigate("/payment");
  }
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cartList = useSelector((state) => state.cartList);
  const { cartItems } = cartList;
  console.log("cart", cartItems?.cartTotal);

  const dbCartClear = useSelector((state) => state.dbCartClear);
  const { success: cartClearSuccess } = dbCartClear;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  const cancelCoupon = useSelector((state) => state.cancelCoupon);
  const { loading: loadingCancelCoupon, success: successCancelCoupon } =
    cancelCoupon;

  const applyCoupon = useSelector((state) => state.applyCoupon);
  const {
    loading: loadingApplyCoupon,
    success: successApplyCoupon,
    error: errorApplyCoupon,
  } = applyCoupon;

  useEffect(() => {
    if (userInfo && !userInfo.token) {
      Navigate("/");
    } else {
      dispatch(listCart());
      if (cartClearSuccess) {
        dispatch({ type: DB_CART_CLEAR_RESET });
        dispatch({ type: CART_LIST_RESET });
        Navigate("/");
      }
      // if (successShippingAdded) {
      //   alert.success('Shipping Address Added')
      //   dispatch({ type: CART_SAVE_SHIPPING_ADDRESS_RESET })
      // }
      if (successCancelCoupon) {
        alert.success("Coupon Removed");
        dispatch({ type: CANCEL_COUPON_RESET });
        dispatch(listCart());
      }
      if (successApplyCoupon) {
        alert.success("Coupon Added");
        dispatch({ type: APPLY_COUPON_RESET });
        dispatch(listCart());
      } else {
        dispatch({ type: APPLY_COUPON_RESET });
      }
      if (success) {
        dispatch({ type: CART_LIST_RESET });
        dispatch(userDbCartDelete());
        // alert.success("Order Placed ");
        Navigate(`/order/${order._id}`);
        dispatch({ type: USER_DETAILS_RESET });
        dispatch({ type: ORDER_CREATE_RESET });
      }
    }
    // eslint-disable-next-line
  }, [
    userInfo,
    Navigate,
    dispatch,
    cartClearSuccess,
    // successShippingAdded,
    alert,
    successApplyCoupon,
    successCancelCoupon,
    success,
    // cartList
  ]);

  // useEffect(() => {
  //   if (success) {
  //     Navigate(`/order/${order._id}`);
  //     dispatch({ type: USER_DETAILS_RESET });
  //     dispatch({ type: ORDER_CREATE_RESET });
  //   }
  //   // eslint-disable-next-line
  // }, [Navigate, success]);

  const cancelCouponHandler = () => {
    dispatch(couponCancel());
  };

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // cart.itemsPrice = addDecimals(
  //   cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  // );

  const BDammount = Number(cartItems?.cartTotal);
  cart.BDshippingPrice = addDecimals(300000);
  cart.BDtaxPrice = addDecimals(Number((0.10 * BDammount).toFixed(2)));
  cart.BDtotalPrice = (
    Number(BDammount) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const ammount =
    cartItems?.couponApplied === true
      ? Number(cartItems.totalAfterDiscount)
      : Number(cartItems?.cartTotal);
  cart.shippingPrice = addDecimals(300000);
  cart.taxPrice = addDecimals(Number((0.10 * ammount).toFixed(2)));
  cart.totalPrice = (
    Number(ammount) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
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
              <h2 style={{ color: Colors.white }}>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
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
              <strong>Method: </strong>
              {cart.paymentMethod}
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

              <ListGroup variant="flush">
                {cartItems &&
                  cartItems.products.map((item, index) => (
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
                            src={item.product.image}
                            alt={item.product.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${item.product._id}`}
                            style={{ color: Colors.white }}
                          >
                            {item.product.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ₹{item.price} = ₹
                          {item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
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
                <h2>Order Summary</h2>
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
                <Row>
                  <Col>Items</Col>
                  <Col>₹{cartItems?.cartTotal}</Col>
                </Row>
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
                <Row>
                  <Col>Shipping</Col>
                  <Col>₹{cart.shippingPrice}</Col>
                </Row>
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
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{cart.taxPrice}</Col>
                </Row>
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
                <Row>
                  <Col>Total</Col>
                  <Col>
                    ₹
                    {cartItems && cartItems.couponApplied === false ? (
                      cart.totalPrice
                    ) : (
                      <del>{cart.BDtotalPrice}</del>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              {cartItems && cartItems.couponApplied && (
                <ListGroup.Item style={{ backgroundColor: "#273c75" }}>
                  <Row className="d-flex align-items-center">
                    <Col md={8}>
                      <span style={{ color: "#fff" }}>
                        Discount Applied: Total Payable: ₹{cart.totalPrice}
                      </span>
                    </Col>
                    <Col md={4}>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={cancelCouponHandler}
                        disabled={loadingCancelCoupon}
                      >
                        Cancel Coupon
                        {loadingCancelCoupon && <Loader size="size-sm" />}
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <Col
                style={{
                  backgroundColor: "rgb(34 43 69)",
                  borderColor: Colors.SubWhite,
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                  boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                  color: Colors.white,
                }}
              >
                <ApplyCoupon
                  errorApplyCoupon={errorApplyCoupon}
                  loadingApplyCoupon={loadingApplyCoupon}
                />
              </Col>

              {/* {cartItems && cartItems.couponApplied && (
                  <ListGroup.Item style={{ backgroundColor: '#273c75' }}>
                    <Row className='d-flex align-items-center'>
                      <Col md={8}>
                        <span style={{ color: '#fff' }}>
                          Discount Applied: Total Payable: $
                          {cartItems && cartItems.totalAfterDiscount}
                        </span>
                      </Col>
                      <Col md={4}>
                        <Button
                          variant='danger'
                          size='sm'
                          onClick={cancelCouponHandler}
                          disabled={loadingCancelCoupon}
                        >
                          Cancel Coupon
                          {loadingCancelCoupon && <Loader size='size-sm' />}
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )} */}
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
                {error && <Message variant="danger">{error}</Message>}
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
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  style={{ backgroundColor: Colors.orange }}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
