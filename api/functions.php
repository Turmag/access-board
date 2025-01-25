<?php
session_start();

function authorizeUser() {
	$_SESSION["isDocsAuthorized"] = true;
}

function setCookies(){
	$cookiesFile = 'cookies.json';
	if(!file_exists($cookiesFile)){
		file_put_contents($cookiesFile, '[]');
	}

	$handle = fopen($cookiesFile, "r");
	$cookies = json_decode(fread($handle, filesize($cookiesFile)));
	fclose($handle);

	$cookieHash = md5('docs' . rand(5, 150));

	$cookies[] = (object)[
		'hash' => $cookieHash
	];

	file_put_contents($cookiesFile, json_encode($cookies));
	setcookie('docsAuthorizeHash', $cookieHash, strtotime('+7 days'));
}

function unsetCookie(){
	$cookiesFile = 'cookies.json';
	if(!file_exists($cookiesFile)){
		file_put_contents($cookiesFile, '[]');
	}

	$handle = fopen($cookiesFile, "r");
	$cookies = json_decode(fread($handle, filesize($cookiesFile)));
	fclose($handle);

	$cookieHash = $_COOKIE['docsAuthorizeHash'];
	$newItems = [];
	foreach($cookies as $cookie){
		if($cookie->hash !== $cookieHash){
			$newItems[] = $cookie;
		}
	}

	file_put_contents($cookiesFile, json_encode($newItems));
}

function checkCookie(){
	$cookiesFile = 'cookies.json';
	if(!file_exists($cookiesFile)){
		file_put_contents($cookiesFile, '[]');
	}
	$handle = fopen($cookiesFile, "r");
	$cookies = json_decode(fread($handle, filesize($cookiesFile)));
	fclose($handle);

	foreach($cookies as $cookie){
		if($cookie->hash === $_COOKIE['docsAuthorizeHash']){
			authorizeUser();
		}
	}
}

function unAuthorizeUser() {
    $_SESSION["isDocsAuthorized"] = false;
}

function isAuthorizedUser(){
	return $_SESSION["isDocsAuthorized"];
}

function checkAuthorizedUser(){
	if(!isAuthorizedUser()){
		header('HTTP/1.1 500 Internal Server Error');
		die("Эта операция недопустима неавторизованным пользователям");
	}
}

function getCategories($items){
	$categories = [];
	foreach ($items as $item) {
		if(!in_array($item->category, $categories)){
			$categories[] = $item->category;
		}
	}

	return $categories;
}

$params = json_decode(file_get_contents("php://input"), true);