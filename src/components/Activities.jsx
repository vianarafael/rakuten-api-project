import React from "react";
import "../style/DateSuggestion.css";
import { getWeather, getLocationId, getActivity } from "../utils";
import { useSelector, useDispatch } from "react-redux";
import { setActivities, setSelectedActivity } from "../redux";

// getWeather = (zipcode = "152-0002", date = "2020-02-20")
// getLocationId = (placeName = "Shibuya")
// getActivity = (weather = true, location = 1066456)
// getRestaurant = (location = 1066456)

function Activities() {
  const dispatch = useDispatch();
  const getId = async () => {
    let id = await getLocationId();
    await console.log({ id });
    return id;
  };
  getId();

  const selectedActivity = useSelector(state => state.selectedActivity);
  // const date = useSelector(state => state.date);
  // const location = useSelector(state => state.location);

  // const city = location.city;
  // const zipcode = location.zipcodeFirst + "-" + location.zipcodeSecond;

  // const locationId = getLocationId(city);
  // console.log("locationId", locationId);
  // const weather = getWeather(zipcode, date);
  // console.log("weather", weather);

  // console.log(getActivity(weather, locationId));
  // const activities = getActivity(weather, locationId);
  // console.log("activities", activities);
  // dispatch(setActivities(activities));

  async function changeActivity() {
    console.log({ selectedActivity });
    const id = await getId();
    await console.log(id);

    // if (selectedActivity < activities.length - 2) {
    let nextActivity = selectedActivity + 1;
    dispatch(setSelectedActivity(nextActivity));
    // }
    dispatch(setSelectedActivity(0));
    console.log("next activity", selectedActivity);
  }

  return (
    <div className="Activities">
      <h3>ACTIVITY:</h3>
      <p></p>
      <button onClick={changeActivity}>Change Activity</button>
    </div>
  );
}
export default Activities;
