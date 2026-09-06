const library = [];

function Book(name, author, pagesNumber, id){
    this.name = name;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.id = id
}

function addBookToLibrary(bookName, bookAuthor, bookPagesNumber){
    book1 = new Book(bookName, bookAuthor, bookPagesNumber, crypto.randomUUID());
    library.push(book1);
}
