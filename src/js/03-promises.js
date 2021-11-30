import Notiflix from 'notiflix';

const refs  = {
  delayRef: document.querySelector("[name=delay]"),
  stepRef: document.querySelector("[name=step]"),
  amountRef: document.querySelector("[name=amount]"),
  btnRef: document.querySelector("[type=submit]"),
  form: document.querySelector('form'),
};

 refs.form.addEventListener('submit', onSubmitcreatePromises);

 
 
 function onSubmitcreatePromises(event) {
   event.preventDefault()
   let delay = Number(refs.delayRef.value);
  const step = Number(refs.stepRef.value);
  const amount = Number(refs.amountRef.value);
  
  for (let i = 1; i <= amount; i += 1) {
  if(i!== 1){
    delay += step;
    };
    
    createPromise(i, delay)
      .then(({ position, delay }) => {
  
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        
      })
  .catch(({ position, delay }) => {
       
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        
  });
  }
};

function createPromise(position, delay) {
 return new Promise((resolve, reject) => {
   setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
     resolve({ position, delay });
    } else {
     reject({ position, delay })
    }
   }, delay);
 })
   }