function pagination(querySet, page, rows) {
    let trimStart = (page - 1) * rows;
    let trimEnd = trimStart + rows;

    let trimmedData = querySet.slice(trimStart, trimEnd);

    let pages = Math.ceil(querySet.length / rows);

    return {
        'querySet' : trimmedData,
        'pages' : pages
    }
}


function pageButtons(state, pages) {
	// catch the click event and show the new page everytime
		// target the content container 
		let container = document.getElementById('content_container');
		// create a div in the container to hold the buttons
		let div = document.createElement('div');
		div.innerHTML = '';
        
        // select the table body and the table
        let results = document.getElementById('results').children[1]; //grab the old tbody element
		let resultsTable = document.getElementById('results');
		
		for (let page = 1; page<= pages; page++) {
			div.innerHTML += `<button value=${page} class="pagination-btn">${page}</button>`
		}

		// add it to the container
        container.append(div);
        // target all the buttons in the pagination div
        let btn = document.querySelectorAll('.pagination-btn');
        // attach a page to every single button
		btn.forEach(btn => btn.addEventListener('click', (event) => {
             results.remove();

            console.log(state.page = event.target.value);

            // create a fresh table body with no elements
            let newResults = document.createElement('tbody');
            resultsTable.append(newResults);

            buildPaginationTable(state, newResults);

        }));

}


/**
 * The buildPaginationTable method takes
 * @param {Object} state An array of objects containing table entries
 * @param {variable} tbodyElement A reference to the table body to which the rows will be appended.
 * And creates a table with 5 rows in order to build a pagination
 */
function buildPaginationTable(state, tbodyElement) {
    let temp = pagination(state.querySet, state.page, state.rows);

    console.log('Data: ', temp);

    let myList = temp.querySet;

    console.log(myList);

    myList.forEach (entry => {
    let row = document.createElement('tr');
        Object.values(entry).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        }) 
        tbodyElement.appendChild(row);
    });
    pageButtons(state, temp.pages);
}