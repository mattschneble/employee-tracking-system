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

// Function to create a new employee
function createNewEmployee() {
    // call Inquirer to ask the user questions
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the new employee's last name?"
        },
        {
            type: "list",
            name: "newRole",
            message: "What is the new employee's role?",
            choices: [
                {value:1,name:"Sales Lead"},
                "Salesperson",
                "Lead Software Engineer",
                "Software Engineer",
                "Accountant",
                "Lead Attorney",
                "Attorney",
            ]
        },
        {
            type: "list",
            name: "newManager",
            message: "Who is the new employee's manager? (If they do not have a manager, choose NULL)",
            choices: [
                {value:1,name:"Indiana Jones"},
                "Optimus Prime",
                "Leo McGarry",
                "NULL"
            ]
        }
        // After asking the user questions, map the answers to the employee table then insert the new employee into the employee table
    ]).then(function (answer) {
        // Map the user's answers to the employee table
        let newEmployee = {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.newRole,
            manager_id: answer.newManager
        };
        // Insert the new employee into the database
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?)", newEmployee, function (err, res) {
            // If error, throw error
            if (err) throw err;
            // If no error, log the results in table format
            console.table(res);
            // Call the startQuestions function to ask the user what they would like to do next
            startQuestions();
        });
    });
}

// Function to create a new role
function createNewRole() {
    // Call Inquirer to ask the user questions
    inquirer.prompt([
        {
            type: "input",
            name: "newRole",
            message: "What is the new role called?"
        },
        {
            type: "input",
            name: "newSalary",
            message: "What is the new role's salary?"
        },
        {
            type: "input",
            name: "newDepartment",
            message: "What is the new role's department?"
        }
        // After asking the user questions, map the answers to the role table then insert the new role into the database
    ]).then(function (answer) {
        // Map the user's answers to the role table
        let newRole = {
            title: answer.newRole,
            salary: answer.newSalary,
            department_id: answer.newDepartment
        };
        // Insert the new role into the database
        connection.query("INSERT INTO role SET ?", newRole, function (err, res) {
            // If error, throw error
            if (err) throw err;
            // If no error, log the results in table format
            console.table(res);
            // Call the startQuestions function to ask the user what they would like to do next
            startQuestions();
        });
    });
}