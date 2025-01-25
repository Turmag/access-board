<?php
require "functions.php"; 

if($params['password'] === 'test'){
    authorizeUser();
    setCookies();
    echo 'success';
}