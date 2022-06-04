import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import gsapToggle from './toggleAnimation';

gsap.registerPlugin(ScrollTrigger);

export default function navAnimations() {
  const showAnim = gsap
    .from('header', {
      yPercent: -100,
      paused: true,
      duration: 0.2,
    })
    .progress(1);

  const stickyNav = ScrollTrigger.create({
    start: 'top top',
    end: 99999,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
  });

  const burgerMenu = document.querySelector('.burger-menu');

  const navtl = gsap.timeline({ paused: true });

  navtl.set('body', {
    overflow: 'hidden',
    duration: 0,
  });

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

  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('burger-menu-x');

    gsapToggle(navtl, 0.5);
  });
}
