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
		api.makeRequest('GET', `/t-api/companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse);
	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		const projects = document.getElementById('project_id');
		//add the project to the list
		for( let obj in xhr_response){
			if(xhr_response.hasOwnProperty(obj)){
				// create options with value of project id and title
				let projectName = document.createElement('option');
				projectName.value =xhr_response[obj].project_id;
				projectName.innerHTML = xhr_response[obj].title;
				this.projects=xhr_response[obj];
				projects.appendChild(projectName);
			}
		}
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
		api.makeRequest('GET', `/t-api/companies/${this.company_id}/users`, {}, this.fillProjectsWithResponse);
	}

	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		const users = document.getElementById('user_id');
		const userName = document.createElement('option');

		for( let obj in xhr_response){
			if(xhr_response.hasOwnProperty(obj)){
				// create options with value of project id and title
				const userName = document.createElement('option');
				userName.value = xhr_response[obj].project_id;
				userName.innerHTML = xhr_response[obj].title;
				this.users=xhr_response[obj];
				users.appendChild(userName);
			}
		}
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
