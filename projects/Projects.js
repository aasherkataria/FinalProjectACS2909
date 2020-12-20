
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
		// calling load projects and hiding the form onload
		this.loadProjects();
		this.hideForm();

		// button for new project
		this.new_project_button = document.getElementById('new_project_button');
		this.new_project_button.addEventListener('click',this.showCreateForm.bind(this));
		// submit button 
		this.submit_button = document.getElementById('submit_button');
		this.submit_button.addEventListener("click",this.handleFormSubmit.bind(this));
	}

	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////


	loadProjects()
	{
		console.log('----- loadProjects -----');
		//call the TimeTrackerApi to handle api request.
		api.makeRequest('GET', `/t-api/companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse.bind(this));

	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// calls createProjectRow for each object recived form the response
		for( let obj in xhr_response){
			if(xhr_response.hasOwnProperty(obj)){
				this.createProjectRow(xhr_response[obj]);
			}
		}
	}

	createProjectRow(project)
	{
		console.log('----- createProjectRow -----', project);
		// gets the body element to append rows to 
		let tbody = document.getElementById("projects_table").getElementsByTagName("tbody")[0];

		// creating table cell for projectid
		let projectId = document.createElement('td');
		let projectNode = document.createTextNode(project.project_id);
		projectId.appendChild(projectNode);

		//creating table cell for title and anchor tag inside it to link to showEditForm
		let titleLink = document.createElement("td");
		let titleTag = document.createElement('a');
		titleTag.setAttribute("href","#");
		titleTag.textContent= project.title;
		titleTag.setAttribute("class","edit_link");
		titleTag.addEventListener("click",this.showEditForm.bind(this));
		titleLink.appendChild(titleTag);

		//creating table cell for entries
		let numEntries = document.createElement('td');
		let entrytNode = document.createTextNode(project.num_entries);
		numEntries.appendChild(entrytNode);

		// creating delete anchor tag and putting it in a table cell
		let deleteLink = document.createElement("td");
		let deleteTag = document.createElement('a');
		deleteTag.setAttribute("href","#");
		deleteTag.textContent = "Delete";
		deleteTag.setAttribute("class","delete_link");
		deleteTag.addEventListener("click",this.handleDelete.bind(this));
		deleteLink.appendChild(deleteTag);
		
		// appending every td to a tablerow and then to the tbody
		let tr =document.createElement("tr");
		tr.setAttribute("id","project_"+project.project_id); // sets id for the row 
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
		// unhides
		let formElement = document.getElementById("project_form");
		formElement.hidden = false;

		// setting project id to 0 for new project
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
		// unhides the form
		let formElement = document.getElementById("project_form");
		formElement.hidden = false;

		// setting the form project id to project id of the project to be edited
		let projectFormID = document.getElementById("form_project_id");
		// get id of the row 
		let projectIDfromEvent = event.srcElement.parentNode.parentNode; 
		let id = projectIDfromEvent.getAttribute("id");
		projectFormID.value =id;

		// prefilling title value in the input box
		let titleParam = document.getElementById("title");
		let anchor = event.srcElement.text;
		titleParam.value=anchor;

		// edit project submit button
		const submit_btn = document.getElementById('submit_button');
		submit_btn.value = "Edit Project";
	}

	hideForm()
	{
		console.log('----- hideForm -----');
		// hides form
		let formElement = document.getElementById("project_form");
		formElement.hidden = true;

	}

	handleFormSubmit(event)
	{
		console.log('----- handleFormSubmit -----', event);
		// gets project id and the title 
		let projectFormID = document.getElementById("form_project_id").value.replace("project_","");
		let titleParam = document.getElementById("title");
		// prevents refresh of page
		event.preventDefault();
		// checks and exceutes valid api calls
		if(projectFormID==0){
			api.makeRequest("POST","/t-api/projects/",{title : titleParam.value},this.createNewProject.bind(this));
			
		}
		else {
			api.makeRequest("PATCH","/t-api/projects/"+`${projectFormID}`,{title : titleParam.value},this.updateProject.bind(this));
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
		// inserts new row at the bottom and hides form
		this.createProjectRow(xhr_response);
		this.hideForm();
	}

	updateProject(xhr_response)
	{
		console.log('----- updateProject -----', xhr_response);
		// gets the title 
		let titleRow = document.getElementById("project_"+xhr_response.project_id).childNodes[1].childNodes[0];
		titleRow.text = xhr_response.title;
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
		// how to get project id from row the button was clicked from
		let projectIDfromEvent = event.srcElement.parentNode.parentNode;
		let id = projectIDfromEvent.getAttribute("id").replace("project_","");
		// delete request
		api.makeRequest("DELETE","/t-api/projects/"+id,{},this.updateFromDelete);
	}

	updateFromDelete(xhr_response)
	{
		console.log('----- updateFromDelete -----', xhr_response);
		// updates the table
		let deletedID = xhr_response.project_id;
		let tableRow = document.getElementById("project_"+deletedID);
		let tbody = document.getElementById("projects_table").getElementsByTagName("tbody")[0];
		tbody.removeChild(tableRow);
	}
	
}
