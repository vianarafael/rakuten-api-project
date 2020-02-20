import React from "react";
import "./style/App.css";
import { useSelector, useDispatch } from "react-redux";
import { changeView } from "./redux";
import Support from "./components/Support";
import DateGenerator from "./components/DateGenerator";
import icon1 from "./images/icon1.png";
import icon2 from "./images/icon2.png";

function App() {
  const view = useSelector(state => state.view);
  const dispatch = useDispatch();

  const clickFunction = param => {
    console.log("change view:", param);
    dispatch(changeView(param));
  };

  let body;
  if (view === "top") {
    body = (
      <div className="menus">
        <div className="topButton" onClick={() => clickFunction("generator")}>
          <img src={icon1} alt="icon1"></img>
          <div>DATE GENERATOR</div>
        </div>
        <div className="topButton" onClick={() => clickFunction("support")}>
          <img src={icon2} alt="icon2"></img>
          <div>DATE SUPPORT</div>
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
      <div className="App">{body}</div>
    </React.Fragment>
  );
}

export default App;
