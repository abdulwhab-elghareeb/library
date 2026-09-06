const library = [];

function Book(title, author, pagesNumber, id, isRead ){
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.isRead = isRead
    this.id = id
}

function addBookToLibrary(bookTitle, bookAuthor, bookPagesNumber, bookReadingStatus){
    book1 = new Book(bookTitle, bookAuthor, bookPagesNumber, bookReadingStatus, crypto.randomUUID());
    library.push(book1);
}

const allCardsContainer = document.querySelector(".book-cards-container");
addBookToLibrary('test1', "book", 888, true);
addBookToLibrary('testjl1', "bolkjlok", 8898, true);
addBookToLibrary('st1', "ok", 8, false);

function displayBooks(arrayOfBooks){
    arrayOfBooks.forEach(book => { // looping through all the books

        const card = document.createElement("div"); // creating the div container for the card
        card.classList.add("card") ; // adding classes to apply styling
    
        const title = document.createElement("h1") ; 
    
        const authorSpan = document.createElement("span"); 
        const author = document.createElement("div");
        author.classList.add("author"); 
    
        const pagesSpan = document.createElement("span");
        const pagesNumber = document.createElement("div");
        pagesNumber.classList.add("pages-number");
    
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "delete me"
    
        card.append(title, authorSpan, author, pagesSpan, pagesNumber, deleteBtn); // appending all the elements made to the card to display it later

        title.textContent = book.title;
        author.textContent = book.author;
        pagesNumber.textContent = book.pagesNumber;

        // spans are the same for each book
        authorSpan.textContent = "Author:";
        pagesSpan.textContent = "Pages:";

        allCardsContainer.appendChild(card) // finally appending the card to the card container
    });
}
displayBooks(library)