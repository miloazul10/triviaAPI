import Questions from './questions.js';
import UI from './UI.js';

const apiPeguntas = "https://opentdb.com/api.php?amount=10";
const apiCategorias = "https://opentdb.com/api_category.php";

const form1 = document.getElementById("form-type-question");
const form2 = document.getElementById("form-question");
const form3 = document.getElementById("trivia-difficulty")
const visible = document.querySelectorAll(".oculto")[0];
const oculto = document.querySelector(".btn-visible");
const resoculto = document.querySelectorAll(".oculto")[1];


// para obtener y pintar las preguntas y posibles respuestas
form1.addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedCategories = document.getElementById("trivia-categories").value;
  const selectedType = document.getElementById("t-type").value;
  const selectedDifficulty = document.getElementById("trivia-difficulty").value;
  const quantity = document.getElementById("quantityInput").value;
  
  const question = new Questions(quantity, selectedCategories, selectedType, selectedDifficulty);
  Questions.getQuestions();
  setTimeout(function () {
    visible.classList.remove("oculto");
  }, 700);
});

// para obtener y pintar las respuestas correctas e incorrectas
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  getResp();
  oculto.classList.remove("btn-visible");
  oculto.classList.add("oculto");
  resoculto.classList.remove("oculto");
});

// obtener categorias de la api
function getCategories() {
  fetch(apiCategorias)
    .then((res) => res.json())
    .then((dataJson) => {
      printCategories(dataJson.trivia_categories);
    })
    .catch((err) => {
      console.error(err);
    });
}
getCategories();

// pintar categorias
function printCategories(categories) {
  const selectCategories = document.getElementById("trivia-categories");
  let html = "";
  categories.forEach((category) => {
    html += `<option value="${category.id}">${category.name}</option>`;
  });
  selectCategories.innerHTML = html;
}

const ui = new UI();
ui.printQuestions()