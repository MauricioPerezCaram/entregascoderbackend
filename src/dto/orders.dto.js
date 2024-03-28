import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class OrderDTO {
  constructor(data) {
    argsUtil.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = data.user_id;
    this.product_id = data.product_id;
  }
}

export default OrderDTO;
