import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class OrderDTO {
  constructor(data) {
    argsUtil.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.uid = data.uid;
    this.pid = data.pid;
  }
}

export default OrderDTO;
