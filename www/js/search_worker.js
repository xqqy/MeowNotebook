//喵搜索页面库！
//获取信息格式：搜索文本、搜索地址、登录用UID、登录用TOKEN
//返回：结果项目
var list, all;

onmessage = onmsg;

function onmsg(e) {
    if (!list || !all) {//初始化列表
        list=e.data[1];
        all=e.data[2];
    }
    var now = 1,
        ret = "";
    while (now < all) {
        if (list[now+1].toUpperCase().indexOf(e.data[0].toUpperCase()) > -1) {
            ret += '<a href="#" class="collection-item" onclick="ati(' + "'" + list[now] +"'"+ ')">' + list[now+1] +'</a>'; //信息格式：done、ATID、ATNAME
        }
        now += 2;
    }
    postMessage(ret);
};