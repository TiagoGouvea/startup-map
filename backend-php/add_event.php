<?php
include_once "header.php";

// This is used to submit new markers for review.
// Markers won't appear on the map until they are approved.
$owner_name = utf8_decode(mysql_real_escape_string(parseInput($_POST['owner_name'])));
$owner_email = mysql_real_escape_string(parseInput($_POST['owner_email']));
$title = utf8_decode(mysql_real_escape_string(parseInput($_POST['title'])));
$organizer_name = utf8_decode(mysql_real_escape_string(parseInput($_POST['organizer_name'])));
$date = $_POST['date'];
$address = utf8_decode(mysql_real_escape_string(parseInput($_POST['address'])));
$uri = mysql_real_escape_string(parseInput($_POST['uri']));
$description = utf8_decode(mysql_real_escape_string(parseInput($_POST['description'])));

$date=explode(" ",$date);
$data=$date[0];
$hora=$date[1].":00";
$data=implode('/', array_reverse(explode('/', $data)));
$date=$data." ".$hora;
$date=strtotime($date);

// validate fields
if (empty($title) || empty($organizer_name) || empty($address) || empty($uri) || empty($description) || empty($owner_name) || empty($owner_email) || empty($date)) {
    echo "Todos campos são obrigatórios.";
    exit;
} else {
    // insert into db, wait for approval
    $sql = "INSERT INTO events 
        (approved, title, organizer_name, address, uri, description, owner_name, owner_email,start_date,created) 
        VALUES 
        (null, '$title', '$organizer_name', '$address', '$uri', '$description', '$owner_name', '$owner_email', '$date',now())";
    $insert = mysql_query($sql) or die(mysql_error());

    // geocode new submission
    $hide_geocode_output = true;
    include "geocode.php";

    echo "success";
    exit;
}
?>
