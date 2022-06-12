let state = {
    currentTemp: 70,
    city: 'Seattle'
};

const cityID = document.getElementById('cityName');
const displayName = document.getElementById('headerCityName');
const displaySky = document.getElementById('skyPic');
const skyType = document.getElementById('skyOptions');
const reset = document.getElementById('reset');

const increaseTemp = () => {
    console.log("inside increase temp")
    state.currentTemp += 1;
    const tempContainer = document.querySelector('#tempContainer')
    tempContainer.textContent = `${state.currentTemp} ℉`;
    colorCoding();

}

const decreaseTemp = () => {
    state.currentTemp -= 1;
    const tempContainer = document.querySelector('#tempContainer')
    tempContainer.textContent = `${state.currentTemp} ℉`;
    colorCoding();

}
// The getLatAndLon and getCurrentTemp functions have working functionality 
// but there are errors in the Console log, Goeun said we can ignore it
const getLatAndLon = function() {
    let latitude;
    let longitude;

    axios.get('http://localhost:5000/location', { params: { q: state.city } })
        .then((response) => {

            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            getCurrentTemp(latitude, longitude);
        })
        .catch((error) => {
            console.log('Cannot find lat and lon', error);
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
            
            console.log(`new temp: ${temperature}`);
            updateCurrentTemp(temperature);
        })
        .catch((error) => {
            console.log('cannot get new weather');
        });
}

// Working on this to update temperature depending on city name
const updateCurrentTemp = function(temp) {
    state.currentTemp = temp;
    const newTemperature = document.getElementById('tempContainer');
    newTemperature.textContent = `${state.currentTemp} ℉`;
    colorCoding();
}

const resetCity = () => {
    state.city = 'Seattle';
    state.currentTemp = 70;
    document.querySelector('#cityName').value = '';
    const curWeatherHeader = document.getElementById('headerCityName');
    curWeatherHeader.textContent = 'Current Weather for ' + state.city;
    updateCurrentTemp(state.currentTemp);
};


const updateCity = () => {
    const inputCity = document.querySelector('#cityName');
    inputCity.addEventListener('change', updateValue);

    const headerCityName = document.getElementById('headerCityName');
    headerCityName.textContent = inputCity;

    function updateValue(x) {
        city = x.target.value;
        headerCityName.textContent = 'Current Weather for ' + city;
        state.city = city;
        console.log(`This is the new city ${state.city}`);
        getLatAndLon(state.city);
    }
};



// changing temperature color and garden picture base on degree
const colorCoding = () => {
    let landscape = document.querySelector('#skyGarden');
    let colorTemp = document.getElementById('tempContainer');

    if (state.currentTemp >= 80) {
        colorTemp.style.color = 'red';
        landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂🍳';
    } else if (state.currentTemp >= 70 && state.currentTemp <= 79) {
        colorTemp.style.color = 'orange';
        landscape.textContent = '🌸🌿🌼__🌷🌻🌿 _☘️🌱 _🌻🌷 ';
    } else if (state.currentTemp >= 60 && state.currentTemp <= 69) {
        colorTemp.style.color = 'yellow';
        landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (state.currentTemp >= 50 && state.currentTemp <= 59) {
        colorTemp.style.color = "green";
        landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
        colorTemp.style.color = 'teal';
        landscape.textContent = '⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️⛄️';
    }
};
const changeSky = function() {
    const input = document.querySelector('#skyOptions-select');

    input.addEventListener('change', (event) => {
        const skyOutput = document.querySelector('#sky');
        skyOutput.textContent = getSky(event.target.value);
    });
};
const updateSky = (a) => {
    const optionSky = a.target.value;
    let img;

    if (optionSky === '⛅️Cloudy☁️') {
        displaySky.textContent = '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️';
        img = 'cloudy';
    } else if (optionSky === '🌈Sunny☀️') {
        displaySky.textContent = '☁️ ☁️ ☁️ ☀️ ☁️ ☁️';
        img = 'sunny';
    } else if (optionSky === '⛈Rainy☔️') {
        displaySky.textContent = '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧';
        img = 'rainy';
    } else if (optionSky === '❄️Snowy☃️') {
        displaySky.textContent = '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨';
        img = 'snowy';
    }
};

//registering events
const registerEventHandlers = () => {
    const increaseButton = document.getElementById("increase-button");
    increaseButton.addEventListener("click", increaseTemp);

    const decreaseButton = document.getElementById("decrease-button");
    decreaseButton.addEventListener("click", decreaseTemp);

    skyType.addEventListener('change', updateSky);

    cityID.addEventListener('input', updateCity);

    reset.addEventListener('click', resetCity);

    //getCurrentTemp();
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);