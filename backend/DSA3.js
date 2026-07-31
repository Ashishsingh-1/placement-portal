const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); // Apne path ke hisaab se adjust kar lena

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Advanced DSA Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const advancedDsaQuestions = [
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q1.** Which traversal of a Binary Search Tree (BST) always produces the keys in sorted order?",
        options: ["Preorder", "Postorder", "Inorder", "Level Order"],
        correctAnswer: "Inorder",
        explanation: "An inorder traversal of a BST explores the Left subtree, then the Root, then the Right subtree, which naturally visits the nodes in monotonically increasing (sorted) order."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q2.** A BST is built by inserting the following keys in order:\n\n\`\`\`text\n50, 30, 70, 20, 40, 60, 80\n\`\`\`\n\nWhich node is the inorder successor of 50?",
        options: ["40", "60", "70", "80"],
        correctAnswer: "60",
        explanation: "The inorder successor is the smallest node in the right subtree. 50's right child is 70, and the leftmost (smallest) child of 70 is 60."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q3.** What is the worst-case time complexity of searching in an unbalanced BST?",
        options: ["O(log n)", "O(1)", "O(n)", "O(n log n)"],
        correctAnswer: "O(n)",
        explanation: "In the worst case (e.g., if keys are inserted in already sorted order), a BST degrades into a linear linked list, meaning a search must traverse all n nodes, resulting in O(n) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q4.** Which self-balancing tree guarantees a height of O(log n) after every insertion and deletion?",
        options: ["Binary Tree", "AVL Tree", "Trie", "Heap"],
        correctAnswer: "AVL Tree",
        explanation: "AVL Trees use left and right rotations after insertions and deletions to strictly maintain balance, ensuring the tree height never exceeds O(log n)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q5.** In an AVL Tree, the balance factor of every node must be:",
        options: ["Between -2 and 2", "Between -1 and 1", "Equal to 0", "Greater than 1"],
        correctAnswer: "Between -1 and 1",
        explanation: "The balance factor is calculated as (height of left subtree - height of right subtree). For an AVL tree to remain valid, this factor must be exactly -1, 0, or 1 for every single node."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q6.** Which data structure is most suitable for efficiently finding the minimum element repeatedly?",
        options: ["Stack", "Queue", "Min Heap", "HashMap"],
        correctAnswer: "Min Heap",
        explanation: "A Min Heap is a complete binary tree where the parent is always smaller than its children. This guarantees the minimum element is always at the root, allowing O(1) access and O(log n) removal."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q7.** The time complexity of inserting an element into a Binary Heap is:",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(log n)",
        explanation: "Inserting into a binary heap involves placing the new element at the bottom of the tree and bubbling it up to its correct position. At most, it will bubble up the height of the tree, which is O(log n)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q8.** Which graph traversal algorithm guarantees the shortest path in an unweighted graph?",
        options: ["DFS", "BFS", "Dijkstra", "Prim"],
        correctAnswer: "BFS",
        explanation: "Breadth-First Search (BFS) explores the graph layer by layer, expanding outward equally. Therefore, the first time it reaches a target node, it guarantees it took the fewest number of edges (shortest path)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q9.** Which graph algorithm is commonly used for cycle detection in an undirected graph?",
        options: ["Floyd–Warshall", "Union-Find (Disjoint Set Union)", "Bellman–Ford", "KMP"],
        correctAnswer: "Union-Find (Disjoint Set Union)",
        explanation: "Union-Find is a highly efficient data structure. By iterating through edges, if two connected vertices already share the same parent (belong to the same set), a cycle is detected."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q10.** Topological Sorting is applicable only to:",
        options: ["Undirected Graphs", "Trees", "Directed Acyclic Graphs (DAGs)", "Complete Graphs"],
        correctAnswer: "Directed Acyclic Graphs (DAGs)",
        explanation: "Topological Sort orders vertices such that for every directed edge U -> V, U comes before V. This is only possible if the graph has direction and no cycles (DAG)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q11.** Which algorithm finds the shortest paths from a single source when all edge weights are non-negative?",
        options: ["Prim", "Kruskal", "Dijkstra", "Floyd–Warshall"],
        correctAnswer: "Dijkstra",
        explanation: "Dijkstra's algorithm is a greedy algorithm that efficiently finds the shortest path from a starting node to all other nodes, provided there are no negative weight edges."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q12.** Which shortest-path algorithm correctly handles negative edge weights (but no negative cycles)?",
        options: ["Dijkstra", "Bellman–Ford", "Prim", "BFS"],
        correctAnswer: "Bellman–Ford",
        explanation: "Unlike Dijkstra's, the Bellman-Ford algorithm relaxes all edges |V|-1 times, making it capable of finding shortest paths even when some edge weights are negative."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q13.** Which algorithm computes the shortest paths between every pair of vertices?",
        options: ["Kruskal", "Prim", "Floyd–Warshall", "DFS"],
        correctAnswer: "Floyd–Warshall",
        explanation: "Floyd-Warshall uses dynamic programming to systematically check all possible paths between all pairs of nodes, resulting in an All-Pairs Shortest Path matrix in O(V³) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q14.** Which Minimum Spanning Tree (MST) algorithm sorts all edges before processing?",
        options: ["Prim", "BFS", "Kruskal", "Dijkstra"],
        correctAnswer: "Kruskal",
        explanation: "Kruskal's algorithm operates by sorting all edges by ascending weight first, then iterating through them and picking edges that don't form a cycle until the MST is complete."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q15.** Which data structure is essential for implementing Kruskal's Algorithm efficiently?",
        options: ["Queue", "Stack", "Disjoint Set Union (Union-Find)", "Trie"],
        correctAnswer: "Disjoint Set Union (Union-Find)",
        explanation: "As Kruskal's algorithm adds the smallest edges to the MST, it relies heavily on Union-Find to efficiently check if adding a specific edge will create an invalid cycle."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q16.** Prim's Algorithm is generally implemented efficiently using:",
        options: ["Queue", "Priority Queue (Min Heap)", "Stack", "HashMap"],
        correctAnswer: "Priority Queue (Min Heap)",
        explanation: "Prim's algorithm grows the MST outward from a starting node by always selecting the smallest available outgoing edge. A Min Heap efficiently fetches this smallest edge in O(log V) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q17.** Which Dynamic Programming approach computes solutions by solving smaller subproblems first and building upward?",
        options: ["Memoization", "Backtracking", "Tabulation", "Divide and Conquer"],
        correctAnswer: "Tabulation",
        explanation: "Tabulation is the Bottom-Up DP approach. It avoids recursion entirely by solving base cases first and filling a table (array) sequentially until it reaches the final answer."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q18.** Memoization differs from Tabulation because Memoization:",
        options: [
            "Always uses iteration.",
            "Is a top-down approach using recursion with caching.",
            "Requires no extra memory.",
            "Never uses recursion."
        ],
        correctAnswer: "Is a top-down approach using recursion with caching.",
        explanation: "Memoization starts from the main complex problem and recursively breaks it down (Top-Down). To avoid duplicate work, it caches the results of function calls."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q19.** Which of the following is a classic Dynamic Programming problem?",
        options: ["Binary Search", "Fibonacci", "Breadth-First Search", "Heap Sort"],
        correctAnswer: "Fibonacci",
        explanation: "The Fibonacci sequence is the hallmark DP problem because it exhibits both optimal substructure and overlapping subproblems (e.g., fib(4) and fib(5) both calculate fib(3))."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q20.** Which algorithmic paradigm is used in the Activity Selection Problem?",
        options: ["Dynamic Programming", "Greedy", "Divide and Conquer", "Branch and Bound"],
        correctAnswer: "Greedy",
        explanation: "The Activity Selection Problem is solved optimally by sorting activities by their finish times and greedily picking the next compatible activity that finishes earliest."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q21.** Which greedy algorithm is used for Huffman Coding?",
        options: ["Dijkstra", "Priority Queue-based Greedy Construction", "DFS", "Binary Search"],
        correctAnswer: "Priority Queue-based Greedy Construction",
        explanation: "Huffman coding builds a compression tree by greedily combining the two nodes with the lowest frequencies at every step, making extensive use of a Priority Queue."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q22.** The time complexity of the standard Dynamic Programming solution for the 0/1 Knapsack Problem is:\n\n(Where W is the knapsack capacity)",
        options: ["O(n)", "O(nW)", "O(W²)", "O(2ⁿ)"],
        correctAnswer: "O(nW)",
        explanation: "The standard DP solution uses a 2D table of size `n` (number of items) by `W` (capacity). Filling this matrix takes O(n * W) pseudo-polynomial time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q23.** Which Dynamic Programming problem computes the minimum number of operations to transform one string into another?",
        options: ["Longest Increasing Subsequence", "Edit Distance", "Kadane's Algorithm", "Activity Selection"],
        correctAnswer: "Edit Distance",
        explanation: "Edit Distance (Levenshtein distance) calculates the minimum insertions, deletions, or substitutions needed to convert string A into string B, solvable via a 2D DP table."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q24.** The Longest Common Subsequence (LCS) problem has a standard DP complexity of:",
        options: ["O(n)", "O(n log n)", "O(n × m)", "O(2ⁿ)"],
        correctAnswer: "O(n × m)",
        explanation: "The DP approach for finding the LCS of two strings of lengths n and m involves filling an (n x m) matrix, giving it a time and space complexity of O(n × m)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Medium",
        questionText: "**Q25.** Which traversal is commonly used to serialize and deserialize a binary tree while preserving its structure?",
        options: ["Inorder only", "Level Order or Preorder with null markers", "Postorder only", "Reverse Inorder"],
        correctAnswer: "Level Order or Preorder with null markers",
        explanation: "By appending explicit 'null' markers when a node has no children during a Preorder or Level Order traversal, the exact structural topology of the tree is recorded and can be rebuilt later."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q26.** Which data structure is commonly used in Trie implementation?",
        options: ["Array/HashMap of child pointers", "Stack", "Queue", "Heap"],
        correctAnswer: "Array/HashMap of child pointers",
        explanation: "A Trie (prefix tree) node holds an array (e.g., size 26 for English letters) or a HashMap mapping characters to their corresponding child Trie nodes."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q27.** Which algorithmic technique is primarily used in the N-Queens Problem?",
        options: ["Greedy", "Dynamic Programming", "Backtracking", "BFS"],
        correctAnswer: "Backtracking",
        explanation: "The N-Queens problem is solved by placing a queen on the board, recursing, and if a dead end is met, undoing the placement (backtracking) to try the next valid cell."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Easy",
        questionText: "**Q28.** Which graph representation is generally more memory-efficient for a sparse graph?",
        options: ["Adjacency Matrix", "Adjacency List", "Incidence Matrix", "Edge Matrix"],
        correctAnswer: "Adjacency List",
        explanation: "A sparse graph has very few edges compared to vertices. An adjacency matrix takes O(V²) space mostly filled with zeroes, while an adjacency list only uses O(V + E) space."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Hard",
        questionText: "**Q29.** What is the amortized time complexity of the find() operation in a Union-Find data structure using Path Compression + Union by Rank?",
        options: ["O(log n)", "O(n)", "Nearly O(1), specifically O(α(n))", "O(√n)"],
        correctAnswer: "Nearly O(1), specifically O(α(n))",
        explanation: "Combining Path Compression and Union by Rank squashes the tree so flat that operations execute in O(α(n)) time, where α is the inverse Ackermann function (effectively O(1) for any real-world numbers)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Trees, Graphs & DP", difficulty: "Hard",
        questionText: "**Q30.** You need to design a route-planning system for a navigation application with:\n- Millions of intersections\n- Non-negative edge weights\n- Frequent shortest-path queries\n- Efficient performance\n\nWhich algorithm is the most appropriate as the core shortest-path algorithm?",
        options: ["DFS", "Bellman–Ford", "Dijkstra with a Min Heap", "Kruskal"],
        correctAnswer: "Dijkstra with a Min Heap",
        explanation: "Dijkstra's algorithm, optimized with a Min Heap/Priority Queue, efficiently scales to handle millions of nodes and is the industry standard for route planning (like GPS) when there are no negative weights."
    }
];

const seedAdvancedDsa = async () => {
    try {
        console.log("🧹 Clearing old Trees, Graphs & DP records...");
        await Question.deleteMany({ topic: "Trees, Graphs & DP" }); 
        
        console.log(`🚀 Injecting ${advancedDsaQuestions.length} Formatted Questions...`);
        await Question.insertMany(advancedDsaQuestions);
        
        console.log(`✅ SUCCESS! All 30 Questions Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedAdvancedDsa();