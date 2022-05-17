import gsap from 'gsap';

export default {
  formMessageAnimation: (dataToUse, formToUse, messageType) => {
    if (dataToUse[messageType]) {
      if (document.querySelector('.form-flash-message')) {
        document.querySelector('.form-flash-message').remove();
      }

      const formFlashMessage = document.createElement('div');
      formFlashMessage.classList.add('form-flash-message');
      formFlashMessage.textContent = `Error: ${dataToUse[messageType]}`;

      gsap.set(formFlashMessage, {
        height: 0,
        opacity: 0,
      });

      formToUse.prepend(formFlashMessage);

      gsap.to(formFlashMessage, {
        height: 'auto',
        opacity: 1,
      });

      gsap.delayedCall(7, () => {
        const tl = gsap.timeline();
        tl.to(formFlashMessage, {
          height: 0,
          padding: 0,
        });
        tl.call(() => formFlashMessage.remove());
      });
    }
  },
  buttonspinnerInit: (parent) => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    gsap.set(spinner, {
      width: 0,
    });

    gsap.to(parent, {
      width: '+=1rem',
    });

    gsap.to(spinner, {
      keyframes: {
        rotate: ['0deg', '720deg'],
        scale: [1, 1.1],
        ease: 'Power1.easeInOut',
      },
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });

    parent.append(spinner);

    gsap.to(spinner, {
      width: '1rem',
    });
  },

  buttonspinnerRemove: (parent) => {
    const tl = gsap.timeline();
    tl.to('.spinner', {
      width: 0,
    });
    tl.call(() => document.querySelector('.spinner').remove());
    tl.to(parent, {
      width: 'auto',
    });
  },
};
