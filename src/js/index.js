import '../scss/main.scss';
import {categories} from './categories'
import {limits} from './limits'
import'./header'

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

const today = new Date().toISOString().slice(0, 10);
let [todayYear, todayMonth, todayDay] = today.split("-");


class Year {
    constructor() {
        this['01'];
        this['02'];
        this['03'];
        this['04'];
        this['05'];
        this['06'];
        this['07'];
        this['08'];
        this['09'];
        this['10'];
        this['11'];
        this['12'];
    };
};

const year2021 = new Year();

class Month {
    constructor(month) {
        this.month = month;
        this.sum = 0;
        this.days = {};
        if (!year2021[month] ) year2021[month] = this;
    };
};

class Day {
    constructor(day, month) {
        this.day = day;
        this.sum = 0;
        this.receipts = [];
        if (!year2021[month].days[day]) year2021[month].days[day] = this;
    };  

    renderDay() {
        const wrapper = document.querySelector(".content__list");
        if (this.receipts.length === 1) {
            wrapper.insertAdjacentHTML("beforeend",`<li id="${this.day}" class="day">
                            <div class="day__container">
                            <div class="day__header">
                                <h3 class="day__title">${this.day}</h3>
                                <p class="day__sum">${this.sum}</p>
                            </div>
                            <ul class="day__items">
                            </ul>
                            </div>
                        </li>`);
        };
    };

    reloadDaySum() {
        const daySumWrapper = document.getElementById(this.day).querySelector(".day__sum");
        daySumWrapper.textContent = this.sum;
        this.sum > limits.daily ? daySumWrapper.classList.add("day__sum--red") : daySumWrapper.classList.remove("day__sum--red");
    };

    clearDay() {
        if (!this.receipts.length) document.getElementById(this.day).remove();
    };
};

class Receipt {
    constructor(date, category, name, price) {
        this.date = date;
        this.category = category;
        this.name = name;
        this.price = price;
        this.id = date + "-" + Math.floor(Math.random() * 10000);
        
        let [year, month, day] = date.split("-");
        const monthObject = year2021[month];
        this.day = monthObject.days[day];
        this.day.receipts.push(this);
        this.day.sum += Number(this.price);
    };

    render() {
        this.day.renderDay();
        const dayWrapper = document.getElementById(this.day.day).querySelector(".day__items");
        dayWrapper.insertAdjacentHTML("beforeend",`<li id="${this.id}" class="day__item item item--${categories[this.category]}">
        <p class="item__content item__content--category">${this.category}</p>
        <p class="item__content item__content--price">${this.price}</p>
        <p class="item__content item__content--name">${this.name}</p>
        </li>`);
        this.day.reloadDaySum();
        // const receiptWrapper = document.getElementById(this.id);
        // receiptWrapper.addEventListener("click", () => console.log(this))
    };

    remove() {
        const receiptsArray = this.day.receipts;
        const index = receiptsArray.findIndex(item => item === this);
        receiptsArray.splice(index, 1);
        document.getElementById(this.id).remove();

        this.day.sum -= this.price;
        this.day.reloadDaySum();
        this.day.clearDay();
    };
};

const dataValidation = (date, category, price) => {
    if (date == "" || category == "" || price == "") return true;
};

const openModal = () => {
    const modal = document.querySelector(".modal");
    const form = document.querySelector(".form__container");
    modal.classList.add("modal--active");
    form.classList.add("form__container--blur");
    const button = document.querySelector(".modal__button");
    button.addEventListener("click", () => {
        modal.classList.remove("modal--active");
        form.classList.remove("form__container--blur");
    })
};

const addItem = (date, category, name, price) => {
    let [year, month, day] = date.split("-");
    new Month(month);
    new Day(day, month);
    const receipt = new Receipt(date, category, name, price);
    if (month === todayMonth) receipt.render();
};

const clearInputs = () => {
    const inputs = [...document.querySelectorAll(".form__input")];
    inputs.forEach(input => input.value = "");
};

let itemToEdit;

const identifyItemToEdit = (clickedItem) => {
    const itemId = clickedItem.target.parentElement.id;
    let [year, month, day, id] = itemId.split("-");
    const currentDayReceipts = year2021[month].days[day].receipts;    
    return currentDayReceipts.find(receipt => receipt.id === itemId)
};

const fillEditForm = (receipt) => {
    const emptyInputs = [...document.querySelectorAll(".form__input")];
    let [dateInput, categoryInput, nameInput, priceInput] = emptyInputs;

    dateInput.value = receipt.date;
    categoryInput.value = receipt.category;
    nameInput.value = receipt.name;
    priceInput.value = receipt.price;
};

const deleteItem = () => {
    itemToEdit.remove();
};

const editItem = (date, category, name, price) => {
    itemToEdit.remove();
    addItem(date, category, name, price);
};

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
    };
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("item__content")) {
        itemToEdit = identifyItemToEdit(e);
        fillEditForm(itemToEdit);
        form.classList.add("form--edit");
        formButtonsEdit.classList.add("form__buttons-edit--active");
    };
});

saveButton.addEventListener("click", () => {
    const inputs = [...document.querySelectorAll(".form__input")];
    const inputsValue = inputs.map(input => input.value);
    const [date, category, name, price] = inputsValue;
    if (dataValidation(date, category, price)) {
        openModal();
    } else {
        editItem(date, category, name, price);
        form.classList.remove("form--add");
        clearInputs();
        formButtonsAdd.classList.remove("form__buttons-add--active");
    };
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


addItem("2021-02-01","Kosmetyki", "Drogeria", 29);
addItem("2021-02-01","Rachunki", "Prąd", 120);
addItem("2021-02-10","Rozrywka", "Kino", 24);
addItem("2021-02-12","Rozrywka", "Gokarty", 50);
addItem("2021-04-12","Rozrywka", "Gokarty", 50);