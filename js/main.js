//Form Submission
let form = document.querySelector('#FormData')

// Geting data with Axios
const getData = async() =>{
    let key="f7d97093c71bd0e746c30c75d0d8a607";
    let city= document.querySelector("#city").value;
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`);
    return response.data

}

//create const to hold our DOM elements for later use
const DOM_ELEMENTS = {
    weather_data:'#weather-data'
}

// Creation of weather cards
const create_weather_card = (city,high,low,forecast,humidity) => {
    
    let cards= `    <div class="row justify-content-center" id="weather">
                <h3 class="text-center" id="city">${city}</h3>
                <div class="card" id="high">
                    <div class="card-header bg-primary">
                      <h5 class="card-title text-center">High</h5>
                    </div>
                    <div class="card-body">
                      <p class="card-text text-center">${high} &#176F</p>
                    </div>
                </div>
                <div class="card" id="low">
                    <div class="card-header bg-danger">
                      <h5 class="card-title text-center">Low</h5>
                    </div>
                    <div class="card-body">
                      <p class="card-text text-center">${low} &#176F</p>
                    </div>
                </div>
                <div class="card " id="forecast">
                    <div class="card-header bg-secondary">
                      <h5 class="card-title text-center">Forecast</h5>
                    </div>
                    <div class="card-body">
                      <p class="card-text text-center">${forecast}</p>
                    </div>
                </div>
                <div class="card" id="humidity">
                    <div class="card-header bg-warning ">
                      <h5 class="card-title text-center">Humidity</h5>
                    </div>
                    <div class="card-body">
                      <p class="card-text text-center">${humidity}%</p>
                    </div>
                </div>
                </div>`;
    document.querySelector(DOM_ELEMENTS.weather_data).insertAdjacentHTML('beforeend',cards) // allows search where you can choose where to inject html elem  above
}

//Delete DOM element
const delete_DOM=()=>{
  let x =document.querySelector("#weather");
  if(x){
    x.remove()
  }else{
    //pass
  }
}

//Data load(callback to create_weather_card)
const load_data= async()=>{
    const weatherData= await getData(); //waiting for data, once it gets data it will use response.data return from getData()
    let weather = weatherData;
    let city_name=weather.name;
    let high=weather.main.temp_max;
    let low=weather.main.temp_min;
    let forecast= weather.weather[0].description;
    let humidity= weather.main.humidity;
    delete_DOM()
    return create_weather_card(city_name,high,low,forecast,humidity);
 // data will be array, so we need to pull id,name from each element, pass those into create_list above
    
}

//add event listener
form.addEventListener('submit',(event)=>{
    event.preventDefault();
})
