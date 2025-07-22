const myLibrary = [
    // ["To Kill a Mockingbird", "Harper Lee", 281, false],
    // ["1984", "George Orwell", 328, false],
    // ["The Great Gatsby", "F. Scott Fitzgerald", 180, true],
    // ["Pride and Prejudice", "Jane Austen", 279, true],
    // ["The Hobbit", "J.R.R. Tolkien", 310, true],
];

const library = [];

function Book(title, author, pages, hasRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ` +
        `${this.hasRead ? "read" : "not read yet"}`;
};

Book.prototype.toggleRead = function () {
    this.hasRead = !this.hasRead;
};

function addBookToLibrary() {
    myLibrary.forEach(([title, author, pages, hasRead]) => {
        const book = new Book(title, author, pages, hasRead);
        library.push(book);
    });
}

function displayLibrary() {
    const container = document.getElementById("libraryContainer");
    container.innerHTML = "";

    library.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "book-card";
        bookCard.dataset.id = book.id; // Store the book ID for later reference 
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.hasRead ? "Read" : "Not Read"}</p>
            <div class="inside-button">
                <button class="toggle-btn button2">Toggle Read</button>
                <button class="remove-btn button2">Remove</button>
            </div>
        `;

        container.appendChild(bookCard);
    });
   attachCardEventListeners();
}

function attachCardEventListeners() {
    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.target.parentElement.dataset.id;
            const book = library.find(b => b.id === id);
            if (book) book.toggleRead();
            displayLibrary();
        });
    });

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = e.target.parentElement.dataset.id;
            const index = library.findIndex(b => b.id === id);
            if (index !== -1) {
                library.splice(index, 1);
                displayLibrary();
            }
        });
    });
}

document.getElementById("bookForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const hasRead = document.getElementById("hasRead").checked;

    const newBook = new Book(title, author, pages, hasRead);
    library.push(newBook);
    displayLibrary();
    this.reset(); // Clear the form
});

window.addEventListener("DOMContentLoaded", () => {
  addBookToLibrary();
  displayLibrary();
});



