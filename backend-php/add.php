<?php

include_once "header.php";

// This is used to submit new markers for review.
// Markers won't appear on the map until they are approved.

$owner_name = utf8_decode(mysql_real_escape_string(parseInput($_POST['owner_name'])));
$owner_email = mysql_real_escape_string(parseInput($_POST['owner_email']));
$title = utf8_decode(mysql_real_escape_string(parseInput($_POST['title'])));
$type = mysql_real_escape_string(parseInput($_POST['type']));
$address = utf8_decode(mysql_real_escape_string(parseInput($_POST['address'])));
$uri = mysql_real_escape_string(parseInput($_POST['uri']));
$description = utf8_decode(mysql_real_escape_string(parseInput($_POST['description'])));

$start_date = mysql_datetime_para_timestamp($_POST['start_date']);
$employees = utf8_decode(mysql_real_escape_string(parseInput($_POST['employees'])));
$have_revenue = parseCheck($_POST['have_revenue']);
$product_ready = parseCheck($_POST['product_ready']);
$investment_received = parseCheck($_POST['investment_received']);
// validate fields
if (empty($title) || empty($type) || empty($address) || empty($uri) || empty($description) || empty($owner_name) || empty($owner_email)) {
    echo "Todos campos são obrigatórios.";
    exit;
} else {

    // if startup genome mode enabled, post new data to API
    if ($sg_enabled) {
        try {
            @$r = $http->doPost("/organization", $_POST);
            $response = json_decode($r, 1);
            if ($response['response'] == 'success') {
                include_once("startupgenome_get.php");
                echo "success";
                exit;
            }
        } catch (Exception $e) {
            echo "<pre>";
            print_r($e);
        }

        // normal mode enabled, save new data to local db
    } else {

        // insert into db, wait for approval
        $insert = mysql_query("
            INSERT INTO places 
            (approved, title, type, address, uri, description, owner_name, owner_email, start_date, employees,have_revenue,product_ready,investment_received) 
            VALUES 
            (null, '$title', '$type', '$address', '$uri', '$description', '$owner_name', '$owner_email', '$start_date', '$employees','$have_revenue','$product_ready','$investment_received')
            "
        ) or die(mysql_error());

        // geocode new submission
        $hide_geocode_output = true;
        include "geocode.php";

        echo "success";
        exit;
    }
}

function mysql_datetime_para_timestamp($dt)
{
    $dt = explode("/", $dt);
    $yr = $dt[2];
    $mo = $dt[1];
    $da = $dt[0];
    $hr = strval(substr($dt, 13, 2));
    $mi = strval(substr($dt, 16, 2));
    $se = strval(substr($dt, 19, 2));
    return mktime(0, 0, 0, $mo, $da, $yr);
}

?>
