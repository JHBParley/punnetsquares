
// sounds_to_load is an object
// whose variables do not change - 
// it is data source for soundmanager, ios6 loader,
// and mhe_helper.js
// this file holds the list of sound files 
// that need to be loaded
// put this file in models folder




var soundPlayer = {
	
	
	    myParent:"",
	
	    soundMode:{
			currentMode:'',
			REGULAR_SFX:"regular_sfx",
			CINCH_IPAD_SFX:"cinch_ipad_sfx",
			IOS6_AND_ABOVE:"ios_6_and_above"	
	    },
	

	    checkBrowserAndSetParams: function(p_parent)
	    {
		    this.myParent = p_parent;
		
		    this.soundMode.currentMode = this.soundMode.REGULAR_SFX;
		
			var version = 0;
			var res = navigator.userAgent.match(/; CPU.*OS (\d_\d)/);
			    if(res) {
			        var strVer = res[res.length-1];
			        strVer = strVer.replace("_", ".");
			        var version = strVer * 1;
			    }
           
				//alert("here" + parseInt(version, 10));
			if(( parseInt(version, 10) >= 6 ) )
			{
				//alert("setting");
				this.soundMode.currentMode = this.soundMode.IOS6_AND_ABOVE;
			}
			
            
			
			if (this.soundMode.currentMode === this.soundMode.IOS6_AND_ABOVE)
			{
				//alert("ios");
				
			  context = initializeNewWebAudioContext(this);
			  var soundURLs = this.getSoundsToLoad();
			
			  
			  for (var i=0; i<soundURLs.length; i++) {
				context.requestSoundToDownload( 'audio/'+soundURLs[i]+'.mp3', soundURLs[i]);
			  }
			 
			  $(context).bind("ios6DownloadComplete", this.downloadComplete );
			
			  context.startSoundDownloads();
				
			}
			else
			{
				$.event.trigger({
					type: "loadComplete"
				});
				
			}
		
		
	    },
	
	   playASound : function(p_index)
	   { 
			
			
			if (this.soundMode.currentMode === this.soundMode.REGULAR_SFX)
				{
					//console.log("playimg from here");
					soundManager.play("sfx_"+ p_index);
				}
				else if (this.soundMode.currentMode === this.soundMode.CINCH_IPAD_SFX)
				{
					//sendToApp('playSound?id='+ p_index);
				}
				else if (this.soundMode.currentMode === this.soundMode.IOS6_AND_ABOVE)
				{	
					try
			  		{
			  			//context.playSound("sfx_"+ p_index);
			            context.playSound("sfx_"+ p_index);
			  		}
					catch(err)
			  		{
			  			txt="There was an error on this page.\n\n";
			  			txt+="Error description: " + err.message + "\n\n";
			  			txt+="Click OK to continue.\n\n";
			  			alert(txt);
			  		}	
				}
		
       },
	   
	
	   downloadComplete: function()
	   {

			$.event.trigger({
				type: "loadComplete"
			});
			
	   },
	

		getSoundsToLoad: function()
		{
		    //return [, ];
		    //return ["sfx_1","sfx_2","sfx_5","sfx_8","sfx_14","sfx_15","sfx_16","sfx_17","sfx_18","sfx_19","sfx_20","sfx_21","sfx_22","sfx_23","sfx_24","sfx_26"];
		    //"sfx_444",
            return psmodel.getSoundsToLoad();
			
		},
		
		
		getPathway: function()
		{
			var pathArray = document.location.href.split( '/' );
			var tPathname = "";
			for ( i = 0, newLen = pathArray.length - 1; i < newLen ; i++ ) {
			  if (i > 0) {tPathname += "/"};
			  tPathname += pathArray[i];
			}

			tPathname = tPathname +"/audio/";
			return tPathname;
		}		
}