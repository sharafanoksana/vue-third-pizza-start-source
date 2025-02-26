export function clearAnimations(el, done) {
  el.addEventListener("animationend", () => {
    el.className = "";
    done();
  });
}

export function enterAnimation(el, done) {
  el.className = "bounce";
  clearAnimations(el, done);
}

export function leaveAnimation(el, done) {
  clearAnimations(el, done);
}
