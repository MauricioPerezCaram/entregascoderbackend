import { model, Schema } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
