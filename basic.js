function loc(lo){//跳转服务
    //document.location="kindle.html?lo="+lo;
    document.location=lo
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
        run(callback)
    }
}