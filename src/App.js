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
          <div>Do you need help planning a date?</div>
        </div>
        <div className="topButton" onClick={() => clickFunction("support")}>
            <img src={icon2} alt="icon2" className="default"></img>
          <div>Do you need help breaking the ice?</div>
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
      <nav className="mainNav">
        <img src="tara.svg" className="tara" alt="" />
        <a href="#" onClick={() => clickFunction("top")}><p >Tara</p></a>
        <p className="tagline">Your digital dating assistant</p>
      </nav>
      {/* <h1 onClick={() => clickFunction("top")}>Team RATA dating App</h1> */}
      <div className="App">{body}</div>
      <div className="footer">
        <p>Made with ❤️ by Travis, Asami, Rafael, Ashley</p>
      </div>
    </React.Fragment>
  );
}

export default App;
