# 喵笔记本<br>Meow Notebook

就是一个简单的云端笔记本，支持按照标题搜索和多用户管理<br>
A simple notebook with cloud services, support search by title and mutil-user management.
V0.1.1.1

## 配置服务端<br>Config server side

安装php5.5或更高版本（目前仅在php7.2版本测试过，应该行吧）运行环境，启用hash、pdo（及您想使用的数据库的pdo扩展）<br>
Install php5.5 or higher(I only tested at php7.2, but i think it should works), enable hash and pdo(also your database extensions)

详细的说明见[服务器的配置](./README_SERVER.md)<br>
For more information, see[How to config server](./README_SERVER.md)

将根目录下Server文件夹内所有文件复制到你喜欢的一个文件夹下<br>
Copy all document in server folder to where you wanted.

## 配置数据库<br>Config database

你可以选择你喜欢的数据库，只需要替换PDO代码即可<br>
You can choose what database you like as you change PDO code.

首先创建一个users表，语句为<br>
Create a table named "users",SQL:
`CREATE TABLE `users` (
    `UID` varchar(255) NOT NULL ,
    `PSWD` varchar(255) NOT NULL ,
    `TOKEN` varchar(255) NOT NULL ,
    `USERNAME` varchar(255) NOT NULL,
    PRIMARY KEY (`UID`)
  )`<br>
UID为用户ID，登录使用<br>
UID is a user id, for login.<br>
PSWD为使用PHP默认加密的密码，你可以通过password.php生成<br>
PSWD is this user's password, using default php encrypt. You can get it by password.php<br>
TOKEN为安全密钥<br>
TOKEN is secure password, you needn't to do anything to this.<br>
USERNAME为用户名<br>
USERNAME, is for user's name.<br>

然后为每个用户创建其用户名的表<br>
Then, create table for each user.
`CREATE TABLE "auser" (
	`ATID`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`TITLE`	text NOT NULL,
	`HTML`	text NOT NULL
)`<br>
这里的auser代指用户名<br>
There 'auser' represent username.<br>
ATID为自增主键<br>
ATID is a auto-increase key.<br>
TITLE为笔记标题<br>
TITLE is the title of a note.<br>
HTML为笔记内容<br>
HTML is the inner of a note.<br>

我们在服务端预制了一个meowdb.db，向其中添加用户名即可<br>
We have a meowdb.db for default, you can also use this for your database.

## 配置客户端<br>Config client side

你需要Cordova环境<br>
You need Cordova environment.

在/www/js/firstrun.js里面的<br>
Set this in/www/js/firstrun.js
>localStorage.setItem("server", "https://yourserver.com:12345/api/");

将此处值改为你的服务器地址即可<br>
Change the value to your server<br>
不要忘记加上最后的“/”<br>
Do not forget '/' at last


默认情况下，启用了Android和Web两个平台<br>
In default, Android and Web are enabled<br>
使用`Cordova build 目标平台`即可<br>
Use `Cordova build target` to build

## 文件说明<br>Documents
/www/内为程序代码<br>
Sources are in /www/<br>
/Server/内为服务端<br>
Server document are in /Server/<br>
meowdb.db是示例数据库<br>
meowdb.db is default database<br>
其余为Apache Cordova自动生成文件<br>
Others are Apache Cordova generated

## 未来开发规划<br>What next
1. 支持3个设备同时登录<br>
    Support 3 devices login at once.
2. 可以通过网页端修改密码<br>
    Change password online.
3. 一个简单的管理界面<br>
    A simple management.