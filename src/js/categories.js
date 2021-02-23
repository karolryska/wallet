export const categories = {
    "Zakupy codzienne": "yellow",
    "Rachunki": "green",
    "Rozrywka": "red",
}

const selectLists = document.querySelectorAll(".form__list");
selectLists.forEach(list => {
    for (let key in categories) {
        list.innerHTML += `<option value="${key}">${key}</option>`;
    }
})

const settingsButton = document.querySelector(".button--settings");
const categoriesLink = document.querySelector(".settings__item--categories");

settingsButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".settings").classList.add("settings--active");
    console.log("h")
})

const loadCategoriesList = () => {
    const list = document.querySelector(".categories__list");
    list.innerHTML = "";

    for (let key in categories) {
        list.innerHTML += `<li><p class="categories__item">${key}</p></li>`;
    }
}

categoriesLink.addEventListener("click", () => {
    console.log("git")
    document.querySelector(".categories").classList.add("categories--active");
    loadCategoriesList();
});

const categoriesList = document.querySelector(".categories__list");

const loadCategoryInfo = (category) => {
    const categoryName = document.querySelector(".category__name");
    categoryName.innerHTML = category;
}
categoriesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("categories__item")) {
        const item = e.target.innerHTML;
        document.querySelector(".category").classList.toggle("category--active");
        // document.querySelector(".categories").classList.toggle("categories--active");
        loadCategoryInfo(item);
    };
})

const backArrowSettings = document.querySelector(".settings__arrow");
const backArrowCategories = document.querySelector(".categories__arrow");
const backArrowCategory = document.querySelector(".category__arrow");



const backToCategories = () => {
    document.querySelector(".category").classList.toggle("category--active")
    const colors = document.getElementsByName("color");
    let selectedColor;

    for(var i = 0; i < colors.length; i++) {
        if(colors[i].checked) selectedColor = colors[i].value;
    }
    console.log(selectedColor);
}
const backToSettings = () => {
    document.querySelector(".categories").classList.toggle("categories--active");
}
const backToMain = () => {
    document.querySelector(".settings").classList.toggle("settings--active");
}

backArrowSettings.addEventListener("click", backToMain);
backArrowCategory.addEventListener("click", backToCategories);
backArrowCategories.addEventListener("click", backToSettings);


