/*----------------------------------------------
	addLoadEvent() checks if an onload event has
	been added. If so, the passed function is
	appended to the event; if not, it becomes the 
	the onload event
------------------------------------------------*/
// Pass a function without the parentheses's: 'foo', not 'foo()'

function addLoadEvent(func) {
	var old_onload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	}
	else {
		window.onload = function() {
			old_onload();
			func();
		}
	}
}


/*----------------------------------------------
	linkClass() is for the images with a class of
	"link". It loops thru all images to find them, 
	then attaches imgOver and imgOff functions
	to the onmouseover and onmouseout events.
	Also, preloads the rollover images.
------------------------------------------------*/
function linkClass() {

	var imgs = document.getElementsByTagName( "img" );
	for (var loop = 0; loop < imgs.length; loop++) {
		var img = imgs[loop];
		
		if (img.className == 'link') {
			var roll = new Image();
      if(img.src.indexOf('_on') == -1){
        img.onmouseover=imgOver;
  			img.onmouseout=imgOff;
        roll.src = img.src.replace(/(\.[a-z0-9]+)$/i,'_on$1');
      }else{
        img.onmouseover=imgOff;
        img.onmouseout=imgOver;
        roll.src = img.src.replace(/_on(\.[a-z0-9]+)$/i,'$1');
      }
		}
	}
}

function imgOver() {
  if(this.src.indexOf('_sel') == -1){
	  this.src = this.src.replace(/(\.[a-z0-9]+)$/i,'_on$1');
  }
}

function imgOff() {
  if(this.src.indexOf('_sel') == -1){
	  this.src = this.src.replace(/_on(\.[a-z0-9]+)$/i,'$1');
  }
}

function postLinkClass(imgID) {
  var img = document.getElementById(imgID); 
  if(img){
	  var roll = new Image();
    if(img.src.indexOf('_on') == -1){
      img.onmouseover=imgOver;
			img.onmouseout=imgOff;
      roll.src = img.src.replace(/(\.[a-z0-9]+)$/i,'_on$1');
    }else{
      img.onmouseover=imgOff;
      img.onmouseout=imgOver;
      roll.src = img.src.replace(/_on(\.[a-z0-9]+)$/i,'$1');
    }  
  }
  img = null;
  
}

function openwindow(url, name, options){
  var tWnd = window.open(url, name,options);
  if(tWnd){tWnd.focus();}
  tWnd = null;
}


// ON LOAD
addLoadEvent(linkClass);

