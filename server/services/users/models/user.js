const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");
const { hashPass } = require("../helpers/bcrypt");

class ModelUser {
  static users() {
    const usersCollection = getDb().collection("users");
    return usersCollection;
  }

  static async findAll() {
    return await this.users()
      .find({}, { projection: { password: 0 } })
      .toArray();
  }

  static async findByPk(id) {
    return await this.users().findOne({
      _id: new ObjectId(id),
    });
  }

  static async create(user) {
    const hashedPass = hashPass(user.password);
    user.password = hashedPass;

    const result = await this.users().insertOne(user);
    return result.insertedId;
  }

  static async destory(id) {
    return await this.users().deleteOne({
      _id: new ObjectId(id),
    });
  }
}

module.exports = ModelUser;
