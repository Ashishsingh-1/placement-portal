const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for SQL Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const sqlQuestionsBatch61to91 = [
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q61.** Given the tables: Employee(EmpID, Name, DeptID, Salary). Which query returns employees whose salary is greater than the average salary of their own department?",
        options: [
            "SELECT Name FROM Employee e WHERE Salary > (SELECT AVG(Salary) FROM Employee WHERE DeptID=e.DeptID);", 
            "SELECT Name FROM Employee WHERE Salary > (SELECT AVG(Salary) FROM Employee);", 
            "SELECT Name FROM Employee GROUP BY DeptID;", 
            "SELECT Name FROM Employee HAVING Salary>AVG(Salary);"
        ], 
        correctAnswer: "SELECT Name FROM Employee e WHERE Salary > (SELECT AVG(Salary) FROM Employee WHERE DeptID=e.DeptID);",
        explanation: "This requires a 'Correlated Subquery'. The inner query calculates the average salary for the specific department of the current row (e.DeptID) being evaluated by the outer query."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q62.** Which query correctly returns the second highest distinct salary?",
        options: [
            "SELECT MAX(Salary) FROM Employee WHERE Salary < (SELECT MAX(Salary) FROM Employee);", 
            "SELECT Salary FROM Employee ORDER BY Salary DESC LIMIT 1 OFFSET 1;", 
            "SELECT MIN(Salary) FROM Employee;", 
            "SELECT Salary FROM Employee WHERE Salary=(SELECT AVG(Salary) FROM Employee);"
        ], 
        correctAnswer: "SELECT MAX(Salary) FROM Employee WHERE Salary < (SELECT MAX(Salary) FROM Employee);",
        explanation: "This nested query first finds the highest salary, and then the outer query finds the maximum salary that is strictly less than that highest salary, effectively giving the second highest."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q63.** The Employee table contains duplicate salaries. Which query correctly returns the third highest distinct salary?",
        options: [
            "SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC LIMIT 1 OFFSET 2;", 
            "SELECT Salary FROM Employee LIMIT 3;", 
            "SELECT MAX(Salary) FROM Employee;", 
            "SELECT Salary FROM Employee ORDER BY Salary;"
        ], 
        correctAnswer: "SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC LIMIT 1 OFFSET 2;",
        explanation: "Using DISTINCT ensures duplicate salaries are ignored. ORDER BY DESC sorts them highest to lowest. OFFSET 2 skips the top 2, and LIMIT 1 returns the 3rd."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q64.** Which query returns departments having more employees than the average number of employees per department?",
        options: [
            "SELECT DeptID FROM Employee GROUP BY DeptID HAVING COUNT(*) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) cnt FROM Employee GROUP BY DeptID) t);", 
            "SELECT DeptID FROM Employee WHERE COUNT(*)>AVG(COUNT(*));", 
            "SELECT DeptID FROM Employee ORDER BY COUNT(*);", 
            "SELECT DeptID FROM Employee GROUP BY Salary;"
        ], 
        correctAnswer: "SELECT DeptID FROM Employee GROUP BY DeptID HAVING COUNT(*) > (SELECT AVG(cnt) FROM (SELECT COUNT(*) cnt FROM Employee GROUP BY DeptID) t);",
        explanation: "You first need a derived table (subquery) to calculate the count per department, average those counts, and then compare each department's count against that average in the HAVING clause."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q65.** Which query returns employees who work in departments located in Delhi?\nTables: Employee(EmpID,DeptID) and Department(DeptID,Location)",
        options: [
            "SELECT * FROM Employee WHERE DeptID IN (SELECT DeptID FROM Department WHERE Location='Delhi');", 
            "SELECT * FROM Employee WHERE Location='Delhi';", 
            "SELECT * FROM Department WHERE DeptID=Employee.DeptID;", 
            "SELECT * FROM Employee GROUP BY DeptID;"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE DeptID IN (SELECT DeptID FROM Department WHERE Location='Delhi');",
        explanation: "The subquery fetches the DeptIDs where the location is Delhi. The main query then fetches employees whose DeptID is IN that list."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q66.** Which query returns departments having no employees?",
        options: [
            "SELECT d.* FROM Department d LEFT JOIN Employee e ON d.DeptID=e.DeptID WHERE e.EmpID IS NULL;", 
            "SELECT * FROM Employee;", 
            "SELECT * FROM Department INNER JOIN Employee;", 
            "SELECT * FROM Department WHERE DeptID IS NOT NULL;"
        ], 
        correctAnswer: "SELECT d.* FROM Department d LEFT JOIN Employee e ON d.DeptID=e.DeptID WHERE e.EmpID IS NULL;",
        explanation: "A LEFT JOIN includes all departments. If a department has no employees, the employee columns (like e.EmpID) will be NULL, which is then filtered by the WHERE clause."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q67.** Which query returns employees whose salary is equal to the maximum salary of their department?",
        options: [
            "SELECT * FROM Employee e WHERE Salary = (SELECT MAX(Salary) FROM Employee WHERE DeptID=e.DeptID);", 
            "SELECT * FROM Employee WHERE Salary = (SELECT MAX(Salary) FROM Employee);", 
            "SELECT * FROM Employee GROUP BY DeptID;", 
            "SELECT * FROM Employee ORDER BY Salary DESC;"
        ], 
        correctAnswer: "SELECT * FROM Employee e WHERE Salary = (SELECT MAX(Salary) FROM Employee WHERE DeptID=e.DeptID);",
        explanation: "A correlated subquery is used to calculate the MAX(Salary) strictly for the department (DeptID) of the row currently being evaluated."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q68.** Which query correctly identifies duplicate email addresses?",
        options: [
            "SELECT Email FROM Employee GROUP BY Email HAVING COUNT(*) > 1;", 
            "SELECT DISTINCT Email FROM Employee;", 
            "SELECT Email FROM Employee;", 
            "SELECT COUNT(Email) FROM Employee;"
        ], 
        correctAnswer: "SELECT Email FROM Employee GROUP BY Email HAVING COUNT(*) > 1;",
        explanation: "By grouping by Email, we can count occurrences. The HAVING clause then filters out unique emails, leaving only those with a count strictly greater than 1."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q69.** Which query returns the department with the highest average salary?",
        options: [
            "SELECT DeptID FROM Employee GROUP BY DeptID ORDER BY AVG(Salary) DESC LIMIT 1;", 
            "SELECT MAX(Salary) FROM Employee;", 
            "SELECT DeptID FROM Employee;", 
            "SELECT AVG(Salary) FROM Employee;"
        ], 
        correctAnswer: "SELECT DeptID FROM Employee GROUP BY DeptID ORDER BY AVG(Salary) DESC LIMIT 1;",
        explanation: "This groups salaries by DeptID, calculates the average, orders them in descending order (highest first), and uses LIMIT 1 to pick only the top one."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q70.** Which query returns employees who have the same salary as at least one other employee?",
        options: [
            "SELECT * FROM Employee WHERE Salary IN (SELECT Salary FROM Employee GROUP BY Salary HAVING COUNT(*) > 1);", 
            "SELECT * FROM Employee WHERE Salary = (SELECT MAX(Salary) FROM Employee);", 
            "SELECT DISTINCT Salary FROM Employee;", 
            "SELECT * FROM Employee ORDER BY Salary;"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE Salary IN (SELECT Salary FROM Employee GROUP BY Salary HAVING COUNT(*) > 1);",
        explanation: "The subquery identifies salaries that appear more than once. The main query then fetches the complete employee records that match any of those duplicated salaries."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q71.** Consider the query:\n`SELECT DeptID, COUNT(*) FROM Employee WHERE Salary > 50000 GROUP BY DeptID HAVING COUNT(*) >= 3;`\nWhich statement is correct?",
        options: [
            "It returns departments having at least 3 employees with salary greater than 50000.", 
            "It returns departments having total salary greater than 50000.", 
            "It returns all employees earning more than 50000.", 
            "The query is invalid because HAVING cannot be used with COUNT()."
        ], 
        correctAnswer: "It returns departments having at least 3 employees with salary greater than 50000.",
        explanation: "The WHERE clause first filters for employees earning > 50000. Then it groups them by department. Finally, HAVING ensures only departments with 3 or more such employees are shown."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q72.** Which query returns employees who work in departments where every employee earns more than ₹40,000?",
        options: [
            "SELECT DeptID FROM Employee GROUP BY DeptID HAVING MIN(Salary) > 40000;", 
            "SELECT DeptID FROM Employee WHERE Salary > 40000;", 
            "SELECT DISTINCT DeptID FROM Employee WHERE Salary > 40000;", 
            "SELECT DeptID FROM Employee HAVING Salary > 40000;"
        ], 
        correctAnswer: "SELECT DeptID FROM Employee GROUP BY DeptID HAVING MIN(Salary) > 40000;",
        explanation: "If the minimum salary in a department is strictly greater than 40,000, it mathematically guarantees that EVERY employee in that department earns more than 40,000."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q73.** Consider the query using an IN subquery. If the subquery returns duplicate DeptID values, what happens?",
        options: [
            "Duplicate rows are returned.", 
            "The query throws an error.", 
            "Duplicate values in the subquery do not affect the final result.", 
            "Only the first matching value is considered."
        ], 
        correctAnswer: "Duplicate values in the subquery do not affect the final result.",
        explanation: "The IN operator acts like a boolean set check (Does X exist in this list?). Multiple identical values in the subquery list do not duplicate the outer query's results."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q74.** Which query returns the employee(s) who joined earliest in each department?",
        options: [
            "SELECT * FROM Employee e WHERE JoinDate = (SELECT MIN(JoinDate) FROM Employee WHERE DeptID=e.DeptID);", 
            "SELECT * FROM Employee ORDER BY JoinDate;", 
            "SELECT MIN(JoinDate) FROM Employee;", 
            "SELECT * FROM Employee GROUP BY DeptID;"
        ], 
        correctAnswer: "SELECT * FROM Employee e WHERE JoinDate = (SELECT MIN(JoinDate) FROM Employee WHERE DeptID=e.DeptID);",
        explanation: "A correlated subquery compares each employee's JoinDate to the absolute MIN(JoinDate) of their specific department."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q75.** Which query correctly identifies departments whose average salary is higher than the company's overall average salary?",
        options: [
            "SELECT DeptID FROM Employee GROUP BY DeptID HAVING AVG(Salary) > (SELECT AVG(Salary) FROM Employee);", 
            "SELECT DeptID FROM Employee WHERE AVG(Salary) > (SELECT AVG(Salary) FROM Employee);", 
            "SELECT AVG(Salary) FROM Employee;", 
            "SELECT DeptID FROM Employee ORDER BY AVG(Salary);"
        ], 
        correctAnswer: "SELECT DeptID FROM Employee GROUP BY DeptID HAVING AVG(Salary) > (SELECT AVG(Salary) FROM Employee);",
        explanation: "The outer query groups by DeptID and calculates the local average, while the uncorrelated subquery inside the HAVING clause fetches the global average for comparison."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q76.** Which query returns employees who do not share their salary with any other employee?",
        options: [
            "SELECT * FROM Employee WHERE Salary IN (SELECT Salary FROM Employee GROUP BY Salary HAVING COUNT(*) = 1);", 
            "SELECT DISTINCT Salary FROM Employee;", 
            "SELECT Salary FROM Employee GROUP BY Salary;", 
            "SELECT * FROM Employee;"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE Salary IN (SELECT Salary FROM Employee GROUP BY Salary HAVING COUNT(*) = 1);",
        explanation: "The subquery finds salaries that exist exactly once (COUNT = 1). The main query then fetches the employee records that have those unique salaries."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q77.** Which query correctly finds departments having both male and female employees?",
        options: [
            "SELECT DeptID FROM Employee GROUP BY DeptID HAVING COUNT(DISTINCT Gender) = 2;", 
            "SELECT DeptID FROM Employee WHERE Gender='Male' OR Gender='Female';", 
            "SELECT DISTINCT DeptID FROM Employee;", 
            "SELECT DeptID FROM Employee GROUP BY Gender;"
        ], 
        correctAnswer: "SELECT DeptID FROM Employee GROUP BY DeptID HAVING COUNT(DISTINCT Gender) = 2;",
        explanation: "Assuming Gender has two values (Male/Female), a department that has both will have exactly 2 distinct gender values when grouped."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q78.** Which SQL feature is most suitable for returning employees whose salary is among the top 10% salaries in the company?",
        options: [
            "Using NTILE() window function", 
            "Using only DISTINCT", 
            "Using only GROUP BY", 
            "Using only ORDER BY"
        ], 
        correctAnswer: "Using NTILE() window function",
        explanation: "The NTILE(10) window function divides the sorted result set into 10 equal groups (percentiles). You can then select the top bucket to get the top 10%."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q79.** Which SQL feature is most suitable for assigning consecutive numbers to rows without skipping numbers, even when duplicate values exist?",
        options: ["RANK()", "DENSE_RANK()", "ROW_NUMBER()", "COUNT()"], 
        correctAnswer: "DENSE_RANK()",
        explanation: "Unlike RANK() which skips numbers after ties (e.g., 1, 2, 2, 4), DENSE_RANK() assigns consecutive ranks without gaps (e.g., 1, 2, 2, 3)."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q80.** A query repeatedly filters data using columns (DeptID, Salary) together. Which indexing strategy is generally the most effective?",
        options: [
            "Index only on Salary", 
            "Composite Index on (DeptID, Salary)", 
            "Index only on DeptID", 
            "No Index"
        ], 
        correctAnswer: "Composite Index on (DeptID, Salary)",
        explanation: "A composite index on multiple columns allows the database engine to quickly filter out rows matching combinations of those columns simultaneously."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q81.** A table contains 10 million records. A query filters on EmpID, which is the Primary Key. Which statement is generally correct?",
        options: [
            "A Full Table Scan is always performed.", 
            "A Primary Key index can significantly reduce lookup time.", 
            "Indexes have no effect on SELECT queries.", 
            "SQL always ignores indexes on Primary Keys."
        ], 
        correctAnswer: "A Primary Key index can significantly reduce lookup time.",
        explanation: "Primary Keys automatically create a unique index (often clustered). Using this index changes an O(N) full table scan into an O(log N) fast lookup."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q82.** Given the Employee table:\n\n| EmpID | Name | DeptID | Salary |\n|---|---|---|---|\n| 1 | A | 10 | 50000 |\n| 2 | B | 10 | 50000 |\n| 3 | C | 20 | 60000 |\n| 4 | D | 20 | 70000 |\n\nWhat will be the output of the query: `SELECT DeptID, COUNT(DISTINCT Salary) FROM Employee GROUP BY DeptID;`?",
        options: [
            "10: 1, 20: 2", 
            "10: 2, 20: 2", 
            "10: 1, 20: 1", 
            "10: 2, 20: 1"
        ], 
        correctAnswer: "10: 1, 20: 2",
        explanation: "Dept 10 has two employees but both earn 50000 (1 distinct salary). Dept 20 has salaries 60000 and 70000 (2 distinct salaries)."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q83.** Which query correctly returns the highest-paid employee from every department, including ties?",
        options: [
            "SELECT * FROM Employee e WHERE Salary = (SELECT MAX(Salary) FROM Employee WHERE DeptID=e.DeptID);", 
            "SELECT * FROM Employee ORDER BY Salary DESC LIMIT 1;", 
            "SELECT DeptID,MAX(Salary) FROM Employee;", 
            "SELECT * FROM Employee GROUP BY DeptID;"
        ], 
        correctAnswer: "SELECT * FROM Employee e WHERE Salary = (SELECT MAX(Salary) FROM Employee WHERE DeptID=e.DeptID);",
        explanation: "By comparing the employee's salary to the specific maximum of their department via a correlated subquery, ties (two max salaries) are natively included."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q84.** Consider the query: `SELECT COUNT(*) FROM Employee WHERE Salary > ALL (SELECT Salary FROM Employee WHERE DeptID=30);` If Department 30 contains no employees, what is the result?",
        options: [
            "Returns 0", 
            "Returns all rows", 
            "SQL Error", 
            "NULL"
        ], 
        correctAnswer: "Returns all rows",
        explanation: "In SQL, comparing a value against an empty set using '> ALL' evaluates to TRUE for every row. Thus, it filters nothing and returns the total count of the table."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q85.** Which query returns departments where the difference between the highest and lowest salary exceeds ₹50,000?",
        options: [
            "SELECT DeptID FROM Employee GROUP BY DeptID HAVING MAX(Salary)-MIN(Salary) > 50000;", 
            "SELECT DeptID FROM Employee WHERE MAX(Salary)-MIN(Salary) > 50000;", 
            "SELECT DeptID FROM Employee ORDER BY Salary;", 
            "SELECT MAX(Salary)-MIN(Salary) FROM Employee;"
        ], 
        correctAnswer: "SELECT DeptID FROM Employee GROUP BY DeptID HAVING MAX(Salary)-MIN(Salary) > 50000;",
        explanation: "You must first GROUP BY the department, and then apply the aggregate difference calculation (MAX minus MIN) inside the HAVING clause."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q86.** Which query returns employees whose salary is greater than the average salary of EVERY department?",
        options: [
            "SELECT * FROM Employee WHERE Salary > ALL (SELECT AVG(Salary) FROM Employee GROUP BY DeptID);", 
            "SELECT * FROM Employee WHERE Salary > ANY (SELECT AVG(Salary) FROM Employee GROUP BY DeptID);", 
            "SELECT * FROM Employee GROUP BY DeptID;", 
            "SELECT * FROM Employee ORDER BY Salary;"
        ], 
        correctAnswer: "SELECT * FROM Employee WHERE Salary > ALL (SELECT AVG(Salary) FROM Employee GROUP BY DeptID);",
        explanation: "The ALL operator ensures the condition (Salary >) is true for ALL the values returned by the subquery (the list of department averages)."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q87.** Consider the query: `HAVING SUM(Salary) > (SELECT AVG(Salary) FROM Employee);` What does the HAVING clause compare?",
        options: [
            "Department salary with company average salary", 
            "Department total salary with company average employee salary", 
            "Maximum salary with average salary", 
            "Department count with average salary"
        ], 
        correctAnswer: "Department total salary with company average employee salary",
        explanation: "SUM(Salary) computes the total combined salary of a specific group (department), while the subquery returns the overall mean salary of a single employee across the company."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q88.** Which SQL function is most suitable for assigning the same rank to equal salaries while NOT skipping the next rank?",
        options: ["ROW_NUMBER()", "RANK()", "DENSE_RANK()", "NTILE()"], 
        correctAnswer: "DENSE_RANK()",
        explanation: "DENSE_RANK() avoids skipping numbers in a sequence when there are ties. For example, if two employees tie for 1st, the next employee is ranked 2nd."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q89.** Which SQL construct is primarily used to improve the readability of complex queries by defining temporary named result sets?",
        options: ["VIEW", "TRIGGER", "CTE (Common Table Expression)", "CURSOR"], 
        correctAnswer: "CTE (Common Table Expression)",
        explanation: "CTEs (using the WITH clause) allow you to name a temporary result set, making complex queries structured and much easier to read than nested subqueries."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q90.** Which query returns employees whose salary is higher than the average salary of employees having the same designation?",
        options: [
            "SELECT * FROM Employee e WHERE Salary > (SELECT AVG(Salary) FROM Employee WHERE Designation=e.Designation);", 
            "SELECT * FROM Employee WHERE Salary > (SELECT AVG(Salary) FROM Employee);", 
            "SELECT * FROM Employee GROUP BY Designation;", 
            "SELECT * FROM Employee ORDER BY Designation;"
        ], 
        correctAnswer: "SELECT * FROM Employee e WHERE Salary > (SELECT AVG(Salary) FROM Employee WHERE Designation=e.Designation);",
        explanation: "This is a correlated subquery, similar to matching by department, but here it matches e.Designation against the inner query's Designation to find the relevant average."
    },
    {
        category: "SQL", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q91.** A table contains 50 million rows. Most queries are: `SELECT * FROM Orders WHERE CustomerID=? AND OrderDate BETWEEN ? AND ?;` Which indexing strategy is generally the best choice?",
        options: [
            "Index on OrderDate only", 
            "Index on CustomerID only", 
            "Composite Index on (CustomerID, OrderDate)", 
            "No Index"
        ], 
        correctAnswer: "Composite Index on (CustomerID, OrderDate)",
        explanation: "A composite index optimizes queries checking both columns. Putting the exact match (CustomerID) first and the range match (OrderDate) second is the most efficient indexing pattern."
    }
];

const seedSQLQuestionsBatch61to91 = async () => {
    try {
        // Comment out if you don't want to clear previous entries!
        // await Question.deleteMany({ category: "SQL", topic: "Advanced" }); 
        
        console.log(`🚀 Injecting ${sqlQuestionsBatch61to91.length} Advanced SQL Questions...`);
        await Question.insertMany(sqlQuestionsBatch61to91);
        
        console.log(`✅ SUCCESS! Questions 61 to 91 Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding SQL data:", error);
        process.exit(1);
    }
};

seedSQLQuestionsBatch61to91();