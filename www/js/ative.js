function xhr() { //获取错题信息
    var data = new FormData;
    data.append("ATID", sessionStorage.getItem("atid"));
    data.append("TOKEN", localStorage.getItem("token"));
    data.append("UID", localStorage.getItem("uid"));
    var xhr = new XMLHttpRequest;
    xhr.open("post", localStorage.getItem("server") + "get.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText.split("/meow/")[0] == "done") {
                    document.getElementById("iframe").srcdoc = "<h1>" + xhr.responseText.split("/meow/")[1] + "</h1><br>" + xhr.responseText.split("/meow/")[2];
                    //标题设为H1，空一行输出其他。禁止JS
                } else {
                    dialogAlert(xhr.response.split("/meow/")[0]);
                }
            } else {
                dialogAlert("网络错误，HTTP代码：" + xhr.status);
            }
        }
    }
    xhr.send(data);
}

function loc(lo) {
    document.body.addEventListener("animationend", function () {
        document.location = lo;
    }.bind(this))
    document.body.style.animation = "hidden 0.3s forwards";
}


function del() {
    var data = new FormData;
    data.append("ATID", sessionStorage.getItem("atid"));
    data.append("TOKEN", localStorage.getItem("token"));
    data.append("UID", localStorage.getItem("uid"));
    var xhr = new XMLHttpRequest;
    xhr.open("post", localStorage.getItem("server") + "del.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText == "done") {
                    dialogAlert("删除成功", "成功","确定",function(){loc("index.html");});
                } else {
                    dialogAlert(xhr.response);
                }
            } else {
                dialogAlert("网络错误，HTTP代码：" + xhr.status);
            }
        }
    }
    xhr.send(data);
}

function dialogAlert(message, title, buttonname, callback) { //通知服务
    title = title || "错误";
    buttonname = buttonname || "确定";
    callback = callback || function () {
        return;
    }
    if (navigator.notification) {
        navigator.notification.alert(message, callback, title, buttonname);
    } else {
        alert(message);
    }
}

function mob() {
    sessionStorage.setItem("edit", sessionStorage.getItem("atid"));
    loc("editor.html");
}

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
    },
    ready: function () {
        var a = M.Modal.init(document.getElementById('modal1'), {});
        document.getElementById("del").addEventListener("click", () => {
            a.open()
        })
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.getElementById("iframe").style.height = window.innerHeight - 64 + "px";
        xhr();
        document.body.style.animation = "showen 0.3s forwards";
    },
    onBackKeyDown: function (e) {
        document.body.addEventListener("animationend", function () {
            document.location = "index.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();