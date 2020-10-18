# Weather Dashboard HW6(https://aprilyanggarwood.github.io/UW-Coding-Boot-Camp---HW6/)

## How this weather dashboard work for user:

- The goal of this homework practice is to use OpenWeather API with retrieving data to create a weather dashboard with the following functions:

  - accepted a user's request for a searched city,then gave a reponse with the data from OpenWeather API calls.

  - the current searched citiy will be renderedd as a button with the city name under the search bar as well as prepended to the previous searched cities. Each searched city button has the function to render the weather API calls by executing the click event function.

  - the data information for every searched city will be rended in the right of section which include the searched city name, the current day, the weather icon,the temperature, humidity, wind speed , UV index, and the 5 days forcast weather.

  - the cities are searched will be stored in the local storage, and will be removed from the local storage by clicking the clear search button which is set up nearby the search button.

  - the color of the UV index button will be changed based on if the UV index is equal and less than 2 is indicated the condition is favoralbe, if higher than 2 but equal and less than 8 is indicated the condition is moderate, and if over 8 is indicated the condition is severe. ( The reference for the UV index rang is from: https://www.epa.gov/sunsafety/uv-index-scale-0 )

  ## Data from OpenWeather API

  Two API calls were used to get the correct date. The Current Weather Data URL is used for getting the cities name and the current weather data. The One Call API URL is used for getting the lat and lon data, UV Index data , and the 5 days forcast data.

  Jquary.\$.ajax() method was usded to make API calls and responses.
