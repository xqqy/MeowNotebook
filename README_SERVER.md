#如何搭建一个网络服务器

1. 下载Ubuntu Server<br>
    Download Ubuntu Server.
2. 执行以下命令<br>
   Execute command below.

`sudo apt install apache2 php7.2-fpm mysql-server`<br>
`sudo a2enconf proxy_fcgi `
`sudo a2enconf php-fpm`
`sudo service apache2 restart`

你会在安装时被要求设置mysql的密码，如果没有的话，请尝试mysql官方的安装包<br>
You will be ask to set a password for mysql, if not ,try deb download from mysql.com
顺利的话，你的服务器已经安装完成了<br>
If everything run great, it completed.