<? header("Access-Control-Allow-Origin: *");

$deb=false;
if ($deb)
{
error_reporting(E_ALL);
ini_set('display_errors', '1');
}

//   COOKIE !! cookie=$_COOKIE["user"];
//   if ($cookie) echo "<p> שלום לך $cookie </p>";

//$user=$_COOKIE["user"];
$id=$_GET["id"];
$data=$_GET["data"];
$action=$_GET['act'];




$con = mysql_connect("grindude.db.8919981.hostedresource.com","grindude","Bibolico88");
if (!$con)
  {
  echo "NOT OK";
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("grindude", $con);


if ($action=='add'){
echo $data;
$query = "INSERT INTO fourpics VALUES ('','$data')";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);

echo 'OK';
mysql_close($con);
}

if ($action=='edit')
{
$query = "UPDATE fourpics SET data='$data' WHERE id=$id";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
mysql_close($con);

echo "OK".$query;
}

if ($action=='delete'){

$query = "DELETE FROM fourpics WHERE id=$id";
mysql_query($query);
echo 'OK';

mysql_close($con);


}
if ($action=='RTR'){

$query="SELECT * FROM fourpics WHERE id=$id";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$array = mysql_fetch_row($result);  
echo json_encode($array);
mysql_query($query);
mysql_close($con);
}

if ($action=='ALL'){

$query="SELECT * FROM fourpics";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$array = array();  

$num=mysql_numrows($result);
while ($i < $num) {

$ar=mysql_fetch_row($result);
$array[$i]=$ar;
$i++;

}
echo json_encode($array);
mysql_query($query);
mysql_close($con);
}














?>
