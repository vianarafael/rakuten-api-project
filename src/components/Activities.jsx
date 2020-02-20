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

  //Activity info
  console.log("res array from state", rActivity);
  console.log("render index", selectedActivity);
  console.log("res at index:", rActivity[selectedActivity]);
  const res = rActivity[selectedActivity];

  async function changeActivity() {
    const locationId = getLocationId();
    console.log("locationId", locationId);
    //   console.log({ selectedActivity });
    // const id = await getId();
    //   await console.log(id);
    //   // if (selectedActivity < activities.length - 1) {
    //   let nextActivity = selectedActivity + 1;
    //   dispatch(setSelectedActivity(nextActivity));
    //   // }
    //   dispatch(setSelectedActivity(0));
    // console.log("next activity", selectedActivity);
  }

  return (
    <div className="Activities">
      <h3>ACTIVITY:</h3>
      <div className="activity-card">
        <p>Activity Name Here</p>
        <p>Activity Description: </p>
        <p>Restaurant Address Here</p>
        IMG: <img alt="activity" />
      </div>
      <button onClick={changeActivity}>Change Activity</button>
    </div>
  );
}
export default Activities;
