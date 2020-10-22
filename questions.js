export default class Questions {
    constructor(category, difficulty, type) {
      this.category = category
      this.difficulty = difficulty
      this.type = type
    }

    getQuestions() {
      alert('Obteniendo Preguntas')
    }
}