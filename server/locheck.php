<?php
class SQLitePDO extends PDO {//sqlite驱动
    function __construct($filename) {
        $filename = realpath($filename);
        parent::__construct('sqlite:' . $filename);
    }
}

try {
$userdb=new SQLitePDO("./meowdb.db");}//结构：UID，姓名，密码,TOKEN123密码验证 user.db
catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}
function locheck(){
global $userdb;

$userdb->exec('CREATE TABLE "users" (
	`UID`	varchar(255) NOT NULL,
	`PSWD`	varchar(255) NOT NULL,
	`TOKEN1`	varchar(255),
	`TOKEN2`	varchar(255),
	`TOKEN3`	varchar(255),
	`USERNAME`	varchar(255) NOT NULL,
	PRIMARY KEY(`UID`)
)');
//创建如果表不存在


$user=$userdb->prepare("SELECT `TOKEN1`,`TOKEN2`,`TOKEN3` FROM `users` WHERE UID=?");
if($user->execute(array($_POST['UID']))){
   if($row = $user->fetch()){
        if(!(hash_equals($_POST['TOKEN'],$row['TOKEN1']) or hash_equals($_POST['TOKEN'],$row['TOKEN2']) or hash_equals($_POST['TOKEN'],$row['TOKEN3']))){
            die("登录信息无效，请重新登录");
        }

    }else{
        die("登录信息无效");
    }
}else{
    die("数据库错误");
}
}
?>