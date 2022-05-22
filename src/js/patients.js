import spinningAnimation from './gsap-animations/spinner';
import config from './config';
import postAsync from './asyncFuncs';
import src from 'gsap/src';
import gsap from 'gsap';
import formAnimations from './gsap-animations/formAnimations';
import gsapToggle from '../js/gsap-animations/general';
import validator from 'validator';

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
    if (document.querySelector('.page-spinner')) {
      document.querySelector('.page-spinner').remove();
    }

    // If there's no patients:
    if (data.patients.length === 0) {
      container.innerHTML =
        '<div class="no-patients"> <p>Looks like you have no patients added...</p> <img src="https://res.cloudinary.com/dcqggnzbv/image/upload/v1653037866/Medinfo/icons/sad-icon_bbqanv.svg" alt=""></div> ';
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
      <div  class="patient-card">
      <div class="patient-content">
        <div class="patient-info">
          <img src="${avatar}" class="patient-picture"></img>
          <p class="patient-name">${el.first_name} ${el.last_name}</p>
          <p class="patient-birthdate">${el.birth_date}</p>
          <p class="patient-email">${el.email}</p>
        </div>
        <div class="patient-action-btns">
          <button data-id="${el.patient_id}" class="view-log-btn">View logs</button
          ><button class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
      `;

      container.innerHTML += card;
    });
    document.querySelectorAll('.view-log-btn').forEach((el) => {
      el.addEventListener('click', () => {
        window.location.href = `/patient.html?id=${el.dataset.id}`;
      });
    });
  } catch (error) {
    console.log(error);
  }
}

displayPatients();

const addPatientBtn = document.querySelector('.add-patient-btn');
const escapeBtn = document.querySelector('.esc-form-btn');

const addPatientTL = gsap.timeline({ paused: true });
addPatientTL.to('.add-patient-btn', {
  opacity: 0,
});
addPatientTL.set('.add-patient-btn', {
  display: 'none',
  duration: 0,
});
addPatientTL.set('body', {
  overflow: 'hidden',
  duration: 0,
});

addPatientTL.to('.add-a-patient-modal', {
  height: '100vh',
  duration: 0.3,
});
addPatientTL.set('form[name="add_patient_form"]', {
  duration: 0,
  display: 'block',
});
addPatientTL.to('form[name="add_patient_form"]', {
  opacity: 1,
  duration: 0.5,
});
addPatientTL.set(
  '.add-a-patient-form-wrap p',
  {
    display: 'block',
    duration: 0,
  },
  0.7,
);
addPatientTL.to(
  '.add-a-patient-form-wrap p',
  {
    opacity: 1,
    duration: 0.5,
  },
  0.8,
);

addPatientTL.set(
  '.esc-form-btn',
  {
    display: 'block',
    duration: 0,
  },
  0.9,
);
addPatientTL.to(
  '.esc-form-btn',
  {
    opacity: 1,
    duration: 0.3,
  },
  1,
);
addPatientTL.reverse();
/////////////////////////
addPatientBtn.addEventListener('click', () => {
  addPatientTL.play();
});

escapeBtn.addEventListener('click', () => {
  addPatientTL.reverse(1);
});

const addPatientForm = document.querySelector('form[name="add_patient_form"]');

addPatientForm.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  const addPatientData = {
    first_name: document.getElementById('APfirstNameInput').value,
    last_name: document.getElementById('APlastNameInput').value,
    birth_date: document.getElementById('APbirthDateInput').value,
    gender: document.getElementById('APgenderInput').value,
    phone_number: document.getElementById('APphoneNumberInput').value,
    email: document.getElementById('APemailInput').value,
    photo: document.getElementById('APphotoInput').value,
    identity_code: document.getElementById('APidentityCodeInput').value,
  };

  const isAfter1910 = validator.isBefore(
    addPatientData.birth_date,
    new Date().toLocaleString().split(',')[0],
  );
  const isBeforeCurDate = validator.isAfter(
    addPatientData.birth_date,
    '1910-01-01',
  );

  const validPhoneNumber = validator.isMobilePhone(
    document.querySelector('#APphoneNumberInput').value,
  );

  const data = await postAsync(
    `${config.baseFetchLink}patient/add`,
    addPatientData,
    true,
  );
  if ((data.msg = 'Patient added')) {
    displayPatients();
  }

  formAnimations.formMessageAnimation(
    data,
    addPatientForm,
    Object.keys(data)[0],
  );
  console.log(data);
  console.log(isAfter1910, isBeforeCurDate, validPhoneNumber);
});
