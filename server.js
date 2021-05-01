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


// socket io

// / socket io
io.on("connection", (socket) => {
  console.log("client terhubung dengan id " + socket.id);

  socket.on("initialUser", (idFrom) => {
    socket.join(`user:${idFrom}`)
    console.log(`user:${idFrom}`);
  })

  socket.on('sendMessage', (data, callback) => {
    // console.log(data);
    // messageModels.insetMessage(data)
    const date = new Date()
    const timeNow = moment(date).format('LT')
    const dataMessage = { ...data, time: timeNow }
    console.log(dataMessage);
    io.to(`user:${data.idTo}`).emit('receiverMessage', dataMessage)
    callback(dataMessage)
  })


  // socket.on('sendMessage', async (data, callback) => {
  //   const date = new Date()
  //   const timeNow = moment(date).format('LT')
  //   const dateNow = moment().format('LL')
  //   const dataMessage = { ...data, createdAt: timeNow, date: dateNow }
  //   io.to(`user:${data.idTo}`).emit('receiverMessage', dataMessage)
  //   console.log('isi data', data);
  //   callback(dataMessage)
  //   console.log(dataMessage, 'isi data message');
  //   // dataMessage.id = uuidv4()

  //   // await messageModels.createMessages(dataMessage);
  // })

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
