


var PSquare = function() {
	
	var _mySquareName;
	var _$mySquare;
	var _currMode;
	var OUT_SIDE_ACTIVE = "outside_active";
	var IN_SIDE_ACTIVE  = "inside_active";
	
	var DUPLICATE_ERROR = "duplicate_error";
	var SWITCH_A_ERROR = "switch_a_error";
	
	//var _lock = false;
	

	var _$topLeft;
	var _$topRight;
	var _$leftTop;
	var _$leftBot;
	
	var _$inside_botleft;
	var _$inside_botright;
	var _$inside_topleft;
	var _$inside_topright;
	
	var _$errorMessage;
	
	//var _$thisHilite;
	
	//var myInsideTextEntries = [];
	
	//"duplicate"
	//var errorType = "";
	var _$outsideTopFly;
	var _$outsideLeftFly;
	var _$top_leftfly;
	var _$top_rightfly;
	var _$bot_leftfly;
	var _$bot_rightfly;
	
	var CLICK_THROUGH_LETTERS = "click_thru_letters";
	var USE_BUTTON_LETTERS = "use_button_letters";
	
	var _captureMode = CLICK_THROUGH_LETTERS;
	
	
		
	
	//=========================================================================
	function init(p_SquareDivName, p_ModeToSet)
	{
	  _mySquareName = p_SquareDivName;
	  _$mySquare = $("#"+_mySquareName);
	  _currMode = p_ModeToSet;
	
	  setFlyVariables();
	
	
	  //assign jQuery Objects
	  //to instance variables
	  cacheJQueryVariablesforOutsideTextAreas();
	  cacheJQueryVariablesforInsideTextAreas();
	
	  //cache jquery error message object
	  //_$errorMessage = $("#"+_mySquareName + ' .error_display')
	
	  // set all outside text to blank
      setAllOutsideTextToBlank();
	
	  // set handlers on all outside text boxes
      assignHandlersToOutsideTextAreas();

      setAllOutsideTextBoxesToGreen();

      
      $("#"+_mySquareName + ' .pheno_button').css("visibility","hidden");

      //cache jquery error message object
	  _$errorMessage = $("#"+_mySquareName + ' .error_display')
      _$errorMessage.on("mousedown", hideErrorMessage)
	  //setInsideTextBoxesToDarkGreen();
	
	$(document).on("setModeToClickThrough", setModeToClickThrough);
	$(document).on("setModeToButtonLetters", setModeToButtonLetters);
     
	}
	
	// listen for this event to switch modes....
	 
	
	
	function setModeToClickThrough()
	{
		_captureMode = CLICK_THROUGH_LETTERS;
	}
	
	function setModeToButtonLetters()
	{
	  _captureMode = USE_BUTTON_LETTERS;	
	}
	
	
	function resetMode(p_mode)
	{

		//if(_currMode === CLICK_THROUGH_LETTERS)
		//{
		   //_currMode = USE_BUTTON_LETTERS;	
	//	}
	//	else
		//{
			//_currMode = CLICK_THROUGH_LETTERS;
		//}
	}
	
	
	function showOutsideFlys()
	{
		//var _$topLeft;
		///var _$topRight;
		//var _$leftTop;
		//var _$leftBot;
		if(  ( _$topLeft.html()=== "b") && ( _$topRight.html()=== "b")  )
		{
		  	_$outsideTopFly.css({"visibility":"visible","backgroundPosition":"-32px 0px"})	
		}
		else
		{
			_$outsideTopFly.css({"visibility":"visible","backgroundPosition":"0px 0px"});	
		}
		
		if(  ( _$leftTop.html()=== "b") && ( _$leftBot.html()=== "b")  )
		{
		  	_$outsideLeftFly.css({"visibility":"visible","backgroundPosition":"-32px 0px"});	
		}
		else
		{
			_$outsideLeftFly.css({"visibility":"visible","backgroundPosition":"0px 0px"});	
		}
	}
	
	
	function showInsideFlys()
	{
		//var _$inside_botleft;
		//var _$inside_botright;
		//var _$inside_topleft;
		//var _$inside_topright;
		if(_$inside_botleft.html()==="bb")
		{
		  _$bot_leftfly.css({"visibility":"visible","backgroundPosition":"-32px 0px"})		
		}else
		{
		  _$bot_leftfly.css({"visibility":"visible","backgroundPosition":"0px 0px"})		
		}
		
		if(_$inside_botright.html()==="bb")
		{
		  _$bot_rightfly.css({"visibility":"visible","backgroundPosition":"-32px 0px"})		
		}else
		{
		  _$bot_rightfly.css({"visibility":"visible","backgroundPosition":"0px 0px"})		
		}
		
			if(_$inside_topleft.html()==="bb")
			{
			  _$top_leftfly.css({"visibility":"visible","backgroundPosition":"-32px 0px"})		
			}else
			{
			  _$top_leftfly.css({"visibility":"visible","backgroundPosition":"0px 0px"})		
			}
		
			if(_$inside_topright.html()==="bb")
			{
			  _$top_rightfly.css({"visibility":"visible","backgroundPosition":"-32px 0px"})		
			}else
			{
			  _$top_rightfly.css({"visibility":"visible","backgroundPosition":"0px 0px"})		
			}
		
	}
	
	function resetOutsideTextFromResetButton()
	{
		    
			if(_$topLeft.html() !== ""){_$topLeft.html("&#151") };
		    if(_$topRight.html() !== ""){_$topRight.html("&#151") };
			if(_$leftTop.html() !== ""){_$leftTop.html("&#151") };
			if(_$leftBot.html() !== ""){_$leftBot.html("&#151") };

		   setTimeout(function() { 
		    //$(".outside_textbox").html(""); 
		   	if(_$topLeft.html() !== ""){_$topLeft.html("-") };
		    if(_$topRight.html() !== ""){_$topRight.html("-") };
			if(_$leftTop.html() !== ""){_$leftTop.html("-") };
			if(_$leftBot.html() !== ""){_$leftBot.html("-") };
			setTimeout(function() { 
			$(".outside_textbox").html(""); 	
			}, 100);
		}, 100);
		
		
	}
	
	function resetInsideTextFromResetButton()
	{

	   	if( _$inside_botleft.html() !== ""){ _$inside_botleft.html("&#151") };
	    if( _$inside_botright.html() !== ""){ _$inside_botright.html("&#151") };
		if(_$inside_topleft.html() !== ""){_$inside_topleft.html("&#151") };
		if(_$inside_topright.html() !== ""){_$inside_topright.html("&#151") };
	
	   setTimeout(function() { 
	    //$(".outside_textbox").html(""); 
	   	if( _$inside_botleft.html() !== ""){ _$inside_botleft.html("-") };
	    if( _$inside_botright.html() !== ""){ _$inside_botright.html("-") };
		if(_$inside_topleft.html() !== ""){_$inside_topleft.html("-") };
		if(_$inside_topright.html() !== ""){_$inside_topright.html("-") };
		setTimeout(function() { 
		$(".inside_textbox").html(""); 	
		}, 100);
	}, 100);
	
	}
	
	
	
	
	function hideAllFlys()
	{
		_$outsideTopFly.css("visibility","hidden");
		_$outsideLeftFly.css("visibility","hidden");
		_$top_leftfly.css("visibility","hidden");
		_$top_rightfly.css("visibility","hidden");
		_$bot_leftfly.css("visibility","hidden");
		_$bot_rightfly.css("visibility","hidden");	
	}
	
	
	function setFlyVariables()
	{
		_$outsideTopFly = $("#"+_mySquareName + ' .outside_topfly');
		_$outsideLeftFly = $("#"+_mySquareName + ' .outside_leftfly');
		_$top_leftfly = $("#"+_mySquareName + ' .top_leftfly');
		_$top_rightfly = $("#"+_mySquareName + ' .top_rightfly');
		_$bot_leftfly= $("#"+_mySquareName + ' .bot_leftfly');
		_$bot_rightfly = $("#"+_mySquareName + ' .bot_rightfly');
		
		//_$outsideTopFly.css("visibility","visible"); - 32
		
	}
	
	
	//***********************************************************************
	// DEBUG DEBUG DEBUG
	// show pheno buttons for testing / debug
	function showPhenoButton()
	{
	   $("#"+_mySquareName + ' .pheno_button').on("mousedown",showPhenoInfo);
	   $("#"+_mySquareName + ' .pheno_button').css("visibility","visible");	
	}
	
	function showPhenoInfo()
	{
		alert("Genotype is: " + getGenotype().toString() + "  |  Phenotype is:" + getPhenotype().toString());
	}
	//***********************************************************************
	
	function resetAllOutsideTextBoxesToGray(p_currMode)
	{
		
		 _$topLeft.css("backgroundPosition", "-162px 0px").css("cursor","default");
		 _$topRight.css("backgroundPosition", "-162px 0px").css("cursor","default");
		 _$leftTop.css("backgroundPosition", "-162px 0px").css("cursor","default");
		 _$leftBot.css("backgroundPosition", "-162px 0px").css("cursor","default");
		
	}
	
	function setAllInsideTextBoxesToGreen()
	{
		 _$inside_botleft.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		 _$inside_botright.css("backgroundPosition", "-54px 0px").css("cursor","pointer");;
		 _$inside_topleft.css("backgroundPosition", "-54px 0px").css("cursor","pointer");;
		 _$inside_topright.css("backgroundPosition", "-54px 0px").css("cursor","pointer");;
		
		
	}
	
	
	function setAllOutsideTextBoxesToGreen()
	{
		_$topLeft.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		 _$topRight.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		 _$leftTop.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		 _$leftBot.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		
		
		
	}
	

	
	function hideErrorMessage()
	{
		// set a local variable to prevent
		// double clicking on a button
		// does this actually work?
		if(hideErrorMessage.lock == true){return};
		
		hideErrorMessage.lock = true;
		
		//soundManager.play("sfx_12");
		soundPlayer.playASound(23);
		
		_$errorMessage.animate({"top":"-=10px"}, 30, function(){
				_$errorMessage.animate({"top":"+=20px"}, 30, function(){
						_$errorMessage.animate({"top":"-=10px"}, 30, function(){
							// nothing
							_$errorMessage.css("visibility","hidden");
							hideErrorMessage.lock = false;
						});
				});
		});		
	}
	
	
	//=========================================================================
	// gets an array of strings representing the
	// text inside
	function getArrayOfInsideText()
	{
		// get all inside entries and
		// put into an array
		var tInsideArray = [];
		
		return [ _$inside_botleft.html(), _$inside_botright.html(),  _$inside_topleft.html(), _$inside_topright.html()  ]
	}
	
	
	
	//=========================================================================
	// gets and returns the numbers of character groups, the genotype
	// ie, how many "BB", "Bb", "bb"
	function getGenotype()
	{
		var tBB_count = 0;//var tAA_count = 0;
		var tBb_count = 0;//var tAa_count = 0;
		var tbb_count = 0;//var taa_count = 0;
		
	    var tArray = [_$inside_botleft.html(),_$inside_botright.html(),_$inside_topleft.html(),_$inside_topright.html()]
	
        for(var i = 0; i < 4; i++)
        {  
			if (tArray[i] === "BB"){tBB_count++};
			if (tArray[i] === "Bb") {tBb_count++};
	        if (tArray[i] === "bb"){tbb_count++};
	    }
		return [tBB_count,tBb_count,tbb_count]	
	}
	
	
	
	//=========================================================================
	// gets + returns the numbers of character groups, the phenotype
	// ie, how many ("BB", "Bb" as group ), "bb"
	function getPhenotype()
	{
		var tBB_Bb_count = 0;
		var tbb_count = 0;

		var tArray = [_$inside_botleft.html(),_$inside_botright.html(),_$inside_topleft.html(),_$inside_topright.html()]

	    for(var i = 0; i < 4; i++)
	    {  
			if ((tArray[i] === "BB") || (tArray[i] === "Bb")) {tBB_Bb_count++};
		    if (tArray[i] === "bb"){tbb_count++};
		}
	    return [tBB_Bb_count,tbb_count]
	}
	
	
	
	
	//=========================================================================
	// turns the red square around the punnent square on when it
	// is incorrect
	function turnIncorrectHiliteOn()
	{
		$("#"+_mySquareName + ' .incorrect_hilite').css("visibility","visible");
	}
	
	
	
	
	//=========================================================================
	// turns the red square around the punnent square off 
	function turnIncorrectHiliteOff()
	{
	   $("#"+_mySquareName + ' .incorrect_hilite').css("visibility","hidden");	
	}
	
	
	
	//=========================================================================
	// turns the red square around the punnent square on when it
	// is incorrect
	function turnIncorrectHiliteOnWithErrorMessage(p_error)
	{
		
		//return;
		
		$("#"+_mySquareName + ' .incorrect_hilite').css("visibility","visible");
		
		console.log(p_error);
		
		if( p_error === "duplicate")
		{
			_$errorMessage.css("backgroundPosition","0px 0px");
			_$errorMessage.css("visibility","visible");
		}
		else
		{
			_$errorMessage.css("backgroundPosition","-66px 0px");
			_$errorMessage.css("visibility","visible");
		}
		
		
	}
	
	
	//=========================================================================
	// turns the red square around the punnent square on when it
	// is incorrect
	function turnIncorrectHiliteOffWithErrorMessage()
	{
		$("#"+_mySquareName + ' .incorrect_hilite').css("visibility","hidden");
		
		_$errorMessage.css("visibility","hidden");
		
	}
	
	
	function changeOutsideTextHiliteStateToOff()
	{
		
		
	}
	
	
	function setInsideTextBoxesToDarkGreen()
	{
		_$inside_botleft.css("backgroundPosition", "-27px 0px").css("cursor","default").css("color","#CCCCCC");
		_$inside_botright.css("backgroundPosition", "-27px 0px").css("cursor","default").css("color","#CCCCCC");
		_$inside_topleft.css("backgroundPosition", "-27px 0px").css("cursor","default").css("color","#CCCCCC");
		_$inside_topright.css("backgroundPosition", "-27px 0px").css("cursor","default").css("color","#CCCCCC");
		
		// set text to off white
		//color:#CCCCCC
	}
	
	function setInsideTextBoxesBlack()
	{
		_$inside_botleft.css("color","#000000");
		_$inside_botright.css("color","#000000");
		_$inside_topleft.css("color","#000000");
		_$inside_topright.css("color","#000000");
		
		// set text to off white
		//color:#CCCCCC
	}
	
	
	//=========================================================================
	// assign mousedown handlers to 
	// outside text areas
	function assignHandlersToOutsideTextAreas()
	{
		_$topLeft.on( "mousedown", clickTheOutsideTextBox);
		_$topRight.on("mousedown", clickTheOutsideTextBox);
		_$leftTop.on( "mousedown", clickTheOutsideTextBox);
		_$leftBot.on( "mousedown", clickTheOutsideTextBox);	
	}
	
	
	
	//=========================================================================
	// remove mousedown handlers on
	// outside text areas
	function removeHandlersOnOutsideTextAreas()
	{
		_$topLeft.off( "mousedown", clickTheOutsideTextBox);
		_$topRight.off("mousedown", clickTheOutsideTextBox);
		_$leftTop.off( "mousedown", clickTheOutsideTextBox);
		_$leftBot.off( "mousedown", clickTheOutsideTextBox);	
	}
	
	
	
	//=========================================================================
	// assign mousedown handlers to 
	// inside text areas
	function assignHandlersToInsideTextAreas()
	{
		_$inside_botleft.on( "mousedown", clickTheInsideTextBox);
		_$inside_botright.on("mousedown", clickTheInsideTextBox);
		_$inside_topleft.on( "mousedown", clickTheInsideTextBox);
		_$inside_topright.on( "mousedown", clickTheInsideTextBox);	
	}
	
	
	//=========================================================================
	// remove mousedown handlers on 
	// inside text areas
	function removeHandlersToInsideTextAreas()
	{
		_$inside_botleft.off( "mousedown", clickTheInsideTextBox);
		_$inside_botright.off("mousedown", clickTheInsideTextBox);
		_$inside_topleft.off( "mousedown", clickTheInsideTextBox);
		_$inside_topright.off( "mousedown", clickTheInsideTextBox);	
	}
	
	
	
	
	//=========================================================================
	// turns the visibility of the inside text boxes on
	// they are off when activity starts
	function turnOnInsideButtons()
	{
		$("#"+_mySquareName + ' .inside_botleft').css("visibility","visible");
		$("#"+_mySquareName + ' .inside_botright').css("visibility","visible");
		$("#"+_mySquareName + ' .inside_topleft').css("visibility","visible");
		$("#"+_mySquareName + ' .inside_topright').css("visibility","visible");
	}
	
	
	
	
	
	//=========================================================================
	// handles click from mousedown on a outside text object
	// puts text inside that box
	function clickTheOutsideTextBox(event)
	{
		//alert("here" + _currMode + " " + CLICK_THROUGH_LETTERS);
		
		if (_captureMode === CLICK_THROUGH_LETTERS)
		{
			
			
		    if( $(this).html() === ""){ 
			$(this).html("B");
			PSquare.totalClicked++;
			}
			else
			{
				if ($(this).html() === "B")
				{
					$(this).html("b");
				}
				else if ($(this).html() === "b")
				{
				   	$(this).html("B");	
				}

			}
			
			if( $(this).hasClass("outside_topleft") ||$(this).hasClass("outside_topright") )
			{
				  soundPlayer.playASound(1);
				// animate top left to right
				$(this).animate({"left":"-=5px"}, 30, function(){
						$(this).animate({"left":"+=10px"}, 30, function(){
								$(this).animate({"left":"-=5px"}, 30, function(){
									// nothing
								});
						});
				});

			}	else
				{
					soundPlayer.playASound(2);
					// animate bottom top to bottom
					$(this).animate({"top":"-=5px"}, 30, function(){
							$(this).animate({"top":"+=10px"}, 30, function(){
									$(this).animate({"top":"-=5px"}, 30, function(){
										// nothing
									});
							});
					});

				}
			
			
			
			if( PSquare.totalClicked >= 36)
			   {
				// send an event to main script...
				// all sides filled in
				$.event.trigger({
					type: "showOutsideCheckAnswerButton"
				});	
			}
			
			
			$.event.trigger({
				type: "showResetRoundButton"
			});
			
			
			return;
		}
		// check if already filled by that letter-
		// if so, do not jiggle
		if( $(this).html() ===PSquare.currLetterCombo)
		{
			//soundManager.play("SFX_noclick");
			soundPlayer.playASound(15);
			return;
		}
		
		// ONLY if type is blank, increment static class variable that 
		// counts number of buttons clicked
		if( $(this).html() === ""){ PSquare.totalClicked++};
		
		// put letter in place
	    $(this).html(PSquare.currLetterCombo) ;
	
	    //soundManager.play("sfx_1");
	  

		// jiggle the side buttons depending on which
		// class is attached to them
		if( $(this).hasClass("outside_topleft") ||$(this).hasClass("outside_topright") )
		{
			 soundPlayer.playASound(1);
			// animate top left to right
			$(this).animate({"left":"-=5px"}, 30, function(){
					$(this).animate({"left":"+=10px"}, 30, function(){
							$(this).animate({"left":"-=5px"}, 30, function(){
								// nothing
							});
					});
			});
			
		} 
		else
		{
			soundPlayer.playASound(2);
			// animate bottom top to bottom
			$(this).animate({"top":"-=5px"}, 30, function(){
					$(this).animate({"top":"+=10px"}, 30, function(){
							$(this).animate({"top":"-=5px"}, 30, function(){
								// nothing
							});
					});
			});
			
		}	
		
		$.event.trigger({
			type: "showResetRoundButton"
		});
			
	
	   if( PSquare.totalClicked >= 36)
	   {
		// send an event to main script...
		// all sides filled in
		$.event.trigger({
			type: "showOutsideCheckAnswerButton"
		});
	   }
	}
	
	
	
	
	//=========================================================================
	// handler that puts text into inside text box
	//
	function clickTheInsideTextBox(event)
	{
		
		
		if (_captureMode === CLICK_THROUGH_LETTERS)
		{
			
		    if( $(this).html() === ""){ 
			    $(this).html("BB");
			PSquare.totalClicked++;
			}
			else
			{
				if ($(this).html() === "BB")
				{
					$(this).html("Bb");
				}
				else if ($(this).html() === "Bb")
				{
				   	$(this).html("bb");	
				}
				else if ($(this).html() === "bb")
				{
					$(this).html("BB");	
				}
				
			}
			soundPlayer.playASound(24);
			$(this).animate({"top":"-=5px"}, 30, function(){
					$(this).animate({"top":"+=10px"}, 30, function(){
							$(this).animate({"top":"-=5px"}, 30, function(){
								//nothing
							});
					});
			});
			
			
			if( PSquare.totalClicked >= 36)
			   {
				// send an event to main script...
				// all sides filled in
				$.event.trigger({
					type: "showOutsideCheckAnswerButton"
				});	
			}
			
			
			$.event.trigger({
				type: "showResetRoundButton"
			});
			
			
			return;
		}

		if( $(this).html() ===PSquare.currLetterCombo)
		{
			//soundManager.play("SFX_noclick");
			soundPlayer.playASound(15);
			return;
		}
		
		// ONLY if type is blank, increment static class variable that 
		// counts number of buttons clicked
		if( $(this).html() === ""){ PSquare.totalClicked++};
		
		// put letter in place
		$(this).html(PSquare.currLetterCombo) ;
		
		//soundManager.play("sfx_1");
		soundPlayer.playASound(24);
		$(this).animate({"top":"-=5px"}, 30, function(){
				$(this).animate({"top":"+=10px"}, 30, function(){
						$(this).animate({"top":"-=5px"}, 30, function(){
							//nothing
						});
				});
		});
		
		$.event.trigger({
			type: "showResetRoundButton"
		});
		
		
		if( PSquare.totalClicked >= 36)
		   {
			// send an event to main script...
			// all sides filled in
			$.event.trigger({
				type: "showOutsideCheckAnswerButton"
			});	
		}			
	}
	


	
	//=========================================================================
	// assign variables to outside
	// jQuery text areas
	function cacheJQueryVariablesforOutsideTextAreas()
	{
	  _$topLeft  = $("#" + _mySquareName + " .outside_topleft");
	  _$topRight = $("#" + _mySquareName + " .outside_topright");
	  _$leftTop =  $("#" + _mySquareName + " .outside_lefttop");
	  _$leftBot =  $("#" + _mySquareName + " .outside_leftbot");	
	}
	
	
	
	
	//=========================================================================
	// assign variables to inside
	// jQuery text areas
	function cacheJQueryVariablesforInsideTextAreas()
	{
	  _$inside_botleft = $("#" + _mySquareName + " .inside_botleft");
	  _$inside_botright = $("#" + _mySquareName + " .inside_botright");
	  _$inside_topleft = $("#" + _mySquareName + " .inside_topleft");
	  _$inside_topright = $("#" + _mySquareName + " .inside_topright");	
	}
	
	
	
	
	//=========================================================================
	// sets the text in the inside text boxes
	// to blank
	function setAllInsideTextToBlank()
	{
		_$inside_botleft.html("");
		_$inside_botright.html("");
		_$inside_topleft.html("");
		_$inside_topright.html("");
	}
	
	
	
	
	//=========================================================================
	// sets the text in the outside text boxes
	// to blank
	function setAllOutsideTextToBlank()
	{
		 _$topLeft.html("");
		 _$topRight.html("");
		 _$leftTop.html("");
		 _$leftBot.html("");			
	}
	
	
	
	
	//=========================================================================
	// sets the text in the outside text boxes
	// to this array for testing
    function injectFirstLevel(p_array)
    {
	   	 _$topLeft.html(p_array[0]).css("backgroundPosition", "-162px 0px");
		 _$topRight.html(p_array[1]).css("backgroundPosition", "-162px 0px");
		 _$leftTop.html(p_array[2]).css("backgroundPosition", "-162px 0px");
		 _$leftBot.html(p_array[3]).css("backgroundPosition", "-162px 0px");
		
		  //_$topLeft.css("backgroundPosition", "-162px 0px");
    }




    //=========================================================================
	// sets the text in the inside text boxes
	// to this array for testing
    function injectSecondLevel(p_array)
    {
		_$inside_topleft.html(p_array[0]);
		_$inside_topleft.css("visibility","visible").css("color", "#FFF");

		_$inside_topright.html(p_array[1]);
		_$inside_topright.css("visibility","visible").css("color", "#FFF");;
		
		 _$inside_botleft.html(p_array[2]);
		 _$inside_botleft.css("visibility","visible").css("color", "#FFF");;
		
		 _$inside_botright.html(p_array[3]);
		 _$inside_botright.css("visibility","visible").css("color", "#FFF");;
    }


	
	
	//=========================================================================
	// checks for conflict of "A", "a"-
	// is so, returns false
	function checkIfOutsideTextValid()
	{
		if ( ((getText(_$topLeft)=== "b") && (getText(_$topRight)==="B" )) ||  ((getText(_$leftTop)=== "b") && (getText(_$leftBot)==="B" )) ) 
		{
		
			
			return false;
			
		} else if ( (getText(_$topLeft)=== "E") || (getText(_$topRight)==="E" ) ||  (getText(_$leftTop)=== "E") || (getText(_$leftBot)==="E" ) )
		{
			
			return false;
		}
		else
		{
			return true;
		}
	}
	
	
	//=========================================================================
	// check if text in the inside text boxes is valid or not
	// if it is not, the getText function will return "E"
	function checkIfInsideTextIsValid()
	{
		if ( (getText(_$topLeft)=== "E") || (getText(_$topRight)==="E" ) ||  (getText(_$leftTop)=== "E") || (getText(_$leftBot)==="E" ) )
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	
	
	
	
	//=========================================================================
	// check and see if the text inside matches 
	// the outside letters
	function checkIfInsideTextIsCorrect()
	{
		var insideTopLeft = getText(_$topLeft) + getText(_$leftTop);
		if(insideTopLeft === "bB"){insideTopLeft = "Bb"};
		
		var insideTopRight = getText(_$topRight) + getText(_$leftTop);
		if(insideTopRight === "bB"){insideTopRight = "Bb"};
		
		var insideBotLeft = getText(_$topLeft) + getText(_$leftBot);
		if(insideBotLeft === "bB"){insideBotLeft = "Bb"};
		
		var insideBotRight = getText(_$topRight) + getText(_$leftBot);
		if(insideBotRight === "bB"){insideBotRight = "Bb"};
		
		// now compare.....
		if((_$inside_topleft.html() === insideTopLeft) && (_$inside_topright.html() === insideTopRight)&& (_$inside_botleft.html() === insideBotLeft)&&(_$inside_botright.html() === insideBotRight))
		{
			return true;
		}
		else
		{
			
			return false;
		}			
	}
	
	
	
	
	
	//=========================================================================
	// gets the text from the outside text boxes
	// and returns it in the form 
	// [topLeft,topRight,leftTop,leftBot]
	function getArrayOfOutsideText()
	{
		var tArray = [getText(_$topLeft),getText(_$topRight),getText(_$leftTop),getText(_$leftBot)];
		return tArray;
	}
	
	
	
	function resetInsideTextForReplay()
	{
		setAllInsideTextToBlank();
		setInsideTextBoxesBlack();
		$(".inside_textbox").css("backgroundPosition","0px 0px");
	}
	
	function resetOutsideTextForReplay()
	{
		setAllOutsideTextToBlank();
		//setAllOutsideTextBoxesToGreen();
		setAllOutsideBoxesNoCursor();
	}
	
	function setAllOutsideBoxesNoCursor()
	{
		_$topLeft.css("backgroundPosition", "-54px 0px").css("cursor","default");
		 _$topRight.css("backgroundPosition", "-54px 0px").css("cursor","default");
		 _$leftTop.css("backgroundPosition", "-54px 0px").css("cursor","default");
		 _$leftBot.css("backgroundPosition", "-54px 0px").css("cursor","default");
		
	}
	
	function turnOffAllOutsideCursors()
	{
	 _$topLeft.css("cursor","default");
	 _$topRight.css("cursor","default");
	 _$leftTop.css("cursor","default");
	 _$leftBot.css("cursor","default");
		
	}
	
	function turnOffAllInsideCursors()
	{
		_$inside_botleft.css("cursor","default");
		_$inside_botright.css("cursor","default");
		_$inside_topleft.css("cursor","default");
		_$inside_topright.css("cursor","default");
		
	}
	
	
	//=========================================================================
	// returns the text associated with the 
	// jquery object sent in the parameter as string -
	// returns "E" if no text is present or if
	// a blank space is there
	function getText(p_Obj)
	{
		if(!/[\S]/.test(p_Obj.html()))
		{ 
		    return("E")
		} 
		else
		{
			return p_Obj.html();
		}	
	}
	
	
	
	//=========================
	// public exposed functions
	return {
		init: init,
        getArrayOfOutsideText:getArrayOfOutsideText,
        checkIfOutsideTextValid:checkIfOutsideTextValid,
        turnIncorrectHiliteOn:turnIncorrectHiliteOn,
        turnIncorrectHiliteOff:turnIncorrectHiliteOff,
        removeHandlersOnOutsideTextAreas:removeHandlersOnOutsideTextAreas,
        removeHandlersToInsideTextAreas:removeHandlersToInsideTextAreas,
        turnOnInsideButtons:turnOnInsideButtons,
        assignHandlersToInsideTextAreas:assignHandlersToInsideTextAreas,
        injectFirstLevel:injectFirstLevel,
        injectSecondLevel:injectSecondLevel,
        checkIfInsideTextIsValid:checkIfInsideTextIsValid,
        checkIfInsideTextIsCorrect:checkIfInsideTextIsCorrect,
        getArrayOfInsideText:getArrayOfInsideText,
        getGenotype:getGenotype,
        getPhenotype:getPhenotype,
        showPhenoButton:showPhenoButton,
        showPhenoInfo:showPhenoInfo,
        turnIncorrectHiliteOnWithErrorMessage:turnIncorrectHiliteOnWithErrorMessage,
        turnIncorrectHiliteOffWithErrorMessage:turnIncorrectHiliteOffWithErrorMessage,
        setAllInsideTextToBlank:setAllInsideTextToBlank,
        setAllOutsideTextToBlank:setAllOutsideTextToBlank,
        resetAllOutsideTextBoxesToGray:resetAllOutsideTextBoxesToGray,
        setAllInsideTextBoxesToGreen:setAllInsideTextBoxesToGreen,
		setInsideTextBoxesToDarkGreen:setInsideTextBoxesToDarkGreen,
		showInsideFlys:showInsideFlys,
		showOutsideFlys:showOutsideFlys,
		hideAllFlys:hideAllFlys,
		resetInsideTextForReplay:resetInsideTextForReplay,
		resetOutsideTextForReplay:resetOutsideTextForReplay,
		assignHandlersToOutsideTextAreas:assignHandlersToOutsideTextAreas,
		setAllOutsideTextBoxesToGreen:setAllOutsideTextBoxesToGreen,
		turnOffAllOutsideCursors:turnOffAllOutsideCursors,
		turnOffAllInsideCursors:turnOffAllInsideCursors,
		resetInsideTextFromResetButton:resetInsideTextFromResetButton,
		resetOutsideTextFromResetButton:resetOutsideTextFromResetButton

		
	};
};

