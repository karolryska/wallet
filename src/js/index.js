import '../scss/main.scss';

const addButton = document.querySelector(".add__add-button");
const editButton = document.querySelector(".edit__add-button");
const navAddButton = document.querySelector(".navigation__button--add");
const addSection = document.querySelector(".add");
const editSection = document.querySelector(".edit");

navAddButton.addEventListener("click", () => {
    addSection.classList.add("add--active");
    console.log("add ok");
})


let monthObj = {};

class Receipt {
    constructor(date, name, price) {
        this.date = date;
        this.name = name;
        this.price = price;
    }

    editItem(newDate, newName, newPrice) {
        this.date = newDate;
        this.name = newName;
        this.price = newPrice;
    }
    // addDateItem(date) {
    //     monthObj[date] = [];
    //     console.log(monthObj[date]);
    //     monthObj[date].push(this);
    //     // console.log(monthObj);
    // }
}

const checkDate = (date) => {
    return monthObj[date] ? true : false
}

const addNewDate = (date) => {
    const month = document.querySelector(".content__list");
    month.innerHTML += `<li class="day">
                            <div class="day__container">
                                <h3 class="day__title">${date}</h3>
                                <ul  id="${date}" class="day__items">
                                </ul>
                            </div>
                        </li>`;
    monthObj[date] = [];
}

const reloadDateItemsHtml = (date) => {
    const currentDate = document.getElementById(date);
    currentDate.innerHTML = "";

    const currentDateItems = monthObj[date];
    for (let i = 0; i < monthObj[date].length; i++) {
        currentDate.innerHTML += `<li id="${i}" class="day__item item">
                                    <p class="item__content item__content--name">${currentDateItems[i].name}</p>
                                    <p class="item__content item__content--price">${currentDateItems[i].price}</p>
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

const addItem = (date, name, price) => {
    monthObj[date].push(new Receipt(date, name, price));
    reloadDateItemsHtml(date, name, price); 
    const sum = sumOfPrices(monthObj);
    reloadSumHtml(sum);
}

addButton.addEventListener("click", () => {
    const inputs = [...document.querySelectorAll(".add__input")];
    const inputsValue = inputs.map(input => input.value);
    let [date, name, price] = inputsValue;

    if (!checkDate(date)) addNewDate(date);
    addItem(date, name, price);
   
    inputs.forEach(input => input.value ="");
    addSection.classList.remove("add--active");
})



const identifyItemToEdit = (clickedItem) => {
    const date = clickedItem.target.parentElement.id;
    const index = clickedItem.target.id;
    const dateItems = monthObj[date];
    const item = dateItems[index];
    return [item, date, index]
}

const fillEditForm = (itemToEdit) => {
    let [item, date, index] = itemToEdit;

    const emptyInputs = [...document.querySelectorAll(".edit__input")];
    let [dateInput, nameInput, priceInput] = emptyInputs;

    dateInput.value = item.date;
    nameInput.value = item.name;
    priceInput.value = item.price;
}

let editItemInfo = [];

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("item")) {
        editItemInfo = identifyItemToEdit(e);
        const itemToEdit = identifyItemToEdit(e)
        fillEditForm(itemToEdit);
        editSection.classList.add("edit--active");
    }
})

const deleteItem = (date, index) => {
    monthObj[date].splice(index, 1);
}

const editItem = () => {
    const [editItem, editItemDate, editItemIndex] = editItemInfo;
    deleteItem(editItemDate, editItemIndex)
    
    const inputs = [...document.querySelectorAll(".edit__input")];
    const inputsValue = inputs.map(input => input.value);
    let [date, name, price] = inputsValue;
  
    if (!checkDate(date)) addNewDate(date);
    monthObj[date].push(new Receipt(date, name, price));

    if  (!monthObj[editItemDate].length) {
        delete monthObj[editItemDate];
        document.getElementById(editItemDate).parentElement.parentElement.remove();
    } else {
        reloadDateItemsHtml(editItemDate);
    }
    reloadDateItemsHtml(date);
    const sum = sumOfPrices(monthObj);
    reloadSumHtml(sum);
    editSection.classList.remove("edit--active");
}

editButton.addEventListener("click", editItem)
deleteButton.addEventListener("click", editItem)





