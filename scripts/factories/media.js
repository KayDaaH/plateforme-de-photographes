function mediaFactory(data) {
  const photographerMedias = data;
  console.log("hello");
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
    diaporama(photographerMedias);
    likes();
    sortContent(photographerMedias);
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
    });
  });
  plusSlides(data);
  lessSlides(data);
}

function plusSlides(n) {
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
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${contentNodelist[0].className}" id="${contentNodelist[0].id}"src="${contentNodelist[0].src}"></${formatEnd}><p class="${classContent}">${titleContent}</p>`;
      title();
    } else {
      if (nextContent.src.indexOf("jpg") === -1) {
        format = "video controls";
        formatEnd = "video";
        classContent = "slide-content-title-video";
      }
      titleContent = n[index].title;
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${nextContent.className}" id="${nextContent.id}"src="${nextContent.src}"></${formatEnd}><p class="${classContent}">${titleContent}</p>`;
      title();
    }
  });
}

function lessSlides(n) {
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
      }"></${formatEnd}><p class="${classContent}">${titleContent}</p>`;
      title();
    } else {
      if (previusContent.src.indexOf("jpg") === -1) {
        format = "video controls";
        formatEnd = "video";
        classContent = "slide-content-title-video";
      }
      titleContent = n[index - 2].title;
      slideContent.innerHTML = `<${format} class="slide-content-diapo ${previusContent.className}" id="${previusContent.id}"src="${previusContent.src}"></${formatEnd}><p class="${classContent}">${titleContent}</p>`;
      title();
    }
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

function sortContent(n) {
  const arrow1 = document.getElementById("arrow1");
  const arrow2 = document.getElementById("arrow2");
  const arrow3 = document.getElementById("arrow3");
  const ligne2 = document.getElementById("sort-ligne2");
  const ligne3 = document.getElementById("sort-ligne3");
  const popularite = document.querySelector(".sort-populaire");
  const date = document.querySelector(".sort-date");
  const titre = document.querySelector(".sort-titre");
  const testttt = document.querySelector(".photos-factory");
  let contentSort = n;
  console.log(testttt);
  // mediaFactory(contentSort);

  popularite.addEventListener("click", () => {
    date.classList.toggle("is-visible");
    titre.classList.toggle("is-visible");
    arrow1.classList.toggle("active");
    arrow2.classList.add("is-hidden");
    arrow3.classList.add("is-hidden");
    // contentSort.sort((a, b) => {
    //   let aLikes = a.likes;
    //   let bLikes = b.likes;
    //   return bLikes - aLikes;
    // });
    console.log("bubulle");
  });
  date.addEventListener("click", () => {
    popularite.classList.toggle("is-hidden");
    titre.classList.toggle("is-visible");
    arrow2.classList.toggle("is-hidden");
    ligne2.classList.toggle("is-hidden");
    // contentSort.sort((a, b) => {
    //   let aLikes = a.likes;
    //   let bLikes = b.likes;
    //   return bLikes - aLikes;
    // });
  });
  titre.addEventListener("click", () => {
    popularite.classList.toggle("is-hidden");
    date.classList.toggle("is-visible");
    arrow3.classList.toggle("is-hidden");
    ligne3.classList.toggle("is-hidden");
    contentSort.sort((a, b) => {
      let aLow = a.title;
      let bLow = b.title;
      if (aLow < bLow) return -1;
      if (aLow > bLow) return 1;
      if (aLow === bLow) return 0;
    });
    let index = 0;
    const photographerMediaHTML = document.querySelector(".photos-factory");
    photographerMediaHTML.innerHTML = "";
    contentSort.forEach((item) => {
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
    diaporama(contentSort);
    likes();
  });
}

function title() {
  const slideContent = document.querySelector(".slide-content");
  const content = document.querySelector(".slide-content-diapo");
  let title;
  if (slideContent.children[1].className == "slide-content-title") {
    title = document.querySelector(".slide-content-title");
    let offSetLeft = content.offsetLeft;
    let offSetHeight = content.offsetHeight - 20;
    let heightContent = slideContent.offsetHeight;

    if (offSetHeight == 737) offSetHeight += 70;
    if (offSetHeight == 821) offSetHeight += 30;
    if (offSetHeight != heightContent - 20) offSetHeight += 40;

    title.style.left = offSetLeft + "px";
    title.style.top = offSetHeight + "px";
  }
}
