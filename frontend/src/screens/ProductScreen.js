import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Carousel } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
// import products from '../products'
import Meta from "../components/Meta";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductsDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Colors from "../components/Colors";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const ProductScreen = () => {
  const params = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  // const history = useHistory();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
    loading: loadingProductReview,
  } = productReviewCreate;

  // const product = products.find((p) => p._id === params.id);
  // console.log(product);
  useEffect(() => {
    console.log(product.images);
    if (successProductReview) {
      alert.success("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
      dispatch(listProductsDetails(params.id));
    }
    if (!product._id || product._id !== params.id) {
      dispatch(listProductsDetails(params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [params, dispatch, successProductReview, alert, product]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link
        to="/"
        className="btn btn-light"
        style={{
          backgroundColor: Colors.orange,
          color: Colors.white,
          fontWeight: "bold",
        }}
      >
        Go Back
      </Link>
      {/* <Button onClick={history.goBack}>Back</Button> */}
      {!product._id || product._id !== params.id ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {/* <ToastContainer /> */}
          <Meta title={product.name} />
          <Row style={{ marginTop: "2em", marginBottom: "2em" }}>
            <Col md={6}>
              {/* <Image src={product.image} alt={product.name} fluid /> */}
              <Carousel
                showThumbs={false}
                renderIndicator={(onClickHandler, isSelected, index, label) => {
                  if (isSelected) {
                    return (
                      <li
                        style={{
                          background: Colors.orange,
                          width: 8,
                          height: 8,
                          display: "inline-block",
                          margin: "0 8px",
                        }}
                        aria-label={`Selected: ${label} ${index + 1}`}
                        title={`Selected: ${label} ${index + 1}`}
                      />
                    );
                  }
                  return (
                    <li
                      style={{
                        background: "rgb(34 43 69)",
                        // borderColor: Colors.SubWhite,
                        backgroundImage:
                          "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                        boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",

                        width: 8,
                        height: 8,
                        display: "inline-block",
                        margin: "0 8px",
                      }}
                      onClick={onClickHandler}
                      onKeyDown={onClickHandler}
                      value={index}
                      key={index}
                      role="button"
                      tabIndex={0}
                      title={`${label} ${index + 1}`}
                      aria-label={`${label} ${index + 1}`}
                    />
                  );
                }}
              >
                <div>
                  <Image
                    src={product.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 0,
                      padding: 0,
                      margin: 0,
                      marginLeft: 0,
                      marginRight: 0,
                    }}
                    alt={product.name}
                  />
                  {/* <p className="legend">Legend 1</p> */}
                </div>
                {product.images &&
                  product.images.map((img, index) => (
                    <div key={index}>
                      <Image
                        src={img}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 0,
                          padding: 0,
                          margin: 0,
                          marginLeft: 0,
                          marginRight: 0,
                        }}
                        alt={img.name}
                      />
                      {/* <p className="legend">Legend 1</p> */}
                    </div>
                    // <Carousel.Item key={index}>
                    //   {/* <Link to={`/product/${img._id}`}> */}
                    //   <Image
                    //     src={img}
                    //     alt={img.name}
                    // style={{
                    //   width: "100%",
                    //   height: "100%",
                    //   borderRadius: 0,
                    //   margin: 0,
                    //   marginLeft: 0,
                    //   marginRight: 0,
                    // }}
                    //   />
                    // </Carousel.Item>
                  ))}

                {/* <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div> */}
              </Carousel>
              {/* <Carousel
                nextLabel=""
                prevLabel=""
                pause="hover"
                className="bg-dark"
              >
                
              </Carousel> */}
            </Col>
            <Col md={3} style={{ backgroundColor: Colors.DarkBlue }}>
              <ListGroup
                variant="flush"
                style={{
                  backgroundColor: Colors.DarkBlue,
                  borderColor: Colors.SubWhite,
                }}
              >
                <ListGroup.Item
                  style={{
                    backgroundColor: Colors.DarkBlue,
                    borderColor: Colors.SubWhite,
                  }}
                >
                  <Typography variant="h5" style={{ color: Colors.white }}>
                    {product.name}
                  </Typography>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    backgroundColor: Colors.DarkBlue,
                    borderColor: Colors.SubWhite,
                  }}
                >
                  {/* {product.numReviews &&  <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              } */}
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    backgroundColor: Colors.DarkBlue,
                    borderColor: Colors.SubWhite,
                    color: Colors.white,
                  }}
                >
                  Price: ₹{product.price}
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    backgroundColor: Colors.DarkBlue,
                    borderColor: Colors.SubWhite,
                    color: Colors.SubWhite,
                  }}
                >
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card
                style={{
                  backgroundColor: Colors.DarkBlue,
                  borderColor: Colors.SubWhite,
                  color: Colors.SubWhite,
                }}
              >
                <ListGroup variant="flush">
                  <ListGroup.Item
                    style={{
                      backgroundColor: Colors.DarkBlue,
                      borderColor: Colors.SubWhite,
                      color: Colors.white,
                    }}
                  >
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item
                    style={{
                      backgroundColor: Colors.DarkBlue,
                      borderColor: Colors.SubWhite,
                      color: Colors.SubWhite,
                    }}
                  >
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item
                      style={{
                        backgroundColor: Colors.DarkBlue,
                        borderColor: Colors.SubWhite,
                        color: Colors.SubWhite,
                      }}
                    >
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item
                    style={{
                      backgroundColor: Colors.DarkBlue,
                      borderColor: Colors.SubWhite,
                      color: Colors.SubWhite,
                    }}
                  >
                    <Button
                      onClick={addToCartHandler}
                      // className="btn-block"
                      style={{
                        backgroundColor: Colors.orange,
                        borderColor: Colors.SubWhite,
                        color: Colors.white,
                      }}
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Typography variant="h4">Reviews</Typography>
              {product.reviews?.length === 0 && <Message>No Reviews</Message>}
              <ListGroup
                variant="flush"
                style={{
                  backgroundColor: Colors.DarkBlue,
                  borderColor: Colors.SubWhite,
                  color: Colors.white,
                }}
              >
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item
                      key={review._id}
                      style={{
                        backgroundColor: "rgb(34 43 69)",
                        borderColor: Colors.SubWhite,
                        backgroundImage:
                          "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                        boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
                        color: Colors.white,
                      }}
                    >
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
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
                  <Typography variant="h5" style={{ textTransform: "none" }}>
                    Write a Customer Review
                  </Typography>
                  {successProductReview && (
                    <Message variant="success">
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                        style={{
                          backgroundColor: Colors.orange,
                          borderColor: Colors.SubWhite,
                          color: Colors.white,
                          marginTop: "1em",
                        }}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{" "}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
