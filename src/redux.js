import { createStore } from "redux";

const initialState = {
  view: "top",
  user: "",
  joke: "joke area"
};

export const changeJoke = joke => {
  return {
    type: "CHANGE_JOKE",
    joke: "",
    date: "",
    location: {
      city: "",
      zipcodeFirst: "",
      zipcodeSecond: ""
    }
  }
};

export const changeView = view => {
  return {
    type: "CHANGE_VIEW",
    view
  };
};

export const selectUser = (user) => {
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
  }
  return state;
};

export const store = createStore(reducer);
