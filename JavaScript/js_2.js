const content = document.getElementById("content");
const word_1_li = ["傘", "剣", "指", "針"];

const getIP = new Promise((resolve) => {
  const param = new URLSearchParams(document.location.search);
  let ip = param.get("emu");
  if ( ip==null || !(/(\d{1,3}\.){3}\d{1,3}/.test(ip))) {
    fetch("https://ipinfo.io?callback")
      .then((res) => res.json())
      .then((json) => {resolve(json["ip"])})
  } else {
    resolve(ip);
  }
})

getIP
  .then((ip) => {
    makePage(ip);
    setLink(ip);  })

function makePage(ip) {
  const ip_num = ip.split('.');
  const word_1 = word_1_li[Math.floor(ip_num[0]/64)];

  addLine(`空に${word_1}を差した｡`);
}

function addLine(textContent) {
  const newParadigm = document.createElement("p");
  const newContent = document.createTextNode(textContent);
  newParadigm.appendChild(newContent);
  content.insertAdjacentElement("BeforeEnd", newParadigm);
}

function setLink(ip) {
  const ip_num = ip.split('.');
  const ip_1 = document.getElementById("IP_1");
  const ip_2 = document.getElementById("IP_2");
  const ip_3 = document.getElementById("IP_3");
  const ip_4 = document.getElementById("IP_4");
  ip_1.value=ip_num[0];
  ip_2.value=ip_num[1];
  ip_3.value=ip_num[2];
  ip_4.value=ip_num[3];
}

function go() {
  const ip_1 = document.getElementById("IP_1");
  const ip_2 = document.getElementById("IP_2");
  const ip_3 = document.getElementById("IP_3");
  const ip_4 = document.getElementById("IP_4");

  location.href = `js_2.html?emu=${ip_1.value}.${ip_2.value}.${ip_3.value}.${ip_4.value}`;
}
