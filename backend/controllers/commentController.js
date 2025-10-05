import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { ticketId, message } = req.body;
    const comment = await Comment.create({
      ticket: ticketId,
      user: req.user.id,
      message
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
