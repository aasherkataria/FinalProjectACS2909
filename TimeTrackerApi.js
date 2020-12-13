
class TimeTrackerApi {

	/**
	 * Constructor for TimeTrackerApi
	 * @param {string} api_key The API key to be used for this connection
	 * @param {string} base_url The base URL for the API calls
	 */
	constructor(api_key, base_url)
	{
		this.api_key = api_key;
		this.base_url = base_url;

		// INSERT YOUR CODE HERE
	}

	makeRequest(method, path, parameters = {}, success_handler = false)
	{
		console.log('----- makeRequest -----',
			{
				'method' : method,
				'path' : path,
				'handler': success_handler});
		// INSERT YOUR CODE HERE
		//create an xhr request with the object provided
		 const xhr = new XMLHttpRequest();
		 //url object that has base url and path attached
		 let url = new URL(this.base_url, path);
		 //create a request 
		 xhr.open(method, url);
		 //set response type to json
		 xhr.responseType = 'json';
		 //send the request
		 xhr.send();

		 //let the xhrRequestHandler handle onload request
		 this.xhrRequestHandler(xhr);

	}

	xhrRequestHandler(xhr, success_handler = false)
	{
		console.log('----- xhrRequestHandler -----', xhr.responseURL);
		// INSERT YOUR CODE HERE

		//create the showError function to show the error response
		function showError() {
			alert(xhr.response);
		}

		xhr.onload = () =>
		{
			try
			{
				success_handler = true;
			}
			catch(xhr.response)
		{
			success_handler = false
		}
		}
		xhr.onerror = () =>
		{
			showError();
		}
	}
}