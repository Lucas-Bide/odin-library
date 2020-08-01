let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.read ? "read" : "not read yet");
};


function addBookToLibrary() {
  
}

function render(book) {
  
}

let book1 = new Book("Observations", "Saint George", 2000, true);
let book2 = new Book("Observations 2", "Saint George", 5000, false);
myLibrary.push(book1, book2);