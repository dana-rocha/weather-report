const colorCoding = () => {
    const colorTemp = document.getElementById("tempContainer");

    if (colorTemp.textContent >= 80) {
        colorTemp.style.color = "red";
    } else if (colorTemp.textContent >= 70 && colorTemp.textContent <= 79) {
        colorTemp.style.color = "orange";
    } else if (colorTemp.textContent >= 60 && colorTemp.textContent <= 69) {
        colorTemp.style.color = "yellow";
    } else if (colorTemp.textContent >= 50 && colorTemp.textContent <= 59) {
        colorTemp.style.color = "green";
    } else {
        colorTemp.style.color = "teal";
    }
};

const weatherGarden = () => {
    const gardenTemp = document.getElementById("tempContainer");

    if (gardenTemp.textContent >= 80) {
        gardenContainer.textContent = "🌵 🌵 🌵 🌵";
    } else if (gardenTemp.textContent >= 70 && gardenTemp.textContent <= 79) {
        gardenContainer.textContent = "🌸 🌿 🌼 ";
    } else if (gardenTemp.textContent >= 60 && gardenTemp.textContent <= 69) {
        gardenContainer.textContent = "🌾 🌾 🌾 ";
    } else {
        gardenContainer.textContent = "🌲 ⛄️";
    }
}


const state = {
    city: Seattle,
    currentTemp: 70,
};

const increaseTemp = () => {
    state.currentTemp += 1;
    const tempContainer = document.querySelector("#tempContainer");
    tempContainer.textContent = `${state.currentTemp}`;
    colorCoding();
    weatherGarden();
}

const decreaseTemp = () => {
    state.currentTemp -= 1;
    const tempContainer = document.querySelector("#tempContainer");
    tempContainer.textContent = `${state.currentTemp}`;
    colorCoding();
    weatherGarden();
}

const registerEventHandlers = () => {
    const increaseButton = document.querySelector("#increase-button");
    increaseButton.addEventListener("click", increaseTemp);

    const decreaseButton = document.querySelector("#decrease-button");
    decreaseButton.addEventListener("click", decreaseTemp);
};

// document.addEventListener("DOMContentLoaded", registerEventHandlers);

// drop down menu for sky
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

document.addEventListener("DOMContentLoaded", registerEventHandlers);