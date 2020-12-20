
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
		//this.loadProjects();

		let id1 = {
			project_id : 1,
			company_id :21,
			title : "1st object",
			num_entries : "3",
		};
		let id2 = {
			project_id : 123,
			company_id :21,
			title : "2st object",
			num_entries : "4",
		};
		let arr = [];
		arr[0] = id1;
		arr[1] = id2;

		this.fillProjectsWithResponse(arr);
		this.hideForm();
        // INSERT YOUR CODE HERE
		//this.project_id = 1; //project id associated with each project 
		let self = this;
		this.new_project_button = document.getElementById('new_project_button');
		this.new_project_button.addEventListener('click', this.showCreateForm);
		// submit button 
		let submit_button = document.getElementById('submit_button');
		submit_button.addEventListener("click",this.handleFormSubmit);
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
		 xhr_response.forEach(this.createProjectRow.bind(this));
	}

	createProjectRow(project)
	{
		console.log('----- createProjectRow -----', project);
		// INSERT YOUR CODE HERE
		let tbody = document.getElementById("projects_table").getElementsByTagName("tbody")[0];
		// creating table cell for projectid
		let projectId = document.createElement('td');
		let projectNode = document.createTextNode(project.project_id);
		projectId.appendChild(projectNode);
		//creating table cell for title
		let titleLink = document.createElement("td");
		let titleTag = document.createElement('a');
		titleTag.setAttribute("href","#");
		titleTag.innerText = project.title;
		titleTag.setAttribute("class","edit_link");
		titleTag.addEventListener("click",this.showEditForm);
		titleLink.appendChild(titleTag);
		//creating table cell for entries
		let numEntries = document.createElement('td');
		let entrytNode = document.createTextNode(project.num_entries);
		numEntries.appendChild(entrytNode);
		// creating delete anchor tag
		let deleteLink = document.createElement("td");
		let deleteTag = document.createElement('a');
		deleteTag.setAttribute("href","#");
		deleteTag.innerText = "Delete";
		deleteTag.setAttribute("class","delete_link");
		deleteTag.addEventListener("click",this.handleDelete);
		deleteLink.appendChild(deleteTag);

		
		// appending to row
		let tr =document.createElement("tr");
		tr.setAttribute("id",project.project_id); // sets id for the row
		tr.appendChild(projectId);
		tr.appendChild(titleLink);
		tr.appendChild(numEntries);
		tr.appendChild(deleteLink);
		tbody.appendChild(tr);

		
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
		let formElement = document.getElementById("project_form");
		formElement.hidden = false;
		// setting project id to 0 for newer project
		let projectFormID = document.getElementById("form_project_id");
		projectFormID.value = 0;
		//show the submit button with the updated value
		const submit_btn = document.getElementById('submit_button');
		submit_btn.value = "Create Project";
	}

	showEditForm(event)
	{
		console.log('----- showEditForm -----', event);
		// INSERT YOUR CODE HERE
		let formElement = document.getElementById("project_form");
		formElement.hidden = false;
		// setting the form project id to project id of the project to be edited
		let projectFormID = document.getElementById("form_project_id");
		let projectIDfromEvent = event.srcElement.parentNode.parentNode;
		let id = projectIDfromEvent.getAttribute("id");
		projectFormID.value =id;
		// edit project button
		const submit_btn = document.getElementById('submit_button');
		submit_btn.value = "Edit Project";
	}

	hideForm()
	{
		console.log('----- hideForm -----');
		// INSERT YOUR CODE HERE
		let formElement = document.getElementById("project_form");
		formElement.hidden = true;

	}

	handleFormSubmit(event)
	{
		console.log('----- handleFormSubmit -----', event);
		// INSERT YOUR CODE HERE
		let projectFormID = document.getElementById("form_project_id");
		let titleParam = document.getElementById("title");
		event.preventDefault();
		if(projectFormID.value==0){
			api.makeRequest("POST","/t-api/projects/",{title : titleParam.value},this.createNewProject);
			
		}
		else {
			api.makeRequest("PATCH","/t-api/projects/"+ projectFormID,{"title": "newValue"},updateProject);
		}


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
		// how to get project id from when the delete button is clicked?
		let projectIDfromEvent = event.srcElement.parentNode.parentNode;
		let id = projectIDfromEvent.getAttribute("id");
		api.makeRequest("DELETE","/t-api/projects/"+id,{},this.updateFromDelete);
	}

	updateFromDelete(xhr_response)
	{
		console.log('----- updateFromDelete -----', xhr_response);
		// INSERT YOUR CODE HERE
		let deletedID = xhr_response.project_id;
		let tableRow = document.getElementById(deletedID);
		let tbody = document.getElementById("projects_table").getElementsByTagName("tbody")[0];
		tbody.removeChild(tableRow);
	}
	
}
