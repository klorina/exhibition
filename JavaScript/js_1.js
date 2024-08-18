const stylesheet = document.styleSheets[0];
var x;

setInterval(move, 16)

function move() {
  x = circle.style.left;
  x = Number(x.slice(0, -2))
  x = (x + 5);
  if (window.innerWidth <= (x + 80 * 2)) {
    x = 0;
  }
  circle.style.left = String(x) + "px"
}
