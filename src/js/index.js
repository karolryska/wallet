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
})

export let receipts = {};
export let receipts01 = {};

class Receipt {
    constructor(date, category, name, price) {
        this.date = date;
        this.category = category;
        this.name = name;
        this.price = price;
    }
}

const checkDate = (date) => {
    return receipts[date] ? true : false
}

const dateObject = (date) => {
    const [year, month, day] = date.split("-");

    if (!receipts01[year]) {
        receipts01[year] = {};
    }
    if (!receipts01[year][month]) {
        receipts01[year][month] = {};
    }
    if (!receipts01[year][month][day]) {
        receipts01[year][month][day] = [];
    }
    
    return receipts01[year][month][day]
}

const addNewDateHtml = (date) => {
    const month = document.querySelector(".content__list");
    month.innerHTML += `<li id="${date}" class="day">
                            <div class="day__container">
                            <div class="day__header">
                                <h3 class="day__title">${date}</h3>
                                <p class="day__sum day__sum--red">0</p>
                            </div>
                            <ul class="day__items">
                            </ul>
                            </div>
                        </li>`;
    receipts[date] = [];
}

export const reloadDateSumColor = (dateSum) => {
    if (dateSum.textContent > limits.daily) {
        dateSum.classList.add("day__sum--red")
    } else {
        dateSum.classList.remove("day__sum--red") 
    }
}

const reloadDateItemsHtml = (dateObject, date) => {
    const currentDate = document.getElementById(date);
    const currentDateContainer = currentDate.querySelector(".day__items");
    currentDateContainer.innerHTML = "";
    
    let dateSum = 0;
    
    console.log(dateObject);
    for (let i = 0; i < dateObject.length; i++) {
        const itemCategory = dateObject[i].category;
        console.log(itemCategory);
        currentDateContainer.innerHTML += `<li id="${i}" class="day__item item item--${categories[itemCategory]}">
                                    <p class="item__content item__content--category">${dateObject[i].category}</p>
                                    <p class="item__content item__content--price">${dateObject[i].price}</p>
                                    <p class="item__content item__content--name">${dateObject[i].name}</p>
                                </li>`;
        // dateSum += Number(currentDateItems[i].price);
    }
    // let currentDateSum = currentDate.querySelector(".day__sum");
    // currentDateSum.textContent = dateSum;
    // reloadDateSumColor(currentDateSum);
}

const sumOfPrices = (month) => {
    let sum = 0;
    for (const date in month) {
        month[date].forEach(item => {
            sum += Number(item.price);
        });
    }
    return sum
}

const reloadSumHtml = (sum) => {
    const container = document.querySelector(".info__sum");
    container.innerHTML = sum;
}

const dataValidation = (date, category, price) => {
    if (date == "" || category == "" || price == "") return true;
}

const openModal = () => {
    const modal = document.querySelector(".modal");
    const form = document.querySelector(".form__container");
    modal.classList.add("modal--active");
    form.classList.add("form__container--blur")
    const button = document.querySelector(".modal__button");
    button.addEventListener("click", () => {
        modal.classList.remove("modal--active");
        form.classList.remove("form__container--blur");
    })
}

const addItem = (date, category, name, price) => {
    const dateContainer = dateObject(date);
    dateContainer.push(new Receipt(date, category, name, price));
    
    if (!checkDate(date)) addNewDateHtml(date);
    reloadDateItemsHtml(dateContainer, date);

    const sum = sumOfPrices(receipts);
    reloadSumHtml(sum);
}

const clearInputs = () => {
    const inputs = [...document.querySelectorAll(".form__input")];
    inputs.forEach(input => input.value = "");
}

let editItemInfo = [];

const identifyItemToEdit = (clickedItem) => {
    const date = clickedItem.target.parentElement.parentElement.parentElement.parentElement.id;
    const index = clickedItem.target.parentElement.id;
    const dateItems = dateObject(date);
    const item = dateItems[index];
    return [item, date, index]
}

const fillEditForm = (itemToEdit) => {
    let [item, date, index] = itemToEdit;

    const emptyInputs = [...document.querySelectorAll(".form__input")];
    let [dateInput, categoryInput, nameInput, priceInput] = emptyInputs;

    dateInput.value = item.date;
    categoryInput.value = item.category;
    nameInput.value = item.name;
    priceInput.value = item.price;
}

const deleteEmptyDates = (dateContainer, date) => {
    const [year, month, day] = date.split("-");
    if (!dateContainer.length) {
        delete receipts01[year][month][day];
        document.getElementById(date).remove();
    } else {
        console.log(dateContainer)
        reloadDateItemsHtml(dateContainer, date);
    }
}

const deleteItem = () => {
    const [deleteItem, deleteItemDate, deleteItemIndex] = editItemInfo;
    dateObject(deleteItemDate).splice(deleteItemIndex, 1);
    deleteEmptyDates(dateObject(deleteItemDate), deleteItemDate);
    const sum = sumOfPrices(receipts);
    reloadSumHtml(sum);
}

const editItem = () => {
    deleteItem();

    const inputs = [...document.querySelectorAll(".form__input")];
    const inputsValue = inputs.map(input => input.value);
    let [date, category, name, price] = inputsValue;
    addItem(date, category, name, price);
}

addButton.addEventListener("click", () => {
    const inputs = [...document.querySelectorAll(".form__input")];
    const inputsValue = inputs.map(input => input.value);
    const [date, category, name, price] = inputsValue;
    if (dataValidation(date, category, price)) {
        openModal();
    } else {
        addItem(date, category, name, price);
        form.classList.remove("form--add");
        clearInputs();
        formButtonsAdd.classList.remove("form__buttons-add--active");
    }
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("item__content")) {
        editItemInfo = identifyItemToEdit(e);
        fillEditForm(editItemInfo);
        form.classList.add("form--edit");
        formButtonsEdit.classList.add("form__buttons-edit--active");
    }
})

saveButton.addEventListener("click", () => {
    editItem();
    clearInputs();
    form.classList.remove("form--edit");
    formButtonsEdit.classList.remove("form__buttons-edit--active");
});

deleteButton.addEventListener("click", () => {
    deleteItem();
    clearInputs();
    form.classList.remove("form--edit");
    formButtonsEdit.classList.remove("form__buttons-edit--active");
});

settingsButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".settings").classList.add("settings--active");
})

addItem("2021-02-01","Art. spożywcze", "Biedronka", 154);
addItem("2021-02-01","Kosmetyki", "Drogeria", 29);
addItem("2021-02-01","Rachunki", "Prąd", 120);
addItem("2021-02-03","Rozrywka", "Kino", 24);