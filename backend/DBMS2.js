const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for DBMS Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const dbmsQuestionsBatch31to60 = [
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q31.** Consider the relation: Student(RollNo, Name, Dept, HOD). If each department has exactly one HOD, which functional dependency is valid?",
        options: [
            "RollNo → Dept", 
            "Dept → HOD", 
            "HOD → RollNo", 
            "Name → RollNo"
        ], 
        correctAnswer: "Dept → HOD",
        explanation: "Since every department is uniquely associated with exactly one HOD, knowing the Department uniquely determines the HOD. This is represented by the functional dependency Dept → HOD."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q32.** Given the functional dependencies: A → B and B → C. Which dependency can be inferred using Armstrong's Axioms?",
        options: [
            "C → A", 
            "A → C", 
            "B → A", 
            "C → B"
        ], 
        correctAnswer: "A → C",
        explanation: "According to the Transitivity rule of Armstrong's Axioms, if A determines B, and B determines C, then logically A determines C (A → C)."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q33.** Which Armstrong's Axiom states that if X → Y, then XZ → YZ?",
        options: [
            "Reflexivity", 
            "Transitivity", 
            "Augmentation", 
            "Union"
        ], 
        correctAnswer: "Augmentation",
        explanation: "The Augmentation rule states that if a functional dependency holds, you can add the same set of attributes to both sides without changing its validity."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q34.** Which Armstrong's Axiom states that if X → Y and Y → Z, then X → Z?",
        options: [
            "Reflexivity", 
            "Augmentation", 
            "Transitivity", 
            "Decomposition"
        ], 
        correctAnswer: "Transitivity",
        explanation: "Transitivity is the logical rule that allows chaining of functional dependencies. If X determines Y, and Y determines Z, then X transitively determines Z."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q35.** A relation is in First Normal Form (1NF) if:",
        options: [
            "It contains no transitive dependency.", 
            "Every attribute contains only atomic values.", 
            "Every non-key attribute depends on the whole primary key.", 
            "There are no functional dependencies."
        ], 
        correctAnswer: "Every attribute contains only atomic values.",
        explanation: "1NF requires that all attributes (columns) hold only indivisible, atomic values. It explicitly forbids multivalued attributes or nested tables."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q36.** A table has a composite primary key (StudentID, CourseID). If StudentName depends only on StudentID, the table violates:",
        options: ["1NF", "2NF", "3NF", "BCNF"], 
        correctAnswer: "2NF",
        explanation: "This is a classic 'Partial Dependency'. StudentName depends on only a part of the composite primary key (StudentID) rather than the whole key. 2NF strictly prohibits partial dependencies."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q37.** A relation is in Third Normal Form (3NF) if:",
        options: [
            "It satisfies only 1NF.", 
            "It removes partial dependencies only.", 
            "It removes transitive dependencies.", 
            "Every attribute is multivalued."
        ], 
        correctAnswer: "It removes transitive dependencies.",
        explanation: "A table is in 3NF if it is already in 2NF and has no transitive functional dependencies (i.e., no non-prime attribute depends on another non-prime attribute)."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q38.** Which normal form is strictly stronger/stricter than 3NF?",
        options: ["1NF", "2NF", "BCNF", "DKNF"], 
        correctAnswer: "BCNF",
        explanation: "Boyce-Codd Normal Form (BCNF) is a stricter version of 3NF. Every table in BCNF is in 3NF, but a table in 3NF is not necessarily in BCNF."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q39.** A relation is in BCNF if:",
        options: [
            "Every determinant is a candidate key.", 
            "Every table has one primary key.", 
            "Every attribute is unique.", 
            "Every foreign key references a primary key."
        ], 
        correctAnswer: "Every determinant is a candidate key.",
        explanation: "The golden rule of BCNF is that for any non-trivial functional dependency X → Y, X must be a super key or candidate key. No exceptions."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q40.** Which normalization anomaly is primarily eliminated by 2NF?",
        options: [
            "Update anomaly caused by transitive dependency", 
            "Insert anomaly caused by multivalued attributes", 
            "Partial dependency", 
            "Data redundancy caused by NULL values"
        ], 
        correctAnswer: "Partial dependency",
        explanation: "2NF's sole purpose is to ensure that non-key attributes depend on the ENTIRE primary key, thereby eliminating partial dependencies."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q41.** Which normalization anomaly is mainly eliminated by 3NF?",
        options: [
            "Partial dependency", 
            "Transitive dependency", 
            "Multivalued dependency", 
            "Join dependency"
        ], 
        correctAnswer: "Transitive dependency",
        explanation: "3NF is specifically designed to eliminate transitive dependencies, where a non-key attribute indirectly depends on the primary key through another non-key attribute."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q42.** Which dependency is specifically addressed by 4NF?",
        options: [
            "Functional Dependency", 
            "Partial Dependency", 
            "Multivalued Dependency", 
            "Transitive Dependency"
        ], 
        correctAnswer: "Multivalued Dependency",
        explanation: "Fourth Normal Form (4NF) deals specifically with separating independent Multivalued Dependencies into their own distinct tables to avoid redundancy."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q43.** Which type of decomposition guarantees that no information is lost after decomposition?",
        options: [
            "Lossy Decomposition", 
            "Lossless Decomposition", 
            "Horizontal Decomposition", 
            "Vertical Decomposition"
        ], 
        correctAnswer: "Lossless Decomposition",
        explanation: "Lossless (or Non-loss) decomposition ensures that when decomposed tables are naturally joined back together, they yield the exact original table without any missing or extra ('spurious') rows."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q44.** Which property ensures that all original functional dependencies are preserved after decomposition?",
        options: [
            "Lossless Join", 
            "Dependency Preservation", 
            "Data Independence", 
            "Atomicity"
        ], 
        correctAnswer: "Dependency Preservation",
        explanation: "Dependency Preservation means that you can enforce all the original functional dependencies by looking only at the individual decomposed tables without having to join them back together."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q45.** Which of the following is the primary objective of normalization?",
        options: [
            "Increase data redundancy", 
            "Improve graphical representation", 
            "Minimize redundancy and eliminate update anomalies", 
            "Increase table size"
        ], 
        correctAnswer: "Minimize redundancy and eliminate update anomalies",
        explanation: "Normalization restructures relational schemas to reduce duplicate data (redundancy) and prevent inconsistencies during insert, update, or delete operations (anomalies)."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q46.** Consider the relation R(A, B, C) with FDs: A → B, B → C. Which normal form is violated?",
        options: ["1NF", "2NF", "3NF", "BCNF"], 
        correctAnswer: "3NF",
        explanation: "A is the candidate key. Since A is a single attribute, 2NF is satisfied (no partial dependency possible). However, C depends on B, and B depends on A. This is a transitive dependency, which violates 3NF."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q47.** Which decomposition is dependency preserving?",
        options: [
            "Every functional dependency can still be enforced without joining the decomposed tables.", 
            "Every decomposed table contains the primary key.", 
            "Every decomposed table has equal number of attributes.", 
            "Every decomposition is automatically dependency preserving."
        ], 
        correctAnswer: "Every functional dependency can still be enforced without joining the decomposed tables.",
        explanation: "If evaluating the dependencies requires a costly join of the decomposed tables every time data is inserted, the decomposition is NOT dependency preserving."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q48.** Which of the following is NOT an objective of normalization?",
        options: [
            "Reduce redundancy", 
            "Eliminate update anomalies", 
            "Improve data consistency", 
            "Increase duplicate data for faster retrieval"
        ], 
        correctAnswer: "Increase duplicate data for faster retrieval",
        explanation: "Increasing duplicate data for performance is a technique called 'Denormalization'. Normalization explicitly aims to do the exact opposite."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q49.** A relation contains a multivalued dependency but no transitive dependency. Which is the highest normal form that can still be violated?",
        options: ["2NF", "3NF", "BCNF", "4NF"], 
        correctAnswer: "4NF",
        explanation: "Because it has no transitive dependencies (and assuming it meets BCNF criteria), it can pass up to BCNF. However, the presence of an independent multivalued dependency strictly violates 4NF."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q50.** Which data structure is most commonly used to implement indexes in modern DBMSs?",
        options: ["Binary Search Tree", "AVL Tree", "B+ Tree", "Heap"], 
        correctAnswer: "B+ Tree",
        explanation: "The B+ Tree is the standard data structure for relational database indexing because it optimizes disk I/O reads by having a high fan-out and storing all actual data pointers only in the leaf nodes."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q51.** Why is a B+ Tree preferred over a Binary Search Tree for database indexing?",
        options: [
            "It stores duplicate keys only.", 
            "It minimizes disk I/O by keeping the tree balanced and storing data in sorted leaf nodes.", 
            "It always has fewer nodes than a BST.", 
            "It does not require pointers."
        ], 
        correctAnswer: "It minimizes disk I/O by keeping the tree balanced and storing data in sorted leaf nodes.",
        explanation: "Unlike BSTs which have 2 children per node, B+ Trees can have hundreds of children per node (matching disk block sizes), making the tree very shallow and drastically reducing expensive disk I/O operations."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q52.** In a B+ Tree, actual data records are primarily stored in:",
        options: ["Root node", "Internal nodes", "Leaf nodes", "Every node"], 
        correctAnswer: "Leaf nodes",
        explanation: "In a B+ tree, internal nodes contain only routing keys to guide the search. The actual data pointers/records are stored exclusively in the bottom-most leaf nodes, which are linked together for fast sequential scanning."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q53.** Which hashing technique is most suitable when the number of records grows dynamically?",
        options: ["Static Hashing", "Sequential Hashing", "Extendible Hashing", "Linear Search"], 
        correctAnswer: "Extendible Hashing",
        explanation: "Extendible Hashing is a dynamic hashing technique where the hash table's directory grows and shrinks dynamically as data is inserted or deleted, preventing the performance degradation seen in static hashing."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q54.** Hashing is generally NOT efficient for which type of query?",
        options: ["Equality Search", "Primary Key Lookup", "Exact Match", "Range Search"], 
        correctAnswer: "Range Search",
        explanation: "Hashing passes keys through a mathematical function that scatters the output randomly. Thus, consecutive numbers (like ID 10 and 11) are not stored near each other, making Range Searches (e.g., ID BETWEEN 10 AND 50) highly inefficient."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q55.** Which file organization is best suited when records are frequently retrieved in sorted order?",
        options: ["Heap File Organization", "Sequential File Organization", "Hash File Organization", "Random File Organization"], 
        correctAnswer: "Sequential File Organization",
        explanation: "Sequential files store records physically sorted by a search key. This makes reading ranges or retrieving data in that sorted order extremely fast."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q56.** Which file organization generally provides the fastest insertion when maintaining sorted order is not required?",
        options: ["Sequential", "Heap", "Indexed Sequential", "B+ Tree"], 
        correctAnswer: "Heap",
        explanation: "In Heap File Organization, records are simply appended to the end of the file in the order they arrive. Because no sorting or indexing overhead is involved, insertion is incredibly fast."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q57.** Which type of index determines the physical order of records in a table?",
        options: ["Secondary Index", "Clustered Index", "Non-Clustered Index", "Composite Index"], 
        correctAnswer: "Clustered Index",
        explanation: "A Clustered Index dictates the physical sorting of the rows stored on the disk. Because data can only be physically sorted one way, a table can only have one clustered index."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q58.** A query frequently filters data using: `WHERE DeptID = ? AND Salary > ?`. Which indexing strategy is generally the most efficient?",
        options: [
            "Index only on Salary", 
            "Index only on DeptID", 
            "Composite Index on (DeptID, Salary)", 
            "No Index"
        ], 
        correctAnswer: "Composite Index on (DeptID, Salary)",
        explanation: "A composite index should be ordered with the 'Equality' column first (DeptID) followed by the 'Range' column (Salary) for maximum B-Tree traversal efficiency."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q59.** Which statement about Clustered and Non-Clustered indexes is correct?",
        options: [
            "A table can have unlimited clustered indexes.", 
            "Clustered indexes do not affect data storage order.", 
            "A table can have only one clustered index because it defines the physical order of data.", 
            "Non-clustered indexes always store complete table rows."
        ], 
        correctAnswer: "A table can have only one clustered index because it defines the physical order of data.",
        explanation: "Physical data on a hard drive can only be sorted in exactly one sequence. Therefore, you can only create a single Clustered Index per table."
    },
    {
        category: "DBMS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q60.** Which of the following operations benefits least from indexing?",
        options: [
            "Searching by Primary Key", 
            "Equality Search", 
            "Range Query on Indexed Column", 
            "Updating every row in the table"
        ], 
        correctAnswer: "Updating every row in the table",
        explanation: "Indexes speed up data *retrieval* (SELECTs). However, when you UPDATE or INSERT rows, the DBMS must also update the indexes, adding overhead. Updating every row mass-updates the index, hurting performance."
    }
];

const seedDBMSQuestions31to60 = async () => {
    try {
        // Comment this out if you are keeping Q1-30 in the DB!
        // await Question.deleteMany({ category: "DBMS", topic: "Intermediate" }); 
        
        console.log(`🚀 Injecting ${dbmsQuestionsBatch31to60.length} Intermediate DBMS Questions...`);
        await Question.insertMany(dbmsQuestionsBatch31to60);
        
        console.log(`✅ SUCCESS! Questions 31 to 60 Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding DBMS data:", error);
        process.exit(1);
    }
};

seedDBMSQuestions31to60();