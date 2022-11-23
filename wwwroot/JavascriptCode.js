const date = new Date();
var currentDays = "";
var checkedValue = "";
function CreateCalendar(){
    const monthDays = document.querySelector(".days");
    var daysValue = "";
    date.setDate(1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = date.getDay();
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
    document.querySelector(".date p").innerHTML = new Date().toDateString();
    let days = "";
    for(let x = firstDayIndex; x>0; x--){
        days += `<input id = "prevDate${x}" type = "checkbox" value = ${prevLastDay - x + 1} class = "monthDays" />
        <label for = "prevDate${x}" class = "prevDate">${prevLastDay - x + 1}</label>`;
    }
    
    for(let i = 1; i <= lastDay; i++){
        days += `<input id = "currentDate${i}" type = "checkbox" value = "${i}" class = "monthDays"/>
        <label for = "currentDate${i}">${i}</label>`;
    }
    
    for(let j = 1; j <= nextDay; j++){
        days += `<input id = 'nextDate${j}' type = 'checkbox' value = '${j}' class = 'monthDays' />
        <label for = 'nextDate${j}' class = 'nextDate'>${j}</label>`;
        monthDays.innerHTML = days;
    }
    currentDays = document.getElementsByClassName("monthDays");
    function GetCheckedDate(e){
        if(e.target.checked){
            checkedValue += e.target.value + " ";
        }
    }
    for(let y = 0; y < currentDays.length; y++){
        currentDays[y].addEventListener("click", GetCheckedDate);
        daysValue += currentDays[y].value + " ";
    }
    document.getElementById("getSchedule").addEventListener("click", async () => await GetDateAndCheckedDate(daysValue, checkedValue));
}


async function GetDateAndCheckedDate(date, checkedDate){
    const response = await fetch("/calendar", {
        method: "POST",
        headers: {"Accept": "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({
            MonthDate : date,
            CheckedDate : checkedDate
        })
    });
    if(response.ok === true){
        console.log("Запрос выполнен успешно");
    }
}

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    CreateCalendar();
});
document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    CreateCalendar();
});

CreateCalendar();

