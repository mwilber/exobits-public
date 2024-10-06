<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once './database.php';

$response = new stdClass();

$response->key = hash("sha256", $_GET["seed"], false);

//Store to the database
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();


$count=$db->prepare("SELECT * FROM keydata WHERE sha256 = '".$response->key."'");
$count->bindParam(":userid",$response->key);
$count->execute();

$num = $count->rowCount();

if($num <= 0 ){  
	$query = "INSERT INTO `keydata` (`seed`, `sha256`) VALUES ('".$_GET["seed"]."', '".$response->key."');";
	// prepare query statement
	$stmt = $db->prepare("INSERT INTO `keydata` (`seed`, `sha256`) VALUES ('".$_GET["seed"]."', '".$response->key."');");
  	$stmt->bindParam(":seed",$_GET["seed"]);
	$stmt->bindParam(":sha256",$response->key);
	// execute query
	$stmt->execute();
}
    

// Write to flat file
$file = './master-key-list.txt';
$current = file_get_contents($file);

if($current == "" ){
	$jsonData = new stdClass();
	$jsonData->keys = array();
}else{
	$jsonData = json_decode($current);
}

if(strpos($current, $response->key) === false){
	$response->keyfound = false;
	//$current .= $response->key . ",\n";
	array_push($jsonData->keys, $response->key);
	file_put_contents($file, json_encode($jsonData));
}else{
	$response->keyfound = true;
}


// set response code - 200 OK
    http_response_code(200);
  
    // show products data in json format
    echo json_encode($response);
    
?>