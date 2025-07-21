//sidebar toggle
const toggleButton = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar')
function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')
}

toggleButton.addEventListener("click", toggleSidebar)
//search input


//emoji tool for weather conditions
let emojiSelector = (input) => {
  let emoji = "";
  switch (input.toLowerCase()) {
    case "sunny":
      emoji = "☀️";
      break;
    case "broken clouds":
      emoji = "☁️";
      break;
    case "clear sky":
      emoji = "🌞";
      break;
    case "few clouds":
      emoji = "🌤️";
      break;
    case "scattered clouds":
      emoji = "⛅";
      break;
    case "heavy intense rain":
    case "shower rain":
    case "rain":
    case "light rain":
      emoji = "🌧️";
      break;
    case "thunderstorm":
      emoji = "🌩️";
      break;
    case "snow":
      emoji = "❄️";
      break;
    case "mist":
      emoji = "🌫️";
      break;
    default:
      emoji = "🌤️"; // default for unrecognized descriptions
  }
  return emoji; // 🔥 This is the key part you were missing
};






//out put for today weather card
    const todayWeatherIndex = (lat, lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=e3eb7f3b66489ac790efa64c615ef655&units=imperial`)
        .then(response => response.json())
        .then(weather => {
          //html selectors
          const time = document.getElementById("today-time");
          const currentTemp = document.getElementById("today-current-temp");
          const sky = document.getElementById("today-sky");
          const emoji = document.getElementById("today-emoji");
          const min = document.getElementById("today-min");
          const max = document.getElementById("today-max");
          const humidity = document.getElementById("today-humidity");
          const windspeed = document.getElementById("today-windspeed");
          const now = new Date()
          const formattedDate = now.toLocaleString();
          //innerHTML assingment
            time.innerHTML = formattedDate;
            currentTemp.innerHTML = weather.main.temp + "°F";
            sky.innerHTML = weather.weather[0].description;
            emoji.innerHTML = emojiSelector(weather.weather[0].description)


        })
}
// todayWeatherIndex()


const forcastWeather = (lat,lon)=> {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e3eb7f3b66489ac790efa64c615ef655`)
    .then(response => response.json())
    .then(weather =>  {
      const forcast = document.querySelector(".forcast")
      for(let i = 0; i < 10; i++){
        const makeDiv = document.createElement("div")
        const imperial = ((weather.list[i].main.temp- 273.15) * 9/5) + 32;
        makeDiv.innerHTML = `${weather.list[i].dt_txt}   ${imperial.toFixed(2)}°F `
        forcast.appendChild(makeDiv)
      }
    })
}

// forcastWeather()

// const fillTables = (lon,lat) => {
//   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=e3eb7f3b66489ac790efa64c615ef655&units=imperial`)
//     .then(response => response.json())
//     .then(weather => {
//       let makeTH = document.createElement('th');
//       let makeTD = document.createElement('td');
//       const table = document.querySelector('table')
//       const row1 = document.querySelector(".row1");
//       const row2 = document.querySelector(".row2");
//       const row3 = document.querySelector(".row3");
//       const row4 = document.querySelector(".row4");
//       makeTH.innerText = "Temperature"
//       makeTD.innerText = weather.main.temp
//       row1.appendChild(makeTH)
//       row2.appendChild(makeTD)

//     })
// }


let userInput = ''


const findCoord = (userInput)=> {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}840&limit=1&appid=e3eb7f3b66489ac790efa64c615ef655`)
    .then(response => response.json())
    .then(weather => {
      const searchOutput = document.querySelector(".search-output")
      const lat = weather[0].lat.toFixed(2)
      const lon = weather[0].lon.toFixed(2)
      searchOutput.innerText = weather[0].name + ", " + weather[0].state
      todayWeatherIndex(lat, lon)
      forcastWeather(lat,lon)


})
}

const searchButton = document.getElementById('search');


searchButton.addEventListener("keydown", (event)=>{
 if(event.key === 'Enter'){
  userInput = searchButton.value;
 findCoord(userInput)
 }
})

