// NOTE: Dragger elements must be specified using the `data-dragger` attribute in the html document.
// NOTE: Container must be an element that contains dragger elements.
// NOTE: Dragger elements must be positioned "relative"ly (talking about the CSS).
function dragger(container) {
  let startX, startY;

  container.addEventListener("mousedown", mousedown);

  function mousedown(event) {
    // console.log("inside container: ", { container: this });
    const isDragger = event.target.matches("[data-dragger]");
    if (!isDragger) {
      return;
    }
    const dragger = event.target;
    startX = event.x;
    startY = event.y;

    let boundMousemove = mousemove.bind(dragger);
    let boundMouseup = mouseup.bind(boundMousemove);
    // Because DOM re-renders may fall behind the rapid mouse movement, mousemove and mouseup are attached to the window object instead of the dragger itself.
    // Because mousemove's handler is removed in mouseup, it must be re-installed here inside mousedown, each time.
    window.addEventListener("mousemove", boundMousemove);
    window.addEventListener("mouseup", boundMouseup);
  }

  function mousemove(event) {
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

  function mouseup(event) {
    let boundMousemove = this;
    window.removeEventListener("mousemove", boundMousemove);
  }
}

export default dragger;
