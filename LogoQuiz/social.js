function shareAchievement(){

	var msg="הרווחתי הישג חדש! - "+achman.current.fbDescription;
	var pic ="http://holeinsock.com/LQ/ach/"+achman.current.image+".png";
facebookAPI.post({"name":"Logo Quiz IL","caption":msg,"link":"http://www.facebook.com/LogoQuizIL","picture":pic},function(e){handleAchShare(e);});



}




	function postToFacebook() {
	
	
	var msg="חברים, אני תקוע בלוגו מסויים, תוכלו לעזור לי לנחש מה הוא?";
	var pic ="http://holeinsock.com/LQ/logos/"+logos[curid].id+".png";
facebookAPI.post({"name":"Logo Quiz IL","caption":msg,"link":"http://www.facebook.com/LogoQuizIL","picture":pic},function(e){handleFriends(e);});
}

	function shareApp() {
	
	var msg="לוגו קוויז IL, המשחק הכי כחול לבן ברשת, עכשיו גם לאייפון וגם לאנדרואיד! אז.. למה אתם מחכים?";
	var pic ="http://holeinsock.com/LQ/android.png";
facebookAPI.post({"name":"Logo Quiz IL","caption":msg,"link":"http://www.facebook.com/LogoQuizIL","picture":pic},function(e){handleShare(e);});
}


function handleFriends(e){
if (e!=null)
 if (e.success!=null)
 if (e.success){
	userProgress.achievements.friendsAsked++;
	console.log('Friend asked ++');
	saveProgress();
	}
 



}


function handleAchShare(e){
console.log("Sharing "+achman.current.id);
if (e!=null)
 if (e.success!=null)
 if (e.success){
	userProgress.achievements.achievementsShared++;
	if (achman.current.id==51) {userProgress.achievements.specialAchievementShared=true;console.log('shared special!');}
	
	console.log('Achievements Asked ++');
	saveProgress();
	}
 



}


function handleShare(e){
console.log(e);
if (e!=null)
 if (e.success!=null)
 if (e.success){
 
 now=(new Date()).getTime();
 last=userProgress.lastShared;
 if (last==null) last=0;
 console.log("difference - "+(now-last));
 if (now-last>1000*60*60*24) // if a day as passed
       {
			lq.giveFeedback('תודה רבה על השיתוף, 15 רמזים נוספו להנאתך!');
			userProgress.hints+=15;
			
			userProgress.lastShared=now;
			userProgress.achievements.timesShared++;
			saveProgress();
	   }
	   else{
	   
	   lq.giveFeedback('תודה רבה על שיתופך, כדי לקבל עוד רמזים אנא שתף במרווח של לפחות יממה בין כל שיתוף','',5000);
	   }
 
 }

}