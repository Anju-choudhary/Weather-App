// src/store/index.js
import { createStore } from 'vuex';
import { apolloClient } from '../apollo';
import { GETWEATHER, FETCHWEATHER } from '../graphql/quesries';

const store = createStore({
  state() {
    return {
      currentWeather: null,
      historicalWeather: [],
    };
  },
  mutations: {
    SET_CURRENT_WEATHER(state, weather) {
      state.currentWeather = weather;
    },
    SET_HISTORICAL_WEATHER(state, weatherData) {
      state.historicalWeather = weatherData;
    },
  },
  actions: {
    async fetchCurrentWeather({ commit }, city) {
      console.log("Fetching current weather for:", city); // Debug log
      try {
        const response = await apolloClient.query({
          query: GETWEATHER,
          variables: { city },
        });
        console.log(response.data.getWeather)
        commit('SET_CURRENT_WEATHER', response.data.getWeather);
      } catch (error) {
        console.error('Error fetching current weather:', error);
      }
    },
    async fetchHistoricalWeather({ commit }, { city, fromDate, toDate }) {
      console.log("Fetching history weather for:", city, fromDate, toDate);
      try {
        const response = await apolloClient.query({
          query: FETCHWEATHER,
          variables: { city, fromDate, toDate },
        });
        console.log("getHistoricalWeather",response.data.getHistoricalWeather)
        commit('SET_HISTORICAL_WEATHER', response.data.getHistoricalWeather);
       // window.location.reload();
      } catch (error) {
        console.error('Error fetching historical weather:', error);
      }
    },
  },
  getters: {
    currentWeather: (state) => state.currentWeather,
    historicalWeather: (state) => state.historicalWeather,
  },
});

export default store;
