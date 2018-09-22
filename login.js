function set() { //登录
    if (document.getElementById("UID").value == "" || document.getElementById("PSWD").value == "") {
        dialogAlert("登录信息不完整");
        return;
    }
    var req = new XMLHttpRequest;
    var doc = new FormData;
    doc.append("UID", document.getElementById("UID").value);
    doc.append("PSWD", document.getElementById("PSWD").value);
    doc.append("LOTYPE", "kindle");
    req.open("post","http://10.0.0.8/meow/login.php");

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                var respl=req.responseText.split("/meow/");
                if (respl[0] == "done") {
                    var uid=document.getElementById("UID").value;
                    setcookie("uid",uid,30);
                    setcookie("token", respl[1],30);
                    setcookie("name", respl[2],30);
                    loc("index.html")
                } else {
                    dialogAlert(req.responseText);
                }
            } else {
                dialogAlert("网络错误！HTTP代码：" + req.status, "网络错误！");
            }
        }
    }
    req.send(doc);
}
