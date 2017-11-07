//Adding objects

function addPreview(){
		//Get name of preview
	if(preview_img.name=='') alert("Drag an image into drop area first");
	else {
		addImage('upload_data/'+preview_img.name);
	}
}



//	Image
function addImage(src, posX, posY, width, height){
	var marg=0;

	//Default arguments
	if(typeof(src)==='undefined') src="images/test.png";
	if(typeof(posX)==='undefined') posX=100;
	if(typeof(posY)==='undefined') posY=100;
	if(typeof(width)==='undefined') width=100;
	if(typeof(height)==='undefined') height=100;

	var imageObj = new Image();

	imageObj.onload = function() {
		
		var img = new Kinetic.Image({
			x: posX, y: posY, name: "image",
			image: imageObj,
			width: width, height: height,
			draggable: true
		});
		// add the shape to the image layer
		current_page.add(img);

		//---------------- Methods -----------------------//

		/* 	Resizing consists of mostly removing the current image and
			drawing a new Image (with new coordinates)					*/
		img.resizeImg = function(points){
			img.clearImg();
					
			addImage(imageObj.src, 	
				points[0].x, 				//x
				points[0].y,				//y
				points[1].x-points[0].x,	//width
				points[2].y-points[0].y		//height
			);			
		}

		img.clearImg = function() {
//    Remove imageObj container too? No... handled automatically it seems
//			imageObj.parentNode.removeChild(imageObj);
			img.remove();
			current_page.draw();
		}

		//---------------- Events ------------------------//
	
		img.on('click', function() {
			//update
			posX = this.getX(); posY = this.getY();
			width = this.getWidth(); height = this.getHeight();

			//Starting coords of grey square
			var points = [
				{x:posX-marg,y:posY-marg},
				{x:posX+width+marg,y:posY-marg},
				{x:posX+width+marg,y:posY+height+marg},
				{x:posX-marg,y:posY+height+marg}];

			if( typeof(r_b)==='object') r_b.clearBox(true);
			var r_b = new ResizeBox(img, points);

/*			//# Add click Events #
			r_b.grey_box.on('click', function() {
				r_b.clearBox(true);
			});*/
		});

		img.on('dblclick', function() {
			img.clearImg();
		});


		current_page.draw();
	}
	imageObj.src = src;
}


//Replaced by textarea.js

/*//	text
function addText(message,  posX, posY, color, font, size){
	//Default arguments
	if(typeof(posX)==='undefined') posX=100;
	if(typeof(posY)==='undefined') posY=100;
	if(typeof(color)==='undefined') color='#ab00ef';
	if(typeof(font)==='undefined') font = 'Arial';
	if(typeof(size)==='undefined') size = 20;

	message = prompt("Enter new Text:");

	var text_im = new Kinetic.Text({
		draggable:true,
		text: message,
		x: posX, y:posY,
		fontFamily: font,
		fontSize: size,
		padding: 5,
		//fill: 'black',
		opacity: 1,
		textFill: color,
	});
	layer_text.add(text_im);

//Obseleted again
/*	// move node to top layer for fast drag and drop
	text_im.on('mousedown', function() {
		text_im.setDraggable(true);
		layer_text.draw();
	});
	// return node to original layer
	text_im.on('dragend', function() {
		text_im.setDraggable(false);
	});*/

/*	text_im.on('click', function() {
		var text = prompt("Enter new Text:",text_im.getText() );
		text_im.setText(text);
	});
	layer_text.draw();//	stage.add(layer_text);
}*/

function addNode(dat, layer, topLayer) {
	var node = new Kinetic.Polygon({
		points: dat.points,
		fill: dat.color,
		stroke: "black",
		strokeWidth: 5
	});
//	alert(dat.points)

//Obseleted
/*	// move node to top layer for fast drag and drop
	node.on('mousedown', function() {
		node.moveTo(topLayer);
		node.setDraggable(true);
		layer.draw();
	});
	// return node to original layer
	node.on('dragend', function() {
		node.moveTo(layer);
		node.setDraggable(false);
	});*/
		
	layer.add(node);
}
