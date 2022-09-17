// Global last clicked clicktag id.
var lastIDvalue = null;

//addQueryToVars main function

addQueryVarToClickTags = function( queryVar, data ) {
  var justId = data;

  for (var i in myFT.placementProperties.clicks) {
    var clickTag = myFT.placementProperties.clicks[i];
    var holdEncode = 0;
    if (clickTag.indexOf("FT_CUSTOM") > -1) {
      var holdDecode = clickTag;
      while (holdDecode.indexOf("[%FT_CUSTOM%]") === -1) {
        holdDecode = decodeURIComponent(holdDecode);
      }

      customVar = holdDecode.match(new RegExp(/([a-zA-Z0-9]*)=(\[\%FT_CUSTOM\%\])(\&|\$|\;|\#)/g));
      if(customVar){
        for (var j = 0; j < customVar.length; j++) {
          customVar[j] = customVar[j].substr(0,customVar[j].indexOf("="));
        }

      } 
    }
    
    //replace [%FT_CUSTOM%] in third party tag with dell url
    if(customVar){
      for (var k = 0; k < customVar.length; k++) {

        var encodeCount = 0;

       if((customVar.length==2)&&(k==0)){encodeCount=3};
       if((customVar.length==2)&&(k==1)){encodeCount=2};

       // pass encoding count for FT_CUSTOM value from JS template
       try{
        var templateEncode = myFT.get('encodeCountTracker');
        if(templateEncode){encodeCount=templateEncode};
       }catch(err){}
       

        if(clickTag.indexOf(customVar[k]+"=") > -1){
          clickTag = clickTag.replace(new RegExp('(' + customVar[k] + '=(.*?)(?=&|$|;))', 'i'), customVar[k]+ "=" +encodeLoop(justId, encodeCount));
        }
        else if (clickTag.indexOf(customVar[k]+"%3D") > -1){ 
          clickTag = clickTag.replace(new RegExp('(' + customVar[k] + '%3D(.*?)(?=%26|%24|%3B))', 'i'), customVar[k]+ "%3D" +encodeLoop(justId,1+ encodeCount));
        }
        else if (clickTag.indexOf(customVar[k]+"%253D") > -1){  
          clickTag = clickTag.replace(new RegExp('(' + customVar[k] + '%253D(.*?)(?=%2526|%2524|%253B))', 'i'), customVar[k]+ "%253D" +encodeLoop(justId,2+encodeCount)); 
        }
      }
    }


    //replace create or replace ft_custom with dell url
    
    if (clickTag.indexOf(queryVar) > -1) {
      if(clickTag.indexOf(queryVar+"=") > -1) myFT.placementProperties.clicks[i] = clickTag.replace(new RegExp('(' + queryVar + '=(.*?))(&|$)', 'i'), queryVar + '=' + data + '$3');
      else if (clickTag.indexOf(queryVar+"%3D") > -1) myFT.placementProperties.clicks[i] =clickTag.replace(new RegExp('(' + queryVar + '%3D(.*?))(&|$)', 'i'), queryVar + '%3D' + encodeLoop(data,1) + '$3');
      else if (clickTag.indexOf(queryVar+"%253D") > -1) myFT.placementProperties.clicks[i] = clickTag.replace(new RegExp('(' + queryVar + '%253D(.*?))(&|$)', 'i'), queryVar + '%253D' + encodeLoop(data,2) + '$3');
    } else {
      if (clickTag.indexOf('ft_impID=') > -1) myFT.placementProperties.clicks[i] = clickTag.split('ft_impID=').join(queryVar + '=' + data + '&ft_impID=');       
      else if (clickTag.indexOf('ft_impID%3D') > -1) myFT.placementProperties.clicks[i] = clickTag.split('ft_impID%3D').join(queryVar + '%3D' + encodeLoop(data,1) + '&ft_impID%3D');
      else if (clickTag.indexOf('ft_impID%253D') > -1) myFT.placementProperties.clicks[i] = clickTag.split('ft_impID%253D').join(queryVar + '%253D' + encodeLoop(data,2) + '&ft_impID%253D');
      if (clickTag.indexOf('https://creativepreview') > -1) {
        myFT.placementProperties.clicks[i] = clickTag.split('count=').join(queryVar + '=' + data + '&count=');
      }

    }
    
  }
  
}

// Private variables.

var customVar;

/**
 * FTTracking
 */
function FTTracking() {

}

function encodeLoop(input, loop){
  var output = input;
  for (var i =0 ; i < loop; i++) {
       output = encodeURIComponent(output);
  };
  return output;
}

/**
 * addQueryVarToClickTags
 */
FTTracking.prototype.addQueryVarToClickTags = addQueryVarToClickTags

/**
 * trackProducts
 */
FTTracking.prototype.trackProducts = function( feeds, param1, param2 ) {
  // Check if products empty.
  if(feeds.length < 1) return;

  let ajaxSet = {
    complete: function(request) {
      if (request.status === 200) {
        if (JSON.parse(request.responseText).error) {
          Tracker.impressionTrackEvent('Reporting Service Error');
        } else {
          Tracker.impressionTrackEvent(JSON.parse(request.responseText).id);
        }
      } else {
        Tracker.impressionTrackEvent('Reporting Service Error');
      }
    }
  };

  var productArray = [];
  for(var i=0;i<feeds.length;i++){
      productArray.push(feeds[i][param1]+"|"+feeds[i][param2]);
  }

  myFT.ajax('https://fdz.flashtalking.com/services/dell/FBI-1941/write.php?value=' + encodeURIComponent(productArray), ajaxSet);
}
