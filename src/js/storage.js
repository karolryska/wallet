let storage;

export const storageLoad = () => {
    return localStorage.getItem("storage")
};

export const storageSave = () => {
    localStorage.setItem("storage", JSON.stringify(storage));
};

if (storageLoad()) console.log("pobieram");



