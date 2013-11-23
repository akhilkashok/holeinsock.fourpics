TEXT_AD=1;
IMG_AD=2;

function ad(){

this.id=1;
this.type=TEXT_AD;
this.text="Ad sample";
this.imgUrl="img url";
this.chance=0;


}



var sekindo=new function(){

this.hide=function(){

his.e('adsSekindo').style.display='none';


}

this.show =function(){

his.e('adsSekindo').style.display='block';


}

this._getFrame=function(callback){

$.ajax({
        type: "GET",
	url: "http://live.sekindo.com/live/liveView.php?s=42879&njs=1&ise=1",
	dataType: "html",
	success: function(xml) {
	if (callback) callback(xml);
	}
	
	});


}
this.parseFrame=function(data){

var h=document.createElement('html');
h.innerHTML=data;

var link=h.getElementsByTagName('A')[0];
var img=h.getElementsByTagName('IMG')[0];

if (!link || !img) return;
if (link.href && img.src)
return {l:link.href,i:img.src};


};
this.getAd=function(){

this._getFrame(function(e){ sekindo.placeAd(sekindo.parseFrame(e));});


};
this.placeAd=function(o){

if (o){
var s=his.e('adsSekindo');
s.style.backgroundImage='url("'+o.i+'")';
s.setAttribute('onclick','AppMobi.device.showRemoteSite("'+o.l+'");');
}

debugMan.msg('Ad rotated');
}

  this.init=function(){
  sekindo.getAd();
  setInterval(function(){sekindo.getAd();},120*1000);
  
  
  }

}

var ads=new function(){

 this.data=null;
 
 this.decide=function(ad){
 if (ad==null) return false;
 chance=parseInt(ad.chance);

 if (chance==0|| chance<0) return false;
 
 b=Math.random()*100;

 return (chance>b);
 

 
 }
 this.goTo=function(url){
 
AppMobi.device.launchExternal(url);
 
 }
 this.preload=function(ad){
  text=his.e('adsText');
 img=his.e('adsImg');
 
  if (ad.type==TEXT_AD){

 text.textContent=ad.text;
 
 
 }
 else{
 
 img.style.backgroundImage="url('"+ad.img+"')";
 
 }
 
 
 }
 this.showAd=function(ad){
 console.log("showing ad");
 console.log(ad);
 text=his.e('adsText');
 img=his.e('adsImg');
 if (ad.type==TEXT_AD){


 setTimeout(function(){
 text.setAttribute('onclick','ads.goTo("'+ad.url+'")');},1000);
 
 text.style.left="50%";
 
 
 }
 else{
 

 setTimeout(function(){
 img.setAttribute('onclick','ads.goTo("'+ad.url+'")');},1000);
 img.style.left="0px";
 
 
 }
 
 delay=parseInt(ad.delay);
 if (delay<4000) delay=4000;
 setTimeout(function(){
  text.style.left="1200px";
  img.style.left="800px";
   text.setAttribute('onclick','');
   img.setAttribute('onclick','');
  
  },delay);
 
 }
 
 this.logoAd=function(id){
 
 if (this.data==null) return;
 
 for (var i=0;i<this.data.length;i++)
	if (this.data[i].logoId==id) return this.data[i];
 
 
 
 }
 this._getAds=    function returnAll(callback)
   {

  $.ajax({                                      
      url: 'http://www.holeinsock.com/CMS/ads.php',                  //the script to call to get data          
      data: "act=ALL",                        //you can insert url argumnets here to pass to api.php
                                       //for example "id=5&parent=6"
      dataType: 'json',                //data format      
      success: function(data)          //on recieve of reply
      {
        if (data==false) console.log('no ads');
		else {
		console.log("Got "+data.length+" ads!");
		callback(data);
		
		
		//console.log(JSON.parse(data));
		}
        //--------------------------------------------------------------------
        // 3) Update html content
        //--------------------------------------------------------------------
       
        //recommend reading up on jquery selectors they are awesome 
        // http://api.jquery.com/category/selectors/
      }  ,
	error:function ()
	{
	
	}
    });
	
  }

  this.getAds=function(){ads._getAds(function(e){ads.data=e;});}
  
 this._sendStats=    function sendData(callback,data,retry)
   {

	var ds=new Date();
	var ns=ds.toDateString()+' '+ds.toTimeString().substr(0,9);
	console.log( 'http://www.holeinsock.com/LQ/lqstats.php?'+"act=ADD&"+"logoname="+encodeURI(data.name)+"&tries="+data.tries+"&time="+data.time+"&options="+encodeURI(data.options)+"&date="+encodeURI(ns)+"&logoid="+data.id+"&device="+encodeURI(AppMobi.device.uuid));
  $.ajax({                                      
      url: 'http://www.holeinsock.com/LQ/lqstats.php',                  //the script to call to get data          
      data: "act=ADD&"+"logoname="+encodeURI(data.name)+"&tries="+data.tries+"&time="+data.time+"&options="+encodeURI(data.options)+"&date="+encodeURI(ns)+"&logoid="+data.id+"&device="+encodeURI(AppMobi.device.uuid),                        //you can insert url argumnets here to pass to api.php
                                       //for example "id=5&parent=6"
      dataType: 'text',                //data format      
      success: function(info)          //on recieve of reply
      {
		debugMan.msg(info);
		
        if (info='') console.log(info);
		else {
		console.log(data);
		if (callback)
		callback(data);
		
		
		//console.log(JSON.parse(data));
		}
        //--------------------------------------------------------------------
        // 3) Update html content
        //--------------------------------------------------------------------
       
        //recommend reading up on jquery selectors they are awesome 
        // http://api.jquery.com/category/selectors/
      }  ,
	error:function ()
	{
	
	}
    });
	
  }

  this.sendStats=function(data){
  
 //data={id:2,name:"logo",time:2,tries:3,device:5,options:"34234"};
  this._sendStats(function(){debugMan.msg('Info sent');},data,0);

  }


}