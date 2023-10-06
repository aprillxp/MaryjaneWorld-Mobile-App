const express = require("express");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const errorHandlers = require("../middlewares/errorHandlers");
const Controller = require("../controllers");
const userRouter = require("./userRouter");
const router = express.Router();

// user endpoint
router.use("/pub", userRouter);

// login - register for admin
router.post("/register", Controller.adminRegister);
router.post("/login", Controller.adminLogin);

// middleware
// router.use(authentication);

// create and read data
router.get("/movies", Controller.getAllmovies);
router.post("/movies", Controller.postMovies);
router.get("/movies/:id", Controller.getOneMovies);

// create and read genre
router.get("/genres", Controller.getGenres);
router.post("/genres", Controller.postGenres);

// update data
router.patch("/movies/:id", authorization, Controller.patchMovies);

// delete data
router.delete("/movies/:id", authorization, Controller.deleteMovies);

router.use(errorHandlers);

module.exports = router;
