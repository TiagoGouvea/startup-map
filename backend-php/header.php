<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: origin, x-requested-with, content-type");

include "./include/db.php";


// connect to db
// mysql_connect($db_host, $db_user, $db_pass) or die(mysql_error());
// mysql_select_db($db_name) or die(mysql_error());

try {
    $dbh = new PDO(
        "mysql:host={$db_host}; dbname={$db_name}", $db_user, $db_pass
    );
    $dbh->exec("set names utf8");
    global $dbh;
} catch (PDOException $e) {
    print "Database error!: " . $e->getMessage() . "<br/>";
    die();
}

// if map is in Startup Genome mode, check for new data
if ($sg_enabled) {
    require_once("include/http.php");
    include_once("startupgenome_get.php");
}

// input parsing
function parseInput($value)
{
    $value = htmlspecialchars($value, ENT_QUOTES);
    $value = str_replace("\r", "", $value);
    $value = str_replace("\n", "", $value);
    return $value;
}

// input parsing
function parseCheck($value)
{
    return ($value == "true" ? 1 : 0);
}