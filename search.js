//初始化列表和webworker
var list, all;
function netinit(){//发送网络包
var xhr = new XMLHttpRequest();
var data = new FormData;
data.append("UID", getcookie("uid"));
data.append("TOKEN", getcookie("token"));
xhr.open("post", "http://10.0.0.8/meow/list.php", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
        if (xhr.status == 200) {
            if (xhr.responseText.split("/meow/")[0] == "done") {
                list = xhr.responseText.split("/meow/");
                all = list.length
            } else {
                dialogAlert(xhr.responseText);
            }
        } else {
            dialogAlert("网络不能连接,http代码"+ xhr.status) ;
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
        var now = 1,
            ret = "";
        while (now < all) {
            if (list[now+1].toUpperCase().indexOf(document.getElementById("search").value.toUpperCase()) > -1) {
                ret += '<a href="#" class="collection-item" onclick="ati(' + "'" + list[now] +"'"+ ')">' + list[now+1] + '</a>'; //信息格式：done、ATID、ATNAME
            }
            now += 2;
        }
        document.getElementById("list").innerHTML = ret;
}



function ati(atid) { //显示改错内容
    setcookie("atid",atid)
    loc("ative.html");
}
var app = {
    // Application Constructor
    initialize: function () {
        
    },
    ready: function () {
        if (!getcookie("uid")) {
            loc("login.html")
        }else{
            netinit();
        }
        M.Sidenav.init(document.querySelectorAll('.sidenav'), {}); //初始化列表
        document.getElementById("search").style.width = document.body.clientWidth - 41 + "px"; //设置搜索按钮
    }
}
app.initialize();
