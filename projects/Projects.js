
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
		this.hideForm();
        // INSERT YOUR CODE HERE
		//this.project_id = 1; //project id associated with each project 
		let self = this;
		this.new_project_button = document.getElementById('new_project_button');
		this.new_project_button.addEventListener('click',(event) => {this.showCreateForm(event)});
		// submit button 
		let submit_button = document.getElementById('submit_button');
		submit_button.addEventListener("click",(event) => {this.handleFormSubmit(event)});
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
		api.makeRequest('GET', `/t-api/companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse.bind(this));

	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE

		// gets the array of projects as objects and for each object we call createProjectRow()
		//xhr_response.forEach(this.createProjectRow.bind(this));
		for( let obj in xhr_response){
			if(xhr_response.hasOwnProperty(obj)){
				this.createProjectRow(xhr_response[obj]);
			}
		}
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
		titleTag.addEventListener("click",(event) => {this.showEditForm(event)});
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
		deleteTag.addEventListener("click",(event) => {this.handleDelete(event)});
		deleteLink.appendChild(deleteTag);

		
		// appending to row
		let tr =document.createElement("tr");
		tr.setAttribute("id",project.project_id); // sets id for the row "project_"
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
		// empty value for input title 
		let titleParam = document.getElementById("title");
		titleParam.value="";
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
		console.log(projectFormID);
		// prefilling title value in the input box
		let titleParam = document.getElementById("title");
		let anchor = event.srcElement.text;
		titleParam.value=anchor;
		//titleParam.value=;
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
		let projectFormID = document.getElementById("form_project_id").value;
		let titleParam = document.getElementById("title");
		event.preventDefault();
		
		if(projectFormID==0){
			api.makeRequest("POST","/t-api/projects/",{title : titleParam.value},(event) => {this.createNewProject(event)});
			
		}
		else {
			api.makeRequest("PATCH","/t-api/projects/"+ projectFormID,{title : titleParam.value},(event) => {this.updateProject(event)});
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
		this.createProjectRow(xhr_response);
		this.hideForm();
	}

	updateProject(xhr_response)
	{
		console.log('----- updateProject -----', xhr_response);
		// INSERT YOUR CODE HERE
		let titleRow = document.getElementById(xhr_response.project_id).childNodes[1];
		console.log(titleRow);
		
		this.hideForm();
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
