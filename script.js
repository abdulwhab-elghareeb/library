
const library = [];

function Book(title, author, pagesNumber, readingStatus, id ){
    this.title = title;
    this.author = author;
    this.pagesNumber = pagesNumber;
    this.readingStatus = readingStatus
    this.id = id
}
Book.prototype.changeReadingStatus = function(){
    switch(this.readingStatus){
        // "Completed" -> "Currently Reading" -> "Not Started" and vise versa
        case "Completed":
            this.readingStatus = "Currently Reading";
            break;
        case "Currently Reading":
            this.readingStatus = "Not Started";
            break;
        default:
            this.readingStatus = "Completed" ;
    };
};

function addBookToLibrary(bookTitle, bookAuthor, bookPagesNumber, bookReadingStatus){
    book1 = new Book(bookTitle, bookAuthor, bookPagesNumber, bookReadingStatus, crypto.randomUUID());
    library.push(book1);
};


function displayBooks(arrayOfBooks){
    const allCardsContainer = document.querySelector(".book-cards-container");

    arrayOfBooks.forEach(book => {

        if(!(document.querySelector(`[data-id = "${book.id}"]`))){// making sure that the book doesn't exist on the dom, avoiding duplicate books

            const card = document.createElement("div");
            card.classList.add("card") ; 
            card.setAttribute("data-id" , book.id) // adding id to each card to mark it 
            
            const title = document.createElement("h1") ; 
            
            const authorSpan = document.createElement("span"); 
            const author = document.createElement("div");
            author.classList.add("author"); 

            const pagesSpan = document.createElement("span");
            const pagesNumber = document.createElement("div");
            pagesNumber.classList.add("pages-number");

            const readingStatusBtn = document.createElement("button");
            readingStatusBtn.classList.add("reading-status-btn");
            readingStatusBtn.addEventListener("click", (e)=>{
                book.changeReadingStatus();
                readingStatusBtn.textContent = book.readingStatus;
            });


            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("del-btn")
            deleteBtn.textContent = "delete me"
            deleteBtn.addEventListener("click" , (e) =>{
                card.remove() // remove the card from display
                library.splice(library.indexOf(book) , 1) // remove the card from the library
            });
            


            card.append(title, authorSpan, author, pagesSpan, pagesNumber, readingStatusBtn, deleteBtn); // appending all the elements to the card to display it later

            title.textContent = book.title;
            author.textContent = book.author;
            pagesNumber.textContent = book.pagesNumber;
            readingStatusBtn.textContent = book.readingStatus;

            // the same for each book
            authorSpan.textContent = "Author:";
            pagesSpan.textContent = "Pages:";

            allCardsContainer.appendChild(card); // finally, appending the card to the card container
        
        };
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) =>{    
    // event.preventDefault() not needed because the form doesn't submit it self if it's method is set to "dialog"

    const bookTitleValue= document.querySelector("#title").value; // getting the book title
    const bookAuthorValue = document.querySelector("#author").value; // getting the book author 
    const numberOfPagesValue = document.querySelector("#pages-number").value; // getting book pages number
    
    const bookReadingStatusValue = document.querySelector("input[name='reading-status']:checked").value;// getting the checked radio button

    
    addBookToLibrary(bookTitleValue, bookAuthorValue, numberOfPagesValue, bookReadingStatusValue);
    (document.querySelector("form")).reset(); // resetting the form
    displayBooks(library);

});
