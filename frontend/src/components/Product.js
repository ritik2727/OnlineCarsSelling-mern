import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addToCart } from "../actions/cartActions";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../actions/WishlistAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Colors from './Colors';
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect } from "react";
import { WISHLIST_ADD_ITEM_RESET } from "../constants/wishlistConstants";
import { useAlert } from 'react-alert'

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const Navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  function numDifferentiation(value) {
    var val = Math.abs(value);
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(2) + " Cr";
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(2) + " Lac";
    }
    return val;
  } 

  const wishlistAddItem = useSelector((state) => state.wishlistAddItem);
  const { loading, wish, error, success } = wishlistAddItem;

  const AddItemToWishlist = () => {
    if (userInfo) {
    // e.preventDefault()

    dispatch(addToWishList(product._id));
    }
    else{
      Navigate('/login');
    }
    // if (success) {
    //   toast.success(wish);
    // } else {
    //   toast.error(error);
    // }
    // console.log(error, wish, success, loading, product._id);
  };

  // useEffect(() => {
  //   if (success) {
  //     alert.success('Product Added To Wishlist ')
  //     dispatch({ type: WISHLIST_ADD_ITEM_RESET })
  //   }
  // }, [success, alert, dispatch])

  return (
    <>
     
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
          <IconButton style={{ }}>
          <FavoriteIcon
          style={{color:Colors.Black}}
            onClick={() => {
              AddItemToWishlist()
              // console.log("ed");
            }}
          />
        </IconButton>

        </div>
        
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant="top" >
         
          </Card.Img>
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
        {/* <div
          style={{
            borderBottom: `2px solid ${Colors.SubWhite}` ,
            opacity: "40%",
            width: "100%",
          }}
        /> */}
      
      </Card>
    </>
  );
};

export default Product;
