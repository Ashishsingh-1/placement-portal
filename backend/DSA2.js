const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); // Apne path ke hisaab se adjust kar lena

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for DSA Module 2'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const dsaQuestionsPart2 = [
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q1.** Which algorithm detects a cycle in a singly linked list using O(1) extra space?",
        options: ["DFS", "Floyd's Tortoise and Hare Algorithm", "Binary Search", "Merge Sort"],
        correctAnswer: "Floyd's Tortoise and Hare Algorithm",
        explanation: "Floyd's cycle-finding algorithm utilizes two pointers (a slow one moving one step and a fast one moving two steps). If a cycle exists, the fast pointer will eventually overlap with the slow pointer, requiring only O(1) extra space."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Hard",
        questionText: "**Q2.** A singly linked list contains a cycle. After Floyd's algorithm detects the cycle, how can the starting node of the cycle be found?",
        options: ["Reverse the list", "Move one pointer to the head, then move both pointers one step at a time until they meet", "Use a stack", "Sort the linked list"],
        correctAnswer: "Move one pointer to the head, then move both pointers one step at a time until they meet",
        explanation: "Mathematically, the distance from the head to the cycle's start is equal to the distance from the meeting point to the cycle's start. Moving one pointer to the head and advancing both by one step guarantees they will collide exactly at the cycle's starting node."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q3.** Which data structure combination is commonly used to implement an LRU Cache with O(1) average time for both get() and put()?",
        options: ["Queue + Stack", "HashMap + Doubly Linked List", "Heap + Array", "Trie + Queue"],
        correctAnswer: "HashMap + Doubly Linked List",
        explanation: "A HashMap provides O(1) access to nodes by keys, while a Doubly Linked List allows O(1) additions and removals to keep track of the most and least recently used elements."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q4.** What is the worst-case time complexity of searching an element in a HashMap (assuming heavy collisions)?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(n)",
        explanation: "In the worst-case scenario, every single key hashes to the exact same bucket, causing a massive collision. The structure essentially degrades into a single linked list, taking O(n) time to traverse."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Hard",
        questionText: "**Q5.** Which stack variation is commonly used to solve the Largest Rectangle in Histogram problem in O(n)?",
        options: ["Normal Stack", "Monotonic Increasing Stack", "Priority Queue", "Circular Queue"],
        correctAnswer: "Monotonic Increasing Stack",
        explanation: "A monotonic increasing stack keeps elements in a strictly increasing order. It allows efficient calculation of the 'next smaller' and 'previous smaller' bounds for each bar in the histogram in just O(n) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q6.** Which data structure is typically used to evaluate a postfix (Reverse Polish) expression?",
        options: ["Queue", "Stack", "Linked List", "Trie"],
        correctAnswer: "Stack",
        explanation: "A stack is perfect for postfix evaluation: you push operands onto the stack, and whenever you encounter an operator, you pop the top two operands, evaluate them, and push the result back onto the stack."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q7.** Which traversal of an expression tree produces the postfix expression?",
        options: ["Preorder", "Inorder", "Postorder", "Level Order"],
        correctAnswer: "Postorder",
        explanation: "A Postorder traversal visits the Left child, then the Right child, and finally the Root. When applied to an abstract syntax tree, it naturally generates the postfix (Reverse Polish) notation."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Hard",
        questionText: "**Q8.** A queue implemented using two stacks has an amortized dequeue complexity of:",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correctAnswer: "O(1)",
        explanation: "Although moving all elements from the 'push stack' to the 'pop stack' takes O(n) time, this expensive operation happens rarely. On average, each element is moved exactly once, making the amortized cost of a dequeue O(1)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q9.** Which recursion technique stores previously computed results to avoid recomputation?",
        options: ["Backtracking", "Memoization", "Divide and Conquer", "Greedy"],
        correctAnswer: "Memoization",
        explanation: "Memoization is a top-down dynamic programming technique where the results of expensive, overlapping recursive function calls are cached (stored) to prevent redundant calculations."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q10.** Which recursion problem is most commonly solved using backtracking?",
        options: ["Binary Search", "N-Queens", "Merge Sort", "Heap Sort"],
        correctAnswer: "N-Queens",
        explanation: "The N-Queens problem is a classic backtracking scenario. The algorithm places queens on a board and, upon detecting a conflict, backtracks (undoes choices) to try alternate configurations."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q11.** What is the time complexity of reversing a singly linked list iteratively?",
        options: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
        correctAnswer: "O(n)",
        explanation: "Reversing a singly linked list requires making exactly one pass through all 'n' nodes to flip their 'next' pointers. Thus, the time complexity is linear, O(n)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q12.** Which linked list is most suitable for implementing an LRU Cache?",
        options: ["Singly Linked List", "Circular Linked List", "Doubly Linked List", "XOR Linked List"],
        correctAnswer: "Doubly Linked List",
        explanation: "An LRU cache requires removing and inserting items in O(1) time. A Doubly Linked List is necessary because it allows you to detach a node from the middle instantly using its previous and next pointers."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q13.** A balanced parentheses checker is best implemented using:",
        options: ["Queue", "Stack", "Heap", "HashMap"],
        correctAnswer: "Stack",
        explanation: "A stack perfectly matches the Last-In-First-Out (LIFO) nature of nested parentheses. You push opening brackets onto the stack and pop them when a matching closing bracket appears."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q14.** Which data structure is ideal for implementing browser back/forward navigation?",
        options: ["Queue", "Two Stacks", "Trie", "Heap"],
        correctAnswer: "Two Stacks",
        explanation: "One stack is used to maintain the history of pages for the 'Back' button, and a second stack stores the pages for the 'Forward' button."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q15.** Which traversal of a binary tree naturally uses a queue?",
        options: ["Inorder", "Preorder", "Postorder", "Level Order (BFS)"],
        correctAnswer: "Level Order (BFS)",
        explanation: "Level order traversal (Breadth-First Search) explores the tree level by level. A queue's First-In-First-Out (FIFO) structure efficiently keeps track of the child nodes that need to be visited next."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q16.** Which hashing technique resolves collisions by storing multiple values in the same bucket?",
        options: ["Linear Probing", "Double Hashing", "Separate Chaining", "Quadratic Probing"],
        correctAnswer: "Separate Chaining",
        explanation: "Separate chaining handles hash collisions by maintaining a secondary data structure (usually a linked list) at each bucket index to hold all elements that map to that specific key."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q17.** The average-case complexity of insertion into a well-designed HashMap is:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correctAnswer: "O(1)",
        explanation: "A well-designed HashMap, featuring a robust hash function and a well-managed load factor, resolves indices directly, offering an average O(1) constant time complexity for insertions and lookups."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q18.** Which recursion problem has an exponential time complexity in its naive recursive implementation but becomes polynomial with memoization?",
        options: ["Binary Search", "Fibonacci", "Merge Sort", "Heapify"],
        correctAnswer: "Fibonacci",
        explanation: "The naive recursive calculation of Fibonacci sequences leads to massive redundant computations, yielding O(2ⁿ) complexity. Caching previous results (memoization) reduces this to a linear O(n)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q19.** Which stack-based algorithm converts an infix expression to postfix?",
        options: ["Prim's Algorithm", "Shunting Yard Algorithm", "KMP Algorithm", "Dijkstra's Shortest Path"],
        correctAnswer: "Shunting Yard Algorithm",
        explanation: "Edsger Dijkstra invented the Shunting Yard Algorithm. It utilizes a stack to temporarily hold operators, ensuring they are placed in the output postfix string according to their correct precedence."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q20.** A recursive function calls itself until a stopping condition is met. What is the stopping condition called?",
        options: ["Pivot", "Base Case", "Sentinel", "Breakpoint"],
        correctAnswer: "Base Case",
        explanation: "The base case acts as the termination condition for a recursive function. Without it, the function would call itself infinitely, resulting in a Stack Overflow error."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q21.** Which linked list operation is O(1) when a pointer to the node is already available (excluding tail cases)?",
        options: ["Search", "Delete Node", "Find Middle", "Reverse Entire List"],
        correctAnswer: "Delete Node",
        explanation: "If you have a direct pointer to the node to be deleted, you can copy the data of the 'next' node into the current node and bypass the 'next' node, effectively deleting it in O(1) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q22.** Which data structure is most appropriate for implementing Undo/Redo functionality in an editor?",
        options: ["Queue", "Two Stacks", "HashMap", "BST"],
        correctAnswer: "Two Stacks",
        explanation: "Undo/Redo naturally follows a Last-In-First-Out model. One stack is used to record the 'Undo' history, while a secondary stack is used to store actions that have been undone so they can be 'Redone'."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q23.** Which recursive traversal is most useful for deleting an entire binary tree?",
        options: ["Inorder", "Preorder", "Postorder", "Level Order"],
        correctAnswer: "Postorder",
        explanation: "Postorder traversal visits the Left child, the Right child, and finally the Root. This ensures that you safely delete all of a node's children before deleting the node itself, avoiding dangling pointers."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q24.** Which hashing property ensures that even a small input change produces a drastically different hash?",
        options: ["Stability", "Avalanche Effect", "Compression", "Locality"],
        correctAnswer: "Avalanche Effect",
        explanation: "The avalanche effect is a desirable property in hash functions and cryptography. It ensures that changing just a single bit in the input causes approximately 50% of the output bits to flip."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q25.** A Deque supports insertion and deletion:",
        options: ["Only at the front", "Only at the rear", "At both the front and rear", "Only in the middle"],
        correctAnswer: "At both the front and rear",
        explanation: "A Deque (Double-Ended Queue) is a versatile linear collection that supports adding and removing elements from both ends (front and rear) in O(1) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q26.** Which algorithm uses recursion internally in its standard implementation?",
        options: ["Merge Sort", "Selection Sort", "Bubble Sort", "Counting Sort"],
        correctAnswer: "Merge Sort",
        explanation: "Merge Sort relies heavily on the Divide and Conquer paradigm. It recursively splits the array into halves until single elements remain, and then merges them back together."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q27.** Which data structure is best for checking whether a string is a palindrome using iterative techniques?",
        options: ["Queue", "Stack", "Heap", "Trie"],
        correctAnswer: "Stack",
        explanation: "By pushing the first half of a string onto a stack and then popping it to compare with the second half, the LIFO property of the stack perfectly mirrors the palindrome logic."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Easy",
        questionText: "**Q28.** The maximum depth of recursion is primarily limited by:",
        options: ["Heap Memory", "Stack Memory", "Cache Memory", "Hard Disk"],
        correctAnswer: "Stack Memory",
        explanation: "Each recursive call allocates a new frame on the system's Call Stack to store local variables and return addresses. Excessive depth exhausts this memory, leading to a Stack Overflow."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Medium",
        questionText: "**Q29.** Which linked list technique is commonly used to find the middle node in one traversal?",
        options: ["Binary Search", "Fast and Slow Pointers", "Prefix Sum", "Sliding Window"],
        correctAnswer: "Fast and Slow Pointers",
        explanation: "Using the Tortoise and Hare approach: if you advance a fast pointer two nodes at a time and a slow pointer one node at a time, the slow pointer will rest at the exact middle when the fast pointer reaches the end."
    },
    {
        category: "Data Structures & Algorithms", topic: "Linked Lists, Stacks, Queues & Recursion", difficulty: "Hard",
        questionText: "**Q30.** A recursive algorithm has a branching factor of 2 and a recursion depth of n. Ignoring pruning, its time complexity is generally:",
        options: ["O(n)", "O(log n)", "O(2ⁿ)", "O(n²)"],
        correctAnswer: "O(2ⁿ)",
        explanation: "A recursion tree where each node spawns 2 children (branching factor 2) and extends to a depth of n will have 2ⁿ leaves. Without pruning or memoization, the time complexity is exponential O(2ⁿ)."
    }
];

const seedDSAPart2 = async () => {
    try {
        console.log("🧹 Clearing old Linked Lists, Stacks, Queues & Recursion records...");
        await Question.deleteMany({ topic: "Linked Lists, Stacks, Queues & Recursion" }); 
        
        console.log(`🚀 Injecting ${dsaQuestionsPart2.length} Formatted Questions...`);
        await Question.insertMany(dsaQuestionsPart2);
        
        console.log(`✅ SUCCESS! All 30 Questions Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedDSAPart2();