const Book = require('./book');

/**
 * @class Cart represents a shopping cart
 */
class Cart {

    /**
     * Creates a new cart
     * @param {Book} book book to add to the cart
     * @param {number} quantity quantity of the book to add
     */
    constructor(book, quantity) {
        this.items = [{
            book: book,
            quantity: quantity
        }];
        this.total = quantity;
        this.price = quantity * book.price;
    }
}

module.exports = Cart;