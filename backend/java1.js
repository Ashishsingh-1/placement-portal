const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Java Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const javaQuestionsBatch1to30 = [
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q1.** Which component is responsible for executing Java bytecode?",
        options: ["JDK", "JRE", "JVM", "JIT Compiler"], 
        correctAnswer: "JVM",
        explanation: "The Java Virtual Machine (JVM) is the engine that actually executes the Java bytecode (.class files) by converting it into machine-specific code."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q2.** Which of the following correctly represents the relationship among JDK, JRE, and JVM?",
        options: ["JVM ⊃ JRE ⊃ JDK", "JDK ⊃ JRE ⊃ JVM", "JRE ⊃ JVM ⊃ JDK", "JDK ⊃ JVM ⊃ JRE"], 
        correctAnswer: "JDK ⊃ JRE ⊃ JVM",
        explanation: "The Java Development Kit (JDK) contains the Java Runtime Environment (JRE) plus development tools. The JRE contains the Java Virtual Machine (JVM) plus core libraries."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q3.** Which statement about the JIT (Just-In-Time) Compiler is correct?",
        options: [
            "It converts Java source code into bytecode.", 
            "It converts bytecode into native machine code at runtime.", 
            "It replaces the JVM.", 
            "It executes Java programs without bytecode."
        ], 
        correctAnswer: "It converts bytecode into native machine code at runtime.",
        explanation: "The JIT compiler is a part of the JVM. To improve performance, it compiles frequently executed bytecode sequences into native machine code at runtime."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q4.** Which Java feature is primarily responsible for 'Write Once, Run Anywhere' (WORA)?",
        options: [
            "Garbage Collection", 
            "Bytecode executed by the JVM", 
            "Method Overloading", 
            "Serialization"
        ], 
        correctAnswer: "Bytecode executed by the JVM",
        explanation: "Java compilers do not compile to platform-specific machine code; they compile to platform-independent bytecode. A platform-specific JVM then interprets this bytecode, achieving WORA."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q5.** Which of the following is NOT a Java primitive data type?",
        options: ["int", "boolean", "String", "char"], 
        correctAnswer: "String",
        explanation: "In Java, String is not a primitive data type; it is a reference type (a Class). The 8 primitives are byte, short, int, long, float, double, char, and boolean."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q6.** What is the default value of an instance variable of type boolean?",
        options: ["true", "false", "null", "0"], 
        correctAnswer: "false",
        explanation: "In Java, uninitialized instance and static variables of type boolean are automatically assigned the default value of false."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q7.** Which primitive data type occupies 64 bits in Java?",
        options: ["int", "short", "long", "byte"], 
        correctAnswer: "long",
        explanation: "In Java, the 'long' and 'double' data types both occupy 64 bits (8 bytes) of memory. An 'int' takes 32 bits."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q8.** Which keyword is used to declare a constant variable in Java?",
        options: ["const", "final", "static", "immutable"], 
        correctAnswer: "final",
        explanation: "The 'final' keyword is used in Java to declare a constant. Once a final variable has been assigned a value, it cannot be modified."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q9.** Which operator is used to compare object references in Java?",
        options: ["equals()", "==", "compareTo()", "instanceof"], 
        correctAnswer: "==",
        explanation: "The '==' operator checks for reference equality (i.e., whether two references point to the exact same object in memory). The equals() method is used to compare logical value equivalence."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q10.** What is the output of the following code?\n`System.out.println(10 + 20 + \"Java\");`",
        options: ["Java1020", "30Java", "1020Java", "Compilation Error"], 
        correctAnswer: "30Java",
        explanation: "Evaluation happens from left to right. First, 10 + 20 is evaluated mathematically as 30. Then, 30 is concatenated with the string 'Java', resulting in '30Java'."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q11.** What is the output of the following code?\n`System.out.println(\"Java\" + 10 + 20);`",
        options: ["Java30", "Java1020", "30Java", "Compilation Error"], 
        correctAnswer: "Java1020",
        explanation: "Evaluation is left to right. 'Java' + 10 concatenates into 'Java10'. Then 'Java10' + 20 concatenates into 'Java1020'."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q12.** Which keyword is used to determine whether an object belongs to a particular class or interface?",
        options: ["typeof", "instanceof", "classof", "objectof"], 
        correctAnswer: "instanceof",
        explanation: "The 'instanceof' operator is used to test whether a given object is an instance of a specific class or implements a specific interface."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q13.** Which statement about local variables is correct?",
        options: [
            "They receive default values automatically.", 
            "They must be initialized before use.", 
            "They are stored in the heap.", 
            "They are always declared as static."
        ], 
        correctAnswer: "They must be initialized before use.",
        explanation: "Unlike instance variables, local variables (declared inside methods) do not get default values. The compiler enforces that they must be explicitly initialized before they are used."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q14.** Which memory area stores objects created using the new keyword?",
        options: ["Stack", "Heap", "Method Area", "Register"], 
        correctAnswer: "Heap",
        explanation: "In Java, all objects and their instance variables are dynamically allocated memory on the Heap during runtime when the 'new' keyword is used."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q15.** Which memory area stores local variables and method call information?",
        options: ["Heap", "Stack", "Method Area", "Constant Pool"], 
        correctAnswer: "Stack",
        explanation: "The Stack memory is used for static memory allocation and the execution of threads. It contains method-specific values like primitive local variables and references to objects."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q16.** What is the output of the following code?\n```java\nclass Test {\n    int x = 10;\n    Test() {\n        System.out.print(x + \" \");\n        x = 20;\n    }\n    public static void main(String[] args) {\n        Test t = new Test();\n        System.out.print(t.x);\n    }\n}\n```",
        options: ["10 20", "20 20", "10 10", "Compilation Error"], 
        correctAnswer: "10 20",
        explanation: "When `new Test()` is called, x is initialized to 10. The constructor prints '10 ', then updates x to 20. Back in main, `System.out.print(t.x)` prints the updated value, '20'."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q17.** What is the output?\n```java\nclass A { A() { System.out.print(\"A \"); } }\nclass B extends A { B() { System.out.print(\"B \"); } \npublic static void main(String[] args) { new B(); } }\n```",
        options: ["B A", "A B", "A", "Compilation Error"], 
        correctAnswer: "A B",
        explanation: "When a child class object (B) is created, the compiler implicitly inserts `super()` as the first line in its constructor, causing the parent (A) constructor to execute first."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q18.** What is the output?\n```java\nclass A { static { System.out.print(\"A \"); } }\npublic class Test { static { System.out.print(\"B \"); } \npublic static void main(String[] args) { new A(); } }\n```",
        options: ["A B", "B A", "A", "B"], 
        correctAnswer: "B A",
        explanation: "When the JVM starts, it loads the main class 'Test' first, executing its static block ('B '). Then inside main, 'new A()' loads class A, executing its static block ('A ')."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q19.** What is the output?\n```java\nclass Test {\n    static int x = 5;\n    public static void main(String[] args) {\n        System.out.println(++x + x++);\n    }\n}\n```",
        options: ["11", "12", "13", "Compilation Error"], 
        correctAnswer: "12",
        explanation: "Evaluate left to right: `++x` pre-increments x to 6 and returns 6. Now x is 6. Next, `x++` returns the current value 6, then post-increments x to 7. The addition is 6 + 6 = 12."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q20.** Which statement about method overloading is correct?",
        options: [
            "Methods differing only in return type are overloaded.", 
            "Methods with the same parameter list but different return types are overloaded.", 
            "Overloaded methods must differ in parameter list.", 
            "Overloading requires inheritance."
        ], 
        correctAnswer: "Overloaded methods must differ in parameter list.",
        explanation: "For method overloading to be valid in Java, the methods must have the same name but fundamentally different parameter lists (number, type, or order). Return type alone cannot distinguish them."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q21.** What is the output of static method inheritance?\n```java\nclass Parent { static void show() { System.out.print(\"Parent \"); } }\nclass Child extends Parent { static void show() { System.out.print(\"Child \"); } \npublic static void main(String[] args) { Parent p = new Child(); p.show(); } }\n```",
        options: ["Parent", "Child", "Parent Child", "Compilation Error"], 
        correctAnswer: "Parent",
        explanation: "Static methods cannot be overridden, only hidden. The method called is determined by the reference type (Parent) at compile-time (Static Binding), so 'Parent' is printed."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q22.** What is the output of instance method inheritance?\n```java\nclass Parent { void show() { System.out.print(\"Parent \"); } }\nclass Child extends Parent { void show() { System.out.print(\"Child \"); } \npublic static void main(String[] args) { Parent p = new Child(); p.show(); } }\n```",
        options: ["Parent", "Child", "Parent Child", "Compilation Error"], 
        correctAnswer: "Child",
        explanation: "Instance methods are overridden. The JVM resolves the method call at runtime based on the actual object created in memory (Child), so 'Child' is printed (Dynamic Binding)."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q23.** Which statement about the final keyword is incorrect?",
        options: [
            "A final method cannot be overridden.", 
            "A final class cannot be inherited.", 
            "A final reference variable cannot refer to another object.", 
            "A final object cannot have its internal state modified."
        ], 
        correctAnswer: "A final object cannot have its internal state modified.",
        explanation: "If a reference variable is marked final, it cannot point to a new object. However, the internal state (fields) of that object can still be freely modified (unless those fields are also final)."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q24.** What is the output?\n```java\nfinal class A { }\nclass B extends A { }\n```",
        options: ["Runs Successfully", "Runtime Error", "Compilation Error", "Output depends on JVM"], 
        correctAnswer: "Compilation Error",
        explanation: "A class declared as 'final' cannot be subclassed (extended) by any other class. Attempting to do so results in a strict compile-time error."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q25.** What is the output?\n```java\nclass Test {\n    static int x;\n    public static void main(String[] args) {\n        System.out.println(x);\n    }\n}\n```",
        options: ["null", "0", "Compilation Error", "Garbage Value"], 
        correctAnswer: "0",
        explanation: "Static and instance variables of numeric primitive types (like int) are automatically initialized to 0 by the JVM if no explicit value is provided."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q26.** Which access modifier allows access within the same package, and from subclasses in different packages?",
        options: ["private", "default", "protected", "public"], 
        correctAnswer: "protected",
        explanation: "The 'protected' access modifier makes a member accessible within its own package (like default) but additionally allows subclasses in other packages to inherit and access it."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q27.** Which statement about constructors is correct?",
        options: [
            "Constructors participate in inheritance.", 
            "Constructors can be declared final.", 
            "Constructors are not inherited by subclasses.", 
            "Constructors can be overridden."
        ], 
        correctAnswer: "Constructors are not inherited by subclasses.",
        explanation: "Constructors are specific to the class they are declared in and are never inherited by subclasses. (Though a subclass constructor will implicitly or explicitly call the parent's constructor using super())."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q28.** What is the output?\n```java\nclass Test {\n    Test() { this(10); System.out.print(\"A \"); }\n    Test(int x) { System.out.print(\"B \"); }\n    public static void main(String[] args) { new Test(); }\n}\n```",
        options: ["A B", "B A", "A", "Compilation Error"], 
        correctAnswer: "B A",
        explanation: "The `new Test()` call triggers the default constructor. The `this(10)` statement redirects to the parameterized constructor, which prints 'B '. Control returns to the first constructor, printing 'A '."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q29.** Which of the following statements about the this() constructor call is correct?",
        options: [
            "It can appear anywhere inside a constructor.", 
            "It must be the first statement in a constructor.", 
            "It can be used inside static methods.", 
            "It calls the parent constructor."
        ], 
        correctAnswer: "It must be the first statement in a constructor.",
        explanation: "Constructor chaining using `this()` or `super()` is strictly constrained in Java; if used, the call must be the absolute first executable statement in the constructor."
    },
    {
        category: "Java", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q30.** Consider the following code:\n```java\nclass Parent { Parent() { System.out.print(\"P \"); } }\nclass Child extends Parent { Child() { System.out.print(\"C \"); } }\npublic class Test { public static void main(String[] args) { Parent p = new Child(); } }\n```\nWhat is the output?",
        options: ["C P", "P C", "P", "Compilation Error"], 
        correctAnswer: "P C",
        explanation: "Creating a `new Child()` triggers the Child constructor. The Java compiler automatically inserts `super()` as the first line, executing the Parent constructor ('P ') before finishing the Child constructor ('C ')."
    }
];

const seedJavaQuestions = async () => {
    try {
        // Uncomment below to wipe old Java Fundamental records if needed
        // await Question.deleteMany({ category: "Java", topic: "Fundamental" }); 
        
        console.log(`🚀 Injecting ${javaQuestionsBatch1to30.length} Formatted Java Questions...`);
        await Question.insertMany(javaQuestionsBatch1to30);
        
        console.log(`✅ SUCCESS! All 30 Java Fundamental Questions Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding Java data:", error);
        process.exit(1);
    }
};

seedJavaQuestions();