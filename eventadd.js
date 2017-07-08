		function addevent() {
				
			var HolidayDate = document.getElementById('HDate').value;
			var HolidayName = document.getElementById('HName').value;
			document.getElementById('eventnew').innerHTML = HolidayDate + ", " + HolidayName;
			return HolidayDate, HolidayName;
		}
 