


var GenoPhenoGrid = function() {
	
	var _myGPName;
	var _$myGPbox;

	var _myParentObject;
	
	// the circle buttons as cached jquery objects
	 var _$geno_left
	 var _$geno_middle
	 var _$geno_right	
	 var _$pheno_left
	 var _$pheno_right
	
     var _allTextAreas = [] ;
     var _genoArray = [];
     var _phenoArray = [];
     var _incorrectHilite;
     var GREEN_POSITION = "-46px 0px";
     var LIGHT_GRAY_POSITION  = "-138px 0px";
     var DARK_GRAY_POSITION = "-22px 0px";

	//static class variables assumed
	//GenoPhenoGrid.currNumber
	//GenoPhenoGrid.totalClicked
	var CLICK_THROUGH_LETTERS = "click_thru_letters";
	var USE_BUTTON_LETTERS = "use_button_letters";
	
	var _captureMode = CLICK_THROUGH_LETTERS;
	
	//=========================================================================
	function init(p_GenoPhenoName, p_ParentObject)
	{
	  _myGPName = p_GenoPhenoName;
	
	  _$myGPbox = $("#"+_myGPName);
	  _myParentObject = p_ParentObject;
	
	$(document).on("setModeToClickThrough", setModeToClickThrough);
	$(document).on("setModeToButtonLetters", setModeToButtonLetters);
	
	
	  //grab the names of all the text boxes asociated
	  //with this box
	  cacheJQueryVariablesforTextAreas();
	 
	 _allTextAreas = [_$geno_left,_$geno_middle,_$geno_right,_$pheno_left,_$pheno_right ];
	
	 _incorrectHilite = $("#" + _myGPName +  " .pheno_hilite");
	
	_incorrectHilite.css("visibility","hidden");
	
	   setAllTextToBlank();
	 
	  attachHandlersToTextAreas();
	
	  //_$geno_left.css("backgroundPosition", LIGHT_GRAY_POSITION);
	  //turnTextCirclesGreen();
	}
	
	
	function setModeToClickThrough()
	{
		_captureMode = CLICK_THROUGH_LETTERS;
	}
	
	function setModeToButtonLetters()
	{
	  _captureMode = USE_BUTTON_LETTERS;	
	}
	
	
	function cacheJQueryVariablesforTextAreas()
	{

		_$geno_left =   $("#" + _myGPName +  " .geno_left");
		_$geno_middle = $("#" + _myGPName +" .geno_middle");
		_$geno_right =  $("#" + _myGPName + " .geno_right");	
		_$pheno_left =  $("#" + _myGPName + " .pheno_left");	
		_$pheno_right = $("#" + _myGPName +" .pheno_right");
		
		
	}
	
	
	function makeVisible()
	{
		$("#" + _myGPName).css("visiblity","visible");
	}
	
	//-------red is 116, gray os -22, light gray is 138
	
	function attachHandlersToTextAreas()
	{
		var tLen = 5;
		for(var i = 0; i <tLen; i++)
		{
			_allTextAreas[i].on("mousedown",clickTheTextBox);
		}
		
		addCursors();
		
	}
	
	function removeHandlersToTextAreas()
	{
		var tLen = 5;
		for(var i = 0; i <tLen; i++)
		{
			_allTextAreas[i].off("mousedown",clickTheTextBox);
		}
		
		removeCursors();
	}
	
	
	function turnTextCirclesGreen()
	{ 	var tLen = 5;
		for(var i = 0; i <tLen; i++)
		{
			_allTextAreas[i].css("backgroundPosition", GREEN_POSITION);
		}
		
	}
	
	
	function turnTextCirclesDarkGray()
	{   	var tLen = 5;
	   	for(var i = 0; i <tLen; i++)
		{
			_allTextAreas[i].css("backgroundPosition", DARK_GRAY_POSITION).css("cursor","default");
		}	
	}
	
	function turnTextCirclesLightGray()
	{
		var tLen = 5;
		for(var i = 0; i <tLen; i++)
		{
			_allTextAreas[i].css("backgroundPosition", LIGHT_GRAY_POSITION).css("cursor","default");
		}
		
	}
	
	function turnIncorrectHilightOff()
	{
	  	_incorrectHilite.css("visibility","hidden");	
	}
	
	function turnIncorrectHilightOn()
	{
		_incorrectHilite.css("visibility","visible");
	}
	
	
	
	function clickTheTextBox()
	{
		//alert("valid" + GenoPhenoGrid.currNumber);
		
		//$(this).css("backgroundPosition", "-138px 0px")
		//$(this).html("2")
		// already has this number inside
		
		
		//---------------------------------------------------------------------------------
		if (_captureMode === CLICK_THROUGH_LETTERS)
		{
			
		    if( $(this).html() === ""){ 
			    $(this).html("0");
			GenoPhenoGrid.totalClicked++;
			}
			else
			{
				if ($(this).html() === "0")
				{
					$(this).html("1");
				}
				else if ($(this).html() === "1")
				{
				   	$(this).html("2");	
				}
				else if ($(this).html() === "2")
				{
					$(this).html("3");	
				}
				else if ($(this).html() === "3")
				{
					$(this).html("4");	
				}
				else if ($(this).html() === "4")
				{
					$(this).html("0");	
				}
				
			}
			
			soundPlayer.playASound(26);
			
			$(this).animate({"top":"-=3px"}, 30, function(){
					$(this).animate({"top":"+=6px"}, 30, function(){
							$(this).animate({"top":"-=3px"}, 30, function(){
								// nothing
							});
					});
			});
			
			
			if( GenoPhenoGrid.totalClicked >= 45)
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
		
		
		
		
		console.log("the number is  " + GenoPhenoGrid.currNumber);
		console.log("the html is  " + $(this).html());
		//--------------------------------------------------------------------------------
		
		if($(this).html() === GenoPhenoGrid.currNumber.toString())
		{
			soundPlayer.playASound(15);
			console.log("returning ");
			return;
		}
		
        soundPlayer.playASound(26);
		
		console.log("the number dropped thru  is  " + GenoPhenoGrid.currNumber);
		// if blank, increase the count
		//if( $(this).html() === ""){ PSquare.totalClicked++};
		if( $(this).html() ==="" ){ 
			//console.log("increasing!");
			GenoPhenoGrid.totalClicked++;
		}else
		{
		   	//console.log("not increasing!" +$(this).html() );
		};
		
		$(this).html(GenoPhenoGrid.currNumber);
		
		//animate slightly....
		// animate bottom top to bottom
		$(this).animate({"top":"-=3px"}, 30, function(){
				$(this).animate({"top":"+=6px"}, 30, function(){
						$(this).animate({"top":"-=3px"}, 30, function(){
							// nothing
						});
				});
		});
		
		//console.log("count is" + GenoPhenoGrid.totalClicked);
		
		$.event.trigger({
			type: "showResetRoundButton"
		});
		
		
		if( GenoPhenoGrid.totalClicked >= 45)
		   {
			// send an event to main script...
			// all sides filled in
			$.event.trigger({
				type: "showOutsideCheckAnswerButton"
			});
		   }
		
		
	}
	
	
	function injectThirdLevel(p_Array)
	{
	  _$geno_left.html(p_Array[0]);
	  _$geno_middle.html(p_Array[1]);
	  _$geno_right.html(p_Array[2]);	
	  _$pheno_left.html(p_Array[3]);
	  _$pheno_right.html(p_Array[4]);
		
		
	}
	
	
	
	
	function getGenoPhenoFromParent()
	{
		_genoArray =  _myParentObject.getGenotype();
		_phenoArray = _myParentObject.getPhenotype();
	}
	
	
	function checkAnswer()
	{
		// check genotype...
		if( ( parseInt(_$geno_left.html(),10) === _genoArray[0] ) &&( parseInt(_$geno_middle.html(),10) === _genoArray[1] )&&( parseInt(_$geno_right.html(),10) === _genoArray[2] ))
		{
			//alert("geno correct");
		}else
		{
			//alert("geno incorrect");
			return false;
		}
		
		if(( parseInt(_$pheno_left.html(),10) === _phenoArray[0] ) &&( parseInt(_$pheno_right.html(),10)=== _phenoArray[1]))
		{
		  	//alert("pheno correct");
		    return true;
		}
		else
		{
			//alert("pheno incorrect");
			return false;
			
		}
	
		
		
		
	}
	
	function resetTextFromResetButton()
	{

	   	if( _$geno_left.html() !== ""){ _$geno_left.html("&#151") };
	    if( _$geno_middle.html() !== ""){ _$geno_middle.html("&#151") };
		if( _$geno_right.html() !== ""){_$geno_right.html("&#151") };
		if(_$pheno_left.html() !== ""){_$pheno_left.html("&#151") };
		if(_$pheno_right.html() !== ""){_$pheno_right.html("&#151") };
	
	   setTimeout(function() { 
	    //$(".outside_textbox").html(""); 
	   	if( _$geno_left.html() !== ""){ _$geno_left.html("-") };
	    if( _$geno_middle.html() !== ""){ _$geno_middle.html("-") };
		if( _$geno_right.html() !== ""){_$geno_right.html("-") };
		if(_$pheno_left.html() !== ""){_$pheno_left.html("-") };
		if(_$pheno_right.html() !== ""){_$pheno_right.html("-") };
		setTimeout(function() { 
		  setAllTextToBlank(); 	
		}, 100);
	}, 100);
	
	}
	
	
	function setAllTextToBlank()
	{
	  _$geno_left.html("");
	  _$geno_middle.html("");
	  _$geno_right.html("");	
	  _$pheno_left.html("");
	  _$pheno_right.html("");
	}
	
	function removeCursors()
	{
		var tLen = 5;
		for(var i = 0; i <tLen; i++)
		{
			_allTextAreas[i].css("cursor", "default");
		}
		
	}
	
	function addCursors()
	{
		var tLen = 5;
		for(var i = 0; i <tLen; i++)
		{
			_allTextAreas[i].css("cursor", "pointer");
		}
		
		
	}
	
	function resetForLaterReplay()
	{
		setAllTextToBlank();
		turnTextCirclesGreen();	
		addCursors();
		attachHandlersToTextAreas();
	}
	
	function removeHandlersAndTurnGray()
	{
		removeHandlersToTextAreas();
		turnTextCirclesLightGray();
		
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
		turnTextCirclesGreen:turnTextCirclesGreen,
		setAllTextToBlank:setAllTextToBlank,
		getGenoPhenoFromParent:getGenoPhenoFromParent,
		checkAnswer:checkAnswer,
		turnIncorrectHilightOff:turnIncorrectHilightOff,
		turnIncorrectHilightOn:turnIncorrectHilightOn,
		turnTextCirclesGreen:turnTextCirclesGreen,
		turnTextCirclesDarkGray:turnTextCirclesDarkGray,
		turnTextCirclesLightGray:turnTextCirclesLightGray,
		removeHandlersToTextAreas:removeHandlersToTextAreas,
		makeVisible:makeVisible,
		injectThirdLevel:injectThirdLevel,
		resetForLaterReplay:resetForLaterReplay,
		removeHandlersAndTurnGray:removeHandlersAndTurnGray,
		resetTextFromResetButton:resetTextFromResetButton
		
       
	};
};

