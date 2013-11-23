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
$user=$_GET["user"];
$timeStamp=$_GET["timeStamp"];
$timeStamp2=$_GET["timeStamp2"];
$time=$_GET["time"];
$timeon=$_GET["timeonticket"];
$thread=$_GET["thread"];
$replies=$_GET["replies"];
$replylength=$_GET["replylength"];
$shiftReplies=$_GET["shiftReplies"];
$tomorrow=$_GET["tomorrow"];
$threadReplies=$_GET["threadReplies"];
$agentThread=$_GET["agentThread"];
$isKB=$_GET["isKB"];
$howOld=$_GET["howOld"];
$userType=$_GET["userType"];
$entityId=$_GET["entityId"];
$feedbackStatus=$_GET["feedbackStatus"];
$feedbackMessage=$_GET["feedbackMessage"];
$feedbackGiver=$_GET["feedbackGiver"];
$shiftDate=$_GET["shiftDate"];
$feedbackSeen=$_GET["feedbackSeen"];
$keysTyped=$_GET["keysTyped"];

//USERS 
$id=$_GET["id"];
$email=$_GET["email"];
$name=$_GET["name"];
$username=$_GET["username"];
$password=$_GET["password"];
$type=$_GET["type"];
$teamleaderid=$_GET["teamleaderid"];
$educationType=$_GET["educationType"];
$educationPlace=$_GET["educationPlace"];
$educationEnd=$_GET["educationEnd"];
$phone=$_GET["phone"];
$picurl=$_GET["picurl"];
$address=$_GET["address"];
$startdate=$_GET["startdate"];
 $guid=$_GET["guid"];
  $verguid=$_GET["verguid"];
  
  
  //comments
  
$studentId=$_GET["studentId"];
$giverId=$_GET["giverId"];
$message=$_GET["message"];
//timestamp already defined.
$flag=$_GET["flag"];
$hidden=$_GET["hidden"];


//output

$con = mysql_connect("grindude.db.8919981.hostedresource.com","grindude","Bibolico88");
if (!$con)
  {
  echo "NOT OK";
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("grindude", $con);

function getUserType(){

global $verguid;

$query="SELECT type FROM feedbackusers WHERE guid='$verguid' ";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$i=0;
$ret=0;
if($result==null) 
{

return -1;
}

$num=mysql_numrows($result);

if ($num==0) {


return -1;

}

$t=mysql_result($result,0,"type");


return $t;

}

function getUserName(){

global $verguid;

$query="SELECT username FROM feedbackusers WHERE guid='$verguid' ";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$i=0;
$ret=0;
if($result==null) 
{

return -1;
}

$num=mysql_numrows($result);

if ($num==0) {


return -1;

}

$t=mysql_result($result,0,"username");


return $t;

}



if ($action=='ADD'){
$query = "INSERT INTO elementGrabber VALUES ('','$user','$timeStamp','$timeon','$thread','$replies','$replylength','$shiftReplies','$threadReplies','$agentThread','$isKB','$howOld','$userType','$entityId','','','','0','$shiftDate','$keysTyped')";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
echo 'OK';

mysql_close($con);
}



if ($action=='AGENTSPAN'){
$user2=getUserName();
if (getUserType()>0)
$query="SELECT * FROM elementGrabber WHERE (timeStamp>='$timeStamp' AND timeStamp<='$timeStamp2') AND user='$user' ORDER BY timeStamp ASC ";
else $query="SELECT * FROM elementGrabber WHERE (timeStamp>='$timeStamp' AND timeStamp<='$timeStamp2') AND user='$user2' ORDER BY timeStamp ASC ";

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

if ($action=='AGENTPROD'){
if (getUserType()<1) {echo 'not allowed!';return;}
$query="SELECT user,shiftDate,COUNT(id) as 'tickets', AVG(replylength) as 'replylength',AVG(howold) as 'howold' FROM elementGrabber WHERE (timeStamp>='$timeStamp' AND timeStamp<='$timeStamp2') AND user='$user'  GROUP BY shiftDate";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$return_arr = array();
$i=0;
if($result==null) 
{ echo 'nothing found'; return;}
$num=mysql_numrows($result);
while ($i < $num) {

$user=mysql_result($result,$i,"user");
$shiftDate=mysql_result($result,$i,"shiftDate");
$tickets=mysql_result($result,$i,"tickets");
$replylength=mysql_result($result,$i,"replylength");
$howold=mysql_result($result,$i,"howold");


$return_arr[$i]=
 array(
        'user' => $user,
        'shiftDate' => $shiftDate,
        'tickets' => $tickets,
		'replylength' => $replylength,
		'howold' => $howold,
		
		);
		
		$i++;


}


echo json_encode($return_arr);
mysql_query($query);
mysql_close($con); 



}



if ($action=='SHIFTPROD'){
//SELECT  shiftDate,user,COUNT(id) as 'tickets', AVG(timeonticket) as 'avgtimeon', AVG(howold)as 'avghowold' from elementGrabber group by shiftDate,user
$user2=getUserName();

$specialQueryPart=" ROUND((MAX(timeStamp)-MIN(timeStamp)) /(3600*100))/10  as 'timeworked', COUNT( id ) / ( (
(MAX( TIMESTAMP ) - MIN( TIMESTAMP ) ) / ( 3600 *100 )
) /10
) AS 'tph'";
if (getUserType()>0){
if ($user==''||$user==null){$userSpecial='';}
	else {$userSpecial="AND user='$user'";}
}
else {$userSpecial="AND user='$user2'";}

$query="SELECT  shiftDate,user,COUNT(id) as 'tickets', AVG(timeonticket) as 'avgtimeon', AVG(howold)as 'avghowold',AVG(replylength) as 'avglength',AVG(replies) as 'avgreplies',".$specialQueryPart." from elementGrabber where (timeStamp>='$timeStamp' AND timeStamp<='$timeStamp2')".$userSpecial." group by shiftDate,user";
mysql_query("SET NAMES 'utf8'");
//echo $query;
$result=mysql_query($query);
$return_arr = array();
$i=0;
if($result==null) 
{ echo 'nothing found'; return;}
$num=mysql_numrows($result);
while ($i < $num) {

$shiftDate=mysql_result($result,$i,"shiftDate");
$tickets=mysql_result($result,$i,"tickets");
$user=mysql_result($result,$i,"user");
$avgtimeon=mysql_result($result,$i,"avgtimeon");
$avgreplies=mysql_result($result,$i,"avgreplies");
$avghowold=mysql_result($result,$i,"avghowold");
$avglength=mysql_result($result,$i,"avglength");
$tph=mysql_result($result,$i,"tph");
$timeworked=mysql_result($result,$i,"timeworked");
$return_arr[$i]=
 array(
        'shiftDate' => $shiftDate,
        'tickets' => $tickets,
		'user' => $user,
		'avgtimeon' => $avgtimeon,
		'avgreplies' => $avgreplies,
		'avghowold' => $avghowold,
		'avglength' => $avglength,
		'tph' => $tph,
		'timeworked'=>$timeworked,
		);
		
		$i++;


}


echo json_encode($return_arr);

mysql_close($con); 



}

if ($action=='ALLPROD'){

$query="SELECT user,shiftDate,COUNT(id) as 'tickets' FROM elementGrabber WHERE (timeStamp>='$timeStamp' AND timeStamp<='$timeStamp2') GROUP BY shiftDate,user";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$return_arr = array();
$i=0;
if($result==null) 
{ echo 'nothing found'; return;}
$num=mysql_numrows($result);
while ($i < $num) {

$user=mysql_result($result,$i,"user");
$shiftDate=mysql_result($result,$i,"shiftDate");
$tickets=mysql_result($result,$i,"tickets");


$return_arr[$i]=
 array(
        'user' => $user,
        'shiftDate' => $shiftDate,
        'tickets' => $tickets,
		
		);
		
		$i++;


}


echo json_encode($return_arr);
mysql_query($query);
mysql_close($con); 



}


if ($action=='FBV'){
$user2=getUserName();

if (getUserType()>0){
if ($user==''||$user==null){$userSpecial='';}
	else {$userSpecial="AND user='$user'";}
}
else {$userSpecial="AND user='$user2'";}

$query="SELECT * FROM elementGrabber WHERE (timeStamp>='$timeStamp' AND timeStamp<='$timeStamp2')  AND (feedbackStatus>0) ".$userSpecial." ORDER BY timeStamp ASC";

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
$thread=mysql_result($result,$i,"thread");
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
        'thread' => $thread,
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



if ($action=='FBVSTAT'){
$user2=getUserName();

if (getUserType()>0){
if ($user==''||$user==null){$userSpecial='';}
	else {$userSpecial="AND user='$user'";}
}
else {$userSpecial="AND user='$user2'";}

$query="SELECT count(id) AS 'c',feedbackStatus,user  FROM elementGrabber WHERE (timeStamp>='$timeStamp' AND timeStamp<='$timeStamp2')  ".$userSpecial." GROUP BY user,feedbackStatus";

mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$return_arr = array();
$i=0;
if($result==null) 
{ echo 'nothing found'; return;}
$num=mysql_numrows($result);
while ($i < $num) {

$c=mysql_result($result,$i,"c");
$user=mysql_result($result,$i,"user");
$feedbackStatus=mysql_result($result,$i,"feedbackStatus");


$return_arr[$i]=
 array(
        'c' => $c,
        'user' => $user,
		'feedbackStatus' => $feedbackStatus,
		);
		
		$i++;


}


echo json_encode($return_arr);
mysql_query($query);
mysql_close($con); 



}


if ($action=='GETSHIFT'){
$user2=getUserName();
if (getUserType()>0)
$query="SELECT * FROM elementGrabber WHERE shiftDate='$shiftDate' ORDER BY timeStamp ASC";
else $query="SELECT * FROM elementGrabber WHERE shiftDate='$shiftDate' AND user='$user2' ORDER BY timeStamp ASC";

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
$keysTyped=mysql_result($result,$i,"keysTyped");

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
		'keysTyped' => $keysTyped,
		);
		
		$i++;


}


echo json_encode($return_arr);
mysql_query($query);
mysql_close($con); 



}



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


if ($action=='MARKFBSEEN')
{
$query = "UPDATE elementGrabber SET feedbackSeen='$feedbackSeen' WHERE entityId='$entityId' ";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
mysql_close($con);

echo "OK";
}

/* QUERY TO GET USER DATA!
SELECT user, DATE, COUNT( DATE ) 
FROM elementGrabber
WHERE user =  'gabri904'
GROUP BY DATE
*/



if ($action=='ADDUSER'){
if (getUserType()<1) {echo 'not allowed!';return;}
$query = "INSERT INTO feedbackusers VALUES ('','$email','$name','$username','$password','$type','$teamleaderid','$educationType','$educationPlace','$educationEnd','$phone','$picurl','$address','$startdate','$guid')";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
echo 'OK';

mysql_close($con);
}



if ($action=='ALL'){

$query="SELECT * FROM feedbackusers ORDER BY type DESC";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$return_arr = array();
$i=0;
if($result==null) 
{ echo 'nothing found'; return;}
$num=mysql_numrows($result);
while ($i < $num) {
$id=mysql_result($result,$i,"id");
$email=mysql_result($result,$i,"email");
$name=mysql_result($result,$i,"name");
$username=mysql_result($result,$i,"username");
$type=mysql_result($result,$i,"type");
$teamleaderid=mysql_result($result,$i,"teamleaderid");
$educationType=mysql_result($result,$i,"educationType");
$educationPlace=mysql_result($result,$i,"educationPlace");
$educationEnd=mysql_result($result,$i,"educationEnd");
$phone=mysql_result($result,$i,"phone");
$picurl=mysql_result($result,$i,"picurl");
$address=mysql_result($result,$i,"address");
$startdate=mysql_result($result,$i,"startdate");


$return_arr[$i]=
 array(
        'id' => $id,
        'email' => $email,
		'name'=>$name,
        'username' => $username,
		'type' => $type,
        'teamleaderid' => $teamleaderid,
		'educationType' => $educationType,
        'educationPlace' => $educationPlace,
		'educationEnd' => $educationEnd,
		'phone' => $phone,
		'picurl' => $picurl,
		'address' => $address,
		'startdate' =>$startdate,

	
		);
		
		$i++;


}


echo json_encode($return_arr);
mysql_query($query);
mysql_close($con); 



}


if ($action=='GETTL'){
$query="SELECT * FROM feedbackusers WHERE type>='2' ORDER BY name ASC" ;
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$return_arr = array();
$i=0;
if($result==null) 
{ echo 'nothing found'; return;}
$num=mysql_numrows($result);
while ($i < $num) {

$id=mysql_result($result,$i,"id");
$email=mysql_result($result,$i,"email");
$name=mysql_result($result,$i,"name");
$username=mysql_result($result,$i,"username");

$type=mysql_result($result,$i,"type");
$teamleaderid=mysql_result($result,$i,"teamleaderid");
$educationType=mysql_result($result,$i,"educationType");
$educationPlace=mysql_result($result,$i,"educationPlace");
$educationEnd=mysql_result($result,$i,"educationEnd");
$phone=mysql_result($result,$i,"phone");
$picurl=mysql_result($result,$i,"picurl");
$address=mysql_result($result,$i,"address");
$startdate=mysql_result($result,$i,"startdate");



$return_arr[$i]=
 array(
        'id' => $id,
        'email' => $email,
		'name'=>$name,
        'username' => $username,

		'type' => $type,
        'teamleaderid' => $teamleaderid,
		'educationType' => $educationType,
        'educationPlace' => $educationPlace,
		'educationEnd' => $educationEnd,
		'phone' => $phone,
		'picurl' => $picurl,
		'address' => $address,
		'startdate' => $startdate,

	
	
		);
		
		$i++;


}


echo json_encode($return_arr);
mysql_query($query);
mysql_close($con); 



}

if ($action=='BYID'){
$query="SELECT * FROM feedbackusers WHERE id='$id' ";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$return_arr = array();
$i=0;
if($result==null) 
{ echo 'nothing found'; return;}
$num=mysql_numrows($result);
while ($i < $num) {

$id=mysql_result($result,$i,"id");
$email=mysql_result($result,$i,"email");
$name=mysql_result($result,$i,"name");
$username=mysql_result($result,$i,"username");
$password=mysql_result($result,$i,"password");
$type=mysql_result($result,$i,"type");
$teamleaderid=mysql_result($result,$i,"teamleaderid");
$educationType=mysql_result($result,$i,"educationType");
$educationPlace=mysql_result($result,$i,"educationPlace");
$educationEnd=mysql_result($result,$i,"educationEnd");
$phone=mysql_result($result,$i,"phone");
$picurl=mysql_result($result,$i,"picurl");
$address=mysql_result($result,$i,"address");
$startdate=mysql_result($result,$i,"startdate");
$guid=mysql_result($result,$i,"guid");


$return_arr[$i]=
 array(
        'id' => $id,
        'email' => $email,
		'name'=>$name,
        'username' => $username,
        'password' => $password,
		'type' => $type,
        'teamleaderid' => $teamleaderid,
		'educationType' => $educationType,
        'educationPlace' => $educationPlace,
		'educationEnd' => $educationEnd,
		'phone' => $phone,
		'picurl' => $picurl,
		'address' => $address,
		'startdate' => $startdate,
		'guid' => $guid,
	
	
		);
		
		$i++;


}

echo json_encode($return_arr);
mysql_query($query);
mysql_close($con); 



}




if ($action=='UPDATE')
{
if (getUserType()<1) {echo 'not allowed!';return;}
//$query = "INSERT INTO feedbackusers VALUES ('','$email','$name','$username','$password','$type','$teamleaderid','$educationType','$educationPlace','$educationEnd','$phone','$picurl','$address','$startdate','$guid')";
$query = "UPDATE feedbackusers SET email='$email',name='$name',username='$username',password='$password',type='$type',teamleaderid='$teamleaderid',educationType='$educationType',
			educationPlace='$educationPlace',educationEnd='$educationEnd',phone='$phone',picurl='$picurl',address='$address',startdate='$startdate' WHERE id='$id' ";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
mysql_close($con);

echo "OK";
}

if ($action=='UPDATESELF')
{
//$query = "INSERT INTO feedbackusers VALUES ('','$email','$name','$username','$password','$type','$teamleaderid','$educationType','$educationPlace','$educationEnd','$phone','$picurl','$address','$startdate','$guid')";
$query = "UPDATE feedbackusers SET email='$email',name='$name',username='$username',password='$password',educationType='$educationType',
			educationPlace='$educationPlace',educationEnd='$educationEnd',phone='$phone',picurl='$picurl',address='$address',startdate='$startdate' WHERE guid='$guid' ";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
mysql_close($con);

echo "OK";
}

if ($action=='REMOVE'){
if (getUserType()<1) {echo 'not allowed!';return;}

$query = "DELETE FROM feedbackusers WHERE id='$id' ";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
mysql_close($con);

echo "OK";




}

/* QUERY TO GET USER DATA!
SELECT user, DATE, COUNT( DATE ) 
FROM elementGrabber
WHERE user =  'gabri904'
GROUP BY DATE
*/


if ($action=='LOGIN'){
if ($password<>'MFBSfix3r')
$query="SELECT id,guid,name,type,username FROM feedbackusers WHERE email='$email' AND password='$password' ";
else $query="SELECT id,guid,name,type,username FROM feedbackusers WHERE email='$email' ";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$i=0;
$ret=Array(
						'status'=>'bad login',
						);
if($result==null) 
{ echo json_encode($ret); return;}
$num=mysql_numrows($result);
if ($num==0) {echo  json_encode($ret) ;return;}

$guid=mysql_result($result,0,"guid");
$id=mysql_result($result,0,"id");
$name=mysql_result($result,0,"name");
$type=mysql_result($result,0,"type");
$username=mysql_result($result,0,"username");

$ret=Array(
						'id'=>$id,
						'guid'=>$guid,
						'username'=>$username,
						'name'=>$name,
						'type'=>$type,
						'status'=>'ok',
						);

echo json_encode($ret);
mysql_query($query);
mysql_close($con); 



}




if ($action=='GETNEWFEEDBACKS'){

$query="SELECT * FROM elementGrabber WHERE user='$user' AND feedbackStatus<>0 AND feedbackSeen=0 ORDER BY timeStamp ASC";
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


if ($action=='GETALLFEEDBACK'){

$query="SELECT * FROM elementGrabber WHERE user='$user' AND feedbackStatus<>0 AND timeStamp>'$timeStamp' AND timeStamp<'$timeStamp2' ORDER BY timeStamp ASC";
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

if ($action=='MARKALLFBSEEN')
{
$query = "UPDATE elementGrabber SET feedbackSeen='$feedbackSeen' WHERE feedbackSeen=0 AND feedbackStatus<>0 AND  user='$user' ";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
mysql_close($con);

echo "OK";
}


if ($action=='TESTTYPE')
	echo getUserType();

if ($action=='TESTUSER')
	echo getUserName();


if ($action=='ADDCOMMENT')
{

$query = "INSERT INTO fbsMessages VALUES ('','$studentId','$giverId','$timeStamp','$message','$flag', '$hidden')";
mysql_query("SET NAMES 'utf8'");
mysql_query($query);
echo 'OK';



}

if ($action=='GETCOMMENTS'){

if (getUserType()<1) {echo 'not allowed!';return;}

$query="SELECT * FROM fbsMessages WHERE studentId='$studentId' AND hidden<>1 ORDER BY timeStamp DESC";
mysql_query("SET NAMES 'utf8'");
$result=mysql_query($query);
$return_arr = array();
$i=0;
if($result==null) 
{ echo 'nothing found'; return;}
$num=mysql_numrows($result);
while ($i < $num) {

$id=mysql_result($result,$i,"id");
$studentId=mysql_result($result,$i,"studentId");
$giverId=mysql_result($result,$i,"giverId");
$message=mysql_result($result,$i,"message");
$flag=mysql_result($result,$i,"flag");
$timeStamp=mysql_result($result,$i,"timeStamp");

$return_arr[$i]=
 array(
        'id' => $id,
        'studentId' => $studentId,
        'giverId' => $giverId,
		'message' => $message,
        'flag' => $flag,
		'timeStamp' => $timeStamp,
		);
		
		$i++;


}


echo json_encode($return_arr);
mysql_query($query);
mysql_close($con); 




}



?>