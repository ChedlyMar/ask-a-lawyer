import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

// DB
import connectDB from "./config/dbConnect.js";

// Routes
import userRouter from "./routes/user.js";
import lawyerRouter from "./routes/lawyer.js";
import conversationRouter from "./routes/conversations.js";
import messageRouter from "./routes/messages.js";

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

dotenv.config();
const app = express();

app.use(cors());
app.use("/images", express.static("images"));
app.use(express.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("file")
);

const PORT = process.env.PORT || 5000;

// connect to db
connectDB();

// routes
app.use("/user", userRouter);
app.use("/lawyer", lawyerRouter);
app.use("/conversation", conversationRouter);
app.use("/message", messageRouter);

app.get("/", (req, res) => {
  res.send("Hello to LCPT API");
});

// run server
app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`server started on port ${PORT}`);
});
