import { createStore } from "redux";

const initialState = {
  view: "top",
  user: "",
};

export const changeView = (view) => {
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

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "CHANGE_VIEW": {
      return { ...state, view: action.view};
    }
    case "SELECT_USER": {
        return { ...state, user: action.user};
      }
  }
  return state;
};

export const store = createStore(reducer);
