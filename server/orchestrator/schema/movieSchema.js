const axios = require("axios");
const redis = require("../config/redis");

const BASE_URL_MOVIES = "http://localhost:4002/pub/movies";
const BASE_URL_USERS = "http://localhost:4001/users";

const movieTypeDefs = `#graphql
  type Movie {
    id: ID
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    Genre: Genre
    Author: Author
  }

  type Genre {
    id: ID
    name: String
  }

  type Casts {
    id: ID
    name: String
  }

  type Author {
    _id: ID
    username: String
  }

  type Query {
    movies: [Movie]
    movieById(id: ID): Movie
  }

  input FormMovie {
    title: String,
    slug: String,
    synopsis: String,
    trailerUrl: String,
    imgUrl: String,
    rating: Int,
    genreId: Int,
    authorId: Int
  }

  type Mutation {
    createMovie(movie: FormMovie): Movie
    updateMovie(id: ID, movie: FormMovie): Movie
    deleteMovie(id: ID): Movie
  }
`;

const movieResolvers = {
  Query: {
    movies: async () => {
      try {
        const movieCache = await redis.get("movies");

        if (movieCache) {
          const data = JSON.parse(movieCache);
          return data;
        }

        const { data } = await axios.get(BASE_URL_MOVIES);

        const stringMovies = JSON.stringify(data);

        await redis.set("movies", stringMovies, "EX", 300);

        return data;
      } catch (error) {
        throw new Error(error.message)
      }
    },
    movieById: async (_, args) => {
      try {
        const { id } = args;

        const movieCache = await redis.get(`movies:${id}`);

        if (movieCache) {
          const data = JSON.parse(movieCache);
          return data;
        }

        const { data: movie } = await axios.get(BASE_URL_MOVIES + "/" + id);

        const { data: user } = await axios.get(
          BASE_URL_USERS + "/" + movie.UserMongoId
        );

        movie.Author = user;

        const stringMovies = JSON.stringify(movie);

        await redis.set(`movies:${id}`, stringMovies, "EX", 300);

        return movie;
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },

  Mutation: {
    createMovie: async (_, { movie }) => {
      try {
        const {
          title,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          authorId,
        } = movie;

        const slug = title.toLowerCase().replace(/\s+/g, "-");

        const { data } = await axios.post(BASE_URL_MOVIES, {
          title,
          slug,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          authorId,
        });

        await redis.del("movies");

        return { message: "Movies has been created" };
      } catch (error) {
        throw new Error(error.message)
      }
    },

    updateMovie: async (_, { movie }, args) => {
      try {
        const { id } = args;
        const { title, synopsis, trailerUrl, imgUrl, rating, genreId } = movie;
        const slug = title.toLowerCase().replace(/\s+/g, "-");

        const { data } = await axios({
          method: "patch",
          url: BASE_URL_MOVIES + "/" + id,
          data: { title, slug, synopsis, trailerUrl, imgUrl, rating, genreId },
        });

        await redis.del("movie: " + id);

        return {
          message: "Movie with id " + id + " updated",
          updatedMovie: data,
        };
      } catch (error) {
        throw new Error(error.message)
      }
    },

    deleteMovie: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "delete",
          url: BASE_URL_MOVIES + "/" + id,
        });

        await redis.del("movies");

        return { message: "Deleted successfully" };
      } catch (error) {
        throw new Error(error.message)
      }
    },
  },
};

module.exports = {
  movieTypeDefs,
  movieResolvers,
};
