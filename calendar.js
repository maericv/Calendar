	var CALENDAR = function () { 
	    var wrap, label,  
				// Months
	            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; 
				// Holidays

			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("0","January 1 - New Years Day<br> January 16 - Martin Luther King Jr. Day");
				localStorage.setItem("1","February 14 - Valentine Day<br> February 20 - Presidents Day");
				localStorage.setItem("2","March 15 - Ides of March<br> March 17 - St Patricks Day");
				localStorage.setItem("3","April 1 - April Fools Day<br> April 13 - Jefferson's Birthday");
				localStorage.setItem("4","May 5 - Cinco de Mayo<br> May 29 - Memorial Day");
				localStorage.setItem("5","June 6 - D Day<br> June 14 - Flag Day");
				localStorage.setItem("6","July 4 - Independence Day<br> July 22 - Hammock Day");
				localStorage.setItem("7","August 3 - National Watermelon Day<br> August 14 - V-J Day");
				localStorage.setItem("8","September 4 - Labor Day<br> September 22 - Autummal Equinox");
				localStorage.setItem("9","October 24 - United Nations Day<br> October 31 - Halloween");
				localStorage.setItem("10","November 7 - Election Day<br> 4th Thursday of November, Thanksgiving");
				localStorage.setItem("11","December 25 - Christmas<br> December 31 - New Years Eve");
			}
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

 
		function showevents(month,year) {
			
			document.getElementById('eventutlities').innerHTML = "<button type='button' onclick='eventreset(" + month + ");'>Reset Current Month</button> <button type='button' onclick='eventclear(" + month + ");'>Clear Current Month</button> ";
			document.getElementById('eventarea').innerHTML = localStorage.getItem(month);
			document.getElementById('eventadd').innerHTML = "<form>Month: <select name='HMonth' id ='HMonth' onchange='eventdate();' required><option value='January'>January</option><option value='February'>February</option><option value='March'>March</option><option value='April'>April</option><option value='May'>May</option><option value='June'>June</option><option value='July'>July</option><option value='August'>August</option><option value='September'>September</option><option value='October'>October</option><option value='November'>November</option><option value='December'>December</option></select></form> ";	
			
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
				} 
				calendar = $("<table>" + calendar.join("") + "</table>").addClass("curr"); 
			 
				$("td:empty", calendar).addClass("nil"); 
				if (month === new Date().getMonth()) { 
					$('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today"); 
				} 
				createCal.cache[year][month] = { calendar : function () { return calendar.clone() }, label : months[month] + " " + year };
				return createCal.cache[year][month];
	    } 
		
		
	    createCal.cache = {}; 
	    return { 
	        init : init, 
	        switchMonth : switchMonth, 
	        createCal   : createCal 
	    }; 
	};
	