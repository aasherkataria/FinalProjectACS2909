
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
	 * makeRequest method to create an XMLHTTPRequest
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
				'parameters' : parameters, // remove after debugging
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
		//process POST requests from objects to formData 
		let formDataPost = new FormData();
		for (let key in parameters) {
			formDataPost.append(key, parameters[key]);
		}
		//provide the api key to the xhr object
		xhr.setRequestHeader('api-key', this.api_key);
		//xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		//set response type to json
		xhr.responseType = 'json';
		//send the request
		if (method === 'POST'){
			xhr.send(formDataPost);
		}
		else if(method=="PATCH"){
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhr.send();
		}
		else {
			xhr.send();
		}
		//let the xhrRequestHandler handle the errors and success for the request
		xhr.onload = () => {
			if (xhr.status == 200) {
				this.xhrRequestHandler(xhr, success_handler);
			} else {
				showError(xhr.response);
			}
		};
	}

	/**
	 * xhrRequestHandler method handles the requests made.
	 * @param {object} xhr An an object containing the response from the XMLHTTPRequest
	 * @callback success_handler A callback function that runs only when there is a successful connection 
	 */
	xhrRequestHandler(xhr, success_handler = false)
	{

		console.log('----- xhrRequestHandler -----', xhr.responseURL);
			// INSERT YOUR CODE HERE

				if (xhr.response.error_message) {
					showError(xhr.response);
				} else {
					success_handler(xhr.response);
				}
	}
}