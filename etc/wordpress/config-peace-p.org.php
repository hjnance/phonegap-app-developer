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

$debian_server	= "peace-p.org";
$service_path	= "/srv/www/";

$upload_path	= $service_path . $debian_server . "/media";
$plugin_path	= $service_path . $debian_server . "/plugins";

$upload_url_path = "http://" . $debian_server . "/content/media";

define('WP_CONTENT_DIR', $service_path . $debian_server );
define('WP_CONTENT_URL', "http://" . $debian_server . "/content");
define('FS_METHOD', 'direct');

#define('DISALLOW_FILE_EDIT', true);


?>

