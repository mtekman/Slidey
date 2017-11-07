function ResizeBox(obj, rect_points)
{
	var parent = this; //pointer to 'this', so that corner object is not referred to instead of resizeBox

	this.corner_array = [] // stores corners, keeps track
	this.box_lay = new Kinetic.Layer();

	//Pointers
	this.grey_text; //pointer to resize text on grey_box
	this.grey_box; //pointer to greybox (for clearing)

	this.objectResize = function (){
		obj.setDraggable(false);

		//Corner Points
		this.corner_array.push( this.drawCorner(rect_points[0],0, 4) );
		this.corner_array.push( this.drawCorner(rect_points[1],1, 4) );
		this.corner_array.push( this.drawCorner(rect_points[2],2, 4) );
		this.corner_array.push( this.drawCorner(rect_points[3],3, 4) );

		//draw Box Overlay
		this.drawNewSelectBox();
	}

	this.drawCorner = function (x_y, vertex,rad) {
		var corner = new Kinetic.Circle({
			x: x_y.x, y: x_y.y,
			radius: 2*rad, fill: '#567890', draggable:true
		});

		if(vertex%2==0){ //Only top-left and bottom-right are drawn

			corner.on('mousedown', function() {
				parent.box_lay.draw();
			});

			corner.on('dragend', function() {
				parent.drawNewSelectBox();
			});

			this.box_lay.add(corner);
		}
		return corner;
	}


	this.clearBox = function (dots_too){
		//Check if empty, dont clear dots
/*		var numChildren = this.box_lay.getChildren().length;
		if(numChildren>0){
			//Clear old box
			this.box_lay.remove(this.grey_box)
			this.box_lay.remove(this.grey_text)
//			this.box_lay.draw();
		}
/*		//Clear dots
		if(dots_too){
			this.corner_array = []; //clear
			this.box_lay.removeChildren(); //remove all children
		}*/
	}

	this.drawNewSelectBox = function(){
		this.clearBox(false);

		//Correct points to line up with dragged points
		for(var i=0; i< 4; i+=2)
		{
			//Update greybox points with new corner positions
			var xx = this.corner_array[i].getX()
			var yy = this.corner_array[i].getY()
			
			if(i==0){	//top-left moves:  tr moves vert, bl moves horiz
				this.corner_array[1].setY(yy);
				this.corner_array[3].setX(xx);
			}
			else if(i==2){ //bot-right moves:  tr moves horiz, bl moves vert			
				this.corner_array[1].setX(xx);
				this.corner_array[3].setY(yy);
			}
		}

		this.getGreyBoxPoints = function(){
			//Now populate grey_points
			var grey_points=[]
	
			for(var i=0; i<4; i++){
				grey_points.push({
						x: this.corner_array[i].getX(),
						y: this.corner_array[i].getY()
				})
			}
			return grey_points;
		}

		this.grey_box = new Kinetic.Polygon({
			fill:'#123456', opacity:0.2,
			stroke: "black", strokeWidth: 2,
		});

		//Now get and set bounds for grey box
		var points = this.getGreyBoxPoints();
		this.grey_box.setPoints(points);

		//Add 'Delete' Button
		var rad = 10
		this.delete_button = new Kinetic.Rect({
			x: points[1].x- (rad/2),
			y: points[1].y- (rad/2),
			height: rad, width: rad,
			fill:'red', stroke:'black', strokeWidth: 2, 
		});

		this.delete_button.on('click', function() {
			obj.clearImg();	
		});

		//## Add text ##
		var off_v = 30, off_h = 25;

		this.grey_text = new Kinetic.Text({
			text: "Click\n\nto\n\nResize",
			x: (points[0].x + points[1].x)/2 - off_h,
			y: (points[0].y + points[3].y)/2 - off_v,
			fontFamily: 'Arial bold', fontSize: 10, padding: 5,
			opacity: 1, textFill: 'Black', align:'center'
		});

		//Add them all to the layer

		this.box_lay.add(this.grey_text);
		this.box_lay.add(this.grey_box);
		this.box_lay.add(this.delete_button);

 		//Place under all four corners
		this.grey_box.setZIndex(0);
		this.grey_text.setZIndex(0);

		//MUST add layer stage if you want it to be visible?
		stage.add(this.box_lay);
	}


	// Scale the image to the new coordinates
	// by removing the object, and adding a new modified one 
	this.scaleObject = function(points){
		//Clear all layers
		this.box_lay.removeChildren();
		stage.remove(this.box_lay);
		stage.draw();

		obj.resizeImg(points);
		//calls resizeIMG method in parent
	}

	//Main:
	this.objectResize();

	//Shift object and scale
	this.box_lay.on('click', function() {		
		//1. Scale Object
		var points = parent.getGreyBoxPoints(); //Store current bounds in array
		parent.scaleObject(points);
	
	});

}
