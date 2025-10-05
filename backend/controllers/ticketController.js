const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  const { title, description } = req.body;
  try {
    const ticket = new Ticket({ user: req.user._id, title, description });
    await ticket.save();
    res.status(201).json(ticket);
  } catch {
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id });
    res.json(tickets);
  } catch {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ _id: req.params.id, user: req.user._id });
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
  } catch {
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
};

exports.updateTicketStatus = async (req, res) => {
  const { status } = req.body;
  try {
    let ticket = await Ticket.findOne({ _id: req.params.id, user: req.user._id });
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch {
    res.status(500).json({ error: "Failed to update ticket" });
  }
};
