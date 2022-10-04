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
      likes.innerHTML = `${like} <i class="fa-solid fa-heart like"></i>`;
      pricePerDay.textContent = `${price}€ / jour`;
      article.appendChild(contents);
      article.appendChild(h2);
      article.appendChild(likes);
      photographerMediaHTML.appendChild(article);

      return photographerMediaHTML;
    });
    diaporama();
    likes();
  }

  return { photosFactoryDOM };
}

function diaporama() {
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
  const slideContentDiapo = document.querySelector(".slide-content-diapo");
  let index = slideContentDiapo.className.slice(
    41,
    slideContentDiapo.className.length
  );
  const nextContent = contentNodelist[index];
  const previusContent = contentNodelist[index - 2];
  let format = "img";

  if (n === 1) {
    if (contentNodelist.length - 1 < Number(index) + 1) {
      if (contentNodelist[0].src.indexOf("jpg") === -1)
        format = "video controls";
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${contentNodelist[0].className}" id="${contentNodelist[0].id}"src="${contentNodelist[0].src}">`;
    } else {
      if (nextContent.src.indexOf("jpg") === -1) format = "video controls";
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${nextContent.className}" id="${nextContent.id}"src="${nextContent.src}">`;
    }
  } else {
    if (contentNodelist[0].id == slideContentDiapo.id) {
      if (contentNodelist[contentNodelist.length - 2].src.indexOf("jpg") === -1)
        format = "video controls";
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${
        contentNodelist[contentNodelist.length - 2].className
      }" id="${contentNodelist[contentNodelist.length - 2].id}"src="${
        contentNodelist[contentNodelist.length - 2].src
      }">`;
    } else {
      if (previusContent.src.indexOf("jpg") === -1) format = "video controls";
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${previusContent.className}" id="${previusContent.id}"src="${previusContent.src}">`;
    }
  }
}

function likes() {
  const hearts = document.querySelectorAll(".like");

  hearts.forEach((e) => {
    e.addEventListener("click", () => {
      const likesHTML = e.parentNode;
      let likesNumber = Number(likesHTML.innerHTML.substring(0, 2));
      likesHTML.innerHTML = `${(likesNumber += 1)} <i class="fa-solid fa-heart like"></i>`;
    });
  });
}
