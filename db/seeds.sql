INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 125000, 1),
    ('Salesperson', 75000, 1),
    ('Lead Software Engineer', 175000, 2),
    ('Software Engineer', 120000, 2),
    ('Accountant', 125000, 3),
    ('Lead Attorney', 250000, 4),
    ('Attorney', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Indiana', 'Jones', 1),
    ('Rick', 'Dalton', 2),
    ('Cliff', 'Booth', 2),
    ('Optimus', 'Prime', 3),
    ('Bilbo', 'Baggins', 4),
    ('Samwell', 'Tarly', 4),
    ('Petyr', 'Baelish', 5),
    ('Christian', 'Wolff', 5),
    ('Leo', 'McGary', 6),
    ('Samuel', 'Seaborn', 7),
    ('Josh', 'Lyman', 7);

UPDATE employee SET manager_id = 1 where id = 2 or id = 3;
UPDATE employee SET manager_id = 4 where id = 5 or id = 6;
UPDATE employee SET manager_id = 9 where id = 10 or id = 11;