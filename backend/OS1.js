const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for OS Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const osQuestionsBatch1to30 = [
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q1.** What is the primary purpose of an Operating System?",
        options: [
            "To compile programming languages", 
            "To act as an interface between users/applications and computer hardware", 
            "To create databases", 
            "To execute SQL queries"
        ], 
        correctAnswer: "To act as an interface between users/applications and computer hardware",
        explanation: "An Operating System (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs, acting as an interface between the user and the hardware."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q2.** Which of the following is NOT a primary function of an Operating System?",
        options: [
            "Memory Management", 
            "Process Management", 
            "Device Management", 
            "Source Code Compilation"
        ], 
        correctAnswer: "Source Code Compilation",
        explanation: "Source code compilation is the job of a compiler, not the OS. The OS primarily handles Memory Management, Process Management, Device Management, and File Management."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q3.** Which type of Operating System is specifically designed to guarantee response within a predefined time limit?",
        options: [
            "Batch Operating System", 
            "Multiprogramming Operating System", 
            "Real-Time Operating System (RTOS)", 
            "Distributed Operating System"
        ], 
        correctAnswer: "Real-Time Operating System (RTOS)",
        explanation: "Real-Time Operating Systems (RTOS) are used where strict time constraints are critical (e.g., medical imaging, auto-pilot). Missing a deadline in an RTOS can lead to system failure."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q4.** Which Operating System allows multiple users to access the system simultaneously?",
        options: [
            "Single User Operating System", 
            "Multi-User Operating System", 
            "Embedded Operating System", 
            "Standalone Operating System"
        ], 
        correctAnswer: "Multi-User Operating System",
        explanation: "A Multi-User Operating System (like Linux or Unix) allows multiple users to access and use the computer's resources simultaneously, often via terminals or a network."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q5.** What is a Kernel in an Operating System?",
        options: [
            "A text editor", 
            "The core component that manages hardware resources and system operations", 
            "A compiler", 
            "A device driver"
        ], 
        correctAnswer: "The core component that manages hardware resources and system operations",
        explanation: "The Kernel is the central core of a computer operating system. It has complete control over everything in the system, managing memory, processes, and hardware interactions."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q6.** Which mode has direct access to hardware resources?",
        options: ["User Mode", "Kernel Mode", "Safe Mode", "Virtual Mode"], 
        correctAnswer: "Kernel Mode",
        explanation: "Kernel mode is a highly privileged execution mode where the CPU has unrestricted access to the underlying hardware and system memory."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q7.** Which operation generally requires switching from User Mode to Kernel Mode?",
        options: [
            "Local variable assignment", 
            "Executing arithmetic operations", 
            "Performing a system call", 
            "Calling a user-defined function"
        ], 
        correctAnswer: "Performing a system call",
        explanation: "When a user application needs a hardware service (like reading a file or allocating memory), it must execute a system call, which triggers a context switch from User Mode to Kernel Mode."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q8.** Which of the following best differentiates a Program from a Process?",
        options: [
            "A Program is executing, whereas a Process is stored on disk.", 
            "A Process is an executing instance of a Program.", 
            "Both are identical.", 
            "A Process exists only after system shutdown."
        ], 
        correctAnswer: "A Process is an executing instance of a Program.",
        explanation: "A Program is a passive entity (executable code stored on a disk), while a Process is an active entity (a program currently loaded in RAM and being executed by the CPU)."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q9.** Which data structure stores information such as Process ID, Program Counter, CPU Registers, and Process State?",
        options: ["Page Table", "PCB (Process Control Block)", "Stack Frame", "Inode"], 
        correctAnswer: "PCB (Process Control Block)",
        explanation: "The Process Control Block (PCB) is a data structure used by the OS kernel to store all the information and context required to manage and track a specific process."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q10.** Which process state indicates that the process is currently being executed by the CPU?",
        options: ["Ready", "Waiting", "Running", "Terminated"], 
        correctAnswer: "Running",
        explanation: "A process is in the 'Running' state when its instructions are actively being executed by the CPU."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q11.** A process waiting for completion of an I/O operation is generally in which state?",
        options: ["Running", "Ready", "Waiting (Blocked)", "New"], 
        correctAnswer: "Waiting (Blocked)",
        explanation: "If a process requests I/O (like reading from a disk), it cannot proceed until the I/O finishes. It is placed in the 'Waiting' or 'Blocked' state so the CPU can execute other processes."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q12.** What is Context Switching?",
        options: [
            "Changing the operating system.", 
            "Switching from one programming language to another.", 
            "Saving the state of one process/thread and loading the state of another.", 
            "Restarting the CPU."
        ], 
        correctAnswer: "Saving the state of one process/thread and loading the state of another.",
        explanation: "Context switching is the procedure of storing the state (PCB) of the currently running process and restoring the state of the next process, allowing multiple processes to share a single CPU."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q13.** Which of the following is the primary disadvantage of excessive context switching?",
        options: [
            "Increased CPU cache efficiency", 
            "Reduced memory usage", 
            "Performance overhead due to CPU time spent switching instead of executing", 
            "Faster execution of processes"
        ], 
        correctAnswer: "Performance overhead due to CPU time spent switching instead of executing",
        explanation: "Context switching is pure overhead. While the OS is saving and loading process states, the CPU is not doing any actual productive execution for the user programs."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q14.** Which statement correctly distinguishes a Process from a Thread?",
        options: [
            "Threads have independent address spaces.", 
            "Processes share the same address space by default.", 
            "Threads within the same process share memory and resources.", 
            "Threads are heavier than processes."
        ], 
        correctAnswer: "Threads within the same process share memory and resources.",
        explanation: "A process has its own isolated memory space. Threads (often called lightweight processes) belong to a single process and share its memory, code, and data segments."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q15.** Which of the following is a major advantage of Multithreading?",
        options: [
            "Increased process isolation", 
            "Lower communication overhead between execution units of the same process", 
            "Elimination of context switching", 
            "Removal of synchronization requirements"
        ], 
        correctAnswer: "Lower communication overhead between execution units of the same process",
        explanation: "Because threads share the same address space, they can communicate with each other much faster and easier than completely separate processes (Inter-Process Communication)."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q16.** Which scheduler is responsible for selecting a process from the Ready Queue and allocating the CPU?",
        options: [
            "Long-Term Scheduler", 
            "Medium-Term Scheduler", 
            "Short-Term Scheduler (CPU Scheduler)", 
            "Job Scheduler"
        ], 
        correctAnswer: "Short-Term Scheduler (CPU Scheduler)",
        explanation: "The Short-Term Scheduler acts very frequently (every few milliseconds) to select which of the ready, in-memory processes should be executed by the CPU next."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q17.** Which scheduler controls the degree of multiprogramming by deciding which processes are admitted into memory?",
        options: [
            "Long-Term Scheduler", 
            "Short-Term Scheduler", 
            "Medium-Term Scheduler", 
            "Dispatcher"
        ], 
        correctAnswer: "Long-Term Scheduler",
        explanation: "The Long-Term (or Job) Scheduler determines which programs are admitted to the system for processing, directly controlling the 'degree of multiprogramming' (number of processes in memory)."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q18.** The Medium-Term Scheduler primarily performs which operation?",
        options: [
            "Allocates CPU to processes", 
            "Swaps processes between main memory and secondary storage", 
            "Creates new processes", 
            "Terminates processes"
        ], 
        correctAnswer: "Swaps processes between main memory and secondary storage",
        explanation: "To free up memory, the Medium-Term Scheduler removes processes from memory (swapping out) and brings them back later (swapping in) to resume execution."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q19.** What is the primary role of the Dispatcher?",
        options: [
            "Admit jobs into the system", 
            "Perform context switching and transfer CPU control to the selected process", 
            "Allocate memory", 
            "Manage files"
        ], 
        correctAnswer: "Perform context switching and transfer CPU control to the selected process",
        explanation: "While the Short-Term Scheduler decides *which* process runs next, the Dispatcher is the module that actually gives control of the CPU to that process (performing the context switch)."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q20.** Which scheduling criterion aims to maximize the number of processes completed per unit time?",
        options: ["Turnaround Time", "Throughput", "Response Time", "Waiting Time"], 
        correctAnswer: "Throughput",
        explanation: "Throughput is a measure of work done. In CPU scheduling, it specifically refers to the number of processes that complete their execution per time unit."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q21.** Which scheduling criterion is especially important in interactive systems?",
        options: ["CPU Utilization", "Throughput", "Response Time", "Burst Time"], 
        correctAnswer: "Response Time",
        explanation: "In an interactive system (like an OS running a UI), it is critical that the system responds quickly to user inputs (clicks, keystrokes), making Response Time the most important metric."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q22.** A process spends most of its time performing calculations with very little I/O. It is classified as:",
        options: ["I/O-Bound Process", "CPU-Bound Process", "Interactive Process", "Batch Process"], 
        correctAnswer: "CPU-Bound Process",
        explanation: "A CPU-bound process relies heavily on processor execution and mathematical calculations, spending very little time waiting for Input/Output operations."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q23.** A process frequently waits for disk and network operations while performing very little computation. It is classified as:",
        options: ["CPU-Bound Process", "I/O-Bound Process", "Real-Time Process", "Daemon Process"], 
        correctAnswer: "I/O-Bound Process",
        explanation: "An I/O-bound process spends the vast majority of its time in the 'Waiting' state, waiting for slower external devices like disks, networks, or user input."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q24.** Which operating system technique allows multiple programs to remain in memory simultaneously, improving CPU utilization?",
        options: ["Multiprogramming", "Paging", "Segmentation", "Virtualization"], 
        correctAnswer: "Multiprogramming",
        explanation: "Multiprogramming keeps multiple jobs in memory. When one job needs to wait for I/O, the OS switches the CPU to another job, significantly improving CPU utilization."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q25.** Which feature allows a user to execute multiple applications apparently at the same time on a single CPU?",
        options: ["Multitasking", "Multiprocessing", "Paging", "Deadlock"], 
        correctAnswer: "Multitasking",
        explanation: "Multitasking (or Time Sharing) rapidly switches the CPU between processes so fast that it creates the illusion that the user is running multiple applications simultaneously."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q26.** Which of the following requires multiple physical CPUs or processor cores?",
        options: ["Time Sharing", "Multiprogramming", "Multiprocessing", "Multitasking"], 
        correctAnswer: "Multiprocessing",
        explanation: "Multiprocessing systems have two or more strictly physical processors or cores executing instructions simultaneously in true parallel fashion."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q27.** Time-sharing systems primarily improve:",
        options: ["Disk Capacity", "User Responsiveness", "Cache Size", "Network Bandwidth"], 
        correctAnswer: "User Responsiveness",
        explanation: "By dividing CPU time into small time slices (quanta) and rapidly switching between jobs, time-sharing ensures every user or process gets quick responses."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q28.** Which queue contains processes that are ready to execute but are waiting for CPU allocation?",
        options: ["Job Queue", "Device Queue", "Ready Queue", "Waiting Queue"], 
        correctAnswer: "Ready Queue",
        explanation: "The Ready Queue holds all the processes that have been loaded into main memory and are fully prepared to run, just waiting for the CPU scheduler to pick them."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q29.** A process waiting for completion of a printer operation will most likely be placed in:",
        options: ["Ready Queue", "Device Queue", "Job Queue", "CPU Queue"], 
        correctAnswer: "Device Queue",
        explanation: "When a process requests an I/O operation from a specific device (like a printer or disk), it is placed in the Device Queue dedicated to that specific hardware."
    },
    {
        category: "Operating System", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q30.** Which statement best describes the relationship between the CPU Scheduler and the Dispatcher?",
        options: [
            "Both perform exactly the same task.", 
            "The CPU Scheduler selects the next process, while the Dispatcher transfers CPU control to it.", 
            "The Dispatcher selects the next process, while the CPU Scheduler performs context switching.", 
            "Neither is involved in process execution."
        ], 
        correctAnswer: "The CPU Scheduler selects the next process, while the Dispatcher transfers CPU control to it.",
        explanation: "The Scheduler is the algorithm/logic that makes the decision (e.g., Round Robin, SJF). The Dispatcher is the actual mechanism that saves/restores state and jumps to the user code."
    }
];

const seedOSQuestions = async () => {
    try {
        // Comment this out if you don't want to clear old OS Fundamental questions
        // await Question.deleteMany({ category: "Operating System", topic: "Fundamental" }); 
        
        console.log(`🚀 Injecting ${osQuestionsBatch1to30.length} Formatted OS Questions...`);
        await Question.insertMany(osQuestionsBatch1to30);
        
        console.log(`✅ SUCCESS! All 30 OS Fundamental Questions Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding OS data:", error);
        process.exit(1);
    }
};

seedOSQuestions();