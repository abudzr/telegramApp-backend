const express = require("express");
const router = express.Router();
const msgController = require("../controllers/messagesController");

router
    .post("/", msgController.sendMessage)
    .get("/:idFrom/:idTo", msgController.findMessages)
    .delete("/:id", msgController.deleteHistory)

module.exports = router;