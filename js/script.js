// Represents a book
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}
// Handle UI
class UI {
    static displayBooks() {
        
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#library-list');
        const row = document.createElement('div');

        row.innerHTML = `
        <div class="card shadow">
        <div class="card-body">
        <i class="fa-solid fa-book fa-2x"></i>
        <h5 class="card-title">Title: ${book.title}</h5>
        <p class="card-text">Author: ${book.author}</p>
        <p class="card-text"># of Pages: ${book.pages}</p>
        <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
        </div>
        </div>
        `;
        /*row.style.animation = '';*/
        row.classList.add("col","animatecard","mt-4");
        list.appendChild(row);
    }
static deleteBook(el) {
if(el.classList.contains('delete')) {
    el.parentElement.parentElement.parentElement.remove();
}
}



static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);
    // Clear in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
    }
}
// Handle Storage
class Store {
    static getBooks() {
let books;
if(localStorage.getItem('books') === null) {
    books = [];
} else {
    books = JSON.parse(localStorage.getItem('books'));
}
return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(pages) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.pages === pages) {
            books.splice(index, 1);
        }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Add Book
document.querySelector('#library-form').addEventListener('submit', (e) => {
//Prevent refresh
    e.preventDefault();
//Get form values
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const pages = document.querySelector('#pages').value;

//Validate
if(title === '' || author === '' || pages === '') {
    UI.showAlert('Please fill in all fields', 'danger');
} else {
//Instatiate book
const book = new Book(title, author, pages);

//Add Book to UI
UI.addBookToList(book);

//Add book to store
Store.addBook(book);

// Success message
UI.showAlert('Book Added', 'success');


//Clear fields
UI.clearFields();
}
});

// Remove Book
document.querySelector('#library-list').addEventListener('click', (e) => {
    //Remove book from UI
UI.deleteBook(e.target)

//Remove book from store
Store.removeBook(e.target.parentElement.previousElementSibling)

UI.showAlert('Book Removed', 'success');
});