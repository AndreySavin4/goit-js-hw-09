const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  end: document.querySelector('button[data-stop]'),
};

let intervalColor = 0;

refs.start.addEventListener('click', onStartChangeColor);
refs.end.addEventListener('click', onEndChangeColor);

refs.end.setAttribute('disabled', true);

function onStartChangeColor(e) {
  refs.start.setAttribute('disabled', true);
  refs.end.removeAttribute('disabled', false);
  intervalColor = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onEndChangeColor(e) {
  refs.start.removeAttribute('disabled');
  refs.end.setAttribute('disabled', false);
  clearInterval(intervalColor);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
