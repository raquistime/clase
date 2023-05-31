import {Db} from './Services/Db.js';
import {Book} from './Entity/Book.js';

document.addEventListener('DOMContentLoaded', () => {
    const db = new Db('book_table');
    const btn = document.getElementById('add_book');
    btn.addEventListener('click', () => {
        const body = document.body;
        body.appendChild(createModal(db));
    });
    print(db);
});

function print(db) {
    const books = db.getAll();
    const list_container = document.getElementById('list');
    list_container.innerHTML = '';
    for(let book of books) {
        const container = document.createElement('div');
        const title = document.createElement('span');
        const author = document.createElement('span');
        const category = document.createElement('span');
        const isbn = document.createElement('span');
        const date = document.createElement('span');
        const remove = document.createElement('button');
        const edit = document.createElement('button');
        edit.textContent = 'Editar';
        edit.addEventListener('click', () => {
            const body = document.body;
            body.appendChild(createModal(db, book));
        });
        remove.textContent = 'Eliminar';
        remove.addEventListener('click', () => {
            db.delete(book.id);
            container.remove();
        });
        title.textContent = book.title;
        author.textContent = book.author;
        category.textContent = book.category;
        isbn.textContent = book.isbn;
        date.textContent = book.date;
        container.appendChild(title);
        container.appendChild(author);
        container.appendChild(category);
        container.appendChild(isbn);
        container.appendChild(date);
        container.appendChild(remove);
        container.appendChild(edit);
        container.classList.add('book');
        list_container.appendChild(container);
    }
}

const createModal = (db, book = null) => {
    const modal_bg = document.createElement('div');
    const modal = document.createElement('form');
    const title = document.createElement('input');
    const author = document.createElement('input');
    const category = document.createElement('input');
    const isbn = document.createElement('input');
    const date = document.createElement('input');
    const btn = document.createElement('button');
    title.id = 'title';
    title.type = 'text';
    title.name = 'title';
    title.placeholder = 'Añade un título';
    book ? title.value = book.title : title.value = "";
    author.id = 'author';
    author.type = 'text';
    author.name = 'author';
    author.placeholder = 'Añade un autor';
    book ? author.value = book.author : author.value = "";
    category.id = 'category';
    category.type = 'text';
    category.name = 'category';
    category.placeholder = 'Añade una categoría';
    book ? category.value = book.category : category.value = "";
    isbn.id = 'isbn';
    isbn.type = 'text';
    isbn.name = 'isbn';
    isbn.placeholder = 'Añade un isbn';
    book ? isbn.value = book.isbn : isbn.value = "";
    date.id = 'date';
    date.type = 'date';
    date.name = 'date';
    date.placeholder = 'Añade una fecha';
    book ? date.value = book.date : date.value = "";

    btn.textContent = 'Añadir libro';
    btn.type = 'button';

    btn.addEventListener('click', () => {
        const form = document.getElementById('add_book_form');
        const data = new FormData(form);
        book ? db.update(book.id, data) : add(db)
        print(db);
        modal_bg.remove();
    });

    modal_bg.addEventListener('click', (e) => {
        if(e.target === modal_bg) {
            modal_bg.remove();
        }
    });

    modal.appendChild(title);
    modal.appendChild(author);
    modal.appendChild(category);
    modal.appendChild(isbn);
    modal.appendChild(date);
    modal.appendChild(btn);
    modal.classList.add('modal');
    modal.id = 'add_book_form';
    modal_bg.appendChild(modal);
    modal_bg.classList.add('modal-bg');
    
    return modal_bg;
}

const add = (db) => {
    const form = document.getElementById('add_book_form');
    const data = new FormData(form);
    const id = db.getLastId();
    const bookData = [];
    for(let value of data.values()) {
        bookData.push(value);
    }
    
    const book = new Book(id, ...bookData);
    db.add(book);
}