import React from "react";
import "../style/DateSuggestion.css";
import { getLocationId, getRestaurant } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurants } from "../redux";

// getWeather = (zipcode = "152-0002", date = "2020-02-20")
// getLocationId = (placeName = "Shibuya")
// getActivity = (weather = true, location = 1066456)
// getRestaurant = (location = 1066456)

function Restaurants() {
  const dispatch = useDispatch();

  const location = useSelector(state => state.location);
  const city = location.city;

  const locationId = getLocationId(city);

  const restaurants = getRestaurant(locationId);
  dispatch(setRestaurants(restaurants));

  return (
    <div className="Restaurants">
      <h3>RESTAURANTS:</h3>
    </div>
  );
}
export default Restaurants;
