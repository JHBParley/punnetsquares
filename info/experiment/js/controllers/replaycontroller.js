


var ReplayController = function() {
	
	var _myParent;
	
	var _$lightBoxScreen;
	
	var _$helpPanelsLayer;
	
	var _$replayFromEndScreen;
	var _$returnToLevel_1_button;
	var _$returnToLevel_2_button;
	var _$returnToLevel_3_button;
	var _$returnToLevel_4_button;
	
	var _$playAgainFromStartScreen;
	var _$startAtLevel_1_button;
	var _$startAtLevel_2_button;
	var _$startAtLevel_3_button;
	var _$startAtLevel_4_button;
	
	var _$replay_from_end_close_button;
	
	//=========================================================================
	function init(p_Parent)
	{
		$("#play_again_from_start_screen").find(".left_top_caption").css("color","gray");
		$("#play_again_from_start_screen").find(".right_top_caption").css("color","gray");
		$("#play_again_from_start_screen").find(".left_bot_caption").css("color","gray");
		$("#play_again_from_start_screen").find(".right_bot_caption").css("color","gray");	
			
		_myParent = p_Parent;
		// get reference to the buttons and to the div that overlays...
		cacheJQueryVariables();
		
		assignHandlersToButtons();
		
		//_myParent.getTestMessage();
	}
	
	function cacheJQueryVariables()
	{
		_$replayFromEndScreen = $("#replay_from_end_screen");
				
		_$lightBoxScreen = $("#lightbox");
		
		_$helpPanelsLayer = $("#help_panels_layer"); 
		
		
		
		_$returnToLevel_1_button  = $("#return_to_level_1_button");
		_$returnToLevel_2_button = $("#return_to_level_2_button");
		_$returnToLevel_3_button = $("#return_to_level_3_button");
		_$returnToLevel_4_button = $("#return_to_level_4_button");
		
		_$playAgainFromStartScreen = $("#play_again_from_start_screen");
		_$startAtLevel_1_button = $("#start_at_level_1_button");
		_$startAtLevel_2_button = $("#start_at_level_2_button");
		_$startAtLevel_3_button = $("#start_at_level_3_button");
		_$startAtLevel_4_button = $("#start_at_level_4_button");
		
		_$replay_from_end_close_button = $("#replay_from_end_close_button");
	}
	
	
	function  hideReplayFromEndScreen()
	{
	  _$lightBoxScreen.css("visibility","hidden");
	  _$helpPanelsLayer.css("visibility","hidden");
	  _$replayFromEndScreen.css("visibility","hidden");
	}
	
	
	function showReplayFromEndScreen()
	{
		_$lightBoxScreen.css("visibility","visible");
		_$helpPanelsLayer.css("visibility","visible");
		_$replayFromEndScreen.css("visibility","visible");
	}
	

	function showPlayAgainFromStartScreen(p_numsToShowArray)
	{
		// go throug, see if these numbers are on array
		var tempArray = p_numsToShowArray;
		
		
		if($.inArray(3,tempArray) > -1)
		{
			//make visible section 1 button
			$("#start_at_level_1_button").css("visibility","visible");
			$("#play_again_from_start_screen").find(".left_top_caption").css("color","white");
		}
		
		if($.inArray(4,tempArray) > -1)
		{
			//make visible section 2 button
			$("#start_at_level_2_button").css("visibility","visible");
			$("#play_again_from_start_screen").find(".right_top_caption").css("color","white");
		}
		
		if($.inArray(5,tempArray) > -1)
		{
			//make visible section 3 button
			$("#start_at_level_3_button").css("visibility","visible");
			$("#play_again_from_start_screen").find(".left_bot_caption").css("color","white");
		}
		
		if($.inArray(6,tempArray) > -1)
		{
			//make visible section 4 button
			$("#start_at_level_4_button").css("visibility","visible");
			$("#play_again_from_start_screen").find(".right_bot_caption").css("color","white");
		}
		
		
		//
		_$lightBoxScreen.css("visibility","visible");
		_$helpPanelsLayer.css("visibility","visible");
		_$playAgainFromStartScreen.css("visibility","visible");
		
	}
	
	
	function hidePlayAgainFromStartScreen()
	{
		_$startAtLevel_1_button.css("visibility","hidden");
		_$startAtLevel_2_button.css("visibility","hidden");
		_$startAtLevel_3_button.css("visibility","hidden");
		_$startAtLevel_4_button.css("visibility","hidden");
		
		_$lightBoxScreen.css("visibility","hidden");
		_$helpPanelsLayer.css("visibility","hidden");
		_$playAgainFromStartScreen.css("visibility","hidden");

	}
	
	function hideReplayFromEndScreenAndShowReplayButton()
	{
		hideReplayFromEndScreen();
		$("#replay_game_again_button").css("visibility","visible");
		
	}
	
	
	function assignHandlersToButtons()
	{
		_$returnToLevel_1_button.on("mousedown",replayFromEndScreen);
		_$returnToLevel_2_button.on("mousedown",replayFromEndScreen);
		_$returnToLevel_3_button.on("mousedown",replayFromEndScreen);
		_$returnToLevel_4_button.on("mousedown",replayFromEndScreen);
		
		_$startAtLevel_1_button.on("mousedown",playAgainFromStart);
		_$startAtLevel_2_button.on("mousedown",playAgainFromStart);
		_$startAtLevel_3_button.on("mousedown",playAgainFromStart);
		_$startAtLevel_4_button.on("mousedown",playAgainFromStart);
		
		_$replay_from_end_close_button.on("mousedown", hideReplayFromEndScreenAndShowReplayButton)
		
		
	}
	
	function playAgainFromStart(event)
	{
		//alert("here");
		
		hidePlayAgainFromStartScreen();
		
		switch(event.target.id)
		{
			case "start_at_level_1_button":
				soundPlayer.playASound(23);
	  	      _myParent.startFrom(1);
	  		break;
	        
			case "start_at_level_2_button":
	  	      _myParent.startFrom(2);
	  		break;
	
			case "start_at_level_3_button":
	  	      _myParent.startFrom(3);
	  		break;
	
			case "start_at_level_4_button":
	  	     _myParent.startFrom(4);
	  		break;
	
	     }
		
	}
	
	function replayFromEndScreen(event)
	{
	 	    hideReplayFromEndScreen();
	         
	        soundPlayer.playASound(23);
	
			switch(event.target.id)
			{
				case "return_to_level_1_button":
		  	      _myParent.returnTo(1);
		  		break;
		        
				case "return_to_level_2_button":
		  	     _myParent.returnTo(2);
		  		break;
		
				case "return_to_level_3_button":
		  	     _myParent.returnTo(3);
		  		break;
		
				case "return_to_level_4_button":
		  	    _myParent.returnTo(4);
		  		break;
		
		     }
		
		
	}

	
	//=========================================================================
	return {
		init: init,
		showPlayAgainFromStartScreen:showPlayAgainFromStartScreen,
		showReplayFromEndScreen:showReplayFromEndScreen
		
		
	};
};

