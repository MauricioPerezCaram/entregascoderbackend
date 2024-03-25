import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class UserDTO {
  constructor(data) {
    argsUtil.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.name = data.name;
    this.photo = data.photo;
  }
}

export default UserDTO;
