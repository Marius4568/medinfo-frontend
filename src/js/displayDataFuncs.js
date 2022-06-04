/* eslint-disable indent */
import gsap from 'gsap';
import toggleAnimation from './gsap-animations/toggleAnimation';
import spinningAnimation from './gsap-animations/spinner';
import fetchFunction from './asyncFuncs';
import config from './config';

function isImage(url) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

// eslint-disable-next-line quotes
const noDataHTML = `<div class="no-data"> <p>Looks like there's no data here...</p> <img src="https://res.cloudinary.com/dcqggnzbv/image/upload/v1653037866/Medinfo/icons/sad-icon_bbqanv.svg" alt="sad face icon"></div> `;

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
        container.innerHTML = noDataHTML;
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
            // eslint-disable-next-line quotes
            avatar = `https://res.cloudinary.com/dcqggnzbv/image/upload/v1652801035/Medinfo/img/male-avatar_tjrozp.svg`;
          } else if (el.gender.toLowerCase() === 'female') {
            // eslint-disable-next-line quotes
            avatar = `https://res.cloudinary.com/dcqggnzbv/image/upload/v1652801017/Medinfo/img/female-avatar_fzfodt.svg`;
          }
        }
        const card = `
                <div  class="patient-card">
                <div class="patient-content">
                  <div class="patient-info">
                    <img src="${avatar}" class="patient-picture" alt="user avatar picture"></img>
                    <p class="patient-name">${el.first_name} ${el.last_name}</p>
                    <p class="patient-birthdate">${new Date(
                      el.birth_date,
                    ).toLocaleDateString()}</p>
                    <p class="patient-email">${el.email}</p>
                  </div>
                  <div class="patient-action-btns">
                    <button data-id="${
                      el.patient_id
                    }" class="view-log-btn">View logs</button
                    ><button data-id="${
                      el.patient_id
                    }" class="delete-btn">Delete</button>
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

      document.querySelectorAll('.delete-btn').forEach((el) => {
        el.addEventListener('click', async () => {
          const card = el.parentElement.parentElement.parentElement;
          const tl = gsap.timeline();
          tl.to(card, {
            opacity: 0,
          });
          tl.call(() => {
            card.remove();
            if (container.children.length === 0) {
              container.innerHTML = noDataHTML;
            }
          });

          const res = await fetchFunction(
            `${config.baseFetchLink}patient/delete`,
            { patient_id: el.dataset.id },
            'DELETE',
            true,
          );
          console.log(res);
        });
      });
    } catch (error) {
      console.log(error);
    }
  },

  displayLogs: async (link) => {
    try {
      const container = document.querySelector('.log-cards-container');
      container.innerHTML = '';

      // Loading animation handling
      const spinner = document.createElement('div');
      spinner.classList.add('page-spinner');

      spinningAnimation(spinner);

      container.append(spinner);

      const data = await fetchFunction(link, '', 'GET', true);

      console.log(data);

      if (document.querySelector('.page-spinner')) {
        container.innerHTML = '';
      }

      container.innerHTML = '';
      // If there's no logs:
      console.log(data);
      if (data.error === 'No logs in database' || data.logs.length === 0) {
        container.innerHTML = noDataHTML;
      }

      data.logs.forEach((el) => {
        const card = `
        <div class="log-card">
        <div class="log-card-icon">
          <img src="https://res.cloudinary.com/dcqggnzbv/image/upload/v1654285623/Medinfo/img/respiratory-log-type_hhezji.svg" alt="log-icon" />
        </div>
        <div class="log-card-content">
          <p class="log-name">${el.diagnosis}</p>
          
         <p class="log-date"> ${new Date(
           el.created_at,
         ).toLocaleDateString()}</p>
         <p class="log-time">${new Date(el.created_at).toLocaleTimeString()}</p>
          <button data-description="${
            el.description
          }" class="log-view-more-btn">More</button>
        </div>
      </div>
    </div>
            `;

        container.innerHTML += card;
      });
      document.querySelectorAll('.log-view-more-btn').forEach((el) => {
        el.addEventListener('click', () => {
          const lightBoxTL = gsap.timeline();
          lightBoxTL.set('.lightbox', {
            display: 'grid',
          });
          lightBoxTL.set('body', {
            overflow: 'hidden',
            paddingRight: '1rem',
          });
          lightBoxTL.call(() => {
            const [logTitle, logDate, logTime] = el.parentElement.children;
            const [lBoxTitle, lBoxDate, lBoxTime, lBoxDescription] =
              document.querySelector('.lightbox-content').children;

            lBoxTitle.textContent = logTitle.textContent;
            lBoxDate.textContent = logDate.textContent;
            lBoxTime.textContent = logTime.textContent;
            lBoxDescription.textContent = el.dataset.description;
          });
          lightBoxTL.to('.lightbox', {
            opacity: 1,
          });

          document
            .querySelector('.lightbox')
            .addEventListener('click', (ev) => {
              //////////////////////////!!!!

              if (ev.target !== ev.currentTarget) return;
              lightBoxTL.reverse(0.3);
            });
        });
      });
    } catch (err) {
      console.log(err);
    }
  },
};
