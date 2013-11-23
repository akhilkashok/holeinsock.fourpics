<?php

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$remarks = $_POST['remarks'];
$redir=$_POST['thankyouurl'];


 $to = "maxifren@gmail.com";
 $subject = "New Lead";
 $body = $name."\n".$phone."\n".$email."/n".$remarks ;
 $headers = "From: master@deisgnplus.co.il\r\n" .
     "X-Mailer: php";
 if (mail($to, $subject, $body, $headers)) {
   echo('<script type="text/javascript">  window.parent.location.href="'.$redir.'" </script>');
  } else {
	
   echo("<p>Error</p>");
  }
 ?>