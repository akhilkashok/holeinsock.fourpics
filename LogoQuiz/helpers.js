var he=["'",'ק','ר','א','ט','ו','ן','ם','פ','ש','ד','ג','כ','ע','י','ח','ל','ך','ף','ז','ס','ב','ה','נ','מ','צ','ת','ץ','<-'];
var en =[ 'q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m' ];
var int2='#64E400';
var int1='#EBFF05';  
//
var almost=['כמעט..','מתקרב..','כמעט שם','קרוב..','דומה..'];
var incorrect=['אמםם.. לא','לא ממש','לא בכיוון','לא כל כך','נסה שוב','לא להתייאש','?רמז אולי'];

var cssToggle=1;
var cssNames=new Array('','No radius no stroke','no noradius','no stroke','no radius stroke bordedr','full');



var noobman=new function(){


this.current=1;
this.howMany=8;


this.showIfNeeded=function(){
this.updateButtons();

if (userProgress.completed==0) 
 this.show();



}

this.updateButtons=function(){

n=his.e('nbtNext');
b=his.e('nbtBack');
s=his.e('nbtSkip');

if (this.current==1) 
	{
		b.style.display='none';
		
	}
	else
	  if (this.current==this.howMany)
		{
				n.style.display='none';
				s.textContent='סגור';
				
		}
		 else {
				b.style.display='block';
				n.style.display='block';
				s.textContent='דלג';
			
			}

}

this.show=function(){

tt=his.e('noobTooltip');

tt.style.display="block";
setTimeout(function(){ tt=his.e('noobTooltip');tt.style.left='50%';},10);



}

this.next=function(){


his.e('nbt'+this.current).className='tth';
this.current++;
his.e('nbt'+this.current).className='ttv';


this.updateButtons();
}

this.back=function(){
his.e('nbt'+this.current).className='tth';
this.current--;
his.e('nbt'+this.current).className='ttv';
this.updateButtons();
}

this.skip=function(){

tt=his.e('noobTooltip');
tt.style.left='2000px'
setTimeout(function(){ tt=his.e('noobTooltip');tt.style.display='none';},1000);

}


}



function splitWords(s)
{
	words=new Array();
	words[0]="";
	c=0;
	for (var i=0;i<s.length;i++)
	{
		if (s.charAt(i)==" ")
			{
				c++;
				words[c]='';
			}
			else
		words[c]+=s.charAt(i);
	}
	return words;
}

function checkSplit(ans,match)
{
a=splitWords(ans);
m=splitWords(match);
hasWord=false;
for (var i=0;i<a.length;i++)
	for (var j=0;j<m.length;j++)
	{
		if (a[i]==m[j]) hasWord=true;
	}
return hasWord;

}
function checkSpelling(ans,match)
{
	console.log('Ans:'+ans+', Match:'+match);
	if (ans==match) return 1;
	if (ans.replace(' ','')==match) return 0.9
	total=0
	for (var i=0;i<ans.length;i++)
	{
		if (ans.charAt(i)==match.charAt(i)) total++;
	}
	
	var b=match.length-ans.length;
	b=Math.abs(b);
	total-=b;
	score=total/match.length;
	hasWord=checkSplit(ans,match);
    if (hasWord&&score<0.7) return 0.6969; // code for a complete word.
	return score;
	
}

function addshadows()
{
	var p1=document.getElementById('page1');
	p1.style.webkitBoxShadow='inset 0 0 10px #000000';
}


var mathHelper = new function () {
        this.d2h = function d2h(d) {
            return d.toString(16);
        }
        this.h2d = function h2d(h) {
            return parseInt(h, 16);
        }
        this.hexToRGBA = function hexToRGBA(hex, a) {
            var r = this.h2d(hex.substring(0, 2));
            var g = this.h2d(hex.substring(2, 4));
            var b = this.h2d(hex.substring(4, 6));
			
			
            return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        }
        this.clamp = function clamp(num, min, max) {
            if (num > max) return max;
            if (num < min) return min;
            return num;
        }
        this.cutDecimal = function cutDecimal(num, zero) {
            var i = parseInt(num * Math.pow(10, zero));
            return i / Math.pow(10, zero);
        }
		  this.interpolateColor = function (hex1,hex2,m) {
            var r1 = this.h2d(hex1.substring(1, 3));
            var g1= this.h2d(hex1.substring(3, 5));
            var b1 = this.h2d(hex1.substring(5, 7));
			var r2 = this.h2d(hex2.substring(1, 3));
            var g2= this.h2d(hex2.substring(3, 5));
            var b2 = this.h2d(hex2.substring(5, 7));
			
			r=Math.floor(r1+(r2-r1)*m);
			g=Math.floor(g1+(g2-g1)*m);
			b=Math.floor(b1+(b2-b1)*m);
			r=this.d2h(r); if(r.length==1) r='0'+r;
			g=this.d2h(g); if(g.length==1) g='0'+g;
			b=this.d2h(b); if(b.length==1) b='0'+b;
			a=1;
            return '#' + r  + g  + b ;
        }
    }

	
function changeProgressHelper(e,p){

var w=parseInt(p*370);
e.style.width=w+'px';
e.style.left=(425-w)+'px';
if (p==1) e.style.borderRadius='20px 20px 20px 20px';
else e.style.borderRadius='0px 20px 20px 0px'
}

function changeProgress(l,p){
e=his.e('l'+l+'ProgressBar');
if (e==null){console.log('bar progress call-'+l);return;}

changeProgressHelper(e,p);

}


var debugMan=new function(){

this.enabed=false;


this.msg= function(msg){


if (this.enabled) lq.giveFeedback(msg);

console.log("Debug manager: "+msg);
}



}
	
var his=new function()
{
	this.e=function(id)
	{
		return document.getElementById(id);
	}
	this.move =function(element,x,y){
	var transform='translate(';
	if (x!=null) transform+=x+',';
		else transform+='0px,';
		if (y!=null) transform+=y;
		else transform+='0px';
	
	element.style.webkitTransform=transform+')';
	}
	this.removeChilds=function(node)
	{
		while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
}
	}
	}

	
function parseXml(xml) {
   var dom = null;
   if (window.DOMParser) {
      try { 
         dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
      } 
      catch (e) { dom = null; }
   }
   else if (window.ActiveXObject) {
      try {
         dom = new ActiveXObject('Microsoft.XMLDOM');
         dom.async = false;
         if (!dom.loadXML(xml)) // parse error ..

            window.alert(dom.parseError.reason + dom.parseError.srcText);
      } 
      catch (e) { dom = null; }
   }
   else
      alert("cannot parse xml string!");
   return dom;
}
	


var  dataCache=new function(){

this.last=0;
this.current=3;
this.main=his.e('main');
this.frames=new Array(his.e('levelsFrame'),his.e('gameFrame'),his.e('thumbsFrame'),his.e('menuFrame'),his.e('achievementsFrame'));
this.init=function() {
dataCache.main=his.e('main');
dataCache.frames=new Array(his.e('levelsFrame'),his.e('gameFrame'),his.e('thumbsFrame'),his.e('menuFrame'),his.e('achievementsFrame'),his.e('settingsFrame'),his.e('aboutFrame'));
}
this.removeFrame=function(n) { dataCache.main.removeChild(dataCache.frames[n]);}
this.removeAllBut=function (n) { 
														for (var i=0;i<dataCache.frames.length;i++) 
															 if (i!=n) dataCache.removeFrame(i);
															 }

this.addFrame=function(n){dataCache.main.appendChild(dataCache.frames[n]);}
this.startFrame=function(n){dataCache.last=n;dataCache.removeAllBut(n);dataCache.frames[n].className="frame";showOnly(n);}



this.updateAfterWin=function(){
			

		
				his.e('scoreHolderLevel').textContent=totalScore;
				his.e('thumb'+curid).setAttribute('ontouchstart','');
				his.e('thumb'+curid).style.opacity='0.4';
				his.e('check'+curid).style.display='inline-block';


}
}
function move(n){b.style.left=(225-n)+"px";b.style.width=(200+n)+"px";}


var bugman=new function(){

this.sendAjax=function(){

sender=Base64.encode(his.e('bugSender').value);
device=Base64.encode(his.e('bugDevice').value);
os=Base64.encode(his.e('bugOs').value);
issue=Base64.encode(his.e('bugIssue').value);
date=(new Date()).toString();

this.loadingOn();
 $.ajax({                                      
      url: 'http://holeinsock.com/CMS/bugman.php',                  //the script to call to get data          
      data: "act=ADD&sender="+sender+"&device="+device+"&os="+os+"&date="+date,                        //you can insert url argumnets here to pass to api.php
                                       //for example "id=5&parent=6"
      dataType: 'text',                //data format      
      success: function(data)          //on recieve of reply
      {
        bugman.loadingOff(true);
		alert('נשלח, תודה!');
		his.e('sendBug').style.display='none';
		
        //--------------------------------------------------------------------
        // 3) Update html content
        //--------------------------------------------------------------------
       
        //recommend reading up on jquery selectors they are awesome 
        // http://api.jquery.com/category/selectors/
      },
		error: function (e,ee)
		{
		bugman.loadingOff(false);
		alert(e);
		alert(ee);
		}
    });
	}




this.clear=function(){


his.e('bugSender').value='';
his.e('bugDevice').value='';
his.e('bugOs').value='';
his.e('bugIssue').value='';


}
this.sendBug=function(){

sender=Base64.encode(his.e('bugSender').value);
device=Base64.encode(his.e('bugDevice').value);
os=Base64.encode(his.e('bugOs').value);
issue=Base64.encode(his.e('bugIssue').value);

this.openIframe(sender,device,os,"",issue);
his.e('sendBug').style.display='none';




}


this.openIframe= function(sender,device,os,issueType,issue) { 
date=(new Date()).toString();
																									url='http://holeinsock.com/CMS/bugman.php?act=ADD&sender='+escape(sender)+"&device="+escape(device)+"&os="+escape(os)+"&issueType="+escape(issueType)+"&issue="+escape(issue)+"&date="+escape(date);
																									f=document.createElement('iframe'); 
																									f.id='bo';
																									f.src=url; document.body.appendChild(f);
																									setTimeout(function(){document.removeChild(his.e('bo'));},10000);
																									}
this.loadingOn=function(){  
his.e('bugDesc').textContent='שולח...';

												}
											
this.loadingOff=function(good){ console.log(good);his.e('bugDesc').textContent='';  }	


/*
this.addNew=  function addNew(sender,device,os,issueType,issue)
   {
   
	url='http://holeinsock.com/CMS/bugman.php?act=ADD&sender='+sender+"&device="+device+"&os="+os+"&issueType="+issueType+"&issue="+issue+"&date="+date;
	
	
	date=new Date();
	date=date.toString();
	this.loadingOn();
  $.ajax({                                      
      "url": 'http://holeinsock.com/CMS/bugman.php?act=ADD&sender='+sender+"&device="+device+"&os="+os+"&issueType="+issueType+"&issue="+issue+"&date="+date,                  //the script to call to get data          

                                       //for example "id=5&parent=6"
      dataType: 'text',    
    "type": "GET",
                            "cache": false,	  //data format      
      success: function(data)          //on recieve of reply
      {
		
        if (data==false) bugman.loadingOff(false);
		else {
		console.log(data);
		bugman.loadingOff(true);
		}
        //--------------------------------------------------------------------
        // 3) Update html content
        //--------------------------------------------------------------------
       
        //recommend reading up on jquery selectors they are awesome 
        // http://api.jquery.com/category/selectors/
      } ,

error:function ()
	{
		alert('Server error');
		bugman.loadingOff(false);
	}
	});
  }
*/



}


var settingsManager=new function(){

this.toggleSound=function(){

userProgress.enableSounds=!userProgress.enableSounds;

msg="הפעל סאונד";
if (userProgress.enableSounds) msg="השתק סאונד";

his.e('btSounds').textContent=msg;
saveProgress();

}

this.resetProgress =function(){

			clearAll();
lq.giveFeedback('כל ההתקדמות נמחקה. אנא הפעל את המשחק מחדש');
his.e('stPrompt').style.display='none';

}

this.prompt=function(){
lq.giveFeedback('האם אתה בטוח? כל ההתקדמות תימחק.');
his.e('stPrompt').style.display='block';
setTimeout(function(){his.e('stPrompt').style.display='none';},3000);


}

this.keyboard= function(){
userProgress.nativeKeyboard=!userProgress.nativeKeyboard;

msg="השתמש במקלדת רגילה";
tbi=his.e('tbi');
if (userProgress.nativeKeyboard) {msg="אל תשתמש במקלדת רגילה";}

his.e('btKeyboardToggle').textContent=msg;
saveProgress();

}
}

var trivia=new function(){

this.items=new Array("- הדיסק און קי הראשון נוצר על ידי חברת M-systems הישראלית ברשות דב מור!",
							 "- תוכנת התרגום הפופלארית בעולם, בבילון, הומצאה על ידי הישראלי אמנון עובדיה!",
							 "-לישראל יש הכי הרבה סטארט אפים בתחום ההי טק ביחס לאוכלוסיה, בעולם! יותר מכל מדינה אחרת!",
							 "-לישראל יש הכי הרבה קרנות הון סיכון ביחס לאוכלוסיה, בעולם! ",
							 "- עגבניות שרי הן פיתוח ישראלי! הן פותחו לפני כ-15 שנה על ידי מספר מכוני מחקר בארץ.",
							 "הפתיתים הומצאו בישראל ב-1951, על ידי חברת אסם, לבקשת דוד בן-גוריון.",
							 "שפת התכנות PHP פותחה מן היסוד על ידי שני  מפתחים ישראליים מהטכניון - זאב סורסקי ואנדי גוטמנס, וכיום אחת משפות התכנות הפופלריות בעולם לפיתוח ברשת.",
							 "ישראל מדורגת במקום השלישי בעולם ביזמות, במקום השני בעולם באיכות ההשכלה האוניברסיטאית ובמקום הראשון בעולם בהשקעות במחקר ."
							 );
							 
this.updateSplash=function(){  
									splash=his.e('splashTrivia');
									r=Math.random()*this.items.length;
									 msg=" הידעת? "+"\n\r"+this.items[ parseInt(r)];
									if (wasFirstTime) msg="שימו לב - הטעינה הראשונה עלולה לקחת מעט יותר זמן. "+msg;
									splash.textContent=msg;


}

}