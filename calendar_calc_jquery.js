

$(document).ready(function(){
	console.log("Hello console");
	//$("#start_cal_holder_div").text("Hello I am calendar");
	initEverything();
	
});//$(document).ready(function(){

function initEverything(){
	console.log("initEverything starts");
	//$("#start_cal_holder_div").hide();
	// Datepicker
	$('#start_cal_holder_div').datepicker({
		inline: true,
		numberOfMonths: [1, 3],
		changeYear : true,
		changeMonth : true,
		yearRange: '1971:2020',
		showButtonPanel: true
	});//$('#start_cal_holder_div').datepicker({
	
	$('#end_cal_holder_div').datepicker({
		inline: true,
		numberOfMonths: [1, 3]
	});//$('#end_cal_holder_div').datepicker({
	
	$("#start_year_back").click(function(){
		console.log("Year back pressed");
		console.log("Datepicker date:"+
				$('#start_cal_holder_div').datepicker("getDate")
				);
		$('#start_cal_holder_div').datepicker("setDate", "02/14/1978");
	});//$("#start_year_back").click(function(){
	
	$("#end_cal_holder_div").click(function(){
		console.log("End cal holder click");
		//$("#start_cal_holder_div").show();
		//$("#start_cal_holder_div").addClass("color='red'");
	});//#("#end_cal_holder_div").click(function(){
};//function initEverythin(){












