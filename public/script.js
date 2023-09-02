// We fetch the folder structure from the given URL using GitHub API


// 1.Fetch GitHub Repository Data

// Function to fetch repository data

async function fetchRepositoryData(){
    const apiUrl = "https://api.github.com/repos/tensorflow/tensorflow/contents";
    // the predefined url in this case that of TensorFlow, used Tensorflow's main website as an example but can be use other website
    try{
        const response = await fetch(apiUrl); // fetch the apiUrl
        const data = await response.json(); // return the response data as json
        return data;
    } catch(error){
        console.error("Error fetching repository data:",error); // when there's error fetching data by addEventListener(.....)
    }
}

// Initial setup when the DOM is fully loaded,expressed by doc.....("DOM...")
document.addEventListener("DOMContentLoaded", async () => {
    const foldersDiv = document.querySelector(".folders");// Select the element with class "folders"
    const repositoryData = await fetchRepositoryData();// Fetch repository data using the defined function
    createFolderTree(foldersDiv, repositoryData);// Create the folder tree using the fetched data

    // Add click event listener to folders
    // An event listener is added to the `foldersDiv` element which represents the container where the folder tree is displayed listening to any click event on any element within the `foldersDiv`
    foldersDiv.addEventListener("click", async (event) => {
        if (event.target.tagName === "LI") { // checks if the clicked element's tag name is "LI" and a listed item folder within the folder tree was clicked
            const folderName = event.target.textContent; // If the clicked element is a list item, it retrieves the text content of the clicked list item and is the name of the clicked folder
            updateStatistics(folderName); // Updates the displayed statistics based on the clicked folder
        }
    }); 
});

// 2.Create a Folder Tree

// Function to create the folder tree using the fetched repository data
// Parent HTML element where the folder tree will be inserted
// The repository data for the current level of the folder tree
function createFolderTree(parent, data){
    const ul = document.createElement("ul");// Initially create an unordered list element
    // loop through each item in the `data` array
    data.forEach(item => {
        // if the item is a directory, created a ordered list
        if (item.type === "dir"){
            const li = document.createElement("li");// create an unordered list element
            li.textContent = item.name; // Set the text content of the list item to the folder name
            ul.appendChild(li); // Append the list item to the unordered list created earlier

            if (item.submodule_git_url){
                // If the item is a submodule/subfolder, fetch its data recursively and creates a sub-folder using the same function 
                fetchRepositoryData(item.submodule_git_url).then(submoduleData => {
                    createFolderTree(li, submoduleData);
                });
            }
        }
    });
    // After iterating all the items in the data array, the entire unordered list is appended to the provided `parent` element, which will display the hierarchical folder structure
    parent.appendChild(ul);
}

// 3.Display Statistics

// Function to update statistics (mock data)
function updateStatistics(folderName){  // name of the folder for which stats are being displayed
    const statisticsDiv = document.querySelector(".statistics"); // select tbe element with class "statistics" using querySelector() - place where statistics are displayed

    // Mock statistics data defined using objects
    const stats = {
        src: { count : 20 }, // key value pairs of folder names to the objects containing count of files in each folder type
        docs: { count : 15 },
        third_party : {count : 15},
        tools: { count : 10 },
    };

    const folderStats = stats[folderName] || { count: 0 };// Get stats using the given folderName using the `stats` object  or use default that has an objext with a count of 0
    
    // HTML section for statistics $ is a placeholder replaced with actual values `` <- template literals for the HTML section to display the actual values
    statisticsDiv.innerHTML = `
        <h2>Statistics for ${folderName}</h2>   
        <p>Count of files: ${folderStats.count}</p>
    `;  // Resulting HTML section is then assigned as the `innerHTML' of the `statisticsDiv` that updates the displayed statistics based on the selected folder
}