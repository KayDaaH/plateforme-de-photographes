function mediaFactory(data) {
  const photographerMedias = data;
  console.log(photographerMedias);

  function photosFactoryDOM() {
    let index = 0;
    photographerMedias.forEach((item) => {
      const photographerMediaHTML = document.querySelector(".photos-factory");
      const title = item.title;
      const price = item.price;
      const id = item.photographerId;
      const contentId = item.id;
      const like = item.likes;
      const article = document.createElement("article");
      let contents;
      let media;
      if (item.image) {
        contents = document.createElement("img");
        media = item.image;
      } else {
        contents = document.createElement("video");
        media = item.video;
      }
      // console.log(contentId.toString().length);
      contents.setAttribute("src", `../assets/photos/${id}/${media}`);
      contents.setAttribute("id", `${contentId}`);
      contents.setAttribute("class", `photographer-content ${(index += 1)}`);
      // contents.setAttribute("index", `${(index += 1)}`);
      const h2 = document.createElement("h2");
      const likes = document.createElement("likes");
      const pricePerDay = document.getElementById("pricePerDay");
      h2.textContent = `${title}`;
      likes.innerHTML = `${like} <i class="fa-solid fa-heart"></i>`;
      pricePerDay.textContent = `${price}€ / jour`;
      article.appendChild(contents);
      article.appendChild(h2);
      article.appendChild(likes);
      photographerMediaHTML.appendChild(article);

      return photographerMediaHTML;
    });
    panorama();
  }

  return { photosFactoryDOM };
}

function panorama() {
  const contentNodelist = document.querySelectorAll(".photographer-content");

  contentNodelist.forEach((e) => {
    e.addEventListener("click", () => {
      const link = e.src;
      console.log(e.className);

      const diaporamaContainer = document.querySelector(".diaporama-container");
      const slideContent = document.querySelector(".slide-content");
      if (link.indexOf("jpg") !== -1) {
        slideContent.innerHTML = `<img class="slide-content-diapo ${e.className}" id="${e.id}"src="${e.src}">`;
        diaporamaContainer.style.display = "block";
      } else {
        slideContent.innerHTML = `<video class="slide-content-diapo ${e.className}" id="${e.id}"controls src="${e.src}"></video>`;
        diaporamaContainer.style.display = "block";
      }
    });
  });
}

// let slideIndex = 1;
// showSlides(slideIndex);

function plusSlides(n) {
  const contentNodelist = document.querySelectorAll(".photographer-content");
  const slideContent = document.querySelector(".slide-content");
  const previousContent = document.getElementById("prev-less");
  const nextContent = document.getElementById("prev-plus");
  const slideContentDiapo = document.querySelector(".slide-content-diapo");
  const array = [...contentNodelist];
  let indexContent = array.indexOf(slideContentDiapo.id);
  const index = slideContentDiapo.className.slice(
    41,
    slideContentDiapo.className.length
  );

  if (n === 1) {
    // console.log(nextContent);
    console.log("--------------");
    contentNodelist.forEach((e) => {
      if (e.className.indexOf(index) !== -1) {
        console.log(index);
        console.log(e.className);
      }
    });

    // console.log(
    //   slideContentDiapo.className.slice(20, slideContentDiapo.className.length)
    // );
    // console.log(indexContent);
    // console.log("--------------");
    // console.log(indexContent);
    // slideContent.innerHTML = `<img class="slide-content-panorama" id="${e.id}"src="${e.src}">`;
  } else {
    console.log(previousContent);
  }
}

// function showSlides(n) {
//   const diaporamaContainer = document.querySelector(".diaporama-container");
//   const slideContent = document.querySelector(".slide-content");

//   if (n > diaporamaContainer.length) {
//     slideIndex = 1;
//   }
//   if (n < 1) {
//     slideIndex = diaporamaContainer.length;
//   }

//   for (let i = 0; i < diaporamaContainer.length; i++) {
//     slides[i];
//   }

//   console.log(diaporamaContainer.length);
// }
