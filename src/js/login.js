import gsap from 'gsap';

import formAnimations from './gsap-animations/formAnimations';

import { config } from './config';

const submitBtn = document.querySelector('button[type = submit]');
const emailInput = document.querySelector('input[type = email]');
const passwordInput = document.querySelector('input[type = password]');

const token = sessionStorage.getItem('userToken');

if (token) {
  window.location.href = 'patients.html';
}

const form = document.forms.login_form;

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const userDetails = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  formAnimations.buttonspinnerInit(submitBtn);

  try {
    const res = await fetch(`${config.baseFetchLink}user/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    });
    const data = await res.json();
    if (data.token) {
      sessionStorage.setItem('userToken', data.token);
      window.location.href = '/patients.html';
    }
    console.log(data);
    formAnimations.buttonspinnerRemove(submitBtn);
    formAnimations.formMessageAnimation(data, form, 'error');
  } catch (error) {
    console.log(error);
  }
});
