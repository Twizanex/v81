//TODO: Move max no of module (6) as a variable

$('.moduleWidget').click(function(){
	var attrTypeName = $('#'+this.id).attr("typename");
	var modEditPath = "";
	//alert(attrTypeName);
	$("#module"+(currentAdd+1)).html($('#'+this.id).html()+"<input type=hidden name=\"newModule"+(currentAdd+1)+"\" value=\""+attrTypeName+"\">");
	$("#module"+(currentAdd+1)).find(".info").remove();
	$("#module"+(currentAdd+1)).addClass("text-center").css("padding","5px");
	addSelectBorder($("#module"+(currentAdd+1)),true);
	if(currentAdd<5){
		$("#module"+(currentAdd+2)).html(addBtnStr);
		$('#save_alert').show();
		currentAdd++;
	}
	$('#moduleTemplateRow').hide();	//Hide the module and Template
	
	if(attrTypeName == 'modAboutPage'){
		modEditPath = "MOD_EDIT_ABOUTUS";
	}
	if(attrTypeName !=""){
		//Display appropriate edit
		$.ajax({
			url: "/do/MOD/"+modEditPath,
			type: "post",
			cache: false
		}).done(function( html ) {
			if($.trim(html).match("^Error")){
				// Server side validation and display error msg
				//$('#error-msg').html(html.replace("Error:","")+"<br/>");
			} else {
				$('#modEditForm').html(html);
				$('#moduleEditRow').show();			//Show the edit form
			}
		});
	}
});

var addBtnStr = "<button class=\"btn btn-lg btn-success\" onClick=\"javascript:$('#moduleTemplateRow').show();clearAllBorder();$('#moduleEditRow').hide();return false;\"><i class=\"fa fa-plus\"></i> Add</button>";
var emptyStr = "<button class=\"btn btn-sm btn-default disabled\"><i class=\"fa fa-plus\"></i> Empty</button>";

function clearAllBorder(){
	for(x = 1; x< 6 ;x++){
		addSelectBorder($("#module"+(x)), false);
	}
}

function addSelectBorder(obj, isTrue){
	if(isTrue){
		obj.css("border","2px dashed grey");
	} else {
		obj.css("border","");
	}
}

//Hide Save alert
$('#save_alert').hide();
//Load the module list
topRefresh();

function topRefresh(){
	$.ajax({
		url: "/do/MOD/MOD_LIST_MOD",
		type: "post",
		cache: false
	}).done(function( html ) {
		if($.trim(html).match("^Error")){
			// Server side validation and display error msg
			//$('#error-msg').html(html.replace("Error:","")+"<br/>");
		} else {
			$('#moduleListForm').html(html);
			$('#save_alert').hide();
		}
	});
}

function topSave(){
	alert('topSave');
	$.ajax({
		url: "/do/MOD/MOD_SAVE",
		type: "post",
		data: $('#moduleListForm').serialize(),
		cache: false
	}).done(function( html ) {
		if($.trim(html).match("^Error")){
			// Server side validation and display error msg
			//$('#error-msg').html(html.replace("Error:","")+"<br/>");
		} else {
			$('#moduleListForm').html(html);
			$('#save_alert').hide();
		}
	});
}
