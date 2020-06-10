class UI {
  constructor() {
    this.author = document.getElementById("author");
    this.title = document.getElementById("title");
    this.isbn = document.getElementById("isbn");
    this.formFeedback = document.getElementById("formFeedback")
    this.bookTable = document.getElementById("bookTable")
    this.list = [];
    this.itemID = 0;
  }

  submitBookForm(){

      if (author.value == "" ||
          title.value == "" ||
          isbn.value == ""){


        this.formFeedback.classList.remove("msg-success")
        this.formFeedback.classList.add("showItem")
        this.formFeedback.classList.add("msg-error")
          this.formFeedback.innerHTML = "<p> You must type <strong>title, author and isbn</strong> values to use this list</p>"

          setTimeout(()=>{
              this.formFeedback.classList.remove("showItem")
            this.formFeedback.classList.remove("msg-error")
              this.formFeedback.innerHTML = ""
          },10000)

          return
          }

      const book = {
        id: this.itemID, 
        title: this.title.value,
        author: this.author.value, 
        isbn: this.isbn.value}


    this.list.push(book)
    this.itemID++
    
      this.title.value =""
      this.author.value =""
      this.isbn.value =""
        
    this.updateBookList(book)

    this.updateLocalStorage()

    // Book add msg

    this.formFeedback.classList.remove("msg-error")
    this.formFeedback.classList.add("msg-success")
    this.formFeedback.classList.add("showItem")
    
    this.formFeedback.innerHTML = "<p>Book added</p>"

    setTimeout(() => {
      this.formFeedback.classList.remove("showItem")
      this.formFeedback.classList.remove("msg-success")
      this.formFeedback.innerHTML = ""
    }, 10000)


  }

  updateBookList(book){
      
    const tr = document.createElement("tr")
    tr.classList.add("booklist__row")
    
    tr.setAttribute("data-ID", book.id )
    //data-ID="${book.id}"
    tr.innerHTML =`
          <td class="booklist__item">${book.title}</td>
          <td class="booklist__item">${book.author}</td>
          <td class="booklist__item">${book.isbn}</td>
          <td class="btn__delete">x</td> 
       `

    this.bookTable.appendChild(tr)

  }

  loadLocalStorage(){
    const lastStorage = localStorage.getItem("bookList")
   
    if(lastStorage == null) return ;

    const lastStorageJson = JSON.parse(lastStorage)
    const lengthStorage = lastStorageJson.length -1

    this.itemID = lastStorageJson[lengthStorage].id + 1
    this.list = lastStorageJson

    this.list.forEach((item)=>{
      this.updateBookList(item)
    })

  }

  updateLocalStorage(){

    localStorage.clear()
    if(this.list[0] !== undefined) {
      localStorage.setItem("bookList", JSON.stringify(this.list))
    }


  }

  removeBookFromList(element){
    
    const elementParent = element.parentElement
    const elementID = element.getAttribute("data-id")

    this.list = this.list.filter((item)=>{
      return  item.id !== parseInt(elementID)
    })


    elementParent.removeChild(element)

    this.updateLocalStorage()
  }

}

function eventListeners() {
  const bookForm = document.getElementById("bookForm");
  const bookTable = document.getElementById("bookTable")
  const interface = new UI();

  interface.loadLocalStorage();



  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    interface.submitBookForm()
  });

  bookTable.addEventListener("click",(event)=>{
  
    const target = event.target
    if (target.classList.contains("btn__delete"))
      interface.removeBookFromList(target.parentElement)
  })
  
}

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});
