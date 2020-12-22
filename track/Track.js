
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
		this.hours = 0;
        this.running = false; // used to track if the timer is running 

		// Update the timer immediately, then trigger the callback every second to update the clock
		this.updateTimer();
		setInterval(this.updateTimer.bind(this), 1000);

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE HERE
		//load existing projects
		this.loadProjects();

		this.stop_button.classList.add('hide'); // hide the stop button when the page loads

		//keep track of clicks from start and stop buttons
		this.start_button.addEventListener('click', (event) => {this.start(event)});
		this.stop_button.addEventListener('click', this.stop.bind(this));

	}

	updateTimer()
	{
		console.log('----- updateTimer -----');
		// INSERT YOUR CODE HERE
		if (this.running) {
			this.seconds++;
			if (this.seconds >= 60) { //if seconds reach 60 add 1 to the minute
				this.minutes++; 
				this.seconds = 0;
			} else if (this.minutes >= 60) { //if minutes reach 60 add on to the hour
				this.hours++;
				this.minutes = 0;
				this.seconds = 0;
			}
		} else {
			//reset the timer
			this.seconds = 0;
			this.minutes = 0;
			this.hours = 0;
		}

		// console.log(this.seconds++ ? running : this.seconds = 0);
		//append clock to counter div
		this.counter.textContent = `${this.hours}:${this.minutes < 10 ? '0' : ''}${this.minutes}:${this.seconds < 10 ? '0' : ''}${this.seconds}`;
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
		//hide the start button
		event.target.classList.add('hide');
		//variable that holds the timestamp at which the start method was executed
		let timestamp = convertTimestampToDateFormat(Date.now());
		//add the timestamp to local storage
		localStorage.setItem("timer_timestamp", timestamp);
		console.log(localStorage.getItem("timer_timestamp"));
		this.stop_button.classList.remove('hide');
		// show the timer
		this.running = true;
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

		this.track_form.reset();

		api.makeRequest('POST', "/t-api/projects/entries", time_entry, this.stopTimer.bind(this));
		
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
		api.makeRequest('GET', `/t-api/companies/${this.company_id}/projects`, {}, this.fillProjectsWithResponse.bind(this));

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
		let projects = document.getElementById('project_id');
	
		
		//add the project to the list
		for( let obj in xhr_response){
			if(xhr_response.hasOwnProperty(obj)){
				// create options with value of project id and title
				let projectName = document.createElement('option');
				projectName.value = xhr_response[obj].project_id;
				projectName.innerHTML= xhr_response[obj].title;
				projects.appendChild(projectName);
			}
		}
		

	}

	stopTimer(xhr_response) 
	{
		console.log('----- stopTimer -----', xhr_response);
		
		// remove the error box if the reponse was a success
		if (document.contains(document.querySelector(".error_box"))) {
			document.querySelector('.error_box').remove();
		} 
		this.running = false; // reset the timer
		this.start_button.classList.remove('hide'); // show the start button
		this.stop_button.classList.add('hide'); // hide the stop button
	}

}