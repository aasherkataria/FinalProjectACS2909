class Reports {

	/**
	 * Reports Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 */
	constructor(api, company_id)
	{
		this.api = api;
		this.company_id = company_id;
		this.projects; //list of projects
		this.users; //list of users

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
		api.makeRequest('GET', `/t-api/companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse.bind(this));
		if(this.projects!= null)
		{
		this.loadTimeEntries();
	}

	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		const projects = document.getElementById('project_id');
		//save project objects into this.projects
		this.projects = xhr_response;
		//add the project to the list
		for( let obj in xhr_response){
			if(xhr_response.hasOwnProperty(obj)){
				// create options with value of project id and title
				let projectName = document.createElement('option');
				projectName.value = xhr_response[obj].project_id;
				projectName.innerHTML = xhr_response[obj].title;
				projects.appendChild(projectName);
			}
		}

		//in order to load entries regardless of which callback function loads first
		this.loadTimeEntries();
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

		api.makeRequest('GET', `/t-api/companies/${this.company_id}/users`, {}, this.fillUsersWithResponse.bind(this));
		if(this.users !=null)
		{
			this.loadTimeEntries();
		}
	}

	fillUsersWithResponse(xhr_response)
	{
		console.log('----- fillUsersWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		const users = document.getElementById('user_id');
		const userName = document.createElement('option');
		this.users = xhr_response;
		console.log('USERS: ', this.users);
		for( let obj in xhr_response){
			if(xhr_response.hasOwnProperty(obj)){
				// create options with value of project id and title
				const userName = document.createElement('option');
				userName.value = xhr_response[obj].user_id;
				userName.innerHTML = `${xhr_response[obj].first_name} ${xhr_response[obj].last_name}`;
				users.appendChild(userName);
			}
		}
		//in order to load entries regardless of which callback function loads first
		this.loadTimeEntries();
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
		//only load time entries if both values are filled
		if (this.users != undefined && this.projects != undefined) {
			api.makeRequest('GET', `/t-api/companies/${this.company_id}/entries`, {}, this.fillTimeEntriesWithResponse.bind(this));
		}
	}

	fillTimeEntriesWithResponse(xhr_response)
	{
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		// grab tbody element
		let results = document.getElementById('results').children[1];
		let project = '';
		let reports = '';
		let time;
		let start_time;
		let end_time;
		let seconds;
		let date;

		for (let key in xhr_response) {
			// create the row and append the data to each row
			reports = document.createElement('tr');
			reports.setAttribute('id', xhr_response[key].project_id);
			let tasks = document.createElement('td');
			tasks.textContent = xhr_response[key].description;
			// calculate the time
			start_time = xhr_response[key].start_time.substr(10).split(':');
			end_time = xhr_response[key].end_time.substr(10).split(':');
			seconds = ((+end_time[0]) * 60 * 60 + (+end_time[1]) * 60 + (+end_time[2])) - ((+start_time[0]) * 60 * 60 + (+start_time[1]) * 60 + (+start_time[2]));
			time = document.createElement('td');
			time.textContent = convertSecondsToHoursMinutesSeconds(seconds);
			// format date into correct format
			date = xhr_response[key].start_time.split(' ')[0];
			console.log(date);
			// console.log('1ST ENTRY START', start_time);
			// console.log('1ST ENTRY STOP', end_time);
			// console.log(seconds);

			reports.appendChild(tasks);
			reports.appendChild(time);
			// for (let titles in this.projects) {
			// 	project = document.createElement('td');
			// 	project.textContent = this.projects[titles].title;
			// 	reports.appendChild(project);
			// }
			{
				/// for title
				let y=xhr_response[key].project_id;
				for(let objects in this.projects())
				{
					if(y==objects.project_id)
					let tittle=objects.title;
				}
				let tittttle=document.createElement('td');
				tittttle.textContent= tittle;
				reports.appendChild(tittttle);
			}

			start_time = xhr_response[key].start_time.split(' ');
			date=start_time[0].split('-');
			time=start_time[1].split(':');
			let x=startDate(date,time);
			let y=document.createElement('td');
			y.textContent=x;



			reports.appendChild(y);
			results.appendChild(reports);
		}
		function  startDate(date,time)
		{
			let timeString=time[0]+":"+time[1];
			let dayString=month(date[1])+" "+date[2]+", "+date[0]+" ";
			let dateFormat=dayString+timeString;
			return dateFormat;

			function month(num)
			{
				var  months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
				let monthName=months[num-1];
				return monthName;
			}

		}

	}


}
