var app = {
	// Application Constructor
	initialize: function () {
		document.addEventListener('DeviceReady', this.ready.bind(this), false);

	},
	ready: function () {
		if (sessionStorage.getItem("edit")) {
			get();
		}
		document.addEventListener("backbutton", this.onBackKeyDown.bind(this), false);
		document.body.style.animation = "showen 0.3s forwards";
		$('#summernote').summernote({
			placeholder: '喵～',
			lang: 'zh-CN',
			height: window.innerHeight - 310
		});
		if (localStorage.getItem("title")) {
			document.getElementById("title").value = localStorage.getItem("title")
			$('#summernote').summernote('code', localStorage.getItem("html"));
		}
	},
	onBackKeyDown: function (e) {
		loc("index.html")
	}
}
app.initialize();

function get() {//获取错题信息
    var data = new FormData;
    data.append("ATID", sessionStorage.getItem("edit"));
        data.append("TOKEN", localStorage.getItem("token"));
        data.append("UID", localStorage.getItem("uid"));
    var xhr = new XMLHttpRequest;
    xhr.open("post", localStorage.getItem("server") + "get.php", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                if (xhr.responseText.split("/meow/")[0] == "done") {
					document.getElementById("title").value = xhr.responseText.split("/meow/")[1];
					$('#summernote').summernote('code', xhr.responseText.split("/meow/")[2]);
					document.getElementById("titlelabel").className="active";
					sessionStorage.setItem("editing",sessionStorage.getItem("edit"));
                    }else {
						dialogAlert(xhr.response.split("/meow/")[0]);
					}
                }else {
					dialogAlert("网络错误，HTTP代码：" + xhr.status);
				}
				sessionStorage.removeItem("edit")
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
		callback
	}
}

function loc(lo) { //动画跳转
	document.body.addEventListener("animationend", function () {
		document.location = lo;
	}.bind(this))
	document.body.style.animation = "hidden 0.3s forwards";
}


function mob() { //提交更改
	var data = new FormData();
	if(document.getElementById("title").value=="" ||$('#summernote').summernote('code')==""){
		dialogAlert("输入不能为空");
		return;
	}
	data.append("UID", localStorage.getItem("uid"));
	data.append("TOKEN", localStorage.getItem("token"));
	data.append("TITLE", document.getElementById("title").value)
	data.append("HTML", $('#summernote').summernote('code'));
	var xhr = new XMLHttpRequest();
	if(sessionStorage.getItem("editing")){
		xhr.open("post", localStorage.getItem("server") + "change.php");
		data.append("ATID",sessionStorage.getItem("editing"));
		sessionStorage.removeItem("editing")
	}else{
		xhr.open("post", localStorage.getItem("server") + "add.php");
	}
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				if (xhr.responseText == "done") {
					dialogAlert("设置成功", "成功","确定",function(){loc("index.html");});
					localStorage.removeItem("title");
					localStorage.removeItem("html");
				} else {
					localStorage.setItem("title", document.getElementById("title").value);
					localStorage.setItem("html", $('#summernote').summernote('code')+"<br>");
					dialogAlert("已保存本地浏览器草稿，服务器返回：" + xhr.response);
				}
			} else {
				localStorage.setItem("title", document.getElementById("title").value);
				localStorage.setItem("html", $('#summernote').summernote('code'));
				dialogAlert("网络错误，已保存本地浏览器草稿，http代码：" + xhr.status);
			}
		}
	}
	xhr.send(data); //将内容发送至服务器
}
