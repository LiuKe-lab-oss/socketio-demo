<template>
  <div>
    <form id="form">
      <input type="text" id="input" />
      <button type="submit">点我</button>
    </form>
    <div id="messages"></div>
  </div>
</template>
<script>
import { io } from "socket.io-client";
export default {
  data() {
    return {
      timer: {},
      socket: {},
    };
  },
  async mounted() {
    let that = this;
    //手动链接
    // that.socket = io({
    //   autoConnect: false,
    // });
    // that.socket.connect("http://localhost:3002")
    that.socket = io("http://localhost:3002");
    var messages = document.getElementById("messages");
    var form = document.getElementById("form");
    var input = document.getElementById("input");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (input.value) {
        that.socket.emit("chat message", input.value);
        input.value = "";
      }
    });

    //断开连接触发
    that.socket.on("disconnect", (reason) => {
      console.log(reason);
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });

    //手动断开
    // that.socket.disconnect();
    // // 是否与服务器链接或者断开
    // that.socket.on("connect", () => {
    //   console.log(that.socket.disconnected); // false
    // });
    //客户端接受服务器发送的信息
    that.socket.on("chat message", function (msg) {
      var item = document.createElement("li");
      item.textContent = msg;
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
    //监听链接错误
    that.socket.io.on("error", (error) => {
      // ...
      console.log(error);
    });
    //监听重新链接
    that.socket.io.on("reconnect", (attempt) => {
      // ...
      console.log(attempt);
    });
    // 从服务器接收到 ping 数据包时触发。
    that.socket.io.on("ping", () => {
      // ...
    });
  },

  destroyed() {},
};
</script>

<style lang='less' scoped>
</style>