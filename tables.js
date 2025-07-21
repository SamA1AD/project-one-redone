const fillTables = (lat,lon) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=e3eb7f3b66489ac790efa64c615ef655&units=imperial`)
    .then(response => response.json())
    .then(weather => {
      const table = document.querySelector('table')
      const row1 = document.querySelector(".row1");
      const row2 = document.querySelector(".row2");
      const row3 = document.querySelector(".row3");
      const row4 = document.querySelector(".row4");
      row1.innerHTML = '';
      row2.innerHTML = '';
      row3.innerHTML = '';
      row4.innerHTML = '';
      let datatype = ['Temperature', 'Feels Like', "max", "min", "humidity", 'pressure', 'Sea Level', 'visibility',
        'Wind']
      let data = [`${weather.main.temp}°F`, `${weather.main.feels_like}°F`, `${weather.main.temp_max}°F`, `${weather.main.temp_min}°F`,
        `${weather.main.humidity}%`, `${weather.main.pressure}`, `${weather.main.sea_level}FT`, `${weather.visibility}`,
        `${weather.wind.speed}MPH, ${weather.wind.deg}°, gust: ${weather.wind.gust}MPH`]

        for(let i = 0; i < datatype.length; i++){
          let makeTH = document.createElement('th');
          let makeTD = document.createElement('td');

          makeTH.innerHTML = datatype[i]
          makeTD.innerHTML = data[i]

          row1.appendChild(makeTH)
          row2.appendChild(makeTD)

        }


    })
}





let userInput = ''


const findCoord = (userInput)=> {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}840&limit=1&appid=e3eb7f3b66489ac790efa64c615ef655`)
    .then(response => response.json())
    .then(weather => {
      const searchOutput = document.querySelector(".search-output")
      const lat = weather[0].lat.toFixed(2)
      const lon = weather[0].lon.toFixed(2)
      searchOutput.innerText = weather[0].name + ", " + weather[0].state
      fillTables(lat,lon)

})
}



const searchButton = document.getElementById('search');


searchButton.addEventListener("keydown", (event)=>{
 if(event.key === 'Enter'){
  userInput = searchButton.value;
 findCoord(userInput)
 }
})



// {
//   coord: { lon: -87.23, lat: 36.39 },
//   weather: [
//     {
//       id: 804,
//       main: 'Clouds',
//       description: 'overcast clouds',
//       icon: '04d'
//     }
//   ],
//   base: 'stations',
//   main: {
//     temp: 90.14,
//     feels_like: 102.74,
//     temp_min: 90.14,
//     temp_max: 90.14,
//     pressure: 1014,
//     humidity: 67,
//     sea_level: 1014,
//     grnd_level: 995
//   },
//   visibility: 10000,
//   wind: { speed: 6.53, deg: 285, gust: 9.06 },
//   clouds: { all: 100 },
//   dt: 1753126595,
//   sys: {
//     type: 2,
//     id: 2094862,
//     country: 'US',
//     sunrise: 1753094819,
//     sunset: 1753146200
//   },
//   timezone: -18000,
//   id: 4650295,
//   name: 'Pleasant View',
//   cod: 200
// }