export default function toggleAnimation(timeline, reverseDuration) {
  if (timeline.reversed()) {
    timeline.play();
  } else {
    timeline.reverse(reverseDuration);
  }
}
