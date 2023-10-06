const { Movie, Genre, Cast } = require("../models");

class UserController {
  static async getUserMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [Genre, Cast],
        order: [["id", "ASC"]],
      });

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async getOneUserMovies(req, res, next) {
    try {
      const movieDetail = await Movie.findOne({
        where: { id: req.params.id },
        include: [Genre, Cast],
        order: [["id", "ASC"]],
      });

      res.status(200).json(movieDetail);
    } catch (error) {
      next(error);
    }
  }

  static async postMovies(req, res, next) {
    try {
      const { title, slug, synopsis, trailerUrl, imgUrl, rating, genreId } =
        req.body;
      const movie = await Movie.create({
        title,
        slug,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId: 1,
      });
      res.status(201).json({ message: `Movie ${movie.title} has been added!` });
    } catch (error) {
      next(error);
    }
  }

  static async patchMovies(req, res, next) {
    try {
      const { id } = req.params;
      const { title, slug, synopsis, trailerUrl, imgUrl, rating, genreId } =
        req.body;
      const findMovie = await Movie.findByPk(id);
      if (!findMovie) {
        throw { name: "Not found", id };
      }
      await Movie.update(
        { title, slug, synopsis, trailerUrl, imgUrl, rating, genreId },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: "Success update movies detail" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteMovies(req, res, next) {
    try {
      const movie = await Movie.findByPk(+req.params.id);

      if (!movie) {
        return res.status(404).json({
          message: `Movie with id ${req.params.id} Not found`,
        });
      }

      await Movie.destroy({ where: { id: +req.params.id } });
      res.status(200).json({
        message: `Movie with id ${req.params.id} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
