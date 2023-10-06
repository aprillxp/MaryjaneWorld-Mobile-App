import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query Movies {
    movies {
      id
      title
      imgUrl
      rating
    }
  }
`;

export const GET_MOVIES_ID = gql`
  query MovieById($movieByIdId: ID) {
    movieById(id: $movieByIdId) {
      id
      title
      synopsis
      imgUrl
      rating
      Genre {
        name
      }
      Author {
        username
      }
    }
  }
`;