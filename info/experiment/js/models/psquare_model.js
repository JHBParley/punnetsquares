
// sounds_to_load is an object
// whose variables do not change - 
// it is data source for soundmanager, ios6 loader,
// and mhe_helper.js
// this file holds the list of sound files 
// that need to be loaded
// put this file in models folder

var psmodel = {};

psmodel.getSoundsToLoad = function()
{
	return ["sfx_1","sfx_2","sfx_5","sfx_8","sfx_14","sfx_15","sfx_16","sfx_17","sfx_18","sfx_19","sfx_20","sfx_21","sfx_22","sfx_23","sfx_24","sfx_26"]
    
}

psmodel.getPathway = function()
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


