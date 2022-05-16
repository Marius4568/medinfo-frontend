const submitBtn = document.querySelector('button[type =submit]');

const token = sessionStorage.getItem('userToken');

if (token) {
  location.href = 'patients.html';
}

const form = document.forms.login_form;

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  userDetails = {
    email: form.children[0].children[1].value,
    password: form.children[1].children[1].value,
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
    const res = await fetch(
      'https://lemon-circular-eucalyptus.glitch.me/user/login',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      }
    );
    const data = await res.json();
    if (data.token) {
      sessionStorage.setItem('userToken', data.token);
      location.href = '/patients.html';
    }
    console.log(data);
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
