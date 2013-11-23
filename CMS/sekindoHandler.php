<? header("Access-Control-Allow-Origin: *");

//error_reporting(E_ERROR);
$deb=$_GET["d"];
if ($deb=="y")
{
error_reporting(E_ALL);
ini_set('display_errors', '1');
}


function DOMinnerHTML($element) 
{ 
    $innerHTML = ""; 
    $children = $element->childNodes; 
    foreach ($children as $child) 
    { 
        $tmp_dom = new DOMDocument(); 
        $tmp_dom->appendChild($tmp_dom->importNode($child, true)); 
        $innerHTML.=trim($tmp_dom->saveHTML()); 
    } 
    return $innerHTML; 
}


function get_links($url) {

    // Create a new DOM Document to hold our webpage structure
   $page = file_get_contents($url);
   return $page;
}



$action=$_GET["act"];
if ($action==null) $action='http://www.wix.com';
if ($action=='a') $action='http://live.sekindo.com/live/liveView.php?s=42879&njs=1&ise=1';
if ($action=='b') $action='http://live.sekindo.com/live/liveView.php?s=42881&njs=1';
echo get_links($action);

?>