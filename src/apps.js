//Current Time:
let currentDate = new Date ();

let idDate = document.querySelector("#date");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[currentDate.getMonth()];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentDate.getDay()];
let date = currentDate.getDate();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
    
idDate.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes} hrs`;

//Search City and Show Temperature:
function showTemp(response){
    //search Temp
    let currentTemp = Math.round(response.data.main.temp);
    let currentCelcius = document.querySelector("#degrees");
    currentCelcius.innerHTML = currentTemp;
    //search Desc
    let descValue = response.data.weather[0].description;
    let currentDesc = document.querySelector("#desc");
    currentDesc.innerHTML = descValue;
    //search Temp Min & Max
    let tempMinValue = Math.round(response.data.main.temp_min);
    let tempMin = document.querySelector("#min");
    tempMin.innerHTML = tempMinValue;
    let tempMaxValue = Math.round(response.data.main.temp_max);
    let tempMax = document.querySelector("#max");
    tempMax.innerHTML = tempMaxValue;
}

function search(event){
    event.preventDefault();
    //search city
    let cityValue = document.querySelector("#change-city1");
    let city = document.querySelector("#city");
    let cityName = cityValue.value;
    city.innerHTML = cityName;
    let apiKey = "7d1e4ed28018ae107b24a46639aa6b3a";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemp)
    
}
let changeCity = document.querySelector("#another-city");
changeCity.addEventListener("submit", search);


//Current City Geolocation:
function showCurrentPositionInfo(response){
    //City 
    let cityValue = response.data.name;
    let city = document.querySelector("#city");
    city.innerHTML = cityValue;

    //Temp 
    let tempValue = Math.round(response.data.main.temp);
    let temperature = document.querySelector("#degrees")
    temperature.innerHTML = tempValue;

    //Description
    let descValue = response.data.weather[0].description;
    let description = document.querySelector("#desc");
    description.innerHTML = descValue;

    //Temp min and max
    let tempMinValue = Math.round(response.data.main.temp_min);
    let tempMin = document.querySelector("#min");
    tempMin.innerHTML = tempMinValue;
    let tempMaxValue = Math.round(response.data.main.temp_max);
    let tempMax = document.querySelector("#max");
    tempMax.innerHTML = tempMaxValue;


}

function showCurrentCity(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude; 
    let units = "metric";
    let apiKey = "7d1e4ed28018ae107b24a46639aa6b3a";
    let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;


    axios.get(currentApiUrl).then(showCurrentPositionInfo);

}


function showCurrentPosition(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showCurrentCity);
}


let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", showCurrentPosition);
//test comment