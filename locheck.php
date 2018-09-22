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
function tokenchec($data,$post){
    if(empty($data) or empty($post)){
        if(empty($post) and empty($data)){
            return true;
        }else{
            return false;
        }
    }
    return hash_equals($data,$post);
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


$user=$userdb->prepare("SELECT `TOKEN1`,`TOKEN2`,`TOKEN3`,`KTOKEN`,`OTOKEN` FROM `users` WHERE UID=?");
if($user->execute(array($_POST['UID']))){
   if($row = $user->fetch()){
        if(!(tokenchec($row['TOKEN1'],$_POST['TOKEN']) or tokenchec($row['TOKEN2'],$_POST['TOKEN']) or tokenchec($row['TOKEN3'],$_POST['TOKEN'])or tokenchec($row['KTOKEN'],$_POST['TOKEN'])or tokenchec($row['OTOKEN'],$_POST['TOKEN']))){
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