const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const Weather = require("../models/weather"); // Mongoose model for storing weather data
const axios = require("axios");

// Define Historical Weather Type
const HistoricalWeatherType = new GraphQLObjectType({
  name: "HistoricalWeather",
  fields: {
    city: { type: GraphQLString },
    temperature: { type: GraphQLString },
    description: { type: GraphQLString },
    icon: { type: GraphQLString },
    date: { type: GraphQLString },
  },
});

// Define Root Query Type for fetching historical weather data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getHistoricalWeather: {
      type: new GraphQLList(HistoricalWeatherType),
      args: {
        city: { type: GraphQLString },
        fromDate: { type: GraphQLString },
        toDate: { type: GraphQLString },
      },
      async resolve(parent, args) {
        // Date validation logic
        const maxDateRange = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        const fromDate = new Date(args.fromDate);
        const toDate = new Date(args.toDate);

        // Check if date range exceeds 30 days
        if (toDate - fromDate > maxDateRange) {
          throw new Error("Date range should not exceed 30 days.");
        }

        // Query MongoDB for weather data based on the city and date range
        const weatherData = await Weather.find({
          city: args.city,
          date: {
            $gte: fromDate, // Greater than or equal to fromDate
            $lte: toDate, // Less than or equal to toDate
          },
        });

        // If no data in MongoDB, fetch from OpenWeatherMap API
        if (weatherData.length === 0) {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${args.city}&appid=e3a63a13e1065f8f0f068f043c96c63a&units=metric`
          );

          // Create a new weather data entry
          const newWeatherData = new Weather({
            city: args.city,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            date: new Date(), // Save the current date for the new data
          });

          // Save the new weather data to MongoDB
          await newWeatherData.save();

          // Return the saved weather data
          return [newWeatherData];
        }

        // Return the weather data from MongoDB
        return weatherData;
      },
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
});
