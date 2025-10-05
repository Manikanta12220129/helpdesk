const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  status: { type: String, enum: ["open", "pending", "closed"], default: "open" }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", TicketSchema);
