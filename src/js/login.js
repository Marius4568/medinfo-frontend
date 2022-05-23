// import gsap from 'gsap';

import formAnimations from './gsap-animations/formAnimations';
import fetchFunction from './asyncFuncs';
import config from './config';
import redirectBasedOnToken from './redirectBasedOnToken';

const submitBtn = document.querySelector('button[type = submit]');
const emailInput = document.querySelector('input[type = email]');
const passwordInput = document.querySelector('input[type = password]');

redirectBasedOnToken.redirectIfAuthed('patients.html');

const form = document.forms.login_form;

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const userDetails = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  if (!ev.detail || ev.detail === 1) {
    formAnimations.buttonspinnerInit(submitBtn);
  }
  try {
    const data = await fetchFunction(
      `${config.baseFetchLink}user/login`,
      userDetails,
      'POST',
      false,
    );

    if (data.token) {
      sessionStorage.setItem('userToken', data.token);
      window.location.href = '/patients.html';
    }
    console.log(data);

    formAnimations.formMessageAnimation(data, form, Object.keys(data)[0]);

    formAnimations.buttonspinnerRemove(submitBtn);
  } catch (error) {
    console.log(error);
  }
});
