//*** Manage capture of hardware back button ****

//pass a true to start capturing the back button
//pass a false to stop capturing the back button
//on a capture, the HWBackButtonPressed function is called
function hwBackButton_Capture(boolForceState)
{
    try
    {
        //force by default
        if (boolForceState==null)
        {
            boolForceState=true;
        }
              
        if (boolForceState==true && hwBackButton_boolCaptureState==false)
        {
            //capture the back button
            try { AppMobi.device.addVirtualPage(); hwBackButton_boolCaptureState=true; } catch(e) { lq.giveFeedback("error adding virtual page:" + e.message); }
        }
        else if (boolForceState == false)
        {
            //stop capturing the back button
            try { AppMobi.device.removeVirtualPage(); hwBackButton_boolCaptureState=false; } catch(e) {  lq.giveFeedback("error removing virtual page:" + e.message); }
        }
    }
    catch(e)
    {
        alert("error in captureHWBackButton: " + e.message);
    }
	console.log('Is listenning?' + boolForceState);
}

function hwBackButton_Pressed()
{
    try
    {
      AppMobi.device.addVirtualPage(); 
        hwBackButton_Execute();
      
        console.log("Hardware Back Button Pressed");
    }
    catch(e)
    {
        alert("error in HWBackButtonPressed: " + e.message);
    }
}



function hwBackButton_Execute()
{

   try
   {
     
     backman.goBack();
   }
   catch(e) {lq.giveFeedback(e);}

}

//global variable that reflects the back button capture state
var hwBackButton_boolCaptureState = false;

//add the event handler

 var backman=new function(){
 
 this.goBack=function(){
 
 n=dataCache.current;
 
 if (n==0||n==5||n==6||n==4) showOnly(3);
 
 if (n==1) showOnly(2);
 if (n==2) showOnly(0);
 
 if (n==3) his.e('closePrompt').style.display='block';
 }
 this.stay=function(){
 
   hwBackButton_Capture(true);
   his.e('closePrompt').style.display='none';
 
 }
 
 this.closeGame=function(){
 
   hwBackButton_Capture(false);
   
   lq.giveFeedback('לחץ שוב על כפתור החזרה במכשיר על מנת לצאת');
 
 
 
 }

 
 
 
 
 }