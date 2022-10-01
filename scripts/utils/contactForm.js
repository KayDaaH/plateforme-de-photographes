const modal = document.querySelector(".modal-container");
const submitBtn = document.querySelector(".contact_button");

const formFirstname = document.getElementById("firstname");
const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formMessage = document.getElementById("message");

const diaporamaContainer = document.querySelector(".diaporama-container");

submitBtn.addEventListener("click", btnFormAction);

function displayModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
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
