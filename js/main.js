const getCurrentLang = () => {
  let search = window.location.search.substring(1);
  let currentLang = "";
  if (search) {
    let sArr = search.split("&");
    for (let param of sArr) {
      let pArr = param.split("=");
      if (pArr.length != 2) {
        continue;
      }
      let pKey = pArr[0];
      if (pKey == "lang") {
        currentLang = pArr[1];
        break;
      }
    }
  }
  return currentLang ? currentLang : "kz";
};

const replaceSearch = (pK, pV) => {
  let search = window.location.search.substring(1);
  if (!search) {
    return "?" + pK + "=" + pV;
  }
  let sArr = search.split("&");
  let newSearch = "";
  let hasKey = false;

  for (let param of sArr) {
    let pArr = param.split("=");
    if (pArr.length != 2) {
      continue;
    }
    if (pArr[0].toLowerCase() == pK.toLowerCase()) {
      newSearch += (newSearch ? "&" : "") + pK + "=" + pV;
      hasKey = true;
    } else {
      newSearch += (newSearch ? "&" : "") + pArr[0] + "=" + pArr[1];
    }
  }
  if (!hasKey) {
    newSearch += (newSearch ? "&" : "") + pK + "=" + pV;
  }
  return "?" + newSearch;
};

const chageLanguageValue = () => {
  let localArr = document.querySelectorAll("[data-localkey]");
  localArr.forEach((el) => {
    let localKey = el.getAttribute("data-localkey");
    let wordArr = window.words[localKey];
    el.innerText = wordArr[getCurrentLang()];
  });
};

const getWords = async () => {
  let response = await fetch("https://www.sozdikqor.org/api/query/all", {
    method: "POST",
  });
  window.words = await response.json();
  // console.log(window.words);
  chageLanguageValue();
};

document.addEventListener("DOMContentLoaded", function () {
  const lang = document.querySelector("#languages");
  let currentLang = getCurrentLang();
  lang.value = currentLang;

  const btnBar = document.querySelector(".btnBar");
  btnBar.addEventListener("click", () => {
    const slidedownDiv = document.querySelector(".slidedownDiv");
    if (!slidedownDiv.querySelector("ul")) {
      const slidedown = document.querySelector("#slidedown");
      let cloned = slidedown.cloneNode(true);
      cloned.className = "removeKey";
      cloned.id = "";
      slidedownDiv.appendChild(cloned);
      slidedownDiv.style.height = "150px";
      btnBar.className = 'fa-solid fa-xmark pc-hidden btnBar';
    } else {
      slidedownDiv.style.height = "0";
      btnBar.className = 'fa-solid fa-bars pc-hidden btnBar';
      setTimeout(() => {
        const removeChild = slidedownDiv.querySelector(".removeKey");
        slidedownDiv.removeChild(removeChild);
      }, 200);
    }
  });

  lang.addEventListener("change", function () {
    let selectedValue = this.value;
    let url = window.location.protocol + "//" + window.location.host;
    let pathname = window.location.pathname;
    window.location.href =
      url + pathname + replaceSearch("lang", selectedValue);
  });

  // const loading = document.querySelector(".pageLoading");
  // loading.style = "display :none";
  getWords();
});


