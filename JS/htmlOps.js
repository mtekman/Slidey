/** Process all elements from here **/

function generateHTML(copyright, color){
	head = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en"> '
	+'<div id="content" >'
	+'<head> '
	+'<title>Carder</title>'
	+'<meta name="copyright" content="Copyright &#169; '+(new Date()).getFullYear()+' '+copyright+'" />'
	+'<link rel="stylesheet" type="text/css" media="screen, projection, print"  href="http://www.w3.org/Talks/Tools/Slidy2/styles/slidy.css" />'
	+'	<script src="http://www.w3.org/Talks/Tools/Slidy2/scripts/slidy.js" charset="utf-8" type="text/javascript"></script> '

	+'<style>'
	+'body {background-color:'+color+';}'
	+'</style>'

	+'</head>'

	body_content="<body>";

	//Get bounds of frame-area and stage
	var offs_w = frame_area.getX(), offs_h = frame_area.getY();
	var stage_width = frame_area.getWidth(), stage_height = frame_area.getHeight();
	var container = document.getElementById('container');
	var cont_x = container.offsetLeft, cont_y = container.offsetTop;

	console.log(layer_array.length+" pages to process");

	for(var pager=0; pager < layer_array.length; pager++){
		//1. Start Page
		var page = '<div class="slide">'
		
		//2a. Process images
		var allthekids = layer_array[pager].getChildren();

		for( var n=0; n < allthekids.length; n++){
			var obj = allthekids[n];
			page +='<img style="position:absolute;'
				+'left:'+(100*(obj.getX()-offs_w)/stage_width)+'%;'
				+'top:'	+(100*(obj.getY()-offs_h)/stage_height)+'%;'
				+'width:'+(100*(obj.getWidth())/stage_width)+'%;'
//				+'height:'+(100*(obj.getHeight())/stage_height)+'%;'
				+'" ' //+'" >'
				+' src="'+obj.getImage().src+'" />'
		}

		var written_pageno = pager+1;


		//2b. Process Text
		var containers = document.getElementsByClassName("page"+written_pageno);

		for ( var n=0; n < containers.length; n++){
			var bound = containers[n];
			var obj = bound.getElementsByClassName("text"+written_pageno)[0];

			console.log(bound.innerHTML+"\n\n"+obj.innerHTML)


			var scale = bound.style.webkitTransform;
			scale = scale.split("scale(")[1].split(")")[0].split(",");
			
			console.log(scale[0]+","+scale[1]);

			console.log('-webkit-transform: '+bound.style.webkitTransform+";")

			page +='<div class=\"textfloat\" style="position:absolute;'
				+'left:'+(100* ( (bound.offsetLeft-(cont_x+offs_w) ) /stage_width)   )+'%;'
				+'top:'	+(100*(  (bound.offsetTop- (cont_y+offs_h)) /stage_height)   )+'%;'
//				+'-webkit-transform: '+bound.style.webkitTransform+";"
//				+'font-size:'+out_size+'%;'
//				+'font-family:\''+obj.getFontFamily()+'\';'
				+'color: black;'
				+'" >'+obj.innerHTML+'</div>'
	//		alert(obj.getText()+": "+obj.getX()+","+obj.getY());
		}

		//3. Add current page to main content and end current page
		body_content += page+"</div>";
	}
	tail='</body></div></html>'
	return head+body_content+tail;
}


function calculateWebkitScale(orig_width, orig_height)
{
	



}

