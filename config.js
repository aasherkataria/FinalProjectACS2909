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
let api_key_reports = '';
let api_key_projects = '';

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
	// INSERT YOUR CODE HERE
}

function convertSecondsToHoursMinutesSeconds(seconds) {
	console.log('----- convertSecondsToHoursMinutesSeconds -----', seconds);
	// Makes sure parameter is a number
	seconds = Number(seconds);
	//Math.Floor returns the largest integer less than or equal to a given number.
	let hours = Math.floor(d / 3600);
	let minutes = Math.floor(d % 3600 / 60);
	let secs = Math.floor(d % 3600 % 60);
	// use .slice to return 2 characters from the end
	return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + secs).slice(-2);
}

function convertTimestampToDateFormat(timestamp) {
	console.log('----- convertTimestampToDateFormat -----', timestamp);
	// INSERT YOUR CODE HERE
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(timestamp * 1000);
    // proper formatting for month, date, hour, minutes and seconds.
    let month = date.getMonth()<10 ? "0"+date.getMonth(): date.getMonth();
    let day = date.getDate()<10 ? "0"+date.getDate(): date.getDate();
    let hours =date.getHours()<10 ? "0"+date.getHours(): date.getHours();
    let minutes =date.getMinutes()<10 ? "0"+date.getMinutes(): date.getMinutes();
    let seconds = date.getSeconds()<10 ? "0"+date.getSeconds(): date.getSeconds();

	return date.getFullYear()+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;

}

function showError(error_details) {

	console.error('----- showError -----', error_details);
	// INSERT YOUR CODE HERE
	// creating error box of element type div
	let errorBox = document.createElement('div');
	// appending error box in div
	document.body.appendChild(errorBox);
	// creating classs for error box to edit in css
	errorBox.className = "error_box";
	// creating error box heading 
	let errorBoxHeading = document.createElement('h1');
	// storing error response code in error code
	let errorCode = error_details.reponse;
	console.log(errorCode);
	// storing error text in error name
	let errorName = error_details.statusText;
	// puuting each error inerrorBoxHeading 
	errorBoxHeading.innerHTML = `ERROR: ${errorCode} : ${errorName}`;
	// appending errorBoxHeading in error box 
	errorBox.appendChild(errorBoxHeading);

}

