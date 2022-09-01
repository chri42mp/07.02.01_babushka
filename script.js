let menu;
let filter = "alle";

const filterBtn = document.querySelectorAll("nav button");
filterBtn.forEach((button) => button.addEventListener("click", filterMenu));

function filterMenu() {
  filter = this.dataset.kategori;
  document.querySelector(".chosen").classList.remove("chosen");
  this.classList.add("chosen");
  show();
}

const endpoint = "https://babushka-dd8a.restdb.io/rest/menu";
const moreinfo = {
  headers: {
    "x-apikey": "600ec2fb1346a1524ff12de4",
  },
};

async function getData() {
  const response = await fetch(endpoint, moreinfo);
  menu = await response.json();
  console.log(menu);
  show();
}

function show() {
  console.log(menu);
  const holder = document.querySelector("#holder");
  const template = document.querySelector("template").content;
  holder.textContent = "";
  menu.forEach((course) => {
    if (filter === course.kategori || filter === "alle") {
      const clone = template.cloneNode(true);
      clone
        .querySelector("article")
        .addEventListener("click", () => showCourse(course));
      clone.querySelector("img").src =
        "pictures/" + course.billednavn + "-md.jpg";
      clone.querySelector(".short-description").textContent =
        course.kortbeskrivelse;
      clone.querySelector(".name").textContent = course.navn;
      clone.querySelector(".price").textContent = course.pris + ".-";
      holder.appendChild(clone);
    }
  });
}

function showCourse(courseData) {
  console.log("courseData");
  const popup = document.querySelector("#popup");
  popup.style.display = "flex";
  popup.querySelector("h2").textContent = courseData.navn;
  popup.querySelector("img").src =
    "pictures/" + courseData.billednavn + "-md.jpg";
  popup.querySelector(".long-description").textContent =
    courseData.langbeskrivelse;
  popup.querySelector(".from").textContent = courseData.oprindelsesregion;
  popup.querySelector(".price").textContent = courseData.pris + ".-";
  popup.addEventListener("click", () => (popup.style.display = "none"));
}

getData();
