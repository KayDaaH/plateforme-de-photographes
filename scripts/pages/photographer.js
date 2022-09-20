const urlLocation = window.location.search;
const params = new URLSearchParams(urlLocation);
let photographerID = 0;
let PhotographerMedias = [];

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
      console.log(photographersHeader);
      console.log(userCardDOM);
      photographerID = item.id;
    }
  });
}

async function getMedia() {
  const data = await fetch("../data/photographers.json");
  const mediaData = await data.json();
  const media = await mediaData.media;
  console.log(media);
  return media;
}

async function mediaData(media) {
  const photographerMediaHTML = document.querySelector(".photos-factory");
  const photographerId = params.get("id");

  media.forEach((item) => {
    if (photographerId === item.photographerId.toString()) {
      PhotographerMedias.push(item);

      // photographerID = item.id;
    }
  });
  const photographerMedia = mediaFactory(PhotographerMedias);
  const mediaCardDOM = photographerMedia.photosFactoryDOM();
  // photographerMediaHTML.appendChild(mediaCardDOM);
  console.log(photographerMediaHTML);
  console.log(mediaCardDOM);
}

// async function getPictures() {
//   const data = `..assets/photos/${photographerName}/${source}`;
//   console.log(data);
//   return data;
// }

// async function dataPictures() {
//   const photographersPictures = document.querySelector(".photos-factory");
// }

async function init() {
  const photographer = await getPhotographer();
  displayData(photographer);
  const media = await getMedia();
  mediaData(media);
}

init();
