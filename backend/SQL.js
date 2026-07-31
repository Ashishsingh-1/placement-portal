const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for SQL Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const sqlQuestionsBatch = [
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q1.** Which of the following best describes SQL?",
        options: [
            "A programming language for building applications", 
            "A query language used to manage relational databases", 
            "A scripting language for web development", 
            "An operating system for database servers"
        ], 
        correctAnswer: "A query language used to manage relational databases",
        explanation: "SQL (Structured Query Language) is specifically designed for storing, manipulating, and retrieving data in Relational Database Management Systems (RDBMS)."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q2.** Which of the following is NOT a Relational Database Management System (RDBMS)?",
        options: ["MySQL", "PostgreSQL", "Oracle Database", "MongoDB"], 
        correctAnswer: "MongoDB",
        explanation: "MongoDB is a NoSQL, document-oriented database. MySQL, PostgreSQL, and Oracle are all Relational Database Management Systems based on tables."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q3.** Which SQL statement is used to retrieve all records from the Employee table?",
        options: ["SELECT Employee;", "SELECT * FROM Employee;", "GET ALL FROM Employee;", "FETCH Employee;"], 
        correctAnswer: "SELECT * FROM Employee;",
        explanation: "The asterisk (*) acts as a wildcard character in SQL that instructs the database to return all columns from the specified table."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q4.** Which SQL keyword removes duplicate values from the result set?",
        options: ["UNIQUE", "DISTINCT", "FILTER", "REMOVE"], 
        correctAnswer: "DISTINCT",
        explanation: "The 'SELECT DISTINCT' statement is used to return only distinct (different) values, filtering out any duplicate rows in the result set."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q5.** Which clause is used to filter rows before displaying the result?",
        options: ["HAVING", "ORDER BY", "WHERE", "GROUP BY"], 
        correctAnswer: "WHERE",
        explanation: "The WHERE clause is used to filter records before any groupings take place, extracting only those records that fulfill a specified condition."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q6.** Which SQL clause is used to sort the result set?",
        options: ["GROUP BY", "SORT BY", "ORDER BY", "ARRANGE BY"], 
        correctAnswer: "ORDER BY",
        explanation: "The ORDER BY clause is used to sort the result-set in ascending (ASC) or descending (DESC) order based on one or more columns."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q7.** Which SQL statement returns only the Name column from the Employee table?",
        options: ["SELECT Name Employee;", "SELECT(Name) FROM Employee;", "SELECT Name FROM Employee;", "GET Name FROM Employee;"], 
        correctAnswer: "SELECT Name FROM Employee;",
        explanation: "To select a specific column, you specify the exact column name immediately after the SELECT keyword."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q8.** Which SQL operator is used to match a range of values?",
        options: ["BETWEEN", "IN", "EXISTS", "LIKE"], 
        correctAnswer: "BETWEEN",
        explanation: "The BETWEEN operator selects values within a given range. The values can be numbers, text, or dates, and the range is inclusive."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q9.** Which SQL operator is used to search for a pattern in a string?",
        options: ["MATCH", "SEARCH", "LIKE", "FIND"], 
        correctAnswer: "LIKE",
        explanation: "The LIKE operator is used in a WHERE clause to search for a specified pattern in a column, often alongside wildcards like '%' and '_'."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q10.** What will be returned by the following query? `SELECT DISTINCT City FROM Customer;`",
        options: ["All city names including duplicates", "Only unique city names", "Only NULL city values", "The number of cities"], 
        correctAnswer: "Only unique city names",
        explanation: "The DISTINCT keyword forces the query to return only unique values, skipping any repeated entries in the City column."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q11.** Which SQL clause is executed first logically?",
        options: ["ORDER BY", "GROUP BY", "WHERE", "SELECT"], 
        correctAnswer: "WHERE",
        explanation: "Logically, SQL execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY. Therefore, WHERE is executed before SELECT, GROUP BY, and ORDER BY."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q12.** Which SQL keyword is used to rename a column in the output?",
        options: ["AS", "RENAME", "CHANGE", "MODIFY"], 
        correctAnswer: "AS",
        explanation: "The AS keyword is used to assign an alias to a column or a table, making the column names more readable in the output."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q13.** Which query correctly displays the Salary column as 'Employee Salary'?",
        options: [
            "SELECT Salary RENAME Employee Salary FROM Employee;", 
            "SELECT Salary AS 'Employee Salary' FROM Employee;", 
            "SELECT Salary TO Employee Salary FROM Employee;", 
            "SELECT Employee Salary = Salary FROM Employee;"
        ], 
        correctAnswer: "SELECT Salary AS 'Employee Salary' FROM Employee;",
        explanation: "When an alias contains spaces, it must be enclosed in single or double quotes alongside the AS keyword."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q14.** Which SQL operator checks whether a value exists in a given list?",
        options: ["EXISTS", "BETWEEN", "IN", "LIKE"], 
        correctAnswer: "IN",
        explanation: "The IN operator allows you to specify multiple exact values in a WHERE clause, acting as a shorthand for multiple OR conditions."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q15.** Which of the following queries retrieves employees whose salary is greater than 50000?",
        options: [
            "SELECT * FROM Employee WHERE Salary > 50000;", 
            "SELECT Employee WHERE Salary > 50000;", 
            "GET * FROM Employee WHERE Salary > 50000;", 
            "SELECT * Employee Salary > 50000;"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE Salary > 50000;",
        explanation: "The '>' operator is the standard comparison operator used in the WHERE clause to find values strictly greater than a specified amount."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q16.** Which SQL clause is used to display only the first 5 rows from a table in databases like MySQL?",
        options: ["TOP 5", "LIMIT 5", "FIRST 5", "FETCH 5"], 
        correctAnswer: "LIMIT 5",
        explanation: "MySQL and PostgreSQL use the LIMIT clause to specify the maximum number of records to return. (Note: SQL Server uses TOP)."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q17.** Which query retrieves employees whose salary is between 30000 and 50000?",
        options: [
            "SELECT * FROM Employee WHERE Salary BETWEEN 30000 AND 50000;", 
            "SELECT * FROM Employee WHERE Salary IN (30000,50000);", 
            "SELECT * FROM Employee WHERE Salary > 30000 OR < 50000;", 
            "SELECT * FROM Employee WHERE Salary RANGE 30000 TO 50000;"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE Salary BETWEEN 30000 AND 50000;",
        explanation: "The BETWEEN operator is used alongside AND to fetch values that fall within a specified inclusive range."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q18.** Which operator is used to check whether a column value is NULL?",
        options: ["= NULL", "== NULL", "IS NULL", "NULL"], 
        correctAnswer: "IS NULL",
        explanation: "Because NULL represents a missing or unknown value, standard operators like '=' do not work. The IS NULL operator must be used."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q19.** Which query retrieves employees whose Email value is NOT NULL?",
        options: [
            "SELECT * FROM Employee WHERE Email != NULL;", 
            "SELECT * FROM Employee WHERE Email IS NOT NULL;", 
            "SELECT * FROM Employee WHERE NOT Email=NULL;", 
            "SELECT * FROM Employee WHERE Email <> NULL;"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE Email IS NOT NULL;",
        explanation: "To filter out NULL values, the specific syntax 'IS NOT NULL' must be used instead of standard comparison operators."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q20.** Which SQL operator is used to combine multiple conditions where ALL conditions must be true?",
        options: ["OR", "AND", "NOT", "XOR"], 
        correctAnswer: "AND",
        explanation: "The AND operator displays a record if all the conditions separated by AND evaluate to TRUE."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q21.** Which SQL operator returns rows if at least ONE condition is true?",
        options: ["AND", "NOT", "OR", "EXISTS"], 
        correctAnswer: "OR",
        explanation: "The OR operator displays a record if any one of the conditions separated by OR evaluates to TRUE."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q22.** Which query returns employees whose department is IT or HR?",
        options: [
            "SELECT * FROM Employee WHERE Department='IT' OR Department='HR';", 
            "SELECT * FROM Employee WHERE Department IN IT,HR;", 
            "SELECT * Employee Department='IT','HR';", 
            "SELECT * FROM Employee WHERE Department BETWEEN 'IT' AND 'HR';"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE Department='IT' OR Department='HR';",
        explanation: "Using the OR operator requires writing out the full condition (`Column = Value`) for each check, unless you use the IN clause formatted correctly as IN ('IT', 'HR')."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q23.** Which query retrieves employees whose names start with 'A'?",
        options: [
            "SELECT * FROM Employee WHERE Name='A%';", 
            "SELECT * FROM Employee WHERE Name LIKE 'A%';", 
            "SELECT * FROM Employee WHERE Name STARTS 'A';", 
            "SELECT * FROM Employee WHERE Name='%A';"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE Name LIKE 'A%';",
        explanation: "The LIKE operator combined with the '%' wildcard (which represents zero, one, or multiple characters) is used for pattern matching. 'A%' means starts with A."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q24.** Which query retrieves employees whose names end with 'n'?",
        options: [
            "SELECT * FROM Employee WHERE Name LIKE '%n';", 
            "SELECT * FROM Employee WHERE Name='n%';", 
            "SELECT * FROM Employee WHERE Name ENDS 'n';", 
            "SELECT * FROM Employee WHERE Name LIKE 'n%';"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE Name LIKE '%n';",
        explanation: "Placing the wildcard '%' before the letter 'n' ('%n') instructs SQL to find strings that have any sequence of characters but strictly end with 'n'."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q25.** Which wildcard represents exactly one character in SQL LIKE?",
        options: ["%", "*", "_", "#"], 
        correctAnswer: "_",
        explanation: "In SQL, the underscore (_) represents exactly one single character. The percent sign (%) represents zero or more characters."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q26.** Which SQL function returns the total number of rows?",
        options: ["SUM()", "COUNT()", "TOTAL()", "NUMBER()"], 
        correctAnswer: "COUNT()",
        explanation: "The COUNT() aggregate function returns the number of rows that match a specified criterion (e.g., COUNT(*))."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q27.** Which SQL function returns the highest value in a column?",
        options: ["TOP()", "HIGH()", "MAX()", "UPPER()"], 
        correctAnswer: "MAX()",
        explanation: "The MAX() aggregate function is used to find the maximum or highest value within a selected column."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q28.** Which SQL function returns the lowest value in a column?",
        options: ["LOW()", "LEAST()", "MIN()", "SMALL()"], 
        correctAnswer: "MIN()",
        explanation: "The MIN() function calculates the smallest value in a column, working on numbers, strings, and dates."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q29.** Which SQL function calculates the average value of a numeric column?",
        options: ["SUM()", "AVG()", "COUNT()", "MEAN()"], 
        correctAnswer: "AVG()",
        explanation: "The AVG() function returns the average mathematical value of a numeric column by adding all values and dividing by the row count."
    },
    {
        category: "SQL", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q30.** Which SQL function calculates the total sum of a numeric column?",
        options: ["TOTAL()", "SUM()", "ADD()", "AVG()"], 
        correctAnswer: "SUM()",
        explanation: "The SUM() aggregate function calculates and returns the total sum of all non-NULL numeric values in a column."
    }
];

const seedSQLQuestions = async () => {
    try {
        console.log("🧹 Clearing old SQL Fundamental records...");
        // Modified to clear based on new category and topic
        await Question.deleteMany({ category: "SQL", topic: "Fundamental" }); 
        
        console.log(`🚀 Injecting ${sqlQuestionsBatch.length} Formatted SQL Questions...`);
        await Question.insertMany(sqlQuestionsBatch);
        
        console.log(`✅ SUCCESS! All 30 SQL Fundamental Questions Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding SQL data:", error);
        process.exit(1);
    }
};

seedSQLQuestions();