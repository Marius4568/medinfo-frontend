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
    const data = await res.json();

    console.log(data.patients);
    const container = document.querySelector('.patients');
    container.innerHTML = '';
    data.patients.forEach((el) => {
      const card = `
      <div class="patient-card">
      <div class="patient-content">
        <div class="patient-info">
          <div class="patient-picture"></div>
          <p class="patient-name">${el.first_name}</p>
          <p class="patient-birthdate">${el.birth_date}</p>
          <p class="patient-email">${el.email}</p>
        </div>
        <div class="patient-action-btns">
          <button class="view-log-btn">View log</button
          ><button class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
      `;

      container.innerHTML += card;
    });
  } catch (error) {
    console.log(error);
  }
}

displayPatients();
