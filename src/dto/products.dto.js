import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    argsUtil.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.photo = data.photo;
    this.price = data.price || 10;
    this.stock = data.stock || 50;
  }
}

export default ProductDTO;
