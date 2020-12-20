
const api = new TimeTrackerApi(api_key_projects, api_url);

document.addEventListener('DOMContentLoaded', () => {
    const project = new Projects (api, company_id); //create new instance of Projects 
});

