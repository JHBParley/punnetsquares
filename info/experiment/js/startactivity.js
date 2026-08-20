

function startActivity()
{
	
	$(document).on("loadComplete", soundDownloadComplete);
	
	soundPlayer.checkBrowserAndSetParams();
	
}

function soundDownloadComplete()
{
	$("#top_nav").css("visibility","visible");
	$("#bottom_nav").css("visibility","visible");

	$("#loadingIcon").css("visibility","hidden");
	
	$("#pageOne").removeClass("hideTheDiv");
	
	ps_app = new PSMainController();

	ps_app.init();
	
}