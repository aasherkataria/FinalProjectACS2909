
class Track
{

	/**
	 * Track Constructor
	 * @param {TimeTrackerApi} api
	 * @param {int} company_id
	 * */
	constructor(api, company_id)
	{
		this.start_button = document.getElementById('start_button'); //added line
		this.stop_button = document.getElementById('stop_button'); //added line
		this.track_form = document.getElementById('track_form'); //added line
		this.counter = document.getElementById('counter'); // added counter
		this.seconds = 0;
		this.minutes = 0;
		this.hrs = 0;
        let running = false; // used to track if the timer is running 

		// Update the timer immediately, then trigger the callback every second to update the clock
		this.updateTimer();
		setInterval(this.updateTimer.bind(this), 1000);

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE HERE
		//load existing projects
		this.loadProjects();

		//keep track of clicks from start and stop buttons
		this.start_button.addEventListener('click', this.start);
		this.stop_button.addEventListener('click', this.stop);

	}

	updateTimer()
	{
		console.log('----- updateTimer -----');
		// INSERT YOUR CODE HERE
		// const secondsElapsed = Math.round((Date.now() + 1) / 1000)
		this.seconds += 1;
		if (this.seconds >= 60) {
			this.minutes++; 
			this.seconds = 0;
		}
		
		this.counter.textContent = `${this.minutes < 10 ? '0' : ''}${this.minutes}:${this.seconds < 10 ? '0' : ''}${this.seconds}`;
		//console.log();
	}

	/////////////////////////////////////////////
	//
	// EVENTS
	//
	/////////////////////////////////////////////

	/**
	 * The start method takes 
	 * @param event the event causing it to start.
	 * and starts the timer while saving the start timestamp to local storage.
	 */
	start(event)
	{
		console.log('----- start -----', event);
		// INSERT YOUR CODE HERE
		//on click hide the start
		event.target.classList.add('hide');
		//variable that holds the timestamp at which the start method was executed
		let timestamp = convertTimestampToDateFormat(Date.now());
		//add the timestamp to local storage
		localStorage.setItem("timer_timestamp",timestamp);
		console.log(localStorage.getItem("timer_timestamp"));
	}

	stop(event)
	{
		console.log('----- stop -----', event);
		// INSERT YOUR CODE HERE
		let projectIndex = document.getElementById("project_id").selectedIndex;

		//create a time entry object
		let time_entry = {
			description : document.getElementById("description").value,
			project_id : document.getElementsByTagName('option')[projectIndex].value,
			user_id : localStorage.getItem("user_id"),
			start_time : localStorage.getItem("timer_timestamp"),
			end_time : convertTimestampToDateFormat(Date.now())
		};

		api.makeRequest('POST', "/t-api/projects/entries", time_entry, this.successHandlerTest);
	}


	/////////////////////////////////////////////
	//
	// PROJECTS
	//
	/////////////////////////////////////////////


	/**
	 * The loadProjects method loads the projects associated with
	 * the company id and api key provided by the user.
	 */
	loadProjects()
	{
		console.log('----- loadProjects -----');
		
		// INSERT YOUR CODE HERE
		//call the TimeTrackerApi to handle api request.
		api.makeRequest('GET', `/t-api/companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse);

		// //TEST CODE!
		// console.log('----- push TestProject -----');
		// let TestProject = { message : document.getElementById('testProject')};

		// api.makeRequest('POST', "/t-api/projects/", TestProject, this.successHandlerTest);

	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE
		//target the select tag in the form "track_form"
		const projects = document.getElementById('project_id');
		//create an option tag with the values of project id and title
		const projectName = document.createElement('option');
		projectName.value = xhr_response.project_id;
		projectName.innerHTML = xhr_response.title;
		//add the project to the list
		projects.appendChild(projectName);

	}

	successHandlerTest(xhr_response) {
		console.log('----- successHandlerTest -----', xhr_response);
		console.log('the response:', xhr_response);
	}

}