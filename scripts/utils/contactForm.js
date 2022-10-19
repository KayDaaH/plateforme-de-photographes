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

const focusableElementsForm = modalForm.querySelectorAll(
  ".focusable-elements-form"
);
const focusableElementsFormArray = [...focusableElementsForm];
const firstElementFocusableForm = focusableElementsFormArray[1];
const lastElementFocusableForm = focusableElementsFormArray[0];

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

document.addEventListener("keydown", (keyType) => {
  if (keyType.key === "Escape") {
    closeModal();
  }
});

document.addEventListener("keydown", (keyType) => {
  if (
    keyType.key === "Enter" &&
    document.activeElement == lastElementFocusableForm
  ) {
    keyType.preventDefault();
    closeModal();
  }
});

document.addEventListener("keydown", (keyType) => {
  if (
    (keyType.key === "Tab" || keyType.code === 9) &&
    keyType.shiftKey === false &&
    document.activeElement == lastElementFocusableForm
  ) {
    firstElementFocusableForm.focus();
    keyType.preventDefault();
    console.log(keyType.shiftKey);
  }
  if (
    (keyType.key === "Tab" || keyType.code === 9) &&
    keyType.shiftKey === true &&
    document.activeElement == firstElementFocusableForm
  ) {
    lastElementFocusableForm.focus();
    keyType.preventDefault();
  }
});
