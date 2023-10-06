const express = require("express");
const User = require("../controllers");
const users = express.Router();

// read all user and by id and create user
users.get("/users", User.getUser);
users.post("/users", User.createUser);
users.get("/users/:id", User.getUserId);

// delete user
users.delete("/users/:id", User.deleteUser);

module.exports = users;
