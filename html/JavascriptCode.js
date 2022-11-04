const date = new Date();
const monthDays = document.querySelector(".days");
date.setDate(1);

const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const firstDayIndex = date.getDay() - 1;
const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
const nextDay = 7 - lastDayIndex;
const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
];

document.querySelector(".date h1").innerHTML = months[date.getMonth()];
document.querySelector(".date p").innerHTML = date.toDateString();
let days = "";
for(let x = firstDayIndex; x>0; x--){
    days += `<div class = "prevDate">${prevLastDay - x + 1}</div>`;
}

for(let i = 1; i <= lastDay; i++){
    days += `<div>${i}</div>`;
}

for(let j = 1; j <= nextDay; j++){
    days += `<div class = "nextDate">${j}</div>`;
    monthDays.innerHTML = days;
}