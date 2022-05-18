import spinningAnimation from './gsap-animations/spinner';
import config from './config';

const token = sessionStorage.getItem('userToken');

if (!token) {
  window.location.replace('login.html');
}

function isImage(url) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
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
    const container = document.querySelector('.patients');
    container.innerHTML = '';
    const spinner = document.createElement('div');
    spinner.classList.add('page-spinner');
    spinningAnimation(spinner);
    container.append(spinner);
    const res = await fetch(`${config.baseFetchLink}patient/get_patients`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        'Content-type': 'application/json',
      },
    });
    const data = await res.json();
    spinner.remove();

    // If there's no patients:
    if (data.patients.length === 0) {
    }

    // If the doctor has patients display them:
    let avatar = '';

    data.patients.forEach((el) => {
      avatar = el.photo;
      if (!isImage(el.photo)) {
        if (el.gender === 'male') {
          avatar =
            'https://res.cloudinary.com/dcqggnzbv/image/upload/v1652801035/Medinfo/img/male-avatar_tjrozp.svg';
        } else if (el.gender === 'female') {
          avatar =
            'https://res.cloudinary.com/dcqggnzbv/image/upload/v1652801017/Medinfo/img/female-avatar_fzfodt.svg';
        }
      }

      const card = `
      <div class="patient-card">
      <div class="patient-content">
        <div class="patient-info">
          <img src="${avatar}" class="patient-picture"></img>
          <p class="patient-name">${el.first_name} ${el.last_name}</p>
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
    // document.body.style.minHeight = '100vh';
  } catch (error) {
    console.log(error);
  }
}

displayPatients();
