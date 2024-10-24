<template>
  <div class="date-range-picker">
    <label for="fromDate" class="block mb-2">From:</label>
    <input 
      id="fromDate" 
      type="date" 
      :max="maxDate" 
      @change="onFromDateChange($event)" 
      v-model="from" 
      class="border p-2 mb-4" />
    
    <label for="toDate" class="block mb-2">To:</label>
    <input 
      id="toDate" 
      type="date" 
      :min="from" 
      :max="maxDate" 
      @change="onToDateChange($event)" 
      v-model="to" 
      class="border p-2 mb-4" />
    
    <!-- Validation messages -->
    <p v-if="dateRangeError" class="text-red-500">{{ dateRangeError }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      from: null, // "From" date
      to: new Date().toISOString().split('T')[0], // Default "To" date (current date)
      maxDate: new Date().toISOString().split('T')[0], // Maximum selectable date (today)
      dateRangeError: '', // Error message for validation
    };
  },
  methods: {
    emitDates() {
      // Ensure both 'from' and 'to' are selected
      if (this.from && this.to) {
        const fromDate = new Date(this.from);
        const toDate = new Date(this.to);

        // Calculate the difference between 'from' and 'to' in days
        const dateDifference = (toDate - fromDate) / (1000 * 60 * 60 * 24);

        // Check if the date range exceeds 30 days
        if (dateDifference > 30) {
          this.dateRangeError = 'Date range cannot exceed 30 days.';
        } else {
          this.dateRangeError = ''; // Clear error message if the range is valid
          this.$emit('date-selected', { from: this.from, to: this.to }); // Emit the selected dates
        }
      }
    },
    onFromDateChange(event) {
      this.from = event.target.value; // Update the "From" date
    },
    onToDateChange(event) {
      this.to = event.target.value; // Update the "To" date
    },
  },
  watch: {
    // Watch for changes to 'from' and 'to', and validate the date range
    from() {
      this.emitDates();
    },
    to() {
      this.emitDates();
    },
  },
};
</script>

<style scoped>
/* Additional styles for date picker and error message */
.border {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.text-red-500 {
  color: #f56565;
}
</style>
