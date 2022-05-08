// const asyncHandler = require('express-async-handler')

import asyncHandler from "express-async-handler";
import Coupon from "../models/couponModal.js";
import User from "../models/userModel1.js";
import Cart from "../models/cartModel.js"

// @desc    POST cart
// @route   POST /api/cart
// @access  Private
const dbCart = asyncHandler(async (req, res) => {
  const { cart } = req.body

  let products = []

  const user = await User.findOne({ email: req.user.email }).exec()
  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec()

  if (cartExistByThisUser) {
    cartExistByThisUser.remove()
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {}

    object.product = cart[i].product
    object.quantity = cart[i].qty

    // object.variableData = cart[i].variableData

    // object.addon = cart[i].addonData
    // get price for creating total

    object.price = cart[i].price
    products.push(object)
  }
  let cartTotal = 0
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].quantity
  }
  const newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save()
  res.json(newCart)
})

// @desc    Get cart by user
// @route   GET /api/cart
// @access  Private
const cartList = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  const cart = await Cart.findOne({ orderdBy: user._id })
    .populate('products.product', '_id name price image variableData')
    .exec()

  res.json(cart)
})

// @desc    delete cart by user
// @route   DELETE /api/cart
// @access  Private
const clearDbCart = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec()
  res.json(cart)
})

// @desc    update discount price
// @route   POST /api/cart/coupon
// @access  Private

const applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.body

  const validCoupon = await Coupon.findOne({ name: coupon }).exec()
  const user = await User.findOne({ email: req.user.email }).exec()
  if (validCoupon === null) {
    res.status(500)
    throw new Error('Invalid Coupon')
  } else {
    const checkAppliedCoupon = await Cart.findOne({ orderdBy: user._id })
    if (checkAppliedCoupon && checkAppliedCoupon.couponApplied) {
      res.status(500)
      throw new Error('Already Applied Coupon')
    } else {
      const { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
        .populate('products.product', '_id title price')
        .exec()

      // calculate the total after discount
      const totalAfterDiscount = Math.round(
        cartTotal - (cartTotal * validCoupon.discount) / 100
      ) // 99.99

      const cartByUser = await Cart.findOne({ orderdBy: user._id })
      if (cartByUser) {
        cartByUser.totalAfterDiscount = totalAfterDiscount
        cartByUser.couponApplied = true
        const updateDiscountPrice = await cartByUser.save()
        res.json(updateDiscountPrice)
      } else {
        res.status(500)
        throw new Error('user cant found')
      }
    }
  }
})

// @desc    cancel coupon
// @route   POST /api/cart/coupon-cancel
// @access  Private

const cancelCoupon = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()
  if (user) {
    const cartByUser = await Cart.findOne({ orderdBy: user._id })
    if (cartByUser) {
      cartByUser.totalAfterDiscount = 0
      cartByUser.couponApplied = false
      const updateDiscountPrice = await cartByUser.save()
      res.json(updateDiscountPrice)
    } else {
      res.status(500)
      throw new Error("User cart can't found")
    }
  } else {
    res.status(500)
    throw new Error("User can't found")
  }
})

// @desc    Delete user DB cart
// @route   POST /api/cart/coupon-cancel
// @access  Private

const deleteUserDbCart = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec()
  if (user) {
    const cartByUser = await Cart.findOne({ orderdBy: user._id })
    if (cartByUser) {
      await cartByUser.remove()
    } else {
      res.status(500)
      throw new Error("User cart can't found")
    }
  } else {
    res.status(500)
    throw new Error("User can't found")
  }
})

export {
    deleteUserDbCart,
    cancelCoupon,
    applyCoupon,
    clearDbCart,
    dbCart,
    cartList
}
