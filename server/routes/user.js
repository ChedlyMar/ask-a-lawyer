import express from "express";
import {
  getUsers,
  signup,
  login,
  currentUser,
  getUserById,
  deleteUser,
  // getUserById,
  updateUser,
} from "../controllers/user.js";
import { isAuth } from "../middleware/passport.js";
// import multer from "multer";

const router = express.Router();

// const upload = multer();

router.post("/signup", signup);
router.post("/login", login);
router.get("/current", isAuth, currentUser);

router.get("/:id", getUserById);

router.get("/", getUsers);
// router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
