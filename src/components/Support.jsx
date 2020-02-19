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
            getJoke();
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
          getJoke();
        }}
      >
        <div>{joke}</div>
      </div>
    );
  });

  const getJoke = () => {
    const decideJoke = () => {
      const jokes = [
        "Why didn't the lifeguard save the hippie? Because he was too far out. Ha!",
        "Did you hear about the magic tractor? It was driving down the road and suddenly turned into a field!",
        "What's on the menu? ME N U",
        "If I freeze, it's not a computer virus. I was just stunned by your beauty.",
        "I'm no photographer, but I can picture us together",
        "Are you a font? Because you're just my type",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    };
    dispatch(changeJoke(decideJoke()));
  }

  const sendMail = () => {
    /* TODO call send api*/
  };

  const clickUser = param => {
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
