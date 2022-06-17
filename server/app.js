const express = require("express");
const app = express();
const schedule = require("node-schedule");
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const { Server } = require("socket.io");
//能够跨域（ws）
const io = new Server(server, { cors: true });

app.use(cors());

let user;

io.on("connection", (socket) => {
  user = socket;
  //监听链接
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  //监听断开链接
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    //断开链接
    socket.disconnect(true);
  });
});

let rule = new schedule.RecurrenceRule();

rule.second = 0;
/**启动任务*/
schedule.scheduleJob(rule, () => {
  //触发定时任务 广播要发送的信息
  io.emit("chat message", "hi");
  console.log("代码更新了！");
});

server.listen(3002, () => {
  console.log("listening on *:3002");
});
