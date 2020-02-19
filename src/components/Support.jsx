import React from "react";
import "../style/App.css";
import {useSelector, useDispatch} from "react-redux";
import { selectUser, changeJoke } from "../redux";

function Support() {
  const selected = useSelector(state => state.user);
  const joke = useSelector(state => state.joke);
  const dispatch = useDispatch();
  const jokeList = ["SIMPLE", "TERRIBLE", "COOL"];

  let parts = jokeList.map((joke, index) => {
    if (index !== selected) {
      return (
        <div
          className="option"
          key={index}
          onClick={() => {
            clickUser(index);
          }}
        >
          <div>
          {joke}
          </div>
        </div>
      );
    }
    return (
      <div
        className="option select"
        key={index}
        onClick={() => {
          clickUser(index);
        }}
      >
        <div>{joke}</div>
      </div>
    );
  });

  const getJoke = () => {
    console.log("getJoke");
    /* TODO call joke api*/
    dispatch(changeJoke("say something!"));
  }

  const sendMail = () => {
    console.log("send");
    /* TODO call send api*/
  };

  const clickUser = param => {
    console.log("select", param);
    // set user
    dispatch(selectUser(param));
  };

  return (
    <div className="Support">
      <h3>Date Support</h3>
      <div className="selectParts">
        {parts}
      </div>
      <div className="jokearea">
        <div>{joke}</div>
      </div>


      <div
        className="sendButton"
        onClick={() => {
          sendMail();
        }}
      >
        COPY
      </div>
    </div>
  );
}

export default Support;
