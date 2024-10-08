const StrMetr = (str) => {
  const cnv = document.getElementById('cnv');
  if (cnv.getContext) {
    const ctx = cnv.getContext('2d');
    const seg = str.split("<br>");
    const metr = seg.map((t) => ctx.measureText(t));
    const swid = metr.map((M) => M.width)
    const height = metr.reduce((n, M) => n + Math.max(M.actualBoundingBoxAscent + M.actualBoundingBoxDescent, 6.5), 0);
    return {"width": Math.max(...swid), "height": height};
  }
  return -1;
}

const Resize = () => {
  cont.style.setProperty("--font-size", 
    (Math.min(innerWidth * 0.9 * 10 / SMet.width, innerHeight * 0.7 * 9 / SMet.height)) + "px");
}

const cont = document.getElementById('cont');
const param = new URLSearchParams(document.location.search);
const input = param.get("input") || "あ"
const SMet = StrMetr(input)
const duration = param.get("duration") || 3

document.title = input.replaceAll("<br>", " ")
cont.innerHTML = input
cont.style.setProperty("--duration", duration + "s")

Resize();
window.addEventListener("resize", Resize);

const submit = () => {
  const input1 = document.getElementById("duration")
  const duration = input1.value
  const input2 = document.getElementById("newtext")
  const newtext = input2.value.replaceAll("\n", "<br>")
  location.href = `css_1.html?duration=${duration}&input=${newtext}`
}
