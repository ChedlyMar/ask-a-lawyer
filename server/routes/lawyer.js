import express from "express";
import {
  createLawyer,
  deleteLawyer,
  getLawyerById,
  getLawyers,
  signup,
  login,
  currentLawyer,
  updateLawyer,
} from "../controllers/lawyer.js";
import { isAuthLawyer } from "../middleware/passport.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/current", isAuthLawyer, currentLawyer);

router.get("/", getLawyers);
router.post("/", createLawyer);
router.get("/:id", getLawyerById);
router.patch("/:id", updateLawyer);
router.delete("/:id", deleteLawyer);

export default router;
