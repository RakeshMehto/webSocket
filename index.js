//Requirements

const express = require("express");
const fs = require("fs");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const mongoose = require("mongoose");

//connecting to local mngodb
mongoose
  .connect("mongodb://localhost:27017/webSocketData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection seccessfull....."))
  .catch((err) => console.log(err));
//defining new document Schema
const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: String,
  designation: String,
});

//new Collection
const SocketData = new mongoose.model("SocketData", dataSchema);
//new web Scocket
const wss = new WebSocket.Server({ server: server });
const allFileContents = fs.readFileSync("sample.txt", "utf-8");
wss.on("connection", function connection(ws) {
  //trigger on new connection
  console.log("A new client Connected!");
  //trigger on requests recieved from cliet
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    //Reading file line by line
    allFileContents.split(/\r?\n/).forEach((line) => {
      ws.send(`Line from file: ${line}`);
      line = line.split(",");
      //Creating and Inserting data in Document
      const createDocument = async () => {
        try {
          const newDoc = new SocketData({
            name: line[0],
            department: line[1],
            designation: line[2],
          });
          const result = await newDoc.save();
          console.log(result);
        } catch (err) {
          console.log(err);
        }
      };
      createDocument();
    });
  });
});

server.listen(3000, () => console.log(`Lisening on port :3000`));
