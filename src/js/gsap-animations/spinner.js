import gsap from 'gsap';

export default function spinningAnimation(element) {
  gsap.to(element, {
    keyframes: {
      rotate: ['0deg', '720deg'],
      scale: [1, 1.1],
      ease: 'Power1.easeInOut',
    },
    duration: 2,
    repeat: -1,
    yoyo: true,
  });
}
