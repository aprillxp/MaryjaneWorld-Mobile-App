"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.hasMany(models.Cast, { foreignKey: "movieId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title cannot be empty",
          },
          notEmpty: {
            msg: "Title cannot be empty",
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Slug cannot be empty",
          },
          notEmpty: {
            msg: "Slug cannot be empty",
          },
        },
      },
      synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Synopsis cannot be empty",
          },
          notEmpty: {
            msg: "Synopsis cannot be empty",
          },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Rating cannot be empty",
          },
          notEmpty: {
            msg: "Rating cannot be empty",
          },
        },
      },
      genreId: DataTypes.INTEGER,
      authorId: DataTypes.INTEGER,
      UserMongoId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );

  Movie.beforeCreate((movie) => {
    movie.slug = movie.title.toLowerCase().replace(/\s+/g, "-");
  });
  return Movie;
};
