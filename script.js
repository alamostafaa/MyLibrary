var myLibrary = [];
var count = localStorage.getItem("counter");


//Display new book form
var addBookButton = document.getElementById('AddNewBook');
var addBookForm = document.getElementById('Backg');
addBookButton.addEventListener('click', DisplayAddBookForm = () => addBookForm.style.display ="block")


//to close the form 
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  addBookForm.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == addBookForm) {
    addBookForm.style.display = "none";
  }
}

//add new book object
var btn = document.getElementById('ConfirmBook');
btn.addEventListener('click', AddBookToLibrary = (e) => {
  e.preventDefault();
  let authorName = document.getElementById("authorname").value;
  let bookTitle = document.getElementById('booktitle').value;
  let numberOfPages = document.getElementById('pages').value;
  let readBooks = document.querySelector('input[name="read_Q"]:checked').value;
  let newBook = new Book(authorName, bookTitle, numberOfPages, readBooks);
  window.localStorage.setItem(`book${count}`, JSON.stringify(newBook));
  count++;
  DisplayBooks(newBook);
});


//constractor 
function Book(author, title, numOfPages, read) {
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.read = read;
}

//Display the new book
let idCount =7 ;
const DisplayBooks = (newBook) => {

  let bookfrag = new DocumentFragment;
    //Book dev
    let dev = document.createElement('dev');
    dev.classList.add('book');
    dev.dataset.id = `${idCount}`;
    //book png
    let img = document.createElement('img');
    img.src = "pngfind.com-book-icon-png-487471.png";
    dev.appendChild(img);

    //author,title,numOfPages,read
    //book name
    let Bookname = document.createElement('h1');
    Bookname.innerText = `${newBook.title}`;
    dev.appendChild(Bookname)

    //authorname
    let autthor = document.createElement('h3');
    autthor.innerText = `${newBook.author}`;
    dev.appendChild(autthor)

    //number of pages
    let pagges = document.createElement('p');
    pagges.innerText = `${newBook.numOfPages}`
    dev.appendChild(pagges)
    bookfrag.appendChild(dev);
    //read status
    let status;
    if(newBook.read == "Yes")
    {
      status = `<h4>you have read it</h4>`
    }
    else
    {
      status = `<h4>you haven't read it yet</h4>`
    }
    dev.insertAdjacentHTML("beforeend",status);
    
    //Deletebutton
    let bttn = `<button type="button" onmouseover="Delete()" class="DeleteBookbtn" id="${idCount}">Delete</button>`
    dev.insertAdjacentHTML("beforeend",bttn);

    //Changebutton
    let Chngbttn =`<button type="button"  onmouseover="ChangeBookReadStatu()" class="StateReadbtn" id="${idCount}">changeRead</button>`
    dev.insertAdjacentHTML("beforeend",Chngbttn);

    idCount++;
    bookfrag.appendChild(dev);
    document.getElementsByClassName('bookshelf')[0].appendChild(bookfrag);
}

//Delete book
  let bookShelf = document.getElementsByClassName('bookshelf')[0];
  let Delete = () => {
    let delts = document.querySelectorAll('.DeleteBookbtn');
    delts.forEach((delt) => {
      delt.onclick = (e)=>{
        let elmdelt = document.querySelector(`[data-id="${e.target.id}"]`)
        bookShelf.removeChild(elmdelt);
        } 
    })
  }

  //for bookreadstate
const ChangeBookReadStatu =() =>
{

  let bookStatu = document.querySelectorAll('.StateReadbtn');
  bookStatu.forEach(book => {
    book.onclick = (e) =>{
      let elm = document.querySelector(`[data-id="${e.target.id}"]`)
      let readStatt = elm.getElementsByTagName('h4')[0];
  
      if (readStatt.innerText == "you have read it")
      {
        readStatt.innerText="you haven't read it yet";
      }
      else if (readStatt.innerText == "you haven't read it yet")
      {
        readStatt.innerText="you have read it"
      }

    }
  })
}