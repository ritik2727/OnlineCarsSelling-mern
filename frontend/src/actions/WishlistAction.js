import axios from "axios";
import {
  WISHLIST_ADD_ITEM_FAIL,
  WISHLIST_ADD_ITEM_REQUEST,
  WISHLIST_ADD_ITEM_SUCCESS,
  WISHLIST_GET_ITEM_FAIL,
  WISHLIST_GET_ITEM_SUCCESS,
  WISHLIST_REMOVE_ITEM_FAIL,
  WISHLIST_REMOVE_ITEM_REQUEST,
  WISHLIST_REMOVE_ITEM_SUCCESS,
} from "../constants/wishlistConstants";

export const addToWishList = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WISHLIST_ADD_ITEM_REQUEST,
    })
    const { data } = await axios.get(`/api/products/${id}`);

    // console.log("hhhhhhhhh");
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const dataforWishlist = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      rating:data.rating,
      numReviews:data.numReviews
      //   qty:data.qty,
    };

    const response = await axios.post(
      `/api/users/wishlist`,
      dataforWishlist,
      config
    );

    dispatch({
      type: WISHLIST_ADD_ITEM_SUCCESS,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: WISHLIST_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

  //   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

export const getWishlists = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.get(`/api/users/getwishlists`, config);

    dispatch({
      type: WISHLIST_GET_ITEM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: WISHLIST_GET_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

  //   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};


export const removeFromWishlists = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WISHLIST_REMOVE_ITEM_REQUEST,
    })
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const response = await axios.delete(`/api/users/${id}/wishlist`, config);

    dispatch({
      type: WISHLIST_REMOVE_ITEM_SUCCESS,
      payload: response.data.message,
    });
  } catch (error) {
    dispatch({
      type: WISHLIST_REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }

  //   localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};
