import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const burgerMenu = document.querySelector('.burger-menu');
// const headerNavlinks = document.querySelector('header nav ul');

const navtl = gsap.timeline({ paused: true });

navtl.to('header nav ul', {
  opacity: 1,
  width: '100vw',
});
navtl.set('header nav ul a', {
  display: 'block',
});
navtl.to('header nav ul a', {
  stagger: 0.2,
  opacity: 1,
});
navtl.reverse();

function gsapToggle(timeline, reverseDuration) {
  if (timeline.reversed()) {
    timeline.play();
  } else {
    timeline.reverse(reverseDuration);
  }
}

burgerMenu.addEventListener('click', () => {
  burgerMenu.classList.toggle('burger-menu-x');

  gsapToggle(navtl, 0.5);
});

window.addEventListener('storage', (ev) => {
  if (ev.key === 'userToken' && ev.newValue === null) {
    window.location.href = 'login.html';
  }
});

const showAnim = gsap
  .from('header', {
    yPercent: -100,
    paused: true,
    duration: 0.2,
  })
  .progress(1);

ScrollTrigger.create({
  start: 'top top',
  end: 99999,
  onUpdate: (self) => {
    self.direction === -1 ? showAnim.play() : showAnim.reverse();
  },
});
