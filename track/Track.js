
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


		// Update the timer immediately, then trigger the callback every second to update the clock
		this.updateTimer();
		setInterval(this.updateTimer,1000);

		this.api = api;
		this.company_id = company_id;

		// INSERT YOUR CODE HERE

	}

	updateTimer()
	{
		console.log('----- updateTimer -----');
		// INSERT YOUR CODE HERE
	}

	/////////////////////////////////////////////
	//
	// EVENTS
	//
	/////////////////////////////////////////////

	start(event)
	{
		console.log('----- start -----', event);
		// INSERT YOUR CODE HERE
		let d = new Date();
		let timestamp = d.getTime();
		localStorage.setItem("timer_timestamp",timestamp);
		document.getElementById("start_button").addEventListener("click", function(){
			document.getElementById("start_button").hidden = true
		});

	}

	stop(event)
	{
		console.log('----- stop -----', event);
		// INSERT YOUR CODE HERE
		let project_id = document.getElementById("project_id");
		let description = document.getElementById("description");
		let user = localStorage.getItem("user_id");
		let start_time = localStorage.getItem("timer_timestamp");
		let stop_time;
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

	}

	fillProjectsWithResponse(xhr_response)
	{
		console.log('----- fillProjectsWithResponse -----', xhr_response);
		// INSERT YOUR CODE HERE

	}
}