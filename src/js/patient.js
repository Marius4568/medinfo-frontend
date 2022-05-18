import config from './config';

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

async function gettr() {
  const res = await fetch(
    `${config.baseFetchLink}patient/get_patient?patient_id=${params.id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
        'Content-type': 'application/json',
      },
    },
  );
  const data = await res.json();

  console.log(data.patient[0]);

  document.querySelector(
    '.page-title h1',
  ).textContent = `${data.patient[0].first_name} ${data.patient[0].last_name}`;
}

gettr();
