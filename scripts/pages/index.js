async function getPhotographers() {
  const data = await fetch("../data/photographers.json");
  const photos = await data.json();
  const photographers = await photos.photographers;
  return photographers;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
  photographerPage();
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();

function photographerPage() {
  let photographers = document.querySelectorAll(".photographer");

  photographers.forEach((e) => {
    e.addEventListener("click", () => {
      let phtographerId = e.getAttribute("id");
      window.location.assign(`../photographer.html?id=${phtographerId}`);
    });
  });
}
