import { createStore } from "redux";

const initialState = {
  view: "top",
};

export const changeView = (view) => {
  return {
    type: "CHANGE_VIEW",
    view
  };
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "CHANGE_VIEW": {
      return { ...state, view: action.view};
    }
  }
  return state;
};

export const store = createStore(reducer);
