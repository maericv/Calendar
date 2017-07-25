		function addevent() {
			
			
			var maxday = 31;
			var HolidayMonth = document.getElementById('HMonth').value;
			if (HolidayMonth == "") {
				alert("Month Invalid");
				return false
			} else {
			
			switch (HolidayMonth) {
				case 'January':
					month = '0';
					maxday = 31;
					break;
				case 'February':
					month = '1';
					maxday = 28;
					break;	
				case 'March':
					month = '2';
					maxday = 31;
					break;	
				case 'April':
					month = '3';
					maxday = 30;
					break;	
				case 'May':
					month = '4';
					maxday = 31;
					break;	
				case 'June':
					month = '5';
					maxday = 30;
					break;	
				case 'July':
					month = '6';
					maxday = 31;
					break;	
				case 'August':
					month = '7';
					maxday = 31;
					break;	
				case 'September':
					month = '8';
					maxday = 30;
					break;	
				case 'October':
					month = '9';
					maxday = 31;
					break;
				case 'November':
					month = '10';
					maxday = 30;
					break;
				case 'December':
					month = '11';
					maxday = 31;
					break;
				default:
					break;
			}	
			var HolidayDay = document.getElementById('HDay').value;
			if (HolidayDay == "" || isNaN(HolidayDay) || HolidayDay < 1 || HolidayDay > maxday) {
				alert("Day Invalid");
				return false
			} else {
			var NameRegex = /^[a-zA-Z]+$/;
			var HolidayName = document.getElementById('HName').value;
			if (HolidayName == "" || !HolidayName.match(NameRegex) ) {
				alert("Holiday Name Invalid");
				return false
			} else {
			var HolidayDate = HolidayMonth + " " + HolidayDay;
			var NewHoliday = localStorage.getItem(month) + "<br>" + HolidayDate +" - " + HolidayName;
			localStorage.setItem(month, NewHoliday);
					
			document.getElementById('eventarea').innerHTML = localStorage.getItem(month);

			}
			}
			}
		}
		function eventclear(month) {
			
				localStorage.setItem(month,"");
				document.getElementById('eventarea').innerHTML = localStorage.getItem(month);	
			}
			
		
		function eventreset(month) {
			
			switch (month) {
				case 0:
					month = '0';
					localStorage.setItem("0","January 1 - New Years Day<br> January 16 - Martin Luther King Jr. Day");
					break;
				case 1:
					month = '1';
					localStorage.setItem("1","February 14 - Valentine Day<br> February 20 - Presidents Day");
					break;	
				case 2:
					month = '2';
					localStorage.setItem("2","March 15 - Ides of March<br> March 17 - St Patricks Day");
					break;	
				case 3:
					month = '3';
					localStorage.setItem("3","April 1 - April Fools Day<br> April 13 - Jefferson's Birthday");
					break;	
				case 4:
					month = '4';
					localStorage.setItem("4","May 5 - Cinco de Mayo<br> May 29 - Memorial Day");
					break;	
				case 5:
					month = '5';
					localStorage.setItem("5","June 6 - D Day<br> June 14 - Flag Day");
					break;	
				case 6:
					month = '6';
					localStorage.setItem("6","July 4 - Independence Day<br> July 22 - Hammock Day");
					break;	
				case 7:
					month = '7';
					localStorage.setItem("7","August 3 - National Watermelon Day<br> August 14 - V-J Day");
					break;	
				case 8:
					month = '8';
					localStorage.setItem("8","September 4 - Labor Day<br> September 22 - Autummal Equinox");
					break;	
				case 9:
					month = '9';
					localStorage.setItem("9","October 24 - United Nations Day<br> October 31 - Halloween");
					break;
				case 10:
					month = '10';
					localStorage.setItem("10","November 7 - Election Day<br> 4th Thursday of November, Thanksgiving");
					break;
				case 11:
					month = '11';
					localStorage.setItem("11","December 25 - Christmas<br> December 31 - New Years Eve");
					break;
				default:
					break;
			}	
				document.getElementById('eventarea').innerHTML = localStorage.getItem(month);
			}
 