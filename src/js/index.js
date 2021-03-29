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

        if (!monthWrapper.days[day]) monthWrapper.days[day] = this;
    };  

    renderDay() {
        const wrapper = document.querySelector(".content__list");
        if (this.receipts.length === 1) {
            wrapper.innerHTML += `<li id="${this.day}" class="day">
                            <div class="day__container">
                            <div class="day__header">
                                <h3 class="day__title">${this.day}</h3>
                                <p class="day__sum">${this.sum}</p>
                            </div>
                            <ul class="day__items">
                            </ul>
                            </div>
                        </li>`;
        };
    };

    reloadSum() {
        const daySumWrapper = document.getElementById(this.day).querySelector(".day__sum");
        daySumWrapper.innerHTML = this.sum;
        this.sum > limits.daily ? daySumWrapper.classList.add("day__sum--red") : daySumWrapper.classList.remove("day__sum--red");
    }

    clearDay() {
        if (!this.receipts.length) document.getElementById(this.day).remove();
    };

    renderReceipts() {
        const currentDateContainer = document.getElementById(this.day).querySelector(".day__items");
        currentDateContainer.innerHTML = "";
        this.receipts.forEach(receipt => {
            currentDateContainer.innerHTML += `<li id="${receipt.id}" class="day__item item">
            <p class="item__content item__content--category">${receipt.category}</p>
            <p class="item__content item__content--price">${receipt.price}</p>
            <p class="item__content item__content--name">${receipt.name}</p>
            </li>`;
        });
    };
};

for (let i = 1; i < 31; i++) {
    if (i < 10) new Day("0"+i, "01");
    else new Day(i.toString(), "01");
}

class Receipt {
    constructor(date, category, name, price) {
        this.date = date;
        this.category = category;
        this.name = name;
        this.price = price;
        this.id = date + "-" + Math.floor(Math.random() * 10000);
        
        let [year, month, day] = date.split("-");
        this.dayObject = monthWrapper.days[day];

        this.dayObject.receipts.push(this);
        this.dayObject.sum += Number(this.price);
        this.dayObject.renderDay();
        this.dayObject.reloadSum();
        this.dayObject.renderReceipts();
    };

    remove() {
        const receiptsArray = this.dayObject.receipts;
        const index = receiptsArray.findIndex(item => item === this);
        receiptsArray.splice(index, 1);

        this.dayObject.sum -= this.price;
        this.dayObject.renderReceipts();
        this.dayObject.reloadSum();
        this.dayObject.clearDay();
    };
};

const dataValidation = (date, category, price) => {
    if (date == "" || category == "" || price == "") return true;
};

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
};

const addItem = (date, category, name, price) => {
    new Receipt(date, category, name, price);
};

const clearInputs = () => {
    const inputs = [...document.querySelectorAll(".form__input")];
    inputs.forEach(input => input.value = "");
};

let editItem;

const identifyItemToEdit = (clickedItem) => {
    const itemId = clickedItem.target.parentElement.id;
    let [year, month, day, id] = itemId.split("-");
    const currentDayReceipts = monthWrapper.days[day].receipts;    
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
    editItem.remove();
};

const editIt = () => {
    const inputs = [...document.querySelectorAll(".form__input")];
    const inputsValue = inputs.map(input => input.value);
    let [date, category, name, price] = inputsValue;
    if (editItem.date === date) {
        editItem.edit(date, category, name, price);
    } else {
        editItem.remove();
        addItem(date, category, name, price);
    };
    
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
        editItem = identifyItemToEdit(e);
        fillEditForm(editItem);
        form.classList.add("form--edit");
        formButtonsEdit.classList.add("form__buttons-edit--active");
    };
});

saveButton.addEventListener("click", () => {
    editIt();
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
addItem("2021-02-10","Rozrywka", "Kino", 24);
addItem("2021-02-12","Rozrywka", "Kino", 24);