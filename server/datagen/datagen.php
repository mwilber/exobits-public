<?php
	define('IMG_DIR', '../tokenimages/'); 
	define('DATA_DIR', '../tokenmetadata/'); 
	define('URI_ROOT', 'https://exobits.greenzeta.com/'); 
	$img = $_POST['image'];  
	$img = str_replace('data:image/png;base64,', '', $img);  
	$img = str_replace(' ', '+', $img);  
	$data = base64_decode($img);  
	$file = IMG_DIR . 'exobit-' . $_POST['key'] . '.png';  
	$success = file_put_contents($file, $data);  
	print $success ? $file : 'Unable to save the file.'; 

	if( $success ){
	
		$metadata = json_decode($_POST['json']);
		$metadata->key = $_POST['key'];
		$metadata->image = URI_ROOT . 'i/' . $_POST['key'];
		$metadata->external_url = URI_ROOT . 'tk/' . $_POST['key'];
		$metadata->animation_url = URI_ROOT . 'tk/' . $_POST['key'];
	
		$file = DATA_DIR . 'exobit-' . $_POST['key'] . '.json';

		$success = file_put_contents($file, json_encode($metadata)); 
	}
?>