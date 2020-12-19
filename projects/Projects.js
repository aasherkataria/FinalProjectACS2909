
class Projects {

	/**
	 * Projects Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 */
	constructor(api, company_id)
	{
		this.project_form = document.getElementById('project_form');

		this.api = api;
		this.company_id = company_id;
		// calling load projects
		this.loadProjects();

		// INSERT YOUR CODE HERE
		this.project_id = 1; //project id associated with each project 
		this.new_project_button = document.getElementById('new_project_button');
		this.new_project_button.addEventListener('click', this.showCreateForm);
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
		//call the TimeTrackerApi to handle api request.
		api.makeRequest('GET', `/t-api/companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse);

	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		// gets the array of projects as objects and for each object we call createProjectRow()
		// xhr_response.forEach(this.createProjectRow.bind(this));
	}

	createProjectRow(project)
	{
		console.log('----- createProjectRow -----', project);
		// INSERT YOUR CODE HERE
		const projectId = document.createElement('th');
		const companyId = document.createElement('th');
		const title = document.createElement('th');
		const numEntries = document.createElement('th');
		projectId.value = xhr_response.project_id;
		companyId.value = xhr_response.company_id;
		title.value = xhr_response.title;
		numEntries.value = xhr_response.num_entries;	
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
		//show the submit button with the updated value
		const submit_btn = document.getElementById('submit_button');
		submit_btn.value = "Create Project";
	}

	showEditForm(event)
	{
		console.log('----- showEditForm -----', event);
		// INSERT YOUR CODE HERE
		const submit_btn = document.getElementById('submit_button');
		submit_btn.value = "Edit Project";
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
