import express from "express";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/customers", customerRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
