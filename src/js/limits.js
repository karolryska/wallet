import {receipts, reloadDateSumColor} from './index'

export let limits = {
    daily: 30,
}

const limitsLink = document.querySelector(".settings__item--limits");

limitsLink.addEventListener("click", () => {
    document.querySelector(".limits").classList.add("limits--active");
    document.querySelector(".limits__input").value = limits.daily;
})

const backArrowSettings = document.querySelector(".limits__arrow");

const reloadColor = () => {
    for (let date in receipts) {
        const currentDate = document.getElementById(date);
        let currentDateSum = currentDate.querySelector(".day__sum");
        reloadDateSumColor(currentDateSum);
    }
}

backArrowSettings.addEventListener("click", () => {
    document.querySelector(".limits").classList.remove("limits--active");
    limits.daily = document.querySelector(".limits__input").value;
    reloadColor();
})