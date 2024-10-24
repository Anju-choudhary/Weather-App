<template>
  <div class="mb-4">
    <label for="location" class="block text-sm font-medium text-gray-700">Select Location:</label>
    <select
      id="location"
      v-model="selectedLocation"
      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
    >
      <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
    </select>

    <!-- Add a button to trigger showing the weather -->
    <button
      @click="onShowWeather"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Show Weather
    </button>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedLocation: this.selected,
      locations: ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'],
    };
  },
  watch: {
    selected(newVal) {
      this.selectedLocation = newVal;
    },
  },
  methods: {
    onShowWeather() {
      this.$emit('location-changed', this.selectedLocation); // Emit the selected location when button is clicked
    },
  },
};
</script>
