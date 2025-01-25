<?php
require "functions.php"; 
error_reporting(0); 
checkAuthorizedUser();

$itemsFile = '../files/services.json';
try {
    $handle = fopen($itemsFile, "r");
    $services = json_decode(fread($handle, filesize($itemsFile)));
    fclose($handle);
    if(gettype($services) != 'array'){
        throw new Exception;
    }
    $categories = getCategories($services);
}
catch(Exception $e){
    $services = [];
    $categories = [];
}

$list = [
    'services' => $services,
    'categories' => $categories,
];

echo json_encode($list);