import spinningAnimation from './gsap-animations/spinner';
import config from './config';
import fetchFunction from './asyncFuncs';
import src from 'gsap/src';
import gsap from 'gsap';
import formAnimations from './gsap-animations/formAnimations';
import gsapToggle from '../js/gsap-animations/general';
import validator from 'validator';
import redirectBasedOnToken from './redirectBasedOnToken';
import displayDataFuncs from './displayDataFuncs';

redirectBasedOnToken.redirectIfNotAuthed('login.html');

const logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener('click', () => {
  if (sessionStorage.getItem('userToken')) {
    sessionStorage.removeItem('userToken');
    window.location.href = 'login.html';
  }
});

// Initially display patients
displayDataFuncs.displayPatients(`${config.baseFetchLink}patient/get_patients`);

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

  const data = await fetchFunction(
    `${config.baseFetchLink}patient/add`,
    addPatientData,
    'POST',
    true,
  );
  if ((data.msg = 'Patient added')) {
    displayDataFuncs.displayPatients(
      `${config.baseFetchLink}patient/get_patients`,
    );
  }

  formAnimations.formMessageAnimation(
    data,
    addPatientForm,
    Object.keys(data)[0],
  );
  console.log(data);
  console.log(isAfter1910, isBeforeCurDate, validPhoneNumber);
});

const patientSearch = document.getElementById('searchPatientInput');

let timer;

patientSearch.addEventListener('keyup', (ev) => {
  const searchText = ev.currentTarget.value;

  clearTimeout(timer);

  timer = setTimeout(() => {
    displayDataFuncs.displayPatients(
      `${config.baseFetchLink}patient/search?patient_search=${searchText}`,
    );
  }, 500);
});
