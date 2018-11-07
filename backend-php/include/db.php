<?php

date_default_timezone_set('America/Sao_Paulo');
setlocale(LC_ALL, "ptb");

function isLocalHost()
{
    $serverName = strtolower($_SERVER['SERVER_NAME']);
    return in_array($serverName, array('localhost', '127.0.0.1'));
}


if (isLocalHost()) {
    error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);
    ini_set("display_errors", 1);
    $db_host = "mine-mysql";
    $db_name = "startup_map";
    $db_user = "root";
    $db_pass = "rut";
    $admin_user = "adminuser";
    $admin_pass = "adminpass";
    $dash_user = "dashuser";
    $dash_pass = "dashpass";
} else {
    error_reporting(E_ALL ^ E_NOTICE ^ E_WARNING);
    ini_set("display_errors", 0);
    $db_host = "localhost";
    $db_name = "dbname";
    $db_user = "dbuser";
    $db_pass = "userpass";
    $admin_user = "adminuser";
    $admin_pass = "adminpass";
    $dash_user = "dashuser";
    $dash_pass = "dashpass";
}


function query($sql){
    global $dbh;
    $result = $dbh->query($sql);
    return $result->fetchAll(PDO::FETCH_ASSOC);
}

// StartupGenome.com integration (optional)
//
// We recommend integrating your map with the StartupGenome project.
// It's easy to setup, it will allow people to keep their profiles update
// over time, and it can help you show the world how your startup community
// is growing. StartupGenome also has a great interface for curating your
// map data.
//
// To use this feature, you need to be a curator for your city.
// If you're not yet a curator, learn more here:
// http://www.startupgenome.com/curators/
//
// If you are already a curator, find your API key on your
// Startup Genome profile and enter it below. You can manage the markers
// on your map from the Startup Genome website, rather than using the
// built-in admin panel.
//
// You can turn on Startup Genome integration by changing
// $sg_enabled to "true".
$sg_enabled = false;

// Put your SG API code here
$sg_auth_code = '';

// Choose your map's location here. If you're not sure
// about this, check the URL on the Startup Genome website.
$sg_location = '';
// Examples:
// $sg_location = '/city/los-angeles-ca';
// $sg_location = '/state/ca-us';
// $sg_location = '/country/chile';

// We only check for new data from SG when people visit your map,
// or when you run "startupgenome_get.php?override=true" manually.
// You can limit how often this happens to avoid slow page loads.
// Set the frequency below (in seconds).
$sg_frequency = "3600";


// EventBrite.com integration (optional)
//
// Show events on the map? If set to "true", an event
// category will appear in the marker list, and you can
// run events_get.php in your browser (or a chron) to populate
// it with data from eventbrite.
$show_events = true;

// put your eventbrite api key here
$eb_app_key = "";

// search eventbrite for these keywords
// use "+" for spaces
// e.g. 'startup', 'startups', 'demo+day'
$eb_keywords = join("%20OR%20", array('startup', 'startups', 'google', 'digital', 'relaciono'));

// specify city to search in and around
// example: Santa+Monica
$eb_city = "Juiz+de+Fora";

// specify search radius (in miles)
$eb_within_radius = 50;


// set timezone
// date_default_timezone_set("America/Los_Angeles");
// HTML that goes just before </head>
$head_html = "";
// The <title></title> tag
$title_tag = "Startups em Juiz de Fora, Minas Gerais";
$meta_desc = "Mapa criado para estimular novas conexões entre startups, pessoas e instituições que incentivam o empreendedorismo em Juiz de Fora!";
// The latitude & longitude to center the initial map
$lat_lng = "-21.761493,-43.342695";
$types = Array(
    Array('startup', 'Startups'),
//    Array('accelerator', 'Aceleradoras'),
    Array('incubator', 'Incubadoras'),
//    Array('investor', 'Investidores'),
//    Array('event', 'Eventos'),
    Array('developer', 'Desenvolvedores'),
    Array('coworking', 'Coworking'),
    Array('service', 'Consultorias'),
    Array('jrcompany', 'Empresas Jr'),
    Array('community', 'Comunidades')
);

// Domain to use for various links
$domain = "@@domain";
// Logo
$logo = "logo_startups.png";
// Twitter username and default share text
$twitter = array(
    "share_text" => "Vamos colocar as startups de Juiz de Fora no mapa!",
    "username" => ""
);

// Short blurb about this site (visible to visitors)
$blurb = "Este mapa é uma iniciativa do
<a href='https://emjuizdefora.com/gbgjf/'>Google Business Group Juiz de Fora</a> para estimular novas conexões entre startups, pessoas e instituições que incentivam o
 empreendedorismo!<br><br><br>

 <b style='color: #ccc;'>Você também precisa conhecer:</b><br><br>

    <center>
        <a href='https://zero40.com.br/'>
        <img src=images/040.png height=100>
        </a>

        <a href='https://emjuizdefora.com/gbgjf/'>
        <img src=images/gbgjf.jpg height=100>
        </a>
    </center>

    ";

// About
$about = "
<p> Este mapa foi criado por <a href='http://www.tiagogouvea.com.br'>Tiago Gouvêa</a> e <a href=https://www.facebook.com/renancaixeiro>Rennan Caixeiro</a> para ser utilizado por toda a comunidade.
    Precisamos de sua ajuda para mantê-lo atualizado! Se sua empresa ou instituição não está no mapa, por favor,
    <a href='#modal_add' data-toggle='modal' data-dismiss='modal'>adicione agora</a>.
</p>

<p>
    <center>
    <a href='https://emjuizdefora.com/gbgjf/'><img src=images/gbgjf.jpg width=200></a>
    <a href='https://zero40.com.br/'><img src=images/040.png width=200></a>
    </center>
</p>

<p>Se ligue no <a href='https://zero40.com.br/'>Ecosistema Empreendedor Zero 40</a>, que é um movimento novo e que vem para organizar e integrar todos os players.</p>

<p>
    Quer colaborar? Deseja enviar sugestões ou duvidas? Entre em contato conosco!
</p>";

$social = '
        <a target="_blank" href="https://www.facebook.com/GoogleBusinessGroupJF" title="Acompanhar no facebook"><IMG src="http://www.topproducerwebsite.com/images/site_defaults/generic/facebook.png" width=24></a>
        <a target="_blank" href="https://plus.google.com/116236579500882305388" title="Acompnhar no Google+"><IMG src="http://www.topproducerwebsite.com/images/site_defaults/generic/Googleplus.png"  width=24></a>
        ';

// attribution (must leave link intact, per our license)
$attribution = "
  <span>
    Adaptado de <a href='http://www.represent.la' target='_blank'>RepresentLA</a>
  </span>
";
// add startup genome to attribution if integration enabled
if ($sg_enabled) {
    $attribution .= "
    <br /><br />
    Data from <a target='_blank' href='http://www.startupgenome.com'>StartupGenome</a>
  ";
}


?>
