import express from "express";
import {
  createConversation,
  getLawyerConversations,
  getConversations,
} from "../controllers/conversation.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/lawyer/:lawyerId", getLawyerConversations);

router.get("/:userId", getConversations);

export default router;
