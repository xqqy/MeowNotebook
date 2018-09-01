<?php header("Access-Control-Allow-Origin:*");?>
<?php


    require("locheck.php");
    locheck();

$list=$userdb->prepare("DELETE FROM `".$_POST['UID']."` WHERE ATID=?");
if($list->execute(array($_POST['ATID']))){
    die("done");
}else{
    die("ATID不存在或数据库错误");
}


?>