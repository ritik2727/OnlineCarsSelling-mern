import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Message from "./Message";
import { listTopProducts } from "../actions/productActions";
import "./CarouselD.css";
import Rating from "./Rating";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return products.length === 0 ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel
      // fade
      variant="dark"
      interval={2000}
      nextLabel=""
      prevLabel=""
      pause="hover"
      style={{
        backgroundColor: "rgb(34 43 69)",
        borderBottom: "#F037A5",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
        marginBottom: "4em",
      }}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>{product.name}</h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
