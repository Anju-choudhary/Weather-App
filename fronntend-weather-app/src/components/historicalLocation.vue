<template>
  <div class="mb-4">
    <label for="location" class="block text-sm font-medium text-gray-700">
      Select Location:
    </label>
    <select
      id="location"
      v-model="selectedLocation"
      @change="emitLocation"
      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
    >
      <option value="" disabled>Please select a location</option> <!-- Default prompt -->
      <option v-for="location in locations" :key="location" :value="location">
        {{ location }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLocation: '', // Initialize as empty to show default prompt
      locations: ['Delhi', 'Moscow', 'Paris', 'New York', 'Sydney', 'Riyadh'],
    };
  },
  methods: {
    emitLocation() {
      if (this.selectedLocation) {
        this.$emit('location-selected', this.selectedLocation);
      }
    },
  },
};
</script>

<style scoped>
/* Additional styles */
</style>
