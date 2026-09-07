
const library = [];

function Book(title, author, pagesNumber, isRead, id ){
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




function displayBooks(arrayOfBooks){
    const allCardsContainer = document.querySelector(".book-cards-container");

    arrayOfBooks.forEach(book => { // looping through all the book/s

        if(!(document.getElementById(book.id))){// making sure that the book doesn't exist on the dom, avoiding duplicate books

            const card = document.createElement("div"); // creating the div container for the card
            card.classList.add("card") ; // adding classes to apply styling
            card.setAttribute("id" , book.id) // adding id to each card to mark it 
            
            const title = document.createElement("h1") ; 
            
            const authorSpan = document.createElement("span"); 
            const author = document.createElement("div");
            author.classList.add("author"); 

            const pagesSpan = document.createElement("span");
            const pagesNumber = document.createElement("div");
            pagesNumber.classList.add("pages-number");

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn")
            deleteBtn.textContent = "delete me"


            card.append(title, authorSpan, author, pagesSpan, pagesNumber, deleteBtn); // appending all the elements made to the card to display it later

            title.textContent = book.title;
            author.textContent = book.author;
            pagesNumber.textContent = book.pagesNumber;

            // the same for each book
            authorSpan.textContent = "Author:";
            pagesSpan.textContent = "Pages:";

            allCardsContainer.appendChild(card); // finally, appending the card to the card container
        
        }
    });
}

const dialogSubmitBtn = document.querySelector("#dialog-btn")

dialogSubmitBtn.addEventListener("click", (event) =>{
    const dialog = document.querySelector("dialog")

    const bookTitleValue= document.querySelector("#title").value; // getting the book title
    const bookAuthorValue = document.querySelector("#author").value; // getting the book author 
    const numberOfPagesValue = document.querySelector("#pages-number").value; // getting book pages number

    const bookStatueValue = document.querySelector("input[name='radioStatue']:checked");// getting the checked radio button

    addBookToLibrary(bookTitleValue, bookAuthorValue, numberOfPagesValue, bookStatueValue);
    (document.querySelector("form")).reset(); // resetting the form
    displayBooks(library);
    dialog.close();
})
