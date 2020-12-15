/**
 * @var api_url
 * @type {string}
 * The URL that points to the main API path. All commands use this primary URL
 */
let api_url = 'https://acs2909.lusciousorange.com/t-api/';


/**
 * API KEYS
 * @type {string}
 * The three API keys for the three segments of the project. You must replace these YOUR KEYS for your respective roles.
 */
let api_key_time_tracking = 'pr2kn37-qz6fgn0p27rjd5b8-7j1nfw3'; //added my api key because I am handling the TrackingApi part
let api_key_reports = 'nm6spj3-ztvkc16f3g5spdq9-sg8fvw8';
let api_key_projects = 'x3mzn47-13m4q0pjk5dzrwy9-5n4k8h4';

/**
 *
 * @var {string} my_api_key
 * YOUR api key which is used for basic connections. When submitting for the final project, any of the three API keys
 * can be included here, but for any development work, you must use your own API key.
 */
let my_api_key = 'pr2kn37-qz6fgn0p27rjd5b8-7j1nfw3'; //for workflow to work

/**
 * @var {int} company_id
 * Your company ID, you must replace this is your value once you know your company ID
 */
let company_id = 21;


/**
 * PROFILE CALL
 * This profile call must remain here as the first thing that happens in the config. It uses your API key to get the
 * profile of who is currently working.
 */
let my_api = new TimeTrackerApi(my_api_key, api_url);
my_api.makeRequest('GET', 'acs/profile', {}, saveUserID);
my_api = null;



function saveUserID(profile_object) {
	console.log('----- saveUserID -----', profile_object);
	// sets user_id to the localstorage
	localStorage.setItem("user_id",profile_object.user_id);
	
}

function convertSecondsToHoursMinutesSeconds(seconds) {
	console.log('----- convertSecondsToHoursMinutesSeconds -----', seconds);
	// Makes sure parameter is a number
	seconds = Number(seconds);
	//Math.Floor returns the largest integer less than or equal to a given number.
	let hours = Math.floor(seconds / 3600);
	let minutes = Math.floor(seconds % 3600 / 60);
	let secs = Math.floor(seconds % 3600 % 60);
	// use .slice to return 2 characters from the end
	return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + secs).slice(-2);
}

function convertTimestampToDateFormat(timestamp) {
	console.log('----- convertTimestampToDateFormat -----', timestamp);
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(parseInt(timestamp) * 1000);
    
	return date.getFullYear()+"-"+properTimeSyntax(date.getMonth()+1)+"-"+properTimeSyntax(date.getDate())+" "+
		   properTimeSyntax(date.getHours())+":"+properTimeSyntax(date.getMinutes())+":"+
		   properTimeSyntax(date.getSeconds());

}

function showError(error_details) {

	console.error('----- showError -----', error_details);
	// creating error box of element type div
	let errorBox = document.createElement('div');
	// appending error box in div
	document.body.appendChild(errorBox);
	// creating classs for error box to edit in css
	errorBox.className = "error_box";
	// storing error response code in error code
	let errorCode = error_details.error_code;
	console.log(errorCode);
	// storing error message in the error name
	let errorName = error_details.error_message;
	// displaying the error in the error box
	errorBox.innerHTML = `ERROR: ${errorCode} : ${errorName}`;

}

// Additional Utility function to get proper number of digits for time
// 00:00:00 format
function properTimeSyntax(i){
   return (i<10?'0'+i:i);
}