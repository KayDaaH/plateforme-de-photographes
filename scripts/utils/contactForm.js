const modalContainer = document.querySelector(".modal-container");
const modalForm = document.querySelector(".modal");
const submitBtn = document.querySelector(".contact_button");
const sortMenu = document.querySelector(".sort-menu");
const formFirstname = document.getElementById("firstname");
const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formMessage = document.getElementById("message");
const main = document.getElementById("main");
const firstnameChamp = document.getElementById("firstname");
const modalFormBtn = document.querySelector(".modal-btn");
const body = document.getElementById("body");

const diaporamaContainer = document.querySelector(".diaporama-container");

submitBtn.addEventListener("click", btnFormAction);

function displayModal() {
  modalContainer.style.display = "block";
  sortMenu.style.zIndex = "-1";
  main.setAttribute("aria-hidden", "true");
  modalForm.setAttribute("aria-hidden", "false");
  firstnameChamp.focus();
}

function closeModal() {
  modalContainer.style.display = "none";
  sortMenu.style.zIndex = "2";
  main.setAttribute("aria-hidden", "false");
  modalForm.setAttribute("aria-hidden", "true");
  modalFormBtn.focus();
}

function btnFormAction(event) {
  event.preventDefault();
  console.log(formFirstname.value);
  console.log(formName.value);
  console.log(formEmail.value);
  console.log(formMessage.value);
}

function closeDiaporama() {
  diaporamaContainer.style.display = "none";
}

body.addEventListener("keydown", (keyType) => {
  if (keyType.key === "Escape") {
    closeModal();
  }
});
