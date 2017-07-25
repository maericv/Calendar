	function eventdate(){
		var HolidayMonth = document.getElementById('HMonth').value;
		var month = '0';
		var maxday = 31;
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
			
			document.getElementById('eventdate').innerHTML = "<form>Day:<input type='number' name='HDay' id='HDay' min='1' max=" + maxday.valueOf() + " required><br> Name:<input type='text' name='HName' id='HName' size='20' required><br><input type='button' value='Submit' onclick='addevent();'/> ";
	}
	