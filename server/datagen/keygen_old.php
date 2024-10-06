<?php
// required headers
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

$response = new stdClass();

$response->key = hash("sha256", $_GET["seed"], false);

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