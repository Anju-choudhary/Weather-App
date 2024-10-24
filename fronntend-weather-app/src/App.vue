<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Weather App</h1>
     <!-- Main Layout: Grid with 2 columns -->
    <div class="grid grid-cols-2 gap-4">

     <!-- Current Weather Section -->
      <div>
        <h2 class="text-xl font-semibold mb-2">Current Weather</h2>
    <!-- City Selection Input -->
    <LocationSelector 
      :selected="location" 
      @location-changed="fetchCurrentWeather" 
    />
    <!-- Loading Indicator -->
    <div v-if="loading" class="loading-spinner mt-4">
      <p>Loading historical data...</p>
    </div>
    <WeatherCard v-if="currentWeather" :weather="currentWeather"
    :currentTime="currentTime"  class="mt-4" />

      </div>
    
       <!-- Historical Weather Section -->
      <div>
        <h2 class="text-xl font-semibold mb-2">Historical Weather</h2>
    <!-- Independent Location Selector for Historical Weather -->
    <HistoricalLocation @location-selected="onHistoricalLocationSelected" />

    <!-- Date Range Picker for Historical Weather -->
    <DateRangePicker @date-selected="onDateRangeSelected" />
   <!-- Display Error Message -->
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
    <!-- Single Button to trigger fetching historical weather -->
    <button 
      @click="fetchHistoricalWeather" 
      class="mt-4 p-2 bg-blue-500 text-white">
      Show Historical Weather
    </button>
     <div v-if="loading" class="loading-spinner mt-4">
      <p>Loading historical data...</p>
    </div>

    <WeatherTable v-if="historicalWeather.length > 0" :weatherData="historicalWeather" class="mt-4" />
  </div>
   </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import WeatherCard from './components/waetherCard.vue';
import WeatherTable from './components/weatherTable.vue';
import DateRangePicker from './components/DateRangePicker.vue';
import LocationSelector from './components/locationsSelector.vue';
import HistoricalLocation from './components/historicalLocation.vue';

export default {
  components: { WeatherCard, WeatherTable, DateRangePicker, LocationSelector, HistoricalLocation },
  
  data() {
    return {
      location: 'Delhi', // Default city
      historicalLocation: null, // Selected location for historical weather
      selectedFromDate: null, // Selected from date
      selectedToDate: null, 
      currentTime: '' , // Selected to date
       loading: false,// To control the loading spinner
      errorMessage: '', // To store validation or error messages
    };
  },
  
  computed: {
    ...mapGetters(['currentWeather', 'historicalWeather']),
  },

  methods: {
    async fetchCurrentWeather(location) {
     this.loading = true;
     try{
     console.log("Fetching weather for city:", location);
      await this.$store.dispatch('fetchCurrentWeather', location);
      this.setCurrentTime(); 
       // Reset the loading state once the data is fetched
        this.loading = false;
      }
     catch(error){
       console.error("Error fetching historical data:", error);
        this.loading = false;}
      
    },

    async fetchHistoricalWeather() {
  console.log("Fetching historical data for:", this.historicalLocation, this.selectedFromDate, this.selectedToDate);

  // Validate that both location and date range are selected
  if (this.historicalLocation && this.selectedFromDate && this.selectedToDate) {
    const formattedFrom = new Date(this.selectedFromDate).toISOString().split('T')[0];
    const formattedTo = new Date(this.selectedToDate).toISOString().split('T')[0];

    // Ensure the "From" date is not after the "To" date
    if (new Date(formattedFrom) > new Date(formattedTo)) {
      console.error('From date cannot be after To date.');
      this.errorMessage = 'Please ensure the From date is earlier than or equal to the To date.';
      return;
    }
         // Calculate the difference in days between From and To dates
        const fromDate = new Date(this.selectedFromDate);
        const toDate = new Date(this.selectedToDate);
        const dayDifference = (toDate - fromDate) / (1000 * 60 * 60 * 24); // Difference in days

        // Validate that the date range is not more than 30 days
        if (dayDifference > 30) {
          console.error('Date range exceeds the 30-day limit.');
          this.errorMessage = 'The selected date range exceeds the 30-day limit. Please select a shorter range.';
          return;
        }

        // Clear error messages before fetching
        this.errorMessage = '';
     // Set loading to true
      this.loading = true;
      try {
         // Dispatch the action to fetch historical weather
   await this.$store.dispatch('fetchHistoricalWeather', {
      city: this.historicalLocation,
      fromDate: formattedFrom,
      toDate: formattedTo,
    });
        // Reset the loading state once the data is fetched
        this.loading = false;
      } catch (error) {
        console.error("Error fetching historical data:", error);
           this.errorMessage = 'Error fetching historical data. Please try again later.';
      }
      finally {
          this.loading = false; // End loading
        }
  

  } else {
    console.error('Please select both a location and a valid date range.');
     this.errorMessage = 'Please select both a location and a valid date range.';
  }
},

    onHistoricalLocationSelected(location) {
     console.log("Selected historical location:", location); 
      this.historicalLocation = location; // Store selected location
    },

    onDateRangeSelected({ from, to }) {
      this.selectedFromDate = from; // Store selected "From" date
      this.selectedToDate = to;     // Store selected "To" date
    },

    setCurrentTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString(); // Update current time
    },
  },

  mounted() {
    this.fetchCurrentWeather(this.location); // Fetch current weather on mount
  },
};
</script>

<style scoped>
/* Add any additional styles here if needed */
.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-spinner p {
  font-size: 16px;
  color: #333;
}

.loading-spinner::after {
  content: "";
  width: 24px;
  height: 24px;
  border: 4px solid #ccc;
  border-top: 4px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-left: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
