const express = require("express");
const Orchestrator = require("../controllers");
const router = express.Router();

// read, create
router.get("/movies", Orchestrator.getMovies);
router.post("/movies", Orchestrator.createMovies);
router.get("/movies/:id", Orchestrator.getMoviesId);

// crd users
router.get("/users", Orchestrator.getUsers);
router.post("/users", Orchestrator.postUser);
router.get("/users/:id", Orchestrator.getUserId);
router.delete("/users/:id", Orchestrator.destroyUser);

// update
router.patch("/movies/:id", Orchestrator.editMovies);

// delete
router.delete("/movies/:id", Orchestrator.destroy);

module.exports = router;
