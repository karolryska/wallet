import {categories} from './categories';

const setMonthReceipts = (month) => {
    const setMonthReceipts = [];
    if (month) {
        for (const day in month.days) {
            month.days[day].receipts.forEach(receipt => setMonthReceipts.push(receipt));
    }};
    return setMonthReceipts
}; 

export const reloadStats = (month) => {
    for (const category in categories) {
        categories[category].setMonthSum = 0;
    };
    setMonthReceipts(month).forEach(receipt => {
        for (const category in categories) {
            categories[category].monthSum(receipt);
        };
    });
    document.querySelector(".stats__categories").innerHTML = "";
    document.querySelector(".stats__bar").innerHTML = "";
    for (const category in categories) {
        categories[category].renderSetMonthSum();
        categories[category].renderStatsBar(month.sum);
    };
};