const colorCoding = () => {
    const colorTemp = document.getElementById("tempContainer");

    if (colorTemp.textContent >= 80) {
        colorTemp.style.color = "red";
    } else if (colorTemp.textContent  >= 70 && colorTemp.textContent <= 79) {
        colorTemp.style.color = "orange";
    } else if (colorTemp.textContent >= 60 && colorTemp.textContent <= 69) {
        colorTemp.style.color = "yellow";
    } else if (colorTemp.textContent >= 50 && colorTemp.textContent <= 59) {
        colorTemp.style.color = "green";
    } else {
        colorTemp.style.color = "teal";
    }
};


const state = {
    currentTemp: 70,
};

const increaseTemp = () => {
    state.currentTemp += 1;
    const tempContainer = document.querySelector("#tempContainer");
    tempContainer.textContent = `${state.currentTemp}`;
    colorCoding();
}

const decreaseTemp = () => {
    state.currentTemp -= 1;
    const tempContainer = document.querySelector("#tempContainer");
    tempContainer.textContent = `${state.currentTemp}`;
    colorCoding();
}

const registerEventHandlers = () => {
    const increaseButton = document.querySelector("#increaseTemp");
    increaseButton.addEventListener("click", increaseTemp);

    const decreaseButton = document.querySelector("#decreaseTemp");
    decreaseButton.addEventListener("click", decreaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);