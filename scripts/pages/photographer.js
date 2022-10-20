const urlLocation = window.location.search;
const params = new URLSearchParams(urlLocation);
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
    }
  });
}

async function getMedia() {
  const data = await fetch("../data/photographers.json");
  const mediaData = await data.json();
  const media = await mediaData.media;
  return media;
}

async function mediaData(media) {
  const photographerId = params.get("id");

  media.forEach((item) => {
    if (photographerId === item.photographerId.toString()) {
      PhotographerMedias.push(item);
    }
  });
  PhotographerMedias.sort((a, b) => {
    let aLikes = a.likes;
    let bLikes = b.likes;
    return bLikes - aLikes;
  });

  const photographerMediaOk = mediaFactory(PhotographerMedias);
  const mediaCardDOM = photographerMediaOk.photosFactoryDOM();
  // sort(PhotographerMedias);
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
