const express = require("express");
const {
  createTicket,
  getUserTickets,
  getTicketById,
  updateTicketStatus
} = require("../controllers/ticketController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, createTicket);
router.get("/", auth, getUserTickets);
router.get("/:id", auth, getTicketById);
router.put("/:id", auth, updateTicketStatus);

module.exports = router;




// const express = require("express");
// const {
//   createTicket,
//   getTickets,
//   getTicketById,
//   updateTicket,
// } = require("../controllers/ticketController");
// const { protect } = require("../middleware/auth"); // auth middleware
// const router = express.Router();

// router.route("/").get(protect, getTickets).post(protect, createTicket);
// router.route("/:id").get(protect, getTicketById).put(protect, updateTicket);

// module.exports = router;
