// global variables

let currentDay = moment();

// Use JSON.parse() to convert the text in local storage into an object
let searchedCities = JSON.parse(localStorage.getItem("cities")) || [];

renderHistory();
$(document).ready(function () {
  $("#submitCity").click((event) => {
    event.stopPropagation();
    event.preventDefault();
    getWeather();
  });
});

// the current searched cities will be displayed as a button, and prepended to the previous searched cities
function renderHistory() {
  $("#searchedCities").empty();
  searchedCities.forEach(function (city) {
    $(
      "#searchedCities"
    ).prepend(`<button class="btn btn-lg mt-1 btn-primary" style="width: 80%">
    ${city}
    </button>`);
  });
}

// click the searched city button, and the data of this serached city's weather will be gaven
$("#searchedCities").click("button", function (event) {
  getWeather(event.target.textContent);
});

// searched cities' data will be removed from local storage and displied area
$("#clearHistory").click(function (event) {
  event.preventDefault();
  localStorage.removeItem("cities");
  searchedCities = [];
  renderHistory();
});

// request the date of current weather of each searched city from openweather API by jqury.ajax method
function getWeather(city) {
  let newCity = city || $("#inputCity").val();
  if (newCity != "") {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        newCity +
        "&units=imperial&exclude=minutely,hourly&appid=809f1054aeccc4397ad67a0c43c8997f",
      method: "GET",
      dataType: "jsonp",
      // save responsed cities to local storage as string by JSON.stringify method
    }).then(function (response) {
      if (!searchedCities.includes(response.name)) {
        searchedCities.push(response.name);
        localStorage.setItem("cities", JSON.stringify(searchedCities));
        renderHistory();
      }
      console.log(response);
      // displayed the current weather's data was grabed from the openweather API by gaven cities
      $("#currentCitytWeather").html(`<h5 id="cityName-day-icon">
             <span id="displayed-city">${response.name}
        
             </span>
               <span id="today-date">
               ${
                 new Date(response.dt * 1000).getUTCMonth() + 1
               }/${new Date(response.dt * 1000).getUTCDate()}/${new Date(response.dt * 1000).getUTCFullYear()}
               
               </span>
               <span id="icon-img"><img src="https://openweathermap.org/img/wn/${
                 response.weather[0].icon
               }.png">
              </span>
             </h5>
             <p id="temp">${"Temperature：" + response.main.temp + "\xB0F"}</p>
             <p id="humidity">${"Humidity：" + response.main.humidity + "%"}</p>
             <p id="windSpeed">${
               "Wind Speed：" + response.wind.speed + "MPH"
             }</p>
              <p>UV Index:<button class="btn btn-sm ml-2" id="uv-index"></button></p>
             `);

      // grab data from the openweather onecall API
      $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&units=imperial&exclude=minutely,hourly&appid=809f1054aeccc4397ad67a0c43c8997f`,
        method: "GET",
        dataType: "jsonp",
      }).then(function (data) {
        console.log(data);
        const uvi = data.current.uvi;

        //adding uvi data to current weather
        // the color of the uv index will be changed based on if the uv index is equal and less than 2 is considered favoralbe, if higher than 2 but equal and less than 8 is considered moderate, and if over 8 is considered severe.
        $("#uv-index").text(data.current.uvi);
        $("#uv-index").addClass(
          uvi <= 2 ? "btn-primary" : uvi <= 8 ? "btn-warning" : "btn-danger"
        );
        // 5 days forcast data is displyed by for loop function
        $("#5day").html(`<h5>5-Day Forecast</h5>`);

        $("#forecast").html("");

        for (let i = 1; i < 6; i++) {
          $("#forecast").append(`
          <div class="col-2">
          <div
          class="card text-white bg-info mb-3"
          style="max-width: 110rem"
          >
          <div class="card-body">
          <h5 class="card-title">${
            new Date(data.daily[i].dt * 1000).getUTCMonth() + 1
          }/${new Date(data.daily[i].dt * 1000).getUTCDate()}/${new Date(
            data.daily[i].dt * 1000
          ).getUTCFullYear()}</h5>
          
          <p class="icon-img2"><img src="https://openweathermap.org/img/wn/${
            data.daily[i].weather[0].icon
          }@2x.png"></p>

          <p class="card-text"><p>${
            "Temp：" + data.daily[i].temp.day + "\xB0F"
          }</p>
          <p>${"Humidity: " + data.daily[i].humidity + "%"}</p>
          </p>
          
          
          </div>
          </div>
          </div>`);
        }
      });
    });
  }

  {
  }

  // } else {
  //   $("#error").html("<div>City field cannot be empty</div>");
  // }
}
