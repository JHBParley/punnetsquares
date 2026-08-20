


var ApiController = function() {
	
	var _actionArrayAtStart;
	var _myArrayOfActions;

	
	
	
	
	//=========================================================================
	function init()
	{
	   // needed at all?	
	 
	}
	
	//=========================================================================
	function setCompletedActionsAtStart(p_ActionArray)
	{
		//alert("got it");
		
		_actionArrayAtStart = p_ActionArray;
		_myArrayOfActions = p_ActionArray;
	}
	
	//=========================================================================
	function isInfoPopupNeededAtStart()
	{
		//return true, false
		if($.inArray(1,_myArrayOfActions) === -1)
		{
			return true;
		}
		else
		{
			return false;
		}
			
	}
	
	
	function getActionList()
	{
		return _myArrayOfActions;
	}
	
	//=========================================================================
	function isReplayPopupNeededAtStart()
	{
		if($.inArray(3,_myArrayOfActions) > -1)
		{
			return true;
		} 
		else 	if($.inArray(4,_myArrayOfActions) > -1)
		{
				return true;
		} 	
		else 	if($.inArray(5,_myArrayOfActions) > -1)
		{
				return true;
		}				
		else 	if($.inArray(5,_myArrayOfActions) > -1)
		{
				return true;
		}else
		{
			return false;
		}
		
	}
	
	//=========================================================================
	// 
	function recordAction(p_number)
	{
		// send to database here?
		if($.inArray(p_number,_myArrayOfActions) === -1)
		{
		    // not there, so add
		    _myArrayOfActions.push(p_number);
		    // do database thing here...?
		}

		
	}
	
	
	function showThresholdPopUp()
	{
		if($.inArray(2,_myArrayOfActions) === -1)
		{
			return true;
		}else
		{
			return false;
		}		
	}
	
	
	
	//=========================
	// public exposed functions
	return {
		init: init,
		setCompletedActionsAtStart:setCompletedActionsAtStart,
		isInfoPopupNeededAtStart:isInfoPopupNeededAtStart,
		isReplayPopupNeededAtStart:isReplayPopupNeededAtStart,
		getActionList:getActionList,
		recordAction:recordAction,
		showThresholdPopUp:showThresholdPopUp
       
	};
};

