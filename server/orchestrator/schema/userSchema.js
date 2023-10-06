const axios = require("axios");
const redis = require("../config/redis");

const BASE_URL_USERS = "http://localhost:4001/users";

const userTypeDefs = `#graphql
type User {
  _id: ID
  username: String
  email: String
  password: String
  role: String
  phoneNumber: String
  address: String
}

type Query {
  users: [User]
  userById(id: ID): User
}

input FormUser {
  username: String
  email: String
  password: String
  role: String
  phoneNumber: String
  address: String
}

type Mutation {
  createUser(user: FormUser): User
  deleteUser(id: ID): User
}
`;

const userResolvers = {
  Query: {
    users: async () => {
      try {
        const cacheUsers = await redis.get("users");
        if (cacheUsers) {
          const data = JSON.parse(cacheUsers);
          return data;
        }
        const { data } = await axios.get(BASE_URL_USERS);

        const stringUser = JSON.stringify(data);
        await redis.set("users", stringUser);

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },

    userById: async (_, args) => {
      try {
        const { id } = args;
        const userCache = await redis.get(id);

        if (userCache) {
          const data = JSON.parse(userCache);
          return data;
        }

        const { data } = await axios.get(BASE_URL_USERS + "/" + id);

        const stringUsers = JSON.stringify(data);

        await redis.set(`users: ${id}`, stringUsers, "EX", 300);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    createUser: async (_, { user }) => {
      try {
        const { username, email, password, role, phoneNumber, address } = user;

        const { data } = await axios.post(BASE_URL_USERS, {
          username,
          email,
          password,
          role,
          phoneNumber,
          address,
        });

        await redis.del("users");

        return { message: "User is created" };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    deleteUser: async (_, args) => {
      try {
        const { id } = args;
        const { data } = await axios({
          method: "delete",
          url: BASE_URL_USERS + "/" + id,
        });

        await redis.del("users");

        return { message: "Deleted successfully" };
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = {
  userTypeDefs,
  userResolvers,
};
