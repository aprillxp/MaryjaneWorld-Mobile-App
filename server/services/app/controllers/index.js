const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User, Movie, Genre, Cast } = require("../models");

class Controller {
  static async adminRegister(req, res, next) {
    try {
      const { email, password, phoneNumber, address } = req.body;

      const user = await User.create({
        email,
        password,
        phoneNumber,
        address,
      });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async adminLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "Email/Password required!" };
      }

      if (!password) {
        throw { name: "Email/Password required!" };
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { name: "Email or Password is invalid!" };
      }

      const compare = comparePass(password, user.password);

      if (!compare) {
        throw { name: "Email or Password is invalid!" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async getAllmovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: Genre,
        order: [["id", "ASC"]]
      });

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }

  static async getOneMovies(req, res, next) {
    try {
      const movieDetail = await Movie.findByPk(req.params.id);

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
        authorId: req.user.id,
      });
      res.status(201).json({ message: `Movie ${movie.title} has been added!` });
    } catch (error) {
      next(error);
    }
  }

  static async getGenres(req, res, next) {
    try {
      const genre = await Genre.findAll();

      res.status(200).json(genre);
    } catch (error) {
      next(error);
    }
  }

  static async postGenres(req, res, next) {
    try {
      const { name } = req.body;

      const genre = await Genre.create({ name });

      res
        .status(201)
        .json({ message: `Genre with name ${genre.name} has been added!` });
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

module.exports = Controller;
