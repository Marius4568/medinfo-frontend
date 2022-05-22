import navAnimations from './gsap-animations/navAnimations';

navAnimations();

window.addEventListener('storage', (ev) => {
  if (ev.key === 'userToken' && ev.newValue === null) {
    window.location.href = 'login.html';
  }
});
