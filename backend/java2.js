const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Java Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const javaQuestionsBatch31to60 = [
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q31.** What is the output?\n```java\nString s1 = \"Java\";\nString s2 = \"Java\";\nString s3 = new String(\"Java\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1 == s3);\n```",
        options: ["true true", "true false", "false true", "false false"], 
        correctAnswer: "true false",
        explanation: "s1 and s2 refer to the same object in the String Pool. s3 is created explicitly using 'new', placing it in the Heap, so it has a different memory reference."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q32.** What is the output?\n```java\nString s1 = new String(\"Hello\");\nString s2 = new String(\"Hello\");\nSystem.out.println(s1.equals(s2));\nSystem.out.println(s1 == s2);\n```",
        options: ["true true", "false false", "true false", "false true"], 
        correctAnswer: "true false",
        explanation: "equals() checks logical content equality (true), while == checks reference equality (false) as they are two distinct objects in the heap."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q33.** What is the output?\n```java\nString s = \"Java\";\ns.concat(\" Programming\");\nSystem.out.println(s);\n```",
        options: ["Java Programming", "Java", "Compilation Error", "Runtime Error"], 
        correctAnswer: "Java",
        explanation: "Strings in Java are immutable. The concat() method returns a NEW string object; it does not change the original 's', so the output remains 'Java'."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q34.** What is the output?\n```java\nString s = \"Java\";\ns = s.concat(\"8\");\ns = s.concat(\" Stream\");\nSystem.out.println(s);\n```",
        options: ["Java", "Java8", "Java8 Stream", "Compilation Error"], 
        correctAnswer: "Java8 Stream",
        explanation: "The variable 's' is being reassigned to the new String objects returned by each concat() method call."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q35.** Which statement correctly explains why String is immutable in Java?",
        options: [
            "To reduce memory usage only.", 
            "To improve security, thread safety, and String Pool optimization.", 
            "Because it extends Object.", 
            "Because String objects are stored on the stack."
        ], 
        correctAnswer: "To improve security, thread safety, and String Pool optimization.",
        explanation: "Immutability allows sharing of strings in the pool, makes them thread-safe for concurrent access, and is vital for security (e.g., class loading and file paths)."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q36.** What is the output?\n```java\nStringBuilder sb = new StringBuilder(\"Java\");\nsb.append(\"8\");\nSystem.out.println(sb);\n```",
        options: ["Java", "Java8", "Compilation Error", "Runtime Error"], 
        correctAnswer: "Java8",
        explanation: "StringBuilder objects are mutable. The append() method changes the internal buffer of the same object."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q37.** Which statement about StringBuilder and StringBuffer is correct?",
        options: [
            "Both are immutable.", 
            "StringBuilder is synchronized.", 
            "StringBuffer is synchronized, StringBuilder is not.", 
            "Both have identical thread-safety guarantees."
        ], 
        correctAnswer: "StringBuffer is synchronized, StringBuilder is not.",
        explanation: "StringBuffer is thread-safe (synchronized). StringBuilder is faster because it is not synchronized (not thread-safe)."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q38.** What is the output?\n```java\nInteger a = 100;\nInteger b = 100;\nSystem.out.println(a == b);\n```",
        options: ["true", "false", "Compilation Error", "Runtime Error"], 
        correctAnswer: "true",
        explanation: "Integer objects are cached for values between -128 and 127. 'a' and 'b' point to the same cached instance."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q39.** What is the output?\n```java\nInteger a = 200;\nInteger b = 200;\nSystem.out.println(a == b);\n```",
        options: ["true", "false", "Compilation Error", "Runtime Error"], 
        correctAnswer: "false",
        explanation: "Values outside the -128 to 127 range are not cached. Each 'new Integer' or autoboxing operation creates a distinct object, making reference equality (==) false."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q40.** Which statement correctly explains the difference between Q38 and Q39?",
        options: [
            "Integer objects are always newly created.", 
            "Java caches Integer objects in the range -128 to 127.", 
            "Integer comparison always checks values.", 
            "Wrapper classes are immutable only below 127."
        ], 
        correctAnswer: "Java caches Integer objects in the range -128 to 127.",
        explanation: "Integer.valueOf() caches objects in the range of -128 to 127 for performance. Values outside this range are always newly allocated in the heap."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q41.** What is the output?\n```java\nInteger x = null;\nSystem.out.println(x + 5);\n```",
        options: ["5", "null", "NullPointerException", "Compilation Error"], 
        correctAnswer: "NullPointerException",
        explanation: "When you try to perform arithmetic on an Integer object, Java tries to unbox it. Since 'x' is null, unboxing throws a NullPointerException."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q42.** What is the output?\n`System.out.println(10 == 10.0);`",
        options: ["true", "false", "Compilation Error", "Runtime Error"], 
        correctAnswer: "true",
        explanation: "In binary comparisons, the smaller type (int) is promoted to the larger type (double). 10.0 == 10.0 evaluates to true."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q43.** What is the output?\n`System.out.println('A' + 1);`",
        options: ["A1", "B", "66", "Compilation Error"], 
        correctAnswer: "66",
        explanation: "Arithmetic operations with char promote the char to its ASCII/Unicode value. 'A' is 65, so 65 + 1 = 66."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q44.** What is the output?\n`String s = null; System.out.println(String.valueOf(s));`",
        options: ["null", "NullPointerException", "\"\"", "Compilation Error"], 
        correctAnswer: "null",
        explanation: "String.valueOf(Object) specifically checks if the object is null and returns the string \"null\" instead of throwing an exception."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q45.** What is the output?\n`String s = null; System.out.println(s.length());`",
        options: ["0", "null", "NullPointerException", "Compilation Error"], 
        correctAnswer: "NullPointerException",
        explanation: "Invoking any method (like length()) on a reference pointing to null immediately results in a NullPointerException."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q46.** What is the output of the try-catch-finally block?",
        options: ["A B C D", "A C D", "A D", "Compilation Error"], 
        correctAnswer: "A C D",
        explanation: "The exception (10/0) triggers the catch block ('C '). Regardless of the exception, the finally block always executes ('D')."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q47.** What is the output?\n```java\npublic class Test { public static void main(String[] args) {\ntry { return; } finally { System.out.print(\"Finally\"); } }\n}\n```",
        options: ["No Output", "Finally", "Compilation Error", "Runtime Error"], 
        correctAnswer: "Finally",
        explanation: "The 'finally' block is guaranteed to execute even if a 'return' statement is encountered in the try block."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q48.** Which statement about the finally block is correct?",
        options: [
            "It executes only when an exception occurs.", 
            "It never executes if a return statement is present.", 
            "It generally executes whether or not an exception occurs.", 
            "It executes only for checked exceptions."
        ], 
        correctAnswer: "It generally executes whether or not an exception occurs.",
        explanation: "The finally block is designed to hold cleanup code (like closing files/connections) that MUST run, regardless of success or failure."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q49.** Which of the following is a checked exception?",
        options: ["ArithmeticException", "NullPointerException", "IOException", "ArrayIndexOutOfBoundsException"], 
        correctAnswer: "IOException",
        explanation: "IOException is a checked exception. The Java compiler forces you to either handle it (try-catch) or declare it (throws), as these are often external to code execution."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q50.** Which of the following is an unchecked exception?",
        options: ["SQLException", "ClassNotFoundException", "IOException", "NullPointerException"], 
        correctAnswer: "NullPointerException",
        explanation: "NullPointerException is an unchecked exception (Runtime Exception), indicating a logic error in code. The compiler does not force the programmer to handle it."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q51.** What is the output?\n```java\ntry { throw new RuntimeException(); } catch (Exception e) { System.out.print(\"Exception\"); }\n```",
        options: ["RuntimeException", "Exception", "Compilation Error", "No Output"], 
        correctAnswer: "Exception",
        explanation: "The catch block catches the RuntimeException because RuntimeException is a subclass of the caught Exception class (polymorphism)."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q52.** Which keyword is used to declare that a method may throw a checked exception?",
        options: ["throw", "throws", "finally", "catch"], 
        correctAnswer: "throws",
        explanation: "The 'throws' keyword is used in method signatures to indicate that a method might throw one or more checked exceptions to the caller."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q53.** Which interface must a class implement to define its natural ordering?",
        options: ["Comparator", "Comparable", "Collection", "Iterable"], 
        correctAnswer: "Comparable",
        explanation: "A class implementing Comparable defines its own natural default sorting order (via the compareTo method)."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q54.** Which interface is used when multiple sorting orders are required for the same class?",
        options: ["Comparable", "Comparator", "Serializable", "Cloneable"], 
        correctAnswer: "Comparator",
        explanation: "A Comparator provides a separate class for custom sorting logic (e.g., sort by name, sort by age), allowing for multiple sorting behaviors."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q55.** Which collection does not allow duplicate elements?",
        options: ["ArrayList", "LinkedList", "HashSet", "Vector"], 
        correctAnswer: "HashSet",
        explanation: "The Set interface (implemented by HashSet) is designed explicitly to forbid duplicate elements and does not guarantee insertion order."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q56.** Which collection preserves insertion order while still preventing duplicates?",
        options: ["HashSet", "TreeSet", "LinkedHashSet", "PriorityQueue"], 
        correctAnswer: "LinkedHashSet",
        explanation: "LinkedHashSet uses a doubly-linked list running through its hash table to preserve the order in which elements were originally inserted."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q57.** Which collection automatically stores its elements in sorted order?",
        options: ["ArrayList", "LinkedHashSet", "TreeSet", "HashMap"], 
        correctAnswer: "TreeSet",
        explanation: "TreeSet implements the NavigableSet interface and stores elements in a tree structure, ensuring all elements remain sorted based on their natural ordering."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q58.** Which statement about HashMap is correct?",
        options: [
            "Keys must always be unique.", 
            "Values must always be unique.", 
            "Duplicate keys are allowed and stored separately.", 
            "Null keys are not allowed."
        ], 
        correctAnswer: "Keys must always be unique.",
        explanation: "HashMap stores data as key-value pairs. Keys must be unique; if you put an entry with an existing key, the old value associated with that key is overwritten."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q59.** Which data structure is used internally by Java's HashMap (Java 8+) to improve worst-case lookup performance in heavily-colliding buckets?",
        options: ["Stack only", "Queue only", "Linked List and Red-Black Tree", "Heap"], 
        correctAnswer: "Linked List and Red-Black Tree",
        explanation: "Java 8 HashMap uses Linked Lists for buckets with few items, but automatically converts a bucket to a Red-Black Tree when items exceed a certain threshold (8), reducing worst-case time complexity from O(n) to O(log n)."
    },
    {
        category: "Java", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q60.** Which statement best explains why a class used as a key in a HashMap should correctly override both equals() and hashCode()?",
        options: [
            "To reduce object size.", 
            "To ensure correct hashing behavior and key lookup.", 
            "To allow serialization.", 
            "To improve garbage collection."
        ], 
        correctAnswer: "To ensure correct hashing behavior and key lookup.",
        explanation: "HashMap needs hashCode() to identify the correct bucket and equals() to find the specific key within that bucket. If they are inconsistent, the HashMap will fail to retrieve values."
    }
];

const seedJavaQuestions31to60 = async () => {
    try {
        // Uncomment to wipe the collection if needed!
        // await Question.deleteMany({ category: "Java", topic: "Intermediate" }); 
        
        console.log(`🚀 Injecting ${javaQuestionsBatch31to60.length} Intermediate Java Questions...`);
        await Question.insertMany(javaQuestionsBatch31to60);
        
        console.log(`✅ SUCCESS! Questions 31 to 60 Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding Java data:", error);
        process.exit(1);
    }
};

seedJavaQuestions31to60();