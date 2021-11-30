import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';

const timer = document.querySelector(`.timer`);
const timerDays = timer.querySelector(`[data-days]`);
const timerHours = timer.querySelector(`[data-hours]`);
const timerMinutes = timer.querySelector(`[data-minutes]`);
const timerSeconds = timer.querySelector(`[data-seconds]`);

const textInput = document.querySelector(`#datetime-picker`);
const button = document.querySelector(`button`);

let diference = ''
let convertDiference = '';
let choiseDate = '';
let timerInterval = null;
let timerisActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
    onClose(selectedDates) {
        choiseDate = selectedDates[0];
          button.disabled = false;
        if (choiseDate.getTime() <= Date.now()) {
            Report.failure(`Sorry, you pick unavailable date`, `Please choose a date in the future`, 'Okay');
            // Notify.failure('Qui timide rogat docet negare');
            button.disabled = true;
            return
        }
    },
};
const calendarCreate = flatpickr(textInput, options);
 
button.addEventListener(`click`, diferenceTimerStart)

function onStartBtnClick() {
   
    diference = choiseDate.getTime() - Date.now();
    convertDiference = convertMs(diference)
      timerDays.textContent = convertDiference.days ;
      timerHours.textContent = convertDiference.hours ;
      timerMinutes.textContent = convertDiference.minutes ;
      timerSeconds.textContent = convertDiference.seconds;
}

function diferenceTimerStart() {
  
    if (!choiseDate || timerisActive) {
        clearInterval(timerInterval);
      button.textContent = `Start`;
        textInput.disabled = false;
        timerisActive = false;
        return
    }
    timerInterval = setInterval(onStartBtnClick, 1000);
    textInput.disabled = true;
    timerisActive = true;
  button.textContent = `Stop`;
    return timerInterval;
};
    
function addLeadingZero(value) {
   return  String(value).padStart(2, 0)  
}

    function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// function choiseDate() {
    //     return new Date(textInput._flatpickr.selectedDates[0])
    // };
    