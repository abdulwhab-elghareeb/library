
const library = [];

function Book(title, author, numberOfPages, readingStatus, id ){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
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
        case "Not Started":
            this.readingStatus = "Completed" ;
        
    };

};

function addBookToLibrary(bookTitle, bookAuthor, bookNumberOfPages, bookReadingStatus){
    book1 = new Book(bookTitle, bookAuthor, bookNumberOfPages, bookReadingStatus, crypto.randomUUID());
    library.push(book1);
};


function displayBooks(arrayOfBooks){
    const allCardsContainer = document.querySelector(".book-cards-container");

    arrayOfBooks.forEach(book => {

        if(!(document.querySelector(`[data-id = "${book.id}"]`))){// making sure that the book doesn't exist on the dom, avoiding duplicate books

            const card = document.createElement("div");
            card.classList.add("card") ; 
            card.setAttribute("data-id" , book.id) // adding id to each card to mark it 
            
            const titleContainer = document.createElement("div")
            const title = document.createElement("h1") ;
            titleContainer.append(title);
            titleContainer.classList.add("title-container")
            
            const author = document.createElement("div");
            author.classList.add("author"); 

            const numberOfPages = document.createElement("div");
            numberOfPages.classList.add("number-of-pages");

            const readingStatusBtn = document.createElement("button");
            readingStatusBtn.classList.add("reading-status-btn");
            addReadingBtnClass(book,readingStatusBtn) // adds a class depending on book.readingStatus
            readingStatusBtn.addEventListener("click", (e)=>{
                // toggling between reading status
                book.changeReadingStatus();
                adjustReadingBtnClass(book,readingStatusBtn);
                readingStatusBtn.textContent = book.readingStatus;
            });


            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("del-btn")
            deleteBtn.textContent = "delete me"
            deleteBtn.addEventListener("click" , (e) =>{
                card.remove() // remove the card from display
                library.splice(library.indexOf(book) , 1) // remove the card from the library
            });
            


            card.append(titleContainer, author, numberOfPages, readingStatusBtn, deleteBtn); // appending all the elements to the card to display it later

            title.textContent = book.title;
            author.textContent = book.author;
            numberOfPages.textContent = book.numberOfPages;
            readingStatusBtn.textContent = book.readingStatus;



            allCardsContainer.appendChild(card); // finally, appending the card to the card container
        
        };
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) =>{    
    // event.preventDefault() not needed because the form doesn't submit it self if it's method is set to "dialog"

    const bookTitleValue= document.querySelector("#title").value; // getting the book title
    const bookAuthorValue = document.querySelector("#author").value; // getting the book author 
    const numberOfPagesValue = document.querySelector("#number-of-pages").value; // getting book pages number
    
    const radioBtnId = document.querySelector("input[name='reading-status']:checked").id;
    const radioBtnValue = document.querySelector("input[name='reading-status']:checked").value;// getting the checked radio button

    
    addBookToLibrary(bookTitleValue, bookAuthorValue, numberOfPagesValue, radioBtnValue);
    (document.querySelector("form")).reset(); // resetting the form
    displayBooks(library);

});

// functions for toggling between reading status
function addReadingBtnClass(book , btn){
    let btnInitialClass;
    switch(book.readingStatus){
        case "Completed":
            btnInitialClass = "completed"
            break;

        case "Currently Reading":
            btnInitialClass = "currently-reading"
            break;

        case "Not Started":
            btnInitialClass = "not-started"
            break;
    };
    btn.classList.add(btnInitialClass)
}

function adjustReadingBtnClass(book,btn){
    switch(book.readingStatus){
        case "Completed":
            btn.classList.replace("not-started", "completed")
            break;

        case "Currently Reading":
            btn.classList.replace("completed", "currently-reading")
            break;

        case "Not Started":
            btn.classList.replace("currently-reading", "not-started")
            break;
    };
};