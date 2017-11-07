var frame_area; //global pointer for drawSlideArea method;

var leftbar_width = 120;
var bottombar_height = 30; //change the CSS too for buttons #panel_bottom input


function resizeLeftPanel(){
	//Update width,height
	w_width = window.innerWidth; 
	w_height= window.innerHeight;

	//Set Panel
	var panel = document.getElementById('panel_left');
	var width = leftbar_width

	panel.style.width = width+'px';
	panel.style.height = (w_height - (margins*2) -1)+'px';

	return width;
}

function resizeBottomPanel(left_width){
	var panel = document.getElementById('panel_bottom');
	var height = bottombar_height; //100

	panel.style.height = height+'px';
	panel.style.width = 
		( (w_width - left_width) - (margins*2) -1)+'px';

	return height;
}

function resizeDropBox(height, width){
	var box = document.getElementById('drop_zone');
	box.style.width = width + 'px';
	box.style.height = height + 'px';
}

function drawSlideArea(wid,hit){
	console.log("removed all children from layer_frame");

	var offset=0;

	var	aspect = 4/3;
	var height =0, width=0, posX=0, posY=0;

	if(wid > hit){
		height = (hit-offset);
		width = (hit-offset)*aspect;
		posY=0; posX= (wid-width)/2;
	} else {
		width = (wid-offset);
		height = (wid-offset)/aspect;	
		posX=0; posY= (hit-height)/2;	
	}
	
	frame_area = new Kinetic.Rect({
        x: posX, y: posY, opacity: 1,
        width: width*0.9, height: height*0.9,
        fill: 'a7cccb', stroke: 'black', strokeWidth: 2,
		name: 'mainFrame'
	});

	frame_area.on('click', function() {
		getColor(this)
	});

	// add the layer to the stage
	var layer_frame = new Kinetic.Layer({id:'framelayer'});
	layer_frame.add(frame_area);
	stage.add(layer_frame);
	stage.draw();
}

function getColor(obj){
	//set global pointer
	color_obj = obj;

	var fill = '"'+color_obj.getFill()+'"'
	document.getElementById('color_pick').color.fromString(fill);

	var name = color_obj.getName();
	document.getElementById('colorname_obj').innerHTML = name;

	console.log(fill+"   "+name);
}

function setColor(){
	//Use global pointer
	var fill = document.getElementById('color_pick').color; //returns HEX
	var name = document.getElementById('colorname_obj').innerHTML;

	console.log(name+"  "+fill);
	console.log("name of pointer"+color_obj.getFill())

	color_obj.setFill('#'+fill);  //set HEX
	color_obj.setName(name);

	stage.draw()
}	


function resizeALL(){
	var left_width = resizeLeftPanel();
	var bottom_height = resizeBottomPanel(left_width);

	var height = w_height - bottom_height;
	var width =  w_width -left_width;

	var park = document.getElementById('container');
	park.style.left = (left_width + (2*margins) ) + 'px';
	park.style.top = 4+'px';
	
	resizeDropBox(115,115);//, width);

	return [width, height];
}

//Stored for calculating stage scale on resize based on initial params
var oldWidth, oldHeight; ///? Needed

// PUBLIC METHODS
function resize(){
	var sizes = resizeALL()
	var margin = 1
	var width = sizes[0];
	var height = sizes[1];

	//rescale the stage, rather than resetting the bounds.
	xscale = width*margin/oldWidth; yscale = height*margin/oldHeight;
	stage.setSize( width - (4*margins) , height - (5*margins) );


	//Rudimentary scaling logic
	if(xscale > yscale) {
		xscale = yscale
	}
	else if (yscale > xscale){
		yscale= xscale;
	}

	if(xscale > 1 || yscale > 1) {xscale= yscale = 1;}

	stage.setScale(xscale, yscale);
	stage.draw()

	resizeTextFloaties();

}

function initial(){
	var sizes = resizeALL()
	var width = sizes[0], height = sizes[1];
	console.log("sizes:"+sizes[0]+","+sizes[1]);
	
	stage.setSize( width - (4*margins) , height - (5*margins) );
	drawSlideArea(width,height)
	console.log("sizes:"+sizes[0]+","+sizes[1]);

	//store the initial params
	oldWidth = width; oldHeight = height;
	console.log("sizes:"+sizes[0]+","+sizes[1]);

}


function resizeTextFloaties(){
	var scale = "scale("+xscale+","+yscale+")";
//	console.log(scale);


	var canvas_pos = document.getElementById('container');

	var frame_pos = {x: frame_area.getAbsolutePosition().x + canvas_pos.offsetLeft,
					y: frame_area.getAbsolutePosition().y + canvas_pos.offsetTop};
//	console.log("framepos: "+frame_pos.x+","+frame_pos.y);

	var floaties = document.getElementsByClassName('text_floaty');
	for (var ind=0; ind < floaties.length; ind ++){

		var floatX = floaties[ind].offsetLeft;
		var floatY = floaties[ind].offsetTop;
//		console.log("floaty"+ind+": "+floatX+","+floatY);
		
		//scale positions
		var diffX = floatX - frame_pos.x, diffY = floatY - frame_pos.y;
//		console.log("diff"+ind+": "+diffX+","+diffY);

		diffX *= xscale, diffY *= yscale;
//		console.log("scalediff"+ind+": "+diffX+","+diffY);
		
		floaties[ind].style.left = (frame_pos.x + diffX)+'px';
		floaties[ind].style.top = (frame_pos.y + diffY)+'px';
//		console.log("new pos"+ind+": "+floaties[ind].offsetLeft+","+floaties[ind].offsetTop);
		
		//scale dimensions
		floaties[ind].style['webkitTransformOrigin'] = "0px 0px";  
		floaties[ind].style['webkitTransform'] = scale;

	}
}


