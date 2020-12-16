class Reports {

	/**
	 * Reports Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 */
	constructor(api, company_id)
	{
		// Must filled via the API calls
		this.projects = undefined;
		this.users = undefined;

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE HERE
	this.loadProjects();		
	this.loadUsers();
	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////


	loadProjects()
	{
		console.log('----- loadProjects -----');
		// INSERT YOUR CODE HERE
		const xhr = new XMLHttpRequest();
		xhr.setRequestHeader('api-key', this.api_key);
		xhr.responseType = 'json';
		this.projects=xhr.response;
		this.fillProjectsWithResponse(xhr.response);
	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
	}

	handleProjectChange(event)
	{
		console.log('----- handleProjectChange -----', event);
		// INSERT YOUR CODE HERE

	}


	/////////////////////////////////////////////
	//
	// USERS
	//
	/////////////////////////////////////////////


	loadUsers()
	{
		console.log('----- loadUsers -----');
		// INSERT YOUR CODE HERE

	}

	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
	}

	handleUserChange(event)
	{
		console.log('----- handleUserChange -----', event);
		// INSERT YOUR CODE HERE

	}

	/////////////////////////////////////////////
	//
	// TIME ENTRIES
	//
	/////////////////////////////////////////////

	loadTimeEntries()
	{
		console.log('----- loadTimeEntries -----');
		// INSERT YOUR CODE HERE

	}

	fillTimeEntriesWithResponse(xhr_response)
	{
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
	}


}
