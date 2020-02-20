import { createStore } from "redux";

const initialState = {
  view: "top",
  user: "",
  joke: "joke area",
  date: "",
  locationId: "",
  location: {
    city: "",
    zipcodeFirst: "",
    zipcodeSecond: ""
  },
  restaurants: [],
  activities: [],
  selectedRestaurant: 0,
  selectedActivity: 0,
  weather: -1,
  isLoading: false
};

export const changeLoading = loading => {
  return {
    type: "CHANGE_LOADING",
    loading
  };
};

export const changeJoke = joke => {
  return {
    type: "CHANGE_JOKE",
    joke
  };
};

export const changeView = view => {
  return {
    type: "CHANGE_VIEW",
    view
  };
};

export const selectUser = user => {
  return {
    type: "SELECT_USER",
    user
  };
};
export const setDate = date => {
  return {
    type: "SET_DATE",
    date
  };
};

export const setLocation = location => {
  return {
    type: "SET_LOCATION",
    location
  };
};

export const setRestaurants = restaurants => {
  return {
    type: "SET_RESTAURANTS",
    restaurants
  };
};

export const setActivities = activities => {
  return {
    type: "SET_ACTIVITIES",
    activities
  };
};

export const setSelectedRestaurant = index => {
  return {
    type: "SELECT_RESTAURANT",
    index
  };
};

export const setSelectedActivity = index => {
  return {
    type: "SELECT_ACTIVITY",
    index
  };
};

export const setWeather = weather => {
  return {
    type: "SELECT_WEATHER",
    weather
  };
};

export const setLocationId = id => {
  return {
    type: "SELECT_LOC_ID",
    id
  };
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "CHANGE_LOADING" : {
      return { ...state, isLoading: action.loading}
    }
    case "CHANGE_JOKE": {
      return { ...state, joke: action.joke };
    }
    case "CHANGE_VIEW": {
      return { ...state, view: action.view };
    }
    case "SET_DATE": {
      return { ...state, date: action.date };
    }
    case "SET_LOCATION": {
      return { ...state, location: action.location };
    }
    case "SELECT_USER": {
      return { ...state, user: action.user };
    }
    case "SET_RESTAURANTS": {
      return { ...state, restaurants: [...action.restaurants] };
    }
    case "SET_ACTIVITIES": {
      return { ...state, activities: action.activities };
    }
    case "SELECT_RESTAURANT": {
      return { ...state, selectedRestaurant: action.index };
    }
    case "SELECT_ACTIVITY": {
      return { ...state, selectedActivity: action.index };
    }
    case "SELECT_WEATHER": {
      return { ...state, weather: action.weather };
    }
    case "SELECT_LOC_ID": {
      return { ...state, locationId: action.locationId };
    }
  }
  return state;
};

export const store = createStore(reducer);
