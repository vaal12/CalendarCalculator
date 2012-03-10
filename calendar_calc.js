/**
 * NoGray calendar options: http://www.nogray.com/calendar.php#options
 * 
 * 
 * 
 */

//alert("Before NG2");

var start_cal, end_cal;
var currentStartStartDate = new Date("1/1/1960");
var currentEndStartDate = new Date("1/1/1960");



function on_dateSelected(dta){
	alert("User selected date:"+dta);
}

function on_nextMonthClick(){
	alert("Next month");
	start_cal = new ng.Calendar({
		num_months : 3,
		num_col : 3,
		object : "start_cal_holder_div",
		visible : true,
		start_date : "02-14-2004",
		end_date : "12-31-2020",
		events: {
			onSelect : on_dateSelected,
			onNextMonthClick : on_nextMonthClick, 
			}
		}
	);
}
ng.ready(function() {
	// creating the calendar
	start_cal = new ng.Calendar({
		num_months : 3,
		num_col : 3,
		object : "start_cal_holder_div",
		visible : true,
		start_date : currentStartStartDate,
		end_date : "12-31-2020",
		//display_date : "today",
		selected_date : "03/10/2012",
		events: {
			onSelect : on_dateSelected,
			onNextMonthClick : on_nextMonthClick
		}
	});
	end_cal = new ng.Calendar({
		num_months : 3,
		num_col : 3,
		object : "end_cal_holder_div",
		visible : true,
		start_date : currentEndStartDate,
		//display_date : "today",
		selected_date : "03/10/2012",
		end_date : "12-31-2020"
	});
});
//alert("Hello");
//var my_cal2 = new ng.Calendar({num_months:4, num_col:2, object:"cal_holder_div"});
//my_cal2.make('date2');
