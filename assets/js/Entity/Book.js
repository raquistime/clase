export class Book {
    constructor(id, userId, title, author, categories, isbn, date) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category = categories;
        this.isbn = isbn;
        this.date = date;
        this.userId = userId;
    }
}