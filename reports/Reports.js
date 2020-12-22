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

		this.sortedArray = new Array(); //sorted array

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
		let results = document.getElementById('results').children[1]; //grab the old tbody element
		let resultsTable = document.getElementById('results');
		// console.log(this.sortedArray);

		// the selected value in the array of the select tag
		let selectedValue = event.target.selectedIndex; 
		// storing the value in projectOption 
		this.projectOption=event.target.children[selectedValue].firstChild.data;
		console.log(this.projectOption);
		// Strings associated with each option in the 
		let selectedData = event.target.children[selectedValue].firstChild.data;

		// console.log(selectArray);
		// console.log(selectedValue);
		
		// create a new array matching the corresponding selections 
		let results_array;

		results_array = this.sortedArray.filter( item => item.title.includes(selectedData));

		//remove all the elements from the old table
		results.remove();

		// create a fresh table body with no elements
		let newResults = document.createElement('tbody');
		resultsTable.append(newResults);

		// populate new table body with the corresponding values
		if (results_array.length > 0) {
			results_array.forEach (entry => {
			let row = document.createElement('tr');
				Object.values(entry).forEach(text => {
					let cell = document.createElement('td');
					let textNode = document.createTextNode(text);
					cell.appendChild(textNode);
					row.appendChild(cell);
				}) 
				newResults.appendChild(row);
			});
		} else {
			// show all projects 
			this.sortedArray.forEach (entry => {
			let row = document.createElement('tr');
				Object.values(entry).forEach(text => {
					let cell = document.createElement('td');
					let textNode = document.createTextNode(text);
					cell.appendChild(textNode);
					row.appendChild(cell);
				}) 
				newResults.appendChild(row);
			});
		}
		//  console.log(results);
		
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
		let results = document.getElementById('results').children[1]; //grab the old tbody element
		let resultsTable = document.getElementById('results');
		// console.log(this.sortedArray);

		// the selected value in the array of the select tag
		let selectedValue = event.target.selectedIndex; 
		// Strings associated with each option in the 
		let selectedData = event.target.children[selectedValue].firstChild.data;

		console.log(selectedValue);
		console.log(selectedData);

		// create a new array matching the corresponding selections 
		let results_array;

		results_array = this.sortedArray.filter( item => item.user.includes(selectedData));

		//remove all the elements from the old table
		results.remove();

		// create a fresh table body with no elements
		let newResults = document.createElement('tbody');
		resultsTable.append(newResults);

		// populate new table body with the corresponding values
		if(this.projectOption!=null)
		{
			results_array.forEach (entry =>{
				let row = document.createElement('tr');
			
		}
		
		else if (results_array.length > 0) {
			results_array.forEach (entry => {
			let row = document.createElement('tr');
				Object.values(entry).forEach(text => {
					let cell = document.createElement('td');
					let textNode = document.createTextNode(text);
					cell.appendChild(textNode);
					row.appendChild(cell);
				}) 
				newResults.appendChild(row);
			});
		} else {
			// show all projects 
			this.sortedArray.forEach (entry => {
			let row = document.createElement('tr');
				Object.values(entry).forEach(text => {
					let cell = document.createElement('td');
					let textNode = document.createTextNode(text);
					cell.appendChild(textNode);
					row.appendChild(cell);
				}) 
				newResults.appendChild(row);
			});
		}

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
		// only load time entries if both values are filled
		if (this.users != undefined && this.projects != undefined) {
			api.makeRequest('GET', `/t-api/companies/${this.company_id}/entries`, {}, this.fillTimeEntriesWithResponse.bind(this));
		}
	}

	fillTimeEntriesWithResponse(xhr_response)
	{
		console.log('----- fillTimeEntriesWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		// initialize variables
		let results = document.getElementById('results').children[1]; //grab the tbody element
		let time;
		let start_time;
		let end_time;
		let seconds;
		let date;
		let projectID; 
		let title;
		let entry_val_title;
		let entry_val_user;
		let user;
		let userID;
		let projectOption;
		// select elements for projectID and userID
		let filter_projectID;
		let filter_userID;

		let i = 0;
		let entryArray = new Array();
		// let sorted = new Array();

		for (let key in xhr_response) {

			// lists out user by first and last name
			userID = xhr_response[key].user_id;
			for (let props in this.users) {
				// compare the user id with each time entry with the user id in the object this.users
				if (userID == this.users[props].user_id) {
					user = document.createElement('td');
					user.textContent = `${this.users[props].last_name}, ${this.users[props].first_name}`;
					entry_val_user = this.users[props].first_name+" "+this.users[props].last_name;
				}
			}

			// calculate the time
			start_time = xhr_response[key].start_time.substr(10).split(':');
			end_time = xhr_response[key].end_time.substr(10).split(':');
			seconds = ((+end_time[0]) * 60 * 60 + (+end_time[1]) * 60 + (+end_time[2])) - ((+start_time[0]) * 60 * 60 + (+start_time[1]) * 60 + (+start_time[2]));
			time = document.createElement('td');
			time.textContent = convertSecondsToHoursMinutesSeconds(seconds);


			// creating the title
			projectID = xhr_response[key].project_id;
			for (let props in this.projects) {
				if (projectID == this.projects[props].project_id) {
					title = document.createElement('td');
					title.textContent = this.projects[props].title;
					entry_val_title = this.projects[props].title;
				}
			}

			// format date into correct format
			start_time = xhr_response[key].start_time.split(' ');
			// separate date and time into two arrays
			date = start_time[0].split('-');
			time = start_time[1].split(':');

			// create table data with formated date and time content
			let start_date = this.startDate(date,time);
			let date_entry = document.createElement('td');
			date_entry.textContent = start_date;


			// create an array of objects with each time entry
			entryArray[i] = {
				title : entry_val_title,
				project : xhr_response[key].description,
				user : entry_val_user,
				time: convertSecondsToHoursMinutesSeconds(seconds),
				date : start_date
			}

			i++; // increment the counter every time the loop runs

		}

		// find the select for projects and users
		filter_projectID = document.getElementById('project_id');
		filter_userID = document.getElementById('user_id');

		// look for change in selection event
		filter_projectID.addEventListener('change', (event) => {this.handleProjectChange(event)});
		filter_userID.addEventListener('change', (event) => {this.handleUserChange(event)});

		//console.log(entryArray);

		// sort the array from newest entries to oldest entries
		for (let j = entryArray.length - 1; j>=0; j--) {
			this.sortedArray.push(entryArray[j]);
		}	

		// create a row of data cells for each entry
		this.sortedArray.forEach (entry => {
		let row = document.createElement('tr');
			Object.values(entry).forEach(text => {
				let cell = document.createElement('td');
				let textNode = document.createTextNode(text);
				cell.appendChild(textNode);
				row.appendChild(cell);
			}) 
			results.appendChild(row);
		});

		// return the sorted array
		return this.sortedArray;

	}

	/**
	 * The startDate method takes
	 * @param date An Array of dates
	 * @param time An Array of times
	 * and formats them into the requested format (Month, Day, Year HH:MM);
	 */
	startDate(date,time)
	{
		let timeString = time[0]+":"+time[1];
		let dayString = month(date[1])+" "+date[2]+", "+date[0]+" ";
		let dateFormat=dayString+timeString;
		return dateFormat;

		function month(num)
		{
			let  months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
			let monthName = months[num-1];
			return monthName;
		}

	}


}
