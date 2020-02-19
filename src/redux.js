import { createStore } from "redux";

const initialState = {
  view: "top",
  user: "",
  joke: "joke area",
  date: "",
  location: {
    city: "",
    zipcodeFirst: "",
    zipcodeSecond: ""
  },
  restaurants: [],
  activities: []
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

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
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
      return { ...state, restaurants: action.restaurants };
    }
    case "SET_ACTIVITIES": {
      return { ...state, activities: action.activities };
    }
  }
  return state;
};

export const store = createStore(reducer);
