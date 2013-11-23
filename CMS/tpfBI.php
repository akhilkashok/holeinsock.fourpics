<? header("Access-Control-Allow-Origin: *");

//error_reporting(E_ERROR);
$deb=$_GET["d"];
if ($deb=="y")
{
error_reporting(E_ALL);
ini_set('display_errors', '1');
}

//   adder
$action=$_GET["act"];
$event=$_GET["event"];
$sub=$_GET["sub"];
$p1=$_GET["p1"];
$p2=$_GET["p2"];
$userId=$_GET["userId"];
$time=$_GET["time"];


$con = mysql_connect("grindude.db.8919981.hostedresource.com","grindude","Bibolico88");
if (!$con)
  {
  echo "NOT OK";
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("grindude", $con);


if ($action=='GETTHREAD'){

$query="SELECT * FROM elementGrabber WHERE thread='$thread' AND entityId<>'' AND entityId<>'undefined' ";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$return_arr = array();
$i=0;
if($result==null) 
{ echo 'nothing found'; return;}
$num=mysql_numrows($result);
while ($i < $num) {

$id=mysql_result($result,$i,"id");
$user=mysql_result($result,$i,"user");
$timeStamp=mysql_result($result,$i,"timeStamp");
$timeonticket=mysql_result($result,$i,"timeonticket");
$thread=mysql_result($result,$i,"thread");
$replies=mysql_result($result,$i,"replies");
$replylength=mysql_result($result,$i,"replylength");
$shiftReplies=mysql_result($result,$i,"shiftReplies");
$threadreplies=mysql_result($result,$i,"threadreplies");
$iskb=mysql_result($result,$i,"iskb");
$howold=mysql_result($result,$i,"howold");
$usertype=mysql_result($result,$i,"usertype");
$entityId=mysql_result($result,$i,"entityId");
$feedbackStatus=mysql_result($result,$i,"feedbackStatus");
$feedbackMessage=mysql_result($result,$i,"feedbackMessage");
$feedbackGiver=mysql_result($result,$i,"feedbackGiver");
$feedbackSeen=mysql_result($result,$i,"feedbackSeen");

$return_arr[$i]=
 array(
        'id' => $id,
        'user' => $user,
        'timeStamp' => $timeStamp,
		'timeonticket' => $timeonticket,
        'thread' => $thread,
		'replies' => $replies,
        'replylength' => $replylength,
		'shiftReplies' => $shiftReplies,
		'threadreplies' => $threadreplies,
		'iskb' => $iskb,
		'howold' => $howold,
		'usertype' => $usertype,
		'entityId' => $entityId,
		'feedbackStatus' => $feedbackStatus,
		'feedbackMessage' => $feedbackMessage,
		'feedbackGiver' => $feedbackGiver,
		'feedbackSeen' => $feedbackSeen,
		
		);
		
		$i++;
		


}


echo json_encode($return_arr);
mysql_query($query);
mysql_close($con); 



}

if ($action=='FEEDBACK')
{
$query = "UPDATE elementGrabber SET feedbackStatus='$feedbackStatus',feedbackMessage='$feedbackMessage',feedbackGiver='$feedbackGiver' WHERE entityId='$entityId' ";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
mysql_close($con);

echo "OK";
}




if ($action=='a'){
$query = "INSERT INTO tpfbi VALUES ('','$event','$sub','$p1','$p2','$time','$userId')";

mysql_query("SET NAMES 'utf8'");
mysql_query($query);
echo 'OK';

mysql_close($con);
}





?>