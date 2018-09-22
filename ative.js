function xhr() { //获取错题信息
    var data = new FormData;
    data.append("ATID", getcookie("atid"));
    data.append("TOKEN", getcookie("token"));
    data.append("UID", getcookie("uid"));
    var xhr = new XMLHttpRequest;
    xhr.open("post", "http://10.0.0.8/meow/get.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var repl=xhr.responseText.split("/meow/")
                if (repl[0] == "done") {
                    document.getElementById("iframe").innerHTML = "<h1>" + repl[1] + "</h1><br>" + repl[2]+'<style>table,th,td{border:0}table{width:100%;display:table;border-collapse:collapse;border-spacing:0}table.striped tr{border-bottom:0}table.striped>tbody>tr:nth-child(odd){background-color:rgba(242,242,242,0.5)}table.striped>tbody>tr>td{border-radius:0}table.highlight>tbody>tr{-webkit-transition:background-color .25s ease;transition:background-color .25s ease}table.highlight>tbody>tr:hover{background-color:rgba(242,242,242,0.5)}table.centered thead tr th,table.centered tbody tr td{text-align:center}tr{border-bottom:1px solid rgba(0,0,0,0.12)}td,th{padding:15px 5px;display:table-cell;text-align:left;vertical-align:middle;border-radius:2px}@media only screen and (max-width:992px){table.responsive-table{width:100%;border-collapse:collapse;border-spacing:0;display:block;position:relative}table.responsive-table td:empty:before{content:"\00a0"}table.responsive-table th,table.responsive-table td{margin:0;vertical-align:top}table.responsive-table th{text-align:left}table.responsive-table thead{display:block;float:left}table.responsive-table thead tr{display:block;padding:0 10px 0 0}table.responsive-table thead tr th::before{content:"\00a0"}table.responsive-table tbody{display:block;width:auto;position:relative;overflow-x:auto;white-space:nowrap}table.responsive-table tbody tr{display:inline-block;vertical-align:top}table.responsive-table th{display:block;text-align:right}table.responsive-table td{display:block;min-height:1.25em;text-align:left}table.responsive-table tr{border-bottom:0;padding:0 10px}table.responsive-table thead{border:0;border-right:1px solid rgba(0,0,0,0.12)}}</style>';
                    //标题设为H1，空一行输出其他。添加表格样式，禁止JS
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




function del() {
    var data = new FormData;
    data.append("ATID", getcookie("atid"));
    data.append("TOKEN", getcookie("token"));
    data.append("UID", getcookie("uid"));
    var xhr = new XMLHttpRequest;
    xhr.open("post", "http://10.0.0.8/meow/del.php", true);
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

function delma(){
    if(window.confirm("确定删除吗？")){
        del();
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
        dialogAlert(message);
    }
}

function mob() {
    dialogAlert("Kindle版暂时不支持编辑");
}

var app = {
    // Application Constructor
    initialize: function () {
    },
    ready: function () {
        xhr();
    },
    onBackKeyDown: function (e) {
            loc("index.html");
    }
}
app.initialize();