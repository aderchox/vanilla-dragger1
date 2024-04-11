// NOTE: Dragger elements must be specified using the `data-dragger` attribute in the html document.
// NOTE: Container must be an element that contains dragger elements.
// NOTE: Dragger elements must be positioned "relative"ly (talking about the CSS).
function dragger(container) {
  let startX, startY;

  container.addEventListener("pointerdown", pointerdown);

  function pointerdown(event) {
    // console.log("inside container: ", { container: this });
    const isDragger = event.target.matches("[data-dragger]");
    if (!isDragger) {
      return;
    }
    const dragger = event.target;
    startX = event.x;
    startY = event.y;

    let boundPointermove = pointermove.bind(dragger);
    let boundPointerup = pointerup.bind(boundPointermove);
    // Because DOM re-renders may fall behind the rapid pointer movement, pointermove and pointerup are attached to the window object instead of the dragger itself.
    // Because pointermove's handler is removed in pointerup, it must be re-installed here inside pointerdown, each time.
    window.addEventListener("pointermove", boundPointermove);
    window.addEventListener("pointerup", boundPointerup);
  }

  function pointermove(event) {
    let dragger = this; // NOTE: Requires event binding of the dragger on call.
    let xMove = event.x - startX;
    let yMove = event.y - startY;
    startX = event.x;
    startY = event.y;

    // NOTE: Position is relative.
    dragger.style.top = dragger.style.top || 0;
    dragger.style.left = dragger.style.left || 0;
    dragger.style.top = parseInt(dragger.style.top) + yMove + "px";
    dragger.style.left = parseInt(dragger.style.left) + xMove + "px";
  }

  function pointerup(event) {
    let boundPointermove = this;
    window.removeEventListener("pointermove", boundPointermove);
  }
}

export default dragger;
