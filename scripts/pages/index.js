async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  // const photographers = [
  //   {
  //     name: "Ma data test",
  //     id: 1,
  //     city: "Paris",
  //     country: "France",
  //     tagline: "Ceci est ma data test",
  //     price: 400,
  //     portrait: "account.png",
  //   },
  //   {
  //     name: "Autre data test",
  //     id: 2,
  //     city: "Londres",
  //     country: "UK",
  //     tagline: "Ceci est ma data test 2",
  //     price: 500,
  //     portrait: "account.png",
  //   },
  // ];
  // et bien retourner le tableau photographers seulement une fois

  // function dbPromise(query) {
  //   return new Promise((resolve, reject) => {
  //     db.all(query, [], (err, result) => {
  //       if (err) return reject(new Error(err.message));
  //       resolve(result);
  //     });
  //   });
  // }

  // fetch("../data/photographers.json")
  //   .then((response) => response.json())
  //   // .then((data) => console.log(data.photographers));
  //   .then(function dbPromise(data) {
  //     return { result: [data.photographers] };
  //   });

  const data = await fetch("../data/photographers.json");
  const photos = await data.json();
  const photographers = await photos.photographers;
  console.log(photographers);

  return photographers;

  // const result = await fecth(data);

  // console.log(result);
  // console.log(`Test de promise`);

  // .then((data) => data.photographers);

  //   return {
  //     photographers,
  //   };
  // return {
  //   photographers: [...photographers, ...photographers, ...photographers],
  // };
}
let photos = getPhotographers();
console.log("---------------------");
console.log(photos);

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  console.log("54545454");
  console.log(photographers);
  displayData(photographers);
}

init();
