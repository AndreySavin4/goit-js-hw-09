import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

const options = {
  enableTime: true, // Включает выбор времени//
  time_24hr: true, //Отображает время в 24 часовом режиме//
  defaultDate: new Date(), //Устанавливает начальную выбранную дату //
  minuteIncrement: 1, // Шаг ввода минут //
  onClose(selectedDates) {
    const newDate = new Date();
    if (selectedDates[0] > newDate) {
      refs.start.removeAttribute('disabled', false);
    } else {
      refs.start.setAttribute('disabled', true);
      Notify.failure('Please choose a date in the future');
      // alert('Please choose a date in the future');
    }
    const selectedDay = selectedDates[0];
  }, // Функция для запуска при каждом закрытии календаря//
};

refs.start.setAttribute('disabled', true);

flatpickr('#datetime-picker', options);

refs.start.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  const btnClick = setInterval(() => {
    const ms = selectedDay.getTime() - Date.now();
    if (ms <= 0) {
      clearInterval(btnClick);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(ms);
    addLeadingZero({ days, hours, minutes, seconds });
  }, 1000);
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function formatValue(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = formatValue(Math.floor(ms / day));
  // Remaining hours
  const hours = formatValue(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = formatValue(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = formatValue(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
