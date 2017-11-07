
function clearCanvas(){
//	stage.clear()
//	stage.reset()
	layer_image.removeChildren()
	topLayer.removeChildren()
	layer_text.removeChildren();
//	layer_frame.removeChildren()
	stage.draw()
}

function writePage() {
//	winref=window.open('','myconsole','width='+stage.getWidth()
//		+',height='+stage.getHeight()
//		+'menubar=0,toolbar=1,status=1,scrollbars=1,resizable=1');
//		+',menubar=1,toolbar=2,status=1,scrollbars=1,resizable=0');
	winref=window.open();
//	window.focus()
	
	//color of frame -- Error check
	var color = frame_area.getFill();
	if(color[0]!='#') color = '#'+color;

	winref.document.writeln(
		generateHTML( "Royal Free Hospital" , color )
	)

	winref.document.close()
}

function printCanvas(){
	writePage();
}


function downloadCanvas()
{
	//Prompt user for name
	var name = prompt("Filename:","Carder.html");

	if(name){
		//color of frame -- Error check
		var color = frame_area.getFill();
		if(color[0]!='#') color = '#'+color;

		//Grab data
		var data = generateHTML( "Royal Free Hospital" , color )

		//Save method
		var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
		var URL = window.URL || window.webkitURL || window.mozURL || window.msURL

		var blob, url, builder = new BlobBuilder();	

		builder.append(data);
		mimetype = "application/octet-stream";
		blob = builder.getBlob(mimetype);
		url = URL.createObjectURL(blob);

		//Create download click and simulate a mouse click.
		var link = document.createElement("a");
		link.setAttribute("href",url);
		link.setAttribute("download", name);
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
		link.dispatchEvent(event);
	}
}




