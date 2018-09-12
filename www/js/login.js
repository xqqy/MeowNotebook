function dialogAlert(message, title, buttonname, callback) { //通知服务
    title = title || "错误";
    buttonname = buttonname || "确定";
    callback = callback || function () {
        return;
    }
    if(navigator.notification){
        navigator.notification.alert(message, callback, title, buttonname);
    }else{
        alert(message);
    }
}
function jump() { //动画跳转
    document.body.addEventListener("animationend", function () {
        document.location = "index.html";
    }); 
    document.body.style.animation = "hidden 0.3s forwards";
}


function login() { //登录
    document.getElementById("loading").style.display="block";
    if (document.getElementById("UID").value == "" || document.getElementById("PSWD").value == "") {
        dialogAlert("登录信息不完整");
        document.getElementById("loading").style.display="none";
        return;
    }
    var req = new XMLHttpRequest;
    var doc = new FormData;
    doc.append("UID", document.getElementById("UID").value);
    doc.append("PSWD", document.getElementById("PSWD").value);
    req.open("post", localStorage.getItem("server") + "login.php", true);
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            document.getElementById("loading").style.display="none";
            if (req.status == 200) {
                if (req.responseText.split("/meow/")[0] == "done") {
                    localStorage.setItem("uid",document.getElementById("UID").value);
                    localStorage.setItem("token", req.responseText.split("/meow/")[1]);
                    localStorage.setItem("name", req.responseText.split("/meow/")[2]);
                    jump();
                } else {
                    dialogAlert(req.responseText);
                    document.getElementById("loading").style.display = "none";
                }
            } else {
                dialogAlert("网络错误！HTTP代码：" + req.status, "网络错误！");
            }
        }
    }
    req.send(doc);
}

function back(index) { // 退出系统
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
        if (localStorage.getItem("firstrun")!="0.1.2.2") {
            document.location="firstrun.html";
        }
    },
    ready: function () {
        document.body.style.animation = "showen 0.3s forwards";
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.getElementById("login").addEventListener("click", login);
    },
    onBackKeyDown: function (e) {
        e.preventDefault();
        navigator.notification.confirm("", back, "您是指退出吗？", "是,否")
    }
}
app.initialize();