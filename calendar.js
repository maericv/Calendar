	var CALENDAR = function () { 
	    var wrap, label,  
				// Months
	            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
				// Holidays
				holidays = [" January 1st, New Years Day<br><br> January 16th, Martin Luther King Jr. Day",
				"February 14th, Valentine Day<br><br> February 20th, Presidents Day",
				"March 15th, Ides of March<br><br> March 17th, St Patricks Day",
				"April 1st, April Fools Day<br><br> April 13th, Jefferson's Birthday",
				"May 5th, Cinco de Mayo<br><br> May 29th, Memorial Day",
				"June 6th, D Day<br><br> June 14th, Flag Day",
				"July 4th, Independence Day<br><br> July 22nd, Hammock Day",
				"August 3rd, National Watermelon Day<br><br> August 14th, V-J Day",
				"September 4th, Labor Day<br><br> September 22nd, Autummal Equinox",
				"October 24th, United Nations Day<br><br> October 31st, Halloween",
				"November 7th, Election Day<br><br> 4th Thursday of November, Thanksgiving",
				"December 25th, Christmas<br><br> December 31st, New Years Eve"]
	    function init(newWrap) { 
			wrap     = $(newWrap || "#cal"); 
			label    = wrap.find("#label"); 
			wrap.find("#prev").bind("click.calendar", function () { switchMonth(false); }); 
			wrap.find("#next").bind("click.calendar", function () { switchMonth(true);  }); 
			label.bind("click", function () { switchMonth(null, new Date().getMonth(), new Date().getFullYear()); });        
			label.click();
	    } 
 
	    function switchMonth(next, month, year) { 
 
			var curr = label.text().trim().split(" "), calendar, tempYear =  parseInt(curr[1], 10); 	
			if (!month) { 
				if (next) { 
					if (curr[0] === "December") { 
						month = 0; 
					} else { 
						month = months.indexOf(curr[0]) + 1; 
					} 
				} else { 
					if (curr[0] === "January") { 
						month = 11; 
					} else { 
						month = months.indexOf(curr[0]) - 1; 
					} 
				} 
			} 
			if (!year) { 
					if (next && month === 0) { 
						year = tempYear + 1; 
					} else if (!next && month === 11) { 
						year = tempYear - 1; 
					} else { 
						year = tempYear; 
					} 
				}
			showevents(month,tempYear);	
			calendar =  createCal(year, month); 
	        $("#cal-frame", wrap) 
	            .find(".curr") 
	                .removeClass("curr") 
	                .addClass("temp") 
	            .end() 
	            .prepend(calendar.calendar()) 
	            .find(".temp") 
	                .fadeOut("slow", function () { $(this).remove(); }); 
 
	        $('#label').text(calendar.label);
	    } 
				function addevent() {
				
			var HolidayDate = document.getElementById('HDate').value;
			var HolidayName = document.getElementById('HName').value;
			document.getElementById('eventnew').innerHTML = HolidayDate + ", " + HolidayName;
			return HolidayDate, HolidayName;
		}
 
 
		function showevents(month,year) {
		
			document.getElementById('eventarea').innerHTML = holidays[month];
			document.getElementById('eventadd').innerHTML = "<script src='eventadd.js'></script><form> Holiday Date:<input type='text' name='HDate' id='HDate' value='July 4th'><br>Holiday Name:<input type='text' name='HName' id='HName'><br><input type='button' value='Submit' onclick='addevent();'/> </form> ";
			

		}


	    function createCal(year, month) { 
		 
			var day = 1, i, j, haveDays = true,  
	        startDay = new Date(year, month, day).getDay(), 
	        daysInMonths = [31, (((year%4==0)&&(year%100!=0))||(year%400==0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], 
	        calendar = [];
					
			if (createCal.cache[year]) { 
				if (createCal.cache[year][month]) { 
					return createCal.cache[year][month]; 
				} 
			} else { 
				createCal.cache[year] = {}; 
			}
			i = 0; 
			while (haveDays) { 
				calendar[i] = []; 
				for (j = 0; j < 7; j++) { 
					if (i === 0) { 
						if (j === startDay) { 
							calendar[i][j] = day++; 
							startDay++; 
						} 
					} else if (day <= daysInMonths[month]) { 
						calendar[i][j] = day++; 
					} else { 
						calendar[i][j] = ""; 
						haveDays = false; 
					} 
					if (day > daysInMonths[month]) { 
						haveDays = false; 
					} 
				} 
				i++; 
			}
			if (calendar[5]) { 
				for (i = 0; i < calendar[5].length; i++) { 
					if (calendar[5][i] !== "") { 
						calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>"; 
					} 
				} 
				calendar = calendar.slice(0, 5); 
			}
			for (i = 0; i < calendar.length; i++) { 
					calendar[i] = "<tr><td>" + calendar[i].join("</td><td>") + "</td></tr>"; 
					//onmouseover="showevents(month,year)"
				} 
				calendar = $("<table>" + calendar.join("") + "</table>").addClass("curr"); 
			 
				$("td:empty", calendar).addClass("nil"); 
				if (month === new Date().getMonth()) { 
					$('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today"); 
				} 
				createCal.cache[year][month] = { calendar : function () { return calendar.clone() }, label : months[month] + " " + year };
			 
				//document.getElementById('eventtitle').innerHTML = months[month] + " " + year;
				return createCal.cache[year][month];
	    } 
		
		
	    createCal.cache = {}; 
	    return { 
	        init : init, 
	        switchMonth : switchMonth, 
	        createCal   : createCal 
	    }; 
	};
	