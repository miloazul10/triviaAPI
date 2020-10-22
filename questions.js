export default class Questions {
    constructor(quantity, categories, type, difficulty) {
      this.quantity =  quantity
      this.categories = categories
      this.type = type
      this.difficulty = difficulty
    }

    getQuestions(quantity, categories, type, difficulty) {
      fetch(`https://opentdb.com/api.php?amount=${quantity}&category=${categories}&difficulty=${difficulty}&type=${type}`)
      .then((res) => res.json())
      .then((dataJson) => {
        printQuestions(dataJson.results);
      })
      .catch((err) => {
        console.error(err);
      });
    }
}