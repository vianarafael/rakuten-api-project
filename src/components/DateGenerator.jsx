import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { setDate, setLocation } from "../redux";
import "../style/DateGenerator.css";
import DateSuggestion from "./DateSuggestion";

function DateGenerator() {
  const date = useSelector(state => state.date);
  const dispatch = useDispatch();

  const changeDate = param => {
    dispatch(setDate(param));
  };

  let zipcodeFirst = useRef(null);
  let zipcodeSecond = useRef(null);
  let cityInput = useRef(null);

  const onSubmit = () => {
    const newLocation = {
      city: cityInput.current,
      zipcodeFirst: zipcodeFirst.current,
      zipcodeSecond: zipcodeSecond.current
    };
    console.log(newLocation);
    dispatch(setLocation(newLocation));
  };

  const today = new Date();

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
          Restaurant: <input className="restaurant" type="checkbox" />
          Activity: <input className="activity" type="checkbox" />
        </form>
        <button className="submit inputField" onClick={onSubmit}>
          Generate
        </button>
      </div>
      <DateSuggestion />
    </div>
  );
}
export default DateGenerator;
