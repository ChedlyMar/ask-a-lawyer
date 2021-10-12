import Conversation from "../models/Conversation.js";

// new conversation
export const createConversation = async (req, res) => {
  const { userId, lawyerId } = req.body;

  try {
    const foundConversation = await Conversation.findOne({ userId, lawyerId });

    if (foundConversation) res.status(200).json(foundConversation);
    else {
      const newConversation = new Conversation({
        userId,
        lawyerId,
      });

      const savedConversation = await newConversation.save();

      res.status(200).json(savedConversation);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getLawyerConversations = async (req, res) => {
  const { lawyerId } = req.params;

  try {
    const conversation = await Conversation.find({ lawyerId });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get conv of a user
export const getConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversation = await Conversation.find({ userId });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
