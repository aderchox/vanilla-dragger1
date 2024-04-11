const container = document.querySelector(".container");
let startX, startY, isDragging;

container.addEventListener("mousedown", mousedown);

function mousedown(event) {
  const isChild = event.target.matches("[data-dragger]");
  // console.log("mousedown", { eventTarget: event.target, isChild: isChild });
  if (!isChild) {
    return;
  }
  const child = event.target;
  isDragging = true;
  startX = event.x;
  startY = event.y;
  // console.log({ item: child });
  let boundMousemove = mousemove.bind(null, child);
  // Because mousemove's handler is removed in mouseup, and so must be re-installed here inside mousedown, each time.
  window.addEventListener("mousemove", boundMousemove);
  window.addEventListener("mouseup", () => (isDragging = false));
}

function mousemove(item, event) {
  console.log({ item });
  if (!isDragging) {
    return;
  }
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
