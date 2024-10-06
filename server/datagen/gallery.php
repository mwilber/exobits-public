<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once './database.php';

$mode = "";
if(isset($_GET['mode'])) $mode = $_GET['mode'];

$database = new Database();
$db = $database->getConnection();

$query = "SELECT `keydata`.`sha256` from `keydata` WHERE `keydata`.`metadata` IS NULL;";
if($mode == "token") $query = "SELECT `keydata`.`image`, `keydata`.`metadata` from `keydata` WHERE `keydata`.`metadata` IS NOT NULL;";

$stmt = $db->prepare($query);
$stmt->execute();

$array = $stmt->fetchAll( PDO::FETCH_ASSOC );
$json = json_encode( $array );

// set response code - 200 OK
http_response_code(200);
// show products data in json format
echo json_encode($array);
?>