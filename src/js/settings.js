console.log("elo");

export let limits = {
    daily: 30,
}

const limitsLink = document.querySelector(".settings__item--limits");

limitsLink.addEventListener("click", () => {
    document.querySelector(".limits").classList.add("limits--active");
})

const backArrowSettings = document.querySelector(".limits__arrow");

backArrowSettings.addEventListener("click", () => {
    document.querySelector(".limits").classList.remove("limits--active");
    limits.daily = document.querySelector(".limits__input").value;
    console.log(limits);
})