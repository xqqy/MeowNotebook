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
        `UID` varchar(255) NOT NULL ,
        `PSWD` varchar(255) NOT NULL ,
        `TOKEN` varchar(255) NOT NULL ,
        `USERNAME` varchar(255) NOT NULL,
        PRIMARY KEY (`UID`)
      ) ;");
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


$list=$userdb->prepare("DELETE FROM `".$_POST['UID']."` WHERE ATID=?");
if($list->execute(array($_POST['ATID']))){
    die("done");
}else{
    die("ATID不存在或数据库错误");
}


?>