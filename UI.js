export default class UI {
  printQuestions(preguntas){
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