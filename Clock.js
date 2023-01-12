const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');
let input = document.querySelector(".continuar");
let interval = null;
let doingAgain = null;
let bol = false;

function getTime(){
    const currentDate = new Date();
    let currentYear = parseInt(currentDate.getFullYear());
    let currentMonth = parseInt(currentDate.getMonth() + 1);
    let currentDay = parseInt(currentDate.getDate());
    let currentHour = parseInt(currentDate.getHours());
    let currentMinute = parseInt(currentDate.getMinutes());
    let currentSecond = parseInt(currentDate.getSeconds());
    let date = document.querySelector('#date').value;
    let time = document.querySelector('#time').value;
    let [year, month, day] = date.split('-');
    let [hour, minute, second] = time.split(':');
    let qtySeconds, qtyMinutes = 0, qtyHours = 0, qtyDays = 0, qtyMonths = 0, qtyYears = 0;

    if(((year > currentYear) || (year == currentYear && month > currentMonth) 
    || (year == currentYear && month == currentMonth && day >= currentDay)
    || (year == currentYear && month == currentMonth && day == currentDay && hour >= currentHour)
    || (year == currentYear && month == currentMonth && day == currentDay && hour == currentHour && minute >= currentMinute)
    || (year == currentYear && month == currentMonth && day == currentDay && hour == currentHour && minute == currentMinute && second >= second))
    && hour <= 24 && hour >= 0 && minute >= 0 && minute <= 60 && second <= 60 && second >= 0){
    /*CALCULAR SEGUNDOS*/
    if(currentSecond > second){
        qtySeconds = 60 - currentSecond + parseInt(second);
        currentMinute ++; 
    } else {
        qtySeconds = parseInt(second) - currentSecond;
    }
 
   /*CALCULAR MINUTOS*/
    if(currentMinute > minute){
        qtyMinutes += 60 - currentMinute + parseInt(minute);
        currentHour ++; 
    } else {
        qtyMinutes += parseInt(minute) - currentMinute;
    }

    /*CALCULAR HORAS*/
    if(currentHour > hour){
        qtyHours += 24 - currentHour + parseInt(hour);
    } else {
        qtyHours += parseInt(hour) - currentHour;
    }
            
    /*CALCULAR DIA*/
    if(currentDay > day){
        qtyDays += parseInt(getDaysInMonth(currentYear, currentMonth)) - currentDay + parseInt(day);
        currentMonth ++;
    } else {
        qtyDays += parseInt(day) - currentDay;
    }

    /*CALCULAR MÊS*/
    if(currentMonth > month){
        qtyMonths += 12 - currentMonth + parseInt(month);
        currentYear ++;
    } else {
        qtyMonths += parseInt(month) - currentMonth;
    }

    /*CALCULAR ANO*/
    qtyYears += parseInt(year) - currentYear; 

    timer(qtyHours, qtyMinutes, qtySeconds, qtyYears, qtyMonths, qtyDays);
    }else {
        reset();
        alert("Datas inválidas");
    } 
}

function timer(qtyHours, qtyMinutes, qtySeconds, qtyYears, qtyMonths, qtyDays){
    let divSecond = document.querySelector("#numSecond");
    let divMinute = document.querySelector("#numMinute");
    let divHour = document.querySelector("#numHour");
    let divDay = document.querySelector("#numDay");
    let divMonth = document.querySelector("#numMonth");
    let divYear = document.querySelector("#numYear");
    doingAgain =  setInterval( function doingIt(){   
        if(bol == false){
            for(child of input.children){
                child.remove();
            }
           for (child of divSecond.children){
                child.remove();
            }
            for (child of divMinute.children){
                child.remove();
            }
            for (child of divHour.children){
                child.remove();
            }
            for (child of divDay.children){
                child.remove();
            }
            for (child of divMonth.children){
                child.remove();
            }
            for (child of divYear.children){
                child.remove();
            }
            divYear.innerHTML = `<p>${qtyYears}</p>`;
            divMonth.innerHTML = `<p>${qtyMonths}</p>`;
        divDay.innerHTML = `<p>${qtyDays}</p>`;
        divHour.innerHTML = `<p>${qtyHours}</p>`;
        divMinute.innerHTML = `<p>${qtyMinutes}</p>`;
        divSecond.innerHTML = `<p>${qtySeconds}</p>`;
        
        if(qtySeconds == 0){
            if(qtyMinutes == 0 && qtyHours == 0 && qtyDays == 0 && qtyMonths == 0 && qtyYears == 0){
                alert("Timer finalizado!");
                reset();
            } else {
                qtySeconds = 60;
                qtyMinutes --;
                if(qtyMinutes == -1  && qtyHours > 0){
                    qtyMinutes = 59;
                    qtyHours --;
                    if(qtyHours == -1  && qtyDays > 0){
                        qtyHours = 23;
                        qtyDays --;
                        if(qtyDays == -1  && qtyMonths > 0){
                            qtyDays = 30;
                            qtyMonths --;
                                //getDaysInMonth(year - qtyYears, 12 - qtyMonths)
                            if(qtyMonths == -1 && qtyYears > 0){
                                qtyMonths = 12;
                                qtyYears --;
                            }
                        }
                    }
                }
            }
        }
        qtySeconds --;
    } else {
        stop();
    }
    }, 1000);
} 


function start() {
	if (interval) {
		return
	}
    getTime();
}

function stop() {
    input.innerHTML = `<button onclick="bol = false">Continuar</button>`;
}

function reset(bool) {
    location.reload();
}

setInterval(setClock, 1000);
function setClock(){
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);
}

function setRotation(element, rotationRatio){
    element.style.setProperty("--rotation", rotationRatio * 360);
}

function getDaysInMonth(year, month){
    return new Date(year, month, 0).getDate();
}

