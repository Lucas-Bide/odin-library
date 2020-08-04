// Primary variables
let myLibrary = [];
let bookshelf = document.querySelector(".bookshelf");

// Contstructor

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  return this.title + " by " + this.author + ", " + this.pages + " pages, " + (this.read ? "read" : "not read yet");
};

// Form 

let formBG = document.querySelector(".book-form-bg");
let form = document.querySelector(".book-form form");

let newBtn = document.querySelector(".book-add");

newBtn.addEventListener("click", () => {
  if (!formBG.classList.contains("book-form-hide")) {
    resetForm();
  }
  else {
    formBG.classList.toggle("book-form-hide");
  }
});

let submitBtn = document.querySelector(".button-submit");

submitBtn.addEventListener("click", () => {
  let author = form.querySelector("#author").value;
  let title = form.querySelector("#title").value;
  let pages = form.querySelector("#pages").value;
  let yes = form.querySelector("#yes").checked;

  resetForm();
  addBookToLibrary(author, title, pages, yes);

});

let cancelBtn = document.querySelector(".button-cancel");

cancelBtn.addEventListener("click", () => {
  resetForm();
});

function resetForm() {
  let author = form.querySelector("#author");
  let title = form.querySelector("#title");
  let pages = form.querySelector("#pages");
  let yes = form.querySelector("#yes");

  author.value = "";
  title.value = "";
  pages.value = 1;
  yes.checked = true;

  formBG.classList.toggle("book-form-hide");
}


// Book Manipulation

function addBookToLibrary(author, title, pages, yes) {
  let book = new Book(title, author, pages, yes);
  myLibrary.push(book);
  render();
}

function render() {
  
  while (document.querySelector(".book")) {
    bookshelf.removeChild(document.querySelector(".book"));
  }

  for (let i = 0; i < myLibrary.length; i++) {
    book = myLibrary[i];
    
    let frame = document.createElement("div");
    frame.classList.add("book", "card", "flex-row");
    frame.setAttribute("data-index", i);
    bookshelf.appendChild(frame);

    let bookmark = document.createElement("div");
    bookmark.classList.add("bookmark","fas", "fa-bookmark");
    frame.appendChild(bookmark);

    let title = document.createElement("div");
    title.classList.add("book-title", "card-title", "pl-3", "pt-4");
    title.textContent = book.title;
    frame.appendChild(title);

    let info = document.createElement("div");
    info.classList.add("book-info", "card-body", "d-flex", "flex-column", "justify-content-center", "text-right");
    frame.appendChild(info);
    
    let author = document.createElement("div");
    author.classList.add("book-datum", "book-author");
    let feather = document.createElement("span");
    feather.classList.add("fas", "fa-feather-alt", "pr-2")
    author.appendChild(feather);
    author.appendChild(document.createTextNode(book.author));
    info.appendChild(author);

    let pages = document.createElement("div");
    pages.classList.add("book-datum", "book-pages");
    let page = document.createElement("span");
    page.classList.add("fas", "fa-file", "pr-2");
    pages.appendChild(page);
    pages.appendChild(document.createTextNode(book.pages));
    info.appendChild(pages);

    let read = document.createElement("div");
    read.classList.add("book-read", "text-center");
    let eye = document.createElement("span");
    let faa = "fa" + (book.read ? "s" : "r");
    eye.classList.add(faa, "fa-eye");
    eye.setAttribute("role", "button");
    eye.addEventListener("click", e => {
      let index = e.srcElement.offsetParent.getAttribute("data-index");
      if (myLibrary[index].read) {
        myLibrary[index].read = false;
      }
      else {
        myLibrary[index].read = true;
      }
      e.srcElement.classList.toggle("fas");
      e.srcElement.classList.toggle("far");
    });
    read.appendChild(eye);
    info.appendChild(read);

    let remove = document.createElement("div");
    remove.classList.add("book-remove", "fas", "fa-times");
    remove.setAttribute("role", "button");
    remove.addEventListener("click", e => {
      let book = e.srcElement.offsetParent;
      let index = e.srcElement.offsetParent.getAttribute("data-index");
      myLibrary.splice(index, 1);
      render();
    });    

    frame.appendChild(remove);
  }
} 

// Filler

let book1 = new Book("Observations", "Saint George", 2000, true);
let book2 = new Book("Observations 2", "Saint George", 5000, false);
myLibrary.push(book1, book2);
render();

/*

<div class="book card flex-row">
  <div class="bookmark fas fa-bookmark"></div>
  <div class="book-title card-title pl-3 pt-4">Lorem ipsum dolor sit amet</div>
  <div class="book-info card-body d-flex flex-column justify-content-center text-right">
    <div class="book-datum book-author"><span class="fas fa-feather-alt"></span> Saint George</div>
    <div class="book-datum book-pages"><span class="fas fa-file"></span> 2000</div>
    <div class="book-read text-center"><span class="fas fa-eye"></span></div>
    <div class="book-remove fas fa-times"></div>
  </div>
</div>
*/