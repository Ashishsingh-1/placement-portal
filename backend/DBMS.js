const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for DBMS Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const dbmsQuestionsBatch1to15 = [
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q1.** Which of the following best describes the primary purpose of a DBMS?",
        options: [
            "To create web applications", 
            "To efficiently store, retrieve, update, and manage data", 
            "To execute operating system processes", 
            "To compile programming languages"
        ], 
        correctAnswer: "To efficiently store, retrieve, update, and manage data",
        explanation: "A Database Management System (DBMS) is software designed to store, retrieve, define, and manage data in a database efficiently and securely while providing interfaces for users and applications."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q2.** Which feature of a DBMS ensures that the same data is not unnecessarily stored multiple times?",
        options: [
            "Data Redundancy", 
            "Data Independence", 
            "Data Integrity", 
            "Data Abstraction"
        ], 
        correctAnswer: "Data Redundancy",
        explanation: "One of the major advantages of a DBMS is the control and reduction of 'Data Redundancy' (duplication of data), which saves storage space and prevents data inconsistency."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q3.** Which of the following is NOT a responsibility of a DBMS?",
        options: [
            "Managing concurrent access", 
            "Enforcing security constraints", 
            "Managing database recovery", 
            "Compiling Java source code"
        ], 
        correctAnswer: "Compiling Java source code",
        explanation: "A DBMS handles data storage, security, concurrency, and recovery. Compiling application code like Java is the job of a compiler (e.g., javac), not the database management system."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q4.** Which level of database architecture describes how the data is physically stored on disk?",
        options: [
            "External Level", 
            "Conceptual Level", 
            "Internal Level", 
            "View Level"
        ], 
        correctAnswer: "Internal Level",
        explanation: "In the 3-schema architecture, the Internal (or Physical) level describes the physical storage structure of the database, dealing with bytes, blocks, and exact file locations on the disk."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q5.** In the Three-Schema Architecture, which level represents the overall logical structure of the database?",
        options: [
            "Internal Level", 
            "External Level", 
            "Conceptual Level", 
            "Physical Level"
        ], 
        correctAnswer: "Conceptual Level",
        explanation: "The Conceptual (or Logical) level describes what data is stored in the entire database and the relationships among that data, completely hiding the physical storage details."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q6.** Which type of data independence allows changes in the physical storage without affecting the logical schema?",
        options: [
            "Logical Data Independence", 
            "Physical Data Independence", 
            "Structural Independence", 
            "External Independence"
        ], 
        correctAnswer: "Physical Data Independence",
        explanation: "Physical Data Independence is the ability to change the physical schema (like upgrading storage devices or changing indexing strategies) without having to change the conceptual/logical schema."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q7.** Which type of data independence allows changes in the conceptual schema without affecting user views?",
        options: [
            "Logical Data Independence", 
            "Physical Data Independence", 
            "Storage Independence", 
            "Index Independence"
        ], 
        correctAnswer: "Logical Data Independence",
        explanation: "Logical Data Independence is the capacity to change the conceptual schema (like adding or removing entities/attributes) without having to rewrite application programs or change external user views."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q8.** A university database stores Students, Courses, and Enrollments. Which of the following is most likely an Entity?",
        options: [
            "Student Name", 
            "Student", 
            "Student ID", 
            "Age"
        ], 
        correctAnswer: "Student",
        explanation: "An Entity is a real-world object or concept that exists independently (like a Student or a Course). 'Student Name', 'Student ID', and 'Age' are attributes that describe the Student entity."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q9.** Which of the following is an example of a Multivalued Attribute?",
        options: [
            "Roll Number", 
            "Date of Birth", 
            "Phone Numbers", 
            "Gender"
        ], 
        correctAnswer: "Phone Numbers",
        explanation: "A multivalued attribute can have more than one value for a single entity instance. A person can have multiple phone numbers, whereas they strictly have one Date of Birth or Roll Number."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q10.** Which attribute uniquely identifies every entity occurrence in an entity set?",
        options: [
            "Composite Attribute", 
            "Derived Attribute", 
            "Key Attribute", 
            "Multivalued Attribute"
        ], 
        correctAnswer: "Key Attribute",
        explanation: "A Key Attribute (or Primary Key) is specifically designated to uniquely identify each instance (or record/row) within an entity set."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q11.** Which key is selected from the candidate keys to uniquely identify tuples in a relation?",
        options: [
            "Super Key", 
            "Alternate Key", 
            "Foreign Key", 
            "Primary Key"
        ], 
        correctAnswer: "Primary Key",
        explanation: "A table can have multiple Candidate Keys that can uniquely identify a row. The database designer selects exactly one of these to serve as the main identifier, which is called the Primary Key."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q12.** Which of the following can uniquely identify a row but may contain unnecessary attributes?",
        options: [
            "Candidate Key", 
            "Super Key", 
            "Alternate Key", 
            "Foreign Key"
        ], 
        correctAnswer: "Super Key",
        explanation: "A Super Key is any combination of attributes that can uniquely identify a row. However, it may contain extra, unnecessary attributes. When a Super Key is minimal (no extra attributes), it becomes a Candidate Key."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q13.** If a relation has three candidate keys, how many alternate keys can it have?",
        options: ["1", "2", "3", "4"], 
        correctAnswer: "2",
        explanation: "Out of all Candidate Keys, only one is chosen as the Primary Key. The remaining Candidate Keys (3 total - 1 primary = 2) automatically become Alternate Keys."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q14.** A Foreign Key is primarily used to:",
        options: [
            "Improve query performance", 
            "Establish relationships between tables", 
            "Eliminate duplicate rows", 
            "Sort records automatically"
        ], 
        correctAnswer: "Establish relationships between tables",
        explanation: "A Foreign Key is an attribute in one table that references the Primary Key of another table. Its main purpose is to enforce referential integrity and establish a link (relationship) between the two tables."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q15.** Which of the following statements about a Primary Key is correct?",
        options: [
            "It can contain duplicate values.", 
            "It can contain NULL values.", 
            "It uniquely identifies each record in a table.", 
            "A table can have multiple Primary Keys."
        ], 
        correctAnswer: "It uniquely identifies each record in a table.",
        explanation: "A Primary Key must strictly contain unique values, cannot contain NULL values, and a table is restricted to having only one Primary Key constraint."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q16.** Consider the relation: Employee(EmpID, Email, AadhaarNo, Name, Salary). If both Email and AadhaarNo uniquely identify every employee, then which of the following is true?",
        options: [
            "Both are Primary Keys", 
            "Both are Candidate Keys", 
            "Both are Foreign Keys", 
            "Both are Alternate Keys"
        ], 
        correctAnswer: "Both are Candidate Keys",
        explanation: "Any attribute or combination of attributes that can uniquely identify a row is a Candidate Key. A table can have multiple Candidate Keys, but only one can be selected as the Primary Key."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q17.** Which of the following is always a subset of every Super Key?",
        options: [
            "Alternate Key", 
            "Candidate Key", 
            "Foreign Key", 
            "Composite Key"
        ], 
        correctAnswer: "Candidate Key",
        explanation: "A Candidate Key is formally defined as a 'minimal Super Key'. This means that every Super Key contains at least one Candidate Key as its subset."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q18.** Consider the relations: Student(StudentID, Name, DeptID) and Department(DeptID, DeptName). Which attribute acts as the Foreign Key?",
        options: [
            "StudentID", 
            "DeptName", 
            "DeptID in Student", 
            "DeptID in Department"
        ], 
        correctAnswer: "DeptID in Student",
        explanation: "DeptID in the Student table acts as a Foreign Key because it references the primary key (DeptID) of the Department table to establish a relationship between the two."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q19.** Which statement is TRUE regarding Candidate Keys?",
        options: [
            "Candidate Keys can contain duplicate values.", 
            "Every Candidate Key is a Super Key.", 
            "Every Super Key is a Candidate Key.", 
            "Candidate Keys may contain NULL values."
        ], 
        correctAnswer: "Every Candidate Key is a Super Key.",
        explanation: "Because a Super Key is any set of attributes that uniquely identifies a row, a Candidate Key (which does exactly that but with minimal attributes) is naturally also a Super Key."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q20.** Which of the following is the minimum requirement for a Candidate Key?",
        options: [
            "It should contain at least two attributes.", 
            "It must uniquely identify each tuple without redundant attributes.", 
            "It should always be numeric.", 
            "It should be a Foreign Key."
        ], 
        correctAnswer: "It must uniquely identify each tuple without redundant attributes.",
        explanation: "The defining characteristic of a Candidate Key is 'uniqueness' combined with 'minimality' (no unnecessary or redundant attributes can be removed without losing uniqueness)."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q21.** A relation contains attributes: (RollNo, Email, MobileNo, Name). Assume RollNo, Email, and MobileNo are all unique. How many Candidate Keys exist?",
        options: ["1", "2", "3", "4"], 
        correctAnswer: "3",
        explanation: "Since RollNo, Email, and MobileNo can each independently and uniquely identify a row in the relation without needing any other attribute, all 3 are Candidate Keys."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q22.** Which SQL language category is responsible for defining the structure of database objects?",
        options: ["DML", "DCL", "TCL", "DDL"], 
        correctAnswer: "DDL",
        explanation: "DDL (Data Definition Language) commands like CREATE, ALTER, and DROP are used to define, modify, and delete the structure (schema) of database objects like tables."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q23.** Which SQL language category includes INSERT, UPDATE, and DELETE statements?",
        options: ["DDL", "DML", "TCL", "DCL"], 
        correctAnswer: "DML",
        explanation: "DML (Data Manipulation Language) commands are used for managing and manipulating the actual data inside the tables (inserting, updating, deleting)."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q24.** Which SQL language category is mainly responsible for granting and revoking permissions?",
        options: ["DML", "DDL", "DCL", "TCL"], 
        correctAnswer: "DCL",
        explanation: "DCL (Data Control Language) includes commands like GRANT and REVOKE, which are used to control access and security permissions for database users."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q25.** Which SQL language category includes COMMIT, ROLLBACK, and SAVEPOINT?",
        options: ["DDL", "DCL", "TCL", "DML"], 
        correctAnswer: "TCL",
        explanation: "TCL (Transaction Control Language) commands manage changes made by DML statements. They ensure database transactions are processed systematically and safely."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q26.** Which statement about the COMMIT command is correct?",
        options: [
            "It removes a table permanently.", 
            "It saves all changes made during the current transaction permanently.", 
            "It undoes all changes made in the transaction.", 
            "It deletes all records from a table."
        ], 
        correctAnswer: "It saves all changes made during the current transaction permanently.",
        explanation: "The COMMIT command finalizes the transaction, writing all data modifications permanently to the database so they are visible to other users and safe from crashes."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q27.** A transaction performs the following operations: `UPDATE Account SET Balance = Balance - 500 WHERE AccNo = 101; ROLLBACK;` What is the final state of the balance?",
        options: [
            "Balance decreases by ₹500.", 
            "Balance increases by ₹500.", 
            "Balance remains unchanged.", 
            "The account is deleted."
        ], 
        correctAnswer: "Balance remains unchanged.",
        explanation: "Because a ROLLBACK command was issued before a COMMIT, all uncommitted changes made in the current transaction are completely undone, leaving the balance exactly as it was."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q28.** Which command allows a transaction to roll back to a specific intermediate point instead of the beginning?",
        options: ["COMMIT", "SAVEPOINT", "CHECKPOINT", "GRANT"], 
        correctAnswer: "SAVEPOINT",
        explanation: "A SAVEPOINT sets a designated marker within a transaction. You can later use `ROLLBACK TO SAVEPOINT_NAME` to undo only the changes made after that specific marker."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q29.** Which of the following commands cannot be rolled back after execution in most RDBMS?",
        options: ["UPDATE", "INSERT", "DELETE", "DROP TABLE"], 
        correctAnswer: "DROP TABLE",
        explanation: "In most SQL databases (like Oracle and MySQL), DDL commands like DROP TABLE trigger an implicit COMMIT before and after they run, meaning they cannot be rolled back. DML commands (INSERT, UPDATE, DELETE) can be rolled back."
    },
    {
        category: "DBMS", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q30.** Which sequence correctly represents the execution of a transaction that uses savepoints?",
        options: [
            "BEGIN → COMMIT → SAVEPOINT → ROLLBACK", 
            "BEGIN → SAVEPOINT → UPDATE → ROLLBACK TO SAVEPOINT → COMMIT", 
            "SAVEPOINT → BEGIN → COMMIT", 
            "COMMIT → BEGIN → ROLLBACK"
        ], 
        correctAnswer: "BEGIN → SAVEPOINT → UPDATE → ROLLBACK TO SAVEPOINT → COMMIT",
        explanation: "A transaction starts (BEGIN), a marker is set (SAVEPOINT), an action occurs (UPDATE), an error or logic choice causes a partial undo (ROLLBACK TO SAVEPOINT), and finally the rest of the transaction is saved (COMMIT)."
    }
];

const seedDBMSQuestions = async () => {
    try {
        // Comment out deleteMany if you are just adding to existing DB!
        console.log("🧹 Clearing old DBMS Fundamental records...");
        await Question.deleteMany({ category: "DBMS", topic: "Fundamental" }); 
        
        console.log(`🚀 Injecting ${dbmsQuestionsBatch1to15.length} Formatted DBMS Questions...`);
        await Question.insertMany(dbmsQuestionsBatch1to15);
        
        console.log(`✅ SUCCESS! All 15 DBMS Fundamental Questions Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding DBMS data:", error);
        process.exit(1);
    }
};

seedDBMSQuestions();