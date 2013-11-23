
var curpage=0;
var curid=0;
var answer="";
var correct="תנובה";
var currentLevel=1;
var ad=null;

var startTime=0;
var totalScore=0;
var score=0;
var totalTries=new Array();
var logosComplete=new Array();

var startTouchX=0;
var startScrollerX=0;
var  translateStart=0;
var lastTranslate=0;
var touchTime=0;
var cheatMode=false;
var  scrollerLeft=0;

var betaTesting=false;
var killTime=new Date('January 18 2013');

var levelsTranslate=0;

var thumbsTranslate=0;


var enableSwitch=true;


var init = function(){


createbuttons();

fillLevel(1);

/**$.ajax({
        type: "GET",
	url: "http://localhost:58888/holeinsock.logoquiz/3.4.0/logos.xml",
	dataType: "xml",
	success: function(xml) {
	a=xml2json(xml).replace('undefined','');
	b=JSON.parse(a);
	}
});**/   // LEFT TO ADD AJAXING STUFF EXAMPLE;

facebookAPI.init();

loadProgress();
trivia.updateSplash();
setupTouchers();


his.e('tbi').addEventListener('keypress',function(e){answer=this.value;

if (e.keyCode==13) 
	checkAnswer();
});

if (AppMobi) if (AppMobi.device) if (AppMobi.device.hideStatusBar)
AppMobi.device.hideStatusBar();
setTimeout(function(){
										setTimeout(function(){
																				achman.checkForAchievements();
																				verman.showTooltip();
																				his.e('main').removeChild(his.e('mySplash'));},1700);
																				
										his.e('mySplash').style.left='700px';
										handleIpad();
										//placeFooter();
										setSize(0);
										dataCache.init();
										dataCache.startFrame(3);
										showOnly(3);
										hwBackButton_Capture(true);
										ads.getAds();
										sekindo.init();
										sekindo.hide();
										
										}
										
										,4200);
										

										
										
};


lq=new function()
{

this.feedbackTimeout=null;

this.giveFeedback=function(msg,color,delay,url)
{
	
	clearTimeout(this.feedbackTimeout);
	
	if (delay==null) delay=1500;
	fb=his.e('feedback');
	fb.style.left="50%";
	fb.textContent=msg;
	fb.style.opacity=1;
	/*if (color!=null)
	{
	fb.style.color=color;

	}
	else fb.style.color='black';*/
	
	this.feedbackTimeout=setTimeout(function(){ his.e('feedback').style.opacity=0;fb.style.left="1000px";},delay);
	
	
}
this.debug=function(msg,msg2,msg3){

$('#debugger').text(msg+' '+msg2+' '+msg3);

}

}

function createbuttons()
{
	var kb=document.getElementById('kboard');
	var row1=document.createElement('div');
	
	
	var row2=document.createElement('div');
	var row3=document.createElement('div');
	var space=document.createElement('div');
	
	row1.className='kbRow1';
	row2.className='kbRow2';
	row3.className='kbRow3';
	space.className='kbSpace';
	//Row 1
	for (var i=0;i<9;i++)
	{
		var key=document.createElement('div');
		key.type='button';
		key.id='kb'+i;
		key.textContent=he[i].toUpperCase();
		key.className='kbbutton';
		//key.setAttribute('onclick','alert("yo");kbclick('+i+');');
	//	key.setAttribute('ontouchstart','kbclick('+i+');');
			 		key.addEventListener('touchstart', function(ev) {
					
											id=parseInt(ev.srcElement.id.replace("kb",""));
											if (ev.srcElement.className.indexOf('hiddenKey')!=-1 && he[i]!='<-')  {console.log('disabled');return;}
											kbclick(id);
											ev.srcElement.className='kbbutton kbbuttonPressed';
														setTimeout(function(){ev.srcElement.className='kbbutton';},250);
											});

		

		row1.appendChild(key);
	}
	kb.appendChild(row1);
	
	//Row 2
	for (var i=9;i<19;i++)
	{
				var key=document.createElement('div');
		key.type='button';
		key.id='kb'+i;
		key.textContent=he[i].toUpperCase();
		key.className='kbbutton';
		//key.setAttribute('onclick','alert("yo");kbclick('+i+');');
	//	key.setAttribute('ontouchstart','kbclick('+i+');');
			 		key.addEventListener('touchstart', function(ev) {
					
											id=parseInt(ev.srcElement.id.replace("kb",""));
											if (ev.srcElement.className.indexOf('hiddenKey')!=-1 && he[i]!='<-')  {console.log('disabled');return;}
											kbclick(id);
											ev.srcElement.className='kbbutton kbbuttonPressed';
											
											setTimeout(function(){ev.srcElement.className='kbbutton';},250);
											});

		
		
		row2.appendChild(key);
	}
	kb.appendChild(row2);
	
		//Row 3
	for (var i=19;i<he.length;i++)
	{
					var key=document.createElement('div');
		key.id='kb'+i;
		key.textContent=he[i].toUpperCase();
		key.className='kbbutton';
		//key.setAttribute('onclick','alert("yo");kbclick('+i+');');
	//	key.setAttribute('ontouchstart','kbclick('+i+');');
			 		key.addEventListener('touchstart', function(ev) {
					
											id=parseInt(ev.srcElement.id.replace("kb",""));
											if (ev.srcElement.className.indexOf('hiddenKey')!=-1 && he[i]!='<-')  {console.log('disabled');return;}
											kbclick(id);
											ev.srcElement.className='kbbutton kbbuttonPressed';
											});
							key.addEventListener('touchend', function(ev) {
							
									if (ev.srcElement.className.indexOf('hiddenKey')!=-1 && he[i]!='<-')  {console.log('disabled');return;}
						ev.srcElement.className='kbbutton';
											});
		
		
		row3.appendChild(key);
	}
	kb.appendChild(row3);
			space.addEventListener('touchstart', function(ev) {
					
											id=parseInt(ev.srcElement.id.replace("kb",""));
											
											kbclick(50);
											console.log(ev);
											ev.srcElement.className=' kbSpace kbbuttonPressed';
											});
							space.addEventListener('touchend', function(ev) {
							
									
											ev.srcElement.className='kbSpace';
											});
		

	kb.appendChild(space);
}

function kbclick(i)
{
		
	 if (userProgress.enableSounds) AppMobi.player.playSound('sounds/kb.wav');
	var tbi=his.e('tbi');
	if (he[i]=='<-') {
	answer=answer.substring(0,answer.length-1);
		if (userProgress.nativeKeyboard)
     tbi.value=answer;
	}
	else if (i==50){
	if (answer.charAt(answer.length-1)!=' ')
	answer=answer+' ';
	tbi.value=answer;
	}
	else
	if (answer.length<22)
	{
			tbi.value=tbi.value+he[i];
			answer=tbi.value;
	
	}
	his.e('tbi').blur();
}
function checkAnswer()
{
    // store logo progress locally

	
	answer=his.e('tbi').value;
	var currentProg=userProgress.logos[curid]; 
	level=logos[curid].level;
	if (currentProg.completed){ lq.giveFeedback('כבר סיימת את הלוגו הנוכחי');return;}
	var levelProg=userProgress.levels[level];
	
	correct2=(logos[curid].name2)?logos[curid].name2:'und234234efined';
	correct3=(logos[curid].name3)?logos[curid].name3:'unde243243fined';
	if (answer=='משעמם לי') { userProgress.achievements.wasBored=true;saveProgress(); achman.checkForAchievements();return;}
	if (answer=='אניגביאניגבי') {debugMan.enabled=true;debugMan.msg('Debugger Started');return;}
	if (answer=='ביבוליקו') {userProgress.completed+=50;lq.giveFeedback('50 added');}
	if (answer=='פינגוויןרץיחף') cheatMode=true;
	if (answer=='באלילרמות') {useHandicap();return;}
	//debug methods 
	if (answer=='דיבאג') {his.e('debugger').style.display='block';}

	if (answer=='הגרל מחדש')  //db2
	{
		makeNew();
		lq.giveFeedback('לוגואים הוגרלו מחדש!');
	}
	else
	if (answer.toLowerCase()==correct.toLowerCase()||
		answer.toLowerCase()==correct2.toLowerCase()||
		answer.toLowerCase()==correct3.toLowerCase()) 
		{
			
			
			nowTime=(new Date).getTime();
			passedTime=mathHelper.cutDecimal( (nowTime-startTime)/1000,3);
			console.log("Passed time: "+passedTime);
			console.log("Total tentatives:" + (currentProg.attempts+1));
			feedback="נכון!";
			
			var chars=correct.length;
	var goodTime=parseInt((1500+950*chars)/1000)+3.5;
	console.log(goodTime);
	
			
			if (passedTime<goodTime&&currentProg.attempts<3) 
				{
					feedback='מעולה!';
					score=100;
				}
			else
					if (passedTime<goodTime+7&&currentProg.attempts<6) 
				{
				feedback='טוב מאוד!';
					
					score=80+ ((7-passedTime+goodTime)/7)*10+ ((3-currentProg.attempts)/3)*2;
					score=mathHelper.cutDecimal(score,0);
				}
				
			else
				{
					maxTries=100;
					maxTime=100;
					tries=maxTries+3-currentProg.attempts;
					time=maxTime+goodTime+7-passedTime;
					
					score=30+(tries/(maxTries+3))*30+(time/(maxTime+time+7))*40;
					score=mathHelper.cutDecimal(score,0);
				   
				}
				
				
				totalScore+=score;
				userProgress.totalScore=totalScore;
				
				// Save progress
				
				userProgress.categories[logos[curid].category]++;
				console.log("Now category "+logos[curid].category+ " has "+userProgress.categories[logos[curid].category]+ "completed");
				currentProg.score=score;
				currentProg.attempts++;

				userProgress.completed++;
				//userProgress.hints++;
				levelProg.score+=score;
				
				if (currentProg.options==null) currentProg.options=new Array();
		currentProg.options.push(answer);
		option='';
				for (i in currentProg.options) option+=currentProg.options[i]+',';
				entry={id:curid,name:logos[curid].name,tries:currentProg.attempts,time:parseInt(passedTime),device:"iphone",options:option};
				currentProg.options=new Array();
				console.log("ENTRY");
				console.log(entry);
				ads.sendStats(entry);
					
				if (score==100) levelProg.perfects++;
				if (passedTime<levelProg.fastest) {
						levelProg.fastest=passedTime;
						console.log('New level fast record:'+passedTime+' level '+level);
						}
				levelProg.completed++;
				
				//Achievemets
				var ach=userProgress.achievements;
				if (ach.mostTime<passedTime) 
					{
						ach.mostTime=passedTime;
						console.log("New best bad time="+passedTime);
					}
				if (ach.leastTime>passedTime)
					{
						ach.leastTime=passedTime;
						console.log("New best good time="+passedTime);
					}
				if (score==100)
				{
					ach.perfects++;
					userProgress.hints++;
					}
					
				if (currentProg.attempts==1) 
					ach.firstAttempts++;
				if (currentProg.attempts>userProgress.achievements.mostAttempts) {
						userProgress.achievements.mostAttempts=currentProg.attempts;
						console.log('New global attempts record: '+userProgress.achievements.mostAttempts);}
						achman.checkForAchievements();
				//end Achievements
							logosComplete[curid]=1;
				currentProg.completed=true;
				updateHints();
				enableSwitch=false;
				
				saveProgress();
				his.e('scoreHolder').textContent=totalScore;
				
				
				lq.giveFeedback(feedback+" - "+score);
				his.e('tbi').blur();
				if (ads.decide(ad))
				{
				console.log("ad not null, showing");
				enableSwitch=false;
				ads.showAd(ad);
				setTimeout(function(){enableSwitch=true;goToLevel(currentLevel);},parseInt(ad.delay)+1000);
				
				
				}
				else{
				
				setTimeout(function(){enableSwitch=true;goToLevel(currentLevel);},1500);
				}
				
				
				
				
				
				}
				
				
				
				
				
					
		
	
	else
	{
		currentProg.attempts++;
		console.log('Attempts: '+currentProg.attempts);
		
		currentProg.firstAttempt=false
		
		if (currentProg.options==null) currentProg.options=new Array();
		currentProg.options.push(answer);
		
		score=checkSpelling(answer,correct);
		colscore=score;
		if (colscore*=0.4);
		var c=mathHelper.interpolateColor(int1,int2,colscore);
	
		if (score>0.5) 
		{
			var i=Math.floor(Math.random()*almost.length);
			lq.giveFeedback(almost[i]);
		}
		else
		{
			var i=Math.floor(Math.random()*incorrect.length);
			lq.giveFeedback(incorrect[i]);
		}
	
	 
	}
	

}
function clearAnswer()
{
	
	tbi=his.e('tbi');

	tbi.value='';
	answer='';
	
}

function replaceLogo()
{
var i=Math.floor(Math.random()*255+1);
	curid=i;
	his.e('logoDiv').style.backgroundImage='url(muhan/'+logos[i].id+".png)";
	correct=logos[i].name;
}





function hint(num)
{
	h=logos[curid].hint1;
	if (num==2)  h=logos[curid].hint2;
	if (num==3) h=logos[curid].hint3;
	
	return h;
}

function showHint(num){

logo=userProgress.logos[curid];
if (logo.hints[num]||logos[curid].completed){
h=hint(num);
his.e('hintContent').textContent=h;}

else if (userProgress.hints>0){

h=hint(num);
his.e('hintContent').textContent=h;
logo.hints[num]=true;
userProgress.achievements.hintsUsed++;
userProgress.hints--;
updateHints();
saveProgress();

}
else his.e('hintContent').textContent='אין ברשותכם מספיק נקודות. נסה לשאול חבר בפייסבוק, או שתף את המשחק דרך התפריט הראשי וקבל 15 נקודות!';


}


function updateHints(){

his.e('hintNum').textContent=userProgress.hints;
}
function updateCompleted(){

his.e('completedHolder').textContent=userProgress.levels[currentLevel].completed+"/40";
his.e('scoreHolderLevel').textContent=userProgress.levels[currentLevel].score;
his.e('levelHolder').textContent=currentLevel;

}
function showHints()
{
	hintBox=his.e('hint');
	hintBox.style.display='block';
	his.e('hintContent').textContent='בחר רמז להציג';
	
	setTimeout(function(){his.e('hint').style.opacity="1";},1);
	
}
function hideHint()
{
	hintBox=his.e('hint');
	hintBox.style.opacity=0;
	setTimeout(function(){his.e('hint').style.display="none";},300);
}

function setupTouchers()
{
var dis=510;
var t=document.getElementsByClassName('levelToucher');
for (var i=0;i<t.length;i++)
	{
	var card=t[i];
	 		card.addEventListener('touchstart', function(ev) {
											lq.debug(ev.touches[0].clientX,ev.touches[0].clientY,i);
											touchTime= (new Date()).getTime();
											console.log(ev);
		startTouchX=ev.touches[0].clientX;
		
		
	});
	card.addEventListener('touchmove',function(ev) {
																		
																			
																			
																			});
	card.addEventListener('touchend',	function(ev) {
		console.log(ev);
		var endTouch=ev.changedTouches[0].clientX;
		lq.debug('ST'+startTouchX,'TE'+endTouch,endTouch-startTouchX);
		var d=endTouch-startTouchX;
		if (Math.abs(d)>20)
			{
				var ta=0;
				if (d>0)  ta+=dis;
				else ta-=dis;
				
				max = -510*(t.length-1);
				levelsTranslate+=ta;
				if (levelsTranslate<max) levelsTranslate=max;
				if (levelsTranslate>0) levelsTranslate=0;

				
				his.e('levels').style.left=levelsTranslate+"px";
				
				var origin=208+((-1)*levelsTranslate);
				
			
			}
	
});

	}

}

function debugLogo()
{
if (cheatMode)
{
answer=correct;
var tb=his.e('tbi');
tb.value=answer;
}
	
}

	function removeChilds(node)
	{
		while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
}
}

function fillLevel(level)
{

var thumbs=his.e('scroller');
removeChilds(thumbs);
var max=-626;

for (var i=0;i<logos.length;i++)
 {
	if (logos[i].level==level){
	var t=document.createElement('div');
	var id=logos[i].id;
	t.className='logoThumb';
	t.style.backgroundImage='url(thumbs/blue/'+id+".png)";
	t.addEventListener('touchstart', function(ev) {
											lq.debug(ev.touches[0].clientX,ev.touches[0].clientY,i);
											touchTime= (new Date()).getTime();
									
		startTouchX=ev.touches[0].clientX;
		
		
	});
	
	t.addEventListener('touchend',	function(ev) {
	lq.debug(ev.changedTouches[0].clientX,ev.changedTouches[0].clientY,i);
		var max=-626;
		var endTouch=ev.changedTouches[0].clientX;	var now=(new Date()).getTime();
		
		lq.debug(endTouch-startTouchX,now-touchTime, (endTouch-startTouchX)/(now-touchTime));
		
		translateStart=lastTranslate;
		
		var dis=(Math.abs(endTouch-startTouchX));
		if (ev.srcElement!=null&& (now-touchTime<250)&&dis<80)
		{
	
		var id=parseInt(ev.srcElement.id.replace('thumb',''));
		if (ev.srcElement.id.indexOf('check')!=-1)  id=parseInt(ev.srcElement.id.replace('check',''));
		
		(id!=null)
		{
		
		loadLogo(id);
		
		}
		}
		else{
			var d=endTouch-startTouchX;
		if (Math.abs(d)>20)
			{
				dis=624;
				var ta=0;
				
				if (d>0)  ta+=dis;
				else ta-=dis;
				
				max = -624;
				console.log('sdf');
				thumbsTranslate+=ta;
				if (thumbsTranslate<max) thumbsTranslate=max;
				if (thumbsTranslate>0) thumbsTranslate=0;

				
				his.e('scroller').style.webkitTransform="translate3d("+thumbsTranslate+"px,0,0)";
				var b=(thumbsTranslate / (max) * (320));
																			his.e('scrollbarfill').style.webkitTransform='translate3d('+b+'px,0,0)';
																			his.e('scrollbar').style.zIndex=parseInt(Math.random()*10);
				
			
			}
		
		
		}
		});

	t.id="thumb"+i;
	var c=document.createElement('div');
	c.className='blueCheck';
	c.id="check"+i;
	t.appendChild(c);
	thumbs.appendChild(t);
	}
	
	
 }
 		thumbs.addEventListener('touchstart', function(ev) {
										lq.debug(ev.touches[0].clientX,ev.touches[0].clientY,i);
											touchTime= (new Date()).getTime();
									
		startTouchX=ev.touches[0].clientX;
		
	});

	thumbs.addEventListener('touchend',	function(ev) {
		
		var endTouch=ev.changedTouches[0].clientX;
		lq.debug('ST'+startTouchX,'TE'+endTouch,endTouch-startTouchX);
		var d=endTouch-startTouchX;
		if (Math.abs(d)>20)
			{
				dis=624;
				var ta=0;
				
				if (d>0)  ta+=dis;
				else ta-=dis;
				
				max = -624;
				
				thumbsTranslate+=ta;
				if (thumbsTranslate<max) thumbsTranslate=max;
				if (thumbsTranslate>0) thumbsTranslate=0;

				
				his.e('scroller').style.webkitTransform="translate3d("+thumbsTranslate+"px,0,0)";
				var b=(thumbsTranslate / (max) * (320));
																			his.e('scrollbarfill').style.webkitTransform='translate3d('+b+'px,0,0)';
																			his.e('scrollbar').style.zIndex=parseInt(Math.random()*10);
				
			
			}


																
	}
	
	);


}


function loadLogo(i)
{
	showOnly(1);
	
	
	
	curid=i;
    completed=userProgress.logos[curid].completed;
	console.log('completed '+completed+' i '+i);
	console.log(i);
	var id=logos[i].id;
	//GET AD
	ad=ads.logoAd(id);
	if (ad!=null) console.log("Found ad!");
	if (ad!=null) ads.preload(ad);
	//*************
	var chars=logos[i].name.length;
	correct=logos[i].name;
updateHints();
	his.e('logoDiv').style.backgroundImage='url(muhan/'+id+".png)";
	var bw=his.e('logoDivBW');
	if (!completed){
	bw.style.backgroundImage='url(blue/'+id+".png)";
	bw.className='';
	bw.style.opacity=1;
	bw.className='oT';
	var chars=correct.length;
	var time=500+850*chars;
	setTimeout(function(){bw.style.opacity=0;},time);
	
	logo=userProgress.logos[curid];
	correct=logos[i].name;

     tbi.value='';
	if (logo.keysHidden) pointsMan.hideKeys();
	else pointsMan.resetKeys();
	
	}
	else{
	if (userProgress.nativeKeyboard) tbi.value=correct;
	else 
	tb.textContent=correct;
	
	}

	
	
	
	//hideHint();
	startTime=(new Date).getTime();
	
	if (totalTries[curid]==null) totalTries[curid]=0;
	
	
}

function goToLevels()
{
	showOnly(0);
}
function showOnly(n)
{

now=new Date();
dif =killTime-now;
console.log(dif);
console.log(n==0&& (dif<0&&betaTesting));
if (n==0&& (dif<0&&betaTesting)) {lq.giveFeedback('פג זמן בדיקת הבטא טסטינג. אנא הורד את המשחק בצורה הרגילה.');return;}
// levels=0 game=1 thumsb=2

if (!enableSwitch) {console.log("Switch disabled");return;}
if (dataCache.last!=n){

enableSwitch=false;
dataCache.frames[dataCache.last].className="frame frameHidden";

setTimeout(function() {dataCache.removeFrame(dataCache.last);dataCache.last=n;enableSwitch=true;},1200);

if (n==3||n==6) sekindo.hide();
	else sekindo.show();
}



dataCache.addFrame(n);
setTimeout(function(){dataCache.frames[n].className='frame';},10);


if (n==0) {
		loadLevelCards();
		}

if (n==2)
		noobman.showIfNeeded();

if (n==4) {achman.fillDiv();}

dataCache.current=n;



}
	/*
	
	
	 if (w!='game') setTimeout(function(){his.e('logoDivBW').style.display="none";},350);
	 
	setTimeout(function(){
	
	his.e('gameFrame').style.display='none';
	his.e('thumbsFrame').style.display='none';
	his.e('levelsFrame').style.display='none';
	 
	his.e(who).style.display="block";

	
	},500);
	
	setTimeout(function(){if (who=='game') his.e('logoDivBW').style.display="block";},200);
	
	his.e(who).style.display="block";
	

	
	setTimeout(function(){
	his.e(who).style.webkitTransform='rotateY(0deg)';
	},10);*/


function goToLevel(num){

if (!enableSwitch) {console.log('Switch not enabled');return;}
showOnly(2);
fillLevel(num);
currentLevel=num;
loadThumbs();
updateCompleted();
}

function handleIpad(){

var iPad = navigator.userAgent.match(/iPad/i) != null;
//iPad=true;
if (iPad) { 

            
l=his.e('css');
l.href='ipad.css';



}


}
function setSize(n)
{
var windowHeight=window.innerHeight;
var windowWidth=window.innerWidth;





var margin=parseInt((windowHeight-960)/2) ; // calculate the drop
 if(margin<0&&n<5) {setTimeout(function(){setSize(n+1);},1000);return;}
var el=document.getElementsByClassName('needsMargin');
for (var i=0;i<el.length;i++){

el[i].style.top=margin+'px';

}

}

function placeFooter(){
var f=his.e('footer');
var height=52;
var windowHeight=window.innerHeight;
var newHeight=windowHeight-height+3;
console.log(windowHeight);

//f.style.top=newHeight+'px';
}

function makeNew()
{
var thumbs=his.e('scroller');
his.removeChilds(thumbs);
fillLevel(1);
}


var pointsMan=new function(){


this.reveal=10;
this.msg='לרשותך 3 אפשרויות לנצל את הנקודות שצברת: רמז ינצל נקודה אחת, הסרת אותיות לא רלוונטיות והשארת רק האותיות שנדרשות במקלדת ינצל 2 נקודות, וגילוי הלוגו ינצל '+this.reveal+' נקודות. נצל אותם בחוכמה!';

this.openHelp=function(){
$('#helpBox').removeClass('hidden');
$('#hintBox').addClass('hidden');

his.e('helpTextContent').textContent=this.msg;
	hintBox=his.e('hint');
	hintBox.style.display='block';
	his.e('hintContent').textContent='בחר רמז להציג';
	
	setTimeout(function(){his.e('hint').style.opacity="1";},1);

}
this.showHints=function(){

$('#helpBox').addClass('hidden');
$('#hintBox').removeClass('hidden');

}

this.close=function(){

	hintBox=his.e('hint');
	hintBox.style.opacity=0;
	setTimeout(function(){his.e('hint').style.display="none";},300);

}
this.revealAnswer=function(){

logo=userProgress.logos[curid];
if (logo.completed){
lq.giveFeedback('לוגו זה הושלם כבר');
}

else if (userProgress.hints>this.reveal-1){
answer=correct;
his.e('tbi').value=answer;


userProgress.achievements.hintsUsed+=this.reveal;
userProgress.hints-=this.reveal;
updateHints();
saveProgress();
this.close();
}
else lq.giveFeedback('אין ברשותך מספיק רמזים! לחשוף את התשובה מצריך '+this.reveal+ ' רמזים. שתף את המשחק בפייסבוק וקבל 15 רמזים מיידית!');

}

this.hideKeys=function(){
logo=userProgress.logos[curid];
if (logo.completed){
lq.giveFeedback('לוגו זה הושלם כבר');
}

else if(userProgress.hints>1) {
bts=document.getElementsByClassName('kbbutton');
for (i in bts){

c=bts[i].textContent;
console.log("char "+c+" index "+correct.indexOf(c));
if (correct.indexOf(c)==-1&& c!='<-' ) bts[i].className='kbbutton hiddenKey';
else bts[i].className='kbbutton';


}
if (!logo.keysHidden){
userProgress.hints-=2;
logo.keysHidden=true;
}
updateHints();
saveProgress();
this.close();
}
else lq.giveFeedback('אין ברשותך מספיק רמזים! לחשוף את התשובה מצריך 2 רמזים. שתף את המשחק בפייסבוק וקבל 15 רמזים מיידית!');


}
this.resetKeys=function(){
bts=document.getElementsByClassName('kbbutton');
for (i in bts){

bts[i].className='kbbutton';


}


}


}