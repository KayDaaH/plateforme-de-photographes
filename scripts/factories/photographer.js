function photographerFactory(data) {
  const { name, city, country, portrait, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  // const picture = `assets/photographers/account.png`;

  // function getUserCardDOM() {
  //   const article = document.createElement("article");
  //   const img = document.createElement("img");
  //   img.setAttribute("src", picture);
  //   const h2 = document.createElement("h2");
  //   h2.textContent = name;
  //   article.appendChild(img);
  //   article.appendChild(h2);
  //   return article;
  // }
  // return { name, picture, getUserCardDOM };

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    const localisation = document.createElement("localisation");
    const description = document.createElement("description");
    const cost = document.createElement("cost");
    h2.innerHTML = `<a  id="url" href="../photographer.html?name=${name}"> ${name}</a> `;
    localisation.textContent = `${country}, ${city}`;
    description.textContent = tagline;
    cost.textContent = `${price}€/jour`;
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(localisation);
    article.appendChild(description);
    article.appendChild(cost);

    return article;
  }
  return { name, picture, getUserCardDOM };
}

// const url = `../photographer.html?name=${name}`;
// const url2 = new URL(url);
// const urlName = url2.searchParams.get("name");
// console.log(urlName);
