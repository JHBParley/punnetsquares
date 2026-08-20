
// original from
// https://github.com/TheNotary/webAudioApiForDesigners
// http://css-tricks.com/web-audio-api-sound-on-hover/
// original file is included 
// modified oct 25, 2012 
// Loads Web Audio for iPad ios 6


// MY FUNCTION
// adds the sound and its url path to an object
webkitAudioContext.prototype.requestSoundToDownload = function(url, strNameOfSoundBufferVariable)
{
	context.totalCount++;
	context.soundsToDownload[strNameOfSoundBufferVariable] = url;
}



// MY FUNCTION
// starts the downloads
webkitAudioContext.prototype.startSoundDownloads = function()
{
	// this keeps track of the total downloads
	context.totalLoaded = 0;
	
	// key is "sfx_3", etc
	// path is "audio/sfx_2.mp3"
	for(var key in context.soundsToDownload) {
	    var urlpath = context.soundsToDownload[key];
		context.loadFallbackSound(urlpath, key);	
	}
}


// INIT
// original function
// modified
function initializeNewWebAudioContext(callback) {
		
  var context; // this is our web audio context, our way of
               // controlling and keeping track all of our sounds.  
  try {
    if (typeof(mozAudioContext) != "undefined") {
      context = new mozAudioContext();
    }
    else{
      // ios...
      context = new webkitAudioContext();
    }
  }
  catch(e) {

  }
  // make object to put sounds in, set total count to zero
  context.soundsToDownload = {};
  context.totalCount = 0;
  return context;
}



// MY FUNCTION
webkitAudioContext.prototype.checkIfLoadingComplete = function()
{
	context.totalLoaded ++;
	if (context.totalLoaded >= context.totalCount )
	{
	  // alert("all loaded");
	  // send custom event that all sfx has been loaded
	  $(context).trigger("ios6DownloadComplete");	
	}
}


// Original function
// modified
webkitAudioContext.prototype.loadFallbackSound = function (url, strNameOfSoundBufferVariable) {

  var context = this;
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
    context.fallbackBuffers[strNameOfSoundBufferVariable] = buffer;
    context.checkIfLoadingComplete();
    }, onError);
    
  }
  request.send();
}

// ORIGINAL
function onError(error) {
	alert(error);
}

// ORIGINAL code and comments 
// PLAYS FROM HERE
webkitAudioContext.prototype.playSound = function(strBuffer) {

  var context = this;
  buffer = this.buffers[strBuffer];            // get the audio buffer by it's name
  if (navigator.vendor.indexOf("Apple") != -1){
    buffer = this.fallbackBuffers[strBuffer];  // use the fallbackBuffer if the user is trying to support Safari
  }
  
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // Give the Source some PCM data to be played
  source.connect(context.destination);       // connect the audio source the speakers
  source.noteOn(0);                          // play the audio source zero seconds from now
}


// ORIGINAL code and comments
// We need a place to store our audio buffers.  
// May as well pin them here, directly to the context
webkitAudioContext.prototype.buffers = {};

// ORIGINAL code and comments
// Specially for Safari, use this workaround to create a good experience for 
// users who wound up using Safari today.  
webkitAudioContext.prototype.fallbackBuffers = {};









