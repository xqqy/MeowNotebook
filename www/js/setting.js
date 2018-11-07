var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);

    },
    ready: function () {
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        if(localStorage.getItem("editoronresize")){
            document.getElementById("editorac").innerHTML="关闭";
        }else{
            document.getElementById("editorac").innerHTML="打开";
        }
        document.getElementById("username").innerHTML = localStorage.getItem("name")
        document.body.style.animation = "showen 0.3s forwards";
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
        
    },
    onBackKeyDown: function (e) {
        document.body.addEventListener("animationend", function () {
            document.location = "index.html";
        });
        document.body.style.animation = "hidden 0.3s forwards";
    }
}
app.initialize();

function clearall() {
    localStorage.clear();
    loc("firstrun.html")
}

function loc(lo) { //动画跳转
    document.body.addEventListener("animationend", function () {
        document.location = lo;
    }.bind(this))
    document.body.style.animation = "hidden 0.3s forwards";
}

function namechange() {
    if (document.getElementById("nname").value == "") {
        dialogAlert("您没有输入新名称");
    } else {
        var xhr = new XMLHttpRequest(),
            data = new FormData;
        xhr.open("post", localStorage.getItem("server") + "namechange.php", true);
        data.append("NNAME", document.getElementById("nname").value);
        data.append("UID", localStorage.getItem("uid"));
        data.append("TOKEN", localStorage.getItem("token"));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText == "done") {
                        dialogAlert("更改成功，请重新登录", "成功")
                        loc("logout.html");
                    } else {
                        dialogAlert(xhr.responseText);
                    }
                } else {
                    dialogAlert("网络不能连接,http代码" + xhr.status + xhr.responseText);
                }
            }
        }
        xhr.send(data);
    }
}

function pswdchange() {
    if (document.getElementById("opswd").value == "" || document.getElementById("npswd").value == "" || document.getElementById("rpswd").value == "") {
        dialogAlert("您没有输入新名称");
    } else if (document.getElementById("npswd").value != document.getElementById("rpswd").value) {
        dialogAlert("两次输入不一致");
        document.getElementById("npswd").value = ""
        document.getElementById("rpswd").value = ""
    } else {
        var xhr = new XMLHttpRequest(),
            data = new FormData;
        xhr.open("post", localStorage.getItem("server") + "pswdchange.php", true);
        data.append("OPSWD", document.getElementById("opswd").value);
        data.append("NPSWD", document.getElementById("npswd").value);
        data.append("UID", localStorage.getItem("uid"));
        data.append("TOKEN", localStorage.getItem("token"));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText == "done") {
                        dialogAlert("更改成功，请重新登录", "成功")
                        loc("logout.html");
                    } else {
                        dialogAlert(xhr.responseText);
                        document.getElementById("npswd").value = ""
                        document.getElementById("rpswd").value = ""
                    }
                } else {
                    dialogAlert("网络不能连接,http代码" + xhr.status + xhr.responseText);
                    document.getElementById("npswd").value = ""
                    document.getElementById("rpswd").value = ""
                }
            }
        }
        xhr.send(data);
    }
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

function editor(){
    if(localStorage.getItem("editoronresize")){
        localStorage.removeItem("editoronresize");
        document.getElementById("editorac").innerHTML="打开";
    }else{
        localStorage.setItem("editoronresize","true");
        document.getElementById("editorac").innerHTML="关闭";
    }
}