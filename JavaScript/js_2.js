const content = document.getElementById("content");
let now = content;

async function process() {
  const param = new URLSearchParams(document.location.search);
  const eip = param.get("emu");
  const cond = eip == null || !(/(\d{1,3}\.){3}\d{1,3}/.test(eip)); //emuがnull||正しくないIPアドレスの時
  if (cond) {
    const res = await fetch("https://ipinfo.io?callback");
    const json = await res.json();
    editpage(json.ip);
  } else {
    editpage(eip);
  }
}

const editpage = (ip) => {
  makePage(ip);
  setLink(ip);
}

const makePage = async (ip) => {
  const file = await fetch("./js_2.json");
  const json_dat = await file.json();
  const article = json_dat[choice(ip, 2)][choice(ip, 3)];
  let words_map = new Map();
  Object.keys(article.Words).forEach((key) => {
    words_map.set(key, (article.Words[key].word)[choice(ip, article.Words[key].using)]);
  })
  words_map.set("?_IP", ip);
  const words = Object.fromEntries(words_map);
  let cont = article.Content;
  Object.keys(words).forEach((key) => {
    cont.forEach((prd, idx) => {
      if (typeof(prd) == 'string') {
        cont[idx] = prd.replaceAll(key, words[key])
      }
    })
  })
  const a_cont = cont;
  addTitle(article.Title);
  a_cont.forEach((paradigm) => {
    addLine(paradigm);
  });
}

const choice = (ip, idx) => {
  const ip_num = ip.split('.')[Math.floor(idx/4)];
  return Math.floor(ip_num/Math.pow(4, 3 - idx % 4)) % 4 ;
}

const addTitle = (title) => {
  const newTitle = document.createElement("h1");
  const newContent = document.createTextNode(title);
  newTitle.appendChild(newContent);
  content.insertAdjacentElement("BeforeEnd", newTitle);
}

const addLine = (Content) => {
  if (typeof(Content) == "string") {
    const newParadigm = "<p>" + Content + "</p>";
    now.insertAdjacentHTML("BeforeEnd", newParadigm);
  } else {
    if (Content.type == "begin") {
      const newTag = document.createElement(Content.tag)
      Object.keys(Content.attribute).forEach((attr) => {
        newTag.setAttribute(attr, Content.attribute[attr])
      })
      now.insertAdjacentElement("BeforeEnd", newTag)
      now = newTag
    } else {
      now = now.parentElement
    }
  }
}

const setLink = (ip) => {
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

process();

function go() {
  const ip_1 = document.getElementById("IP_1");
  const ip_2 = document.getElementById("IP_2");
  const ip_3 = document.getElementById("IP_3");
  const ip_4 = document.getElementById("IP_4");

  location.href = `js_2.html?emu=${ip_1.value}.${ip_2.value}.${ip_3.value}.${ip_4.value}`;
}

function rand() {
  const ip_1 = Math.floor(Math.random() * 256);
  const ip_2 = Math.floor(Math.random() * 256);
  const ip_3 = Math.floor(Math.random() * 256);
  const ip_4 = Math.floor(Math.random() * 256);

  location.href = `js_2.html?emu=${ip_1      }.${ip_2      }.${ip_3      }.${ip_4      }`;
}
