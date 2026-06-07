import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
let userSelectedDate = null;
const startBtn = document.querySelector('button[data-start]');
const dataSelector = document.querySelector('#datetime-picker');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');
if (startBtn) {
    startBtn.disabled = true;
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = Date.now();
        if (selectedDates[0] <= currentDate) {
            iziToast.error({
            message: 'Please choose a date in the future',
            position: "topRight",
            backgroundColor: '#ef4040',
            messageColor: '#ffffff',
            });
            if (startBtn) {
                startBtn.disabled = true;
            }
        } else {
            if (startBtn) {
                startBtn.disabled = false;
            }
            userSelectedDate = selectedDates[0];
        }
    console.log(selectedDates[0]);
  },
};
flatpickr('#datetime-picker', options);

let intervalId = null;
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    dataSelector.disabled = true;
    intervalId = setInterval(() => {
        const currentTime = new Date();
        const msDifference = userSelectedDate.getTime() - currentTime;
        if (msDifference <= 0) {
            clearInterval(intervalId);
            dataSelector.disabled = false;
            return;
        }
        const timeComponents = convertMs(msDifference);
        console.log(timeComponents);
        daysElem.textContent = addLeadingZero(timeComponents.days);
        hoursElem.textContent = addLeadingZero(timeComponents.hours);
        minutesElem.textContent = addLeadingZero(timeComponents.minutes);
        secondsElem.textContent = addLeadingZero(timeComponents.seconds);
    }, 1000);
});
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };

}
