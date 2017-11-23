<?php
include_once "header.php";

// Run this script after new markers have been added to the DB.
// It will look for any markers that are missing latlong values
// and automatically geocode them.

// google maps vars
define("MAPS_HOST", "maps.googleapis.com");

// geocode all markers
geocode("places");
//geocode("events");


// geocode function
function geocode($table)
{
    global $hide_geocode_output;

    if (@$hide_geocode_output != true) {
        $where = "coalesce(lat,0)=0 or coalesce(lng,0)=0";
    } else {
        $where = "lat is null AND lng is null";
    }
    // get places that don't have latlong values
    $result = mysql_query("SELECT * FROM $table WHERE $where") or die(mysql_error());

    // geocode and save them back to the db
    $delay = 0;
    $base_url = "http://" . MAPS_HOST . "/maps/api/geocode/xml";

    // Iterate through the rows, geocoding each address
    while ($row = @mysql_fetch_assoc($result)) {
        $geocode_pending = true;

        while ($geocode_pending) {
            $address = $row["address"];
            $id = $row["id"];
//            $request_url = $base_url . "?address=" . urlencode(utf8_encode($address)) . "&sensor=false";
            $request_url = $base_url . "?address=" . remove_accents(utf8_encode($address)) . "&sensor=false";
            $xml = simplexml_load_file($request_url) or die("url not loading");

            $status = $xml->status;
            if ($status == "OK") {
                // Successful geocode
                $geocode_pending = false;
                $coordinates = $xml->result->geometry->location;
                // Format: Longitude, Latitude, Altitude
                $lat = $coordinates->lat;
                $lng = $coordinates->lng;

                $query = sprintf("UPDATE $table " .
                    " SET lat = '%s', lng = '%s' " .
                    " WHERE id = '%s' LIMIT 1;",
                    mysql_real_escape_string($lat),
                    mysql_real_escape_string($lng),
                    mysql_real_escape_string($id));
                $update_result = mysql_query($query);
                if (!$update_result) {
                    die("Invalid query: " . mysql_error());
                }
                if (@$hide_geocode_output != true) {
                    echo $row["address"] . " (" . $row['title'] . ") <b>updates</b><hr>";
                }
            } else if (strcmp($status, "620") == 0) {
                // sent geocodes too fast
                $delay += 100000;
            } else {
                if (@$hide_geocode_output != true) {
                    echo $row["address"] . " (" . $row['title'] . ") <b>not found</b><br>";
                    echo "<pre>";
                    var_dump($xml);
                    echo "</pre><hr>";
                }
                // failure to geocode
                $geocode_pending = false;
                //echo "Address " . $address . " failed to geocoded. ";
                //echo "Received status " . $status . " \n";
                $query = "UPDATE $table 
                    SET lat = 0, lng = 0  
                    WHERE id = '$id' LIMIT 1";
                mysql_query($query);
            }
            usleep($delay);
        }
    }

    // finish
    if (@$hide_geocode_output != true) {
        echo mysql_num_rows($result) . " $table geocoded<br />";
    }

}

 function remove_accents($name)
{
    $unwanted_array = array('Š' => 'S', 'š' => 's', 'Ž' => 'Z', 'ž' => 'z', 'À' => 'A', 'Á' => 'A', 'Â' => 'A', 'Ã' => 'A', 'Ä' => 'A', 'Å' => 'A', 'Æ' => 'A', 'Ç' => 'C', 'È' => 'E', 'É' => 'E',
        'Ê' => 'E', 'Ë' => 'E', 'Ì' => 'I', 'Í' => 'I', 'Î' => 'I', 'Ï' => 'I', 'Ñ' => 'N', 'Ò' => 'O', 'Ó' => 'O', 'Ô' => 'O', 'Õ' => 'O', 'Ö' => 'O', 'Ø' => 'O', 'Ù' => 'U',
        'Ú' => 'U', 'Û' => 'U', 'Ü' => 'U', 'Ý' => 'Y', 'Þ' => 'B', 'ß' => 'Ss', 'à' => 'a', 'á' => 'a', 'â' => 'a', 'ã' => 'a', 'ä' => 'a', 'å' => 'a', 'æ' => 'a', 'ç' => 'c',
        'è' => 'e', 'é' => 'e', 'ê' => 'e', 'ë' => 'e', 'ì' => 'i', 'í' => 'i', 'î' => 'i', 'ï' => 'i', 'ð' => 'o', 'ñ' => 'n', 'ò' => 'o', 'ó' => 'o', 'ô' => 'o', 'õ' => 'o',
        'ö' => 'o', 'ø' => 'o', 'ù' => 'u', 'ú' => 'u', 'û' => 'u', 'ý' => 'y', 'ý' => 'y', 'þ' => 'b', 'ÿ' => 'y');
    return strtr($name, $unwanted_array);
}

?>
