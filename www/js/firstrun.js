function jump() { //检测是否已经登录，如没有，则跳转登录
  if(localStorage.getItem("loged")){
    document.body.addEventListener("animationend", function () {
      document.location = "index.html";
    });
    document.body.style.animation = "hidden 0.3s forwards";
  }else{
    localStorage.setItem("loged", "1");
    document.body.addEventListener("animationend", function () {
      document.location = "login.html";
    });
    document.body.style.animation = "hidden 0.3s forwards";
  }
}
function back(index) {
  if (index == 1) {
    navigator.app.exitApp();
  } else {
    return;
  }
}
var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('DeviceReady', this.ready.bind(this), false);
  },
  ready: function () {
    document.body.style.animation = "showen 0.3s forwards";
    document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
      localStorage.setItem("firstrun", "1.0.0.0");
      localStorage.setItem("server", "https://yourserver.com:12345/api/");
    document.getElementById("start").addEventListener("click", jump);
  },
  onBackKeyDown: function (e) {
    e.preventDefault();
    navigator.notification.confirm("", back, "您是指退出吗？", "是,否")
  }
}
app.initialize();
