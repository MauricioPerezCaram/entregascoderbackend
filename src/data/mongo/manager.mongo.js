// import User from "./models/user.model.js";
// import Product from "./models/products.model.js";
// import Order from "./models/orders.model.js";
import CustomError from "../../utils/errors/CustomError.js";
import errors from "../../utils/errors/errors.js";
import { Types } from "mongoose";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async read({ filter, options }) {
    try {
      const all = await this.model.paginate(filter, options);
      if (all.totalDocs === 0) {
        const error = new Error("No hay productos");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }

  async reporTotal(uid) {
    try {
      const report = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(uid) } },

        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        {
          $group: {
            _id: "$user_id",
            total: { $sum: "$subtotal" },
          },
        },
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
            currency: "USD",
          },
        },
        // { $merge: { into: "total" } },
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const one = await this.model.findById(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      return one;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      return one;
    } catch (error) {
      CustomError.new(errors.notFound);
      throw error;
    }
  }

  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      throw error;
    }
  }

  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      console.log(stats);
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMillis,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

export default MongoManager;
