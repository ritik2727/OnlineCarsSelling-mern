import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";
import Meta from "../components/Meta";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Colors from "../components/Colors";
import { Typography } from "@mui/material";
import { WISHLIST_ADD_ITEM_RESET } from "../constants/wishlistConstants";
import { useAlert } from "react-alert";


const AccScreen = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  // console.log("p",params)
  const keyword = params.keyword;

  const pageNumber = params.pageNumber || 1;

  const wishlistAddItem = useSelector((state) => state.wishlistAddItem);
  const {
    loading: addLoading,
    wish,
    error: addError,
    success: addSuccess,
  } = wishlistAddItem;

  useEffect(() => {
    if (addSuccess) {
      alert.success("Product Added To Wishlist ");
      dispatch({ type: WISHLIST_ADD_ITEM_RESET });
    }else if(addError){ 
      alert.error(addError);
      dispatch({ type: WISHLIST_ADD_ITEM_RESET });

    }
  }, [addSuccess, alert, dispatch,addError]);

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  return (
    <>
      <Meta />
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
      {/* {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )} */}
       <Typography variant="h4" style={{marginTop:'2em'}}>Accessories</Typography>
      {/* <h1></h1> */}
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) =>
              product.category === 'Accessories' ? (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ) : null
            )}
          </Row>
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          /> */}
        </>
      )}
    </>
  );
};

export default AccScreen;
