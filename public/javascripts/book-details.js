
/************************** CONSTANTS *****************************/

/**
 * @type {HTMLImageElement}
 */
const bookImage = document.getElementById('book-image');

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById('edit-book-form');

/**
 * @type {HTMLButtonElement}
 */
const uploadNewImg = document.getElementById('upload-new-img');

/**
 * @type {HTMLInputElement}
 */
const newImgInput = document.getElementById('new-img-input');

/**
 * @type {HTMLButtonElement}
 */
const addToCartBtn = document.getElementById('add-to-cart-confirm');

/**
 * @type {HTMLButtonElement}
 */
const reserveBook = document.getElementById('reserve-book-confirm');

/**
 * @type {HTMLSelectElement}
 */
const bookQty = document.getElementById('book-quantity');

/**
 * @type {HTMLButtonElement}
 */
const deleteBtn = document.getElementById('delete-book');

/**
 * @type {HTMLInputElement}
 */
const title = document.getElementById('title');

/**
 * @type {HTMLInputElement}
 */
const isReserved = document.getElementById('is-reserved');

/**
 * @type {HTMLSpanElement}
 */
const titleValidation = document.getElementById('title-validation');

/**
 * @type {HTMLInputElement}
 */
const author = document.getElementById('author');

/**
 * @type {HTMLSpanElement}
 */
const authorValidation = document.getElementById('author-validation');

/**
 * @type {HTMLInputElement}
 */
const isbn = document.getElementById('isbn');

/**
 * @type {HTMLSpanElement}
 */
const isbnValidation = document.getElementById('isbn-validation');

/**
 * @type {HTMLInputElement}
 */
const paper = document.getElementById('paper');

/**
 * @type {HTMLInputElement}
 */
const ebook = document.getElementById('ebook');

/**
 * @type {HTMLInputElement}
 */
const language = document.getElementById('languages-select');

/**
 * @type {HTMLParagraphElement}
 */
const languageInfo = document.getElementById('language-info');

/**
 * @type {HTMLInputElement}
 */
const publisher = document.getElementById('publisher');

/**
 * @type {HTMLSpanElement}
 */
const publisherValidation = document.getElementById('publisher-validation');

/**
 * @type {HTMLInputElement}
 */
const stockRange = document.getElementById('stock-range');

/**
 * @type {HTMLLabelElement}
 */
const stockRangeLabel = document.getElementById('stock-range-label');

/**
 * @type {HTMLInputElement}
 */
const pagesRange = document.getElementById('pages-range');

/**
 * @type {HTMLLabelElement}
 */
const pagesRangeLabel = document.getElementById('pages-range-label');

/**
 * @type {HTMLInputElement}
 */
const datePublished = document.getElementById('date-published');

/**
 * @type {HTMLSpanElement}
 */
const datePublishedValidation = document.getElementById('date-published-validation');

/**
 * @type {HTMLTextAreaElement}
 */
const description = document.getElementById('description');

/**
 * @type {HTMLParagraphElement}
 */
const descriptionInfo = document.getElementById('description-info');

/**
 * @type {HTMLSpanElement}
 */
const descriptionValidation = document.getElementById('description-validation');

/**
 * @type {HTMLInputElement}
 */
const price = document.getElementById('price');

/**
 * @type {HTMLSpanElement}
 */
const priceValidation = document.getElementById('price-validation');

/**
 * @type {HTMLButtonElement}
 */
const saveBtn = document.getElementById('save-btn');

/************************** EVENT LISTENERS *****************************/

let valid = true;

if (descriptionInfo) {
    descriptionInfo.innerHTML = `Remaining: ${250 - description.value.length}`;
    disableElement(saveBtn);
}

if (uploadNewImg) {
    uploadNewImg.addEventListener('click', () => {
        newImgInput.click();
    });
}

if (newImgInput) {
    newImgInput.addEventListener('change', (input) => {
        if (input.target.files && input.target.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                bookImage.setAttribute("src", e.target.result);
                bookImage.removeAttribute("hidden");
            };

            reader.readAsDataURL(input.target.files[0]);
            enableElement(saveBtn);
        }
    });
}

if (isReserved) {
    isReserved.addEventListener('change', () => {
        enableElement(saveBtn);
    });
}

if (title) {
    title.addEventListener('input', () => {
        if (!validateTitle(title.value)) {
            setValidationMessage(titleValidation, "Please enter a valid title name, must be between 1 and 100 characters");
            disableElement(saveBtn);
            valid = false;
        } else {
            clearValidationMsg(titleValidation);
            enableElement(saveBtn);
            valid = true;
        }
    });
}

if (author) {
    author.addEventListener('input', () => {
        if (!validateName(author.value)) {
            setValidationMessage(authorValidation, "Please enter a valid author name, must be between 1 and 100 characters");
            disableElement(saveBtn);
            valid = false;
        } else {
            clearValidationMsg(authorValidation);
            enableElement(saveBtn);
            valid = true;
        }
    });
}

if (isbn) {
    isbn.addEventListener('input', () => {
        if (!validateISBN(isbn.value)) {
            setValidationMessage(isbnValidation, "Please enter a valid ISBN");
            disableElement(saveBtn);
            valid = false;
        } else {
            clearValidationMsg(isbnValidation);
            enableElement(saveBtn);
            valid = true;
        }
    });
}

if (language) {
    language.addEventListener('change', () => {
        enableElement(saveBtn);
    });
}

if (paper) {
    paper.addEventListener('click', () => {
        enableElement(saveBtn);

        if (stockRange) {
            enableElement(stockRange);
            stockRange.value = 1;
            setLabel(stockRangeLabel, `In stock: ${stockRange.value}`);
        }
    });
}

if (ebook) {
    if (ebook.checked) {
        if (stockRange) {
            disableElement(stockRange);
            stockRange.value = 1;
            setLabel(stockRangeLabel, `In stock: ${stockRange.value}`);
        }
    }

    ebook.addEventListener('click', () => {
        enableElement(saveBtn);

        if (stockRange) {
            disableElement(stockRange);
            stockRange.value = 1;
            setLabel(stockRangeLabel, `In stock: ${stockRange.value}`);
        }
    });
}

if (publisher) {
    publisher.addEventListener('input', () => {
        if (!validateName(publisher.value)) {
            setValidationMessage(publisherValidation, "Please enter a valid publisher name, must be between 1 and 100 characters");
            disableElement(saveBtn);
            valid = false;
        } else {
            clearValidationMsg(publisherValidation);
            enableElement(saveBtn);
            valid = true;
        }
    });
}

if (datePublished) {
    datePublished.addEventListener('input', () => {
        if (!validateDate(datePublished.value)) {
            setValidationMessage(datePublishedValidation, "Please enter a valid date, must be in the past");
            disableElement(saveBtn);
            valid = false;
        } else {
            clearValidationMsg(datePublishedValidation);
            enableElement(saveBtn);
            valid = true;
        }
    });
}

if (description) {
    description.addEventListener('input', () => {

        descriptionInfo.innerHTML = `Remaining: ${250 - description.value.length}`;

        if (!validateDescription(description.value)) {
            setValidationMessage(descriptionValidation, "Please enter a valid description, must be between 1 and 250 characters");
            disableElement(saveBtn);
            valid = false;
        } else {
            clearValidationMsg(descriptionValidation);
            enableElement(saveBtn);
            valid = true;
        }
    });
}

if (price) {
    price.addEventListener('input', () => {
        if (!validatePrice(price.value)) {
            setValidationMessage(priceValidation, "Please enter a valid price");
            disableElement(saveBtn);
            valid = false;
        } else {
            clearValidationMsg(priceValidation);
            enableElement(saveBtn);
            valid = true;
        }
    });
}

if (stockRange) {
    stockRange.addEventListener('input', () => {
        enableElement(saveBtn);
        setLabel(stockRangeLabel, `In stock: ${stockRange.value}`);
    });
}

if (pagesRange) {
    pagesRange.addEventListener('input', () => {
        enableElement(saveBtn);
        setLabel(pagesRangeLabel, `Pages: ${pagesRange.value}`);
    });
}

if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
        if (!valid) {
            e.preventDefault();
        }
    });
}

if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
        const bookId = parseInt(addToCartBtn.getAttribute('data-id'));
        const quantity = parseInt(bookQty.value);

        if (bookId) {
            addToCart(bookId, quantity ? quantity : 1);
        }
    });
}

if (reserveBook) {
    reserveBook.addEventListener('click', () => {
        const bookId = parseInt(reserveBook.getAttribute('data-id'));
        const userId = parseInt(reserveBook.getAttribute('data-user'));

        if (bookId && userId) {
            createOrder(bookId, userId);
        }
    });
}

if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
        const bookId = parseInt(deleteBtn.getAttribute('data-id'));

        if (bookId) {
            deleteBook(bookId);
        }
    });
}

/************************** FETCH API *****************************/

/**
 * Using fetch API to add the book(s) to cart
 * @param {number} bookId id of the book
 * @param {number} quantity quantity chosen by the user
 */
function addToCart(bookId, quantity = 1) {
    fetch(`/sessions/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            bookId: bookId,
            quantity: quantity
        })
    }).then(res => {
        if (res.status === 200) {
            window.location.href = res.url;
        }
    }).catch(err => console.log(err));
}

/**
 * Using the fetch API to create a new order (reservation)
 * @param {number} bookId id of the book
 * @param {number} userId id of the user
 */
function createOrder(bookId, userId) {
    const body = {
        bookId: bookId,
        userId: userId,
    };

    fetch("/orders/reserve", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(res => {
        if (res.status === 200) {
            window.location.href = res.url;
        }
    }).catch(err => console.log(err));
}

/**
 * Using the fetch API to delete a book by its id
 * @param {number} bookId the book id
 */
function deleteBook(bookId) {
    fetch(`/books/${bookId}`, { method: "DELETE" })
        .then(res => {
            if (res.status === 200) {
                window.location.href = '/books';
            }
        }).catch(error => console.error('Error:', error));
}

/************************** VALIDATION *****************************/

/**
 * Checks if the book title is valid
 * @param {string} title title of the book
 * @returns true if title is valid, false otherwise
 */
function validateTitle(title) {
    return title.length > 0 && title.length <= 100;
}

/**
 * Checks name of author or publisher is valid
 * @param {string} name name to be validated
 * @returns true if name is valid, false otherwise
 */
function validateName(name) {
    return /^[a-z ,.'-]+$/i.test(name);
}

/**
 * Checks if isbn is valid
 * @param {string} isbn isbn of the book
 * @returns true if isbn is valid, false otherwise
 */
function validateISBN(isbn) {
    return /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/.test(isbn);
}

/**
 * Checks if date is valid
 * @param {string} date date of book publication
 * @returns true if date is valid, false otherwise
 */
function validateDate(date) {
    return /^\d{4}-\d{2}-\d{2}$/.test(date) && Date.now() > new Date(date).getTime();
}

/**
 * Checks if description is valid
 * @param {string} description description of the book
 * @returns true if description is valid, false otherwise
 */
function validateDescription(description) {
    return description.length > 0 && description.length <= 250;
}

/**
 * Checks if price is valid
 * @param {number} price price of the book
 * @returns true if price is valid, false otherwise
 */
function validatePrice(price) {
    return /^\d{0,8}(\.\d{1,2})?$/.test(price);
}

/**
 * Sets the validation message for the given element
 * @param {HTMLSpanElement} element 
 * @param {string} message 
 */
function setValidationMessage(element, message) {
    element.innerHTML = message;
}

/**
 * Clear validation message of the given HTML element
 * @param {HTMLSpanElement} validationElement HTML element to clear validation message
 */
function clearValidationMsg(validationElement) {
    validationElement.innerHTML = "";
}

/**
 * Sets the label of the given element
 * @param {HTMLLabelElement} label label to be set
 * @param {string} message message to be set
 */
function setLabel(label, message) {
    label.innerHTML = message;
}

/**
 * Enables a button
 * @param {HTMLElement} element element to be enabled
 */
function enableElement(element) {
    element.removeAttribute("disabled");
}

/**
 * Disables a button
 * @param {HTMLElement} element element to be disabled
 */
function disableElement(element) {
    element.setAttribute("disabled", "disabled");
}