import {storage, setMonth} from './index';
import {reloadStats} from './stats';

const currentMonth = document.querySelector(".info__month");
const previousMonth = document.querySelector(".info__button--previous");
const nextMonth = document.querySelector(".info__button--next");

const year = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopda", "grudzień"];

const today = new Date().toISOString().slice(0, 10);
const [todayYear, todayMonth, todayDay] = today.split("-");

const reloadMonthsNames = (index) => {
    let setMonthNumber = year[index];
    currentMonth.textContent = months[index];
    previousMonth.textContent = months[index-1];
    if (Number(setMonthNumber) < Number(todayMonth)) {
        nextMonth.textContent = months[index+1];
    } else {
        nextMonth.textContent = "";
    };
    setMonth.renderSum();
};

const renderSetMonth = (month) => {
    const wrapper = document.querySelector(".content__list");
    wrapper.textContent = "";

    if (!month) {
        wrapper.textContent = "brak danych";
        document.querySelector(".info__sum").textContent = 0;
    } else for (const day in month.days) {
        month.days[day].receipts.forEach(receipt => receipt.render());
    };
};

export const changeMonth = (move) => {
    let index = year.findIndex(el => el===setMonth.month);
    if (move === "next") index++
    else if (move === "prev") index--;
    let month = storage[todayYear][year[index]];
    reloadMonthsNames(index);
    renderSetMonth(month);
    reloadStats(month);
    return storage[todayYear][year[index]]
};