const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/index"); // Your GraphQL type definitions
const resolvers = require("./schema/resolver"); // Your GraphQL resolvers
require("./conn/db"); // Database connection

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply middleware
server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8080 }, () => {
  console.log(`🚀 Server ready at http://localhost:8080/graphql`);
});
