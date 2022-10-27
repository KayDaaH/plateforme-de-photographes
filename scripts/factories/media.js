const photosFactory = document.querySelector(".photos-factory");
const arrow1 = document.getElementById("arrow1");
const arrow2 = document.getElementById("arrow2");
const arrow3 = document.getElementById("arrow3");
const ligne2 = document.getElementById("sort-ligne2");
const ligne3 = document.getElementById("sort-ligne3");
const popularite = document.querySelector(".sort-populaire");
const date = document.querySelector(".sort-date");
const titre = document.querySelector(".sort-titre");
const prevLess = document.getElementById("prev-less");
const prevPlus = document.getElementById("prev-plus");
const cross = document.querySelector(".close-slide");

function mediaFactory(data) {
  const photographerMedias = data;

  function photosFactoryDOM() {
    let index = 0;
    photographerMedias.forEach((item) => {
      const photosFactory = document.querySelector(".photos-factory");
      const id = item.id;
      const photographerId = item.photographerId;
      const title = item.title;
      const likes = item.likes;
      const price = item.price;
      const article = document.createElement("article");
      photosFactory.appendChild(article);
      let type;
      let media;
      if (item.image) {
        type = "img";
        media = item.image;
      } else {
        media = item.video;
        type = "video";
      }
      article.innerHTML = `
      <article content-id = "${id}" photographer-id = "${photographerId}" title = "${title}" likes = "${likes}" price = "${price}" type = "${type}">;
          <${type} src="../assets/photos/${photographerId}/${media}" id = "${id}" class="photographer-content ${(index += 1)}" alt = "${title}" tabindex="0"></${type}>
          <h2>${title}</h2>
          <likes class="likes-container">
              <input type="number" class="input-like" value="${likes}" name="" readonly>
              <i class="fa-solid fa-heart like"></i>
          </likes>
      </article>`;

      const pricePerDay = document.getElementById("pricePerDay");
      pricePerDay.textContent = `${price}€ / jour`;

      return photosFactory;
    });
    diaporama(photographerMedias);
    likes();
    sortContent(photographerMedias);
  }
  return { photosFactoryDOM };
}

// Affichage du diaporama à l'aide du clavier
function diaporamaKeyListener(data) {
  const contentNodelist = document.querySelectorAll(".photographer-content");
  const slidesDiaporama = document.querySelector(".slides");
  let contentTitle;

  let title;
  contentNodelist.forEach((e) => {
    e.addEventListener("keydown", (keyType) => {
      if (
        keyType.key === "Enter" &&
        document.activeElement.className.includes("photographer-content") ===
          true
      ) {
        const link = e.src;
        const id = e.id;
        data.forEach((e) => {
          if (id == e.id) {
            title = e.title;
          }
        });
        const diaporamaContainer = document.querySelector(
          ".diaporama-container"
        );
        const slideContent = document.querySelector(".slide-content");
        const titleContent = title;
        if (link.indexOf("jpg") !== -1) {
          slideContent.innerHTML = `
          <div class="slide-content-container">
              <img class="slide-content-diapo ${e.className}" id="${e.id}"src="${e.src}" alt = "${titleContent}" tabindex="2"> 
              <p class="slide-content-title" id="title-content-id" tabindex="3">${titleContent}</p>
          </div>`;
          diaporamaContainer.style.display = "block";
          contentTitle = document.getElementById("title-content-id");
          contentTitle.focus();
        } else {
          slideContent.innerHTML = `
          <div class="slide-content-container">
              <video class="slide-content-diapo ${e.className}" id="${e.id}"controls src="${e.src}" alt = "${titleContent}" tabindex="2"></video> 
              <p class="slide-content-title-video" id="title-content-id" tabindex="3">${titleContent}</p>;
          </div>`;
          diaporamaContainer.style.display = "block";
          contentTitle = document.getElementById("title-content-id");
          contentTitle.focus();
        }
        main.setAttribute("aria-hidden", "true");
        slidesDiaporama.setAttribute("aria-hidden", "false");
      }
    });
  });
}

const diaporamaFocusable = document.querySelectorAll(".diaporama-focusable");
const diaporamaFocusableArray = [...diaporamaFocusable];

// boucle d'élement selectionnables avec tab pour l'accessibilité
document.addEventListener("keydown", (keyType) => {
  if (
    keyType.key == "Tab" &&
    keyType.shiftKey === false &&
    document.activeElement ==
      diaporamaFocusableArray[diaporamaFocusableArray.length - 1]
  ) {
    diaporamaFocusableArray[0].focus();
    keyType.preventDefault();
  }
});
document.addEventListener("keydown", (keyType) => {
  if (
    keyType.key == "Tab" &&
    keyType.shiftKey === true &&
    document.activeElement == diaporamaFocusableArray[0]
  ) {
    diaporamaFocusableArray[diaporamaFocusableArray.length - 1].focus();
    keyType.preventDefault();
  }
});
document.addEventListener("keydown", (keyType) => {
  if (keyType.key === "Enter" && document.activeElement == cross) {
    closeDiaporama();
  }
});

// Afficher le diaporama
function diaporama(data) {
  const contentNodelist = document.querySelectorAll(".photographer-content");
  const slidesDiaporama = document.querySelector(".slides");

  let title;
  diaporamaKeyListener(data);
  contentNodelist.forEach((e) => {
    e.addEventListener("click", () => {
      const link = e.src;
      const id = e.id;
      data.forEach((e) => {
        if (id == e.id) {
          title = e.title;
        }
      });
      const slideContent = document.querySelector(".slide-content");
      const titleContent = title;
      if (link.indexOf("jpg") !== -1) {
        slideContent.innerHTML = `
          <div class="slide-content-container">
              <img class="slide-content-diapo ${e.className}" id="${e.id}"src="${e.src}" alt = "${titleContent}" tabindex="2"> 
              <p class="slide-content-title" tabindex="3">${titleContent}</p>
          </div>`;
        diaporamaContainer.style.display = "block";
      } else {
        slideContent.innerHTML = `
          <div class="slide-content-container">
              <video class="slide-content-diapo ${e.className}" id="${e.id}"controls src="${e.src}" alt = "${titleContent}" tabindex="2"></video> 
              <p class="slide-content-title-video" tabindex="3">${titleContent}</p>;
          </div>`;
        diaporamaContainer.style.display = "block";
      }
      main.setAttribute("aria-hidden", "true");
      slidesDiaporama.setAttribute("aria-hidden", "false");
      prevLess.focus();
    });
  });
  plusSlides(data);
  lessSlides(data);
}

// Passer au diaporama suivant
function plusSlides(n) {
  let net = n;
  const icon = document.getElementById("prev-plus");

  icon.addEventListener("click", () => {
    const /* A NodeList of all the elements with the class `photographer-content`. */
      contentNodelist = document.querySelectorAll(".photographer-content");
    const slideContent = document.querySelector(".slide-content");
    const slideContentDiapo = document.querySelector(".slide-content-diapo");
    let index = slideContentDiapo.className.slice(
      41,
      slideContentDiapo.className.length
    );
    let titleContent;

    const nextContent = contentNodelist[index];
    let format = "img";
    let formatEnd = "img";
    let classContent = "slide-content-title";

    if (contentNodelist.length - 1 < Number(index) + 1) {
      if (contentNodelist[0].src.indexOf("jpg") === -1) {
        format = "video controls";
        formatEnd = "video";
        classContent = "slide-content-title-video";
      }
      titleContent = n[0].title;
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${
        contentNodelist[0].className
      }" id="${contentNodelist[0].id}"src="${
        contentNodelist[0].src
      }" alt = "${contentNodelist[0].getAttribute(
        "alt"
      )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;

      // title();
    } else {
      if (nextContent.src.indexOf("jpg") === -1) {
        format = "video controls";
        formatEnd = "video";
        classContent = "slide-content-title-video";
      }

      titleContent = n[index].title;
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${
        nextContent.className
      }" id="${nextContent.id}"src="${
        nextContent.src
      }" alt = "${nextContent.getAttribute(
        "alt"
      )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;
      // title();
    }
  });
  document.addEventListener("keydown", (keyType) => {
    if (keyType.key === "Enter" && document.activeElement == prevPlus) {
      const /* A NodeList of all the elements with the class `photographer-content`. */
        contentNodelist = document.querySelectorAll(".photographer-content");
      const slideContent = document.querySelector(".slide-content");
      const slideContentDiapo = document.querySelector(".slide-content-diapo");
      let index = slideContentDiapo.className.slice(
        41,
        slideContentDiapo.className.length
      );
      let titleContent;

      const nextContent = contentNodelist[index];
      let format = "img";
      let formatEnd = "img";
      let classContent = "slide-content-title";

      if (contentNodelist.length - 1 < Number(index) + 1) {
        if (contentNodelist[0].src.indexOf("jpg") === -1) {
          format = "video controls";
          formatEnd = "video";
          classContent = "slide-content-title-video";
        }
        titleContent = net[0].title;
        slideContent.innerHTML = `<${format} class="slide-content-diapo ${
          contentNodelist[0].className
        }" id="${contentNodelist[0].id}"src="${
          contentNodelist[0].src
        }" alt = "${contentNodelist[0].getAttribute(
          "alt"
        )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;

        // title();
      } else {
        if (nextContent.src.indexOf("jpg") === -1) {
          format = "video controls";
          formatEnd = "video";
          classContent = "slide-content-title-video";
        }

        titleContent = n[index].title;
        slideContent.innerHTML = `<${format} class="slide-content-diapo ${
          nextContent.className
        }" id="${nextContent.id}"src="${
          nextContent.src
        }" alt = "${nextContent.getAttribute(
          "alt"
        )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;
        // title();
      }
    }
  });
  document.addEventListener("keydown", (keyType) => {
    if (keyType.key === "ArrowRight") {
      const /* A NodeList of all the elements with the class `photographer-content`. */
        contentNodelist = document.querySelectorAll(".photographer-content");
      const slideContent = document.querySelector(".slide-content");
      const slideContentDiapo = document.querySelector(".slide-content-diapo");
      let index = slideContentDiapo.className.slice(
        41,
        slideContentDiapo.className.length
      );
      let titleContent;

      const nextContent = contentNodelist[index];
      let format = "img";
      let formatEnd = "img";
      let classContent = "slide-content-title";

      if (contentNodelist.length - 1 < Number(index) + 1) {
        if (contentNodelist[0].src.indexOf("jpg") === -1) {
          format = "video controls";
          formatEnd = "video";
          classContent = "slide-content-title-video";
        }
        titleContent = net[0].title;
        slideContent.innerHTML = `<${format} class="slide-content-diapo ${
          contentNodelist[0].className
        }" id="${contentNodelist[0].id}"src="${
          contentNodelist[0].src
        }" alt = "${contentNodelist[0].getAttribute(
          "alt"
        )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;

        // title();
      } else {
        if (nextContent.src.indexOf("jpg") === -1) {
          format = "video controls";
          formatEnd = "video";
          classContent = "slide-content-title-video";
        }

        titleContent = n[index].title;
        slideContent.innerHTML = `<${format} class="slide-content-diapo ${
          nextContent.className
        }" id="${nextContent.id}"src="${
          nextContent.src
        }" alt = "${nextContent.getAttribute(
          "alt"
        )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;
        // title();
      }
    }
  });
}

// Passer au diaporama précédent
function lessSlides(n) {
  let net = n;
  const icon = document.getElementById("prev-less");
  icon.addEventListener("click", () => {
    const /* A NodeList of all the elements with the class `photographer-content`. */
      contentNodelist = document.querySelectorAll(".photographer-content");
    const slideContent = document.querySelector(".slide-content");
    const slideContentDiapo = document.querySelector(".slide-content-diapo");
    let index = slideContentDiapo.className.slice(
      41,
      slideContentDiapo.className.length
    );
    let titleContent;

    const previusContent = contentNodelist[index - 2];
    let format = "img";
    let formatEnd = "img";
    let classContent = "slide-content-title";

    if (contentNodelist[0].id == slideContentDiapo.id) {
      if (
        contentNodelist[contentNodelist.length - 2].src.indexOf("jpg") === -1
      ) {
        format = "video controls";
        formatEnd = "video";
        classContent = "slide-content-title-video";
      }
      titleContent = n[n.length - 1].title;
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${
        contentNodelist[contentNodelist.length - 2].className
      }" id="${contentNodelist[contentNodelist.length - 2].id}"src="${
        contentNodelist[contentNodelist.length - 2].src
      }" alt = "${contentNodelist[contentNodelist.length - 2].getAttribute(
        "alt"
      )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;

      // title();
    } else {
      if (previusContent.src.indexOf("jpg") === -1) {
        format = "video controls";
        formatEnd = "video";
        classContent = "slide-content-title-video";
      }
      titleContent = n[index - 2].title;
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${
        previusContent.className
      }" id="${previusContent.id}"src="${
        previusContent.src
      }" alt = "${previusContent.getAttribute(
        "alt"
      )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;
      // title();
    }
  });
  document.addEventListener("keydown", (keyType) => {
    if (keyType.key === "Enter" && document.activeElement == prevLess) {
      const /* A NodeList of all the elements with the class `photographer-content`. */
        contentNodelist = document.querySelectorAll(".photographer-content");
      const slideContent = document.querySelector(".slide-content");
      const slideContentDiapo = document.querySelector(".slide-content-diapo");
      let index = slideContentDiapo.className.slice(
        41,
        slideContentDiapo.className.length
      );
      let titleContent;

      const previusContent = contentNodelist[index - 2];
      let format = "img";
      let formatEnd = "img";
      let classContent = "slide-content-title";

      if (contentNodelist[0].id == slideContentDiapo.id) {
        if (
          contentNodelist[contentNodelist.length - 2].src.indexOf("jpg") === -1
        ) {
          format = "video controls";
          formatEnd = "video";
          classContent = "slide-content-title-video";
        }
        titleContent = n[n.length - 1].title;
        slideContent.innerHTML = `<${format} class="slide-content-diapo ${
          contentNodelist[contentNodelist.length - 2].className
        }" id="${contentNodelist[contentNodelist.length - 2].id}"src="${
          contentNodelist[contentNodelist.length - 2].src
        }" alt = "${contentNodelist[contentNodelist.length - 2].getAttribute(
          "alt"
        )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;

        // title();
      } else {
        if (previusContent.src.indexOf("jpg") === -1) {
          format = "video controls";
          formatEnd = "video";
          classContent = "slide-content-title-video";
        }
        titleContent = n[index - 2].title;
        slideContent.innerHTML = `<${format} class="slide-content-diapo ${
          previusContent.className
        }" id="${previusContent.id}"src="${
          previusContent.src
        }" alt = "${previusContent.getAttribute(
          "alt"
        )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;
        // title();
      }
    }
  });
  document.addEventListener("keydown", (keyType) => {
    if (keyType.key === "ArrowLeft") {
      const /* A NodeList of all the elements with the class `photographer-content`. */
        contentNodelist = document.querySelectorAll(".photographer-content");
      const slideContent = document.querySelector(".slide-content");
      const slideContentDiapo = document.querySelector(".slide-content-diapo");
      let index = slideContentDiapo.className.slice(
        41,
        slideContentDiapo.className.length
      );
      let titleContent;

      const previusContent = contentNodelist[index - 2];
      let format = "img";
      let formatEnd = "img";
      let classContent = "slide-content-title";

      if (contentNodelist[0].id == slideContentDiapo.id) {
        if (
          contentNodelist[contentNodelist.length - 2].src.indexOf("jpg") === -1
        ) {
          format = "video controls";
          formatEnd = "video";
          classContent = "slide-content-title-video";
        }
        titleContent = n[n.length - 1].title;
        slideContent.innerHTML = `<${format} class="slide-content-diapo ${
          contentNodelist[contentNodelist.length - 2].className
        }" id="${contentNodelist[contentNodelist.length - 2].id}"src="${
          contentNodelist[contentNodelist.length - 2].src
        }" alt = "${contentNodelist[contentNodelist.length - 2].getAttribute(
          "alt"
        )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;

        // title();
      } else {
        if (previusContent.src.indexOf("jpg") === -1) {
          format = "video controls";
          formatEnd = "video";
          classContent = "slide-content-title-video";
        }
        titleContent = n[index - 2].title;
        slideContent.innerHTML = `<${format} class="slide-content-diapo ${
          previusContent.className
        }" id="${previusContent.id}"src="${
          previusContent.src
        }" alt = "${previusContent.getAttribute(
          "alt"
        )}" tabindex="2"></${formatEnd}><p class="${classContent}" tabindex="3">${titleContent}</p>`;
        // title();
      }
    }
  });
}
// Gestion des likes
function likes() {
  const likeContainer = document.querySelectorAll(".likes-container");
  const likesContainer = document.getElementById("total-likes");
  const inputLikes = document.querySelector("input-like");

  let totalLikes = 0;
  Array.from(likeContainer).forEach((e) => {
    const btnLike = e.children[1];
    totalLikes += parseInt(e.children[0].value);
    likesContainer.innerHTML = `<input type="number" id="total-like" value="${totalLikes}" name=""> <i class="fa-solid fa-heart big-heart"></i>`;
    document.addEventListener("keydown", (keyType) => {
      if (keyType.key === "Enter" && document.activeElement === e.children[0]) {
        console.log("test");
        if (btnLike.classList.contains("like-active") != true) {
          e.children[0].value = parseInt(e.children[0].value) + 1;
          btnLike.classList.add("like-active");
          totalLikes += 1;
          // likesContainer.innerHTML = `<input type="number" id="total-like" value="${totalLikes}" name=""> <i class="fa-solid fa-heart"></i>`;
          likesContainer.children[0].value =
            parseInt(likesContainer.children[0].value) + 1;
        } else {
          e.children[0].value = parseInt(e.children[0].value) - 1;
          btnLike.classList.remove("like-active");
          totalLikes -= 1;
          likesContainer.children[0].value =
            parseInt(likesContainer.children[0].value) - 1;
        }
      }
    });
    btnLike.addEventListener("click", () => {
      if (btnLike.classList.contains("like-active") != true) {
        e.children[0].value = parseInt(e.children[0].value) + 1;
        btnLike.classList.add("like-active");
        totalLikes += 1;
        // likesContainer.innerHTML = `<input type="number" id="total-like" value="${totalLikes}" name=""> <i class="fa-solid fa-heart"></i>`;
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

function sortContent(n) {
  let photographerMedias = n;
  // mediaFactory(contentSort);

  populariteSort(photographerMedias);
  dateSort(photographerMedias);
  titleSort(photographerMedias);
}

// Affichage des médias après le Tri
function afterSort(photographerMedias) {
  photosFactory.innerHTML = "";
  let index = 0;
  photographerMedias.forEach((item) => {
    const photosFactory = document.querySelector(".photos-factory");
    const id = item.id;
    const photographerId = item.photographerId;
    const title = item.title;
    const likes = item.likes;
    const price = item.price;
    const article = document.createElement("article");

    photosFactory.appendChild(article);
    let type;
    let media;
    if (item.image) {
      type = "img";
      media = item.image;
    } else {
      media = item.video;
      type = "video";
    }
    article.innerHTML = `
        <article content-id = "${id}" photographer-id = "${photographerId}" title = "${title}" likes = "${likes}" price = "${price}" type = "${type}">;
            <${type} src="../assets/photos/${photographerId}/${media}" id = "${id}" class="photographer-content ${(index += 1)}" tabindex="0"></${type}>
            <h2>${title}</h2>
            <likes class="likes-container">
                <input type="number" class="input-like" value="${likes}" name="" readonly>
                <i class="fa-solid fa-heart like"></i>
            </likes>
        </article>`;
    diaporama(photographerMedias);
  });
  likes();
}

const btnSort = document.getElementById("sort-menu");

// Tri par nombre de like
function populariteSort(photographerMedias) {
  popularite.addEventListener("click", () => {
    date.classList.toggle("is-visible");
    titre.classList.toggle("is-visible");
    arrow1.classList.toggle("active");
    arrow2.classList.add("is-hidden");
    arrow3.classList.add("is-hidden");
    popularite.classList.toggle("search-off");
    if (popularite.classList.contains("search-off") != true) {
      photographerMedias.sort((a, b) => {
        let aLikes = a.likes;
        let bLikes = b.likes;
        return bLikes - aLikes;
      });
      afterSort(photographerMedias);
    }
  });
  document.addEventListener("keydown", (keyType) => {
    if (
      keyType.key == "Enter" &&
      (document.activeElement == btnSort ||
        document.activeElement == popularite)
    ) {
      date.classList.toggle("is-visible");
      titre.classList.toggle("is-visible");
      arrow1.classList.toggle("active");
      arrow2.classList.add("is-hidden");
      arrow3.classList.add("is-hidden");
      popularite.classList.toggle("search-off");
      if (popularite.classList.contains("search-off") != true) {
        photographerMedias.sort((a, b) => {
          let aLikes = a.likes;
          let bLikes = b.likes;
          return bLikes - aLikes;
        });
        afterSort(photographerMedias);
      }
    }
  });
}

// tri par date
function dateSort(photographerMedias) {
  date.addEventListener("click", () => {
    popularite.classList.toggle("is-hidden");
    titre.classList.toggle("is-visible");
    arrow2.classList.toggle("is-hidden");
    ligne2.classList.toggle("is-hidden");
    date.classList.toggle("search-off");
    if (date.classList.contains("search-off") != true) {
      photographerMedias.sort((a, b) => {
        let aLow = a.date;
        let bLow = b.date;
        if (aLow < bLow) return 1;
        if (aLow > bLow) return -1;
        if (aLow === bLow) return 0;
      });
      afterSort(photographerMedias);
    }
  });
  document.addEventListener("keydown", (keyType) => {
    if (keyType.key == "Enter" && document.activeElement == date) {
      popularite.classList.toggle("is-hidden");
      titre.classList.toggle("is-visible");
      arrow2.classList.toggle("is-hidden");
      ligne2.classList.toggle("is-hidden");
      date.classList.toggle("search-off");
      if (date.classList.contains("search-off") != true) {
        photographerMedias.sort((a, b) => {
          let aLow = a.date;
          let bLow = b.date;
          if (aLow < bLow) return 1;
          if (aLow > bLow) return -1;
          if (aLow === bLow) return 0;
        });
        afterSort(photographerMedias);
      }
    }
  });
}

// Tri par titre.
function titleSort(photographerMedias) {
  titre.addEventListener("click", () => {
    popularite.classList.toggle("is-hidden");
    date.classList.toggle("is-visible");
    arrow3.classList.toggle("is-hidden");
    ligne3.classList.toggle("is-hidden");
    titre.classList.toggle("search-off");
    if (titre.classList.contains("search-off") != true) {
      photographerMedias.sort((a, b) => {
        let aLow = a.title;
        let bLow = b.title;
        if (aLow < bLow) return -1;
        if (aLow > bLow) return 1;
        if (aLow === bLow) return 0;
      });
      afterSort(photographerMedias);
    }
  });
  document.addEventListener("keydown", (keyType) => {
    if (keyType.key == "Enter" && document.activeElement == titre) {
      popularite.classList.toggle("is-hidden");
      date.classList.toggle("is-visible");
      arrow3.classList.toggle("is-hidden");
      ligne3.classList.toggle("is-hidden");
      titre.classList.toggle("search-off");
      if (titre.classList.contains("search-off") != true) {
        photographerMedias.sort((a, b) => {
          let aLow = a.title;
          let bLow = b.title;
          if (aLow < bLow) return -1;
          if (aLow > bLow) return 1;
          if (aLow === bLow) return 0;
        });
        afterSort(photographerMedias);
      }
    }
  });
}
