
var current_page ;
var layer_array = []; //array of pages
var current_page_num=0;

function addPage(){
//----Kinetic Layer Handling -----/
    page_num = layer_array.length+1;
            
	current_page = new Kinetic.Layer({name: 'page'+ page_num});
//	console.log("Currently on page: "+page_num);


	//Add 'Go to Page Button'
	document.getElementById("panel_bottom").innerHTML += "<input type='button'"
		+" id='page_"+page_num+"' value='"+page_num
		+"' onclick=\"gotoPage("+page_num+")\" >";

	stage.add(current_page);
	stage.draw();

	current_page_num = page_num;

	gotoPage(page_num);


//------Text Floaty Div Handling -----//
	textfloatyShow(current_page_num);


}

function gotoPage(num){
	//update storage with current
//	console.log("storing layer_array["+(current_page_num-1)+"] = "+current_page.getName());
	layer_array[current_page_num-1] = current_page;

	//Hide all and show only the wanted page.
	var stringbuild=""
	for(var i=0; i<layer_array.length; i++){
		layer_array[i].hide();
		stringbuild +=(i+": "+layer_array[i].getName()+"\t" );
	}
//	console.log("\nThere are "+layer_array.length+" pages:");
//	console.log(stringbuild);
	current_page = layer_array[num-1];
	current_page.show()

//	console.log("On page"+(num)+" -- current layer: " + layer_array[num-1].getName());
	stage.draw();

	current_page_num = num;
	
	//Update Display of current page
	document.getElementById('page_numb').innerHTML = current_page_num;

//------Text Floaty Div Handling -----//
	textfloatyShow(current_page_num);
}

function textfloatyShow(pagenum){
	var alltexts = document.getElementsByClassName('text_floaty');

//	console.log("number of texts:"+alltexts.length)

	//Hide all
	for (var i=0; i < alltexts.length; i++)
	{
		alltexts[i].style.visibility = "hidden";
	}
	
	//Show only for page.
	var page_texts = document.getElementsByClassName("page"+pagenum);
	
	for(var i=0; i< page_texts.length; i++)
	{
		page_texts[i].style.visibility = "visible";	
	}
}
