export default class UI {
  printCategories(categories){
  const selectCategories = document.getElementById("trivia-categories");
  let html = "";
  categories.forEach((category) => {
    html += `<option value="${category.id}">${category.name}</option>`;
  });
  selectCategories.innerHTML = html;
  }
}