import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { setDate, setLocation } from "../redux";
import "../style/DateGenerator.css";
import Activities from "./Activities";
import Restaurants from "./Restaurants";

function DateGenerator() {
  const dispatch = useDispatch();
  const date = useSelector(state => state.date);
  const today = new Date();
  let showRestaurants = false;
  let showActivities = false;

  const changeDate = param => {
    dispatch(setDate(param));
  };

  let zipcodeFirst = useRef(null);
  let zipcodeSecond = useRef(null);
  let cityInput = useRef(null);
  let showRes = useRef(null);
  let showAct = useRef(null);

  const onSubmit = () => {
    showRestaurants = showRes.current.value;
    showActivities = showAct.current.value;
    const newLocation = {
      city: cityInput.current.value,
      zipcodeFirst: zipcodeFirst.current.value,
      zipcodeSecond: zipcodeSecond.current.value
    };
    console.log(newLocation);
    dispatch(setLocation(newLocation));
  };

  return (
    <div className="DateGenerator">
      <h1 className="DateGenTitle">Plan your perfect day</h1>
      <div className="inputContainer">
        <span>
          Date:
          <DatePicker
            className="date inputField"
            selected={date}
            onChange={date => changeDate(date)}
            maxDate={today + 5} //TODO this attribute doesnt work
          />
        </span>
        <form>
          <span>
            City:
            <input className="city inputField" type="text" ref={cityInput} />
          </span>
          <br />
          <span>
            Zipcode:
            <input
              className="zipcodeFirst inputField"
              type="text"
              maxLength="3"
              ref={zipcodeFirst}
            />
            -
            <input
              className="zipcodeSecond inputField"
              type="text"
              maxLength="4"
              ref={zipcodeSecond}
            />
          </span>
          <br />
          <span className="restaurant restaurant-container">
            Restaurants:{" "}
            <input className="restaurant" type="checkbox" ref={showRes} />
          </span>
          <span className="activity activity-container">
            Activities:{" "}
            <input className="activity" type="checkbox" ref={showAct} />
          </span>
        </form>
        <button className="submit inputField" onClick={onSubmit}>
          Generate
        </button>
      </div>
      if (showRestaurants) {<Restaurants />}
      if (showActivities) {<Activities />}
    </div>
  );
}
export default DateGenerator;
