const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { movieTypeDefs, movieResolvers } = require("./schema/movieSchema");
const { userTypeDefs, userResolvers } = require("./schema/userSchema");

const server = new ApolloServer({
  typeDefs: [movieTypeDefs, userTypeDefs],
  resolvers: [movieResolvers, userResolvers],
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
