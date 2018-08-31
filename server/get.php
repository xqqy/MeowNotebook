<?php header("Access-Control-Allow-Origin:*");?>
<?php
class SQLitePDO extends PDO {//sqlite驱动
    function __construct($filename) {
        $filename = realpath($filename);
        parent::__construct('sqlite:' . $filename);
    }
}

try {
    $userdb=new SQLitePDO("./meowdb.db");}//结构：UID，姓名，密码,TOKEN密码验证 user.db
    catch (PDOException $e) {
        print "Error!: " . $e->getMessage() . "<br/>";
        die();
    }

$userdb->exec("CREATE TABLE IF NOT EXISTS `users` (
    `UID` varchar(255) NOT NULL COMMENT '用户ID',
    `PSWD` varchar(255) NOT NULL COMMENT '密码',
    `TOKEN` varchar(255) NOT NULL COMMENT '随机码',
    `USERNAME` varchar(255) NOT NULL COMMENT '用户名',
    PRIMARY KEY (`UID`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表';
  COMMIT;");
//创建如果表不存在


$user=$userdb->prepare("SELECT TOKEN FROM users WHERE UID=?");
if($user->execute(array($_POST['UID']))){
   if($row = $user->fetch()){
        if(!hash_equals($_POST['TOKEN'],$row['TOKEN'])){
            die("密码错误");
        }

    }else{
        die("登录信息无效");
    }
}else{
    die("数据库错误");
}



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