import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      enum: ["reserved", "paid", "delivered"],
      default: "reserved",
    },
  },
  { timestamps: true }
);

schema.pre("find", function () {
  this.populate("user_id", "-password -createdAt -updatedAt -__v");
  this.populate("product_id", "title price stock");
});

schema.plugin(mongoosePaginate);
const Order = model(collection, schema);
export default Order;
