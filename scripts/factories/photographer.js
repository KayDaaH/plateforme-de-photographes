function photographerFactory(data) {
  const { name, city, country, portrait, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    const h2 = document.createElement("h2");
    const localisation = document.createElement("localisation");
    const description = document.createElement("description");
    const cost = document.createElement("cost");
    h2.innerHTML = `<a  class="url" href="../photographer.html?id=${id}"> ${name}</a> `;
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
  return { getUserCardDOM };
}
