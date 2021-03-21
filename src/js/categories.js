export const categories = {
    "Art. spożywcze": "yellow01",
    "Kosmetyki": "green02",
    "Rozrywka": "blue04",
    "Rachunki": "red01",
}

const selectLists = document.querySelectorAll(".form__list");

selectLists.forEach(list => {
    for (let key in categories) {
        list.innerHTML += `<option value="${key}">${key}</option>`;
    }
})

const categoriesLink = document.querySelector(".settings__item--categories");

const loadCategoriesList = () => {
    const list = document.querySelector(".categories__list");
    list.innerHTML = "";

    for (let key in categories) {
        list.innerHTML += `<li><p class="categories__item">${key}</p></li>`;
    }
}

categoriesLink.addEventListener("click", () => {
    document.querySelector(".categories").classList.add("categories--active");
    loadCategoriesList();
});

const categoriesList = document.querySelector(".categories__list");

const loadCategoryName = (category) => {
    const categoryName = document.querySelector(".category__name");
    categoryName.innerHTML = category;
}

const setCategoryColor = (category) => {
    const color = categories[category];
    document.getElementById(color).checked = true;
}

const disableColorsInUse = () => {
    const colorsInputs = [...document.querySelectorAll(".colors__input")];
    colorsInputs.forEach((color) => {
        color.disabled = false;
        for (const category in categories) {
            if (categories[category] === color.id && !color.checked) color.disabled = true;
        }
    })
}

let categoryEdit;

categoriesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("categories__item")) {
        const category = e.target.innerHTML;
        loadCategoryName(category);
        setCategoryColor(category);
        disableColorsInUse();
        categoryEdit = category;
        document.querySelector(".category").classList.toggle("category--active");
    };
})

const backArrowSettings = document.querySelector(".settings__arrow");
const backArrowCategories = document.querySelector(".categories__arrow");
const backArrowCategory = document.querySelector(".category__arrow");

const backToCategories = () => {
    document.querySelector(".category").classList.toggle("category--active");
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

const colorsWrapper = document.querySelector(".category");

const changeCategoryColor = (newColor) => {
    categories[categoryEdit] = newColor;
}

const reloadColor = (originalColor, newColor) => {
    const itemsToEdit = [...document.querySelectorAll(`.item--${originalColor}`)];
    itemsToEdit.forEach(item => {
        item.classList.remove(`item--${originalColor}`);
        item.classList.add(`item--${newColor}`);
    })
}

colorsWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("colors__input")) {
        const originalColor = categories[categoryEdit];
        const newColor = e.target.id;
    changeCategoryColor(newColor);
    reloadColor(originalColor, newColor);
    }
    
})