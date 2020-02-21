import React from "react";
import "../style/Restaurants.css";
import { useSelector, useDispatch } from "react-redux";
import { setRestaurants, setSelectedRestaurant } from "../redux";

// getWeather = (zipcode = "152-0002", date = "2020-02-20")
// getLocationId = (placeName = "Shibuya")
// getActivity = (weather = true, location = 1066456)
// getRestaurant = (location = 1066456)

function Restaurants() {
  const dispatch = useDispatch();
  const selectedRestaurant = useSelector(state => state.selectedRestaurant);
  const rRestaurants = useSelector(state => state.restaurants);

  //Restaruant info
  const res = rRestaurants[selectedRestaurant];
  const name = res.name;
  const address = res.address; //address_obj for object-form
  let imgSrc
  if(!res.hasOwnProperty('photo')){
    imgSrc = "noimage.svg"
  } else {
    imgSrc = res.photo.images.medium.url;
  }
  const webUrl = res.web_url;
  const hours = res.hours; //obj "res.hours.week_ranges" for array of days
  // const bookingUrl = res.booking.url; //res.booking.provider for provider name i.e. GURUNAVI

  function changeRestaurant() {
    if (selectedRestaurant < rRestaurants.length - 1) {
      const next = selectedRestaurant + 1;
      dispatch(setSelectedRestaurant(next));
    } else {
      dispatch(setSelectedRestaurant(0));
    }
  }

  return (
    <div className="Restaurants">
      <h3>RESTAURANT:</h3>
      <div className="restaurant-card">
        <div className="resName">{name}</div>
        <img src={imgSrc} alt="restaurant"  className="resultImg" />
        <div className="resAddr">{address}</div>
        <a href={webUrl}>WEBSITE</a>
      </div>
      <button onClick={changeRestaurant}>Change Restaurant</button>
    </div>
  );
}
export default Restaurants;
