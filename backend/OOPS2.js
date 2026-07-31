const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for OOPS Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const oopsQuestionsBatch31to60 = [
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q31.** Which statement about an abstract class in Java is correct?",
        options: [
            "It can be instantiated directly.", 
            "It cannot contain implemented methods.", 
            "It may contain both abstract and concrete methods.", 
            "All methods inside it must be abstract."
        ], 
        correctAnswer: "It may contain both abstract and concrete methods.",
        explanation: "An abstract class serves as a base blueprint and cannot be instantiated. However, unlike a traditional interface, it can contain both abstract methods (no body) and concrete methods (with implementation)."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q32.** Which keyword is used to declare an abstract class?",
        options: ["virtual", "abstract", "interface", "extends"], 
        correctAnswer: "abstract",
        explanation: "The 'abstract' keyword is used in Java and C# to declare a class as abstract, indicating that it is incomplete and must be subclassed."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q33.** Which statement about a Java interface is correct?",
        options: [
            "An interface can be instantiated directly.", 
            "A class can implement multiple interfaces.", 
            "An interface can extend a class.", 
            "A class can inherit multiple classes using interfaces."
        ], 
        correctAnswer: "A class can implement multiple interfaces.",
        explanation: "While Java restricts a class to extending only one parent class (single inheritance), it allows a class to implement any number of interfaces to achieve multiple inheritance of type."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q34.** Why does Java support multiple inheritance through interfaces but not through classes?",
        options: [
            "Interfaces execute faster than classes.", 
            "To avoid ambiguity such as the Diamond Problem.", 
            "Interfaces consume less memory.", 
            "Interfaces cannot contain methods."
        ], 
        correctAnswer: "To avoid ambiguity such as the Diamond Problem.",
        explanation: "The Diamond Problem occurs when a class inherits from multiple classes that define the same method. Since traditional interfaces only declare method signatures without implementation, the implementing class provides the single, unambiguous implementation."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q35.** Which method defined in the Object class returns the runtime class of an object?",
        options: ["getName()", "getType()", "getClass()", "className()"], 
        correctAnswer: "getClass()",
        explanation: "The getClass() method is a native method in the Object class that returns the runtime java.lang.Class object representing the class of the current object."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q36.** Which method is commonly overridden to provide a meaningful string representation of an object?",
        options: ["print()", "display()", "toString()", "stringify()"], 
        correctAnswer: "toString()",
        explanation: "The toString() method from the Object class returns a string representation of the object. Developers override it to print the actual state/data of the object rather than its memory address."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q37.** Which statement correctly describes the difference between == and equals() in Java?",
        options: [
            "Both always compare object contents.", 
            "== compares references, while equals() can compare logical equality if overridden.", 
            "equals() compares memory addresses only.", 
            "There is no difference."
        ], 
        correctAnswer: "== compares references, while equals() can compare logical equality if overridden.",
        explanation: "The == operator strictly checks if two references point to the exact same memory location. The equals() method is designed to be overridden to compare the actual semantic values inside the objects."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q38.** Why should hashCode() generally be overridden whenever equals() is overridden?",
        options: [
            "To improve compilation speed.", 
            "To maintain the contract used by hash-based collections like HashMap and HashSet.", 
            "To allow object cloning.", 
            "It is mandatory for every Java class."
        ], 
        correctAnswer: "To maintain the contract used by hash-based collections like HashMap and HashSet.",
        explanation: "The Object class contract states that if two objects are considered equal by the equals() method, they MUST return the exact same integer value from the hashCode() method, otherwise hash collections will fail to find them."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q39.** Which statement about the static keyword is correct?",
        options: [
            "Static members belong to the class rather than individual objects.", 
            "Static variables are created separately for every object.", 
            "Static methods can directly access instance variables without an object.", 
            "Constructors can be declared static."
        ], 
        correctAnswer: "Static members belong to the class rather than individual objects.",
        explanation: "When a variable or method is marked as static, it means it is shared across all instances of the class and exists at the class level, not the object level."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q40.** Which of the following cannot be declared as static in Java?",
        options: ["Variable", "Method", "Nested Class", "Constructor"], 
        correctAnswer: "Constructor",
        explanation: "Constructors are inherently tied to the creation of a specific instance (object) of a class. Therefore, they can never be static, because static implies 'no specific instance'."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q41.** What is the purpose of the final keyword when applied to a class?",
        options: [
            "Prevent object creation.", 
            "Prevent inheritance.", 
            "Prevent method overloading.", 
            "Prevent variable declaration."
        ], 
        correctAnswer: "Prevent inheritance.",
        explanation: "Declaring a class as final (e.g., the String class in Java) completely prevents any other class from extending or inheriting from it."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q42.** If a method is declared as final, it:",
        options: [
            "Cannot be overloaded.", 
            "Cannot be overridden.", 
            "Cannot be called.", 
            "Becomes static automatically."
        ], 
        correctAnswer: "Cannot be overridden.",
        explanation: "A final method locks its implementation. Subclasses can inherit and use the final method, but they are strictly forbidden from overriding it to change its behavior."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q43.** Which keyword is used to invoke another constructor of the same class?",
        options: ["super()", "this()", "self()", "current()"], 
        correctAnswer: "this()",
        explanation: "The this() statement is used to call another constructor in the same class (a process called constructor chaining), reducing duplicate initialization code."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q44.** In Java, which statement about constructor chaining is correct?",
        options: [
            "this() and super() can both be called anywhere inside a constructor.", 
            "If used, this() or super() must be the first statement in a constructor.", 
            "super() can only be called from methods.", 
            "Constructor chaining is not supported."
        ], 
        correctAnswer: "If used, this() or super() must be the first statement in a constructor.",
        explanation: "Java enforces a strict rule that any call to this() or super() must be the very first executable statement inside the constructor to ensure proper initialization order."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q45.** Which statement best describes Object Cloning?",
        options: [
            "It always performs a deep copy.", 
            "It creates another object with the same state as the original object.", 
            "It copies only static variables.", 
            "It creates a reference to the same object."
        ], 
        correctAnswer: "It creates another object with the same state as the original object.",
        explanation: "Object cloning is the process of generating a new instance of an object that has the exact same field values (state) as the original object being cloned."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q46.** Which statement correctly distinguishes Shallow Copy from Deep Copy?",
        options: [
            "Shallow Copy duplicates both primitive fields and referenced objects.", 
            "Deep Copy duplicates only primitive fields.", 
            "Shallow Copy copies object references, whereas Deep Copy creates independent copies of referenced objects.", 
            "There is no difference between them."
        ], 
        correctAnswer: "Shallow Copy copies object references, whereas Deep Copy creates independent copies of referenced objects.",
        explanation: "In a shallow copy, nested objects are shared because only their memory addresses are copied. In a deep copy, completely new instances of the nested objects are recursively created."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q47.** Consider the code: `Animal a = new Dog();`. This statement is an example of:",
        options: ["Downcasting", "Upcasting", "Constructor Chaining", "Method Overloading"], 
        correctAnswer: "Upcasting",
        explanation: "Assigning an object of a child class (Dog) to a reference variable of its parent class (Animal) is called Upcasting. It happens implicitly and safely."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q48.** Which of the following requires explicit type casting in Java?",
        options: ["Upcasting", "Downcasting", "Constructor Chaining", "Method Hiding"], 
        correctAnswer: "Downcasting",
        explanation: "Downcasting is assigning a parent reference back to a child reference (e.g., `Dog d = (Dog) animal;`). It requires explicit casting because the compiler cannot guarantee the parent actually points to that specific child at runtime."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q49.** What happens if an invalid downcast is performed at runtime?",
        options: ["Compile-time Error", "StackOverflowError", "ClassCastException", "NullPointerException"], 
        correctAnswer: "ClassCastException",
        explanation: "If you attempt to downcast an object to a type that it is not an instance of (e.g., casting a Cat object to a Dog reference), the JVM will throw a ClassCastException at runtime."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q50.** Which type of binding occurs for overridden methods in Java?",
        options: ["Static Binding", "Early Binding", "Dynamic (Late) Binding", "Compile-Time Binding"], 
        correctAnswer: "Dynamic (Late) Binding",
        explanation: "Overridden methods use Dynamic Binding. The compiler doesn't know which version of the method to call; the JVM decides at runtime based on the actual object instantiated in memory."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q51.** A class directly creates objects of many other concrete classes using the new keyword. This design is generally an example of:",
        options: ["Loose Coupling", "Tight Coupling", "Abstraction", "Polymorphism"], 
        correctAnswer: "Tight Coupling",
        explanation: "Hardcoding the instantiation of concrete classes with the 'new' keyword binds the classes tightly together. If a dependency changes, the creator class must also be modified."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q52.** Which design approach makes software easier to maintain, test, and extend?",
        options: ["Tight Coupling", "Loose Coupling", "Static Binding", "Multiple Inheritance"], 
        correctAnswer: "Loose Coupling",
        explanation: "Loose coupling (using interfaces and dependency injection) minimizes the dependencies between components, making the system modular, easier to test via mocking, and simple to extend."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q53.** Which design pattern is commonly used to achieve Dependency Injection?",
        options: ["Singleton", "Factory", "Dependency Injection (IoC) Container", "Builder"], 
        correctAnswer: "Dependency Injection (IoC) Container",
        explanation: "In modern OOP, an Inversion of Control (IoC) Container or Dependency Injection framework (like Spring) is used to automatically construct and inject dependencies into classes."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q54.** According to the Single Responsibility Principle (SRP), a class should:",
        options: [
            "Have only one method.", 
            "Perform only one type of operation.", 
            "Have only one reason to change.", 
            "Contain only one object."
        ], 
        correctAnswer: "Have only one reason to change.",
        explanation: "SRP states that a class should be responsible for only one part of the software's functionality, meaning there should only ever be one valid reason to modify that class."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q55.** According to the Open/Closed Principle (OCP), software entities should be:",
        options: [
            "Open for modification and closed for extension.", 
            "Closed for both modification and extension.", 
            "Open for extension but closed for modification.", 
            "Modified whenever a new feature is added."
        ], 
        correctAnswer: "Open for extension but closed for modification.",
        explanation: "OCP dictates that you should be able to add new functionality (extend) without altering existing, tested, and working source code (modify)."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q56.** Which SOLID principle states that subclasses should be replaceable for their base classes without affecting correctness?",
        options: [
            "Single Responsibility Principle", 
            "Open/Closed Principle", 
            "Liskov Substitution Principle", 
            "Interface Segregation Principle"
        ], 
        correctAnswer: "Liskov Substitution Principle",
        explanation: "The Liskov Substitution Principle (LSP) ensures that a derived class does not alter the behavior or guarantees expected from the base class, ensuring reliable polymorphism."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q57.** Which SOLID principle recommends that clients should not be forced to depend on interfaces they do not use?",
        options: [
            "Dependency Inversion Principle", 
            "Interface Segregation Principle", 
            "Liskov Substitution Principle", 
            "Open/Closed Principle"
        ], 
        correctAnswer: "Interface Segregation Principle",
        explanation: "The Interface Segregation Principle (ISP) advocates for creating smaller, more specific interfaces rather than large, monolithic 'fat' interfaces, so implementing classes don't have to define useless methods."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q58.** According to the Dependency Inversion Principle (DIP):",
        options: [
            "High-level modules should depend on low-level modules.", 
            "Low-level modules should control high-level modules.", 
            "Both high-level and low-level modules should depend on abstractions.", 
            "Classes should always create their own dependencies."
        ], 
        correctAnswer: "Both high-level and low-level modules should depend on abstractions.",
        explanation: "DIP states that high-level modules (business logic) shouldn't depend on low-level modules (database operations). Instead, both should depend on abstractions (interfaces) to decouple them."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q59.** A payment application supports Credit Card, UPI, and Net Banking by implementing a common Payment interface. Which OOP concept is primarily being used?",
        options: [
            "Constructor Chaining", 
            "Runtime Polymorphism", 
            "Method Hiding", 
            "Static Binding"
        ], 
        correctAnswer: "Runtime Polymorphism",
        explanation: "Because the main application can call a `.processPayment()` method on a generic `Payment` interface, and the JVM figures out at runtime whether to use UPI or Credit Card logic, this is Runtime Polymorphism."
    },
    {
        category: "OOPS", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q60.** A software system frequently requires adding new payment methods without modifying existing payment processing logic. Which design principle best supports this requirement?",
        options: [
            "Single Responsibility Principle", 
            "Open/Closed Principle", 
            "Encapsulation", 
            "Tight Coupling"
        ], 
        correctAnswer: "Open/Closed Principle",
        explanation: "By creating a design where you just create a new class (e.g., `CryptoPayment implements Payment`) without touching the core `PaymentProcessor` code, you are perfectly following the Open/Closed Principle."
    }
];

const seedOOPSQuestions31to60 = async () => {
    try {
        // Uncomment to wipe the collection if needed!
        // await Question.deleteMany({ category: "OOPS", topic: "Intermediate" }); 
        
        console.log(`🚀 Injecting ${oopsQuestionsBatch31to60.length} Intermediate OOPS Questions...`);
        await Question.insertMany(oopsQuestionsBatch31to60);
        
        console.log(`✅ SUCCESS! Questions 31 to 60 Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding OOPS data:", error);
        process.exit(1);
    }
};

seedOOPSQuestions31to60();