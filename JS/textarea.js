
function editTextBox(box_id){
	//Draw editable with the pre-existing text
	var edit_text = document.getElementById(box_id).innerHTML;
	drawTextBox(true, edit_text, box_id);

}

function removeTextBox(box_id){
	document.getElementById(box_id).parentNode.outerHTML="";
}


function drawTextBox(yes, html, box_id){
	var black = document.getElementById('black_overlay');
	var config_wind = document.getElementById('text_config');

	if(yes){
		black.style.display = 'block';
		config_wind.style.display= 'block';

		//Change the default submit behaviour (edits prexisting box, not inserts new)
		var submit_button =	document.getElementById('text_submitter');
		var button = "<input type='submit' value='submit' ";

		//Set text if extra argument given
		if(typeof(html)!=='undefined'){
			//box_id is valid only if html i
			document.getElementById('editable').innerHTML = html;
			button += "onclick=addTextBox('"+box_id+"')";
		}
		else button += "onclick=addTextBox()";

		//Set changes
		submit_button.innerHTML = button+" >";

	}
	else{
		black.style.display = 'none';
		config_wind.style.display= 'none';
	}
}

var num_floatys = 0;

/*Called after text has been editted */
//Method that checks for existing boxes to replace -- pass in floaty_name where possible


function addTextBox(floaty_id){
	drawTextBox(false);
	var text = document.getElementById('editable').innerHTML;
	
//If undefined, add new box
	if(typeof(floaty_id)==='undefined'){
		var textbox_holder = document.getElementById('textbox_holder');
		var name = 'floaty_'+(num_floatys ++);

		//Multiple classes -- belongs to text_contents and pageN
		var page_class="page"+current_page_num;
		var text_class="text"+current_page_num;
	
		//Create edit button
		var button = "<input type=\"button\" value=\"Edit\" style=\"position:absolute;top:1px; right:1px;\" "
			+"onclick=\"editTextBox('"+name+"')\" >"
			+"<input type=\"button\" value=\"Delete\" style=\"position:absolute;bottom:1px; right:1px;\" "
			+"onclick=\"removeTextBox('"+name+"')\" >"


		//Append div
		textbox_holder.innerHTML += "<div class=\"text_floaty "+page_class+"\""
			+" style='position:fixed!important;position:absolute;"
			+"border:1px dotted black;left:110px;top:150px;z-index:4999' >"
			+"<div id=\""+name+"\" "
			+"class=\"text_contents "+text_class+"\" >"+text+"</div>"
			+"<div>"+button+"</div></div>";
	}
	else{ //Replace if id exists
		var floaty_holder = document.getElementById(floaty_id);
		floaty_holder.innerHTML = text;
	}		
	
	//Make draggable individually -- nope not working
//	Drag.init(document.getElementById(name));

	//Make draggable (update all each time one is added.... really...)
	var draggers=document.getElementsByClassName('text_floaty')
	for (var i_tem = 0; i_tem < draggers.length; i_tem++){
		Drag.init(draggers[i_tem])
	}

	//Keep the scale
	resizeTextFloaties()
}

