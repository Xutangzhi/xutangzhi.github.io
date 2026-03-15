const langButton = document.querySelector('[data-action="lang"]');
const themeButton = document.querySelector('[data-action="theme"]');
const rotatingText = document.querySelector(".rotating-text");
const navLinks = [...document.querySelectorAll(".nav a")];
const zhNodes = [...document.querySelectorAll(".lang-zh")];
const enNodes = [...document.querySelectorAll(".lang-en")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const phrases = {
  zh: [
    "测试套件演化",
    "程序修复",
    "测试生成",
    "软件质量保障"
  ],
  en: [
    "test suite evolution",
    "program repair",
    "test generation",
    "software quality assurance"
  ]
};

let phraseIndex = 0;

function setLang(lang) {
  document.body.dataset.lang = lang;
  langButton.textContent = lang === "zh" ? "中文 / EN" : "EN / 中文";
  zhNodes.forEach((node) => {
    node.hidden = lang !== "zh";
  });
  enNodes.forEach((node) => {
    node.hidden = lang !== "en";
  });
  updateRotatingText(true);
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  themeButton.textContent = theme === "dark" ? "Light" : "Dark";
}

function updateRotatingText(reset = false) {
  const lang = document.body.dataset.lang === "zh" ? "zh" : "en";
  const items = phrases[lang];

  if (reset) {
    phraseIndex = 0;
  }

  if (rotatingText) {
    rotatingText.textContent = items[phraseIndex % items.length];
  }
}

function activateCurrentSection() {
  const offset = window.scrollY + 120;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (section.offsetTop <= offset) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const target = link.getAttribute("href")?.slice(1);
    link.classList.toggle("is-active", target === currentId);
  });
}

langButton?.addEventListener("click", () => {
  const current = document.body.dataset.lang === "zh" ? "zh" : "en";
  setLang(current === "zh" ? "en" : "zh");
});

themeButton?.addEventListener("click", () => {
  const current = document.body.dataset.theme === "light" ? "light" : "dark";
  setTheme(current === "dark" ? "light" : "dark");
});

window.addEventListener("scroll", activateCurrentSection, { passive: true });

setLang("en");
setTheme("dark");
activateCurrentSection();
updateRotatingText();

window.setInterval(() => {
  phraseIndex += 1;
  updateRotatingText();
}, 2400);
