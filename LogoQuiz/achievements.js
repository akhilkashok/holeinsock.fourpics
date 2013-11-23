var achman=new function(){

this.timeout=null;
this.closeCard=function(){

his.e('achievementCard').style.left='800px';

this.timeout=setTimeout(function(){ his.e('achievementCard').style.display='none';},5000);
this.checkWithDelay();
}
this.checkWithDelay=function(){setTimeout(function(){achman.checkForAchievements();},250);}
this.current=null;

this.fillDiv=function(){
var scroller=his.e('achievementsScroller');
var scrollbar=his.e('achievementsScrollbar');
var scrollbarfill=his.e('achievementsScrollbarfill');
var max=-2500;
removeChilds(scroller);

for (var i=0;i<this.list.length;i++)
 {
	var t=document.createElement('div');
	var id=logos[i].id;
	t.className='achievementThumb';
	t.id='ach'+i;
	t.style.backgroundImage="url(images/achLocked.png)";
	if (userProgress.achievementsCompleted[i])
	t.style.backgroundImage="url(images/ach/"+this.list[i].image+".png)";
t.addEventListener('touchstart', function(ev) {
										lq.debug(ev.touches[0].clientX,ev.touches[0].clientY,i);
											touchTime= (new Date()).getTime();
									
		startTouchX=ev.touches[0].clientX;
		
	});
t.addEventListener('touchend',	function(ev) {
		console.log(ev);
		var endTouch=ev.changedTouches[0].clientX;
		lq.debug('ST'+startTouchX,'TE'+endTouch,endTouch-startTouchX);
		var d=endTouch-startTouchX;
		if (Math.abs(d)>20)
			{
				dis=624;
				var ta=0;
				
				if (d>0)  ta+=dis;
				else ta-=dis;
				
				max = -1210;
				
				thumbsTranslate+=ta;
				if (thumbsTranslate<max) thumbsTranslate=max;
				if (thumbsTranslate>0) thumbsTranslate=0;

				
				his.e('achievementsScroller').style.webkitTransform="translate3d("+thumbsTranslate+"px,0,0)";
				var b=(thumbsTranslate / (max) * (320));
																			his.e('achievementsScrollbarfill').style.webkitTransform='translate3d('+b+'px,0,0)';
																			his.e('achievementsScrollbar').style.zIndex=parseInt(Math.random()*10);
				
			
			}
			else{  
			
			id=parseInt(ev.srcElement.id.replace('ach',''));
			achman.showAchievement(achman.list[id]);
			
			
			}


																
	}
	
	);
	t.id="ach"+i;
	
	if (userProgress.achievementsCompleted[i])
    t.style.float='left';
	
	scroller.appendChild(t);
	}
	
	
																



}



this.showAchievement=function(ach,justViewing){   // just viewing is for invoking from menu.

//this.checkCompleted();

this.current=ach;

clearTimeout(this.timeout);

card=his.e('achievementCard');
header=his.e('achievementHeader');
img=his.e('achievementImage');
desc=his.e('achievementDescription');
fb=his.e('achShare');

header.textContent='הישג חדש!';
if (justViewing) 
header.textContent='צפייה בהישג';


if (userProgress.achievementsCompleted[ach.id]){

img.style.backgroundImage='url(images/ach/'+ach.image+'.png)';

desc.textContent=ach.name;
fb.style.display='block';

}
else{

img.style.backgroundImage='url(images/achLocked.png)';
header.textContent='טרם התגלה';
desc.textContent='שחק עוד כדי לגלות את הישג זה!'
fb.style.display='none';


}





card.style.display='block';
setTimeout(function(){ his.e('achievementCard').style.left='100px';},10);



}


this.checkForAchievements=function(){

for (var i=0;i<this.list.length;i++){

if (!userProgress.achievementsCompleted[this.list[i].id])
if (this.list[i].achieved())
{ 
 userProgress.achievementsCompleted[this.list[i].id]=true;
 
 saveProgress();
 console.log("Showing the following ach:");
 console.log(this.list[i]);
this.showAchievement(this.list[i],false);
return;

}



}

}

this.checkCompleted=function(){

for (var i=0;i<this.list.length;i++){

if (this.list[i].achieved()) this.list[i].completed=true;



}



}


this.list=new Array(
//progress 
		// logos quantity
		
new achievement(   0,
								"סיימת 10 לוגואים!",
								"10done",
								"סיימתי 10 לוגואים! מה איתכם?",
								function(){ 
								return userProgress.completed>=10;
								}),
		
new achievement(   1,
								"פתחת את שלב 2!",
								"level2",
								"פתחתי את שלב 2!",
								function(){ 
								return userProgress.completed>=20;
								}),
		
new achievement(   2,
								"פתחת את שלב 3!",
								"level3",
								"פתחתי את שלב 3!",
								function(){ 
								return userProgress.completed>=45;
								}),
		
new achievement(   3,
									"פתחת את שלב 4!",
								"level4",
								"פתחתי את שלב 4!",
								function(){ 
								return userProgress.completed>=80;
								}),
		
new achievement(   4,
									"פתחת את שלב 5!",
								"level5",
								"פתחתי את שלב 5!",
								function(){ 
								return userProgress.completed>=115;
								}),
		
new achievement(   5,
								"פתחת את שלב 6!",
								"level6",
								"פתחתי את שלב 6!",
								function(){ 
								return userProgress.completed>=155;
								}),
		
new achievement(   6,
								"פתחת את שלב 7!",
								"level7",
								"פתחתי את שלב 7!",
								function(){ 
								return userProgress.completed>=215;
								}),
		
new achievement(   7,
								"פתחת את שלב 8!",
								"level8",
								"פתחתי את שלב 8!",
								function(){ 
								return userProgress.completed>=265;
								}),
new achievement(   8,
								"פתחת את שלב 9!",
								"level9",
								"פתחתי את שלב 2!",
								function(){ 
								return userProgress.completed>=2000;
								}),	
new achievement(   9,
								"פתחת את שלב 10!",
								"level10",
								"פתחתי את שלב 10!",
								function(){ 
								return userProgress.completed>=2000;
								}),
new achievement(   10,
								"סיימת את המשחק!",
								"completed",
								"סיימתי את המשחק!",
								function(){ 
								return userProgress.completed>=320;
								}),	
new achievement(   11,
								"סיימת את שלב 1",
								"done1",
								"סיימתי את שלב 1!",
								function(){ 
								return (userProgress.levels[1].completed==40);
								}),	
new achievement(   12,
								"סיימת את שלב 2!",
								"done2",
								"סיימתי את שלב 2!",
								function(){ 
								return (userProgress.levels[2].completed==40);
								}),	
new achievement(   13,
								"סיימת את שלב 3!",
								"done3",
								"סיימתי את שלב 3!",
								function(){ 
								return (userProgress.levels[3].completed==40);
								}),	
new achievement(   14,
								"סיימת את שלב 4!",
								"done4",
								"סיימתי את שלב 4!",
								function(){ 
								return (userProgress.levels[4].completed==40);
								}),	
new achievement(   15,
								"סיימת את שלב 5!",
								"done5",
								"סיימתי את שלב 5!",
								function(){  if (userProgress.levels[5])
								return (userProgress.levels[5].completed==40);
								}),	
new achievement(   16,
								"סיימת את שלב 6!",
								"done6",
								"סיימתי את שלב 6!",
								function(){  if (userProgress.levels[6])
								return (userProgress.levels[6].completed==40);
								}),	
new achievement(   17,
								"סיימת את שלב 7!",
								"done7",
								"סיימתי את שלב 7!",
								function(){  if (userProgress.levels[7])
								return (userProgress.levels[7].completed==40);
								}),	
new achievement(   18,
								"סיימת את שלב 8!",
								"done8",
								"סיימתי את שלב 8!",
								function(){  if (userProgress.levels[8])
								return (userProgress.levels[8].completed==40);
								}),	
new achievement(   19,
								"סיימת את שלב 9!",
								"done9",
								"סיימתי את שלב 9!",
								function(){  if (userProgress.levels[9])
								return (userProgress.levels[9].completed==40);
								}),
new achievement(   20,
								"סיימת את כל הלוגואים בנושא "+catNames[0]+ "!",
								"communications",
								"סיימתי את כל הלוגואים בנושא "+catNames[0]+ "!",
								function(){  if (catNums[0]>0)
								return userProgress.categories[0]==catNums[0];
								}),									
new achievement(   21,
								"סיימת את כל הלוגואים בנושא "+catNames[1]+ "!",
								"insurance",
								"סיימתי את כל הלוגואים בנושא "+catNames[1]+ "!",
								function(){  if (catNums[1]>0)
								return userProgress.categories[1]==catNums[0];
								}),	
			
new achievement(   22,
								"סיימת את כל הלוגואים בנושא "+catNames[2]+ "!",
								"bank",
								"סיימתי את כל הלוגואים בנושא "+catNames[2]+ "!",
								function(){  if (catNums[2]>0)
								return userProgress.categories[2]==catNums[2];
								}),	
	
new achievement(   23,
								"סיימת את כל הלוגואים בנושא "+catNames[3]+ "!",
								"foodind",
								"סיימתי את כל הלוגואים בנושא "+catNames[3]+ "!",
								function(){  if (catNums[3]>0)
								return userProgress.categories[3]==catNums[3];
								}),	
	new achievement(   24,
								"סיימת את כל הלוגואים בנושא "+catNames[4]+ "!",
								"mobile",
								"סיימתי את כל הלוגואים בנושא "+catNames[4]+ "!",
								function(){  if (catNums[4]>0)
								return userProgress.categories[4]==catNums[4];
								}),	
	
new achievement(   25,
								"סיימת את כל הלוגואים בנושא "+catNames[5]+ "!",
								"infra",
								"סיימתי את כל הלוגואים בנושא "+catNames[5]+ "!",
								function(){  if (catNums[5]>0)
								return userProgress.categories[5]==catNums[5];
								}),	
	
new achievement(   26,
								"סיימת את כל הלוגואים בנושא "+catNames[6]+ "!",
								"retailers",
								"סיימתי את כל הלוגואים בנושא "+catNames[6]+ "!",
								function(){  if (catNums[6]>0)
								return userProgress.categories[6]==catNums[6];
								}),	
	
new achievement(   27,
								"סיימת את כל הלוגואים בנושא "+catNames[7]+ "!",
								"fashion",
								"סיימתי את כל הלוגואים בנושא "+catNames[7]+ "!",
								function(){  if (catNums[7]>0)
								return userProgress.categories[7]==catNums[7];
								}),	
	
new achievement(   28,
								"סיימת את כל הלוגואים בנושא "+catNames[8]+ "!",
								"academia",
								"סיימתי את כל הלוגואים בנושא "+catNames[8]+ "!",
								function(){  if (catNums[8]>0)
								return userProgress.categories[8]==catNums[8];
								}),	
		

new achievement(   29,
								"סיימת את כל הלוגואים בנושא "+catNames[10]+ "!",
								"hitech",
								"סיימתי את כל הלוגואים בנושא "+catNames[10]+ "!",
								function(){  if (catNums[10]>0)
								return userProgress.categories[10]==catNums[10];
								}),	
new achievement(   30,
								"סיימת את כל הלוגואים בנושא "+catNames[11]+ "!",
								"drinks",
								"סיימתי את כל הלוגואים בנושא "+catNames[11]+ "!",
								function(){  if (catNums[11]>0)
								return userProgress.categories[11]==catNums[11];
								}),	
new achievement(   31,
								"סיימת את כל הלוגואים בנושא "+catNames[12]+ "!",
								"media",
								"סיימתי את כל הלוגואים בנושא "+catNames[12]+ "!",
								function(){  if (catNums[12]>0)
								return userProgress.categories[12]==catNums[12];
								}),	
new achievement(   32,
								"סיימת את כל הלוגואים בנושא "+catNames[13]+ "!",
								"cosmetics",
								"סיימתי את כל הלוגואים בנושא "+catNames[13]+ "!",
								function(){  if (catNums[13]>0)
								return userProgress.categories[13]==catNums[13];
								}),	
new achievement(   33,
								"סיימת את כל הלוגואים בנושא "+catNames[14]+ "!",
								"industry",
								"סיימתי את כל הלוגואים בנושא "+catNames[14]+ "!",
								function(){  if (catNums[14]>0)
								return userProgress.categories[14]==catNums[14];
								}),	
new achievement(   34,
								"סיימת את כל הלוגואים בנושא "+catNames[15]+ "!",
								"ach10Logos",
								"סיימתי את כל הלוגואים בנושא "+catNames[15]+ "!",
								function(){  if (catNums[15]>0)
								return  false; // THIS IS OTHER userProgress.categories[15]==catNums[15];
								}),	
new achievement(   35,
								"סיימת את כל הלוגואים בנושא "+catNames[16]+ "!",
								"tourist",
								"סיימתי את כל הלוגואים בנושא "+catNames[16]+ "!",
								function(){ if (catNums[16]>0)
								   return userProgress.categories[16]==catNums[16];
								}),	
new achievement(   36,
								"סיימת את כל הלוגואים בנושא "+catNames[17]+ "!",
								"restaurant",
								"סיימתי את כל הלוגואים בנושא "+catNames[17]+ "!",
								function(){  if (catNums[17]>0)
								return userProgress.categories[17]==catNums[17];
								}),	
new achievement(   37,
								"סיימת את כל הלוגואים בנושא "+catNames[18]+ "!",
								"investor",
								"סיימתי את כל הלוגואים בנושא "+catNames[18]+ "!",
								function(){  if (catNums[18]>0)
								return userProgress.categories[18]==catNums[18];
								}),	
new achievement(   38,
								"סיימת את כל הלוגואים בנושא "+catNames[19]+ "!",
								"constructions",
								"סיימתי את כל הלוגואים בנושא "+catNames[19]+ "!",
								function(){  if (catNums[19]>0)
								return userProgress.categories[19]==catNums[19];
								}),
								
								// SKILL AREA
								
new achievement(   39,
								"סיימת לוגו בפחות מ-4 שניות!",
								"4sec",
								"סיימתי לוגו בפחות מ-4 שניות!",
								function(){  
								return userProgress.achievements.leastTime<=4;
								}),							
new achievement(   40,
								"סיימת לוגו בפחות מ-2 שניות!",
								"2sec",
								"סיימתי לוגו בפחות מ-2 שניות!",
								function(){  
								return userProgress.achievements.leastTime<=2;
								}),							
new achievement(   41,
								"השלמת 5 לוגואים בציון מעולה!",
								"5perfects",
								"השלמתי 5 לוגואים בציון מעולה!",
								function(){  
								return userProgress.achievements.perfects>=5;
								}),							
new achievement(   42,
								"השלמת 20 לוגואים בציון מעולה!",
								"20perfects",
								"השלמתי 20 לוגואים בציון מעולה!",
								function(){  
								return userProgress.achievements.perfects>=20;
								}),							
 new achievement(   43,
								"השלמת 50 לוגואים בציון מעולה!",
								"50perfects",
								"השלמתי 50 לוגואים בציון מעולה!",
								function(){  
								return userProgress.achievements.perfects>=50;
								}),	
new achievement(   44,
								"השלמת 100 לוגואים בציון מעולה!",
								"100perfects",
								"השלמתי 100 לוגואים בציון מעולה!",
								function(){  
								return userProgress.achievements.perfects>=100;
								}),	
new achievement(   45,
								"עברת את רף ה-5000 נקודות!",
								"5000points",
								"עברתי את רף ה-5000 נקודות!",
								function(){  
								return userProgress.totalScore>=5000;
								}),	
new achievement(   46,
								"עברת את רף ה-15000 נקודות!",
								"15000points",
								"עברתי את רף ה-15000 נקודות!",
								function(){  
								return userProgress.totalScore>=15000;
								}),	
new achievement(   47,
								"שיתפת את המשחק 3 פעמים!",
								"share3",
								"שיתפתי את המשחק 3 פעמים!",
								function(){  
								return userProgress.achievements.timesShared>=3;
								}),	
new achievement(   48,
								"שיתפת את המשחק 10 פעמים!",
								"share10",
								"שיתפתי את המשחק 10 פעמים!",
								function(){  
								return userProgress.achievements.timesShared>=10;
								}),	
new achievement(   49,
								"התייעצת עם 5 חברים!",
								"5friends",
								"התייעצתי עם 5 חברים!",
								function(){  
								return userProgress.achievements.friendsAsked>=5;
								}),									
new achievement(   50,
								"התייעצת עם 10 חברים!",
								"20friends",
								"התייעצתי עם 10 חברים!",
								function(){  
								return userProgress.achievements.friendsAsked>=10;
								}),									
new achievement(   51,
								"שיתפת 3 הישגים!",
								"achshare",
								"שיתפתי 3 הישגים!",
								function(){  
								return userProgress.achievements.achievementsShared>=3;
								}),
 // END OF SKILL AREA

new achievement(   52,
								"טעית בלוגו 15 פעמים!",
								"15tries",
								"טעיתי בלוגו 15 פעמים!",
								function(){  
								return userProgress.achievements.mostAttempts>=15;
								}),
new achievement(   53,
								"לקח לך יותר מ-2 דקות לפתור לוגו!",
								"2mins",
								"לקח לי יותר מ-2 דקות לפתור לוגו!",
								function(){  
								return userProgress.achievements.mostTime>=120;
								}),
new achievement(   54,
								"לקח לך יותר מ-5 דקות לפתור לוגו!",
								"5mins",
								"לקח לי יותר מ-5 דקות לפתור לוגו!",
								function(){  
								return userProgress.achievements.mostTime>=300;
								}),
new achievement(   55,
								"השתמשת ביותר מ-20 רמזים!",
								"20hints",
								"השתמשתי ביותר מ-20 רמזים!",
								function(){  
								return userProgress.achievements.hintsUsed>=20;
								}),
new achievement(   56,
								"השתמשת ביותר מ-50 רמזים!",
								"50hints",
								"השתמשתי ביותר מ-50 רמזים!",
								function(){  
								return userProgress.achievements.hintsUsed>=50;
								}),
new achievement(   57,
								"שיתפת את הישג שיתופי הישגים, אפילו אותי בלבלת!",
								"confused",
								"שיתפתי את הישג שיתופי הישגים, אפילו אותי בלבלת!",
								function(){  
								return userProgress.achievements.specialAchievementShared;
								}),
new achievement(   58,
								"משעמם לך במשחק הכי כיפי שנוצר! זה גם הישג.. :)",
								"bored",
								"משעמם לי במשחק הכי כיפי שנוצר! זה גם הישג.. :)",
								function(){  
								return userProgress.achievements.wasBored;
								}),

								new achievement(   59,
								"סיימת את כל הלוגואים בנושא "+catNames[9]+ "!",
								"nonprofit",
								"סיימתי את כל הלוגואים בנושא "+catNames[9]+ "!",
								function(){  if (catNums[9]>0)
								return userProgress.categories[9]==catNums[9];
								})	
);

}


function achievement(id,name,image,desc,funct){
this.id=id
this.name=name;
this.image=image;
this.fbDescription=desc;
this.completed=false;
this.tier=0;

this.achieved=funct;



}