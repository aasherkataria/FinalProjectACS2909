
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

	}

	xhrRequestHander(xhr, success_handler = false)
	{
		console.log('----- xhrRequestHander -----', xhr.responseURL);
		// INSERT YOUR CODE HERE

	}
}