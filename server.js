// Declare needed NPM packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

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
            "Add a new employee",
            "Add a new role",
            "Add a new department",
            "Update an existing employee's role",
            "Quit",
        ]
    }
];

// Ask the user the inquirer prompts and then call the appropriate function
function startQuestions() {
    // Ask the user what they would like to do
    inquirer.prompt(actions).then(function (answer) {
        // If the user wants to view all employees, call the viewAllEmployees function
        if (answer.actions === "View all employees") {
            viewAllEmployees();
        }
        // If the user wants to view all roles call, the viewAllRoles function
        else if (answer.actions === "View all roles") {
            viewAllRoles();
        }
        // If the user wants to view all departments, call the viewAllDepartments function
        else if (answer.actions === "View all departments") {
            viewAllDepartments();
        }
        // If the user wants to create a new employee, call the createNewEmployee function
        else if (answer.actions === "Add a new employee") {
            createNewEmployee();
        }
        // If the user wants to add a role, call the createNewRole function
        else if (answer.actions === "Add a new role") {
            createNewRole();
        }
        // If the user wants to add a department, call the createNewDepartment function
        else if (answer.actions === "Add a new department") {
            createNewDepartment();
        }
        // If the user wants to update an employee's role, call the updateEmployeeRole function
        else if (answer.actions === "Update an existing employee's role") {
            updateEmployeeRole();
        }
        // If the user is done with the program, call the quit function
        else if (answer.actions === "Quit") {
            quit();
        }
    });
}

// Function to view all employees
function viewAllEmployees() {
    // SQL query to select all employee data including manager name. if the employee does not have a manager, the manager name will be null
    let allEmployeeQuery = 
    "SELECT employee.id AS ID, employee.first_name AS FirstName, employee.last_name AS LastName, role.title AS Role, department.name AS Department, role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager " +
    "FROM employee " +
    "JOIN role ON employee.role_id = role.id " +
    "JOIN department ON role.department_id = department.id " +
    "LEFT JOIN employee manager ON manager.id = employee.manager_id ";
    // Query the database
    connection.query(allEmployeeQuery, function (err, res) {
        // If error, throw error
        if (err) throw err;
        // If no error, log the results in table format
        console.table(res);
        // Call the startQuestions function to ask the user what they would like to do next
        startQuestions();
    });
}

// Function to view all roles
function viewAllRoles() {
    // SQL query to select all roles
    let allRolesQuery = "SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department " +
    "FROM role " +
    "LEFT JOIN department ON role.department_id = department.id ";
    // Query the database
    connection.query(allRolesQuery, function (err, res) {
        // If error, throw error
        if (err) throw err;
        // If no error, log the results in table format
        console.table(res);
        // Call the startQuestions function to ask the user what they would like to do next
        startQuestions();
    }
    );
}

// Function to view all departments
function viewAllDepartments() {
    // SQL query to select all departments
    let allDepartmentsQuery = "SELECT department.id AS ID, department.name AS Department FROM department";
    // Query the database
    connection.query(allDepartmentsQuery, function (err, res) {
        // If error, throw error
        if (err) throw err;
        // If no error, log the results in table format
        console.table(res);
        // Call the startQuestions function to ask the user what they would like to do next
        startQuestions();
    }
    );
}

// Function to add a new department
function createNewDepartment() {
    // Ask the user what the name of the new department is using inquirer
    inquirer.prompt([
        {
            name: "newDepartmentName",
            type: "input",
            message: "What is the name of the new department?",
        }
        // Once the user answers the question, insert the new department into the department table
    ]).then(function (answer) {
        connection.query(
            "INSERT INTO department (department.name) VALUES (?)", [answer.newDepartmentName], function (err, res) {
                // If error, throw error
                if (err) throw err;
                // If no error, log the results in table format
                console.log("New department added!");
                // Call the startQuestions function to ask the user what they would like to do next
                startQuestions();
            }
        );
    });
}