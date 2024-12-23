import * as bookModel from "../models/bookModel.js";
import { getUserByEmail } from "../models/userModel.js";
import { CustomError } from "../utils/customError.js";

export const searchBooks = async (author, title) => {
  let books = await bookModel.getAll();

  if (author) {
    books = books.filter((book) => {
      const regex = new RegExp(author, "i");
      return regex.test(book.author);
    });
  }

  if (title) {
    books = books.filter((book) => {
      const regex = new RegExp(title, "i");
      return regex.test(book.title);
    });
  }

  return books;
};

export const getABook = async (isbn) => {
  return await bookModel.findByISBN(isbn);
};

export const createBook = async (newBook) => {
  const book = await bookModel.findByISBN(newBook.isbn);

  if (book) {
    throw new CustomError("book already exist!", 409);
  }

  newBook.reviews = [];

  return bookModel.save(newBook);
};

export const updateBook = async (isbn, payload) => {
  let book = await bookModel.findByISBN(isbn);

  if (!book) {
    throw new CustomError("book not exist!", 404);
  }

  book = { ...book, ...payload };
  return bookModel.save(book);
};

export const deleteBook = async (isbn) => {
  let book = await bookModel.findByISBN(isbn);

  if (!book) {
    throw new CustomError("book not exist!", 404);
  }

  bookModel.deleteByISBN(isbn);
};

export const addBookReview = async (isbn, reviewData, email) => {
  // check isbn ton tai va lay book
  let book = await bookModel.findByISBN(isbn);
  if (!book) {
    throw new CustomError("book not exist!", 404);
  }

  // check user da mua book do chua
  const user = await getUserByEmail(email);
  if (!user) {
    throw new CustomError("user not found!", 404);
  }
  const isBookExist = user.purchasedBooks.some((isbn) => isbn === isbn);
  if (!isBookExist) {
    throw new CustomError("You can't review books you haven't purchased", 403);
  }

  //kiem tra user da binh luan truoc do chua?
  const isUserReviewed =
    book?.reviews.some((review) => review.uid === user.uid) || false;
  if (isUserReviewed) {
    throw new CustomError(
      "Bad request! Do not use this endpoint to update reviews.",
      400
    );
  }

  // chuan bi review object
  const newReview = {
    ...reviewData,
    ...{ uid: user.uid, reviewerName: user.full_name, date: new Date() },
  };

  // add review vao book
  book.reviews.push(newReview);

  // goi update book tu model
  await bookModel.save(book);

  return newReview;
};

export const updateABookReview = async (isbn, reviewData, email) => {
  // check isbn ton tai va lay book
  let book = await bookModel.findByISBN(isbn);
  if (!book) {
    throw new CustomError("book not exist!", 404);
  }

  // check user da mua book do chua
  const user = await getUserByEmail(email);
  if (!user) {
    throw new CustomError("user not found!", 404);
  }
  const isBookExist = user.purchasedBooks.some((isbn) => isbn === isbn);
  if (!isBookExist) {
    throw new CustomError("You can't review books you haven't purchased", 403);
  }

  // lay index cua review
  const reviewIndex = book.reviews.findIndex(
    (review) => review.uid === user.uid
  );
  if (reviewIndex === -1) {
    throw new CustomError(
      "Bad request! Do not use this endpoint to create new reviews.",
      400
    );
  }

  // update review
  book.reviews[reviewIndex].rating = reviewData.rating;
  book.reviews[reviewIndex].comment = reviewData.comment;

  // goi update book tu model
  await bookModel.save(book);
  return book.reviews[reviewIndex];
};

// {
//   uid: "user1",
//   reviewerName: "John Doe",
//   rating: 5,
//   comment: "A masterpiece of African literature.",
//   date: new Date("2024-01-10T12:00:00Z"),
// }

// {
//   uid: "user1",
//   email: "johnsmith@gmail.com",
//   password: "123",
//   full_name: "John Doe",
//   role: "customer",
//   DOB: new Date("1990-12-22T00:00:00Z"),
//   purchasedBooks: [
//     "9780385474542", // Things Fall Apart
//   ],
// }
