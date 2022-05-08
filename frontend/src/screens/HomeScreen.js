import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";

import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductBrand from "../components/ProductBrand";
import { Typography } from "@mui/material";
import { WISHLIST_ADD_ITEM_RESET } from "../constants/wishlistConstants";
import { useAlert } from "react-alert";
import Colors from "../components/Colors";
import { getWishlists } from "../actions/WishlistAction";

const HomeScreen = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const params = useParams();
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  const wishlistAddItem = useSelector((state) => state.wishlistAddItem);
  const {
    error: addError,
    success: addSuccess,
  } = wishlistAddItem;

  useEffect(() => {
    if (addSuccess) {
      alert.success("Product Added To Wishlist ");
      dispatch(getWishlists());
      dispatch({ type: WISHLIST_ADD_ITEM_RESET });
    } else if (addError) {
      alert.error(addError);
      dispatch({ type: WISHLIST_ADD_ITEM_RESET });
    }
  }, [addSuccess, alert, dispatch, addError]);
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const {  error, products } = productList;

  return (
    <div>
      <Meta />
      {!keyword ? (
        <>
          <ProductCarousel />
          <Typography variant="h4">Latest Products</Typography>
        </>
      ) : (
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
          <Typography variant="h4" style={{ marginTop: "3em" }}>
            Search Results
          </Typography>
        </>
      )}

      <ToastContainer />

      {products.length === 0 ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.slice(0, 8).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {products.length !== 0 ? (
            <></>
          ) : (
            <Typography
              variant="h5"
              style={{
                textTransform: "none",
                color: Colors.orange,
              }}
            >
              We couldn't find any matches
            </Typography>
          )}
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          /> */}
        </>
      )}
      {/* <Typography variant="h4">Brands</Typography> */}
      {!keyword ? <ProductBrand /> : null}
    </div>
  );
};

export default HomeScreen;
