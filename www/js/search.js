//初始化列表和webworker
var list, all,worker;
function netinit(){//发送网络包
worker = new Worker(getRootPath_dc()+"/js/search_worker.js");
worker.onmessage = function (e) {
    document.getElementById("list").innerHTML = e.data;
}

function getRootPath_dc() {//获取安装目录,通过navigator检测是否为安卓平台
    if (window.location.protocol=="file:"){
        return "file:///android_asset/www"
    }else{
        var pathName = window.location.pathname.substring(1);
        var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
        if (webName == "") {
            return window.location.protocol + '//' + window.location.host;
        }
        else {
            return window.location.protocol + '//' + window.location.host + '/' + webName;
        }
    }
}

var xhr = new XMLHttpRequest();
var data = new FormData;
data.append("UID", localStorage.getItem("uid"));
data.append("TOKEN", localStorage.getItem("token"));
xhr.open("post", localStorage.getItem("server") + "list.php", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            if (xhr.responseText.split("/meow/")[0] == "done") {
                list = xhr.responseText.split("/meow/");
                all = list.length
                localStorage.setItem("offline",xhr.responseText);
            } else {
                dialogAlert("正在使用本地缓存原因："+xhr.responseText);
                if (localStorage.getItem("offline")) { //使用离线缓存数据
                    list = localStorage.getItem("offline").split("/meow/")
                    all = list.length
                }
            }
        } else {
            dialogAlert("正在使用本地缓存原因：网络不能连接,http代码"+ xhr.status) ;
            if (localStorage.getItem("offline")) { //使用离线缓存数据
                list = localStorage.getItem("offline").split("/meow/")
                all = list.length
            }
        }
        flash(); //刷新列表
    }
}
xhr.send(data);
}


function back(index) { // 退出系统
    if (index == 1) {
        navigator.app.exitApp();
    } else {
        return;
    }
}

function flash() {
    if (window.Worker) { //按输入搜索
        worker.postMessage([document.getElementById("search").value, list, all]);
    } else {
        var now = 1,
            ret = "";
        while (now < all) {
            if (list[now+1].toUpperCase().indexOf(document.getElementById("search").value.toUpperCase()) > -1) {
                ret += '<a href="#" class="collection-item" onclick="ati(' + "'" + list[now] + ')">' + list[now+1] + '</a>'; //信息格式：done、ATID、ATNAME
            }
            now += 2;
        }
        document.getElementById("list").innerHTML = ret;

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

function loc(lo) {
    document.body.addEventListener("animationend", function () {
        document.location = lo;
    }.bind(this))
    document.body.style.animation = "hidden 0.3s forwards";
}

function ati(atid) { //显示改错内容
    sessionStorage.setItem("atid", atid);
    loc("ative.html");
}
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('DeviceReady', this.ready.bind(this), false);
        window.onresize = function () {
            document.getElementById("search").style.width = document.body.clientWidth - 25 + "px";
        }
    },
    ready: function () {
        if (localStorage.getItem("firstrun") != "0.1.1.1") { //检测是否为第一次运行这个版本，如果是的话跳到初始化页面
            loc("firstrun.html")
        }
        else if (!localStorage.getItem("uid")) {
            loc("login.html")
        }else{
            netinit();
        }
        M.Sidenav.init(document.querySelectorAll('.sidenav'), {}); //初始化列表
        document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
        document.getElementById("search").style.width = document.body.clientWidth - 25 + "px"; //设置搜索按钮
        document.body.style.animation = "showen 0.3s forwards";
        document.getElementById("username1").innerHTML = localStorage.getItem("name");
        document.getElementById("username2").innerHTML = localStorage.getItem("name");
        if (!localStorage.getItem("helper") && localStorage.getItem("firstrun") == "0.1.1.1") { //弹出帮助
            M.TapTarget.init(document.getElementById('helper'), {}).open();
            localStorage.setItem("helper", "done")
        }
    },
    onBackKeyDown: function (e) {
        e.preventDefault();
        navigator.notification.confirm("", back, "您是指退出吗？", "是,否")
    }
}
app.initialize();
