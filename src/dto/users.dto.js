import crypto from "crypto";

class UserDTO {
  constructor(data) {
    this.email = data.email;
    this.name = data.name;
    this.password = data.password;
  }
}

export default UserDTO;
