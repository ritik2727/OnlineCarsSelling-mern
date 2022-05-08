import express from "express";
import { applyCoupon, cancelCoupon, cartList, clearDbCart, dbCart, deleteUserDbCart } from "../controller/cartController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router()

router
  .route('/')
  .post(protect, dbCart)
  .get(protect, cartList)
  .delete(protect, clearDbCart)
router.route('/coupon').post(protect, applyCoupon)
router.route('/coupon-cancel').post(protect, cancelCoupon)
router.route('/delete-user-cart').delete(protect, deleteUserDbCart)

export default router