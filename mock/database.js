export const users = [
  {
    uid: "user1",
    email: "johnsmith@gmail.com",
    password: "123",
    full_name: "John Doe",
    role: "customer",
    DOB: new Date("1990-12-22T00:00:00Z"),
    purchasedBooks: [
      "9780385474542", // Things Fall Apart
      "9780805043120", //Molloy, Malone Dies, The Unnamable, the trilogy
    ],
  },
  {
    uid: "user2",
    email: "annasmith@gamil.com",
    password: "default_hashed_password",
    full_name: "Anna Smith",
    role: "customer",
    DOB: new Date("1983-07-02T00:00:00Z"),
    purchasedBooks: [
      "9780143039093", // Fairy Tales
      "9780374515402", // The Divine Comedy
    ],
  },
  {
    uid: "user3",
    email: "peterjones@gamil.com",
    password: "default_hashed_password",
    full_name: "Peter Jones",
    role: "customer",
    DOB: new Date("1989-03-21T00:00:00Z"),
    purchasedBooks: [
      "9780374515402", // The Divine Comedy
    ],
  },
  {
    uid: "user4",
    email: "clarkkent@gamil.com",
    password: "default_hashed_password",
    full_name: "Clark Kent",
    role: "customer",
    DOB: new Date("1992-03-01T00:00:00Z"),
    purchasedBooks: [
      "9780451531253", // The Book Of Job
    ],
  },
  {
    uid: "vendor1",
    email: "vendor1@gamil.com",
    password: "123",
    full_name: "Vendor Example",
    role: "vendor",
    DOB: new Date("1980-05-10T00:00:00Z"),
    addedBooks: [
      "9780385474542", // Things Fall Apart
      "9780143039093", // Fairy Tales
      "9780374515402", // The Divine Comedy
      "9780451531253", // The Book Of Job
      "9780062301673", // One Thousand and One Nights
      "9780140449198", // Njál's Saga
      "9780141439518", // Pride and Prejudice
      "9781857150206", // Le Père Goriot
      "9780805043120", // Molloy, Malone Dies, The Unnamable, the trilogy
    ],
  },
];

export const books = [
  {
    isbn: "9780385474542", // ISBN
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genres: ["Fiction", "Literature"],
    publishedDate: new Date("1958-06-01T00:00:00Z"),
    copies: 10,
    price: 15.99,
    reviews: [
      {
        uid: "user1",
        reviewerName: "John Doe",
        rating: 5,
        comment: "A masterpiece of African literature.",
        date: new Date("2024-01-10T12:00:00Z"),
      },
    ],
  },
  {
    isbn: "9780143039093",
    title: "Fairy Tales",
    author: "Hans Christian Andersen",
    genres: ["Fantasy", "Children"],
    publishedDate: new Date("1835-01-01T00:00:00Z"),
    copies: 10,
    price: 12.5,
    reviews: [],
  },
  {
    isbn: "9780374515402",
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    genres: ["Poetry", "Philosophy"],
    publishedDate: new Date("1320-01-01T00:00:00Z"),
    copies: 10,
    price: 20.0,
    reviews: [
      {
        uid: "user2",
        reviewerName: "Anna Smith",
        rating: 4,
        comment: "An intricate exploration of morality and the afterlife.",
        date: new Date("2024-01-12T14:30:00Z"),
      },
      {
        uid: "user3",
        reviewerName: "Peter Jones",
        rating: 5,
        comment: "A profound journey through the afterlife.",
        date: new Date("2024-01-15T11:00:00Z"),
      },
    ],
  },
  {
    isbn: "9780451531253",
    title: "The Book Of Job",
    author: "Unknown",
    genres: ["Religious", "Philosophy"],
    publishedDate: new Date("500-01-01T00:00:00Z"), // Thời gian cổ đại
    copies: 10,
    price: 18.0,
    reviews: [
      {
        uid: "user4", // user id thay cho ObjectId
        reviewerName: "Clark Kent",
        rating: 3,
        comment: "Interesting philosophical insights, but hard to follow.",
        date: new Date("2024-01-17T16:00:00Z"),
      },
    ],
  },
  {
    isbn: "9780062301673",
    title: "One Thousand and One Nights",
    author: "Unknown",
    genres: ["Fantasy", "Folklore"],
    publishedDate: new Date("1600-01-01T00:00:00Z"),
    copies: 10,
    price: 22.0,
    reviews: [],
  },
  {
    isbn: "9780140449198",
    title: "Njál's Saga",
    author: "Unknown",
    genres: ["Historical", "Saga"],
    publishedDate: new Date("1270-01-01T00:00:00Z"),
    copies: 10,
    price: 23.0,
    reviews: [],
  },
  {
    isbn: "9780141439518",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genres: ["Romance", "Classic"],
    publishedDate: new Date("1813-01-28T00:00:00Z"),
    copies: 10,
    price: 14.99,
    reviews: [],
  },
  {
    isbn: "9781857150206",
    title: "Le Père Goriot",
    author: "Honoré de Balzac",
    genres: ["Fiction", "Classic"],
    publishedDate: new Date("1834-01-01T00:00:00Z"),
    copies: 10,
    price: 16.5,
    reviews: [],
  },
  {
    isbn: "9780805043120",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    author: "Samuel Beckett",
    genres: ["Literature", "Existentialism"],
    publishedDate: new Date("1951-01-01T00:00:00Z"),
    copies: 10,
    price: 30.0,
    reviews: [],
  },
];
