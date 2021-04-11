// import {year2021} from './index'

// const today = new Date().toISOString().slice(0, 10);
// let [todayYear, todayMonth, todayDay] = today.split("-");

// const year = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
// const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopda", "grudzień",]

// let index = Number(todayMonth) - 1;

// const currentMonth = document.querySelector(".info__month");
// const previousMonthButton = document.querySelector(".info__button--previous");
// const nextMonthButton = document.querySelector(".info__button--next");

// currentMonth.textContent = months[index];
// previousMonthButton.textContent = months[index-1];
// nextMonthButton.textContent = months[index+1];


// const changeMonth = (month) => {
//     const wrapper = document.querySelector(".content__list");
//     wrapper.textContent = "";

//     if (!year2021[month]) wrapper.textContent = "brak danych"
//     else for (const property in year2021[month].days) {
//         year2021[month].days[property].receipts.forEach(receipt => receipt.render());
//       }
//       console.log(year2021[month]);
// }

// previousMonthButton.addEventListener("click", () => {
//     index--;
//     currentMonth.textContent = months[index];
//     previousMonthButton.textContent = months[index-1];
//     nextMonthButton.textContent = months[index+1];
//     changeMonth(year[index]);
// })

// nextMonthButton.addEventListener("click", () => {
//     index++;
//     currentMonth.textContent = months[index];
//     previousMonthButton.textContent = months[index-1];
//     nextMonthButton.textContent = months[index+1];
//     changeMonth(year[index]);
// })

