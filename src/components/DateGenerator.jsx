import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDate,
  setLocation,
  setRestaurants,
  setWeather,
  setLocationId,
  setActivities,
  changeLoading
} from "../redux";
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
  const rWeather = useSelector(state => state.weather);
  const rActivities = useSelector(state => state.activities);
  const rLocationId = useSelector(state => state.locationId);
  const isLoading = useSelector(state => state.isLoading);

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
  const updateWeather = weather => {
    dispatch(setWeather(weather));
  };
  const updateActivities = activities => {
    dispatch(setActivities(activities));
  };
  const updateLocationId = id => {
    dispatch(setLocationId(id));
  };

  //Boolean to render results
  let [showRestaurants, setShowRestaurants] = useState(false);
  let [showActivities, setShowActivities] = useState(false);
  // let [isloading, setIsLoading] = useState(true);

  //User input values
  let zipcodeFirst = useRef(null);
  let zipcodeSecond = useRef(null);
  let cityInput = useRef(null);
  let showRes = useRef(null);
  let showAct = useRef(null);

  const onSubmit = async () => {
    const newLocation = {
      city: cityInput.current.value,
      zipcodeFirst: zipcodeFirst.current.value,
      zipcodeSecond: zipcodeSecond.current.value
    };
    const zip = rLocation.zipcodeFirst + "-" + rLocation.zipcodeSecond;
    await updateLocation(newLocation);
    await getRestaurants(newLocation.city);
    await getWeather(rLocation.city, zip, rDate);
    await getActivity(true, 1066456);
    await setShowRestaurants(showRes.current.checked);
    await setShowActivities(showAct.current.checked);
    // await setIsLoading(false);

    setTimeout(async()=>{dispatch(await changeLoading(true))},8000);
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
          "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
          "x-rapidapi-key": ""
        }
      }
    )
      .then(response => response.json())
      .then(res => {
        const location_id = res.data[0].result_object.location_id;
        updateLocationId(location_id);
        console.log("loaction_id",location_id);
        // 1066456
        /* Get restaurants */
        fetch(
          `https://tripadvisor1.p.rapidapi.com/restaurants/list?limit=30&lang=en_US&location_id=${location_id}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
              "x-rapidapi-key":""
                //REPLACE ME
            }
          }
        )
          .then(response => response.json())
          .then(res => {
            console.log("fetchres",res);
            res.data.forEach(restaurant => {
              tempRestaurants.push(restaurant);
            });
          })
          .then(() => {
            console.log("temP",tempRestaurants)
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

  //WEATHER API REQUEST//
  /* Get location ID */
  // const location = "Shibuya";
  // const zipcode = "107-0062";
  // const date = "2020-02-22";

  // let goodWeather = -1

  const getWeather = (location, zipcode, date) => {
    const dateTime = `${date} 00:00:00`;
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/forecast?q=${location}&zip=${zipcode}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": ""
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        return response.list.forEach(item => {
          if (item.dt_txt.includes(dateTime)) {
            // console.log(item.weather[0].id);
            if (item.weather[0].id < 800) {
              updateWeather(false);
            } else {
              updateWeather(true);
            }
          }
        });
      })
      .then(res => {
        // console.log(goodWeather);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // let goodWeather = false;
  // const location = 1066456;
  const weatherAppropriateActivities = [];

  const getActivity = (goodWeather, location) => {
    if (goodWeather !== -1) {
      if (goodWeather) {
        fetch(
          `https://tripadvisor1.p.rapidapi.com/attractions/list?limit=30&subcategory=47&location_id=${location}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
              "x-rapidapi-key":""
                //REPLACE ME
            }
          }
        )
          .then(response => response.json())
          .then(response => {
            response.data.forEach(activity => {
              weatherAppropriateActivities.push(activity);
            });
          })
          .then(() => updateActivities(weatherAppropriateActivities))
          .catch(err => {
            console.log(err);
          });
      } else {
        fetch(
          `https://tripadvisor1.p.rapidapi.com/attractions/list?limit=30&subcategory=20&location_id=${location}`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
              "x-rapidapi-key":""
                //REPLACE ME
            }
          }
        )
          .then(response => response.json())
          .then(response => {
            response.data.forEach(activity => {
              weatherAppropriateActivities.push(activity);
            });
          })
          .then(() => {
            updateActivities(weatherAppropriateActivities);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
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
        {isLoading && showRestaurants && <Restaurants />}
        {isLoading && showActivities && <Activities />}
      </div>
    </div>
  );
}
export default DateGenerator;
