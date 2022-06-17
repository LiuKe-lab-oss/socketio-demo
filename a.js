var id = setInterval(
  () => {
    if (new Date().getSeconds() == 0) {
      a()
      clearInterval(id);
    } else {
      console.log(`时间未到`);
    }
  },
  1000,
  id
);

function a() {
  b();
  setInterval(() => {
    b();
  }, 10000);
}
function b() {
  console.log("执行。。。");
}
