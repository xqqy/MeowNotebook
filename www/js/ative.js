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
                    document.getElementById("iframe").srcdoc = "<h1>" + xhr.responseText.split("/meow/")[1] + "</h1><br>" + xhr.responseText.split("/meow/")[2]+'<style>table,th,td{border:0}table{width:100%;display:table;border-collapse:collapse;border-spacing:0}table.striped tr{border-bottom:0}table.striped>tbody>tr:nth-child(odd){background-color:rgba(242,242,242,0.5)}table.striped>tbody>tr>td{border-radius:0}table.highlight>tbody>tr{-webkit-transition:background-color .25s ease;transition:background-color .25s ease}table.highlight>tbody>tr:hover{background-color:rgba(242,242,242,0.5)}table.centered thead tr th,table.centered tbody tr td{text-align:center}tr{border-bottom:1px solid rgba(0,0,0,0.12)}td,th{padding:15px 5px;display:table-cell;text-align:left;vertical-align:middle;border-radius:2px}@media only screen and (max-width:992px){table.responsive-table{width:100%;border-collapse:collapse;border-spacing:0;display:block;position:relative}table.responsive-table td:empty:before{content:"\00a0"}table.responsive-table th,table.responsive-table td{margin:0;vertical-align:top}table.responsive-table th{text-align:left}table.responsive-table thead{display:block;float:left}table.responsive-table thead tr{display:block;padding:0 10px 0 0}table.responsive-table thead tr th::before{content:"\00a0"}table.responsive-table tbody{display:block;width:auto;position:relative;overflow-x:auto;white-space:nowrap}table.responsive-table tbody tr{display:inline-block;vertical-align:top}table.responsive-table th{display:block;text-align:right}table.responsive-table td{display:block;min-height:1.25em;text-align:left}table.responsive-table tr{border-bottom:0;padding:0 10px}table.responsive-table thead{border:0;border-right:1px solid rgba(0,0,0,0.12)}}</style>';
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
        document.getElementById("iframe").style.height = window.innerHeight - 110 + "px";
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
