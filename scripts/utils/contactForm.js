const modal = document.querySelector(".modal-container");
const submitBtn = document.querySelector(".contact_button");
const sortMenu = document.querySelector(".sort-menu");

const formFirstname = document.getElementById("firstname");
const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formMessage = document.getElementById("message");

const diaporamaContainer = document.querySelector(".diaporama-container");

submitBtn.addEventListener("click", btnFormAction);

function displayModal() {
  modal.style.display = "block";
  sortMenu.style.zIndex = "-1";
}

function closeModal() {
  modal.style.display = "none";
  sortMenu.style.zIndex = "2";
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
