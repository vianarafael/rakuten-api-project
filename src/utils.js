// import axios from "axios";
const axios = require("axios");

export const getWeather = (zipcode = "152-0002", date = "2020-02-20") => {
  console.log(process.env.REACT_APP_RAPID_API_KEY_WEATHER);
  const dateTime = `${date} 00:00:00`;
  axios({
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/forecast",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY_WEATHER
    },
    params: {
      zip: `${zipcode},jp`
    }
  })
    .then(response => {
      // Boolean, true = no rain, so outdoor is ok, false = rain, recommend indoor date
      // response.json()
      response.data.list.forEach(item => {
        if (item.dt_txt.includes(dateTime)) {
          if (item.weather[0].id < 800) {
            return false;
          }
          return true;
        }
        return -1;
      });
    })

    .catch(error => {
      console.log(error);
    });
};

export const getLocationId = (placeName = "Shibuya") => {
  let location;
  axios({
    method: "GET",
    url: "https://tripadvisor1.p.rapidapi.com/locations/search",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY_TRIP
    },
    params: {
      location_id: "1",
      limit: "1",
      sort: "relevance",
      offset: "0",
      lang: "en_US",
      currency: "USD",
      units: "km",
      query: `${placeName}`
    }
  })
    .then(response => {
      location = response.data.data[0].result_object.location_id;
      // console.log(
      //   "getLocationId",
      //   response.data.data[0].result_object.location_id
      // );
    })
    .catch(error => {
      console.log(error);
    });

  return location;
};

export const getActivity = (weather = true, location = 1066456) => {
  if (!weather) {
    //indoor actitivies
    axios({
      method: "GET",
      url: "https://tripadvisor1.p.rapidapi.com/attractions/list",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY_TRIP
      },
      params: {
        lang: "en_US",
        currency: "USD",
        sort: "recommended",
        lunit: "km",
        limit: "10",
        bookable_first: "false",
        subcategory: "20,56,58",
        location_id: `${location}`
      }
    })
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
  // outdoor activites
  axios({
    method: "GET",
    url: "https://tripadvisor1.p.rapidapi.com/attractions/list",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY_TRIP
    },
    params: {
      lang: "en_US",
      currency: "USD",
      sort: "recommended",
      lunit: "km",
      limit: "10",
      bookable_first: "false",
      subcategory: "47,57,61",
      location_id: `${location}`
    }
  })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const getRestaurant = (location = 1066456) => {
  axios({
    method: "GET",
    url: "https://tripadvisor1.p.rapidapi.com/attractions/list",
    headers: {
      "content-type": "application/json",
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY_TRIP
    },
    params: {
      lang: "en_US",
      currency: "USD",
      sort: "recommended",
      lunit: "km",
      limit: "10",
      bookable_first: "false",
      subcategory: "36",
      location_id: `${location}`
    }
  })
    .then(response => {
      return response.data.data;
    })
    .catch(error => {
      console.log(error);
    });
};
