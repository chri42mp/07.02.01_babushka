let menu;
let filter = "alle";

const filterBtn = document.querySelectorAll("nav button");
filterBtn.forEach((button) => button.addEventListener("click", filterMenu));

function filterMenu() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  vis();
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
  vis();
}

function vis() {
  console.log(menu);
  const holder = document.querySelector("#holder");
  const template = document.querySelector("template").content;
  holder.textContent = "";
  menu.forEach((course) => {
    if (filter === course.kategori || filter === "alle") {
      const clone = template.cloneNode(true);
      clone.querySelector("img").src =
        "pictures/" + course.billednavn + "-md.jpg";
      clone.querySelector(".short-description").textContent =
        course.kortbeskrivelse;
      clone.querySelector(".name").textContent = course.billednavn;
      clone.querySelector(".price").textContent = course.pris;
      holder.appendChild(clone);
    }
  });
}
getData();
