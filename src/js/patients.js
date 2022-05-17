import { config } from './config';

const token = sessionStorage.getItem('userToken');

if (!token) {
  window.location.replace('login.html');
}

const logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener('click', () => {
  if (sessionStorage.getItem('userToken')) {
    sessionStorage.removeItem('userToken');
    window.location.href = 'login.html';
  }
});

async function displayPatients() {
  try {
    const res = await fetch(`${config.baseFetchLink}patient/get_patients`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        'Content-type': 'application/json',
      },
    });
    console.log(sessionStorage);
    const data = await res.json();
    if (data.token) {
      sessionStorage.setItem('userToken', data.token);
      window.location.href = '/patients.html';
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

displayPatients();
