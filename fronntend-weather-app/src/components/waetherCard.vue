<template>
  <div class="weather-card" v-if="weather">
    <h2>{{ weather.city }}</h2>
    <p>Temperature: {{ weather.temperature }} °C</p>
    <p>Description: {{ weather.description }}</p>
      <p>Current Time: {{ currentTime }}</p>
    <p>Date: {{ formattedDate }}</p>
    <img :src="iconUrl" alt="Weather icon" />
  </div>
</template>

<script>
export default {

  props: {
    weather: {
      type: Object,
      required: true,
    },
      currentTime:{
      type:String, required:true
      },
  },

  computed: {
      formattedDate() {
    let dateValue = this.weather.date;

    console.log("Received date (raw):", dateValue); // Log the raw date value

    // Ensure the dateValue is a number
    if (typeof dateValue === 'string') {
      dateValue = parseInt(dateValue, 10); // Convert to number if it's a string
    }

    const dateObj = new Date(dateValue); // Create a Date object from the timestamp

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) {
      console.error("Invalid date object:", dateObj);
      return 'Invalid Date';
    }

    // Return a formatted date string (e.g., "MM/DD/YYYY")
    return dateObj.toLocaleDateString(); // Format the date to a human-readable string
  },
     iconUrl() {
      return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`; // Dynamically generate the icon URL
    },
  },
};
</script>
