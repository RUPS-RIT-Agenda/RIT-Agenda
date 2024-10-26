import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));

app.use(cors({
    origin: 'http://localhost:3000', // Adjust this based on your frontend URL
    credentials: true, // Allow credentials (cookies)
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);

export default app;
