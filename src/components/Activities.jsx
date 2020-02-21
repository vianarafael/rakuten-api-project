import React from "react";
import "../style/Activities.css";
import { getWeather, getLocationId, getActivity } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setActivities, setSelectedActivity } from "../redux";

// getWeather = (zipcode = "152-0002", date = "2020-02-20")
// getLocationId = (placeName = "Shibuya")
// getActivity = (weather = true, location = 1066456)
// getRestaurant = (location = 1066456)

function Activities() {
  const dispatch = useDispatch();
  const selectedActivity = useSelector(state => state.selectedActivity);
  const rActivity = useSelector(state => state.activities);
  const rWeather = useSelector(state => state.weather); // true = sunny, false = rain;
  const actCity = useSelector(state => state.location.city);
 

  //Activity info
  console.log(rActivity);
  const res = rActivity[selectedActivity];
  const name = res.name;
  const address = res.address; //address_obj for object-form
  let imgSrc;
  if (!res.hasOwnProperty("photo")) {
    imgSrc = "noimage.svg";
  } else {
    imgSrc = res.photo.images.medium.url;
  }
  const webUrl = res.web_url;
  const hours = res.hours; //obj "res.hours.week_ranges" for array of days
  // const bookingUrl = res.booking.url; //res.booking.provider for provider name i.e. GURUNAVI

  async function changeActivity() {
    // const locationId = getLocationId();
    // console.log("locationId", locationId);
    // const id = await getId();
    //   await console.log(id);
    if (selectedActivity < rActivity.length - 1) {
      let nextActivity = selectedActivity + 1;
      dispatch(setSelectedActivity(nextActivity));
    } else {
      dispatch(setSelectedActivity(0));
    }
    console.log("next activity", selectedActivity);
  }

  return (
    <div className="Activities">
      <h3>ACTIVITY:</h3>
      {rWeather ? 
      <div>The forecast is predicting <span className="emphasisColor">sunny skies in {actCity}</span>, so I recommend an outdoor activity.</div> 
      : <div>The forecast is predicting <span className="emphasisColor">rain in {actCity}</span>, so I recommend an indoor activity.</div> }
      <div className="activity-card">
        <div className="resName">{name}</div>
        <img src={imgSrc} alt="activity" className="resultImg" />
        <div className="resAddr">{address}</div>
        <a href={webUrl}>WEBSITE</a>
      </div>
      <button onClick={changeActivity} className="submit-button">Change Activity</button>
    </div>
  );
}
export default Activities;
