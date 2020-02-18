import React from "react";
import "./style/App.css";
import {useSelector, useDispatch} from "react-redux";
import { changeView } from "./redux";
import Support from "./Support";

function App() {

  const view = useSelector(state => state.view);
  const dispatch = useDispatch();

  const  clickFunction = (param) => {
    console.log(param);
    dispatch(changeView(param))
  }

  let body;
  if  (view === "top") {
    body = 
      <div>
        <div className="topButton" onClick={()=> clickFunction('generator')}>DATE GENERATOR</div>　
        <div className="topButton" onClick={()=> clickFunction('support')}>DATE SUPPORT</div>
      </div>
    
  } else if (view === "generator"){
    /* change the component name */
    body =  "date generator~~~!"
  } else if (view === "support") {
    body = <Support></Support>
  } 
  return (
    <div className="App">
      <h1 onClick={()=> clickFunction('top')}>Team RATA dating App</h1>
      {body}
    </div>
  );
}

export default App;
