const toggle = document.querySelector(".lang-toggle");

function setLang(lang) {
  document.body.dataset.lang = lang;
  toggle.dataset.lang = lang;
}

toggle?.addEventListener("click", () => {
  const current = toggle.dataset.lang === "en" ? "en" : "zh";
  const next = current === "zh" ? "en" : "zh";
  setLang(next);
});

setLang("en");
