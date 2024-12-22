import * as bookService from "../services/bookService.js";
import { CustomError } from "../utils/customError.js";

export const searchBook = async (req, res, next) => {
  try {
    const { author, title } = req.query;

    const books = await bookService.searchBooks(author, title);

    if (books.length === 0) {
      throw new CustomError("books not found!", 404);
    }

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookByISBN = async (req, res, next) => {
  try {
    const { isbn } = req.params;
    const book = await bookService.getABook(isbn);

    if (!book) {
      throw new CustomError(`Book not found with ISBN: ${isbn}`, 404);
    }

    return res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBookReviews = async (req, res, next) => {
  try {
    const { isbn } = req.params;

    const book = await bookService.getABook(isbn);

    if (!book) {
      throw new CustomError(`Book not found with ISBN: ${isbn}`, 404);
    }
    const reviews = book?.reviews || [];

    if (reviews.length === 0) {
      throw new CustomError("This book have no review", 404);
    }
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

export const createNewBook = async (req, res, next) => {
  try {
    const newBook = req.body;
    const createdBook = await bookService.createBook(newBook);
    if (!createdBook) {
      throw new Error();
    }

    res.status(201).json(createdBook);
  } catch (error) {
    next(error);
  }
};

export const updateABook = async (req, res, next) => {
  try {
    const { isbn } = req.params;
    const bookData = req.body;
    const updatedBook = await bookService.updateBook(isbn, bookData);

    if (!updatedBook) {
      throw new Error();
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const removeABook = async (req, res, next) => {
  try {
    const { isbn } = req.params;
    await bookService.deleteBook(isbn);
    res.status(200).json({ message: "deleted." });
  } catch (error) {
    next(error);
  }
};

export const addBookReview = async (req, res, next) => {
  try {
    // lay data isbn, review_data
    const { isbn } = req.params;
    const reviewData = req.body;
    const email = req.user.username;
    const reviewAdded = await bookService.addBookReview(
      isbn,
      reviewData,
      email
    );
    res.status(200).json({ message: "review added", review: reviewAdded });
  } catch (error) {
    next(error);
  }
};
