




var PSMainController = function() {
	
    //-------------------------------
	// define a game mode object here
	// keeps track of state 
	var _gameModes = {};
	_gameModes.OUTSIDE_ACTIVE = "outside_active";       // level 1
	_gameModes.INSIDE_ACTIVE = "inside_active";         // level 2
	_gameModes.PARENT_OFFSPRING = "parent_offspring";   // level 3
	_gameModes.GENO_PHENO = "geno_pheno";               // level 4
	_gameModes.currentMode = "";
	
	
	//-------------------------------
	// cached jQuery dom elements
	var _$displayText                // the display text seen at bottom that changes each round
    var _$letterButtonHilite;
	var _$cycleDisplayIcon;
	var _$showFlysButton;
	var _$numberCircleHilite;
	
	//-------------------------------
	// custom objects owned by this
	var parentObj;
	var _keyboardInputController;
	var arrayOfSquares = [];
	var genoArray = [];	
	var _phenoBoxDivArray = [];
	var _replayController;
	var _apiController;
	
	
	//------------------------------
	// primitives
	var _clickedButtonName = null;
	var _cycleDisplayIsOn = true;
	
	
	//------------------------------
	// set class variables here
	// use prototype instead?
	// am i making a global by accident?
	// reset these into a model
	GenoPhenoGrid.currNumber = 1;
	GenoPhenoGrid.totalClicked = 0;
	ParentRatio.totalClicked = 0;
	ParentRatio.currLetterCombo = "BB";
	PSquare.currLetterCombo = "B";
    PSquare.totalClicked = 0;

	var _this;

    //=========================================================================
	// public function
	// attach event listeners, make all objects
	// set up the first level
	function init()
	{
		   cachejQueryObjectsAtStart();
		  
	   	   // has to be here...
		   _keyboardInputController = new KeyboardInputController();
		   _keyboardInputController.init(this);
		
		   _this = this;
		    	  
		   makeObjectsAtStart();
		
		   attachEventHandlersAtStart();
		
		   $("#round_indicator_glows").css("visibility","hidden");
		
		   _apiController.setCompletedActionsAtStart([])

		   // if isInfoPopupNeededAtStart is true, set game to level 1, show info popup
		  if( _apiController.isInfoPopupNeededAtStart()=== true)
		  {
			// no help screen ever shown, so show pop-up, then start at 1;
			// set the api controller to record 1
			_apiController.recordAction(1);
			showInfoHelp();			
		  }
		  else if(_apiController.isReplayPopupNeededAtStart()=== true)
		  {
			// 
			var tArray = _apiController.getActionList();
			_replayController.showPlayAgainFromStartScreen(tArray);
			return;
		  }
		  else
		  {
			// start screen was shown, but no levels completed, so drop through
	      }
	
	      startFromFirstLevel();
	}
	
	
	
	//=========================================================================
	// abc defghi jklmn op qrstuv wxyz abc defghi 
	// jklmn op qrstuv wxyz abc defghi 
	function startFromSecondLevel()
	{
		for(var i = 0; i < 9; i++)
		{
			arrayOfSquares[i].removeHandlersOnOutsideTextAreas();
			arrayOfSquares[i].turnOffAllOutsideCursors();
		}
		 injectFirstLevelForTesting();
		 _gameModes.currentMode = _gameModes.INSIDE_ACTIVE;	
		$("#check_answers_button").css("visibility","hidden");
		
		setLevelIndicator(2);
		changeTextDisplay();
		
		console.log("HERERERERE");
		//PSquare.totalClicked = 0;
			
		 doAfterMovingTextDisplay();	
	}
	
	function startFromThirdLevel()
	{
		for(var i = 0; i < 9; i++)
		{
			arrayOfSquares[i].removeHandlersOnOutsideTextAreas();
			arrayOfSquares[i].turnOffAllInsideCursors();
			arrayOfSquares[i].turnOffAllOutsideCursors();
		}
		 injectFirstLevelForTesting();
		 injectSecondLevelForTesting();
		 $(".pheno_box").css("left","126px");
		 $(".pheno_box").css("visibility","visible");
		 
		$("#check_answers_button").css("visibility","hidden");
		
		 _gameModes.currentMode = _gameModes.GENO_PHENO ;
		
		setLevelIndicator(3);
		changeTextDisplay();
				
		 doAfterMovingTextDisplay();			
	}
	
	
	
	function startFromFourthLevel()
	{
		for(var i = 0; i < 9; i++)
		{
			arrayOfSquares[i].removeHandlersOnOutsideTextAreas();
			arrayOfSquares[i].turnOffAllInsideCursors();
			arrayOfSquares[i].turnOffAllOutsideCursors();
		}
		 injectFirstLevelForTesting();
		 injectSecondLevelForTesting();
		 injectThirdLevelForTesting();
		
		for(var i = 0; i < 9; i++)
		{
			genoArray[i].removeHandlersAndTurnGray();
		}
		
		 $(".pheno_box").css("left","126px");
		 $(".pheno_box").css("visibility","visible");
		 
		$("#check_answers_button").css("visibility","hidden");
		
		$("#fly_tray").css("visibility","hidden");
		$("#fly_screen").css("visibility","hidden");
		
		
		 _gameModes.currentMode = _gameModes.PARENT_OFFSPRING ;	
		setLevelIndicator(4);
		changeTextDisplay();
		
		doAfterMovingTextDisplay();
	}
	
	
	
	function startFromFirstLevel()
	{
		   _gameModes.currentMode = _gameModes.OUTSIDE_ACTIVE;
				
		// set cycle button to on
		   setCycleDisplayToOn();
		
		   showCycleButton();
			// set up for first round....
		   	//_$displayText.html("Fill in the alleles for all possible parent sets using the letters given.")
		
			setLevelIndicator(1);
			changeTextDisplay();
				

			$("#a_letter_button").css("visibility","visible");
		    $("#A_letter_button").css("visibility","visible");	
		
		   _$letterButtonHilite.css("visibility","hidden");
		
		    $("#round_indicator_glows").css("visibility","hidden");
		
	}
	
	
    //=========================================================================
	// public function
	// make all objects needed
	function makeObjectsAtStart()
	{
		   // create an array of punnett square objects - levels 1 + 2
		   for(var i = 0; i < 9; i++)
		   {
			arrayOfSquares.push(new PSquare());
			var tSquareName = "psquare_" + (i + 1);
		    arrayOfSquares[i].init(tSquareName, _gameModes.OUTSIDE_ACTIVE);
		   }
		
		   // create geno/pheno objects... - level 3
		   for(var i = 0; i < 9; i++)
		   {
		    genoArray.push(new GenoPhenoGrid());
			genoArray[i].init("pheno_box_"+ (i + 1), arrayOfSquares[i]);
		   }

           // object for last level - level 4
		   parentObj = new ParentRatio();
		
		   _replayController = new ReplayController();
		   _replayController.init(_this);
		
		    _apiController = new ApiController();
		
		
		   _phenoBoxDivArray = [$("#pheno_box_1"),$("#pheno_box_2"),$("#pheno_box_3"),$("#pheno_box_4"),$("#pheno_box_5"),$("#pheno_box_6"),$("#pheno_box_7"),$("#pheno_box_8"),$("#pheno_box_9")];
	}
	
	
	
	
	//=========================================================================
	// internal private function
	// attaches handlers at initalization
	function attachEventHandlersAtStart()
	{
		$("#a_letter_button").on("mousedown",clickedLetterButton);
        $("#A_letter_button").on("mousedown",clickedLetterButton);
        
        $("#AA_letter_button").on("mousedown",clickedLetterButton);
	    $("#Aa_letter_button").on("mousedown",clickedLetterButton);
        $("#aa_letter_button").on("mousedown",clickedLetterButton);

        $("#check_answers_button").on("mousedown", checkAnswers);
 		$("#reset_round_button").on("mousedown", resetRound);

        $("#button_0").on("mousedown",clickedNumberButton);
		$("#button_1").on("mousedown",clickedNumberButton);
		$("#button_2").on("mousedown",clickedNumberButton);
		$("#button_3").on("mousedown",clickedNumberButton);
		$("#button_4").on("mousedown",clickedNumberButton);

        _$cycleDisplayIcon.on("mousedown", clickedCycleButton)

       _$showFlysButton.on("mousedown", showFlyOverlays);

       $("#replay_game_again_button").on("mousedown", showPlayAgainScreen);

       $("#bottom_orange_help_button").on("mousedown", showContentHelp);
       $("#bottom_blue_help_button").on("mousedown", showInfoHelp);
       $("#top_orange_help_button").on("mousedown", hideContentHelp);
       $("#top_blue_help_button").on("mousedown", hideInfoHelp);

       //$("#threshold_screen_close_button").on("mousedown", closeThresholdPopUpandResumePlay);
       $("#threshold_screen_close_button").on("mousedown",closeThresholdPopUpandResumePlay);

       	 // attach listener to background that will catch event sent from
		 // other objects that will show the outside check answer button
	   $(document).on("showOutsideCheckAnswerButton", showOutsideCheckAnswerButton);
	   $(document).on("showResetRoundButton", showResetRoundButton);		
	}
	
	//function replayWrapper()
	//{

		//checkAnswers();
	//}
	
	
	function showThresholdPopUp()
	{
		$("#help_panels_layer").css("visibility","visible");
		$("#lightbox").css("visibility","visible");
		$("#threshold_screen").css("visibility","visible");
	}
	
	
	function closeThresholdPopUpandResumePlay(event)
	{
		$("#threshold_screen").css("visibility","hidden");
		$("#help_panels_layer").css("visibility","hidden");	
		$("#lightbox").css("visibility","hidden");
		// go back to handler we originally diverted from
		 checkAnswers();
	}
	
	function testFunc()
	{
		alert("test function");
	}
	
	function showContentHelp()
	{
		soundPlayer.playASound(18);
		$("#help_panels_layer").css("visibility","visible");
		$("#lightbox").css("visibility","visible");
		$("#content_help_screen").css("visibility","visible");
		
	}
	
	function showInfoHelp()
	{
		//sfx_98.mp3
		soundPlayer.playASound(18);
		$("#help_panels_layer").css("visibility","visible");
		$("#lightbox").css("visibility","visible");
		$("#interface_help_screen").css("visibility","visible");
		
	}
	
	function hideContentHelp()
	{
		soundPlayer.playASound(2);
		$("#help_panels_layer").css("visibility","hidden");
		$("#lightbox").css("visibility","hidden");
		$("#content_help_screen").css("visibility","hidden");
		
	}
	
	function hideInfoHelp()
	{
		soundPlayer.playASound(2);
		$("#help_panels_layer").css("visibility","hidden");
		$("#lightbox").css("visibility","hidden");
		$("#interface_help_screen").css("visibility","hidden");
	}
	
	
	function showPlayAgainScreen()
	{
	  _replayController.showReplayFromEndScreen();
	 $("#replay_game_again_button").css("visibility","hidden");
		
	}
	
	
	//=========================================================================
	// internal private function
	// caches jQuery objects
	function cachejQueryObjectsAtStart()
	{
		_$displayText = $("#displayText");
		_$cycleDisplayIcon = $("#cycle_display");
		_$letterButtonHilite = $("#letter_button_hilight");
		_$showFlysButton = $("#show_flys_button");
		_$numberCircleHilite = $("#circle_hilite");
	}
	
	
	
	
	//=========================================================================
	// internal private function
	// handles keyboard inputs from keyboardInputController which sends it up or down
	// as parameter when certain keys are pressed. if _clickedButtonName is null, it means
	// we are in cycle mode- otherwise we find the next appropriate button up or down
	// from the currently highlighted button in this mode - we get an array,
	// figure where we are, then take next one up or down.
	function keyboardPressed(p_direction)
	{
		if(_clickedButtonName === null){
			return;
			};
		
		soundPlayer.playASound(14);
		
		var tArray = [];
		
		if (_gameModes.currentMode === _gameModes.OUTSIDE_ACTIVE)
		{
		  tArray = ["a_letter_button", "A_letter_button"];	
		} 
		else if (_gameModes.currentMode === _gameModes.INSIDE_ACTIVE)
		{
		  tArray = ["AA_letter_button", "Aa_letter_button", "aa_letter_button"];		
		}
		else if (_gameModes.currentMode === _gameModes.GENO_PHENO )
		{
		  tArray = ["button_0","button_1","button_2","button_3","button_4"];	
		}
		else if (_gameModes.currentMode === _gameModes.PARENT_OFFSPRING)
		{
		  tArray = ["AA_letter_button", "Aa_letter_button", "aa_letter_button"];
		}
		
		var tLen = tArray.length;
		var tIndex = $.inArray(_clickedButtonName, tArray);
		var tButtonNameToPass = "";
		
		// get next element in the array - wrap to other end
		// if we are at start or end of array
		if(p_direction === "up")
		{
			if (tIndex === 0)
			{
			  tIndex = 	tLen - 1;
			}else
			{
				tIndex--;
			}	
		}
		else
		{
			tLen--;
			
				if (tIndex === tLen)
				{
				  tIndex = 	0;
				}else
				{
					tIndex++;
				}	
		}
		
		tButtonNameToPass = tArray[tIndex];	
		
		if(_gameModes.currentMode === _gameModes.GENO_PHENO)
		{
			// use numbers
			clickedNumberButton2(tButtonNameToPass);
		}
		else
		{
			// use letters
			clickedLetterButton2(tButtonNameToPass);
		}		
	}
	
	
	

	//=========================================================================
	// private internal function
	// shows the reset round button
	// which only appears if some items have been clicked
	// otherwise there is no reason for it to be showing
	function showResetRoundButton()
	{
		$("#reset_round_button").css("visibility","visible");
	}
	
	function hideResetRoundButton()
	{
		$("#reset_round_button").css("visibility","hidden");	
	}
	
	
	
	
	//=========================================================================
	// private internal function
	// turns the cycle butoon "on' ie with a highlight, 
	// or "off" - without one.
	function setCycleDisplayToOn()
	{
		 _$cycleDisplayIcon.css("backgroundPosition", "0px 0px");
		 _cycleDisplayIsOn = true;
	}
	
	function setCycleDisplayToOff()
	{
		_$cycleDisplayIcon.css("backgroundPosition", "-32px 0px");
		 _cycleDisplayIsOn = false;
	}
	
	
	
	
	//=========================================================================
	// internal private functions
	// makes the cycle icon/button in the tool area visible and invisible
	function showCycleButton()
	{
	 _$cycleDisplayIcon.css("visibility","visible");	
	}
	
	function hideCycleButton()
	{
	  _$cycleDisplayIcon.css("visibility","hidden");	
	}
	
	
		
	//=========================================================================
	function getCycleStatus()
	{
		return _cycleDisplayIsOn;
	}
	
	
	
	
	//=========================================================================
	//
	showFlyOverlays.flysVisible = false;
	function showFlyOverlays(event)
	{
		
		if(showFlyOverlays.flysVisible == true)
		{
			soundPlayer.playASound(5);
			hideFlys();
			showFlyOverlays.flysVisible = false;
			return;
		}
		
		soundPlayer.playASound(22);
		
		showFlyOverlays.flysVisible = true;
		
		if(_gameModes.currentMode === _gameModes.OUTSIDE_ACTIVE){return}
		
		//$(document).on("mouseup", hideFlys);
		_$showFlysButton.css("backgroundPosition", "-47px 0px");
		
		if(_gameModes.currentMode === _gameModes.INSIDE_ACTIVE)
		{
			for(var i = 0; i < 9; i++)
			{
				//get reference to the object
				var tObj   = arrayOfSquares[i];
				tObj.showOutsideFlys();
			}
			
		}else
		{
				for(var i = 0; i < 9; i++)
				{
					//get reference to the object
					var tObj   = arrayOfSquares[i];
					tObj.showOutsideFlys();
					tObj.showInsideFlys();
				}
			
		}
		
		_$showFlysButton.animate({"top":"-=5px"}, 30, function(){
				_$showFlysButton.animate({"top":"+=10px"}, 30, function(){
						_$showFlysButton.animate({"top":"-=5px"}, 30, function(){
							// nothing
						});
				});
		});

		return false;
	}
	
	
	
	
	//=========================================================================
	//
	function hideFlys(event)
	{
		//$(document).off("mouseup", hideFlys);
		
		if(showFlyOverlays.flysVisible === false)
		{
			return;
		}
		
		showFlyOverlays.flysVisible = false;
		
		_$showFlysButton.css("backgroundPosition", "0px 0px");
		
		for(var i = 0; i < 9; i++)
		{
			//get reference to the object
			var tObj   = arrayOfSquares[i];
			tObj.hideAllFlys();
		}
		
		_$showFlysButton.animate({"left":"-=5px"}, 30, function(){
				_$showFlysButton.animate({"left":"+=10px"}, 30, function(){
					_$showFlysButton.animate({"left":"-=5px"}, 30, function(){
							// nothing
						});
				});
		});
		
	}
	
	
	

	//=========================================================================
	// private internal function
	// gets the name of the top button in the button tray
	// for the current mode. Used when we need to hilight the top
	// button in a tray after clicking off from the 
	// cycle button - ie we need to have a letter / button name
	// to then hilight and make active
	function getTopButtonNameForThisMode()
	{
		switch(_gameModes.currentMode)
		{
			case _gameModes.OUTSIDE_ACTIVE:
			return "A_letter_button";
	  		break;
	
			case _gameModes.INSIDE_ACTIVE:
			return "AA_letter_button";
			break;
			
			case _gameModes.GENO_PHENO:
			return "button_0";
			break;

			case _gameModes.PARENT_OFFSPRING:
			return "AA_letter_button";
			break;

	        default:
		}	
	}

	
	

	//=========================================================================
	//
	function clickedCycleButton()
	{
	
		if( _cycleDisplayIsOn === true)
		{
			// cycle display is on, so turn it off and turn upper buttons on
			// no need to set mode- button will do that
			if(_gameModes.currentMode === _gameModes.GENO_PHENO)
			{
				setCycleDisplayToOff();
				clickedNumberButton2(getTopButtonNameForThisMode());
			}
			else
			{
				setCycleDisplayToOff();
			    clickedLetterButton2(getTopButtonNameForThisMode());
			}	
		}
		else
		{
			// cycle display is off, so turn it on and turn upper buttons on
		   	if(_gameModes.currentMode === _gameModes.GENO_PHENO)
			{
				    //_clickedButtonName
					setCycleDisplayToOn();
					clickedNumberButton2(_clickedButtonName)
			}
			else
			{
					setCycleDisplayToOn();
					clickedLetterButton2(_clickedButtonName);
			}	
		}	
	}
	
	
	
	
	//=========================================================================
	//
	function changeToCycleModeWhenAnswerIsIncorrect()
	{
		if(_cycleDisplayIsOn === true)
		{
			return;
		}
		
		if(_gameModes.currentMode === _gameModes.GENO_PHENO)
		{
			    //_clickedButtonName
				setCycleDisplayToOn();
				clickedNumberButton2(_clickedButtonName)
		}
		else
		{
				setCycleDisplayToOn();
				clickedLetterButton2(_clickedButtonName);
		}	
	}
	
	
	
	
	//=========================================================================
	function clickedNumberButton(event)
	{
		var tClickedButtonName = event.target.id;
		//console.log("got an actual click");
		clickedNumberButton2(tClickedButtonName);
	}
	
    //=========================================================================
	function clickedNumberButton2(p_clickedButtonName)
	{
		//console.log("got a click");
		
		var tClickedName = p_clickedButtonName;
		
		if(_clickedButtonName === tClickedName)
	    {
		    //alert("switch")
		    setCycleDisplayToOn();
		    
		    soundPlayer.playASound(16);
		
		   	$.event.trigger({
				type: "setModeToClickThrough"
			});
		   _$numberCircleHilite.css("visibility","hidden");
		   _clickedButtonName = null;
		   //reclicked a button... switch modes
		   return;
		
	    }
	   
	     	$.event.trigger({
				type: "setModeToButtonLetters"
			});
			
			setCycleDisplayToOff();
		
		_clickedButtonName = tClickedName;
		
		soundPlayer.playASound(14);
		
		var tLeft = parseInt( $("#" + tClickedName).css("left"), 10);
		var tTop = parseInt($("#" + tClickedName).css("top"), 10);
		tLeft -= 4;
		tTop -= 4;
		
		_$numberCircleHilite.css({top:tTop+"px",left:tLeft+"px"});
		_$numberCircleHilite.css("visibility","visible");
		
		switch(tClickedName)
		{
			case "button_0":
	  	    GenoPhenoGrid.currNumber = 0;
	  		break;
	
			case "button_1":
  			GenoPhenoGrid.currNumber = 1;
	  		break;
	        
	        case "button_2":
			GenoPhenoGrid.currNumber = 2;
		  	break;
		
		    case "button_3":
			GenoPhenoGrid.currNumber = 3;
			break;
			
			case "button_4":
			GenoPhenoGrid.currNumber = 4;
			break;
	
			default:
		}		
	}
	
	
	
	
	//=========================================================================
	function resetRound()
	{
		var functionToRun;
		
		//$(".outside_topleft, .outside_topright").css("visibility","hidden");
		
		// reset the counters
		PSquare.totalClicked = 0;
		GenoPhenoGrid.totalClicked = 0;
		ParentRatio.totalClicked = 0;
		
		soundPlayer.playASound(21);
		
		$("#check_answers_button").css("visibility","hidden");
		
		hideResetRoundButton();
		
		hideFlys();
		
		
		if (_gameModes.currentMode === _gameModes.INSIDE_ACTIVE)
		{
			functionToRun = "setAllInsideTextToBlank";
			for(var i = 0; i < 9; i++)
			{
					//get reference to the object
				var tObj = arrayOfSquares[i];
				//tObj[functionToRun]();
				tObj.resetInsideTextFromResetButton();	
				tObj.turnIncorrectHiliteOffWithErrorMessage();
			}
		}
		else if(_gameModes.currentMode === _gameModes.OUTSIDE_ACTIVE)
		{
			
			functionToRun = "setAllOutsideTextToBlank";
			for(var i = 0; i < 9; i++)
			{
					//get reference to the object
				var tObj = arrayOfSquares[i];
				//tObj[functionToRun]();
				tObj.resetOutsideTextFromResetButton();	
				tObj.turnIncorrectHiliteOffWithErrorMessage();
			}
				
		} else if(_gameModes.currentMode === _gameModes.GENO_PHENO)
		{
			// pheno/geno
			
			for(var i = 0; i< 9; i++)
			{
				var tObj = genoArray[i];
				//tObj.setAllTextToBlank();
				tObj.resetTextFromResetButton()
				//tObj.turnTextCirclesGreen();
				tObj.turnIncorrectHilightOff();
			}
			
		} else if(_gameModes.currentMode === _gameModes.PARENT_OFFSPRING)
		{
		  parentObj.resetTextFromResetButton();	
		  ParentRatio.totalClicked = 0;	
		}
	
	}
	
	
	
	
	//=========================================================================
	// uses mode to change text in display
	function changeTextDisplay()
	{
		var tText = "";
		
		switch(_gameModes.currentMode)
		{
		
			case _gameModes.OUTSIDE_ACTIVE:
	  	    _$displayText.html("Fill in the alleles for all possible parent sets using the letters given.")
	  		break;
	
	        case _gameModes.INSIDE_ACTIVE:
	        _$displayText.html("Fill in the genotypes for all of the possible resulting offspring.")
	        break;
	
	        case _gameModes.GENO_PHENO :
	  	    _$displayText.html("Complete the genotype (G) and phenotype (P) ratios for each Punnett square.")
	  		break;
	
	        case _gameModes.PARENT_OFFSPRING:
	        _$displayText.html("Determine which pairs of parent genotypes could produce offspring in the ratio of each of these sets:")
	        break;
		}	
	}
	
	
	
	
	//=========================================================================
	//
	//function checkAnswers(event)
	function checkAnswers()
	{
		//console.log("checking answers....");
		
		if (_gameModes.currentMode === _gameModes.OUTSIDE_ACTIVE)
		{
			var tCurrEntries = [];

			for(var i = 0; i < 9; i++)
			{
				//get reference to the object
				var tObj   = arrayOfSquares[i];

				if(tObj.checkIfOutsideTextValid() === true)
				{
					// valid entry
					var tArray = tObj.getArrayOfOutsideText();
					var tString = tArray.toString();

					if ($.inArray(tString, tCurrEntries) === -1)
					{
						//add to array... valid entry
						tCurrEntries.push(tString);
						tObj.turnIncorrectHiliteOffWithErrorMessage();

					}else
					{
						// incorrect - duplicate
						tObj.turnIncorrectHiliteOnWithErrorMessage("duplicate");
					}

				} else
				{
					// turn its error frame on - letter entry needs switching
					tObj.turnIncorrectHiliteOnWithErrorMessage();
				}
			}

			// check total here..... equals 9 if all correct
			if(tCurrEntries.length === 9)
			{
				hideOutsideCheckAnswerButton();
		
				hideFlys();

				//soundManager.play("sfx_positive");
				 soundPlayer.playASound(20);

				PSquare.totalClicked = 0;
				hideResetRoundButton();

				//turn on inside areas and remove handlers
				for(var i = 0; i < 9; i++)
				{
					arrayOfSquares[i].removeHandlersOnOutsideTextAreas();
					arrayOfSquares[i].resetAllOutsideTextBoxesToGray();
				}

                PSquare.currLetterCombo = "BB";
                turnOffFirstLevelLetterButtons();
                turnSquareHiliteOff();
				// change game mode
				_gameModes.currentMode = _gameModes.INSIDE_ACTIVE;
				
				hideFlyButton()
				hideCycleButton();
				makeLevelIndicatorGlow();
				
				// animate text changing
				animateAndChangeTextDisplay();			
				return;

			} else
			{
                // incorrect answer - set to cycle mode
                soundPlayer.playASound(19);
				changeToCycleModeWhenAnswerIsIncorrect();
			}
		}
		else if (_gameModes.currentMode === _gameModes.INSIDE_ACTIVE)
		{
			// check for and count correct here....
			var tCorrect = 0;

			for(var i = 0; i < 9; i++)
			{
				if (arrayOfSquares[i].checkIfInsideTextIsValid() === true)
				{
					if(arrayOfSquares[i].checkIfInsideTextIsCorrect() === true)
					{
					   //add to correct	
					   tCorrect++;
					   arrayOfSquares[i].turnIncorrectHiliteOff();
					}
					else
					{
						// not correct
						arrayOfSquares[i].turnIncorrectHiliteOn();
					}
				}
				else
				{
					// put a hilite on it -- not valid
					arrayOfSquares[i].turnIncorrectHiliteOn();
				}
			}

			if(tCorrect === 9)
			{ 
				// all 9 are correct
				hideFlys();
				hideOutsideCheckAnswerButton();
				hideResetRoundButton();

				//soundManager.play("sfx_positive");
				soundPlayer.playASound(20);

				for(var i = 0; i < 9; i++)
				{
					arrayOfSquares[i].removeHandlersToInsideTextAreas();
					arrayOfSquares[i].setInsideTextBoxesToDarkGreen();			
				}

				turnSquareHiliteOff();
				hideSecondLevelLetterButtons();
				
				// get pheno boxes ready
				for(var i = 0; i < 9; i++)
				{
					  genoArray[i].turnTextCirclesDarkGray();
					  _phenoBoxDivArray[i].css("visibility","visible");
				}
				
				// move pheno boxes over
				$(".pheno_box").animate({"left":"+=100px"},200);
				
				// switch mode
				_gameModes.currentMode = _gameModes.GENO_PHENO;
				
				hideFlyButton()
				hideCycleButton();
				makeLevelIndicatorGlow();
				
				// animate text changing
				animateAndChangeTextDisplay();		
				return;
			} 
			else
			{
				soundPlayer.playASound(19);
				// incorrect, so change to cycle mode
				changeToCycleModeWhenAnswerIsIncorrect();	
			}
		}
		else if(_gameModes.currentMode === _gameModes.GENO_PHENO)
		{
            // set mode to all correct - change if incorrect
			var tAllCorrect = true;
			
			for(var i = 0; i < 9; i++)
			{
				if(genoArray[i].checkAnswer() === false)
				{
					tAllCorrect = false;
					genoArray[i].turnIncorrectHilightOn();
					
				}else
				{
					genoArray[i].turnIncorrectHilightOff();
				}	
			}
			
			if (tAllCorrect === false)
			{
				soundPlayer.playASound(19);
				// incorrect - put cycle mode on
				changeToCycleModeWhenAnswerIsIncorrect();
				
			}else
			{
				// show progress box here
				//alert("Predicting the Parents\n\nNow that you’ve completed the Punnett squares\nand ratios, can you use them to identify\nwhich pairings of parent genotypes \nproduce offspring of a given phenotype ratio?\n\nLook at the sets four sets of fly offspring\nand determine all the possible parent\ngenotypes for each.\n\nRecord your observations and results in the Notebook and then see if you can answer\nall of the questions in the Journal.");
				if( _apiController.showThresholdPopUp() === true)
				{
					soundPlayer.playASound(17);
					//divert- show pop-up and then come back
					_apiController.recordAction(2);
					showThresholdPopUp();
					return;	
				}
				
				//_apiController.recordAction(2);
				
				// play this again?
				soundPlayer.playASound(20);
				
				GenoPhenoGrid.totalClicked = 0;
				
				hideFlys();
				hideOutsideCheckAnswerButton();
				hideResetRoundButton();
				// all correct...proceed to new round
				for(var i = 0; i < 9; i++)
				{
					genoArray[i].turnTextCirclesLightGray();
					genoArray[i].removeHandlersToTextAreas();
				}
				
				hideThirdLevelNumberButtons();
				
				
				_gameModes.currentMode = _gameModes.PARENT_OFFSPRING;

				hideFlyButton()
				hideCycleButton();
				makeLevelIndicatorGlow();
					
				animateAndChangeTextDisplay();
				
				return;
			}
			
			
		}	else if(_gameModes.currentMode === _gameModes.PARENT_OFFSPRING)
			{
				//alert("offspring");
				
				var tresult = parentObj.checkAnswer();
				//alert("result is" + tresult);
				
				if(tresult === false)
				{
					//alert("not correct")
					// play neg sfx here....
					    soundPlayer.playASound(19);
						changeToCycleModeWhenAnswerIsIncorrect();
						//console.log("changed to cycle mode");
					
				}
				else
				{
					parentObj.removeHandlersToTextAreas();
					parentObj.turnTextAreasGray();
					soundPlayer.playASound(20);
					hideOutsideCheckAnswerButton();
					hideResetRoundButton();
				    turnSquareHiliteOff();
					hideFlys();
					hideFlyButton()
					hideCycleButton();
							
					// uses second level buttons, so just reuse this function
					hideSecondLevelLetterButtons();
					
					//alert("correct - game over");
					$("#replay_game_again_button").css("visibility","visible");
					_$displayText.html("Completed! Be sure to record your results. Click replay to return to any section.")
					
				}	
			}
	}
	
	
	
	
	
	//=========================================================================
	// internal private function
	// make the round indicator glow before moving it over
	// and before moving the text
    function makeLevelIndicatorGlow()
    {
	  $("#round_indicator_glows").css("visibility","visible");
    }
	
	
	
    //=========================================================================
	// internal private function 
	// basically a wrapper that calls
	// an existing function based on current mode
	// used in the text view transition
	function changeLevelIndicator()
	{
		if(_gameModes.currentMode === _gameModes.OUTSIDE_ACTIVE)
		{
			setLevelIndicator(1);
		}
		else if(_gameModes.currentMode === _gameModes.INSIDE_ACTIVE)
		{
		  	setLevelIndicator(2);	
		}
		else if(_gameModes.currentMode === _gameModes.GENO_PHENO)
		{
			setLevelIndicator(3);
		}
		else if(_gameModes.currentMode === _gameModes.PARENT_OFFSPRING)
		{
			setLevelIndicator(4);
		}
	}
	
	
	
	
    //=========================================================================
	// internal private function
	// moves the text display off screen after correct round, changing the text
	// during transit and also changing the indicator round display in middle of animation
	function animateAndChangeTextDisplay()
	{
		_$displayText.animate({"left":"+=1000px","opacity":"0"},1000, function(){
				_$displayText.animate({"left":"-=2000px"}, 1, function(){
							changeTextDisplay();
							changeLevelIndicator();
							_$displayText.animate({"left":"+=1000px","opacity":"1.0"}, 1000, function(){
							doAfterMovingTextDisplay();
						});
				});
		});	
	}
	
	
    //=========================================================================
	// internal private function
	// called after text display is done moving - 
	// reveals all the buttons for the next round and unlocks the screen
	// currMode was changed before animation began, so use current new mode in currMode...
	// that is why outside_active or 
	// sets the main interactive mode to cycle - so buttons cycle
	function doAfterMovingTextDisplay()
	{
		$("#round_indicator_glows").css("visibility","hidden");
		soundPlayer.playASound(23);
		//console.log("here - at end")
		//sfx_333.mp3
		// for replaying or starting in this mode....
		if(_gameModes.currentMode === _gameModes.OUTSIDE_ACTIVE)
		{
			$("#a_letter_button").css("visibility","visible");
		    $("#A_letter_button").css("visibility","visible");
		
			for(var i = 0; i < 9; i++)
			{
				arrayOfSquares[i].assignHandlersToOutsideTextAreas();
				arrayOfSquares[i].setAllOutsideTextBoxesToGreen();
			}
			
			_clickedButtonName = null;
			$.event.trigger({
							type: "setModeToClickThrough"
			});
			//showFlyButton();
			showCycleButton();
			setCycleDisplayToOn();
			
			return;
		}
		
		
		
		
			
		if(_gameModes.currentMode === _gameModes.INSIDE_ACTIVE)
		{
			for(var i = 0; i < 9; i++)
			{
				arrayOfSquares[i].assignHandlersToInsideTextAreas();
				arrayOfSquares[i].setAllInsideTextBoxesToGreen();
			}
			showSecondLevelLetterButtons();
            setHiliteToTopLetterButton();
			_clickedButtonName = null;
			$.event.trigger({
							type: "setModeToClickThrough"
			});
			showFlyButton();
			showCycleButton();
			setCycleDisplayToOn();
		} 
		else if (_gameModes.currentMode === _gameModes.GENO_PHENO)
		{
			
			for(var i = 0; i < 9; i++)
			{
				genoArray[i].getGenoPhenoFromParent();
				genoArray[i].turnTextCirclesGreen();			  
			}
			
			showThirdLevelNumberButons();
			_clickedButtonName = null;
			$.event.trigger({
							type: "setModeToClickThrough"
			});
			showFlyButton();
			showCycleButton();
			setCycleDisplayToOn();
		}
		else if (_gameModes.currentMode === _gameModes.PARENT_OFFSPRING)
		{
			showSecondLevelLetterButtons();
			_clickedButtonName = null;
			showFlyButton();
			parentObj.init();
			$.event.trigger({
						type: "setModeToClickThrough"
			});
				
			$("#fly_tray").css("visibility","visible");
			$("#fly_screen").css("visibility","visible");
			showCycleButton();
			setCycleDisplayToOn();
		}	
	}
	
	
	
	
	
    //=========================================================================
	// internal private functions
	// makes the fly icon/button visible and invisible
	function showFlyButton()
	{
		$("#show_flys_button").css("visibility","visible");
	}
	
	function hideFlyButton()
	{
		$("#show_flys_button").css("visibility","hidden");
	}
	
	
	
    //=========================================================================
	// sets the hilite to the top position 
	// - NOT NEEDED?
	function setHiliteToTopLetterButton()
	{
		_$letterButtonHilite.css({"top":"108px","left":"31px"})
	}
	
	function turnSquareHiliteOff()
	{
		_$letterButtonHilite.css("visibility","hidden");
	}




    //=========================================================================
	// private internal fuction
	// turns on/off "A" ans "aa" buttons in the button tray
	// for first level - ie currMode = OUTSIDE_ACTIVE
    function turnOffFirstLevelLetterButtons()
    {
	   $("#a_letter_button").css("visibility","hidden");
	   $("#A_letter_button").css("visibility","hidden");
    }

    function turnOnFirstLevelLetterButtons()
    {
	   $("#a_letter_button").css("visibility","visible");
	   $("#A_letter_button").css("visibility","visible");
    }

    


    //=========================================================================
	// private internal fuction
	// turns on/off "AA" "Aa" "aa" buttons in the button tray
	// for second level - ie currMode = INSIDE_ACTIVE
    function hideSecondLevelLetterButtons()
    {
	  	$("#AA_letter_button").css("visibility","hidden");
		$("#Aa_letter_button").css("visibility","hidden");
	    $("#aa_letter_button").css("visibility","hidden");
    }

    function showSecondLevelLetterButtons()
    {
      	$("#AA_letter_button").css("visibility","visible");
	    $("#Aa_letter_button").css("visibility","visible");
		$("#aa_letter_button").css("visibility","visible");
    }




    //=========================================================================
    //
    function showThirdLevelNumberButons()
	{
		$("#button_0").css("visibility","visible");
		$("#button_1").css("visibility","visible");
		$("#button_2").css("visibility","visible");
		$("#button_3").css("visibility","visible");
		$("#button_4").css("visibility","visible");
		_$numberCircleHilite.css({top:"106px","visibility":"hidden" });
		
	}
	
	function hideThirdLevelNumberButtons()
	{
		$("#button_0").css("visibility","hidden");
		$("#button_1").css("visibility","hidden");
		$("#button_2").css("visibility","hidden");
		$("#button_3").css("visibility","hidden");
		$("#button_4").css("visibility","hidden");
		_$numberCircleHilite.css("visibility","hidden");
	}



    //=========================================================================
	// public function
	// injects answers into first level: OUTSIDE_ACTIVE
	// outside textfields of the punnett squares
	function injectFirstLevelForTesting()
	{
		arrayOfSquares[0].injectFirstLevel(["B","B","B","B"]); //arrayOfSquares[0].injectFirstLevel(["A","A","A","A"]);
		arrayOfSquares[1].injectFirstLevel(["B","B","B","b"]); //arrayOfSquares[1].injectFirstLevel(["A","A","A","a"]);
		arrayOfSquares[2].injectFirstLevel(["B","B","b","b"]); //arrayOfSquares[2].injectFirstLevel(["A","A","a","a"]);

		arrayOfSquares[3].injectFirstLevel(["B","b","B","B"]); //arrayOfSquares[3].injectFirstLevel(["A","a","A","A"]);
		arrayOfSquares[4].injectFirstLevel(["B","b","B","b"]); //arrayOfSquares[4].injectFirstLevel(["A","a","A","a"]);
		arrayOfSquares[5].injectFirstLevel(["B","b","b","b"]); //arrayOfSquares[5].injectFirstLevel(["A","a","a","a"]);

		arrayOfSquares[6].injectFirstLevel(["b","b","B","B"]); //arrayOfSquares[6].injectFirstLevel(["a","a","A","A"]);
		arrayOfSquares[7].injectFirstLevel(["b","b","B","b"]); //arrayOfSquares[7].injectFirstLevel(["a","a","A","a"]);
		arrayOfSquares[8].injectFirstLevel(["b","b","b","b"]); //arrayOfSquares[8].injectFirstLevel(["a","a","a","a"]);

		$("#check_answers_button").css("visibility","visible");

	}
	

    //************************************************************************
	//   REPLAY STUFF STARTS HERE
    //************************************************************************
	function replayFromFirstLevel()
	{
		$("#fly_tray").css("visibility","hidden");
		$("#fly_screen").css("visibility","hidden");
		
		parentObj.resetForLaterReplay();
		
		PSquare.totalClicked = 0;
		GenoPhenoGrid.totalClicked = 0;
		ParentRatio.totalClicked = 0;
		
		//set to invisible....
		
		for(var i = 0; i < 9; i++)
		{
			genoArray[i].resetForLaterReplay();
		}
		
		$(".pheno_box").css("left","26px");
		$(".pheno_box").css("visibility","hidden");
		
		for(var i = 0; i < 9; i++)
		{
			arrayOfSquares[i].resetInsideTextForReplay();
			arrayOfSquares[i].resetOutsideTextForReplay();
		}
		
		//injectFirstLevelForTesting();
		
		// set mode....
		
		//then call next handler....
		_gameModes.currentMode = _gameModes.OUTSIDE_ACTIVE;
		
		setLevelIndicator(1);
		changeTextDisplay();
		
		doAfterMovingTextDisplay();
		
		
	}
	
	
	function replayFromSecondLevel()
	{
		$("#fly_tray").css("visibility","hidden");
		$("#fly_screen").css("visibility","hidden");
		
		// added for bug
		
		
		parentObj.resetForLaterReplay();
		
		PSquare.totalClicked = 0;
		GenoPhenoGrid.totalClicked = 0;
		ParentRatio.totalClicked = 0;
		
		//set to invisible....
		console.log("resetting the second level here xxx");
		
		for(var i = 0; i < 9; i++)
		{
			genoArray[i].resetForLaterReplay();
		}
		
		$(".pheno_box").css("left","26px");
		$(".pheno_box").css("visibility","hidden");
		
		for(var i = 0; i < 9; i++)
		{
			arrayOfSquares[i].resetInsideTextForReplay();
			arrayOfSquares[i].resetOutsideTextForReplay();
		}
		
		injectFirstLevelForTesting();
	
		//then call next handler....
		_gameModes.currentMode = _gameModes.INSIDE_ACTIVE;
		
		setLevelIndicator(2);
		changeTextDisplay();
		
		$("#check_answers_button").css("visibility","hidden");
		
		doAfterMovingTextDisplay();	
	}
	
	
	function replayFromThirdLevel()
	{
		$("#fly_tray").css("visibility","hidden");
		$("#fly_screen").css("visibility","hidden");
		
		parentObj.resetForLaterReplay();
		
		PSquare.totalClicked = 0;
		GenoPhenoGrid.totalClicked = 0;
		ParentRatio.totalClicked = 0;
		
		//set to invisible....
		
		for(var i = 0; i < 9; i++)
		{
			genoArray[i].resetForLaterReplay();
		}
		
		//$(".pheno_box").css("left","26px");
		//$(".pheno_box").css("visibility","hidden");
		
		for(var i = 0; i < 9; i++)
		{
			arrayOfSquares[i].resetInsideTextForReplay();
			arrayOfSquares[i].resetOutsideTextForReplay();
		}
		
		injectFirstLevelForTesting();
		
		injectSecondLevelForTesting();
	
		//then call next handler....
		_gameModes.currentMode = _gameModes.GENO_PHENO;
		
		setLevelIndicator(3);
		changeTextDisplay();
		
		$("#check_answers_button").css("visibility","hidden");
		
		doAfterMovingTextDisplay();
		
		console.log("resetting the third level here");
	}
	
	function replayFromFourthLevel()
	{
		parentObj.resetForLaterReplay();
	   _gameModes.currentMode = _gameModes.PARENT_OFFSPRING;
		parentObj.startReplay();
		showSecondLevelLetterButtons();
		showFlyButton();
		$.event.trigger({
					type: "setModeToClickThrough"
		});
		_clickedButtonName = null;
		//$("#fly_tray").css("visibility","visible");
		//$("#fly_screen").css("visibility","visible");
		console.log("resetting the fourth level here");
		
		PSquare.totalClicked = 0;
		GenoPhenoGrid.totalClicked = 0;
		ParentRatio.totalClicked = 0;
		$("#check_answers_button").css("visibility","hidden");	
		
		setLevelIndicator(4);
		changeTextDisplay();
		
		showCycleButton();
		setCycleDisplayToOn();
	}

    //=========================================================================
    // public function
	// injects answers into second level: INSIDE_ACTIVE
	// inside textfields of the punnett squares
	function injectSecondLevelForTesting()
	{
		arrayOfSquares[0].injectSecondLevel(["BB","BB","BB","BB" ]); //arrayOfSquares[0].injectSecondLevel(["AA","AA","AA","AA" ]);
		arrayOfSquares[1].injectSecondLevel(["BB","BB","Bb","Bb" ]); //arrayOfSquares[1].injectSecondLevel(["AA","AA","Aa","Aa" ]);
		arrayOfSquares[2].injectSecondLevel(["Bb","Bb","Bb","Bb" ]); //arrayOfSquares[2].injectSecondLevel(["Aa","Aa","Aa","Aa" ]);

		arrayOfSquares[3].injectSecondLevel(["BB","Bb","BB","Bb" ]); //arrayOfSquares[3].injectSecondLevel(["AA","Aa","AA","Aa" ]);
		arrayOfSquares[4].injectSecondLevel(["BB","Bb","Bb","bb" ]); //arrayOfSquares[4].injectSecondLevel(["AA","Aa","Aa","aa" ]);
		arrayOfSquares[5].injectSecondLevel(["Bb","bb","Bb","bb" ]); //arrayOfSquares[5].injectSecondLevel(["Aa","aa","Aa","aa" ]);

		arrayOfSquares[6].injectSecondLevel(["Bb","Bb","Bb","Bb" ]); //arrayOfSquares[6].injectSecondLevel(["Aa","Aa","Aa","Aa" ]);
		arrayOfSquares[7].injectSecondLevel(["Bb","Bb","bb","bb" ]); //arrayOfSquares[7].injectSecondLevel(["Aa","Aa","aa","aa" ]);
	    arrayOfSquares[8].injectSecondLevel(["bb","bb","bb","bb" ]); //arrayOfSquares[8].injectSecondLevel(["aa","aa","aa","aa" ]);	
	}
	
	
	//----------------------------------------------------------------------------------------
    // public function
	// injects answers into third level: GENO_PHENO
	// inside textfields of the geno/pheno diagram squares
	function injectThirdLevelForTesting()
	{
		genoArray[0].injectThirdLevel([4,0,0,4,0]);
		genoArray[1].injectThirdLevel([2,2,0,4,0]);		
		genoArray[2].injectThirdLevel([0,4,0,4,0]);
        genoArray[3].injectThirdLevel([2,2,0,4,0]);
		genoArray[4].injectThirdLevel([1,2,1,3,1]);
		genoArray[5].injectThirdLevel([0,2,2,2,2]);
		genoArray[6].injectThirdLevel([0,4,0,4,0]);
		genoArray[7].injectThirdLevel([0,2,2,2,2]);
		genoArray[8].injectThirdLevel([0,0,4,0,4]);
	}
	

    //=========================================================================
    // private internal functions
    // makes check answers button visible / hidden
	function hideOutsideCheckAnswerButton(event)
	{
		$("#check_answers_button").css("visibility","hidden");
	}

	function showOutsideCheckAnswerButton(event)
	{
		$("#check_answers_button").css("visibility","visible");
	}
	
	
	//=========================================================================
	//
	function setLevelIndicator(p_level)
	{
		$("#round_indicator_glows").css("visibility","visible");
		switch(p_level)
		{
			case 1:
			$("#round_indicator").css("backgroundPosition", "0px 0px");
			$("#round_indicator_glows").css("backgroundPosition", "0px 0px");
	  		break;
	
	       	case 2:
	        $("#round_indicator").css("backgroundPosition", "0px -23px");
	        $("#round_indicator_glows").css("backgroundPosition", "0px -23px");
		  	break;
		
			case 3:
			$("#round_indicator").css("backgroundPosition", "0px -46px");
			$("#round_indicator_glows").css("backgroundPosition", "0px -46px");
			break;
			
			case 4:
			$("#round_indicator").css("backgroundPosition", "0px -69px");
			$("#round_indicator_glows").css("backgroundPosition", "0px -69px");
			break;
		
		    default:	
	     }	
	}
	
	function getTestMessage()
	{
		console.log("GOT THE TEST MESSAGE!");
	}
	
	
	//=========================================================================
	function startLevelEntry()
	{
		return "YOU HAVE COME TO A WOODEN BRIDGE.THERE'S A CAVE ON THE OTHER SIDE. A TROLL APPROACHS! CHOOSE: GO BACK:1, BURN BRIDGE:7 CROSS BRIDGE:8 PICK UP SWORD:9 TALK TO TROLL:11 "
	}




	//=========================================================================
	function attachHandlersToLetterButtons()
	{
		alert("here?/// do not use!")
		$("#a_letter_button").on("mousedown",clickedLetterButton);
        $("#A_letter_button").on("mousedown",clickedLetterButton);
        
        $("#AA_letter_button").on("mousedown",clickedLetterButton);
	    $("#Aa_letter_button").on("mousedown",clickedLetterButton);
        $("#aa_letter_button").on("mousedown",clickedLetterButton);
	}
	
	
	
	
	//=========================================================================
	//
	function clickedLetterButton(event)
	{
		var tNameOfButtonClicked = event.target.id;
		clickedLetterButton2(tNameOfButtonClicked);
		//console.log("got an actual click" + tNameOfButtonClicked);
	}
	
	
	function startFrom(p_param)
	{
		//alert("starting from" + p_param);
		//startFromThirdLevel();
		//startFromFourthLevel();
		//startFromFirstLevel()
		//startFromSecondLevel();
		switch(p_param)
		{
			case 1:
			startFromFirstLevel();
	  		break;
	        
	        case 2:
	        startFromSecondLevel();
	  		break;
	
	        case 3:
	        startFromThirdLevel();
	  		break;
	
			case 4:
			startFromFourthLevel();
	  		break;
	    }
	}
	
	function returnTo(p_param)
	{
		//console.log(p_param);
			
		switch(p_param)
		{
			case 1:
		     replayFromFirstLevel();
	  		break;
	        
	        case 2:
	        replayFromSecondLevel();
	  		break;
	
	        case 3:
	        replayFromThirdLevel();
	  		break;
	
			case 4:
			replayFromFourthLevel();
	  		break;
	    }
	}



    //=========================================================================
    // clicked a button that represents a letter
    // in the side button area
	function clickedLetterButton2(p_nameOfButtonClicked) {

		var tNameOfButtonClicked = p_nameOfButtonClicked;
	
	    // user has clicked the same button over again,
	 	// so switch mode to clickThrough on this
	    // button and all other buttons
	    if(_clickedButtonName === tNameOfButtonClicked) {
		
		   	soundPlayer.playASound(16);
		
		    //set the cycle button on
		    setCycleDisplayToOn();
		
		   	$.event.trigger({
				type: "setModeToClickThrough"
			});
			
		   _$letterButtonHilite.css("visibility","hidden");
		   _clickedButtonName = null;
		
		   return;
	    }
	    
	   // user has clicked a new button choice
	   // set mode to button letters
	   soundPlayer.playASound(14);
	
	   $.event.trigger({
			type: "setModeToButtonLetters"
		});
			
		setCycleDisplayToOff();
			
	   // adjust and move the hilite over....
	    _$letterButtonHilite.css("visibility","visible");
	    var tTarget = $("#"+tNameOfButtonClicked);
	    var tTargetTop = parseInt(tTarget.css("top") , 10) - 4;
	    var tTargetLeft = parseInt(tTarget.css("left") , 10) - 3;
	    _$letterButtonHilite.css({"top":tTargetTop,"left":tTargetLeft})
	
	    // capture the name of the clicked button
	    _clickedButtonName = tNameOfButtonClicked;
	 	
	    // set a PSquare class variable according to which
	    // letter was clicked - this will be used by PSquare class object
	    // to fill the clicked square
		switch(tNameOfButtonClicked) {
			
			case "a_letter_button":
	  	    PSquare.currLetterCombo = "b";
	        ParentRatio.currLetterCombo = "b";
	  		break;
	
			case "A_letter_button":
  			PSquare.currLetterCombo = "B";
            ParentRatio.currLetterCombo = "B";
	  		break;
	        
	        case "AA_letter_button":
			PSquare.currLetterCombo = "BB";
			ParentRatio.currLetterCombo = "BB";
		  	break;
		
		    case "Aa_letter_button":
			PSquare.currLetterCombo = "Bb";
			ParentRatio.currLetterCombo = "Bb";
			break;
			
			case "aa_letter_button":
			PSquare.currLetterCombo = "bb";
			ParentRatio.currLetterCombo = "bb";
			break;
	
			default:
		}
	}
	
	
	
	
	return{
		init:init,
		injectFirstLevelForTesting:injectFirstLevelForTesting,
		injectSecondLevelForTesting:injectSecondLevelForTesting,
		injectThirdLevelForTesting:injectThirdLevelForTesting,
		checkAnswers:checkAnswers,
		keyboardPressed:keyboardPressed,
		startLevelEntry:startLevelEntry,
		getCycleStatus:getCycleStatus,
		replayFromFirstLevel:replayFromFirstLevel,
		replayFromSecondLevel:replayFromSecondLevel,
		replayFromThirdLevel:replayFromThirdLevel,
		replayFromFourthLevel:replayFromFourthLevel,
		getTestMessage:getTestMessage,
		startFrom:startFrom,
		returnTo:returnTo,
		showPlayAgainScreen:showPlayAgainScreen
		//replayWrapper:replayWrapper
		
		//checkAnswers:checkAnswers
		
	}
	
	
	
	
}