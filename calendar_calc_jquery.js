
function initEverything(){
	console.log("initEverything starts");
	$("#start_cal_holder_div").hide();
	$("#end_cal_holder_div").click(function(){
		console.log("End cal holder click");
		$("#start_cal_holder_div").show();
		$("#start_cal_holder_div").addClass("color='red'");
	});//#("#end_cal_holder_div").click(function(){
};//function initEverythin(){



$(document).ready(function(){
	console.log("Hello console");
	$("#start_cal_holder_div").text("Hello I am calendar");
	initEverything();
	
});//$(document).ready(function(){








