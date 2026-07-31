const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for DBMS Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const dbmsQuestionsBatch61to90 = [
    {
        category: "DBMS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q61.** Which ACID property ensures that a transaction is executed completely or not executed at all?",
        options: ["Consistency", "Isolation", "Atomicity", "Durability"], 
        correctAnswer: "Atomicity",
        explanation: "Atomicity is the 'all or nothing' rule. It ensures that every operation within a transaction is treated as a single, indivisible unit. If any part fails, the entire transaction is rolled back."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q62.** A bank transfer deducts ₹500 from Account A but the system crashes before adding ₹500 to Account B. Which ACID property has been violated?",
        options: ["Durability", "Consistency", "Atomicity", "Isolation"], 
        correctAnswer: "Atomicity",
        explanation: "Since the transaction was left in an incomplete, partial state (money deducted but not added), it violates the Atomicity property, which strictly forbids partial executions."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q63.** Which ACID property guarantees that once a transaction is committed, its changes survive even after a system crash?",
        options: ["Atomicity", "Durability", "Isolation", "Consistency"], 
        correctAnswer: "Durability",
        explanation: "Durability guarantees that once a transaction has successfully committed, the changes are permanently recorded in the database, typically via stable storage like a hard drive."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q64.** Two transactions execute simultaneously without affecting each other's intermediate results. Which ACID property is responsible for this behavior?",
        options: ["Consistency", "Isolation", "Atomicity", "Durability"], 
        correctAnswer: "Isolation",
        explanation: "Isolation ensures that concurrent transactions execute independently. The intermediate, uncommitted state of one transaction remains completely hidden from all other transactions."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q65.** A schedule is said to be serial if:",
        options: [
            "Transactions are executed concurrently.", 
            "Operations of different transactions are interleaved.", 
            "One transaction completes entirely before the next begins.", 
            "Only read operations are allowed."
        ], 
        correctAnswer: "One transaction completes entirely before the next begins.",
        explanation: "In a serial schedule, transactions are strictly executed one after the other. There is no overlap or interleaving of their operations."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q66.** Which type of schedule guarantees maximum consistency but minimum concurrency?",
        options: ["Concurrent Schedule", "Serial Schedule", "Recoverable Schedule", "Cascadeless Schedule"], 
        correctAnswer: "Serial Schedule",
        explanation: "Because a serial schedule runs transactions one at a time, there is zero risk of concurrent data corruption (maximum consistency), but it results in poor system performance (minimum concurrency)."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q67.** Two schedules are conflict equivalent if:",
        options: [
            "They contain the same number of transactions.", 
            "The order of all conflicting operations is identical.", 
            "They have the same execution time.", 
            "They contain no write operations."
        ], 
        correctAnswer: "The order of all conflicting operations is identical.",
        explanation: "If two schedules involve the same transactions and force every pair of conflicting operations (like Read/Write on the same data) to occur in the exact same chronological order, they are conflict equivalent."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q68.** Which of the following pairs of operations are considered conflicting?",
        options: [
            "Read(X) and Read(X)", 
            "Read(X) and Write(X)", 
            "Read(X) and Read(Y)", 
            "Write(X) and Write(Y)"
        ], 
        correctAnswer: "Read(X) and Write(X)",
        explanation: "Operations conflict if they belong to different transactions, access the SAME data item (X), and at least one of them is a Write operation."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q69.** Which serializability technique is based on swapping non-conflicting operations?",
        options: ["View Serializability", "Conflict Serializability", "Recoverability", "Cascading"], 
        correctAnswer: "Conflict Serializability",
        explanation: "Conflict serializability determines if a concurrent schedule can be mathematically transformed into a pure serial schedule simply by swapping adjacent, non-conflicting operations."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q70.** Which type of serializability is more general but harder to test (NP-complete)?",
        options: ["Conflict Serializability", "View Serializability", "Recoverable Schedule", "Strict Schedule"], 
        correctAnswer: "View Serializability",
        explanation: "View Serializability allows certain schedules containing 'blind writes' to be considered serializable even if they fail the conflict serializability test, but algorithmically testing for it is extremely complex."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q71.** Which lock allows multiple transactions to read the same data simultaneously?",
        options: ["Exclusive Lock", "Shared Lock", "Update Lock", "Intent Lock"], 
        correctAnswer: "Shared Lock",
        explanation: "A Shared Lock (S-lock) allows a transaction to read an item. Multiple transactions can hold a shared lock on the same item concurrently without interfering with each other."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q72.** Which lock is required before a transaction modifies a data item?",
        options: ["Shared Lock", "Read Lock", "Exclusive Lock", "Intent Shared Lock"], 
        correctAnswer: "Exclusive Lock",
        explanation: "An Exclusive Lock (X-lock) grants full permission to write or modify data. Only one transaction can hold an exclusive lock on an item at any given time."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q73.** Which concurrency control protocol guarantees conflict serializability by dividing execution into growing and shrinking phases?",
        options: ["Timestamp Ordering", "Two-Phase Locking (2PL)", "MVCC", "Optimistic Locking"], 
        correctAnswer: "Two-Phase Locking (2PL)",
        explanation: "2PL mathematically guarantees conflict serializability by forcing a strict rule: a transaction must acquire all its locks (Growing Phase) before it is allowed to release any of them (Shrinking Phase)."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q74.** In the Growing Phase of Two-Phase Locking (2PL), a transaction can:",
        options: [
            "Release locks only.", 
            "Acquire new locks but cannot release any.", 
            "Acquire and release locks simultaneously.", 
            "Execute COMMIT only."
        ], 
        correctAnswer: "Acquire new locks but cannot release any.",
        explanation: "During the growing phase, the transaction steadily builds up its lock portfolio. The strict rule is that no lock can be released during this phase."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q75.** A transaction has started releasing locks. According to the basic 2PL protocol, what can it do next?",
        options: [
            "Acquire new locks.", 
            "Acquire only Shared Locks.", 
            "It cannot acquire any new lock.", 
            "Restart automatically."
        ], 
        correctAnswer: "It cannot acquire any new lock.",
        explanation: "The moment a transaction releases even a single lock, it enters the 'Shrinking Phase'. From that point forward, acquiring any new locks is strictly prohibited."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q76.** Two transactions are waiting indefinitely for each other to release locks on different resources. This situation is known as:",
        options: ["Starvation", "Deadlock", "Cascading Rollback", "Dirty Read"], 
        correctAnswer: "Deadlock",
        explanation: "Deadlock is a standstill state where T1 holds Resource A and waits for B, while T2 holds Resource B and waits for A. Neither can proceed."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q77.** Which of the following conditions is NOT one of the four necessary conditions for a deadlock?",
        options: ["Mutual Exclusion", "Hold and Wait", "Circular Wait", "Time Sharing"], 
        correctAnswer: "Time Sharing",
        explanation: "The Coffman conditions for a deadlock are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. Time sharing is an OS scheduling concept."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q78.** Which deadlock prevention technique breaks the Circular Wait condition?",
        options: [
            "Allow transactions to request locks in any order.", 
            "Force all transactions to acquire resources in a predefined order.", 
            "Release all locks after COMMIT.", 
            "Use Shared Locks only."
        ], 
        correctAnswer: "Force all transactions to acquire resources in a predefined order.",
        explanation: "By numbering all resources and forcing transactions to request locks in ascending order of those numbers, you mathematically prevent the possibility of a circular loop forming."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q79.** Which concurrency control protocol assigns a unique timestamp to every transaction and executes operations based on timestamp order?",
        options: ["Two-Phase Locking", "Timestamp Ordering Protocol", "Wait-Die Protocol", "MVCC"], 
        correctAnswer: "Timestamp Ordering Protocol",
        explanation: "Timestamp Ordering uses system clocks or logical counters to timestamp transactions. If a conflict arises, the DBMS enforces execution in the order of the original timestamps."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q80.** If a transaction with a newer timestamp requests a resource held by an older transaction, what happens in the Wait-Die protocol?",
        options: [
            "The newer transaction waits.", 
            "The older transaction aborts.", 
            "The newer transaction aborts (dies).", 
            "Both transactions are rolled back."
        ], 
        correctAnswer: "The newer transaction aborts (dies).",
        explanation: "In Wait-Die, older transactions wait for newer ones. But if a newer transaction wants a lock held by an older one, it is forced to abort ('die') and restart later to prevent deadlocks."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q81.** Which recovery technique requires that every log record be written to stable storage before the corresponding data page is written to disk?",
        options: ["Shadow Paging", "Write-Ahead Logging (WAL)", "Checkpointing", "Deferred Update"], 
        correctAnswer: "Write-Ahead Logging (WAL)",
        explanation: "WAL ensures crash resilience. By writing the log record first (the 'intent'), the database can always reconstruct or undo changes even if it crashes while writing the actual data to the disk."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q82.** What is the primary purpose of a Checkpoint in database recovery?",
        options: [
            "Increase query execution speed.", 
            "Reduce the amount of log that must be processed during crash recovery.", 
            "Eliminate the need for transaction logs.", 
            "Prevent deadlocks."
        ], 
        correctAnswer: "Reduce the amount of log that must be processed during crash recovery.",
        explanation: "Checkpoints periodically flush modified data from memory to disk. During a crash recovery, the DBMS only needs to read logs starting from the last checkpoint, drastically saving time."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q83.** Which recovery technique maintains a shadow copy of the database and updates only after a successful commit?",
        options: ["Immediate Update", "Deferred Update", "Shadow Paging", "WAL"], 
        correctAnswer: "Shadow Paging",
        explanation: "Shadow paging works by modifying a 'shadow' copy of the page table. When the transaction commits, the system atomically updates the main pointer to point to the shadow table."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q84.** Which RAID level provides disk striping with distributed parity, offering both fault tolerance and improved read performance?",
        options: ["RAID 0", "RAID 1", "RAID 5", "RAID 10"], 
        correctAnswer: "RAID 5",
        explanation: "RAID 5 stripes data across multiple disks (for speed) and distributes parity data across all disks, meaning it can survive the failure of one disk without data loss."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q85.** Which RAID level provides high performance but no fault tolerance?",
        options: ["RAID 0", "RAID 1", "RAID 5", "RAID 6"], 
        correctAnswer: "RAID 0",
        explanation: "RAID 0 (Striping) maximizes speed and capacity by spreading data across disks, but if even a single disk fails, the entire array's data is permanently lost."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q86.** What is the primary responsibility of the Buffer Manager in a DBMS?",
        options: [
            "Execute SQL queries.", 
            "Manage memory pages exchanged between disk and main memory.", 
            "Encrypt database files.", 
            "Manage user authentication."
        ], 
        correctAnswer: "Manage memory pages exchanged between disk and main memory.",
        explanation: "Because disk I/O is slow, the Buffer Manager allocates RAM to cache database pages. It decides which pages stay in memory and which are swapped out to disk."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q87.** A transaction reads data written by another transaction that has not yet committed. This phenomenon is known as:",
        options: ["Phantom Read", "Dirty Read", "Non-Repeatable Read", "Lost Update"], 
        correctAnswer: "Dirty Read",
        explanation: "A Dirty Read occurs when Transaction A reads changes made by Transaction B. If Transaction B then aborts (rolls back), Transaction A has operated on 'dirty', non-existent data."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q88.** A transaction reads the same row twice and gets different values because another committed transaction modified the row in between. This anomaly is called:",
        options: ["Dirty Read", "Phantom Read", "Non-Repeatable Read", "Write Skew"], 
        correctAnswer: "Non-Repeatable Read",
        explanation: "Unlike a dirty read, here the other transaction ACTUALLY committed. However, it still breaks consistency for the first transaction, because it cannot repeat its read and get the same answer."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q89.** A transaction executes the same range query twice and finds new rows inserted by another committed transaction. Which concurrency anomaly is illustrated?",
        options: ["Dirty Read", "Lost Update", "Phantom Read", "Cascading Rollback"], 
        correctAnswer: "Phantom Read",
        explanation: "A Phantom Read happens when a transaction searches a range (e.g., 'Salary > 50000') and another transaction inserts a NEW record matching that condition before the first transaction finishes."
    },
    {
        category: "DBMS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q90.** Which SQL isolation level provides the highest isolation by preventing Dirty Reads, Non-Repeatable Reads, and Phantom Reads, but generally offers the lowest concurrency?",
        options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"], 
        correctAnswer: "Serializable",
        explanation: "Serializable is the strictest isolation level. It essentially locks entire tables or ranges of data to guarantee that concurrent execution is identical to running transactions one by one."
    }
];

const seedDBMSQuestions61to90 = async () => {
    try {
        // Uncomment to wipe prior Advanced DBMS questions
        // await Question.deleteMany({ category: "DBMS", topic: "Advanced" }); 
        
        console.log(`🚀 Injecting ${dbmsQuestionsBatch61to90.length} Advanced DBMS Questions...`);
        await Question.insertMany(dbmsQuestionsBatch61to90);
        
        console.log(`✅ SUCCESS! Questions 61 to 90 Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding DBMS data:", error);
        process.exit(1);
    }
};

seedDBMSQuestions61to90();