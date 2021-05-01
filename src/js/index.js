import '../scss/main.scss';
import {categories} from './categories';
import {limits} from './limits';

const navAddButton = document.querySelector(".navigation__button--add");
const settingsButton = document.querySelector(".button--settings");
const statsButton = document.querySelector(".button--statistics");
const form = document.querySelector(".form");
const formButtonsAdd = document.querySelector(".form__buttons-add");
const formButtonsEdit = document.querySelector(".form__buttons-edit");
const deleteButton = document.querySelector(".form-button--delete");
const saveButton = document.querySelector(".form-button--save");
const mainSection = document.querySelector(".content");


const y2021 = [];

class Month {
    constructor(month) {
        this.month = Number(month);
        this.sum = 0;
        this.days = {};
    };

    renderSum() {
        const sumWrapper = document.querySelector(".info__sum");
        sumWrapper.textContent = this.sum;
    };
};

for (let i = 1; i <= 12; i++) {
    console.log(i);
    y2021.push(new Month(i));
};

console.log(y2021);

class Day {
    constructor(day, month) {
        this.day = day;
        this.sum = 0;
        this.receipts = [];
        if (!y2021[Number(month) - 1].days[day]) y2021[Number(month) - 1].days[day] = this;
        // console.log(y2021[Number(month) - 1]);
        // y2021[Number(month) - 1].days[day] = this;
    };  

    renderDay() {
        const wrapper = document.querySelector(".content__list");
        const dayWrapper = document.getElementById(this.day);
        if (!dayWrapper) {
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
        this.category = categories[category];
        this.name = name;
        this.price = price;
        this.id = date + "-" + Math.floor(Math.random() * 10000);
        
        let [year, month, day] = date.split("-");
        this.month = y2021[Number(month) - 1];
        this.month.sum += Number(this.price);
        this.day = this.month.days[day];
        this.day.receipts.push(this);
        this.day.sum += Number(this.price);
    };

    render() {
        this.day.renderDay();
        this.month.renderSum();
        const dayWrapper = document.getElementById(this.day.day).querySelector(".day__items");
        dayWrapper.insertAdjacentHTML("beforeend",`<li id="${this.id}" class="day__item item item--${this.category.color}">
        <p class="item__content item__content--category">${this.category.name}</p>
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

        this.day.sum -= Number(this.price);
        this.day.reloadDaySum();
        this.day.clearDay();
        this.month.sum -= Number(this.price);
        this.month.renderSum();
    };
};

let mainScreen = true;

const today = new Date().toISOString().slice(0, 10);
export let [todayYear, todayMonth, todayDay] = today.split("-");
let setMonth = todayMonth;

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
    });
};

const addItem = (date, category, name, price) => {
    let [year, month, day] = date.split("-");
    new Month(month);
    new Day(day, month);
    const receipt = new Receipt(date, category, name, price);
    if (month === setMonth) receipt.render();
};

const clearInputs = () => {
    const inputs = [...document.querySelectorAll(".form__input")];
    inputs.forEach(input => input.value = "");
};

const closeForm = (formType) => {
    clearInputs();
    formButtonsAdd.classList.remove(`form__buttons-${formType}--active`);
    form.classList.remove(`form--${formType}`);
};

let itemToEdit;

const identifyItemToEdit = (clickedItem) => {
    const itemId = clickedItem.target.parentElement.id;
    let [year, month, day, id] = itemId.split("-");
    const currentDayReceipts = y2021[Number(month) - 1].days[day].receipts;    
    return currentDayReceipts.find(receipt => receipt.id === itemId)
};

const fillEditForm = (receipt) => {
    const emptyInputs = [...document.querySelectorAll(".form__input")];
    let [dateInput, categoryInput, nameInput, priceInput] = emptyInputs;

    dateInput.value = receipt.date;
    categoryInput.value = receipt.category.name;
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

navAddButton.addEventListener("click", () => {
    if (mainScreen) {
        form.classList.add("form--add");
        formButtonsAdd.classList.add("form__buttons-add--active");
        document.querySelector(".form__arrow").addEventListener("click", () => closeForm("add"));
    } else {
        mainScreen = true;
        mainSection.classList.add("content--active");
        document.querySelector(".stats").classList.remove("stats--active");
        document.querySelector(".settings").classList.remove("settings--active");
    };
});

formButtonsAdd.addEventListener("click", () => {
    const inputs = [...document.querySelectorAll(".form__input")];
    const inputsValue = inputs.map(input => input.value);
    const [date, category, name, price] = inputsValue;
    if (dataValidation(date, category, price)) {
        openModal();
    } else {
        addItem(date, category, name, price);
        closeForm("add");
    };
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("item__content")) {
        itemToEdit = identifyItemToEdit(e);
        fillEditForm(itemToEdit);
        form.classList.add("form--edit");
        formButtonsEdit.classList.add("form__buttons-edit--active");
        document.querySelector(".form__arrow").addEventListener("click", () => closeForm("edit"));
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
        closeForm("edit");
    };
    
});

deleteButton.addEventListener("click", () => {
    deleteItem();
    clearInputs();
    form.classList.remove("form--edit");
    formButtonsEdit.classList.remove("form__buttons-edit--active");
});

settingsButton.addEventListener("click", (e) => {
    mainScreen = false;
    e.preventDefault();
    mainSection.classList.remove("content--active");
    document.querySelector(".stats").classList.remove("stats--active");
    document.querySelector(".settings").classList.add("settings--active");
});

addItem("2021-02-01","Kosmetyki", "Drogeria", 29);
addItem("2021-02-01","Rachunki", "Prąd", 123);
addItem("2021-02-10","Rozrywka", "Kino", 24);
addItem("2021-03-22","Art. spożywcze", "Biedronka", 134);
addItem("2021-02-12","Rozrywka", "Gokarty", 50);
addItem("2021-04-02","Rozrywka", "Kręgle", 120);
addItem("2021-05-02","Rozrywka", "Kręgle", 120);
addItem("2021-05-02","Art. spożywcze", "Xyz", 12);
addItem("2021-05-03","Inne", "Kręgle", 120);


/* stats.js */

const setMonthReceipts = () => {
    let currentMonthObject = y2021[Number(setMonth) - 1];
    const setMonthReceipts = [];
    if (currentMonthObject) {
        for (const day in currentMonthObject.days) {
        currentMonthObject.days[day].receipts.forEach(receipt => setMonthReceipts.push(receipt));
    }};
    return setMonthReceipts
}; 

const reloadStats = () => {
    for (const category in categories) {
        categories[category].setMonthSum = 0;
    };
    setMonthReceipts().forEach(receipt => {
        for (const category in categories) {
            categories[category].monthSum(receipt);
        };
    });
    document.querySelector(".stats__categories").innerHTML = "";
    document.querySelector(".stats__bar").innerHTML = "";
    for (const category in categories) {
        categories[category].renderSetMonthSum();
        categories[category].renderStatsBar(y2021[Number(setMonth) - 1].sum);
    };
};

const reloadInfo = () => {
    if (setMonth != currentMonth) {
        console.log(`current: ${y2021[Number(setMonth) - 1].sum}`);
        console.log(`previous: ${y2021[Number(setMonth) - 2].sum}`);
    }
}

statsButton.addEventListener("click", () => {
    mainScreen = false;
    mainSection.classList.remove("content--active");
    document.querySelector(".settings").classList.remove("settings--active");
    document.querySelector(".stats").classList.toggle("stats--active");
    reloadStats();
    reloadInfo();
});


/* headers.js */

const currentMonth = document.querySelector(".info__month");
const previousMonthButton = document.querySelector(".info__button--previous");
const nextMonthButton = document.querySelector(".info__button--next");

const year = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const months = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopda", "grudzień"];

let index = Number(setMonth) - 1;

const reloadMonthsNames = () => {
    setMonth = year[index];
    currentMonth.textContent = months[index];
    previousMonthButton.textContent = months[index-1];
    if (Number(setMonth) < Number(todayMonth)) {
        nextMonthButton.textContent = months[index+1];
    } else {
        nextMonthButton.textContent = "";
    };
    y2021[Number(setMonth) - 1].renderSum();
};

const renderSetMonth = (month) => {
    const wrapper = document.querySelector(".content__list");
    wrapper.textContent = "";

    for (const property in y2021[Number(month) - 1].days) {
        y2021[Number(month) - 1].days[property].receipts.forEach(receipt => receipt.render());
        // y2021[Number(month) - 1].days[property].receipts.forEach(receipt => console.log(receipt));
    };

    // if (!y2021[Number(month) - 1]) {
    //     wrapper.textContent = "brak danych";
    //     document.querySelector(".info__sum").textContent = 0;
    // } else for (const property in y2021[Number(month) - 1].days) {
    //     y2021[Number(month) - 1].days[property].receipts.forEach(receipt => receipt.render());
    // };
};

const changeMonth = () => {
    reloadMonthsNames();
    renderSetMonth(year[index]);
    reloadStats();
    reloadInfo();
};

reloadMonthsNames();

previousMonthButton.addEventListener("click", () => {
    index--;
    changeMonth();
});

nextMonthButton.addEventListener("click", () => {
    index++;
    changeMonth();
});

console.log(y2021);