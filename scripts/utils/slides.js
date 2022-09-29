const content = document.getElementsByTagName("article");
const img = document.getElementsByTagName("img");
const contentTest = document.querySelector(".logo");

// contentTest.addEventListener("click", () => {
//   console.log(content[2]);
// });

// img.addEventListener("click", () => {
//   console.log("bubulle");
// });

contentTest.addEventListener("click", () => {
  console.log("bubulle");
  img.forEach((e) => {
    console.log(e);
  });
});
