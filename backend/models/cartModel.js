import mongoose from 'mongoose'
// const { ObjectId } = mongoose.Schema
const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type:mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        price: Number,
        quantity: Number,
        // variableData: Object,
        // addon: [
        //   {
        //     type: Object,
        //   },
        // ],
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    couponApplied: {
      type: Boolean,
      default: false,
    },
    orderdBy: { type:mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)
const Cart = mongoose.model('Cart', CartSchema)

export default Cart;
