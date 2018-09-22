<?php header("Access-Control-Allow-Origin:*");?>
<?php



    require("locheck.php");
    locheck();



if($list=$userdb->query("SELECT `TITLE`,`ATID` FROM `".$_POST['UID']."`")){
    $ret="";
    while ($row = $list->fetch()) {
        $ret.="/meow/".$row['ATID']."/meow/".$row['TITLE'];
      }
      echo "done".$ret;
}else{
    die("账户不存在");
}

?>