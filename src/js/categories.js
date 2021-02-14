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
