// Declare needed NPM packages
const inquirer = require("inquirer");
var mysql = require("mysql");

// Establish connection to server
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_tracking_db"
});

// Connect to server
connection.connect(function (err) {
    // If error, throw error
    if (err) throw err;
    // If no error, begin asking the user questions
    startQuestions();
});

// Actions for user to select
const actions = [
    {
        name: "actions",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all roles",
            "View all departments",
            "Add an employee",
            "Add a role",
            "Add a department",
            "Update an employee's role",
            "Quit",
        ]
    }
];

// Ask the user the inquirer prompts and then call the appropriate function
function startQuestions() {
    // Ask the user what they would like to do
    inquirer.prompt(actions).then(function (answer) {
        // If the user wants to view all employees call the viewAllEmployees function
        if (answer.actions === "View all employees") {
            viewAllEmployees();
        }
        // If the user wants to view all roles call the viewAllRoles function
        else if (answer.actions === "View all roles") {
            viewAllRoles();
        }
        // If the user wants to view all departments call the viewAllDepartments function
        else if (answer.actions === "View all departments") {
            viewAllDepartments();
        }
        // If the user wants to add an employee call the addEmployee function
        else if (answer.actions === "Add an employee") {
            addEmployee();
        }
        // If the user wants to add a role call the addRole function
        else if (answer.actions === "Add a role") {
            addRole();
        }
        // If the user wants to add a department call the addDepartment function
        else if (answer.actions === "Add a department") {
            addDepartment();
        }
        // If the user wants to update an employee's role call the updateEmployeeRole function
        else if (answer.actions === "Update an employee's role") {
            updateEmployeeRole();
        }
        // If the user wants to quit call the quit function
        else if (answer.actions === "Quit") {
            quit();
        }
    });
}