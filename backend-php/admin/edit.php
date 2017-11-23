<?php
include "header.php";


if (isset($_GET['place_id'])) {
    $place_id = htmlspecialchars($_GET['place_id']);
} else if (isset($_POST['place_id'])) {
    $place_id = htmlspecialchars($_POST['place_id']);
} else {
    exit;
}


// get place info
$place_query = mysqli_query($link, "SELECT * FROM places WHERE id='$place_id' LIMIT 1");
if (mysqli_num_rows($place_query) != 1) {
    exit;
}
$place = mysqli_fetch_assoc($place_query);


// do place edit if requested
if ($task == "doedit") {
    $title = str_replace("'", "\\'", str_replace("\\", "\\\\", $_POST['title']));
    $type = $_POST['type'];
    $address = str_replace("'", "\\'", str_replace("\\", "\\\\", $_POST['address']));
    $uri = $_POST['uri'];
    $description = str_replace("'", "\\'", str_replace("\\", "\\\\", $_POST['description']));
    $owner_name = str_replace("'", "\\'", str_replace("\\", "\\\\", $_POST['owner_name']));
    $owner_email = $_POST['owner_email'];
    $lat = (float)$_POST['lat'];
    $lng = (float)$_POST['lng'];

    $active = (int)($_POST['active'] == 1);
    $product_ready = (int)($_POST['product_ready'] == 1);
    $have_revenue = (int)($_POST['have_revenue'] == 1);
    $investment_received = (int)($_POST['investment_received'] == 1);
    $employees = (int)$_POST['employees'];

    if ($_POST['start_date'] != null) {
        $start_date = strptime($_POST['start_date'], '%d/%m/%Y');
        $start_date = mktime(0, 0, 0, $start_date['tm_mon'] + 1, $start_date['tm_mday'], $start_date['tm_year'] + 1900);
    } else {
        $start_date = "null";
    }
    if ($_POST['end_date'] != null) {
        $end_date = strptime($_POST['end_date'], '%d/%m/%Y');
        $end_date = mktime(0, 0, 0, $end_date['tm_mon'] + 1, $end_date['tm_mday'], $end_date['tm_year'] + 1900);
    } else {
        $end_date = "null";
    }

    $sql = "UPDATE places 
            SET title='$title', type='$type', 
            active=$active,
            product_ready=$product_ready, have_revenue=$have_revenue, investment_received=$investment_received,
            start_date=$start_date,end_date=$end_date,employees=$employees,
            description='$description', owner_name='$owner_name', owner_email='$owner_email',  
            address='$address', uri='$uri', lat='$lat', lng='$lng'
            WHERE id='$place_id' LIMIT 1";
    mysqli_query($link, $sql) or die(mysqli_error($link));
    // geocode
    //$hide_geocode_output = true;
    //include "../geocode.php";

    header("Location: index.php?view=$view&search=$search&p=$p");
    exit;
}

?>



<? echo $admin_head; ?>

<form id="admin" class="form-horizontal" action="edit.php" method="post">
    <h1>
        Edit Place
    </h1>
    <fieldset>
        <div class="control-group">
            <label class="control-label" for="">Title</label>
            <div class="controls">
                <input type="text" class="input input-xlarge" name="title" value="<?= $place[title] ?>" id="">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="">Type</label>
            <div class="controls">
                <select class="input input-xlarge" name="type">
                    <?php foreach ($types as $type): ?>
                        <option
                            <? if ($place[type] == $type[0]) { ?> selected="selected"<? } ?>
                            value="<?php echo $type[0]; ?>"><?php echo $type[1]; ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="">Details</label>
            <div class="controls">
                <input type="checkbox" class="input input-xlarge" name="active" value="1" <?php echo($place['active'] == 1 ? "checked" : ""); ?> > Ativa<br>
                <input type="checkbox" class="input input-xlarge" name="product_ready" value="1" <?php echo($place['product_ready'] == 1 ? "checked" : ""); ?>> Produto pronto<br>
                <input type="checkbox" class="input input-xlarge" name="have_revenue" value="1" <?php echo($place['have_revenue'] == 1 ? "checked" : ""); ?>> Faturando<br>
                <input type="checkbox" class="input input-xlarge" name="investment_received" value="1" <?php echo($place['investment_received'] == 1 ? "checked" : ""); ?>> Recebeu Investimento<br>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="">Datas Inicio/Fim</label>
            <div class="controls">
                <input type="text" class="input input-medium" name="start_date" value="<?= ($place['start_date'] != null ? date('d/m/Y', $place['start_date']) : null); ?>">
                <input type="text" class="input input-medium" name="end_date" value="<?= ($place['end_date'] != null ? date('d/m/Y', $place['end_date']) : null); ?>">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="">Numero Funcionários</label>
            <div class="controls">
                <input type="text" class="input input-small" name="employees" value="<?= $place['employees'] ?>" id="">
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="">URL</label>
            <div class="controls">
                <input type="text" class="input input-xlarge" name="uri" value="<?= $place[uri] ?>" id="">
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="">Description</label>
            <div class="controls">
                <textarea class="input input-xlarge" name="description"><?= $place[description] ?></textarea>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="">Submitter Name</label>
            <div class="controls">
                <input type="text" class="input input-xlarge" name="owner_name" value="<?= $place[owner_name] ?>" id="">
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="">Submitter Email</label>
            <div class="controls">
                <input type="text" class="input input-xlarge" name="owner_email" value="<?= $place[owner_email] ?>" id="">
            </div>
        </div>

        <div class="control-group">
            <label class="control-label" for="">Address</label>
            <div class="controls">
                <input type="text" class="input input-xlarge" name="address" value="<?= $place[address] ?>" id="">
            </div>
        </div>


        <div class="control-group">
            <label class="control-label" for="">Location</label>
            <div class="controls">
                <input type="hidden" name="lat" id="mylat" value="<?= $place[lat] ?>"/>
                <input type="hidden" name="lng" id="mylng" value="<?= $place[lng] ?>"/>
                <div id="map" style="width:80%;height:300px;">
                </div>

                <?php
                if ($place[lat] != null && $place[lat] != 0)
                    $lat_lng = $place[lat] . ',' . $place[lng];
                ?>
                <script type="text/javascript">
                    var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 14,
                        center: new google.maps.LatLng(<?= $lat_lng ?>),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        streetViewControl: false,
                        mapTypeControl: false
                    });
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(<?= $lat_lng ?> ),
                        map: map,
                        draggable: true
                    });
                    google.maps.event.addListener(marker, 'dragend', function (e) {
                        document.getElementById('mylat').value = e.latLng.lat().toFixed(6);
                        document.getElementById('mylng').value = e.latLng.lng().toFixed(6);
                    });
                </script>
            </div>
        </div>
        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <input type="hidden" name="task" value="doedit"/>
            <input type="hidden" name="place_id" value="<?= $place[id] ?>"/>
            <input type="hidden" name="view" value="<?= $view ?>"/>
            <input type="hidden" name="search" value="<?= $search ?>"/>
            <input type="hidden" name="p" value="<?= $p ?>"/>
            <a href="index.php" class="btn" style="float: right;">Cancel</a>
        </div>
    </fieldset>
</form>


<? echo $admin_foot; ?>
