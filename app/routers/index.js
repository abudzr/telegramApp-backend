const express = require("express");
const route = express.Router();

const usersRouter = require("./usersRouter");
const messageRouter = require("./messageRouter");

route.use("/users", usersRouter);
route.use("/messages", messageRouter)
// route.use("/transaction", transactionRouter);

module.exports = route;
