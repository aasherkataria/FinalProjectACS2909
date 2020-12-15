
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

	/**
	 * 
	 * @param {string} method The method necessary to make the XMLHTTPRequest 
	 * @param {string} path The path appended to the url  
	 * @param {object} parameters An object of values that are passed for API calls that require additional information being passed.
	 * @callback success_handler is a callback function provided by the caller which is to be called if the response is successfu
	 */
	makeRequest(method, path, parameters = {}, success_handler = false)
	{

		console.log('----- makeRequest -----',
			{
				'method' : method,
				'path' : path,
				'handler': success_handler
			});

		
		// INSERT YOUR CODE HERE
		//create an xhr with the object provided
		 const xhr = new XMLHttpRequest();
		 //url object that has base url and path attached
		 let url = new URL(path, this.base_url);
		 console.log(url);
		 //create a request 
		 xhr.open(method, url);
		 //provide the api key to the xhr object
		 xhr.setRequestHeader('api-key', this.api_key);
		 //set response type to json
		 xhr.responseType = 'json';
		 //let the xhrRequestHandler handle the errors and success for the request
		 this.xhrRequestHandler(xhr);
		 //send the request
		 xhr.send();




	}

	xhrRequestHandler(xhr, success_handler = false)
	{
		console.log('----- xhrRequestHandler -----', xhr.responseURL);

			// INSERT YOUR CODE HERE
			xhr.onreadystatechange = function (oEvent) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						success_handler(xhr.response);
						
					} else {
						showError(xhr.response);
					}
				}
			}
	}
}