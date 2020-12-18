
class Projects {

	/**
	 * Projects Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 */
	constructor(api, company_id)
	{
		this.project_form = undefined;

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE HERE
		this.loadProjects();
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

	}

	createProjectRow(project)
	{
		console.log('----- createProjectRow -----', project);
		// INSERT YOUR CODE HERE
	}

	/////////////////////////////////////////////
	//
	// FORMS
	//
	/////////////////////////////////////////////

	showCreateForm(event)
	{
		console.log('----- showCreateForm -----', event);
		// INSERT YOUR CODE HERE

	}

	showEditForm(event)
	{
		console.log('----- showEditForm -----', event);
		// INSERT YOUR CODE HERE


	}

	hideForm()
	{
		console.log('----- hideForm -----');
		// INSERT YOUR CODE HERE

	}

	handleFormSubmit(event)
	{
		console.log('----- handleFormSubmit -----', event);
		// INSERT YOUR CODE HERE

	}

	/////////////////////////////////////////////
	//
	// CREATE / EDIT
	//
	/////////////////////////////////////////////

	createNewProject(xhr_response)
	{
		console.log('----- createNewProject -----', xhr_response);
		// INSERT YOUR CODE HERE
	}

	updateProject(xhr_response)
	{
		console.log('----- updateProject -----', xhr_response);
		// INSERT YOUR CODE HERE
	}

	/////////////////////////////////////////////
	//
	// DELETE
	//
	/////////////////////////////////////////////

	handleDelete(event)
	{
		console.log('----- handleDelete -----', event);
		// INSERT YOUR CODE HERE
	}

	updateFromDelete(xhr_response)
	{
		console.log('----- updateFromDelete -----', xhr_response);
		// INSERT YOUR CODE HERE
	}



}
