import config from './config';
import fetchFunction from './asyncFuncs';
import displayDataFuncs from './displayDataFuncs';

// Url params passed from the previous page
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

async function displayPatientInfo() {
  const data = await fetchFunction(
    `${config.baseFetchLink}patient/get_patient?patient_id=${params.id}`,
    '',
    'GET',
    true,
  );

  document.querySelector(
    '.page-title h1',
  ).textContent = `${data.patient[0].first_name} ${data.patient[0].last_name}`;
}

displayPatientInfo();

displayDataFuncs.displayLogs(
  `${config.baseFetchLink}logs/get_logs?patient_id=${params.id}`,
);
