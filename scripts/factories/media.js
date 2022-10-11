function mediaFactory(data) {
  const photographerMedias = data;

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
    diaporama(photographerMedias);
    likes();
    sort();
  }

  return { photosFactoryDOM };
}

function diaporama(data) {
  const contentNodelist = document.querySelectorAll(".photographer-content");
  let title;
  contentNodelist.forEach((e) => {
    e.addEventListener("click", () => {
      const link = e.src;
      const id = e.id;

      data.forEach((e) => {
        if (id == e.id) {
          title = e.title;
        }
      });

      const diaporamaContainer = document.querySelector(".diaporama-container");
      const slideContent = document.querySelector(".slide-content");
      const slideTitle = document.querySelector(".content-title");
      const titleContent = title;

      if (link.indexOf("jpg") !== -1) {
        slideContent.innerHTML = `<img class="slide-content-diapo ${e.className}" id="${e.id}"src="${e.src}"> <p class="slide-content-title">${titleContent}</p>`;
        diaporamaContainer.style.display = "block";
        const content = document.querySelector(".slide-content-diapo");
        const title = document.querySelector(".slide-content-title");

        let offSetLeft = content.offsetLeft;
        let offSetHeight = content.offsetHeight - 20;
        let heightContent = slideContent.offsetHeight;
        if (offSetHeight != heightContent - 20) offSetHeight += 40;

        title.style.left = offSetLeft + "px";
        title.style.top = offSetHeight + "px";
      } else {
        slideContent.innerHTML = `<video class="slide-content-diapo ${e.className}" id="${e.id}"controls src="${e.src}"></video> <p class="slide-content-title-video">${titleContent}</p>`;
        diaporamaContainer.style.display = "block";
      }
      // slideTitle.innerHTML = `<p> ${title} </p>`;
    });
  });
  // const content = document.querySelector(".slide-content-diapo");
  // console.log(content);
  // let variable = content.offsetLeft;
  // console.log(variable);
  plusSlides(data);
  lessSlides(data);
}

// function plusSlides(n) {
//   const /* A NodeList of all the elements with the class `photographer-content`. */
//     contentNodelist = document.querySelectorAll(".photographer-content");
//   const slideContent = document.querySelector(".slide-content");
//   const slideContentDiapo = document.querySelector(".slide-content-diapo");
//   let index = slideContentDiapo.className.slice(
//     41,
//     slideContentDiapo.className.length
//   );
//   const id = parseInt(slideContentDiapo.id);
//   let title;

//   contentNodelist.forEach((e) => {
//     if (id == e.id) {
//       title = e.title;
//     }
//   });
//   console.log(contentNodelist);

//   const nextContent = contentNodelist[index];
//   const previusContent = contentNodelist[index - 2];
//   let format = "img";

//   if (n === 1) {
//     if (contentNodelist.length - 1 < Number(index) + 1) {
//       if (contentNodelist[0].src.indexOf("jpg") === -1)
//         format = "video controls";
//       slideContent.innerHTML = `<${format} class="slide-content-diapo ${contentNodelist[0].className}" id="${contentNodelist[0].id}"src="${contentNodelist[0].src}">`;
//     } else {
//       if (nextContent.src.indexOf("jpg") === -1) format = "video controls";
//       slideContent.innerHTML = `<${format} class="slide-content-diapo ${nextContent.className}" id="${nextContent.id}"src="${nextContent.src}">`;
//     }
//   } else {
//     if (contentNodelist[0].id == slideContentDiapo.id) {
//       if (contentNodelist[contentNodelist.length - 2].src.indexOf("jpg") === -1)
//         format = "video controls";
//       slideContent.innerHTML = `<${format} class="slide-content-diapo ${
//         contentNodelist[contentNodelist.length - 2].className
//       }" id="${contentNodelist[contentNodelist.length - 2].id}"src="${
//         contentNodelist[contentNodelist.length - 2].src
//       }">`;
//     } else {
//       if (previusContent.src.indexOf("jpg") === -1) format = "video controls";
//       slideContent.innerHTML = `<${format} class="slide-content-diapo ${previusContent.className}" id="${previusContent.id}"src="${previusContent.src}">`;
//     }
//   }
// }

function plusSlides(n) {
  const icon = document.getElementById("prev-plus");
  icon.addEventListener("click", () => {
    const /* A NodeList of all the elements with the class `photographer-content`. */
      contentNodelist = document.querySelectorAll(".photographer-content");
    const slideContent = document.querySelector(".slide-content");
    const slideContentDiapo = document.querySelector(".slide-content-diapo");
    const slideTitle = document.querySelector(".content-title");
    let index = slideContentDiapo.className.slice(
      41,
      slideContentDiapo.className.length
    );
    let title;

    const nextContent = contentNodelist[index];
    let format = "img";

    if (contentNodelist.length - 1 < Number(index) + 1) {
      if (contentNodelist[0].src.indexOf("jpg") === -1)
        format = "video controls";
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${contentNodelist[0].className}" id="${contentNodelist[0].id}"src="${contentNodelist[0].src}">`;
      title = n[0].title;
    } else {
      if (nextContent.src.indexOf("jpg") === -1) format = "video controls";
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${nextContent.className}" id="${nextContent.id}"src="${nextContent.src}">`;
      title = n[index].title;
    }
    slideTitle.innerHTML = `<p> ${title} </p>`;
    slideContentDiapo.innerHTML = `<p> ${title} </p>`;
  });
}

function lessSlides(n) {
  const icon = document.getElementById("prev-less");
  icon.addEventListener("click", () => {
    const /* A NodeList of all the elements with the class `photographer-content`. */
      contentNodelist = document.querySelectorAll(".photographer-content");
    const slideContent = document.querySelector(".slide-content");
    const slideContentDiapo = document.querySelector(".slide-content-diapo");
    const slideTitle = document.querySelector(".content-title");
    let index = slideContentDiapo.className.slice(
      41,
      slideContentDiapo.className.length
    );
    let title;
    console.log(n[n.length - 1]);

    const previusContent = contentNodelist[index - 2];
    let format = "img";
    console.log(contentNodelist[0].id);
    console.log(slideContentDiapo.id);

    if (contentNodelist[0].id == slideContentDiapo.id) {
      if (contentNodelist[contentNodelist.length - 2].src.indexOf("jpg") === -1)
        format = "video controls";
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${
        contentNodelist[contentNodelist.length - 2].className
      }" id="${contentNodelist[contentNodelist.length - 2].id}"src="${
        contentNodelist[contentNodelist.length - 2].src
      }">`;
      title = n[n.length - 1].title;
    } else {
      if (previusContent.src.indexOf("jpg") === -1) format = "video controls";
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${previusContent.className}" id="${previusContent.id}"src="${previusContent.src}">`;
      title = n[index - 2].title;
    }
    slideTitle.innerHTML = `<p> ${title} </p>`;
  });
}

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
  const popularite = document.querySelector(".sort-populaire");
  const date = document.querySelector(".sort-date");
  const titre = document.querySelector(".sort-titre");
  popularite.addEventListener("click", () => {
    console.log("ok");
    date.classList.toggle("is-visible");
    titre.classList.toggle("is-visible");
    arrow.classList.toggle("active");
  });
}
