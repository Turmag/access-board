<?php
require __DIR__ . '/JwtAuth.php';

session_start();

$tokensConfig = [
    'jwt_secret' => 'my-awesome-secret-key-for-access-board-project',
    'jwt_refresh_secret' => 'my-awesome-secret-key-for-access-board-project-for-refresh',
    'access_token_ttl' => 3600,
    'refresh_token_ttl' => 1209600,
];

$savedPassword = '098f6bcd4621d373cade4e832627b4f6';

function getCategories($items){
	$categories = [];
	foreach ($items as $item) {
		if(!in_array($item->category, $categories)){
			$categories[] = $item->category;
		}
	}

	return $categories;
}

function getBearerToken() {
    // INFO: Пытаемся получить через apache_request_headers
    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
        }
    } 
    // INFO:Для FPM
    elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    }
    // INFO: Последний шанс — getallheaders
    else {
        $headers = getallheaders() ?? [];
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
        }
    }

    // INFO: Извлекаем токен
    if (!empty($authHeader) && preg_match('/^Bearer\s+(.*)$/i', $authHeader, $matches)) {
        return $matches[1];
    }

    return null;
}

function checkBearerToken() {
    $token = getBearerToken();

    if (!$token) {
        http_response_code(401);
        echo json_encode(['success' => false, 'title' => 'Access token не указан']);
        exit;
    }

    global $tokensConfig;

    $jwtAuth = new JwtAuth($tokensConfig);

    $validToken = $jwtAuth->validateAccessToken($token);
    if (!$validToken) {
        http_response_code(401);
        echo json_encode(['success' => false, 'title' => 'Неправильный или истёкший токен']);
        exit;
    }

    return $validToken;
}