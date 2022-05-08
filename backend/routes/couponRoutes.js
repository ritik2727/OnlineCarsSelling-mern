import express from "express";
import { couponCreate, couponDelete, couponList } from "../controller/couponController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router()

router
  .route('/')
  .post(protect, admin, couponCreate)
  .get(protect, couponList)
router.route('/:id').delete(protect, admin, couponDelete)

export default router;