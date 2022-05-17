import { config } from './config';

const submitBtn = document.querySelector('button[type = submit]');
const emailInput = document.querySelector('input[type = email]');
const passwordInput = document.querySelector('input[type = password]');

const token = sessionStorage.getItem('userToken');

if (token) {
  location.href = 'patients.html';
}

const form = document.forms.login_form;

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const userDetails = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  gsap.set(spinner, {
    width: 0,
  });

  gsap.to(submitBtn, {
    width: '+=1rem',
  });
  submitBtn.append(spinner);
  gsap.to(spinner, {
    width: '1rem',
  });

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
      location.href = '/patients.html';
    }
    console.log(data);

    if (data.error) {
      if (document.querySelector('.form-flash-message')) {
        document.querySelector('.form-flash-message').remove();
      }

      const formFlashMessage = document.createElement('div');
      formFlashMessage.classList.add('form-flash-message');
      formFlashMessage.textContent = 'Error: ' + data.error;

      gsap.set(formFlashMessage, {
        height: 0,
        opacity: 0,
      });

      form.prepend(formFlashMessage);

      gsap.to(formFlashMessage, {
        height: 'auto',
        opacity: 1,
      });

      const delayedCall = gsap.delayedCall(7, () => {
        const tl = gsap.timeline();
        tl.to(formFlashMessage, {
          height: 0,
          padding: 0,
        });
        tl.call(() => formFlashMessage.remove());
      });
    }
  } catch (error) {
    console.log(error);
  }
  gsap.to(spinner, {
    width: 0,
  });
  spinner.remove();
  gsap.to(submitBtn, {
    width: 'auto',
  });
});
