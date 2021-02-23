import '../scss/main.scss';
import {categories} from './categories'
import './settings'


const addButton = document.querySelector(".form-button--add");
const deleteButton = document.querySelector(".form-button--delete");
const saveButton = document.querySelector(".form-button--save");
const navAddButton = document.querySelector(".navigation__button--add");
const addSection = document.querySelector(".add");
const editSection = document.querySelector(".edit");

navAddButton.addEventListener("click", () => {
    addSection.classList.add("add--active");
})

let receipts = {};

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

const addNewDateHtml = (date) => {
    const month = document.querySelector(".content__list");
    month.innerHTML += `<li class="day">
                            <div class="day__container">
                                <h3 class="day__title">${date}</h3>
                                <ul  id="${date}" class="day__items">
                                </ul>
                            </div>
                        </li>`;
    receipts[date] = [];
}

const reloadDateItemsHtml = (date) => {
    const currentDate = document.getElementById(date);
    currentDate.innerHTML = "";

    const currentDateItems = receipts[date];
    
    for (let i = 0; i < receipts[date].length; i++) {
        const itemCategory = currentDateItems[i].category;
        currentDate.innerHTML += `<li id="${i}" class="day__item item item--${categories[itemCategory]}">
                                    <p class="item__content item__content--category">${currentDateItems[i].category}</p>
                                    <p class="item__content item__content--price">${currentDateItems[i].price}</p>
                                    <p class="item__content item__content--name">${currentDateItems[i].name}</p>
                                </li>`
    }
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

const addItem = (date, category, name, price) => {
    if (!checkDate(date)) addNewDateHtml(date);
    receipts[date].push(new Receipt(date, category, name, price));
    reloadDateItemsHtml(date, category, name, price);
    const sum = sumOfPrices(receipts);
    reloadSumHtml(sum);
}

let editItemInfo = [];

const identifyItemToEdit = (clickedItem) => {
    const date = clickedItem.target.parentElement.parentElement.id;
    const index = clickedItem.target.parentElement.id;
    const dateItems = receipts[date];
    const item = dateItems[index];
    return [item, date, index]
}

const fillEditForm = (itemToEdit) => {
    let [item, date, index] = itemToEdit;

    const emptyInputs = [...document.querySelectorAll(".form__input--edit")];
    let [dateInput, categoryInput, nameInput, priceInput] = emptyInputs;

    dateInput.value = item.date;
    categoryInput.value = item.category;
    nameInput.value = item.name;
    priceInput.value = item.price;
}

const deleteEmptyDates = (date) => {
    if (!receipts[date].length) {
        delete receipts[date];
        document.getElementById(date).parentElement.parentElement.remove();
    } else {
        reloadDateItemsHtml(date);
    }
}

const deleteItem = () => {
    const [deleteItem, deleteItemDate, deleteItemIndex] = editItemInfo;
    receipts[deleteItemDate].splice(deleteItemIndex, 1);
    deleteEmptyDates(deleteItemDate);
    const sum = sumOfPrices(receipts);
    reloadSumHtml(sum);
}

const editItem = () => {
    deleteItem();

    const inputs = [...document.querySelectorAll(".form__input--edit")];
    const inputsValue = inputs.map(input => input.value);
    let [date, category, name, price] = inputsValue;
    addItem(date, category, name, price);
}

addButton.addEventListener("click", () => {
    const inputs = [...document.querySelectorAll(".form__input--add")];
    const inputsValue = inputs.map(input => input.value);
    const [date, category, name, price] = inputsValue;
    addItem(date, category, name, price);

    inputs.forEach(input => input.value = "");
    addSection.classList.remove("add--active");
})

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("item__content")) {
        editItemInfo = identifyItemToEdit(e);
        fillEditForm(editItemInfo);
        editSection.classList.add("edit--active");
    }
})

saveButton.addEventListener("click", () => {
    editItem();
    editSection.classList.remove("edit--active");
});

deleteButton.addEventListener("click", () => {
    deleteItem();
    editSection.classList.remove("edit--active");
});

addItem("2021-02-01","Zakupy codzienne", "Biedronka", 154);
addItem("2021-02-01","Rachunki", "Prąd", 120);
addItem("2021-02-03","Rozrywka", "Kino", 24);