export default function gsapToggle(timeline, reverseDuration) {
  if (timeline.reversed()) {
    timeline.play();
  } else {
    timeline.reverse(reverseDuration);
  }
}
