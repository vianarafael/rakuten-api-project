const axios = require("axios");

axios({
  method: "GET",
  url: "https://community-open-weather-map.p.rapidapi.com/forecast",
  headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    "x-rapidapi-key": "f6bd51c54amshd8f65e2f0ebc747p10b603jsn0b55dd280777"
  },
  params: {
    q: "Toky,2Cjp",
    zip: "107-0061%2C jp"
  }
})
  .then(response => {
    console.log(response.data.list);
  })
  .catch(error => {
    console.log(error);
  });
