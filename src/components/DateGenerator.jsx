import React from "react";
import "../style/App.css";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { setDate } from "../redux";

//get weather by date
//filter activity by weather and location
//filter resturant by weather and location

function DateGenerator() {
  const date = useSelector(state => state.date);
  const dispatch = useDispatch();

  const changeDate = param => {
    console.log(param);
    dispatch(setDate(param));
  };
  return (
    <div className="DateGenerator">
      <h1>Plan your perfect day</h1>
      <DatePicker selected={date} onChange={date => changeDate(date)} />
      <form>
        <p>Prefecture: </p>
        <input type="text" />
        <p>City: </p>
        <input type="text" />
      </form>
    </div>
  );
}
export default DateGenerator;
