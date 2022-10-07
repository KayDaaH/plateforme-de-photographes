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
      likes.classList.add("likes-container");
      const pricePerDay = document.getElementById("pricePerDay");
      h2.textContent = `${title}`;
      // likes.innerHTML = `${like} <i class="fa-solid fa-heart like"></i>`;

      likes.innerHTML = `<input type="number" class="input-like" value="${like}" name=""> <i class="fa-solid fa-heart like"></i>`;

      pricePerDay.textContent = `${price}€ / jour`;
      article.appendChild(contents);
      article.appendChild(h2);
      article.appendChild(likes);
      photographerMediaHTML.appendChild(article);

      return photographerMediaHTML;
    });
    diaporama();
    likes();
    sort();
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

// function likes() {
//   const hearts = document.querySelectorAll(".like");
//   const nombreLikes = document.querySelector(".input-like");
//   let totalLikes = 0;
//   let newLikesNumber = 0;
//   const likesContainer = document.getElementById("total-likes");

//   hearts.forEach((e) => {
//     // ------------------Je récupère le nombre de likes
//     const likesHTML = e.parentNode;
//     // let likesNumber = Number(likesHTML.innerHTML.substring(0, 3));
//     let likesNumber = Number(likesHTML.innerHTML.substring(0, 3));
//     console.log(likesNumber);
//     console.log(nombreLikes.value);
//     if (Number.isInteger(likesNumber)) {
//     } else {
//       likesNumber = Number(likesHTML.innerHTML.substring(0, 2));
//     }
//     // ------------------------

//     // ------------------J'ajoute un like au clic'

//     e.addEventListener("click", () => {
//       newLikesNumber = likesNumber += 1;
//       likesHTML.innerHTML = `${newLikesNumber} <i class="fa-solid fa-heart like"></i>`;
//       totalLikes += 1;

//       likesContainer.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i></div>`;
//     });
//     totalLikes += likesNumber;
//   });

//   likesContainer.innerHTML = `${totalLikes} <i class="fa-solid fa-heart"></i></div>`;
// }

function likes() {
  const likeContainer = document.querySelectorAll(".likes-container");
  const likesContainer = document.getElementById("total-likes");

  let totalLikes = 0;
  Array.from(likeContainer).forEach((e) => {
    const btnLike = e.children[1];
    totalLikes += parseInt(e.children[0].value);
    likesContainer.innerHTML = `<input type="number" id="total-like" value="${totalLikes}" name=""> <i class="fa-solid fa-heart big-heart"></i>`;

    btnLike.addEventListener("click", () => {
      if (btnLike.classList.contains("like-active") != true) {
        e.children[0].value = parseInt(e.children[0].value) + 1;
        btnLike.classList.add("like-active");
        totalLikes += 1;
        // likesContainer.innerHTML = `<input type="number" id="total-like" value="${totalLikes}" name=""> <i class="fa-solid fa-heart"></i>`;
        console.log(parseInt(likesContainer.children[0].value));
        likesContainer.children[0].value =
          parseInt(likesContainer.children[0].value) + 1;
      } else {
        e.children[0].value = parseInt(e.children[0].value) - 1;
        btnLike.classList.remove("like-active");
        totalLikes -= 1;
        likesContainer.children[0].value =
          parseInt(likesContainer.children[0].value) - 1;
      }
    });
  });
}

function sort() {
  const arrow = document.getElementById("arrow");
  const date = document.querySelector(".sort-date");
  const titre = document.querySelector(".sort-titre");
  arrow.addEventListener("click", () => {
    console.log("ok");
    date.classList.toggle("is-visible");
    titre.classList.toggle("is-visible");
    arrow.classList.toggle("active");
  });
}
