const { Movie } = require("../models");

async function authorization(req, res, next) {
  try {
    const { id } = req.params;

    const movie = await Movie.findByPk(id);

    if (!movie) {
      throw { name: "Not found", id: id };
    }

    if (req.user.id !== movie.authorId) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;
