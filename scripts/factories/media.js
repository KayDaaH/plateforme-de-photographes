function mediaFactory(data) {
  const photographerMedias = data;
  console.log("---------");
  console.log(photographerMedias);

  function photosFactoryDOM() {
    photographerMedias.forEach(function test(item) {
      const photographerMediaHTML = document.querySelector(".photos-factory");
      const media = item.image;
      const title = item.title;
      const price = item.price;
      const id = item.photographerId;
      const article = document.createElement("article");
      const img = document.createElement("img");
      img.setAttribute("src", `../assets/photos/${id}/${media}`);
      const h2 = document.createElement("h2");
      const cost = document.createElement("cost");
      h2.textContent = `${title}`;
      cost.textContent = `${price}€/jour`;
      article.appendChild(img);
      article.appendChild(h2);
      article.appendChild(cost);
      photographerMediaHTML.appendChild(article);

      return photographerMediaHTML;
    });
  }

  return { photosFactoryDOM };
}
