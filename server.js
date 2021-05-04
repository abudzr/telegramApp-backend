require("dotenv").config();

// Port
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Package
const express = require('express')
const morgan = require('morgan')
const path = require("path");
const socket = require('socket.io')
const cors = require('cors')
const http = require('http')
const moment = require('moment')
moment.locale('id');

// Router
const router = require("./app/routers");

// Express
const app = express();
const httpServer = http.createServer(app)
const io = socket(httpServer, {
  cors: {
    origin: '*',
  }
})

const messageModel = require("./app/models/messagesModel")

// / socket io
io.on("connection", (socket) => {
  // console.log(socket);
  console.log("client terhubung dengan id " + socket.id);
  socket.on("initialUser", (idFrom) => {
    console.log(`user:${idFrom}`);
    socket.join(`user:${idFrom}`)
  })

  socket.on('sendMessage', async (data, callback) => {
    // console.log(data);
    const date = new Date()
    const dayNow = moment(date).format('dddd');
    const timeNow = moment(date).format('LT')
    const dateNow = moment(date).format('LL');
    const dataMessage = { ...data, time: timeNow, day: dayNow, date: dateNow }
    // console.log(dataMessage);
    const send = {
      idFrom: dataMessage.idFrom,
      idTo: dataMessage.idTo,
      chat: dataMessage.chat,
      type: "send",
      time: `${dataMessage.day}. ${dataMessage.time}`,
      date: dateNow,
    };
    const receiver = {
      idFrom: dataMessage.idTo,
      idTo: dataMessage.idFrom,
      chat: dataMessage.chat,
      type: "receive",
      time: `${dataMessage.day}. ${dataMessage.time}`,
      date: dateNow,
    };
    await messageModel.createMessages(send);
    await messageModel.createMessages(receiver);
    const getMessagesIdFrom = await messageModel.getMessageByIdSender(data.idFrom);
    const getMessagesIdTo = await messageModel.getMessageByIdSender(data.idTo);
    const result = [...getMessagesIdFrom, ...getMessagesIdTo];
    // const result = getMessagesIdFrom;
    io.to(`user:${data.idTo}`).emit('receiverMessage', result)
    callback(result)
    // io.to(`user:${data.idTo}`).emit('receiverMessage', dataMessage)
    // callback(dataMessage)
  })

  socket.on("disconnect", reason => {
    console.log("client disconnect " + reason);
  })
})


app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'server running'
  })
})

app.use("/api/v1", router);


app.use((err, req, res, next) => {
  if (err.message === "Uploaded file must be png, jpg or jpeg file") {
    res.status(400).send({
      status: false,
      message: err.message,
    });
  } else if (err.code === "LIMIT_FILE_SIZE") {
    res.status(400).send({
      status: false,
      message: "File image too large",
    });
  } else {
    res.status(404).send({
      status: false,
      message: err.message,
    });
  }
});

httpServer.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
})




// app.use("*", (req, res, next) => {
//   const err = new Error("Page not found");
//   next(err);
// });


// app.listen(port, () => {
//   console.log(`Server is running on http://${host}:${port}`);
// });
