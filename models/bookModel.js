import { books } from "../mock/database.js";

export const getAll = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
};

export function findByISBN(isbn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books.find((book) => book.isbn === isbn));
    }, 1000);
  });
}

export const save = async (newBook) => {
  let book = await findByISBN(newBook.isbn);
  if (book) {
    Object.assign(book, newBook);
    //console.log(books[books.length - 1]);
    return book;
  }

  books.push(newBook);
  return newBook;
};

export const deleteByISBN = (isbn) => {
  const bookIndex = books.findIndex((book) => book.isbn === isbn);
  if (bookIndex === -1) return;
  books.splice(bookIndex, 1);
};
