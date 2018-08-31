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



$user=$userdb->prepare("SELECT PSWD,USERNAME FROM users WHERE UID=?");
if($user->execute(array($_POST['UID']))){
    
   if($row = $user->fetch()){
        if(password_verify($_POST['PSWD'],$row['PSWD'])){
            $rand=sha1(mt_rand());
            if(!$userdb->exec("UPDATE `users` SET `TOKEN`='".$rand."' WHERE UID='".$_POST['UID']."'")){
                die("数据库错误29");
            }
            echo "done/meow/".$rand.'/meow/'.$row['USERNAME'];
        }else{
           die("密码错误");
        }
   }else{
       die("查无此人");
   }
    
}else{
    die("数据库错误");
}
?>