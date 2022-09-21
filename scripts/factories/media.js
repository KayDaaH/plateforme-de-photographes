function mediaFactory(data) {
  const photographerMedias = data;
  console.log(photographerMedias);

  function photosFactoryDOM() {
    photographerMedias.forEach((item) => {
      const photographerMediaHTML = document.querySelector(".photos-factory");
      const title = item.title;
      const price = item.price;
      const id = item.photographerId;
      const article = document.createElement("article");
      let contents;
      let media;
      if (item.image) {
        contents = document.createElement("img");
        media = item.image;
        console.log("oui");
      } else {
        contents = document.createElement("video");
        media = item.video;
        console.log("non");
      }
      contents.setAttribute("src", `../assets/photos/${id}/${media}`);
      const h2 = document.createElement("h2");
      const cost = document.createElement("cost");
      h2.textContent = `${title}`;
      cost.textContent = `${price}€/jour`;
      article.appendChild(contents);
      article.appendChild(h2);
      article.appendChild(cost);
      photographerMediaHTML.appendChild(article);

      return photographerMediaHTML;
    });
  }

  return { photosFactoryDOM };
}
