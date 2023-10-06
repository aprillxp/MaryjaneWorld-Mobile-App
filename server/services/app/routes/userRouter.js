const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/userController");
const errorHandlers = require("../middlewares/errorHandlers");

// user get data movies
userRouter.get("/movies", UserController.getUserMovies);
userRouter.post("/movies", UserController.postMovies);

userRouter.get("/movies/:id", UserController.getOneUserMovies);
userRouter.patch("/movies/:id", UserController.patchMovies);

userRouter.delete("/movies/:id", UserController.deleteMovies);

userRouter.use(errorHandlers)

module.exports = userRouter;
