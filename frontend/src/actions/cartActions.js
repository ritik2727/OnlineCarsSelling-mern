import axios from 'axios'
import { CART_ADD_ITEM, CART_DB_FAIL, CART_DB_REQUEST, CART_DB_SUCCESS, CART_LIST_FAIL, CART_LIST_REQUEST, CART_LIST_SUCCESS, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, DB_CART_CLEAR_FAIL, DB_CART_CLEAR_REQUEST, DB_CART_CLEAR_SUCCESS } from '../constants/cartConstants'
import { APPLY_COUPON_FAIL, APPLY_COUPON_REQUEST, APPLY_COUPON_SUCCESS, CANCEL_COUPON_FAIL, CANCEL_COUPON_REQUEST, CANCEL_COUPON_SUCCESS } from '../constants/couponConstants'

export const addToCart = (id,qty) => async (dispatch,getState) =>{
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          countInStock: data.countInStock,
          qty,
        },
      })
    
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const dbSaveCart = (cart) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_DB_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post("/api/cart", { cart }, config)
    dispatch({ type: CART_DB_SUCCESS })
  } catch (error) {
    dispatch({
      type: CART_DB_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_LIST_REQUEST})

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      "/api/cart",
      config
    )
    dispatch({ type: CART_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CART_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const clearDbCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DB_CART_CLEAR_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/cart`, config)
    dispatch({ type: DB_CART_CLEAR_SUCCESS })
  } catch (error) {
    dispatch({
      type: DB_CART_CLEAR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const couponApply = (coupon) => async (dispatch, getState) => {
  try {
    dispatch({ type: APPLY_COUPON_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(
      `/api/cart/coupon`,
      { coupon },
      config
    )
    dispatch({ type: APPLY_COUPON_SUCCESS })
  } catch (error) {
    dispatch({
      type: APPLY_COUPON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const couponCancel = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_COUPON_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(
      `/api/cart/coupon-cancel`,
      {},
      config
    )
    dispatch({ type: CANCEL_COUPON_SUCCESS })
  } catch (error) {
    dispatch({
      type: CANCEL_COUPON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userDbCartDelete = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(
      `/api/cart/delete-user-cart`,
      config
    )
  } catch (error) {
    alert(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    )
  }
}
