console.log("hello world")
let state = {
    currentTemp: 70,
    city: 'Honolulu'
};

const cityID = document.getElementById('cityName');
const displayName = document.getElementById('headercityName');
const displaySky = document.getElementById('skyPic');
const skyType = document.getElementById('skyOptions');
const reset = document.getElementById('reset');
// const defaultCity = 'San Diego';

const increaseTemp = () => {
    console.log("inside increase temp")
    state.currentTemp += 1;
    const tempContainer = document.querySelector('#tempContainer')
    tempContainer.textContent = `${state.currentTemp} ℉`;
    colorCoding();
};

const decreaseTemp = () => {
    state.currentTemp -= 1;
    const tempContainer = document.querySelector('#tempContainer')
    tempContainer.textContent = `${state.currentTemp} ℉`;
    colorCoding();
};

const getLatAndLon = function() {
    let latitude;
    let longitude;

    axios.get('http://localhost:5000/location', { params: { q: state.city } })
        .then((response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            console.log('Printing inside lat and lon stuff');
            console.log(`latitude is this: ${latitude}`);
            console.log(`longitude is this: ${longitude}`);
            
            return getCurrentTemp(latitude, longitude);

            // axios
            //     .get('http://localhost:5000/weather', {
            //         params: { lat: latitude, lon: longitude },
            //     })
            //     .then((response) => {
            //         const kelvin = response.data.current.temp;
            //         const fahrenheit = (9 / 5) * (kelvin - 273) + 32;
            //         temperature = Math.round(fahrenheit);
            //         newTemperature();
            //     })
            //     .catch((error) => {
            //         console.log('cannot get new weather');
            //     });
        })
        .catch((error) => {
            console.log(response.status);
            console.log('Cannot find lat and lon');
        });

};

const getCurrentTemp = function(latitude, longitude) {
    axios
        .get('http://localhost:5000/weather', {
            params: { lat: latitude, lon: longitude },
        })
        .then((response) => {
            const kelvin = response.data.current.temp;
            const temperature = Math.round((9 / 5) * (kelvin - 273) + 32);
            // temperature = Math.round(fahrenheit);
            // console.log(`temp in fahren: ${temperature}`);

            const tempContainer = document.querySelector('#tempContainer')
            tempContainer.textContent = `${temperature} ℉`;
            console.log(`temp in fahren: ${temperature}`);
            // return updateValue(temperature);
            // newTemperature();
        })
        .catch((error) => {
            console.log('cannot get new weather');
        });
}

const resetCity = () => {
    state.city = 'Seattle';
    document.querySelector('#cityName').value = '';
    const curWeatherHeader = document.getElementById('headercityName');
    curWeatherHeader.textContent = 'Current Weather for ' + state.city;
};


const updateCity = () => {
    const inputCity = document.querySelector('#cityName');
    inputCity.addEventListener('change', updateValue);

    const headercityName = document.getElementById('headercityName');
    headercityName.textContent = inputCity;

    function updateValue(x) {
        city = x.target.value;
        headercityName.textContent = 'Current Weather for ' + city;
        // getCurrentTemp();
    }
};

// changing temperature color and garden picture base on degree
const colorCoding = () => {
    let landscape = document.querySelector('#skyGarden');
    let colorTemp = document.getElementById('tempContainer');

    if (state.currentTemp >= 80) {
        colorTemp.style.color = "red";
        landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🍳';
    } else if (state.currentTemp >= 70 && state.currentTemp <= 79) {
        colorTemp.style.color = "orange";
        landscape.textContent = '🌸🌿🌼__🌷🌻🌿 _☘️🌱 _🌻🌷 ';
    } else if (state.currentTemp >= 60 && state.currentTemp <= 69) {
        colorTemp.style.color = "yellow";
        landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (state.currentTemp >= 50 && state.currentTemp <= 59) {
        colorTemp.style.color = "green";
        landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
        colorTemp.style.color = "teal";
        landscape.textContent = '⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️';
    }
};

const updateSky = (a) => {
    const optionSky = a.target.value;

    if (optionSky === '⛅️Cloudy☁️') {
        displaySky.innerText = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';;
    } else if (optionSky === '🌈Sunny☀️') {
        displaySky.innerText = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    } else if (optionSky === '⛈Rainy☔️') {
        displaySky.innerText = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else if (optionSky === '❄️Snowy☃️') {
        displaySky.innerText = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    }
};

//registering events
const registerEventHandlers = () => {
    const increaseButton = document.getElementById("increase-button");
    increaseButton.addEventListener('click', increaseTemp);

    const decreaseButton = document.getElementById('decrease-button');
    decreaseButton.addEventListener('click', decreaseTemp);

    skyType.addEventListener('change', updateSky);

    cityID.addEventListener('input', updateCity);

    reset.addEventListener('click', resetCity);
    getLatAndLon();
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);