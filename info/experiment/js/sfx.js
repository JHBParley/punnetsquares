/**
 * SoundManager 2
 */

soundManager.flashVersion = (window.location.toString().match(/#flash8/i)?8:9);
if (soundManager.flashVersion != 8) {
  soundManager.useHighPerformance = true;
}

soundManager.setup({
  url: './swf/', // path to load SWF from (overriding default) 
  //bgColor: '#333333',

  wmode: 'transparent',
  debugMode: false,
  consoleOnly: false,
  useFlashBlock: true
});

soundManager.onready(function() {


  soundManager.setup({
    defaultOptions: {
      autoLoad: true
    }
  });

  var soundURLs = psmodel.getSoundsToLoad();

  for (var i=0; i<soundURLs.length; i++) {
	soundManager.createSound(soundURLs[i], './audio/'+soundURLs[i]+'.mp3');
  }
 


});
