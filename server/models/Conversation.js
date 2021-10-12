import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userId: { type: String },
    lawyerId: { type: String },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversation", conversationSchema);

export default Conversation;
