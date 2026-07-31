const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for OS Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const osQuestionsBatch31to60 = [
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q31.** Which CPU scheduling algorithm always executes the process that arrives first?",
        options: [
            "Shortest Job First (SJF)", 
            "Round Robin (RR)", 
            "First Come First Serve (FCFS)", 
            "Priority Scheduling"
        ], 
        correctAnswer: "First Come First Serve (FCFS)",
        explanation: "FCFS is the simplest scheduling algorithm. It operates strictly on a first-in, first-out (FIFO) basis, executing processes in the exact order they arrive in the ready queue."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q32.** Which CPU scheduling algorithm generally provides the minimum average waiting time when all burst times are known in advance?",
        options: ["FCFS", "Round Robin", "Shortest Job First (SJF)", "FIFO"], 
        correctAnswer: "Shortest Job First (SJF)",
        explanation: "SJF is mathematically proven to provide the optimal (minimum) average waiting time because executing shorter jobs first pushes them out of the queue quickly, reducing the wait for everyone else."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q33.** Which scheduling algorithm is preemptive?",
        options: [
            "FCFS", 
            "Non-Preemptive SJF", 
            "Shortest Remaining Time First (SRTF)", 
            "Non-Preemptive Priority"
        ], 
        correctAnswer: "Shortest Remaining Time First (SRTF)",
        explanation: "SRTF is the preemptive version of SJF. If a new process arrives with a shorter burst time than what is remaining for the currently executing process, the current process is preempted."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q34.** Round Robin scheduling is primarily designed for:",
        options: ["Batch Systems", "Interactive / Time-Sharing Systems", "Embedded Systems", "Distributed Databases"], 
        correctAnswer: "Interactive / Time-Sharing Systems",
        explanation: "Round Robin guarantees that all processes get a slice of CPU time frequently, ensuring high responsiveness, which is essential for interactive and time-sharing systems."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q35.** In Round Robin scheduling, each process is allocated a fixed amount of CPU time known as:",
        options: ["Burst Time", "Waiting Time", "Time Quantum", "Turnaround Time"], 
        correctAnswer: "Time Quantum",
        explanation: "The Time Quantum (or time slice) is the specific, fixed maximum duration a process is allowed to run before being preempted and placed at the back of the ready queue."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q36.** If the Time Quantum in Round Robin is too small, what is the most likely consequence?",
        options: [
            "Fewer Context Switches", 
            "Increased Context Switching Overhead", 
            "Poor Response Time", 
            "It behaves like FCFS"
        ], 
        correctAnswer: "Increased Context Switching Overhead",
        explanation: "If the time quantum is too small, the OS will spend more time performing context switches (saving/loading states) than executing actual process instructions, degrading overall performance."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q37.** If the Time Quantum is very large, Round Robin scheduling behaves similarly to:",
        options: ["SJF", "Priority Scheduling", "FCFS", "SRTF"], 
        correctAnswer: "FCFS",
        explanation: "If the time quantum is larger than the burst time of all processes, no process will ever be preempted. It will simply run to completion in the order it arrived, exactly like FCFS."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q38.** Which scheduling algorithm may suffer from the Convoy Effect?",
        options: ["FCFS", "SRTF", "Round Robin", "Priority Scheduling"], 
        correctAnswer: "FCFS",
        explanation: "The Convoy Effect occurs in FCFS when a long CPU-bound process gets the CPU, forcing all other shorter I/O-bound processes to wait endlessly behind it, heavily reducing CPU and device utilization."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q39.** Which scheduling algorithm is most likely to cause Starvation?",
        options: ["FCFS", "Round Robin", "Priority Scheduling", "FIFO"], 
        correctAnswer: "Priority Scheduling",
        explanation: "In Priority Scheduling, if a continuous stream of high-priority processes arrives, a low-priority process may never get a chance to execute. This infinite waiting is called starvation."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q40.** Which technique is commonly used to prevent Starvation in Priority Scheduling?",
        options: ["Swapping", "Aging", "Paging", "Thrashing"], 
        correctAnswer: "Aging",
        explanation: "Aging is a technique where the OS gradually increases the priority of a process the longer it waits in the queue, ensuring it eventually becomes high enough to execute."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q41.** Which scheduling algorithm selects the process with the shortest remaining execution time?",
        options: ["FCFS", "SJF", "SRTF", "Round Robin"], 
        correctAnswer: "SRTF",
        explanation: "Shortest Remaining Time First (SRTF) continuously monitors the ready queue and preempts the current process if a new process arrives that has a shorter remaining execution time."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q42.** Which scheduling algorithm is non-preemptive by default?",
        options: ["Round Robin", "SRTF", "SJF", "Multilevel Feedback Queue"], 
        correctAnswer: "SJF",
        explanation: "Standard Shortest Job First (SJF) is non-preemptive. Once a process gets the CPU, it runs until its burst is completed. (Its preemptive counterpart is explicitly called SRTF)."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q43.** Which scheduling algorithm can provide the best average turnaround time when CPU burst times are accurately known?",
        options: ["FCFS", "SJF", "Round Robin", "FIFO"], 
        correctAnswer: "SJF",
        explanation: "Because SJF minimizes the average waiting time by clearing short jobs quickly, it subsequently minimizes the average turnaround time as well."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q44.** Which scheduling algorithm is most fair, giving every process a chance to execute periodically?",
        options: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"], 
        correctAnswer: "Round Robin",
        explanation: "Round Robin is inherently fair because it strictly cycles through all processes, giving each a maximum fixed time slice (quantum) before forcing it to yield to the next process."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q45.** A process with a higher priority arrives while a lower-priority process is executing. In Preemptive Priority Scheduling, what happens?",
        options: [
            "The current process continues until completion.", 
            "The higher-priority process immediately preempts the CPU.", 
            "Both processes execute simultaneously.", 
            "The higher-priority process is placed at the end of the Ready Queue."
        ], 
        correctAnswer: "The higher-priority process immediately preempts the CPU.",
        explanation: "Because the algorithm is 'preemptive', the OS will immediately halt the lower-priority process, save its state, and allocate the CPU to the new higher-priority process."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q46.** Which situation occurs when two or more processes simultaneously access and modify shared data, causing the final result to depend on the order of execution?",
        options: ["Deadlock", "Starvation", "Race Condition", "Thrashing"], 
        correctAnswer: "Race Condition",
        explanation: "A Race Condition occurs when multiple threads or processes 'race' to read and write shared data concurrently, leading to unpredictable and incorrect outcomes."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q47.** The Critical Section of a program is the part where:",
        options: [
            "The program performs only arithmetic operations.", 
            "Shared resources or shared variables are accessed.", 
            "The operating system loads the program.", 
            "Memory is allocated to the process."
        ], 
        correctAnswer: "Shared resources or shared variables are accessed.",
        explanation: "The Critical Section is a segment of code where a process modifies common variables, updates tables, or writes to shared files. Access to it must be strictly synchronized."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q48.** Which requirement ensures that only one process can execute its critical section at a time?",
        options: ["Progress", "Mutual Exclusion", "Starvation", "Aging"], 
        correctAnswer: "Mutual Exclusion",
        explanation: "Mutual Exclusion ensures that if process P is executing in its critical section, no other process can be executing in their critical sections involving the same shared resource."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q49.** Which requirement states that if no process is in its critical section, the selection of the next process to enter should not be postponed indefinitely?",
        options: ["Mutual Exclusion", "Bounded Waiting", "Progress", "Deadlock Prevention"], 
        correctAnswer: "Progress",
        explanation: "The 'Progress' requirement means that processes that are ready to enter their critical section should be able to decide who goes next without getting stuck, assuming the section is free."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q50.** Which requirement guarantees that every process requesting the critical section will eventually get a chance to execute it?",
        options: ["Progress", "Mutual Exclusion", "Bounded Waiting", "Context Switching"], 
        correctAnswer: "Bounded Waiting",
        explanation: "Bounded Waiting means there is a limit (bound) on how many times other processes can bypass a waiting process. It ensures no process starves waiting for the critical section."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q51.** Which synchronization primitive generally allows only one thread or process to access a shared resource at a time?",
        options: ["Semaphore", "Mutex", "Monitor", "Barrier"], 
        correctAnswer: "Mutex",
        explanation: "A Mutex (Mutual Exclusion Object) acts like a single key. A thread locks the mutex to enter the critical section and unlocks it upon exiting. Only the thread holding the lock can access the resource."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q52.** Which synchronization primitive can be initialized with a value greater than 1, allowing multiple processes to access a limited number of identical resources?",
        options: ["Binary Semaphore", "Mutex", "Counting Semaphore", "Spinlock"], 
        correctAnswer: "Counting Semaphore",
        explanation: "A Counting Semaphore keeps a numerical count (e.g., 5). It allows exactly that many processes to acquire it simultaneously, making it ideal for managing a pool of identical resources."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q53.** A Binary Semaphore can have which values?",
        options: ["Any positive integer", "0 or 1", "-1 or 1", "Only 1"], 
        correctAnswer: "0 or 1",
        explanation: "As the name 'binary' suggests, it can only hold two states: 0 (locked/unavailable) and 1 (unlocked/available). It functions very similarly to a Mutex."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q54.** Which classic synchronization problem deals with a shared finite buffer between producers and consumers?",
        options: ["Dining Philosophers", "Readers-Writers", "Producer-Consumer", "Sleeping Barber"], 
        correctAnswer: "Producer-Consumer",
        explanation: "The Producer-Consumer (or Bounded-Buffer) problem highlights synchronization where a producer cannot add to a full buffer, and a consumer cannot read from an empty buffer."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q55.** In the Producer-Consumer Problem, which synchronization primitive is typically used to keep track of the number of empty buffer slots?",
        options: ["Mutex only", "Counting Semaphore", "Spinlock only", "Monitor only"], 
        correctAnswer: "Counting Semaphore",
        explanation: "Two counting semaphores are typically used: one tracks the number of 'empty' slots (initialized to buffer size), and the other tracks 'full' slots (initialized to 0)."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q56.** In the Readers-Writers Problem, which statement is generally true?",
        options: [
            "Multiple writers can write simultaneously.", 
            "Multiple readers can read simultaneously if no writer is writing.", 
            "Readers always have higher priority than writers.", 
            "Writers never need synchronization."
        ], 
        correctAnswer: "Multiple readers can read simultaneously if no writer is writing.",
        explanation: "Reading does not modify data, so concurrent reads are completely safe. However, writing modifies data, so a writer requires exclusive access (no other readers or writers)."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q57.** The Dining Philosophers Problem is mainly used to illustrate issues related to:",
        options: ["Memory Allocation", "CPU Scheduling", "Synchronization and Deadlock", "Virtual Memory"], 
        correctAnswer: "Synchronization and Deadlock",
        explanation: "It illustrates a scenario where multiple processes (philosophers) compete for limited resources (chopsticks). If poorly managed, it perfectly demonstrates how Deadlock and Starvation occur."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q58.** Which of the following is NOT one of the four necessary conditions for a deadlock?",
        options: ["Mutual Exclusion", "Hold and Wait", "Circular Wait", "Preemption"], 
        correctAnswer: "Preemption",
        explanation: "The fourth condition is 'No Preemption', meaning resources cannot be forcibly taken from a process. If 'Preemption' were allowed, deadlocks could easily be broken."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q59.** Which deadlock handling strategy ensures that the system never enters an unsafe state?",
        options: ["Deadlock Detection", "Deadlock Recovery", "Deadlock Avoidance", "Deadlock Ignorance"], 
        correctAnswer: "Deadlock Avoidance",
        explanation: "Deadlock Avoidance algorithms dynamically analyze every resource request. If granting a resource pushes the system into an 'unsafe state' (where a deadlock could potentially happen), the request is denied or delayed."
    },
    {
        category: "Operating System", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q60.** Which algorithm is commonly used for Deadlock Avoidance?",
        options: ["Peterson's Algorithm", "Bakery Algorithm", "Banker's Algorithm", "Round Robin Algorithm"], 
        correctAnswer: "Banker's Algorithm",
        explanation: "Dijkstra's Banker's Algorithm simulates resource allocation for predetermined maximum possible amounts to decide if granting a specific request will leave the system in a safe state."
    }
];

const seedOSQuestions31to60 = async () => {
    try {
        // Uncomment to wipe the collection if needed!
        // await Question.deleteMany({ category: "Operating System", topic: "Intermediate" }); 
        
        console.log(`🚀 Injecting ${osQuestionsBatch31to60.length} Intermediate OS Questions...`);
        await Question.insertMany(osQuestionsBatch31to60);
        
        console.log(`✅ SUCCESS! Questions 31 to 60 Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding OS data:", error);
        process.exit(1);
    }
};

seedOSQuestions31to60();