<?php header("Access-Control-Allow-Origin:*");?>
<?php

    require("locheck.php");
    locheck();



$list=$userdb->prepare("SELECT TITLE,HTML FROM `".$_POST['UID']."` WHERE ATID=?");
if($list->execute(array($_POST['ATID']))){
    if($row = $list->fetch()){
        die("done/meow/".$row['TITLE']."/meow/".$row['HTML']);
    }else{
        die("查无此号");
    }
}else{
    die("数据库错误");
}

?>