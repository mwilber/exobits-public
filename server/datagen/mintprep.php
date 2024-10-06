<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require __DIR__ . '/key.php';

// required headers
//header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once './database.php';

define('IMG_DIR', '../tokenimages/'); 
define('DATA_DIR', '../tokenmetadata/');
define('IPFS_DIR', '../ipfscache/');

$response = new stdClass();
$exoKey = $_GET["key"];
$exoName = $_GET["name"];

$headers = [
	'pinata_api_key: ' . PINATA_KEY,
	'pinata_secret_api_key: ' . PINATA_SECRET
];

$database = new Database();
$db = $database->getConnection();

$metaFile = file_get_contents(DATA_DIR . 'exobit-' . $exoKey . '.json');
$metadata = json_decode($metaFile);




$cf = new CURLFile(realpath(IMG_DIR . "exobit-".$exoKey.".png"), "image/png", "exobit-".$exoKey.".png");
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.pinata.cloud/pinning/pinFileToIPFS");
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, ["file" => $cf]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$imageResponse = curl_exec($ch);
curl_close($ch);

$imageResponse = json_decode($imageResponse);
if(isset($imageResponse->IpfsHash)){

	$imageHash = $imageResponse->IpfsHash;
	$metadata->image = "ipfs://".$imageHash;
	$response->image = $imageHash;
	$metadata->name = $exoName;
	
	$payloadObj = new stdClass();
	$payloadObj->pinataMetadata = new stdClass();
	$payloadObj->pinataMetadata->name = "exobit-".$exoKey.".json";
	$payloadObj->pinataContent = $metadata;
	
	$payload = json_encode( $payloadObj );
	array_push($headers, 'Content-Type:application/json');
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, "https://api.pinata.cloud/pinning/pinJSONToIPFS");
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$result = curl_exec($ch);
	curl_close($ch);
	
	$result = json_decode($result);
	if(isset($result->IpfsHash)){
		$response->metadata = $result->IpfsHash;
		// Cache the ipfs files locally
		file_put_contents(IPFS_DIR . $response->metadata, json_encode($metadata, JSON_UNESCAPED_SLASHES));
		copy(IMG_DIR . "exobit-".$exoKey.".png", IPFS_DIR . $imageHash);
		// Update the database
		$response->updateQuery = "UPDATE `keydata` SET `image` = '".$imageHash."', `metadata` = '".$result->IpfsHash."', `name` = '".$exoName."' WHERE `keydata`.`sha256` = '".$exoKey."';";
		$stmt = $db->prepare("UPDATE `keydata` SET `image` = '".$imageHash."', `metadata` = '".$result->IpfsHash."', `name` = '".$exoName."' WHERE `keydata`.`sha256` = '".$exoKey."';");
		$stmt->execute();
	}
}


// set response code - 200 OK
http_response_code(200);
// show products data in json format
echo json_encode($response);

?>