const { gql } = require("apollo-server-express");

// Define your GraphQL schema using SDL
const typeDefs = gql`
  type Weather {
    city: String
    temperature: String
    description: String
    icon: String
    date: String
    queriedAt: String
  }

  type Query {
    getWeather(city: String!): Weather
    getHistoricalWeather(
      city: String!
      fromDate: String!
      toDate: String!
    ): [Weather]
  }
`;

module.exports = typeDefs;
