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
    // const lienUrl = document.querySelector(".url");
    // lienUrl.addEventListener("click", (bubulle) => {
    //   bubulle.preventDefault();
    //   console.log("log addeventlistner");
    //   console.log(lienUrl);
    // });
  });
  // console.log("Log dans la fonction data()");
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
