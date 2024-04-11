// NOTE: Dragger elements must be specified using the `data-dragger` attribute in the html document.
// NOTE: Container must be an element that contains dragger elements.
// NOTE: Dragger elements must be positioned "relative"ly (talking about the CSS).
function dragger(container) {
  container.addEventListener("pointerdown", pointerdown);

  function pointerdown(event) {
    // console.log("inside container: ", { container: this });
    const isDragger = event.target.matches("[data-dragger]");
    if (!isDragger) {
      return;
    }
    const dragger = event.target;

    // Because DOM re-renders may fall behind the rapid pointer movement, pointermove and pointerup are attached to the window object instead of the dragger itself.
    // Because pointermove's handler is removed in pointerup, it must be re-installed here inside pointerdown, each time. Also, we don't want to allow all pointerdowns (eg, ones initiated at points other than over the draggers) to trigger this pointerup event handler.
    window.addEventListener("pointermove", pointermove);
    window.addEventListener("pointerup", pointerup);
    function pointermove(event) {
      let xMove = event.movementX;
      let yMove = event.movementY;

      // NOTE: Position is relative.
      dragger.style.top = dragger.style.top || 0;
      dragger.style.left = dragger.style.left || 0;
      dragger.style.top = parseInt(dragger.style.top) + yMove + "px";
      dragger.style.left = parseInt(dragger.style.left) + xMove + "px";
    }
    function pointerup(event) {
      window.removeEventListener("pointermove", pointermove);
      window.removeEventListener("pointerup", pointerup);
    }
  }
}

export default dragger;
