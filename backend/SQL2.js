const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for SQL Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const sqlQuestionsBatch31to60 = [
    // ==================== PREVIOUS 15 QUESTIONS (Q31 - Q45) ====================
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q31.** Which SQL statement is used to insert a new record into a table?",
        options: [
            "ADD INTO Employee VALUES (101,'Rahul',50000);", 
            "INSERT INTO Employee VALUES (101,'Rahul',50000);", 
            "PUT INTO Employee VALUES (101,'Rahul',50000);", 
            "CREATE INTO Employee VALUES (101,'Rahul',50000);"
        ], 
        correctAnswer: "INSERT INTO Employee VALUES (101,'Rahul',50000);",
        explanation: "The `INSERT INTO` statement is the standard SQL command used to add new rows of data to a table in a database."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q32.** Which SQL statement updates the salary of an employee whose EmpID is 101?",
        options: [
            "UPDATE Employee SET Salary=60000 WHERE EmpID=101;", 
            "MODIFY Employee Salary=60000 WHERE EmpID=101;", 
            "CHANGE Employee SET Salary=60000 WHERE EmpID=101;", 
            "ALTER Employee Salary=60000 WHERE EmpID=101;"
        ], 
        correctAnswer: "UPDATE Employee SET Salary=60000 WHERE EmpID=101;",
        explanation: "The `UPDATE` statement is used alongside `SET` to modify existing records. The `WHERE` clause ensures only the specific employee's record is changed."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q33.** Which SQL statement deletes only the employee whose EmpID is 101?",
        options: [
            "DELETE Employee WHERE EmpID=101;", 
            "REMOVE FROM Employee WHERE EmpID=101;", 
            "DELETE FROM Employee WHERE EmpID=101;", 
            "DROP Employee WHERE EmpID=101;"
        ], 
        correctAnswer: "DELETE FROM Employee WHERE EmpID=101;",
        explanation: "The correct syntax for deleting rows is `DELETE FROM table_name`. Omitting 'FROM' is invalid in standard SQL, and `DROP` is used for structures, not rows."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q34.** Which SQL statement removes all records from a table but keeps the table structure?",
        options: [
            "DROP TABLE Employee;", 
            "TRUNCATE TABLE Employee;", 
            "DELETE DATABASE Employee;", 
            "REMOVE TABLE Employee;"
        ], 
        correctAnswer: "TRUNCATE TABLE Employee;",
        explanation: "`TRUNCATE TABLE` is a DDL command that quickly removes all rows from a table without logging individual row deletions, leaving the empty table structure intact."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q35.** Which SQL statement permanently removes both the table structure and its data?",
        options: [
            "DELETE TABLE Employee;", 
            "DROP TABLE Employee;", 
            "REMOVE TABLE Employee;", 
            "TRUNCATE TABLE Employee;"
        ], 
        correctAnswer: "DROP TABLE Employee;",
        explanation: "The `DROP TABLE` command completely removes the table definition, its data, indexes, triggers, and permissions from the database."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q36.** Which command is classified as a DDL (Data Definition Language) command?",
        options: ["SELECT", "INSERT", "CREATE", "UPDATE"], 
        correctAnswer: "CREATE",
        explanation: "DDL commands deal with database schemas and structures. `CREATE`, `ALTER`, and `DROP` are standard DDL commands."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q37.** Which of the following is a DML (Data Manipulation Language) command?",
        options: ["ALTER", "CREATE", "INSERT", "DROP"], 
        correctAnswer: "INSERT",
        explanation: "DML commands deal with the actual data inside the tables. `INSERT`, `UPDATE`, and `DELETE` are standard DML commands."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q38.** Which SQL command is used to modify the structure of an existing table?",
        options: [
            "ALTER TABLE Employee;", 
            "MODIFY TABLE Employee;", 
            "CHANGE TABLE Employee;", 
            "UPDATE TABLE Employee;"
        ], 
        correctAnswer: "ALTER TABLE Employee;",
        explanation: "The `ALTER TABLE` statement is used to add, delete, or modify columns in an existing table, as well as to add or drop constraints."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q39.** Which SQL statement adds a new column 'Email' to the Employee table?",
        options: [
            "ALTER TABLE Employee ADD Email VARCHAR(100);", 
            "UPDATE TABLE Employee ADD Email;", 
            "MODIFY TABLE Employee Email VARCHAR(100);", 
            "ADD COLUMN Employee Email VARCHAR(100);"
        ], 
        correctAnswer: "ALTER TABLE Employee ADD Email VARCHAR(100);",
        explanation: "To add a column, the `ALTER TABLE` command is used followed by the `ADD` keyword, the new column name, and its datatype."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q40.** Which SQL command removes a column from an existing table?",
        options: [
            "DELETE COLUMN Email;", 
            "DROP COLUMN Email;", 
            "ALTER TABLE Employee DROP COLUMN Email;", 
            "REMOVE COLUMN Email;"
        ], 
        correctAnswer: "ALTER TABLE Employee DROP COLUMN Email;",
        explanation: "To remove a column, you must alter the table structure using `ALTER TABLE table_name DROP COLUMN column_name`."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q41.** Which SQL clause is used to group rows having the same values?",
        options: ["ORDER BY", "GROUP BY", "HAVING", "DISTINCT"], 
        correctAnswer: "GROUP BY",
        explanation: "The `GROUP BY` statement groups rows that have the same values into summary rows, typically used with aggregate functions like COUNT, MAX, MIN, SUM, or AVG."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q42.** Which SQL clause is used to filter grouped records?",
        options: ["WHERE", "GROUP BY", "HAVING", "ORDER BY"], 
        correctAnswer: "HAVING",
        explanation: "The `HAVING` clause was added to SQL because the `WHERE` keyword cannot be used with aggregate functions. It applies conditions to the groups formed by `GROUP BY`."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q43.** Which query displays the total salary department-wise?",
        options: [
            "SELECT Department, SUM(Salary) FROM Employee GROUP BY Department;", 
            "SELECT Department, SUM(Salary) FROM Employee;", 
            "SELECT SUM(Salary) GROUP BY Department;", 
            "SELECT Department ORDER BY SUM(Salary);"
        ], 
        correctAnswer: "SELECT Department, SUM(Salary) FROM Employee GROUP BY Department;",
        explanation: "To get a per-department sum, you must select the department, use the `SUM()` aggregate function on the salary, and group the results by the department."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q44.** Which clause is executed after the GROUP BY clause logically?",
        options: ["WHERE", "HAVING", "SELECT", "FROM"], 
        correctAnswer: "HAVING",
        explanation: "The logical order of query execution in SQL is: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. Therefore, HAVING executes immediately after GROUP BY."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q45.** Which query displays departments having more than 5 employees?",
        options: [
            "SELECT Department FROM Employee WHERE COUNT(*)>5 GROUP BY Department;", 
            "SELECT Department FROM Employee GROUP BY Department HAVING COUNT(*)>5;", 
            "SELECT Department FROM Employee HAVING COUNT(*)>5;", 
            "SELECT Department FROM Employee ORDER BY COUNT(*)>5;"
        ], 
        correctAnswer: "SELECT Department FROM Employee GROUP BY Department HAVING COUNT(*)>5;",
        explanation: "Aggregate conditions like `COUNT(*) > 5` must be placed in the `HAVING` clause, which follows the `GROUP BY` clause. `WHERE` cannot evaluate aggregate functions."
    },

    // ==================== NEW 15 QUESTIONS (Q46 - Q60) ====================
    {
        category: "SQL", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q46.** Which SQL constraint uniquely identifies each record in a table?",
        options: ["FOREIGN KEY", "UNIQUE", "PRIMARY KEY", "CHECK"], 
        correctAnswer: "PRIMARY KEY",
        explanation: "The PRIMARY KEY constraint uniquely identifies each record in a table. It must contain unique values and cannot contain NULL values."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q47.** Which constraint prevents duplicate values but allows one or more NULL values (in most RDBMS)?",
        options: ["PRIMARY KEY", "UNIQUE", "CHECK", "NOT NULL"], 
        correctAnswer: "UNIQUE",
        explanation: "The UNIQUE constraint ensures all values in a column are different. Unlike PRIMARY KEY, a column with a UNIQUE constraint can typically hold NULL values."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q48.** Which constraint ensures that a column cannot contain NULL values?",
        options: ["DEFAULT", "CHECK", "NOT NULL", "UNIQUE"], 
        correctAnswer: "NOT NULL",
        explanation: "The NOT NULL constraint enforces a column to NOT accept NULL values, meaning you cannot insert or update a record without adding a value to this column."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q49.** Which SQL constraint establishes a relationship between two tables?",
        options: ["PRIMARY KEY", "UNIQUE", "FOREIGN KEY", "DEFAULT"], 
        correctAnswer: "FOREIGN KEY",
        explanation: "A FOREIGN KEY is used to link two tables together. It is a field in one table that refers to the PRIMARY KEY in another table."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q50.** Which constraint ensures that all values in a column satisfy a specified condition?",
        options: ["CHECK", "DEFAULT", "UNIQUE", "INDEX"], 
        correctAnswer: "CHECK",
        explanation: "The CHECK constraint is used to limit the value range that can be placed in a column. If a value fails the check condition, the record is not inserted."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q51.** Which SQL constraint automatically assigns a default value if no value is provided during insertion?",
        options: ["CHECK", "DEFAULT", "UNIQUE", "NOT NULL"], 
        correctAnswer: "DEFAULT",
        explanation: "The DEFAULT constraint provides a default value for a column. The default value will be added to all new records if no other value is specified."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q52.** Which of the following is NOT a valid standard SQL constraint name?",
        options: ["PRIMARY KEY", "CHECK", "DEFAULT", "REFERENCE"], 
        correctAnswer: "REFERENCE",
        explanation: "While 'REFERENCES' is a keyword used when defining a FOREIGN KEY, 'REFERENCE' itself is not a standalone constraint type like CHECK, DEFAULT, or PRIMARY KEY."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q53.** A table can have ______ Primary Key(s).",
        options: ["Zero only", "One only", "Two", "Unlimited"], 
        correctAnswer: "One only",
        explanation: "A relational database table can have a maximum of one PRIMARY KEY constraint. (Note: This single key can be made up of multiple columns, known as a composite key)."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q54.** A table can have ______ Foreign Key(s).",
        options: ["One only", "Two only", "Unlimited", "Zero only"], 
        correctAnswer: "Unlimited",
        explanation: "Theoretically, a table can have an unlimited number of FOREIGN KEY constraints, allowing it to relate to many other tables (though practical limits are set by specific RDBMS software)."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q55.** Which join returns only the rows that have matching values in both tables?",
        options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"], 
        correctAnswer: "INNER JOIN",
        explanation: "The INNER JOIN keyword selects records that have matching values in both the tables being joined."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q56.** Which join returns all rows from the left table and the matching rows from the right table?",
        options: ["RIGHT JOIN", "INNER JOIN", "LEFT JOIN", "CROSS JOIN"], 
        correctAnswer: "LEFT JOIN",
        explanation: "The LEFT JOIN (or LEFT OUTER JOIN) returns all records from the left table, and the matched records from the right table. Non-matching rows will contain NULLs for the right table's columns."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q57.** Which join returns all rows from the right table and the matching rows from the left table?",
        options: ["RIGHT JOIN", "LEFT JOIN", "INNER JOIN", "SELF JOIN"], 
        correctAnswer: "RIGHT JOIN",
        explanation: "The RIGHT JOIN (or RIGHT OUTER JOIN) returns all records from the right table, and the matched records from the left table."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q58.** Which join returns all rows from both tables, whether a match exists or not?",
        options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], 
        correctAnswer: "FULL OUTER JOIN",
        explanation: "The FULL OUTER JOIN returns all records when there is a match in either left or right table records. It acts as a combination of LEFT and RIGHT joins."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q59.** Which join returns the Cartesian Product of two tables?",
        options: ["INNER JOIN", "CROSS JOIN", "SELF JOIN", "NATURAL JOIN"], 
        correctAnswer: "CROSS JOIN",
        explanation: "A CROSS JOIN returns the Cartesian product of rows from tables in the join. It multiplies every row in the first table with every row in the second table."
    },
    {
        category: "SQL", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q60.** Which join is used when a table is joined with itself?",
        options: ["CROSS JOIN", "NATURAL JOIN", "SELF JOIN", "FULL JOIN"], 
        correctAnswer: "SELF JOIN",
        explanation: "A SELF JOIN is a regular join, but the table is joined with itself. It is useful for querying hierarchical data or comparing rows within the same table."
    }
];

const seedSQLQuestionsBatch31to60 = async () => {
    try {
        // Comment out deleteMany if you don't want to wipe Q1-Q30! 
        // If you want to wipe the whole DB and just have these 30, uncomment the next line.
        await Question.deleteMany({ category: "SQL", topic: "Intermediate" }); 
        
        console.log(`🚀 Injecting ${sqlQuestionsBatch31to60.length} Formatted SQL Questions (Q31-Q60)...`);
        await Question.insertMany(sqlQuestionsBatch31to60);
        
        console.log(`✅ SUCCESS! Questions 31 to 60 Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding SQL data:", error);
        process.exit(1);
    }
};

seedSQLQuestionsBatch31to60();