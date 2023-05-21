
const API = "https://api.openweathermap.org/data/2.5/weather?"
const key = "&appid=75f215a6af0c8a261c1adaed5508ec2e"
const params = "q="

const form = document.querySelector("#form")
const input = document.querySelector("#inp")
const output = document.querySelector(".output")


const getCityWeather = async () => {
    const req = await fetch(API + params + input.value + key)
    const res = await req.json()
    renderWeather(res)
    console.log(res);
    input.value = ""
    getMap(res.coord)
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    getCityWeather()
})


const renderWeather = (weather) => {
    output.innerHTML = ""
    const block = document.createElement("div")
    block.classList.add("block")
    const name = document.createElement("h1")
    name.classList.add("name")
    name.textContent = weather.name

    const coord = document.createElement("h2")
    coord.classList.add("coord")
    coord.textContent = "Lat: " + weather.coord.lat + " " + "Lon: " + weather.coord.lon

    const wind = document.createElement("h3")
    wind.classList.add("wind")
    wind.textContent = "deg: " + weather.wind.deg + " gust: " + weather.wind.gust + " speed: " + weather.wind.speed

    const weath = document.createElement("h3")
    weath.classList.add("weath")
    weath.textContent = "Weather: " + weather.weather[0].main

    const temp_celsius = document.createElement("h3")
    temp_celsius.classList.add("temp_celsius")
    temp_celsius.textContent = "temp in Celsius: " + Math.round(weather.main.temp - 273.15) + " C"

    const temp_fahrenheit = document.createElement("h3")
    temp_fahrenheit.classList.add("temp_fahrenheit")
    temp_fahrenheit.textContent = "temp in Fahrenheit: " + Math.round(((weather.main.temp - 273.15) * 1.8) + 32) + " F"

    block.append(name, coord, wind, weath, temp_celsius, temp_fahrenheit)
    output.append(block)
}




const getMap = ({ lat, lon }) => {
    let map = document.createElement("div");
    map.id = "map"

    DG.then(() => {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });

        DG.marker([lat, lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    });
    output.append(map)
}

