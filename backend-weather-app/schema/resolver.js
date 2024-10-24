const Weather = require("../models/weather"); // Import the Weather model
const axios = require("axios"); // Import axios for API requests

// Define your resolvers
const resolvers = {
  Query: {
    getWeather: async (parent, { city }) => {
      console.log(city);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e3a63a13e1065f8f0f068f043c96c63a&units=metric`
      );

      const weatherData = new Weather({
        city,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      });

      await weatherData.save();

      return weatherData;
    },

    getHistoricalWeather: async (parent, { city, fromDate, toDate }) => {
      // Ensure dates are in the correct format
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      endDate.setHours(23, 59, 59, 999);
      console.log(city, fromDate, toDate, startDate, endDate);
      // Check if the dates are valid
      if (isNaN(startDate) || isNaN(endDate)) {
        console.log("Invalid date range");
      }

      //   const from = new Date(fromDate);
      //   const to = new Date(toDate);

      //  const maxDateRange = 30 * 24 * 60 * 60 * 1000;//30 days in milliseconds
      //  if (startDate - endDate > maxDateRange) {
      //    throw new Error('Date range should not exceed 30 days.');
      //  }

      //   const results = await Weather.find({
      //     city,
      //     date: { $gte: from, $lte: to },
      const history = await Weather.find({
        city: city,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      });
      //   });

      console.log(`Found results: ${JSON.stringify(history)}`);
      return history;
    },
  },
};

module.exports = resolvers; // Export the resolvers
