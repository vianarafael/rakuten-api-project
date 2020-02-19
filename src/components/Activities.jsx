import React from "react";
import "../style/DateSuggestion.css";
import { getWeather, getLocationId, getActivity } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setActivities } from "../redux";

// getWeather = (zipcode = "152-0002", date = "2020-02-20")
// getLocationId = (placeName = "Shibuya")
// getActivity = (weather = true, location = 1066456)
// getRestaurant = (location = 1066456)

function Activities() {
  const dispatch = useDispatch();

  const date = useSelector(state => state.date);
  const location = useSelector(state => state.location);
  const city = location.city;
  const zipcode = location.zipcodeFirst + "-" + location.zipcodeSecond;

  const locationId = getLocationId(city);
  const weather = getWeather(zipcode, date);

  const activities = getActivity(weather, locationId);
  dispatch(setActivities(activities));

  return (
    <div className="Activities">
      <h3>ACTIVITIES:</h3>
    </div>
  );
}
export default Activities;
