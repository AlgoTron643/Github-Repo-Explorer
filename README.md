# Github-Repo-Explorer
A web-based front-end application that provides an overview of a GitHub repository's folder structure and displays statistics related to different types of folders within the repository

## Getting Started
Follow these steps to run the GitHub Repo Explorer application on your local machine.

### Prerequisites
- **Node.js**: Make sure you have Node.js installed. You can download it from the official website: [Node.js](https://nodejs.org/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/github-repo-explorer.git
   cd github-repo-explorer
   ```
2. **Install the dependencies:**
   ```sh
   npm install
   ``` 

## Running the Application
1. **Start the Node.js server:**
   ```sh
   npm start
   ``` 
This will start the server and make the application available at `http://localhost:3000`.
2. **Open your web browser and navigate to `http://localhost:3000`.**

## Usage
- The application's main page displays a hierarchical folder structure of the specified GitHub repository.
- Click on any folder to see its contents displayed.
- On the right side, statistics for the clicked folder will be displayed, including the count of files.

## Notes
- This application was developed as a coding challenge and is meant to demonstrate front-end development skills.
- The GitHub repository's folder structure is fetched using the GitHub API.
- The statistics are provided as mock data in the JavaScript code.
- The application is styled using CSS.
- You can replace the predefined GitHub repository URL with the one you want to explore in the `fetchRepositoryData` function in the `script.js` file.
