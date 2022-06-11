let state = {
    currentTemp = 70,
    city: 'Seattle'
};

const cityID = document.getElementById('cityname');
const displayName = document.getElementById('headerCityName');
const displaySky = document.getElementById('skyPic');
const skyType = document.getElementById('skyoptions');
const reset = document.getElementById('reset');
const defaultCity = 'Seattle';

const increaseTemp = () => {
    state.currentTemp += 1;
    const tempContainer = document.querySelector('temperature')
    tempContainer.textContent = `${currentTemp} ℉`;
    colorCoding();
}

const decreaseTemp = () => {
    state.currentTemp -= 1;
    const tempContainer = document.querySelector('temperature')
    tempContainer.textContent = `${currentTemp} ℉`;
    colorCoding();
}

const getCurrentTemp = function() {
    let latitude;
    let longitude;

    axios
        .get('http://localhost:5000/location', { params: { q: city } })
        .then((response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            axios
                .get('http://localhost:5000/weather', {
                    params: { lat: latitude, lon: longitude },
                })
                .then((response) => {
                    const kelvin = response.data.current.temp;
                    const fahrenheit = (9 / 5) * (kelvin - 273) + 32;
                    temperature = Math.round(fahrenheit);
                    newTemperature();
                })
                .catch((error) => {
                    console.log('error');
                });
        })
        .catch((error) => {
            console.log('error :(');
        });
};

const resetCity = () => {
    state.city = 'Seattle';
    document.querySelector('#cityname').value = '';
    const curWeatherHeader = document.getElementById('headerCityName');
    curWeatherHeader.textContent = 'Current Weather for ' + state.city;
};


const updateCity = () => {
    const inputCity = document.querySelector('#cityname');
    inputCity.addEventListener('change', updateValue);

    const headerCityName = document.getElementById('#headerCityName');
    headerCityName.textContent = inputCity;

    function updateValue(x) {
        city = x.target.value;
        headerCityName.textContent = 'Current Weather for ' + city;
        getCurrentTemp();
    }
};



// changing temperature color and garden picture base on degree
const colorCoding = () => {
    let landscape = document.querySelector("#skyGarden");
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
    const optionSky = e.target.value;

    if (optionSky === '⛅️Cloudy☁️') {
        displaySky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';;
    } else if (optionSky === '🌈Sunny☀️') {
        displaySky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
    } else if (optionSky === '⛈Rainy☔️') {
        displaySky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
    } else if (optionSky === '❄️Snowy☃️') {
        displaySky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
    }
};

//registering events
const registerEventHandlers = () => {
    const increaseButton = document.querySelector("#increase-button");
    increaseButton.addEventListener("click", increaseTemp);

    const decreaseButton = document.querySelector("#decrease-button");
    decreaseButton.addEventListener("click", decreaseTemp);

    skyType.addEventListener('change', updateSky);

    cityID.addEventListener('input', updateCity);

    reset.addEventListener('click', resetCity);
    getCurrentTemp();
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);