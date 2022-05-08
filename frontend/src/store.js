import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducers,
  productListReducers,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { applyCouponReducer, cancelCouponReducer, cartListReducer, cartReducers, cartSaveDbReducer, dbCartClearReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailsReducers,
  userListReducer,
  userLoginReducers,
  userRegisterReducers,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import { getWistlistsItemReducer, removeWistlistsItemReducer, wishListAddItemReducer } from "./reducers/wishListReducers";
import { couponCreateReducer, couponDeleteReducer, couponListReducer } from "./reducers/couponReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  productDelete: productDeleteReducer,
  productCreate:productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducers,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  wishlistAddItem:wishListAddItemReducer,
  getWishlistsItem:getWistlistsItemReducer,
  removeWistlistsItem:removeWistlistsItemReducer,
  couponCreate: couponCreateReducer,
  couponList: couponListReducer,
  couponDelete: couponDeleteReducer,
  applyCoupon: applyCouponReducer,
  cancelCoupon: cancelCouponReducer,
  cartSaveDb: cartSaveDbReducer,
  cartList: cartListReducer,
  dbCartClear: dbCartClearReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
