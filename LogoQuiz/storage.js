//	**** Library to deal with local storage and maybe AJAxX
// 			Deals with progress and score saving, settings and retiraval of data from localStorage
//
//


var SCORE=0;
var FIRSTTIME=1;
var LOGOPROG=100;
var USERPROG=500;
var levelNum=8;

var wasFirstTime=false;
var version=1;  //  1 = 31.10 21:41  // 4=4.12
                                    // 0 ,20,35,50,65,70,80,100
                                    //0,1,2,  3,  4 ,5, 6 ,7 , 8  ,9,10,11,12,13,14,15,16,17,18 
var catNums=new Array(9,5,13,22,10,6,20,11,10,15,18,14,18,7,10,30,9,29,5,12);
var catNames=new Array("תקשורת","ביטוח","פיננסים","מזון","תחבורה","תשתיות","רשתות שיווק","ביגוד","אקדמיה","עמותות וארגונים","הייטק","משקאות","מדיה","קוסמטיקה","תעשיה כבדה","אחר","תיירות","מסעדות","קרנות וחברות השקעות","בנייה ונדלן");




var verman=new function(){

this.version=3;
this.dates=new Array('','06/12/2012');
this.messages=new Array( 
										  new Array(''),
										  new Array(''),
										 new Array("-תוקן כפתור החזרה באנדרואיד","-תוקן הבאג בו נפתחת תוכנת האימייל במכשירים מסויימים")
										  );


this.showTooltip=function(){

last=userProgress.version;
if (this.version>last) {
t=his.e('versionTooltip');
t.style.left='50%';

m=his.e('versionMessages');


for (var i=last+1;i<this.messages.length;i++) {

	cur=this.messages[i];
	if (cur.length!=null)
	  for (var j=0;j<cur.length;j++){
	  
	  p=document.createElement('p');
	  p.textContent=cur[j];
	  m.appendChild(p);
	  
	    
	}

   }
   


}
else { console.log('no new version for verman to show'); this.closeTooltip();}

}

this.closeTooltip=function(){
t=his.e('versionTooltip');

t.style.left='1000px';
setTimeout(function(){his.e('main').removeChild(his.e('versionTooltip'));},3000);

userProgress.version=this.version;
saveProgress();
}


}


var initCatNums=new function(){

catNums=new Array();
for (var i=0;i<logos.length;i++){


if (catNums[logos[i].category]==null)
 catNums[logos[i].category]=0;
 
if (logos[i].level>0&&logos[i].level<5){


catNums[logos[i].category]++;
}


}
}

function useHandicap(){

if (userProgress.usedHandicap)
	lq.giveFeedback('השתשמת כבר באפשרות הזאת');
else 
			{
					
					userProgress.completed+=100;
					userProgress.usedHandicap=true;
					saveProgress();
					lq.giveFeedback('הקוד הוכנס בהצלחה! אנא פתור לוגו נוסף על מנת שהשינויים יכנסו לתוקף');
			
			}




}
									
var userProgress=new function()
{


this.version=verman.version;
this.hints=10;
this.lastShared=0;
this.enableSounds=true;
this.userHandicap=false;



this.achievementsCompleted=new Array();
this.achievements=new function() 
	{
		this.firstAttempts=0;
		this.perfects=0;
		this.mostAttempts=0;
		this.badScores=0;
		this.hintsUsed=0;
		this.mostTime=0;
		this.leastTime=9999999;
		this.timesShared=0;
		this.friendsAsked=0;
		this.achievementsShared=0;
		this.specialAchievementShared=false; // did he share the achievement sharing achievem
		this.wasBored=false;
	}
this.levels=new Array();
for (var i=1;i<levelNum+1;i++)
	{
		this.levels[i]=new function(){
			this.completed=0;
			this.fastest=999;
			this.perfects=0;
			this.score=0;
			
			
			}
	}
this.categories=new Array();

for (var i=0;i<catNums.length;i++) this.categories[i]=0;


this.totalScore=0;
this.completed=0;
// \/  Load logos completion data.
this.logos=new Array();
for (var i=0;i<logos.length;i++)
	{
		this.logos[i]=new function()
		  {
			this.score=0;
			this.completed=false;
			this.completedInBlue=false;
			this.attempts=0;
			this.options=new Array();
			this.hintsUsed=0;
			this.keysHidden=false;
			this.hints=new Array('',false,false,false);
		  }

	}
	


}




function initStorage()
{
	writeData(FIRSTTIME,false);
	saveProgress();
	loadLevelCards();
	// ...
}



function writeData(key,val){
	
	localStorage[key]=val;
}

function readData(key){

return localStorage[key];
}

function clearAll(){

localStorage.clear();

}


function saveProgress()
{
	userProgress.score=totalScore;
	
	
	writeData(USERPROG,JSON.stringify(userProgress));
	
	
}




function firstTime()
{
	if (readData(USERPROG)==null) return true;
	t=JSON.parse(readData(USERPROG));
	//if (t.version!=version) {return true;}
	
	return false;
}

function loadProgress(){



if (firstTime()){
wasFirstTime=true;
	initStorage();
	}
else
{
console.log(userProgress);
userProgress=JSON.parse(readData(USERPROG));
//sdb
console.log(userProgress);
var c=0;
for (var i=0;i<logos.length;i++)
	{
		if (userProgress.logos[i]==null) userProgress.logos[i]=new function()
		  {
			this.score=0;
			this.completed=false;
			this.completedInBlue=false;
			this.attempts=0;
			this.options=new Array();
			this.hintsUsed=0;
			this.keysHidden=false;
			this.hints=new Array('',false,false,false);
		  }
		if (userProgress.logos[i].completed) c++;
	}
console.log("completed loaded:"+c);
//edb
totalScore=userProgress.score;
loadThumbs();
loadScore();
loadLevelCards();
loadSettings();

       }
	   
	 if (userProgress.nativeKeyboard==null) userProgress.nativeKeyboard=false;

}

function loadSettings(){

msg="הפעל סאונד";
if (userProgress.enableSounds) msg="השתק סאונד";

his.e('btSounds').textContent=msg;

msg="השתמש במקלדת רגילה";
if (userProgress.nativeKeyboard) msg="אל תשתמש במקלדת רגילה";

his.e('btKeyboardToggle').textContent=msg;

}

function loadScore()
{
	totalScore=userProgress.score;
	his.e('scoreHolder').textContent=totalScore;
	his.e('scoreHolderLevel').textContent=totalScore;
}
function loadThumbs()
{
	for (var i=0;i<logos.length;i++)
	{

		if (userProgress.logos[i].completed)
		{
				if(his.e('thumb'+i)!=null){
				his.e('thumb'+i).style.opacity='1';
				his.e('thumb'+i).style.backgroundImage='url(thumbs/muhan/'+logos[i].id+".png)";
				his.e('check'+i).style.display='inline-block';
				console.log('true');
				}
		}
	}
				

}

var unlock=new function(){

                                              // 0  0   0.5  
        this.needed=new Array(0,0  ,20,45,80,115,155,215,265);
this.neededRaw=new Array(0,0 ,20,25,  35   ,35, 40  ,45  ,50);  // when new levels are added redo achievements!!
this.nextLevel=function(){
													var c=userProgress.completed;
													var next=1;
													for (var i=1;i<this.needed.length;i++)
													{
													
													if (this.needed[i]>c) return i;
													}
													
													
												
													 
													 return 99;  // all open


}

this.logosToNext=function(){
													var c=userProgress.completed;
													if (this.nextLevel()==99) return 99;
													return (this.needed[this.nextLevel()]-c);
													}

this.progressLeftToNext=function(){
															
															return (this.logosToNext()/this.neededRaw[this.nextLevel()]);

															
															
															}
													
													}

function loadLevelCards(){
for (var i=1;i<levelNum+1;i++)
	{
	levelProg=userProgress.levels[i];
	if (levelProg==null) {
	  userProgress.levels[i]=new function(){
			this.completed=0;
			this.fastest=999;
			this.perfects=0;
			this.score=0;}
			
			levelProg=userProgress.levels[i];
	}
			
	
	console.log(i);
	his.e('l'+i+'Score').textContent=levelProg.score;

	if (levelProg.completed>0) his.e('l'+i+'Fastest').textContent=mathHelper.cutDecimal(levelProg.fastest,2)+" ש."
	else his.e('l'+i+'Fastest').textContent="-";
	his.e('l'+i+'Perfects').textContent=levelProg.perfects;
	changeProgress(i,(levelProg.completed/40));
	his.e('l'+i+'Progress').textContent=levelProg.completed+"/40";
	his.e('l'+i).className="levelCard";
	if (levelProg.completed==40) his.e('l'+i).className="levelCard levelCardDone";
	
	var pl=his.e('l'+i+'ProgressBarLeft');
	if (i==unlock.nextLevel()){
	n=unlock.progressLeftToNext();
	console.log(n);
	changeProgressHelper(pl,n);
	his.e('l'+i).className="levelCardLocked";
	
	}
	if (i>unlock.nextLevel()){
	
	his.e('l'+i).className="levelCardLocked";
	
	changeProgressHelper(pl,1);
	}


}
}


//debug shit

function addToLevel(n,s){

userProgress.levels[n].completed+=s;
userProgress.completed+=s;
loadLevelCards();
}



