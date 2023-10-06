const axios = require("axios");
const redis = require("../config/redis");
const BASE_URL_MOVIES = "http://localhost:4002/pub/movies";
const BASE_URL_USERS = "http://localhost:4001/users";

class Orchestrator {
  // Data section
  static async getMovies(req, res) {
    try {
      const movieCache = await redis.get("movies");

      if (movieCache) {
        const data = JSON.parse(movieCache);
        return res.status(200).json(data);
      }

      const { data } = await axios.get(BASE_URL_MOVIES);

      const stringMovies = JSON.stringify(data);

      await redis.set("movies", stringMovies, "EX", 300);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getMoviesId(req, res) {
    try {
      const movieId = req.params.id;

      // const movieCache = await redis.get(`movie: ${movieId}`);

      // if (movieCache) {
      //   const data = JSON.parse(movieCache);
      //   return res.status(200).json(data);
      // }

      const { data: movie } = await axios.get(BASE_URL_MOVIES + "/" + movieId);

      const { data: user } = await axios.get(
        BASE_URL_USERS + "/" + movie.UserMongoId
      );

      // const stringMovies = JSON.stringify(data);

      // await redis.set(`movie: ${movieId}`, stringMovies, "EX", 300);
      res.status(200).json({ ...movie, user });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async createMovies(req, res) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const slug = title.toLowerCase().replace(/\s+/g, "-");

      const { data } = await axios.post(BASE_URL_MOVIES, {
        title,
        slug,
        synopsis,
        trailerUrl,
        imgUrl,
        rating,
        genreId,
        authorId: 1,
      });

      await redis.del("movies");

      res.status(201).json({ message: "Movies is created", movie: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async editMovies(req, res) {
    try {
      const movieId = req.params.id;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = req.body;
      const slug = title.toLowerCase().replace(/\s+/g, "-");

      const { data } = await axios({
        method: "patch",
        url: BASE_URL_MOVIES + "/" + movieId,
        data: { title, slug, synopsis, trailerUrl, imgUrl, rating, genreId },
      });

      await redis.del("movie: " + movieId);

      res.status(200).json({
        message: "Movie with id " + movieId + " updated",
        updatedMovie: data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async destroy(req, res) {
    try {
      const movieId = req.params.id;
      const { data } = await axios({
        method: "delete",
        url: BASE_URL_MOVIES + "/" + movieId,
      });

      await redis.del("movies");

      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // User section
  static async getUsers(req, res) {
    try {
      const userCache = await redis.get("users");

      if (userCache) {
        const data = JSON.parse(userCache);
        return res.status(200).json(data);
      }

      const { data } = await axios.get(BASE_URL_USERS);

      const stringUsers = JSON.stringify(data);

      await redis.set("users", stringUsers, "EX", 300);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getUserId(req, res) {
    try {
      const userId = req.params.id;

      const userCache = await redis.get(userId);

      if (userCache) {
        const data = JSON.parse(userCache);
        return res.status(200).json(data);
      }

      const { data } = await axios.get(BASE_URL_USERS + "/" + userId);

      const stringUsers = JSON.stringify(data);

      await redis.set(`user: ${userId}`, stringUsers, "EX", 300);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async postUser(req, res) {
    try {
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      const { data } = await axios.post(BASE_URL_USERS, {
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });

      await redis.del("users");

      res.status(201).json({ message: "User is created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async destroyUser(req, res) {
    try {
      const userId = req.params.id;
      const { data } = await axios({
        method: "delete",
        url: BASE_URL_USERS + "/" + userId,
      });

      await redis.del("users");

      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Orchestrator;
