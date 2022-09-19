async function getPhotographers() {
  const data = await fetch("../data/photographers.json");
  const photos = await data.json();
  const photographers = await photos.photographers;

  // setTimeout(() => {
  //   console.log("Log dans hgetPhotographers() avec un delai de 3 secondes ");
  // }, 3000);

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
  console.log(photographers);
  console.log("Log dans la fonction init()");
  document.querySelectorAll(".url").forEach((item) => {
    item.addEventListener("click", (event) => {
      console.log("log addeventlistner");
      console.log(item.href);
      //handle click
    });
  });
  // const lienUrl = document.querySelector(".url");
  // console.log(typeof lienUrl);
  // console.log(lienUrl);
  // lienUrl.addEventListener("click", (bubulle) => {
  //   bubulle.preventDefault();
  //   console.log("log addeventlistner");
  //   console.log(lienUrl);
  // });
}

init();

// function resolveAfter2Seconds(x) {
//   console.log("log dans nouvelle promise");
//   return new Promise(() => {
//     setTimeout(() => {
//       console.log("log dans la promise");
//     }, 2000);
//   });
// }

// async function f1() {
//   const x = await resolveAfter2Seconds(10);
//   console.log(x); // 10
// }

// f1();

// function test2() {
//   setTimeout(() => {
//     const url = document.getElementById("url");
//     url.addEventListener(
//       "click",
//       () => {
//         alert("Hello");
//       },
//       5000
//     );
//   });
// }
// test2();
