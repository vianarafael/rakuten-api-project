
import React from "react";
import ReactDOM from "react-dom";
import "./style/App.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { store } from "./redux.js";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css"

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

