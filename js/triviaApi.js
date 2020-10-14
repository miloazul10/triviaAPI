const apiPeguntas = "https://opentdb.com/api.php?amount=10";
const apiCategorias = "https://opentdb.com/api_category.php";

///////////// VARIABLES
const formu1 = document.getElementById("form-type-question");
const form2 = document.getElementById("form-question");
const form3 = document.getElementById("trivia-difficulty")
const visible = document.querySelectorAll(".oculto")[0];
const oculto = document.querySelector(".btn-visible");
const resoculto = document.querySelectorAll(".oculto")[1];

///////////// LISTENERS
// para obtener y pintar las preguntas y posibles respuestas
formu1.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedCategories = document.getElementById("trivia-categories").value;
  const selectedType = document.getElementById("t-type").value;
  const selectedDifficulty = document.getElementById("trivia-difficulty").value;
  // nuevo llamado a la api
  getQuestion(selectedCategories, selectedType, selectedDifficulty);
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
///////////// FUNCIONES

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
//pintar categorias
function printCategories(categories) {
  const selectCategories = document.getElementById("trivia-categories");
  let html = "";
  categories.forEach((category) => {
    html += `<option value="${category.id}">${category.name}</option>`;
  });
  selectCategories.innerHTML = html;
}
// obtener preguntas de la api
function getQuestion(cat, type, diffi) {
  fetch(`https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=${diffi}&type=${type}`)
    .then((res) => res.json())
    .then((dataJson) => {
      printQuestions(dataJson.results);
    })
    .catch((err) => {
      console.error(err);
    });
}
// pintar preguntas y respuestas

function printQuestions(preguntas) {
  const tQuestions = document.getElementById("t-preguntas");

  let temp = 0;
  const htmlQuestions = preguntas.map(function (pregunta) {
    if (pregunta.type === "boolean") {
      temp += 1;
      return `
                <label>Question ${pregunta.type} of ${pregunta.category}:<br><b> ${pregunta.question}</b></label>
                <p>Answer: 
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="true" /> ${pregunta.correct_answer} </label>
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="false" /> ${pregunta.incorrect_answers} </label>
                </p>
                `;
    } else if (pregunta.type === "multiple") {
      temp += 1;
      return `
                <label>Question ${pregunta.type} of ${pregunta.category}:<br><b> ${pregunta.question}</b></label>
                <p>Answer: 
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="false" /> ${pregunta.incorrect_answers[1]} </label>
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="true" /> ${pregunta.correct_answer} </label>
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="false" /> ${pregunta.incorrect_answers[0]} </label>
                    <br>
                    <label><input type="radio" name="respuesta${temp}" value="false" /> ${pregunta.incorrect_answers[2]} </label>
                </p>
                `;
    }
  });
  //  se imprime el resultado
  const htmlQuestionsJoined = htmlQuestions.join("");
  tQuestions.innerHTML = htmlQuestionsJoined;
}
// obtener respuesta correctas e incorrectas
function getResp() {
  let respchecked = false;
  let respvalue = 0;
  let sumaresult = 0;
  let resultado = [];
  let tresults = document.getElementById("t-resultados");

  for (let j = 1; j < 11; j++) {
    resultado = document.getElementsByName("respuesta" + j);
    for (let i = 0; i < resultado.length; i++) {
      respchecked = resultado[i].checked;
      respvalue = resultado[i].value;
      if (respchecked == true && respvalue == "true") {
        sumaresult += 1;
      }
    }
  }

  tresults.innerHTML = `
    <h3>Estos son los resultados:</h3>
    <h5>Tiene ${sumaresult} respuestas correctas</h5>
    <h5>Tiene ${10 - sumaresult} respuestas incorrectas</h5>
  `;
}