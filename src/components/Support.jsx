import React from "react";
import "../style/App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, changeJoke } from "../redux";

function Support() {
  const selected = useSelector(state => state.user);
  const joke = useSelector(state => state.joke);
  const dispatch = useDispatch();
  const usersList = ["Sora", "Hanako", "Mami"]; // TODO ADD email??

  let parts = usersList.map((usr, index) => {
    if (index !== selected) {
      return (
        <div
          className="user"
          key={index}
          onClick={() => {
            clickUser(index);
          }}
        >
          <span role="img" aria-label="HappyFace">
            😄
          </span>
          <div>{usr}</div>
        </div>
      );
    }
    return (
      <div
        className="user select"
        key={index}
        onClick={() => {
          clickUser(index);
        }}
      >
        <span role="img" aria-label="RelievedFace">
          😌
        </span>
        <div>{usr}</div>
      </div>
    );
  });

  const getJoke = () => {
    console.log("getJoke");
    /* TODO call joke api*/
    dispatch(changeJoke("say something!"));
  };

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
      <div className="jokearea">{joke}</div>
      <div
        className="updatejoke"
        onClick={() => {
          getJoke();
        }}
      >
        🔄
      </div>

      <div className="sendList">{parts}</div>

      <div
        className="sendButton"
        onClick={() => {
          sendMail();
        }}
      >
        SEND!
      </div>
    </div>
  );
}

export default Support;
