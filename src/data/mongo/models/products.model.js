import { model, Schema } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    photo: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fvtK7q_Hv_iOYfdj3klqjncctK4o7UxuMfs1UjFKhxGjTnr3RuiESL4jTpgWdg-HVD0&usqp=CAU",
    },
    price: { type: Number, default: 10 },
    stock: { type: Number, default: 50 },
  },
  { timestamps: true }
);

const Product = model(collection, schema);
export default Product;
