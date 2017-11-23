<?php
include "header.php";

if(isset($_GET['event_id'])) {
  $event_id = htmlspecialchars($_GET['event_id']); 
} else if(isset($_POST['event_id'])) {
  $event_id = htmlspecialchars($_POST['event_id']);
} else {
  exit; 
}


// get event info
$event_query = mysql_query("SELECT * FROM events WHERE id='$event_id' LIMIT 1");
if(mysql_num_rows($event_query) != 1) { exit; }
$event = mysql_fetch_assoc($event_query);


// do event edit if requested
if($task == "doedit") {
  $title = str_replace( "'", "\\'", str_replace( "\\", "\\\\", $_POST['title'] ) );
  $address = str_replace( "'", "\\'", str_replace( "\\", "\\\\", $_POST['address'] ) );
  $uri = $_POST['uri'];
  $description = str_replace( "'", "\\'", str_replace( "\\", "\\\\", $_POST['description'] ) );
  $owner_name = str_replace( "'", "\\'", str_replace( "\\", "\\\\", $_POST['owner_name'] ) );
  $owner_email = $_POST['owner_email'];
  
  $date = $_POST['date'];
  $date=explode(" ",$date);
  $data=$date[0];
  $hora=$date[1].":00";
  $data=implode('/', array_reverse(explode('/', $data)));
  $date=$data." ".$hora;
  $date=strtotime($date);
  
  $lat = (float) $_POST['lat'];
  $lng = (float) $_POST['lng'];
  
  mysql_query("UPDATE events SET title='$title', address='$address', uri='$uri', lat='$lat', lng='$lng', description='$description', owner_name='$owner_name', owner_email='$owner_email', start_date='$date' WHERE id='$event_id' LIMIT 1") or die(mysql_error());
  
  // geocode
  //$hide_geocode_output = true;
  //include "../geocode.php";
  
  header("Location: index.php?view=$view&search=$search&p=$p");
  exit;
}

?>



<? echo $admin_head; ?>

<form id="admin" class="form-horizontal" action="edit_event.php" method="post">
  <h1>
    Edit Event
  </h1>
  <fieldset>
    <div class="control-group">
      <label class="control-label" for="">Title</label>
      <div class="controls">
        <input type="text" class="input input-xlarge" name="title" value="<?=$event[title]?>" id="">
      </div>
    </div>
    <div class="control-group">
      <label class="control-label" for="">Date</label>
      <div class="controls">
        <input type="text" class="input input-xlarge" name="date" value="<?=date('d/m/Y G:i',$event[start_date]); ?>" id="">
          <script type="text/javascript">
                           $(function(){
                                   $('*[name=date]').appendDtpicker({"locale": "pt","dateFormat": "DD/MM/YYYY h:mm"});
                           });
                   </script>
      </div>
    </div>
    <div class="control-group">
      <label class="control-label" for="">Address</label>
      <div class="controls">
        <input type="text" class="input input-xlarge" name="address" value="<?=$event[address]?>" id="">
      </div>
    </div>
    <div class="control-group">
      <label class="control-label" for="">URL</label>
      <div class="controls">
        <input type="text" class="input input-xlarge" name="uri" value="<?=$event[uri]?>" id="">
      </div>
    </div>
    <div class="control-group">
      <label class="control-label" for="">Description</label>
      <div class="controls">
        <textarea class="input input-xlarge" name="description"><?=$event[description]?></textarea>
      </div>
    </div>
    <div class="control-group">
      <label class="control-label" for="">Submitter Name</label>
      <div class="controls">
        <input type="text" class="input input-xlarge" name="owner_name" value="<?=$event[owner_name]?>" id="">
      </div>
    </div>
    <div class="control-group">
      <label class="control-label" for="">Submitter Email</label>
      <div class="controls">
        <input type="text" class="input input-xlarge" name="owner_email" value="<?=$event[owner_email]?>" id="">
      </div>
    </div>
    <div class="control-group">
      <label class="control-label" for="">Location</label>
      <div class="controls">
        <input type="hidden" name="lat" id="mylat" value="<?=$event[lat]?>"/>
        <input type="hidden" name="lng" id="mylng" value="<?=$event[lng]?>"/>
        <div id="map" style="width:80%;height:300px;">
        </div>
        <script type="text/javascript">
          var map = new google.maps.Map( document.getElementById('map'), {
            zoom: 17,
            center: new google.maps.LatLng( <?=$event[lat]?>, <?=$event[lng]?> ),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            mapTypeControl: false
          });
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng( <?=$event[lat]?>, <?=$event[lng]?> ),
            map: map,
            draggable: true
          });
          google.maps.event.addListener(marker, 'dragend', function(e){
            document.getElementById('mylat').value = e.latLng.lat().toFixed(6);
            document.getElementById('mylng').value = e.latLng.lng().toFixed(6);
          });
        </script>
      </div>
    </div>    
    <div class="form-actions">
      <button type="submit" class="btn btn-primary">Save Changes</button>
      <input type="hidden" name="task" value="doedit" />
      <input type="hidden" name="event_id" value="<?=$event[id]?>" />
      <input type="hidden" name="view" value="<?=$view?>" />
      <input type="hidden" name="search" value="<?=$search?>" />
      <input type="hidden" name="p" value="<?=$p?>" />
      <a href="index.php" class="btn" style="float: right;">Cancel</a>
    </div>
  </fieldset>
</form>



<? echo $admin_foot; ?>
