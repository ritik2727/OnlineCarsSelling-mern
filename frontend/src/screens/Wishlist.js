import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";
import { addToCart } from "../actions/cartActions";
import { getWishlists } from "../actions/WishlistAction";
import WishlistProductCard from "../components/WishlistProductCard";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";
import { WISHLIST_REMOVE_ITEM_RESET } from "../constants/wishlistConstants";

const Wishlist = () => {
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const params = useParams();
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const removeWistlistsItem = useSelector((state) => state.removeWistlistsItem);
  const {
    loading: rmLoading,
    rmWishItem,
    error: rmError,
    success: rmSuccess,
  } = removeWistlistsItem;

  useEffect(() => {
    if (userInfo || rmSuccess) {
      dispatch(getWishlists());
      dispatch({ type: WISHLIST_REMOVE_ITEM_RESET });
    } else {
      Navigate("/login");
    }
  }, [dispatch, Navigate, userInfo, rmSuccess]);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { products, page, pages } = productList;

  //   const userDetails = useSelector((state) => state.userDetails);
  //   const { loading, error, user, } = userDetails

  const getWishlistsItem = useSelector((state) => state.getWishlistsItem);
  const { loading, error, wishItem } = getWishlistsItem;

  const AddItemToWishlist = (id) => {
    dispatch(addToCart(id));
  };

  return (
    <>
      <Meta />
      {/* {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )} */}
      <Typography variant="h4" style={{marginBottom:'1.5em'}}>Wishlist</Typography>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {wishItem.length === 0 ? (
            <Message>
              Your wishlist is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <Row>
              {wishItem.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <WishlistProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default Wishlist;
