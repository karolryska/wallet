const selectLists = document.querySelector(".form__list");
const statsBar = document.querySelector(".stats__bar");

export const categories = {};

class Category {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.setMonthSum = 0;
        categories[name] = this;
        selectLists.innerHTML += `<option value="${this.name}">${this.name}</option>`;
    };
    monthSum(receipt) {
        if (this.name === receipt.category.name) this.setMonthSum += Number(receipt.price);
    };
    renderSetMonthSum() {
        const categoriesListStats = document.querySelector(".stats__categories");
        if (this.setMonthSum) categoriesListStats.innerHTML += `<li class="stats__category stats__category--${this.color}"><p class="stats__category-name">${this.name}</p><p class="stats__category-sum">${this.setMonthSum}</p></li>`;
    };
    renderStatsBar (monthSum) {
        const categoryBar = document.createElement("div");
        categoryBar.classList.add("stats__category-bar", `stats__category-bar--${this.color}`);
        statsBar.appendChild(categoryBar);
        categoryBar.style.width = `${this.setMonthSum/monthSum*100}%`;
    }
};

new Category("Art. spożywcze", "yellow01");
new Category("Jedzenie", "red01");
new Category("Kosmetyki", "green01");
new Category("Rachunki", "red04");
new Category("Rozrywka", "blue04");
new Category("Inne", "green04");

const categoriesLink = document.querySelector(".settings__item--categories");

const loadCategoriesList = () => {
    const list = document.querySelector(".categories__list");
    list.innerHTML = "";

    for (let category in categories) {
        list.innerHTML += `<li class="categories__item"><p class="categories__category">${category}</p></li>`;
    }
}

categoriesLink.addEventListener("click", () => {
    document.querySelector(".categories").classList.add("categories--active");
    loadCategoriesList();
});

const categoriesList = document.querySelector(".categories__list");

const loadCategoryName = (category) => {
    const categoryName = document.querySelector(".category__title");
    console.log(categoryName);
    categoryName.textContent = category;
}

const setColorsWrapperHeight = () => {
    const wrapper = document.querySelector(".category__colors");
    // wrapper.offsetHeight = wrapper.offsetWidth;
    wrapper.style.height = `${wrapper.offsetWidth}px`;
}

const setCategoryColor = (category) => {
    const color = categories[category].color;
    document.getElementById(color).checked = true;
}

const disableColorsInUse = () => {
    const colorsInputs = [...document.querySelectorAll(".colors__input")];
    colorsInputs.forEach((color) => {
        color.disabled = false;
        for (const category in categories) {
            if (categories[category].color === color.id && !color.checked) color.disabled = true;
        }
    })
}

let categoryEdit;

categoriesList.addEventListener("click", (e) => {
    if (e.target.classList.contains("categories__category")) {
        const category = e.target.innerHTML;
        loadCategoryName(category);
        setCategoryColor(category);
        disableColorsInUse();
        categoryEdit = category;
        document.querySelector(".category").classList.toggle("category--active");
        setColorsWrapperHeight();
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

// backArrowSettings.addEventListener("click", backToMain);
backArrowCategory.addEventListener("click", backToCategories);
backArrowCategories.addEventListener("click", backToSettings);

const colorsWrapper = document.querySelector(".category");

const changeCategoryColor = (newColor) => {
    categories[categoryEdit].color = newColor;
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
        const originalColor = categories[categoryEdit].color;
        const newColor = e.target.id;
    changeCategoryColor(newColor);
    reloadColor(originalColor, newColor);
    }
})