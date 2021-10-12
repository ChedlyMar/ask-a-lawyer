import express from "express";
import { createUser } from "../controllers/user.js";
import { createLawyer } from "../controllers/lawyer.js";

const router = express.Router();

// sign in
router.post("/signup-user", createUser);
router.post("/signup-lawyer", createLawyer);

// login

// router.get("/", getUsers);
// router.get("/:id", getUserById);
// router.post("/", createUser);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
