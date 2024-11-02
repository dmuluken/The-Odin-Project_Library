// This part creates the books array
/********************************************************************************************* */
function Book(title, author, published, pages, read) {
    this.title = title;
    this.author = author;
    this.published = published;
    this.pages = pages;
    this.read = read;
}

bookArray = [];

var num = 1;  // This variable is a counter for the number of rows to be used as a row id
var finishedCount = 0;
var startedCount = 0;
var notStartedCount = 0;

var bookOne = new Book("The Lord of the Rings: The Two Towers", "J.R.R Tolkin", "1954-07-29", "423", "reading");
var bookTwo = new Book("The Lord of the Rings: The Felowship of the Ring", "J.R.R Tolkin", "1954-11-11", "352", "finished")
bookArray.push(bookOne);
bookArray.push(bookTwo);
// console.log(bookArray[0].title);
/********************************************************************************************* */

// this section adds new books

/********************************************************************************************* */
var addBook = document.querySelector("#addBook");
var addDialog = document.querySelector("#addDialog");
var addSubmit = document.querySelector("#addSubmit");
var addDialogClose = document.querySelector("#addClose");
var addTitleInput = document.querySelector("#addTitle");
var addAuthorInput = document.querySelector("#addAuthor");
var addPagesInput = document.querySelector("#addPages");
var addPublicationInput = document.querySelector("#addPublication");
var addStatusInput = document.querySelector("#addStatus");
var bookCount = document.querySelector(".bookCount");
var finishedBooks = document.querySelector(".finishedBooks");
var booksInProgress = document.querySelector(".booksInProgress");
var booksNotStarted = document.querySelector(".booksNotStarted");
var tempBook;
addBook.addEventListener("click", () => {
    addDialog.showModal();
});


addDialogClose.addEventListener("click", (e) => {
    addDialog.close();
});

addSubmit.addEventListener("click", (e) => {
    if (addTitleInput.value == "" || addAuthorInput.value == "" || addPublicationInput.value == "" || addPagesInput.value == "" || addStatusInput.value == "") {
        addDialog.close();
        return;
    }

    tempBook = new Book(addTitleInput.value, addAuthorInput.value, addPublicationInput.value, addPagesInput.value, addStatusInput.value);
    bookArray.push(tempBook);
    for (var i = 1; i < table.rows.length;) {
        table.deleteRow(i);
    }
    num = 1;
    addBookTable(bookArray);
    e.preventDefault();
    addDialog.close();
});

/********************************************************************************************* */

// this section creates a table
const main = document.querySelector(".main");

const table = document.createElement("table");
const tHead = document.createElement("thead");
const tBody = document.createElement("tbody");

main.appendChild(table);

generateTable();


/********************************************************************************************* */
function generateTable() {
    var headRow = document.createElement("tr");
    var bookTitle = document.createElement("th");
    var author = document.createElement("th");
    var publication = document.createElement("th");
    var pages = document.createElement("th");
    var progress = document.createElement("th");
    var blank = document.createElement("th");

    bookTitle.innerHTML = "Book Title";
    author.innerHTML = "Author";
    publication.innerHTML = "Publication Date";
    pages.innerHTML = "Pages";
    progress.innerHTML = "Progress";
    blank.innerHTML = "&nbsp";

    headRow.appendChild(bookTitle);
    headRow.appendChild(author);
    headRow.appendChild(publication);
    headRow.appendChild(pages);
    headRow.appendChild(progress);
    headRow.appendChild(blank);
    tHead.appendChild(headRow);
    table.appendChild(tHead);
    // main.appendChild(table);
}

addBookTable(bookArray);

function addBookTable(books) {
    for (var singleBook of books) {
        if (singleBook.read == "finished") {
            finishedCount++;
        } else if (singleBook.read == "reading") {
            startedCount++;
        } else if (singleBook.read == "notStarted") {
            notStartedCount++;
        }
        appendBook(singleBook);
        num++;
    }
    finishedCount = 0;
    startedCount = 0;
    notStartedCount = 0;
};

function appendBook(book) {
    var row = document.createElement("tr");
    var bookTitle = document.createElement("th");
    var author = document.createElement("td");
    var publication = document.createElement("td");
    var pages = document.createElement("td");
    var progress = document.createElement("td");
    var blank = document.createElement("td");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    var editImage = document.createElement("img");
    var deleteImage = document.createElement("img");
    var triStateToggle = document.createElement("div");
    var notStartedToggle = document.createElement("input");
    var readingToggle = document.createElement("input");
    var finishedToggle = document.createElement("input");
    var outputToggle = document.createElement("output");

    editImage.setAttribute("src", "images/edit.svg");
    deleteImage.setAttribute("src", "images/delete.svg");

    bookTitle.innerHTML = book.title;
    author.innerHTML = book.author;
    publication.innerHTML = book.published;
    pages.innerHTML = book.pages;


    notStartedToggle.setAttribute("class", `toggleButton${num}`);
    notStartedToggle.setAttribute("type", "radio");
    notStartedToggle.setAttribute("id", `notStarted`);
    readingToggle.setAttribute("class", `toggleButton${num}`);
    readingToggle.setAttribute("type", "radio");
    readingToggle.setAttribute("id", `reading`);
    finishedToggle.setAttribute("class", `toggleButton${num}`);
    finishedToggle.setAttribute("type", "radio");
    finishedToggle.setAttribute("id", `finished`);


    outputToggle.innerHTML = "Not Started";

    triStateToggle.setAttribute("class", "tri-state-toggle");

    triStateToggle.appendChild(notStartedToggle);
    triStateToggle.appendChild(readingToggle);
    triStateToggle.appendChild(finishedToggle);

    progress.appendChild(triStateToggle);
    progress.appendChild(outputToggle);

    editButton.appendChild(editImage);
    deleteButton.appendChild(deleteImage);

    deleteButton.setAttribute("id", `deleteButton`);
    editButton.setAttribute("id", "editButton");

    blank.appendChild(editButton);
    blank.appendChild(deleteButton);

    row.setAttribute("id", `${num}`);

    row.appendChild(bookTitle);
    row.appendChild(author);
    row.appendChild(publication);
    row.appendChild(pages);
    row.appendChild(progress);
    row.appendChild(blank);
    tBody.appendChild(row);
    table.appendChild(tBody);
    main.appendChild(table);

    var toggleButtons = document.getElementsByClassName(`toggleButton${num}`);
    var toggleArr = [...toggleButtons];

    toggleArr.forEach((element, index) => {
        if (element.id == book.read) {
            element.style.opacity = "1";

            toggleArr
                .filter(function (item) {
                    return item != element;
                })
                .forEach((item) => {
                    item.style.opacity = "0";
                });

            switch (element.id) {
                case ("notStarted"):
                    outputToggle.value = "Not Started";
                    triStateToggle.setAttribute("style", "border-color: #ADD8E6; background-color: #ffcccb;");
                    break;
                case ("reading"):
                    outputToggle.value = "Reading";
                    triStateToggle.setAttribute("style", "border-color: #ADD8E6; background-color: #FFFFC5;");
                    break;
                case ("finished"):
                    outputToggle.value = "Finished";
                    triStateToggle.setAttribute("style", "border-color: #ADD8E6; background-color: #90EEBF");
                    break;
                default:
                    break;
            }
        };
    });
    bookCount.textContent = bookArray.length;
    finishedBooks.textContent = finishedCount;
    booksInProgress.textContent = startedCount;
    booksNotStarted.textContent = notStartedCount;
};



// this next part is for the toggle button that controls the read or not read state

/********************************************************************************************* */
main.addEventListener("click", (event) => {
    target = event.target;
    if (target.type == "radio") {
        bookArray[target.parentNode.parentNode.parentNode.id - 1].read = target.id;
        for (var i = 1; i < table.rows.length;) {
            table.deleteRow(i);
        }
        num = 1;
        addBookTable(bookArray);
    }
})

/****************************************************************************************  */


/***************************************************************************************** */

// Delet event handler
var deleteButton = document.querySelectorAll(".deleteButton");
var deletArr = [...deleteButton];

table.addEventListener("click", (event) => {
    target = event.target;
    if (target.parentNode.id == "deleteButton") {
        deleteId = target.parentNode.parentNode.parentNode.id;
        deleteId = Number(deleteId);
        for (var i = 1; i < table.rows.length;) {
            table.deleteRow(i);
        }
        bookArray.splice(deleteId - 1, 1);
        num = 1;
        addBookTable(bookArray);
    }
});
/******************************************************************************************* */


/******************************************************************************************* */

// Edit event handler
table.addEventListener("click", (event) => {
    editTarget = event.target;
    if (editTarget.parentNode.id == "editButton") {
        var editDialog = document.querySelector("#editDialog");
        var editSubmit = document.querySelector("#editSubmit");
        var editDialogClose = document.querySelector("#editClose");
        var editTitleInput = document.querySelector("#editTitle");
        var editAuthorInput = document.querySelector("#editAuthor");
        var editPagesInput = document.querySelector("#editPages");
        var editPublicationInput = document.querySelector("#editPublication");
        var editStatusInput = document.querySelector("#editStatus");
        var tempBook;

        editId = editTarget.parentNode.parentNode.parentNode.id;
        editTitleInput.value = bookArray[editId - 1].title;
        editAuthorInput.value = bookArray[editId - 1].author;
        editPublicationInput.value = bookArray[editId - 1].published;
        editPagesInput.value = bookArray[editId - 1].pages;
        editStatusInput.value = bookArray[editId - 1].read;

        editDialog.showModal();

        editDialogClose.addEventListener("click", (e) => {
            editDialog.close();
            return;
        });

        editSubmit.addEventListener("click", (e) => {

            tempBook = new Book(editTitleInput.value, editAuthorInput.value, editPublicationInput.value, editPagesInput.value, editStatusInput.value);
            bookArray[editId - 1] = tempBook;
            for (var i = 1; i < table.rows.length;) {
                table.deleteRow(i);
            }
            num = 1;
            addBookTable(bookArray);
            e.preventDefault();
            editDialog.close();
        });
    }
})


/***************************************************************************************** */

