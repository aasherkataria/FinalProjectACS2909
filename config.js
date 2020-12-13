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
let company_id = 0;


/**
 * PROFILE CALL
 * This profile call must remain here as the first thing that happens in the config. It uses your API key to get the
 * profile of who is currently working.
 */
let my_api = new TimeTrackerApi(my_api_key, api_url);
my_api.makeRequest('GET','acs/profile', {}, saveUserID);
my_api = null;



function saveUserID(profile_object)
{
	console.log('----- saveUserID -----', profile_object);
	// INSERT YOUR CODE HERE
}

function convertSecondsToHoursMinutesSeconds(seconds)
{
	console.log('----- convertSecondsToHoursMinutesSeconds -----', seconds);
	// INSERT YOUR CODE HERE

}

function convertTimestampToDateFormat(timestamp)
{
	console.log('----- convertTimestampToDateFormat -----', timestamp);
	// INSERT YOUR CODE HERE

}

function showError(error_details)
{

	console.error('----- showError -----', error_details);
	// INSERT YOUR CODE HERE
	// creating error box of element type div
	let errorBox = document.createElement('div');
	// appending error box in div
	document.body.appendChild(errorBox);
	// creating classs for error box to edit in css
	errorBox.className="error_box";
	// creating error box heading 
	let errorBoxHeading = document.createElement('h1');
	// storing error response code in error code
	let errorCode = xhr.response.code;
    // storing error text in error name
	let errorName = xhr.response.error_details;
	// puuting each error inerrorBoxHeading 
	errorBoxHeading.innerHTML = `ERROR: ${errorCode} : ${errorName}`;
	// appending errorBoxHeading in error box 
	errorBox.appendChild(errorBoxHeading);
	
}

