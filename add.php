<?php header("Access-Control-Allow-Origin:*");?>
<?php


require("locheck.php");
locheck();

if($_POST['TITLE']=="" or $_POST['HTML']==""){
    die("标题和内容不能为空");
}

$list=$userdb->prepare("INSERT INTO `".$_POST['UID']."` (`TITLE`, `HTML`) VALUES (:TITLE, :HTML)");
$list->bindParam(":TITLE",$_POST['TITLE']);
$list->bindParam(":HTML",$_POST['HTML']);
if($list->execute()){
    die("done");
}else{
    die("数据库错误");
}


?>