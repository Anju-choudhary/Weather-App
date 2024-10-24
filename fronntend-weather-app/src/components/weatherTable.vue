<template>
  <div>
    <h2 class="text-xl font-bold">Historical Weather</h2>
    <table class="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr>
          <th class="border border-gray-300 p-2">Date</th>
          <th class="border border-gray-300 p-2">City</th>
          <th class="border border-gray-300 p-2">Temperature (°C)</th>
          <th class="border border-gray-300 p-2">Description</th>
          <th class="border border-gray-300 p-2">Icon</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="weather in weatherData" :key="weather.date">
          <td class="border border-gray-300 p-2">{{ formatDate(weather.date) }}</td>
          <td class="border border-gray-300 p-2">{{ weather.city }}</td>
          <td class="border border-gray-300 p-2">{{ weather.temperature }}</td>
          <td class="border border-gray-300 p-2">{{ weather.description }}</td>
          <td>
          <img :src="getIconUrl(weather.icon)" alt="Weather Icon" />
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Array,
      required: true,
    },
  },
   methods: {
  formatDate(timestamp) {
      // Ensure timestamp is treated as a number
      const date = new Date(Number(timestamp));
      return date.toLocaleDateString(); // Adjust formatting as needed
    },
    getIconUrl(icon) {
      return `http://openweathermap.org/img/wn/${icon}@2x.png`;
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
