function mediaFactory(data) {
  const photographerMedias = data;
  console.log(photographerMedias);

  function photosFactoryDOM() {
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
      contents.setAttribute("class", `photographer-content`);
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
  console.log(contentNodelist);

  contentNodelist.forEach((e) => {
    e.addEventListener("click", () => {
      const link = e.src;
      // const article = document.createElement("article");
      // const content = document.createElement("content");
      const diaporamaContainer = document.querySelector(".diaporama-container");
      const slideContent = document.querySelector(".slide-content");
      if (link.indexOf("jpg") !== -1) {
        console.log("hello");
        console.log(e);
        console.log(e.toString());
        slideContent.innerHTML = `<img src="${e.src}">`;
        diaporamaContainer.style.display = "block";
      } else {
        console.log("pas hello");
      }
    });
  });
}
