import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDate, setLocation, setRestaurants } from "../redux";
import "../style/DateGenerator.css";
import Activities from "./Activities";
import Restaurants from "./Restaurants";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function DateGenerator() {
  const dispatch = useDispatch();

  //Values from Redux state all values prefixed with "r"
  const rDate = useSelector(state => state.date);
  const rLocation = useSelector(state => state.location); //contains city and zipcode
  const rRestaurants = useSelector(state => state.restaurants);

  //Functions to update Redux state
  const changeDate = param => {
    dispatch(setDate(param));
  };
  const updateRestaurants = restaurants => {
    dispatch(setRestaurants(restaurants));
  };
  const updateLocation = location => {
    dispatch(setLocation(location));
  };

  //Boolean to render results
  let [showRestaurants, setShowRestaurants] = useState(false);
  let [showActivities, setShowActivities] = useState(false);

  //User input values
  let zipcodeFirst = useRef(null);
  let zipcodeSecond = useRef(null);
  let cityInput = useRef(null);
  let showRes = useRef(null);
  let showAct = useRef(null);

  const onSubmit = () => {
    setShowRestaurants(showRes.current.checked);
    setShowActivities(showAct.current.checked);
    const newLocation = {
      city: cityInput.current.value,
      zipcodeFirst: zipcodeFirst.current.value,
      zipcodeSecond: zipcodeSecond.current.value
    };
    updateLocation(newLocation);
    getRestaurants(newLocation.city);
  };

  const addDays = (startDate, days) => {
    return new Date(startDate.getTime() + days * 24 * 60 * 60 * 1000);
  };

  //RESTAURANTS API REQUEST//
  const tempRestaurants = [];
  // let place = "Shibuya";
  /* Get location ID */
  const getRestaurants = place => {
    fetch(
      `https://tripadvisor1.p.rapidapi.com/locations/search?location_id=1&limit=1&sort=relevance&offset=0&lang=en_US&currency=USD&units=km&query=${place}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "", //REPLACE ME
          "x-rapidapi-key": "" //EPLACE ME
        }
      }
    )
      .then(response => response.json())
      .then(res => {
        const location_id = res.data[0].result_object.location_id;
        // console.log(location_id);
        // 1066456
        /* Get restaurants */
        fetch(
          `https://tripadvisor1.p.rapidapi.com/restaurants/list?limit=30&lang=en_US&location_id=${location_id}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "", //REPLACE ME
              "x-rapidapi-key": "" //EPLACE ME
            }
          }
        )
          .then(response => response.json())
          .then(res => {
            // console.log(res);
            res.data.forEach(restaurant => {
              tempRestaurants.push(restaurant);
            });
          })
          .then(() => {
            updateRestaurants(tempRestaurants);
          })
          .catch(err => {
            console.log(err, " restaurants");
          });
      })
      .catch(err => {
        // console.log(err, " location ID");
      });
    // console.log("stateRes", rRestaurants);
  };

  //Render
  return (
    <div className="DateGenerator">
      <h1 className="DateGenTitle">Plan your perfect day</h1>
      <div className="inputContainer">
        <span>
          Date:
          <DatePicker
            selected={rDate}
            onChange={date => changeDate(date)}
            maxDate={addDays(new Date(), 5)}
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
        {showRestaurants && <Restaurants />}
        {showActivities && <Activities />}
      </div>
    </div>
  );
}
export default DateGenerator;
