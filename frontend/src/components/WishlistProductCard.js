import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishlists } from "../actions/WishlistAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Colors from "./Colors";
import CloseIcon from "@mui/icons-material/Close";

const WishlistProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function numDifferentiation(value) {
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + " Cr";
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + " Lac";
    }
    return val;
  }

  const removeWistlistsItem = useSelector((state) => state.removeWistlistsItem);
  const { loading, rmWishItem, error, success } = removeWistlistsItem;

  //   const AddItemToWishlist = () => {
  //     // e.preventDefault()

  //     dispatch(addToWishList(product._id));
  //     console.log(error, wish, success, loading, product._id);
  //   };

  const RemoveItemFromWishlist = () => {
    dispatch(removeFromWishlists(product._id));
  
  };

  const addToCartHandler = () => {
    dispatch(removeFromWishlists(product._id));
    navigate(`/cart/${product.product}?qty=1`);
  };

  return (
    <>
      <ToastContainer />
      <Card
        className="my-3"
        style={{
          backgroundColor: "rgb(34 43 69)",
          borderBottom: "#F037A5",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
          boxShadow: "rgb(0 0 0 / 25%) 0px 3px 6px 0px",
          borderRadius: 15,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            zIndex: 2,
            position: "absolute",
            top: "3%",
            backgroundColor: "white",
            opacity: 0.6,
            borderRadius: 50,
            // paddingTop: 4,
            left: "85%",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
          }}
        >
          <IconButton style={{}}>
            <CloseIcon
              style={{ color: Colors.Black }}
              onClick={() => RemoveItemFromWishlist()}
            />
          </IconButton>
        </div>

        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top"></Card.Img>
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong style={{ color: Colors.white }}>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as="h3" style={{ color: Colors.white }}>
            ₹ {numDifferentiation(product.price)}
          </Card.Text>
          
          {/* <Button variant="primary" onClick={()=>AddItemToWishlist()}>ADD TO Wishlist</Button> */}
        </Card.Body>
       
        
        <div
          style={{
            borderBottom: `2px solid ${Colors.SubWhite}` ,
            opacity: "40%",
            width: "100%",
          }}
        />
        <Button
            onClick={addToCartHandler}
            // className="btn-block"
            style={{backgroundColor:Colors.orange}}
            type="button"
            disabled={product.countInStock === 0}
          >
            MOVE TO CART
          </Button>
      </Card>
      {/* <Card className="my-3 p-3 rounded">
        <div
          style={{
            zIndex: 2,
            position: "absolute",
            top: "2%",
            backgroundColor: "white",
            opacity: 0.4,
            borderRadius: 50,
            // paddingTop: 4,
            left: "85%",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 23,
          }}
        >
          <i
            class="fa fa-times"
            aria-hidden="true"
            onClick={() => RemoveItemFromWishlist()}
          ></i>
        </div>
        <Link to={`/product/${product.product}`}>
          <Card.Img src={product.image} variant="top"></Card.Img>
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as="h3">₹ {numDifferentiation(product.price)}</Card.Text>

          <Button
            onClick={addToCartHandler}
            className="btn-block"
            type="button"
            disabled={product.countInStock === 0}
          >
            MOVE TO CART
          </Button>
        </Card.Body>
      </Card> */}
    </>
  );
};

export default WishlistProductCard;
