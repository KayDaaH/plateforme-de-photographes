function photographerFactory(data) {
  const { name, city, portrait } = data;

  // const picture = `assets/photographers/${portrait}`;
  const picture = `assets/photographers/account.png`;

  //   function getUserCardDOM() {
  //     const article = document.createElement("article");
  //     const img = document.createElement("img");
  //     img.setAttribute("src", picture);
  //     const h2 = document.createElement("h2");
  //     h2.textContent = name;
  //     article.appendChild(img);
  //     article.appendChild(h2);
  //     return article;
  //   }
  //   return { name, picture, getUserCardDOM };

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    h2.textContent = name;
    article.appendChild(img);
    article.appendChild(h2);
    return article;
  }
  return { name, picture, getUserCardDOM };
}
