const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); // Apne path ke hisaab se adjust kar lena

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for DSA Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const dsaQuestions = [
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q1.** Which sorting algorithm has the best average-case time complexity among the following while also being stable?",
        options: ["Quick Sort", "Heap Sort", "Merge Sort", "Selection Sort"],
        correctAnswer: "Merge Sort",
        explanation: "Merge Sort has an average and worst-case time complexity of O(n log n) and it is a stable sorting algorithm (it preserves the relative order of equal elements). Quick Sort and Heap Sort are not stable."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q2.** Given a sorted array containing duplicate values, which algorithm finds the first occurrence of a target in O(log n) time?",
        options: ["Linear Search", "Standard Binary Search", "Modified Binary Search", "Jump Search"],
        correctAnswer: "Modified Binary Search",
        explanation: "A modified Binary Search continues to search in the left half of the array even after finding the target, ensuring that it locates the absolute first occurrence in O(log n) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Hard",
        questionText: "**Q3.** Which algorithm is most suitable for finding the k-th smallest element in an unsorted array with average O(n) complexity?",
        options: ["Merge Sort", "Heap Sort", "Quick Select", "Bubble Sort"],
        correctAnswer: "Quick Select",
        explanation: "Quick Select uses the partitioning logic of Quick Sort but only recurses into one half of the array. This gives it an average time complexity of O(n) for finding the k-th smallest/largest element."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Easy",
        questionText: "**Q4.** Which sorting algorithm has the worst-case time complexity O(n²) but performs O(n) on an already sorted array?",
        options: ["Selection Sort", "Bubble Sort (optimized)", "Heap Sort", "Merge Sort"],
        correctAnswer: "Bubble Sort (optimized)",
        explanation: "An optimized Bubble Sort keeps a flag to check if any swaps were made during a pass. If no swaps occur, it terminates early, running in O(n) time on an already sorted array."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q5.** The Sliding Window technique is most useful when:",
        options: ["Random access is impossible.", "The problem involves a contiguous subarray or substring.", "Graph traversal is required.", "Dynamic Programming is mandatory."],
        correctAnswer: "The problem involves a contiguous subarray or substring.",
        explanation: "Sliding Window is an optimization technique used to reduce nested loops into a single loop by maintaining a 'window' of elements, which is ideal for contiguous subarray or substring problems."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q6.** Kadane's Algorithm is used to find:",
        options: ["Longest Increasing Subsequence", "Maximum Sum Contiguous Subarray", "Minimum Spanning Tree", "Shortest Path"],
        correctAnswer: "Maximum Sum Contiguous Subarray",
        explanation: "Kadane's Algorithm efficiently finds the maximum sum of a contiguous subarray in an array of numbers in O(n) time by keeping track of the current subarray sum and the maximum sum found so far."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q7.** The Dutch National Flag Algorithm is primarily used to:",
        options: ["Reverse an array", "Sort an array containing only three distinct values", "Find duplicates", "Merge two sorted arrays"],
        correctAnswer: "Sort an array containing only three distinct values",
        explanation: "The Dutch National Flag algorithm (often used for sorting an array of 0s, 1s, and 2s) sorts an array of three distinct values in a single pass O(n) using three pointers."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q8.** Which sorting algorithm is in-place but not stable?",
        options: ["Merge Sort", "Quick Sort", "Bubble Sort", "Insertion Sort"],
        correctAnswer: "Quick Sort",
        explanation: "Quick Sort sorts the array in-place (requiring O(log n) auxiliary stack space) but swapping elements across large distances breaks the relative order of equal elements, making it unstable."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Easy",
        questionText: "**Q9.** Which searching algorithm requires the input array to be sorted?",
        options: ["Linear Search", "Binary Search", "Hash Search", "DFS"],
        correctAnswer: "Binary Search",
        explanation: "Binary Search relies on dividing the search interval in half. This logic only works if the elements are already ordered (sorted)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Easy",
        questionText: "**Q10.** The time complexity of Binary Search is:",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswer: "O(log n)",
        explanation: "Binary Search halves the search space during every step, resulting in a logarithmic time complexity O(log n)."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Easy",
        questionText: "**Q11.** Which algorithm is stable?",
        options: ["Heap Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
        correctAnswer: "Merge Sort",
        explanation: "Merge Sort maintains the relative order of equal elements during the merge phase, making it a stable sort. Heap, Quick, and Selection sorts are inherently unstable."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Easy",
        questionText: "**Q12.** Which data structure is commonly used for implementing Prefix Sum queries?",
        options: ["Stack", "Queue", "Array", "Graph"],
        correctAnswer: "Array",
        explanation: "Prefix sums are typically precomputed and stored in an auxiliary Array. This allows range sum queries on the original data to be answered in O(1) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Easy",
        questionText: "**Q13.** Which algorithm is preferred for merging two already sorted arrays?",
        options: ["Two Pointer Technique", "DFS", "BFS", "Binary Search"],
        correctAnswer: "Two Pointer Technique",
        explanation: "By placing one pointer at the beginning of each array and comparing elements, the Two Pointer technique merges two sorted arrays in O(n + m) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q14.** Which sorting algorithm has worst-case O(n log n) and is in-place?",
        options: ["Merge Sort", "Heap Sort", "Bubble Sort", "Insertion Sort"],
        correctAnswer: "Heap Sort",
        explanation: "Heap Sort runs in O(n log n) time in all cases (best, average, worst) and does not require additional auxiliary array space (O(1) space), making it an in-place algorithm."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Easy",
        questionText: "**Q15.** The best-case complexity of Insertion Sort is:",
        options: ["O(n²)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(n)",
        explanation: "In the best-case scenario, where the array is already sorted, Insertion Sort only compares each element with its predecessor once, resulting in an O(n) time complexity."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Hard",
        questionText: "**Q16.** Given:\n\n\`\`\`cpp\nvector<int> arr = {1,2,3,4,5};\nfor(int x : arr){\n    if(x % 2 == 0)\n        arr.push_back(x);\n}\n\`\`\`\n\nWhat is the most likely outcome?",
        options: [
            "Correctly appends all even numbers.",
            "Undefined Behavior due to modifying a vector during range-based iteration.",
            "Compile-time Error.",
            "Infinite loop."
        ],
        correctAnswer: "Undefined Behavior due to modifying a vector during range-based iteration.",
        explanation: "Modifying a C++ vector (like pushing elements) while iterating over it using a range-based for loop can cause the underlying array to reallocate. This invalidates the iterators being used, leading to Undefined Behavior."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Hard",
        questionText: "**Q17.** Which algorithm is most suitable for finding the median of two sorted arrays of sizes m and n in O(log(min(m,n)))?",
        options: ["Merge both arrays", "Binary Search Partition", "Heap Sort", "Quick Sort"],
        correctAnswer: "Binary Search Partition",
        explanation: "To achieve O(log(min(m,n))) time, you perform a Binary Search on the smaller array to find the correct partition point where the left elements of both arrays are smaller than the right elements."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q18.** A sorted array has been rotated an unknown number of times.\n\nWhich algorithm finds a target in O(log n)?",
        options: ["Linear Search", "Modified Binary Search", "BFS", "Merge Sort"],
        correctAnswer: "Modified Binary Search",
        explanation: "A Modified Binary Search checks which half of the rotated array is properly sorted, and then determines if the target lies within that sorted half to decide where to search next."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q19.** Which sorting algorithm has the best cache locality, making it very fast in practice despite an average complexity of O(n log n)?",
        options: ["Merge Sort", "Heap Sort", "Quick Sort", "Counting Sort"],
        correctAnswer: "Quick Sort",
        explanation: "Quick Sort accesses elements sequentially during the partitioning phase, making it highly cache-friendly. This hardware-level efficiency makes it faster in practice than Merge or Heap sort."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q20.** Which statement about Quick Sort is correct?",
        options: [
            "Worst-case complexity is always O(n log n).",
            "Choosing a random pivot helps avoid worst-case behavior on average.",
            "It is stable by default.",
            "It requires O(n) extra memory."
        ],
        correctAnswer: "Choosing a random pivot helps avoid worst-case behavior on average.",
        explanation: "Quick Sort's worst-case is O(n²) (usually when the array is already sorted). Using a randomized pivot ensures that the worst-case scenario becomes extremely unlikely."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q21.** An array contains numbers from 1 to n, with exactly one duplicate and one missing number.\n\nWhich solution achieves O(n) time and O(1) extra space (excluding output)?",
        options: ["Sort the array", "Use a HashMap", "Use mathematical/XOR approach", "Binary Search"],
        correctAnswer: "Use mathematical/XOR approach",
        explanation: "By calculating the expected sum (and sum of squares) or by using XOR operations on the array elements vs numbers 1 to n, you can find the missing and duplicate numbers in O(n) time and O(1) space."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Easy",
        questionText: "**Q22.** What is the time complexity of finding the maximum-sum subarray using Kadane's Algorithm?",
        options: ["O(n²)", "O(log n)", "O(n)", "O(n log n)"],
        correctAnswer: "O(n)",
        explanation: "Kadane's Algorithm processes each element of the array exactly once, keeping a running sum, which gives it a linear O(n) time complexity."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q23.** You need to answer 10⁶ range sum queries on a static array.\n\nWhich preprocessing technique is most appropriate?",
        options: ["Binary Search", "Prefix Sum", "Sliding Window", "Heap"],
        correctAnswer: "Prefix Sum",
        explanation: "Precomputing a Prefix Sum array takes O(n) time once. After that, any range sum query `sum(i, j)` can be answered instantly in O(1) time using `prefix[j] - prefix[i-1]`."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q24.** Which algorithm is commonly used to merge k sorted arrays efficiently?",
        options: ["Bubble Sort", "Min Heap (Priority Queue)", "Selection Sort", "DFS"],
        correctAnswer: "Min Heap (Priority Queue)",
        explanation: "A Min Heap can keep track of the smallest current element from each of the k arrays. This allows you to efficiently merge all arrays in O(N log k) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q25.** Which statement about Counting Sort is correct?",
        options: [
            "It is comparison-based.",
            "It works efficiently when the value range is small.",
            "It always uses O(1) extra space.",
            "It works efficiently for arbitrary floating-point values."
        ],
        correctAnswer: "It works efficiently when the value range is small.",
        explanation: "Counting Sort is a non-comparison sort that creates a frequency array based on the range of input values. If the range is small (close to n), it runs in O(n) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q26.** Which sorting algorithm is stable and often used as a subroutine in Radix Sort?",
        options: ["Quick Sort", "Heap Sort", "Counting Sort", "Selection Sort"],
        correctAnswer: "Counting Sort",
        explanation: "Radix sort processes digits position by position. It requires a stable sorting algorithm as its subroutine to maintain the order of previously sorted digits, and Counting Sort fits perfectly."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Easy",
        questionText: "**Q27.** A string contains only lowercase English letters.\n\nWhich data structure provides the fastest average-time character frequency counting?",
        options: ["Balanced BST", "HashMap", "Fixed-size Array of length 26", "Queue"],
        correctAnswer: "Fixed-size Array of length 26",
        explanation: "Since the character set is strictly limited to 26 lowercase letters, a simple array `freq[26]` offers ultra-fast O(1) access and uses minimal memory compared to HashMaps or Trees."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q28.** Which algorithm is best suited to find the longest substring without repeating characters in O(n)?",
        options: ["Merge Sort", "Sliding Window + HashMap", "Binary Search", "BFS"],
        correctAnswer: "Sliding Window + HashMap",
        explanation: "The Sliding Window technique, paired with a HashMap (or Set) to track character indices, allows you to expand and contract a window in O(n) time to find the longest unique substring."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Hard",
        questionText: "**Q29.** Which algorithm finds a pattern in a text with an average complexity of O(n + m) by using the Longest Prefix Suffix (LPS) array?",
        options: ["Rabin–Karp", "Boyer–Moore", "KMP (Knuth–Morris–Pratt)", "Z Algorithm"],
        correctAnswer: "KMP (Knuth–Morris–Pratt)",
        explanation: "The KMP algorithm avoids redundant character comparisons by precomputing an LPS (Longest Prefix which is also Suffix) array, ensuring the search completes in O(n + m) time."
    },
    {
        category: "Data Structures & Algorithms", topic: "Searching, Sorting & Arrays", difficulty: "Medium",
        questionText: "**Q30.** You need to continuously maintain the k largest elements from a stream of millions of integers.\n\nWhich data structure is the most efficient?",
        options: ["Stack", "Queue", "Min Heap of size k", "Linked List"],
        correctAnswer: "Min Heap of size k",
        explanation: "A Min Heap of strictly size 'k' will keep the k-th largest element at its root. For any new number, if it's larger than the root, you pop the root and push the new number, handling streams effortlessly in O(log k) per element."
    }
];

const seedDSAQuestions = async () => {
    try {
        console.log("🧹 Clearing old DSA records...");
        await Question.deleteMany({ topic: "Searching, Sorting & Arrays" }); 
        
        console.log(`🚀 Injecting ${dsaQuestions.length} Formatted Questions...`);
        await Question.insertMany(dsaQuestions);
        
        console.log(`✅ SUCCESS! All 30 DSA Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedDSAQuestions();