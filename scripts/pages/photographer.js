const urlLocation = window.location.search;
const params = new URLSearchParams(urlLocation);

async function getPhotographer() {
  const data = await fetch("../data/photographers.json");
  const photographersData = await data.json();
  const photographers = await photographersData.photographers;
  return photographers;
}

async function displayData(photographers) {
  const photographersHeader = document.querySelector(".photograph-header");
  const photographerId = params.get("id");

  photographers.forEach((item) => {
    if (photographerId === item.id.toString()) {
      const photographerModel = photographerFactory(item);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersHeader.appendChild(userCardDOM);
    }
  });
}

async function init() {
  const photographer = await getPhotographer();
  displayData(photographer);
}

init();
