document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  const delayValue = parseInt(delay.value);
  const stepValue = parseInt(step.value);
  const amountValue = parseInt(amount.value);

  for (let index = 0; index < amountValue; index++) {
    const delay = index * stepValue + delayValue;
    createPromise(index, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      });
  }

  e.currentTarget.reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
