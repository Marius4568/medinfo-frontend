import spinningAnimation from './gsap-animations/spinner';
import fetchFunction from './asyncFuncs';

function isImage(url) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export default {
  displayPatients: async (link) => {
    try {
      const container = document.querySelector('.patients');
      container.innerHTML = '';

      // Loading animation handling
      const spinner = document.createElement('div');
      spinner.classList.add('page-spinner');

      spinningAnimation(spinner);

      container.append(spinner);

      const data = await fetchFunction(link, '', 'GET', true);

      if (document.querySelector('.page-spinner')) {
        container.innerHTML = '';
      }

      container.innerHTML = '';
      // If there's no patients:
      if (data.patients.length === 0) {
        container.innerHTML =
          '<div class="no-patients"> <p>Looks like there are no patients here...</p> <img src="https://res.cloudinary.com/dcqggnzbv/image/upload/v1653037866/Medinfo/icons/sad-icon_bbqanv.svg" alt="sad face icon"></div> ';
      }

      // Change the default avatar link based on patient's gender
      // If the patient has a photo assigned to him, leave avatar blank
      let avatar = '';
      //   If the doctor has patients display them:

      data.patients.forEach((el) => {
        console.log(el.photo, el.gender, !isImage(el.photo));
        avatar = el.photo;
        if (!isImage(el.photo)) {
          if (el.gender.toLowerCase() === 'male') {
            avatar =
              'https://res.cloudinary.com/dcqggnzbv/image/upload/v1652801035/Medinfo/img/male-avatar_tjrozp.svg';
          } else if (el.gender.toLowerCase() === 'female') {
            avatar =
              'https://res.cloudinary.com/dcqggnzbv/image/upload/v1652801017/Medinfo/img/female-avatar_fzfodt.svg';
          }
        }
        const card = `
                <div  class="patient-card">
                <div class="patient-content">
                  <div class="patient-info">
                    <img src="${avatar}" class="patient-picture" alt="user avatar picture"></img>
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
  },
};
