document.addEventListener('DOMContentLoaded',()=>{
    let button = document.getElementById("get-weather-btn");
    let cityName = document.getElementById("city-input");
    let showWeatherContainer = document.getElementById("showWeather");
    let showCityName = document.getElementById("city-name");
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let error_msg = document.getElementById('error-message');
    const API_KEY = "b18f64519e5e6fbd3f1bb0dc9f543e5b";
    button.addEventListener('click',async()=>{
        const city = cityName.value.trim();
        if(city == "") return;
        try{
            let data = await fetchWeatherData(city);
            const response = await data.json();
            console.log(response);
            let res_data = {
                "city" : city,
                "temperature": response.main.temp ,
                "description": response.weather[0].description 
            }
            showWeatherData(res_data);
        }catch(error){
            showError();
        }
    })
    function fetchWeatherData(cityName){
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
    }
    function showWeatherData(data){
        if (error_msg.classList.contains("hidden") == false) {
          error_msg.classList.add("hidden");
        }
        showCityName.textContent = data.city;
        temperature.textContent = data.temperature;
        description.textContent = data.description;

    }
    function showError(){
        showCityName.textContent = "";
        temperature.textContent = "";
        description.textContent = "";
        if(error_msg.classList.contains('hidden')){
            error_msg.classList.remove('hidden');
        }

    }
})
