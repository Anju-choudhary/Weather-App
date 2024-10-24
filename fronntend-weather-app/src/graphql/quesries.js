// src/graphql/queries.js
import gql from 'graphql-tag';

export const GETWEATHER = gql`
  query GetWeather($city: String!) {
    getWeather(city: $city) {
      temperature
      description
      icon
      city
      date
    }
  }
`;

export const FETCHWEATHER = gql`
  query FetchWeather($city: String!, $fromDate: String!, $toDate: String!) {
    getHistoricalWeather(city: $city, fromDate: $fromDate, toDate: $toDate) {
        city
      date
      temperature
      description
      icon
    }
  }
`;
