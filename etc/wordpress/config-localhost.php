<?php
define('DB_NAME', 'peacep');
define('DB_USER', 'peacep');
define('DB_PASSWORD', 'O4XZpeCO');
define('DB_HOST', 'localhost');
define('SECRET_KEY', 'XEuT95BJ5dirMSazrhvIGFbSb5R5VQkPnjvvhY1gnw');

#This will disable the update notification.
define('WP_CORE_UPDATE', false);

$table_prefix  = 'wp_';
$server = DB_HOST;
$loginsql = DB_USER;
$passsql = DB_PASSWORD;
$base = DB_NAME;
$upload_path = "/srv/www/wp-uploads/peace-p.org";
$upload_url_path = "http://peace-p.org/wp-uploads";
?>
