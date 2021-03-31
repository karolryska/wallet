export let limits = {
    daily: 30,
};

const limitsLink = document.querySelector(".settings__item--limits");

limitsLink.addEventListener("click", () => {
    document.querySelector(".limits").classList.add("limits--active");
    document.querySelector(".limits__input").value = limits.daily;
});

const backArrowSettings = document.querySelector(".limits__arrow");

const reloadColor = () => {
    const daySumWrapperArray = [...document.querySelectorAll(".day__sum")]
    daySumWrapperArray.forEach(sumWrapper => {
        if (sumWrapper.textContent > limits.daily) sumWrapper.classList.add("day__sum--red");
        else sumWrapper.classList.remove("day__sum--red");
    });
};

backArrowSettings.addEventListener("click", () => {
    document.querySelector(".limits").classList.remove("limits--active");
    limits.daily = document.querySelector(".limits__input").value;
    reloadColor();
});