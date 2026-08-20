


var KeyboardInputController = function() {
	
	var _parent;
	
	
	//=========================================================================
	function init(p_parent)
	{
	
	 _parent = p_parent;
	
	document.onkeydown = function(evt) {
		   
		    evt = evt || window.event;
	    	//console.log("event keycode= " + evt.keyCode);
		    
		    //_parent.keyboardPressed();
		
		    switch (evt.keyCode) {
		        case 38:
		             // up
		            _parent.keyboardPressed("up");
		            break;
		        case 40:
		          // down
		            _parent.keyboardPressed("down");
		            break;
		        case 87:
		            // up
		            _parent.keyboardPressed("up");
	            	break;
	            case 83:
                	// down
			        _parent.keyboardPressed("down");
		            break;
		       	case 32:
			             // up
			        _parent.keyboardPressed("down");
			        break;
		    }
		}; 
		
		


	}

	
	
	
	//=========================================================================
	return {
		init: init
		
	};
};

