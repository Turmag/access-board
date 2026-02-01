<?php
require_once 'functions.php';
require_once 'Router.php';
require_once 'controllers/AuthController.php';
require_once 'controllers/CommonController.php';

$postParams = json_decode(file_get_contents("php://input"), true);
$params = array_merge(empty($_POST) ? [] : $_POST, empty($postParams) ? [] : $postParams, $_GET);

unset($params['route']);

$router = new Router();

// INFO: Авторизация
$router->add('POST', '/authorize', [AuthController::class, 'authorize'], $params);
$router->add('POST', '/refresh', [AuthController::class, 'refresh'], $params);

// INFO: Общие методы
$router->add('GET', '/getServices', [CommonController::class, 'getServices'], $params);

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$requestMethod = $_SERVER['REQUEST_METHOD'];
$router->dispatch($requestUri, $requestMethod);