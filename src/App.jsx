import React from "react";
import "./style/App.css";
import { useSelector, useDispatch } from "react-redux";
import { changeView } from "./redux";
import Support from "./Support";
import DateGenerator from "./components/DateGenerator";

function App() {
  const view = useSelector(state => state.view);
  const dispatch = useDispatch();

  const clickFunction = param => {
    console.log(param);
    dispatch(changeView(param));
  };

  let body;
  if (view === "top") {
    body = (
      <div>
        <div className="topButton" onClick={() => clickFunction("generator")}>
          DATE GENERATOR
        </div>
        <div className="topButton" onClick={() => clickFunction("support")}>
          DATE SUPPORT
        </div>
      </div>
    );
  } else if (view === "generator") {
    body = <DateGenerator></DateGenerator>;
  } else if (view === "support") {
    body = <Support></Support>;
  }
  return (
    <React.Fragment>
    <h1 onClick={() => clickFunction("top")}>Team RATA dating App</h1>
    <div className="App">
      {body}
    </div>
    </React.Fragment>
  );
}

export default App;
