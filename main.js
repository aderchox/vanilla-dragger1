const children = document.querySelectorAll(".child");
let startX, startY;

children.forEach((child) => {
  child.addEventListener("mousedown", mousedown);
});

function mousedown(event) {
  startX = event.x;
  startY = event.y;

  let boundMousemove = mousemove.bind(event.target);
  let boundMouseup = mouseup.bind(boundMousemove);
  // Because mousemove's handler is removed in mouseup, and so must be re-installed here inside mousedown, each time.
  window.addEventListener("mousemove", boundMousemove);
  window.addEventListener("mouseup", boundMouseup);
}

function mousemove(event) {
  let item = this; // NOTE: Requires event binding on call.
  let xMove = event.x - startX;
  let yMove = event.y - startY;
  startX = event.x;
  startY = event.y;

  // NOTE: Position is relative.
  item.style.top = item.style.top || 0;
  item.style.left = item.style.left || 0;
  item.style.top = parseInt(item.style.top) + yMove + "px";
  item.style.left = parseInt(item.style.left) + xMove + "px";
}

function mouseup(event) {
  let boundMousemove = this;
  window.removeEventListener("mousemove", boundMousemove);
}
