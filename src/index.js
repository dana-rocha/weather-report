const state = {
    currentTemp: 70,
};

const increaseTemp = () => {
    state.currentTemp += 1;
    const tempContainer = document.querySelector("#tempContainer");
    tempContainer.textContent = `${state.currentTemp}`;
}

const decreaseTemp = () => {
    state.currentTemp -= 1;
    const tempContainer = document.querySelector("#tempContainer");
    tempContainer.textContent = `${state.currentTemp}`;
}

const registerEventHandlers = () => {
    const increaseButton = document.querySelector("#increaseTemp");
    increaseButton.addEventListener("click", increaseTemp);

    const decreaseButton = document.querySelector("#decreaseTemp");
    decreaseButton.addEventListener("click", decreaseTemp);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);