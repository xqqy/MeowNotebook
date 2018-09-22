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



$user=$userdb->prepare("SELECT PSWD,USERNAME,TOKEN1,TOKEN2 FROM users WHERE UID=?");//读取密码、用户名、token123
if($user->execute(array($_POST['UID']))){
    
   if($row = $user->fetch()){
        if(password_verify($_POST['PSWD'],$row['PSWD'])){//如果密码验证通过则发放TOKEN，并将之前的token向后移动
            $rand=sha1(mt_rand());
            if(empty($_POST['LOTYPE'])){
                if(!$userdb->exec("UPDATE `users` SET `OTOKEN`='".$rand."' WHERE UID='".$_POST['UID']."'")){
                    die("数据库错误".__LINE__);
                }
            }else if($_POST['LOTYPE']=="kindle"){
                if(!$userdb->exec("UPDATE `users` SET `KTOKEN`='".$rand."' WHERE UID='".$_POST['UID']."'")){
                    die("数据库错误".__LINE__);
                }
            }else if($_POST['LOTYPE']=="saved"){
                if(!$userdb->exec("UPDATE `users` SET `TOKEN1`='".$rand."',`TOKEN2`='".$row['TOKEN1']."',`TOKEN3`='".$row['TOKEN2']."' WHERE UID='".$_POST['UID']."'")){
                    die("数据库错误".__LINE__);
                }
            }else{
                die("非法的登陆信息");
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