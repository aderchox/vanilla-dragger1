const children = document.querySelectorAll(".child");
let startX, startY;

children.forEach((child) => {
  child.addEventListener("mousedown", mousedown);
});

function mousedown(event) {
  startX = event.x;
  startY = event.y;
  // Because mousemove's handler is removed in mouseup, and so must be re-installed here inside mousedown, each time.
  event.currentTarget.addEventListener("mousemove", mousemove);
  event.currentTarget.addEventListener("mouseup", mouseup);
}

function mousemove(event) {
  let xMove = event.x - startX;
  let yMove = event.y - startY;
  startX = event.x;
  startY = event.y;

  let item = event.currentTarget;

  // NOTE: Position is relative.
  item.style.top = item.style.top || 0;
  item.style.left = item.style.left || 0;
  item.style.top = parseInt(item.style.top) + yMove + "px";
  item.style.left = parseInt(item.style.left) + xMove + "px";
}

function mouseup(event) {
  event.currentTarget.removeEventListener("mousemove", mousemove);
}
