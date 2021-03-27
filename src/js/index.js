import '../scss/main.scss';
import {categories} from './categories'
import {limits} from './limits'

const navAddButton = document.querySelector(".navigation__button--add");
const settingsButton = document.querySelector(".button--settings");
const form = document.querySelector(".form");
const formButtonsAdd = document.querySelector(".form__buttons-add");
const formButtonsEdit = document.querySelector(".form__buttons-edit");
const addButton = document.querySelector(".form-button--add");
const deleteButton = document.querySelector(".form-button--delete");
const saveButton = document.querySelector(".form-button--save");

navAddButton.addEventListener("click", () => {
    form.classList.add("form--add");
    formButtonsAdd.classList.add("form__buttons-add--active");
});

export let receipts = {};

class Month {
    constructor(month) {
        this.month = month;
        this.sum = 0;
        this.days = {}
    };
};

const monthWrapper = new Month("february");

class Day {
    constructor(day, month) {
        this.day = day;
        this.sum = 0;
        this.receipts = [];

        if (!monthWrapper.days[day]) {
            monthWrapper.days[day] = this;
        };
    }    
    render(day) {
        if (this.receipts.length === 1) {
        const wrapper = document.querySelector(".content__list");
        wrapper.innerHTML += `<li id="${day}" class="day">
                            <div class="day__container">
                            <div class="day__header">
                                <h3 class="day__title">${day}</h3>
                                <p class="day__sum day__sum--red">${this.sum}</p>
                            </div>
                            <ul class="day__items">
                            </ul>
                            </div>
                        </li>`;
        };
    };
};

for (let i = 1; i < 31; i++) {
    if (i < 10) new Day("0"+i, "01")
    else new Day(i.toString(), "01")
}

class Receipt {
    constructor(date, category, name, price) {
        this.date = date;
        this.category = category;
        this.name = name;
        this.price = price;
        
        let [year, month, day] = date.split("-");
        monthWrapper.days[day].receipts.push(this);
        monthWrapper.days[day].sum += price;
        monthWrapper.days[day].render(day);
        
        const currentDate = document.getElementById(day);
        const currentDateContainer = currentDate.querySelector(".day__items");
        currentDateContainer.innerHTML += `<li id="" class="day__item item">
            <p class="item__content item__content--category">${this.category}</p>
            <p class="item__content item__content--price">${this.price}</p>
            <p class="item__content item__content--name">${this.name}</p>
            </li>`;
    }
}

// console.log(monthWrapper);



// const checkDate = (date) => {
//     return receipts[date] ? true : false
// }

// const addNewDateHtml = (date) => {
//     const month = document.querySelector(".content__list");
//     month.innerHTML += `<li id="${date}" class="day">
//                             <div class="day__container">
//                             <div class="day__header">
//                                 <h3 class="day__title">${date}</h3>
//                                 <p class="day__sum day__sum--red">0</p>
//                             </div>
//                             <ul class="day__items">
//                             </ul>
//                             </div>
//                         </li>`;
//     receipts[date] = [];
// }

// export const reloadDateSumColor = (dateSum) => {
//     if (dateSum.textContent > limits.daily) {
//         dateSum.classList.add("day__sum--red")
//     } else {
//         dateSum.classList.remove("day__sum--red") 
//     }
// }

// const reloadDateItemsHtml = (date) => {
//     const currentDate = document.getElementById(date);
//     const currentDateContainer = currentDate.querySelector(".day__items");
//     currentDateContainer.innerHTML = "";

//     const currentDateItems = receipts[date];
    
//     let dateSum = 0;
    
//     for (let i = 0; i < receipts[date].length; i++) {
//         const itemCategory = currentDateItems[i].category;
//         currentDateContainer.innerHTML += `<li id="${i}" class="day__item item item--${categories[itemCategory]}">
//                                     <p class="item__content item__content--category">${currentDateItems[i].category}</p>
//                                     <p class="item__content item__content--price">${currentDateItems[i].price}</p>
//                                     <p class="item__content item__content--name">${currentDateItems[i].name}</p>
//                                 </li>`;
//         dateSum += Number(currentDateItems[i].price);
//     }
//     let currentDateSum = currentDate.querySelector(".day__sum");
//     currentDateSum.textContent = dateSum;
//     reloadDateSumColor(currentDateSum);
// }

// const sumOfPrices = (month) => {
//     let sum = 0;
//     for (const date in month) {
//         month[date].forEach(item => {
//             sum += Number(item.price);
//         });
//     }
//     return sum
// }

// const reloadSumHtml = (sum) => {
//     const container = document.querySelector(".info__sum");
//     container.innerHTML = sum;
// }

// const dataValidation = (date, category, price) => {
//     if (date == "" || category == "" || price == "") return true;
// }

// const openModal = () => {
//     const modal = document.querySelector(".modal");
//     const form = document.querySelector(".form__container");
//     modal.classList.add("modal--active");
//     form.classList.add("form__container--blur")
//     const button = document.querySelector(".modal__button");
//     button.addEventListener("click", () => {
//         modal.classList.remove("modal--active");
//         form.classList.remove("form__container--blur");
//     })
// }

const addItem = (date, category, name, price) => {
    new Receipt(date, category, name, price);

    // if (!checkDate(date)) addNewDateHtml(date);
    // receipts[date].push(new Receipt(date, category, name, price));
    // reloadDateItemsHtml(date, category, name, price);
    // const sum = sumOfPrices(receipts);
    // reloadSumHtml(sum);
}

// const clearInputs = () => {
//     const inputs = [...document.querySelectorAll(".form__input")];
//     inputs.forEach(input => input.value = "");
// }

// let editItemInfo = [];

// const identifyItemToEdit = (clickedItem) => {
//     const date = clickedItem.target.parentElement.parentElement.parentElement.parentElement.id;
//     const index = clickedItem.target.parentElement.id;
//     const dateItems = receipts[date];
//     const item = dateItems[index];
//     return [item, date, index]
// }

// const fillEditForm = (itemToEdit) => {
//     let [item, date, index] = itemToEdit;

//     const emptyInputs = [...document.querySelectorAll(".form__input")];
//     let [dateInput, categoryInput, nameInput, priceInput] = emptyInputs;

//     dateInput.value = item.date;
//     categoryInput.value = item.category;
//     nameInput.value = item.name;
//     priceInput.value = item.price;
// }

// const deleteEmptyDates = (date) => {
//     if (!receipts[date].length) {
//         delete receipts[date];
//         document.getElementById(date).remove();
//     } else {
//         reloadDateItemsHtml(date);
//     }
// }

// const deleteItem = () => {
//     const [deleteItem, deleteItemDate, deleteItemIndex] = editItemInfo;
//     receipts[deleteItemDate].splice(deleteItemIndex, 1);
//     deleteEmptyDates(deleteItemDate);
//     const sum = sumOfPrices(receipts);
//     reloadSumHtml(sum);
// }

// const editItem = () => {
//     deleteItem();

//     const inputs = [...document.querySelectorAll(".form__input")];
//     const inputsValue = inputs.map(input => input.value);
//     let [date, category, name, price] = inputsValue;
//     addItem(date, category, name, price);
// }

// addButton.addEventListener("click", () => {
//     const inputs = [...document.querySelectorAll(".form__input")];
//     const inputsValue = inputs.map(input => input.value);
//     const [date, category, name, price] = inputsValue;
//     if (dataValidation(date, category, price)) {
//         openModal();
//     } else {
//         addItem(date, category, name, price);
//         form.classList.remove("form--add");
//         clearInputs();
//         formButtonsAdd.classList.remove("form__buttons-add--active");
//     }
// })

// document.addEventListener("click", (e) => {
//     if (e.target.classList.contains("item__content")) {
//         editItemInfo = identifyItemToEdit(e);
//         fillEditForm(editItemInfo);
//         form.classList.add("form--edit");
//         formButtonsEdit.classList.add("form__buttons-edit--active");
//     }
// })

// saveButton.addEventListener("click", () => {
//     editItem();
//     clearInputs();
//     form.classList.remove("form--edit");
//     formButtonsEdit.classList.remove("form__buttons-edit--active");
// });

// deleteButton.addEventListener("click", () => {
//     deleteItem();
//     clearInputs();
//     form.classList.remove("form--edit");
//     formButtonsEdit.classList.remove("form__buttons-edit--active");
// });

// settingsButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     document.querySelector(".settings").classList.add("settings--active");
// })

addItem("2021-02-01","Art. spożywcze", "Biedronka", 154);
addItem("2021-02-01","Kosmetyki", "Drogeria", 29);
addItem("2021-02-01","Rachunki", "Prąd", 120);
addItem("2021-02-10","Rozrywka", "Kino", 24);
addItem("2021-02-12","Rozrywka", "Kino", 24);