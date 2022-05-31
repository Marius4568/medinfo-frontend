import gsap from 'gsap';

export default {
  formMessageAnimation: (dataToUse, formToUse, messageType) => {
    if (dataToUse[messageType]) {
      if (document.querySelector(`.form-flash-message-${messageType}`)) {
        document.querySelector(
          `.form-flash-message-${messageType}`,
        ).textContent = `${messageType}: ${dataToUse[messageType]}`;
        return;
      }
      console.log(messageType);
      const formFlashMessage = document.createElement('div');
      formFlashMessage.classList.add(`form-flash-message-${messageType}`);
      formFlashMessage.textContent = `${messageType}: ${dataToUse[messageType]}`;

      gsap.set(formFlashMessage, {
        height: 0,
        opacity: 0,
        padding: '1rem',
      });

      formToUse.prepend(formFlashMessage);

      gsap.to(formFlashMessage, {
        height: 'auto',
        opacity: 1,
      });

      gsap.delayedCall(5, () => {
        const tl = gsap.timeline();
        tl.to(formFlashMessage, {
          height: 0,
          opacity: 0,
          padding: 0,
        });
        tl.call(() => formFlashMessage.remove());
      });
    }
  },
  buttonspinnerInit: (parent) => {
    // Don't let the user create multiple spinners
    if (document.querySelector('form .spinner')) {
      return;
    }
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
    if (document.querySelector('.spinner')) {
      const tl = gsap.timeline();
      tl.to('.spinner', {
        opacity: 0,
        duration: 0.15,
      });
      tl.to('.spinner', {
        width: 0,
        duration: 0.15,
      });
      tl.call(() => document.querySelector('.spinner').remove());
      tl.to(parent, {
        width: 'auto',
      });
    }
  },
};
