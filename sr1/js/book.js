class Book {
  constructor(title, category) {
    this.title = title;
    if (category === "kids" || category === "teens" || category === "adults") {
      this.category = category;
    } else {
      this.category = "adults";
    }
  }
}