const temperature = () => {
    const temperature = document.getElementById('temp');
    const tempUpButton = document.getElementById('up');
    const tempDownButton = document.getElementById('down');

    const addTemp = ("click", () => {
        const addTemp = document.createElement("span");
        const tempContainer = document.querySelector("#tempContainer");
        newTemp.textContent += 1;
        tempContainer.appendChild(newTemp);
    })
    const subTemp = ("click", () => {
        const subTemp = document.createElement("span");
        const tempContainer = document.querySelector("#tempContainer");
        newTemp.textContent += 1;
        tempContainer.appendChild(newTemp);
    })
}

const registerEventHandlers = () => {
    const crabButton = document.querySelector("#addCrabButton");
    crabButton.addEventListener("click", addCrab);
};

document.addEventListener("DOMContentLoaded", registerEventHandlers);