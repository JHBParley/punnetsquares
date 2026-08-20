
var introDiv;
var expDiv;
var bkgDiv;
var bkgDiv_types;

assignNavVariables();

//grab the variables here.....
function assignNavVariables()
{
	introDiv = $("#pageOne");
	expDiv = $("#pageTwo");
	bkgDiv = $("#pageThree");
	bkgDiv_types = $("#pageThree_types");
	
}




function clickedToGoToIntroSection()
{
	
	setBarHeight("introbutton");
	
	if ( $('body').hasClass("body_background4")=== true)
	{
		 $('body').removeClass("body_background4")	
	};
	
	if ( $('body').hasClass("body_background")=== false)
	{
		 $('body').addClass("body_background")	
	};
	
	
	// go to bkg section, so.....
	if(introDiv.hasClass('hideTheDiv') === true)
	{
		introDiv.removeClass('hideTheDiv');
	}
	
	if(bkgDiv.hasClass('hideTheDiv') === false)
	{
		bkgDiv.addClass('hideTheDiv');
	}
	
	if(bkgDiv_types.hasClass('hideTheDiv') === false)
	{
		bkgDiv_types.addClass('hideTheDiv');
	}
	
	if(expDiv.hasClass('hideTheDiv') === false)
	{
		expDiv.addClass('hideTheDiv');
	}
	
	document.ontouchmove = function(event){
		//event.preventDefault();
	}
	
}

function clickedToGoToExperimentSection()
{
	
	
	if ( $('body').hasClass("body_background")=== true)
	{
		 $('body').removeClass("body_background")	
	};
	
	if ( $('body').hasClass("body_background4")=== false)
	{
		 $('body').addClass("body_background4")	
	};
	
	
	setBarHeight("expbutton");
	
	// go to bkg section, so.....
	if(introDiv.hasClass('hideTheDiv') === false)
	{
		introDiv.addClass('hideTheDiv');
	}
	
	if(bkgDiv.hasClass('hideTheDiv') === false)
	{
		bkgDiv.addClass('hideTheDiv');
	}
	
	if(bkgDiv_types.hasClass('hideTheDiv') === false)
	{
		bkgDiv_types.addClass('hideTheDiv');
	}
	
	if(expDiv.hasClass('hideTheDiv') === true)
	{
		expDiv.removeClass('hideTheDiv');
	}
	
	document.ontouchmove = function(event){
		event.preventDefault();
	}
	
}


function clickedToGoToBkgSection()
{
	
	setBarHeight("bkgbutton");
	
	if ( $('body').hasClass("body_background4")=== true)
	{
		 $('body').removeClass("body_background4")	
	};
	
	if ( $('body').hasClass("body_background")=== false)
	{
		 $('body').addClass("body_background")	
	};
	
	
	// go to bkg section, so.....
	if(introDiv.hasClass('hideTheDiv') === false)
	{
		introDiv.addClass('hideTheDiv');
	}
	
	if(bkgDiv.hasClass('hideTheDiv') === true)
	{
		bkgDiv.removeClass('hideTheDiv');
	}
	
	if(bkgDiv_types.hasClass('hideTheDiv') === false)
	{
		bkgDiv_types.addClass('hideTheDiv');
	}
	
	if(expDiv.hasClass('hideTheDiv') === false)
	{
		expDiv.addClass('hideTheDiv');
	}
	
	document.ontouchmove = function(event){
		//event.preventDefault();
	}
	
}

function clickedToGoToBkgTypesSection()
{
	//alert("here");
	
	setBarHeight("bkgbutton");
	
	// go to bkg section, so.....
	if(introDiv.hasClass('hideTheDiv') === false)
	{
		introDiv.addClass('hideTheDiv');
	}
	
	if(bkgDiv.hasClass('hideTheDiv') === false)
	{
		bkgDiv.addClass('hideTheDiv');
	}
	
	if(bkgDiv_types.hasClass('hideTheDiv') === true)
	{
	
		bkgDiv_types.removeClass('hideTheDiv');
	}
	
	if(expDiv.hasClass('hideTheDiv') === false)
	{
		expDiv.addClass('hideTheDiv');
	}
	
	document.ontouchmove = function(event){
		//event.preventDefault();
	}
	
}





function setBarHeight(p_barIDName)
{
	//return;
	
	if(p_barIDName === "introbutton")
	{
	
		if($('.introduction').hasClass('nav_on') === false)
		{
			$('.introduction').addClass('nav_on');
		}
		
		
		
		if($('.experiment').hasClass('nav_on') === true)
		{
			$('.experiment').removeClass('nav_on');
		}
		
		if($('.background').hasClass('nav_on') === true)
		{
           $('.background').removeClass('nav_on');
		}
		
		
	}else if (p_barIDName === "expbutton")
	{

		if($('.experiment').hasClass('nav_on') === false)
		{
			$('.experiment').addClass('nav_on');
		}
		
		
		if($('.introduction').hasClass('nav_on') === true)
		{
			$('.introduction').removeClass('nav_on');
		}
		
		if($('.background').hasClass('nav_on') === true)
		{
           $('.background').removeClass('nav_on');
		}
			
		
	}
	else
	{

		if($('.background').hasClass('nav_on') === false)
		{
			$('.background').addClass('nav_on');
		}
		
		
		if($('.introduction').hasClass('nav_on') === true)
		{
			$('.introduction').removeClass('nav_on');
		}
		
		if($('.experiment').hasClass('nav_on') === true)
		{
           $('.experiment').removeClass('nav_on');
		}
		
	}	
	
}


/*


function turnOffAllSubSectionDivs()
{
	// turns off all subsection divs
	turnOffBkgDiv();
	turnOffSkeletalDiv();
	turnOffThresholdDiv();
	turnOffExperimentsDiv();
}

// sub section divs
// internal functions
function turnOffBkgDiv()
{
	if(bkgDiv.hasClass('hideTheDiv') === false)
	{
		bkgDiv.addClass('hideTheDiv');
	}
	
}

function turnOnBkgDiv()
{
	if(bkgDiv.hasClass('hideTheDiv') === true)
	{
		bkgDiv.removeClass('hideTheDiv');
	}
}



function turnOffSkeletalDiv()
{
	if(skeletalDiv.hasClass('hideTheDiv') === false)
	{
		skeletalDiv.addClass('hideTheDiv');
	}
}

function turnOnSkeletalDiv()
{
	if(skeletalDiv.hasClass('hideTheDiv') === true)
	{
		skeletalDiv.removeClass('hideTheDiv');
	}	
}



//pageThree_threshold

function turnOnThresholdDiv()
{

	
	if(thresholdDiv.hasClass('hideTheDiv') === true)
	{
		thresholdDiv.removeClass('hideTheDiv');
	}
	
	
}

function turnOffThresholdDiv()
{
	if(thresholdDiv.hasClass('hideTheDiv') === false)
	{
		thresholdDiv.addClass('hideTheDiv');
	}
	
}

function turnOnExperimentsDiv()
{
	if(experimentsDiv.hasClass('hideTheDiv') === true)
	{
		experimentsDiv.removeClass('hideTheDiv');
	}
	
}

function turnOffExperimentsDiv()
{
	if(experimentsDiv.hasClass('hideTheDiv') === false)
	{
		experimentsDiv.addClass('hideTheDiv');
	}
	
}


function goToTypesSection()
{
	//console.log("going to types")
	playASound("1");
	// turn on bkgDiv;
	// turn off skeletalDiv;
	// turn off  thresholdDiv;
	// turn off  experimentsDiv;
	turnOnBkgDiv();
	turnOffSkeletalDiv();
	turnOffThresholdDiv();
	turnOffExperimentsDiv();
	
}

function goToSkeletonSection()
{
	//console.log("going to skeleton")
	playASound("1");
	// turn off bkgDiv;
	// turn on skeletalDiv;
	// turn off  thresholdDiv;
	// turn off  experimentsDiv;
	turnOffBkgDiv();
	turnOnSkeletalDiv();
	turnOffThresholdDiv();
	turnOffExperimentsDiv();
	
}

function goToThresholdSection()
{
	//console.log("going to threshold");
	playASound("1");
	// turn off bkgDiv;
	// turn off skeletalDiv;
	// turn on  thresholdDiv;
	// turn off  experimentsDiv;
	turnOffBkgDiv();
	turnOffSkeletalDiv();
	turnOnThresholdDiv();
	turnOffExperimentsDiv();
	
}

function goToExperimentsSection()
{
	//console.log("going to experiments");
		playASound("1");
	// turn off bkgDiv;
	// turn off skeletalDiv;
	// turn off  thresholdDiv;
	// turn on  experimentsDiv;
	turnOffBkgDiv();
	turnOffSkeletalDiv();
	turnOffThresholdDiv();
	turnOnExperimentsDiv();
	
}

function clickedToGoToIntroSection()
{

	setBarHeight("introbutton");
	
	playASound("23");
	
	turnOffAllSubSectionDivs();
	
	if(introDiv.hasClass('hideTheDiv') === true)
	{
		introDiv.removeClass('hideTheDiv');
	}
	
	if(bkgDiv.hasClass('hideTheDiv') === false)
	{
		bkgDiv.addClass('hideTheDiv');
	}
	
	if(expDiv.hasClass('hideTheDiv') === false)
	{
		expDiv.addClass('hideTheDiv');
	}
	
	//document.ontouchmove = function(event){
		//event.preventDefault();
	//}
	
}


function clickedToGoToExperimentSection()
{
	//alert("exp");
	//_expDiv.css("display", "block");
    //_introDiv.css("display", "none");
   	//_bkgDiv.css("display", "none");
    turnOffAllSubSectionDivs();

     setBarHeight("expbutton");

    playASound("23");

     if(expDiv.hasClass('hideTheDiv') === true)
	{
		expDiv.removeClass('hideTheDiv');
	}

	if(bkgDiv.hasClass('hideTheDiv') === false)
	{
		bkgDiv.addClass('hideTheDiv');
	}

	if(introDiv.hasClass('hideTheDiv') === false)
	{
		introDiv.addClass('hideTheDiv');
	}
	
	document.ontouchmove = function(event){
		event.preventDefault();
	}
	
	//$('body').css( "padding-top","0px" );

    // show exp div, hide intro and bkg
}

function clickedToGoToBkgSection()
{
	
	document.ontouchmove = function(event){
		//event.preventDefault();
	}
	
	//alert("bkg");
	//_bkgDiv.css("display", "block");
	//_expDiv.css("display", "none");
    //_introDiv.css("display", "none");
    setBarHeight("bkgbutton");

    	playASound("23");

    // problem - do not turn bkg off?
    turnOffAllSubSectionDivs();
	

     if(bkgDiv.hasClass('hideTheDiv') === true)
	{
		bkgDiv.removeClass('hideTheDiv');
	}

	if(introDiv.hasClass('hideTheDiv') === false)
	{
		introDiv.addClass('hideTheDiv');
	}

	if(expDiv.hasClass('hideTheDiv') === false)
	{
		expDiv.addClass('hideTheDiv');
	}


   // show bkg, hide exp and intro
	
}


function setBarHeight(p_barIDName)
{
	//return;
	
	if(p_barIDName === "introbutton")
	{
		$('.introduction').addClass('nav_on');
		
		
		if($('.experiment').hasClass('nav_on') === true)
		{
			$('.experiment').removeClass('nav_on');
		}
		
		if($('.background').hasClass('nav_on') === true)
		{
           $('.background').removeClass('nav_on');
		}
		
		
	}else if (p_barIDName === "expbutton")
	{
		$('.experiment').addClass('nav_on');
		
		
		if($('.introduction').hasClass('nav_on') === true)
		{
			$('.introduction').removeClass('nav_on');
		}
		
		if($('.background').hasClass('nav_on') === true)
		{
           $('.background').removeClass('nav_on');
		}
			
		
	}
	else
	{
		$('.background').addClass('nav_on');
		
		
		if($('.introduction').hasClass('nav_on') === true)
		{
			$('.introduction').removeClass('nav_on');
		}
		
		if($('.experiment').hasClass('nav_on') === true)
		{
           $('.experiment').removeClass('nav_on');
		}
		
	}	
	
}
*/

