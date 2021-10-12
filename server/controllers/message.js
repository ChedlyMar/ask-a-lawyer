import Message from "../models/Message.js";

// create message
export const createMessage = async (req, res) => {
  const newMessage = new Message(req.body);
  console.log("newMessage");
  console.log(newMessage);

  try {
    const savedMessage = await newMessage.save();

    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get getMessages
export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({
      conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
};
