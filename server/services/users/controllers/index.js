const ModelUser = require("../models/user");

class User {
  static async getUser(req, res) {
    try {
      const users = await ModelUser.findAll();
      return res.json(users);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUserId(req, res) {
    try {
      const { id } = req.params;
      const userId = await ModelUser.findByPk(id);
      return res.json(userId);
    } catch (error) {
      console.log(error);
    }
  }

  static async createUser(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      const user = { username, email, password, role, phoneNumber, address };

      const newUser = await ModelUser.create(user);

      return res
        .status(201)
        .json({ message: "User with id: " + newUser + " is created" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    const deleteUser = await ModelUser.destory(id);

    if (deleteUser.deletedCount === 1) {
      return res.json({ message: "Deleted successfully" });
    } else {
      return res.status(404).json({ message: "Not Found" });
    }
  }
}

module.exports = User;
