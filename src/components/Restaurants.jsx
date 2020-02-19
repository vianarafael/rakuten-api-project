import React from "react";
import "../style/DateSuggestion.css";
import { getLocationId, getRestaurant } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurants, setSelectedRestaurant } from "../redux";

// getWeather = (zipcode = "152-0002", date = "2020-02-20")
// getLocationId = (placeName = "Shibuya")
// getActivity = (weather = true, location = 1066456)
// getRestaurant = (location = 1066456)

function Restaurants() {
  const dispatch = useDispatch();
  let selectedRestaurant = useSelector(state => state.selectedRestaurant);

  const location = useSelector(state => state.location);
  const city = location.city;

  const locationId = getLocationId(city);
  const restaurants = getRestaurant(locationId);
  dispatch(setRestaurants(restaurants));

  function changeRestaurant() {
    console.log({ selectedRestaurant });
    if (selectedRestaurant < restaurants.length - 2) {
      dispatch(setSelectedRestaurant(selectedRestaurant++));
    }
    selectedRestaurant = 0;
    console.log("next restaurant", selectedRestaurant);
  }

  return (
    <div className="Restaurants">
      <h3>RESTAURANT:</h3>
      <button onClick={changeRestaurant}>Change Restaurant</button>
    </div>
  );
}
export default Restaurants;
