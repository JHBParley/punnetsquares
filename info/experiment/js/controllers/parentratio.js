


var ParentRatio = function() {
		
	var _$topleft_hilite;
	var _$topleft_1;
	var _$topleft_2;
	var _$topleft_3;
	var _$topleft_4;
	var _$topleft_5;
	var _$topleft_6;
	
	var _$topright_hilite;
	var _$topright_1;
	var _$topright_2;
	
	var _$botleft_hilite;
	var _$botleft_1;
	var _$botleft_2;
	
	var _$botright_hilite;
	var _$botright_1;
	var _$botright_2;
		
    var CLICK_THROUGH_LETTERS = "click_thru_letters";
	var USE_BUTTON_LETTERS = "use_button_letters";
	
	var _captureMode = CLICK_THROUGH_LETTERS;
	
	
	
	//=========================================================================
	function init(p_ParentRatioDivName)
	{
		cacheJQueryVariablesforTextAreasAndHilites();
		
		$(document).on("setModeToClickThrough", setModeToClickThrough);
		$(document).on("setModeToButtonLetters", setModeToButtonLetters);
		
		clearTextFields();
		
		attachHandlersToTextAreas();
	}
	
	
	
	//=========================================================================
	function setModeToClickThrough()
	{
		_captureMode = CLICK_THROUGH_LETTERS;
	}
	
	
	
	//=========================================================================
	function setModeToButtonLetters()
	{
		 _captureMode = USE_BUTTON_LETTERS;	
	}
	
	
	
	//=========================================================================
	function resetAll()
	{
	  clearTextFields();
	  turnIncorrectHilitesOff();	
	}
	
	
	
	//=========================================================================
	function cacheJQueryVariablesforTextAreasAndHilites()
	{
		 _$topleft_hilite = $("#topleft_hilite");
		 _$topleft_1 = $("#topleft_1");
		 _$topleft_2 = $("#topleft_2");
		 _$topleft_3 = $("#topleft_3");
		 _$topleft_4 = $("#topleft_4");
		 _$topleft_5 = $("#topleft_5");
		 _$topleft_6 = $("#topleft_6");

		 _$topright_hilite = $("#topright_hilite");
		 _$topright_1 = $("#topright_1");
		 _$topright_2 = $("#topright_2");;

		 _$botleft_hilite = $("#botleft_hilite");
		 _$botleft_1= $("#botleft_1");
		 _$botleft_2= $("#botleft_2");;

		 _$botright_hilite = $("#botright_hilite");
		 _$botright_1 = $("#botright_1");
		 _$botright_2 = $("#botright_2");

		
	}
	

	
	//=========================================================================
	function clearTextFields()
	{
		 _$topleft_1.html("");
		 _$topleft_2.html("");
		 _$topleft_3.html("");
		 _$topleft_4.html("");
		 _$topleft_5.html("");
		 _$topleft_6.html("");

		 _$topright_1.html("");
		 _$topright_2.html("");


		 _$botleft_1.html("");
		 _$botleft_2.html("");


		 _$botright_1.html("");
		 _$botright_2.html("");
		
	}
	
	
	
	//=========================================================================
	function attachHandlersToTextAreas()
	{
		_$topleft_1.on("mousedown",clickTheTextBox);
        _$topleft_2.on("mousedown",clickTheTextBox);
		_$topleft_3.on("mousedown",clickTheTextBox);
		_$topleft_4.on("mousedown",clickTheTextBox);
        _$topleft_5.on("mousedown",clickTheTextBox);
		_$topleft_6.on("mousedown",clickTheTextBox);
		
		_$topright_1.on("mousedown",clickTheTextBox);
		_$topright_2.on("mousedown",clickTheTextBox);
		
		 _$botleft_1.on("mousedown",clickTheTextBox);
		 _$botleft_2.on("mousedown",clickTheTextBox);
		
		_$botright_1.on("mousedown",clickTheTextBox);
		_$botright_2.on("mousedown",clickTheTextBox);
	}
	
	
	
	//=========================================================================
	function turnTextAreasGray()
	{
		_$topleft_1.css("backgroundPosition", "-162px 0px").css("cursor","default");
		_$topleft_2.css("backgroundPosition", "-162px 0px").css("cursor","default");
		_$topleft_3.css("backgroundPosition", "-162px 0px").css("cursor","default");
		_$topleft_4.css("backgroundPosition", "-162px 0px").css("cursor","default");
		_$topleft_5.css("backgroundPosition", "-162px 0px").css("cursor","default");
		_$topleft_6.css("backgroundPosition", "-162px 0px").css("cursor","default");
		
		_$topright_1.css("backgroundPosition", "-162px 0px").css("cursor","default");
		_$topright_2.css("backgroundPosition", "-162px 0px").css("cursor","default");
		
		 _$botleft_1.css("backgroundPosition", "-162px 0px").css("cursor","default");
		 _$botleft_2.css("backgroundPosition", "-162px 0px").css("cursor","default");
		
		_$botright_1.css("backgroundPosition", "-162px 0px").css("cursor","default");
		_$botright_2.css("backgroundPosition", "-162px 0px").css("cursor","default");
		
	}
	
	
	
	//=========================================================================
	function resetTextAreasToGreen()
	{
		_$topleft_1.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		_$topleft_2.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		_$topleft_3.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		_$topleft_4.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		_$topleft_5.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		_$topleft_6.css("backgroundPosition", "-54px 0px").css("cursor","pointer");

		_$topright_1.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		_$topright_2.css("backgroundPosition", "-54px 0px").css("cursor","pointer");

		_$botleft_1.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		_$botleft_2.css("backgroundPosition", "-54px 0px").css("cursor","pointer");

		_$botright_1.css("backgroundPosition", "-54px 0px").css("cursor","pointer");
		_$botright_2.css("backgroundPosition", "-54px 0px").css("cursor","pointer");	
	}
	
	
	
	//=========================================================================
	function turnIncorrectHilitesOff()
	{
	  _$topleft_hilite.css("visibility","hidden");	
	  _$topright_hilite.css("visibility","hidden");
	  _$botleft_hilite.css("visibility","hidden");
	  _$botright_hilite.css("visibility","hidden");	
	}
	
	
	
	//=========================================================================
	function removeHandlersToTextAreas()
	{
      	_$topleft_1.off("mousedown",clickTheTextBox);
	    _$topleft_2.off("mousedown",clickTheTextBox);
		_$topleft_3.off("mousedown",clickTheTextBox);
		_$topleft_4.off("mousedown",clickTheTextBox);
	    _$topleft_5.off("mousedown",clickTheTextBox);
		_$topleft_6.off("mousedown",clickTheTextBox);

		_$topright_1.off("mousedown",clickTheTextBox);
		_$topright_2.off("mousedown",clickTheTextBox);

		_$botleft_1.off("mousedown",clickTheTextBox);
		_$botleft_2.off("mousedown",clickTheTextBox);

		_$botright_1.off("mousedown",clickTheTextBox);
		_$botright_2.off("mousedown",clickTheTextBox);
	}
	
	
	
	//=========================================================================
	function turnIncorrectHilightOn()
	{
		//_incorrectHilite.css("visibility","visible");
	}
	
	
	
	
	//=========================================================================
	function clickTheTextBox()
	{ 
		
		if (_captureMode === CLICK_THROUGH_LETTERS)
		{
			if( $(this).html() === ""){ 
				$(this).html("BB");
				ParentRatio.totalClicked++;
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
				soundPlayer.playASound(2);
					
				$(this).animate({"top":"-=3px"}, 30, function(){
						$(this).animate({"top":"+=6px"}, 30, function(){
								$(this).animate({"top":"-=3px"}, 30, function(){
									// nothing
								});
						});
				});


				if( ParentRatio.totalClicked >= 12)
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
		
		
		// already has this number inside
		if( $(this).html() === ParentRatio.currLetterCombo)
		{
			soundPlayer.playASound(15);
			return;
		}
		
		// if blank, increase the count
		//if( $(this).html() === ""){ PSquare.totalClicked++};
		if( $(this).html() === "" ){ 
			//console.log("increasing!" + ParentRatio.totalClicked);
			ParentRatio.totalClicked++;
		}else
		{
		   	//console.log("not increasing!" +$(this).html() );
		};
		
		$(this).html(ParentRatio.currLetterCombo);
		soundPlayer.playASound(2);
		//animate slightly....
		// animate bottom top to bottom
		$(this).animate({"top":"-=3px"}, 30, function(){
				$(this).animate({"top":"+=6px"}, 30, function(){
						$(this).animate({"top":"-=3px"}, 30, function(){
							// nothing
						});
				});
		});
		
		//console.log("count is" + ParentRatio.totalClicked);
		
		$.event.trigger({
			type: "showResetRoundButton"
		});
		
		
		if( ParentRatio.totalClicked >= 12)
		   {
			// send an event to main script...
			// all sides filled in
			$.event.trigger({
				type: "showOutsideCheckAnswerButton"
			});
		   }
		
		
	}
	

	
	//=========================================================================
	function checkAnswer()
	{
		
		var allCorrect = true;
		
	   	if((_$botright_1.html() !== "bb")||(_$botright_2.html()!=="bb"))
	    {
		  allCorrect = false;
		  _$botright_hilite.css("visibility","visible");
	    }
	      else
	    {
		  _$botright_hilite.css("visibility","hidden");
	     }
	
	
	    if((_$botleft_1.html() !== "Bb")||(_$botleft_2.html()!=="Bb"))
	    {
		  allCorrect = false;
		  _$botleft_hilite.css("visibility","visible");
	    }
	      else
	    {
		  _$botleft_hilite.css("visibility","hidden");
	     }
	
	
	    var tArray = [_$topright_1.html(),_$topright_2.html()  ]
		tArray.sort();
		
		//alert(tArray);
		
		if( (tArray[0] !== "Bb")||(tArray[1] !== "bb"))
		{
			 //alert("visible")
			  allCorrect = false;
			   _$topright_hilite.css("visibility","visible");	
		}
		else
		{
			 //alert("hidden")
			 _$topright_hilite.css("visibility","hidden");	
		}
		
		var tArray1 = [_$topleft_1.html(),_$topleft_2.html()];
		var tArray2 = [_$topleft_3.html(),_$topleft_4.html()];
		var tArray3 = [_$topleft_5.html(),_$topleft_6.html()];
		
		tArray1.sort();
		tArray2.sort();
		tArray3.sort();
		
		var tArray4 = [tArray1[1],tArray2[1],tArray3[1]];
			
		
		if ((tArray1[0]!== "BB")||(tArray2[0]!== "BB")||(tArray3[0]!== "BB")||($.inArray("BB", tArray4)== -1)||($.inArray("Bb", tArray4)== -1)||($.inArray("bb", tArray4)== -1))
		{
			allCorrect = false;
			_$topleft_hilite.css("visibility","visible");
			
		}else
		{
			_$topleft_hilite.css("visibility","hidden");
		}
		
		return allCorrect;		
	}
	
	
	
	//=========================================================================
	function resetTextFromResetButton()
	{       
		    turnIncorrectHilitesOff();
		
		   	if( _$topleft_1.html() !== ""){ _$topleft_1.html("&#151") };
		    if( _$topleft_2.html() !== ""){ _$topleft_2.html("&#151") };
			if( _$topleft_3.html() !== ""){ _$topleft_3.html("&#151") };
		    if( _$topleft_4.html() !== ""){ _$topleft_4.html("&#151") };
			if( _$topleft_5.html() !== ""){ _$topleft_5.html("&#151") };
			if( _$topleft_6.html() !== ""){ _$topleft_6.html("&#151") };
			if(_$topright_1.html() !== ""){_$topright_1.html("&#151") };
			if(_$topright_2.html() !== ""){_$topright_2.html("&#151") };
			if(_$botleft_1.html() !== ""){_$botleft_1.html("&#151") };
			if(_$botleft_2.html() !== ""){_$botleft_2.html("&#151") };
			if(_$botright_1.html() !== ""){_$botright_1.html("&#151") };
			if(_$botright_2.html() !== ""){_$botright_2.html("&#151") };

		   setTimeout(function() { 
		    if( _$topleft_1.html() !== ""){ _$topleft_1.html("-") };
		    if( _$topleft_2.html() !== ""){ _$topleft_2.html("-") };
			if( _$topleft_3.html() !== ""){ _$topleft_3.html("-") };
		    if( _$topleft_4.html() !== ""){ _$topleft_4.html("-") };
			if( _$topleft_5.html() !== ""){ _$topleft_5.html("-") };
			if( _$topleft_6.html() !== ""){ _$topleft_6.html("-") };
			if(_$topright_1.html() !== ""){_$topright_1.html("-") };
			if(_$topright_2.html() !== ""){_$topright_2.html("-") };
			if(_$botleft_1.html() !== ""){_$botleft_1.html("-") };
			if(_$botleft_2.html() !== ""){_$botleft_2.html("-") };
			if(_$botright_1.html() !== ""){_$botright_1.html("-") };
			if(_$botright_2.html() !== ""){_$botright_2.html("-") };
			setTimeout(function() { 
			setAllTextToBlank(); 	
			}, 50);
		}, 100);	
	}
	
	
	
	//=========================================================================
	function setAllTextToBlank()
	{
		_$topleft_1.html("");
		 _$topleft_2.html("");
		 _$topleft_3.html("");
		 _$topleft_4.html("");
		 _$topleft_5.html("");
		 _$topleft_6.html("");

		 _$topright_1.html("");
		 _$topright_2.html("");


		 _$botleft_1.html("");
		 _$botleft_2.html("");


		 _$botright_1.html("");
		 _$botright_2.html("");
	}
	
	
	
	
	//=========================================================================
	// resets the object and it's divs
	// so it can be replayed later
	// gets rid of text, resets text areas to green 
	// and sets cursors to pointers
	function resetForLaterReplay()
	{
		setAllTextToBlank();
		resetTextAreasToGreen();	
	}
	
	
	//=========================================================================
	function startReplay()
	{
		clearTextFields();

		attachHandlersToTextAreas();
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
		checkAnswer:checkAnswer,
		resetAll:resetAll,
		removeHandlersToTextAreas:removeHandlersToTextAreas,
		turnTextAreasGray:turnTextAreasGray,
		resetForLaterReplay:resetForLaterReplay,
        startReplay:startReplay,
        resetTextFromResetButton:resetTextFromResetButton
		
       
	};
};

