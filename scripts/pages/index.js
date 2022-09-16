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
}

let test = 0;
async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
  test = 1;
}

init();

function test2() {
  setTimeout(() => {
    const url = document.getElementById("url");
    url.addEventListener(
      "click",
      () => {
        alert("Hello");
      },
      5000
    );
  });
}
test2();
