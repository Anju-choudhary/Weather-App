// Import required external node modules
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const typeDefs = require("./schema/index");
const resolvers = require("./schema/resolver");
const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8081"; // Use env variables
// Middleware to handle CORS more securely
app.use((req, res, next) => {
  const allowedOrigins = FRONTEND_URL || "*"; // Use environment variable for allowed origin
  const allowedMethods = "GET, POST, PUT, DELETE, OPTIONS"; // Define allowed methods

  res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
  res.setHeader("Access-Control-Allow-Methods", allowedMethods);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end(); // Respond OK to OPTIONS preflight requests
  } else {
    next(); // Proceed with other requests
  }
});

// GraphQL endpoint
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: weatherSchema,
//     graphiql: true,
//   })
// );

const server = new ApolloServer({
  typeDefs,
  resolvers,
  pplayground: process.env.NODE_ENV !== "production", // Disable in production
  debug: process.env.NODE_ENV !== "production",
});

// Start the server and connect to MongoDB
const startServer = async () => {
  try {
    // Wait for the MongoDB connection to be established
    await require("./conn/db"); // Call your db connection function

    // Start the Apollo server
    await server.start();

    // Apply middleware to connect Apollo Server with Express
    server.applyMiddleware({ app, path: "/graphql" });

    // Start the Express server
    app.listen(PORT, () => {
      console.log("Server running on port ${PORT}");
      console.log(
        `GraphQL endpoint available at http://localhost:${8080}/graphql`
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit process on failure
  }
};

// Call the function to start the server
startServer();
