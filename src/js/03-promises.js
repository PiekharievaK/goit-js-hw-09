import Notiflix from 'notiflix';

const refs  = {
  delay: document.querySelector("[name=delay]"),
  step: document.querySelector("[name=step]"),
  amount: document.querySelector("[name=amount]"),
  btn: document.querySelector("[type=submit]"),
  form: document.querySelector('form'),
};


 refs.form.addEventListener('submit', createAllPromises);

function createAllPromises(evt) {
    evt.preventDefault();

    let position = 0;
    let promiseDelay = Number(refs.delay.value);
    
    for (let i = 1; i <= Number(refs.amount.value); i += 1) {
        position += 1;
        promiseDelay += Number(refs.step.value);

        createPromise(position, promiseDelay)
        .then(onResolve)
        .catch(onReject)
    }
   
};


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;

        if (shouldResolve) {
            resolve({position, delay});
      } else {
        reject({position, delay});
      }
    } , delay)
  })  
}


function onResolve({position, delay }) {
     Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};
function onReject({ position, delay }) {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  };


