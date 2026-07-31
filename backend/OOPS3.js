const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for OOPS Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const oopsQuestionsBatch61to90 = [
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q61.** Which design principle is generally preferred when there is no true 'is-a' relationship between two classes?",
        options: ["Inheritance", "Composition", "Method Overloading", "Method Overriding"], 
        correctAnswer: "Composition",
        explanation: "If a strict 'is-a' relationship does not exist, standard design guidelines dictate 'Prefer Composition over Inheritance'. Composition allows you to reuse code by composing a class of other objects (a 'has-a' relationship) without the rigid dependencies of a parent-child hierarchy."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q62.** A Car class contains an Engine object because a car cannot function without its engine. Which relationship best models this design?",
        options: ["Association", "Aggregation", "Composition", "Dependency"], 
        correctAnswer: "Composition",
        explanation: "Composition is a strict 'has-a' relationship representing strong ownership. Because the Engine is essential for the Car and their lifecycles are tightly bound (if the car is destroyed, the engine context is gone), Composition is the correct model."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q63.** A University object contains multiple Professor objects, but professors can exist even if the university object is deleted. Which relationship is most appropriate?",
        options: ["Composition", "Aggregation", "Inheritance", "Dependency"], 
        correctAnswer: "Aggregation",
        explanation: "Aggregation is a weak 'has-a' relationship. The Professor objects have an independent lifecycle from the University object. Destroying the container (University) does not destroy the contained objects (Professors)."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q64.** Which design pattern ensures that only one instance of a class exists throughout the application?",
        options: ["Factory Pattern", "Strategy Pattern", "Singleton Pattern", "Observer Pattern"], 
        correctAnswer: "Singleton Pattern",
        explanation: "The Singleton Pattern restricts the instantiation of a class to exactly one object. It is highly useful for centralized resources like database connection pools, configuration managers, or loggers."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q65.** Which design pattern is primarily used to create objects without exposing the object creation logic to the client?",
        options: ["Observer Pattern", "Strategy Pattern", "Factory Pattern", "Decorator Pattern"], 
        correctAnswer: "Factory Pattern",
        explanation: "The Factory Pattern delegates the responsibility of object instantiation to a dedicated 'Factory' method or class. This hides complex creation logic from the client and promotes loose coupling."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q66.** Which design pattern defines a family of interchangeable algorithms and allows switching between them at runtime?",
        options: ["Singleton", "Factory", "Strategy", "Adapter"], 
        correctAnswer: "Strategy",
        explanation: "The Strategy Pattern encapsulates different algorithms (like different sorting methods or payment calculations) into separate classes that implement a common interface, allowing the application to swap them dynamically at runtime."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q67.** Which design pattern is commonly used in event-driven systems, where multiple objects need to be notified automatically when another object's state changes?",
        options: ["Singleton", "Observer", "Builder", "Prototype"], 
        correctAnswer: "Observer",
        explanation: "The Observer Pattern sets up a one-to-many dependency. When the central 'Subject' changes its state, all registered 'Observers' are automatically notified and updated, much like subscribers to a newsletter."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q68.** An object is considered immutable if:",
        options: [
            "Its methods cannot be overloaded.", 
            "Its state cannot be changed after creation.", 
            "It cannot contain reference variables.", 
            "It cannot be inherited."
        ], 
        correctAnswer: "Its state cannot be changed after creation.",
        explanation: "An immutable object is one whose internal data and state cannot be modified after it has been fully initialized by its constructor. All fields are typically made private and final."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q69.** Which Java class is a well-known example of an immutable class?",
        options: ["String", "StringBuilder", "ArrayList", "HashMap"], 
        correctAnswer: "String",
        explanation: "In Java, the String class is inherently immutable. Operations that appear to modify a string (like concat or replace) actually instantiate and return a completely new String object."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q70.** Which interface should be implemented when an object has only one natural ordering?",
        options: ["Comparator", "Comparable", "Cloneable", "Serializable"], 
        correctAnswer: "Comparable",
        explanation: "The Comparable interface (`compareTo` method) is implemented by a class to define its default, natural sorting order (e.g., sorting Employees primarily by their EmpID)."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q71.** Which interface allows defining multiple different sorting criteria for the same class?",
        options: ["Comparable", "Comparator", "Iterable", "Collection"], 
        correctAnswer: "Comparator",
        explanation: "The Comparator interface (`compare` method) allows you to define multiple external sorting strategies (like sorting Employees by Name, or by Salary) without modifying the original class."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q72.** Which statement correctly distinguishes Comparable and Comparator?",
        options: [
            "Comparable supports multiple sorting orders.", 
            "Comparator defines the natural ordering.", 
            "Comparable defines the natural ordering, while Comparator allows custom sorting.", 
            "Both are used only for primitive data types."
        ], 
        correctAnswer: "Comparable defines the natural ordering, while Comparator allows custom sorting.",
        explanation: "Comparable is 'internal' to the class and defines the single natural order. Comparator is 'external' to the class, allowing you to create as many custom, separate sorting logics as needed."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q73.** A subclass overrides a method and returns an object of its own subtype instead of the parent type. This feature is known as:",
        options: ["Dynamic Binding", "Covariant Return Type", "Method Hiding", "Constructor Chaining"], 
        correctAnswer: "Covariant Return Type",
        explanation: "Since Java 5, overriding methods can change the return type, provided that the new return type is a subclass (subtype) of the original return type. This is called a Covariant Return Type."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q74.** Which statement about method hiding is correct?",
        options: [
            "It applies only to instance methods.", 
            "It occurs when a subclass declares a static method with the same signature as a static method in the parent class.", 
            "It is the same as method overriding.", 
            "It enables runtime polymorphism."
        ], 
        correctAnswer: "It occurs when a subclass declares a static method with the same signature as a static method in the parent class.",
        explanation: "Unlike instance methods which are overridden at runtime, static methods are bound at compile-time. If a child class redefines a static method from the parent, it 'hides' the parent method rather than overriding it."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q75.** Which statement correctly differentiates method overriding from method hiding?",
        options: [
            "Both participate in runtime polymorphism.", 
            "Overriding applies to instance methods, while hiding applies to static methods.", 
            "Hiding supports dynamic dispatch.", 
            "There is no difference between them."
        ], 
        correctAnswer: "Overriding applies to instance methods, while hiding applies to static methods.",
        explanation: "Method Overriding utilizes Dynamic Binding (decided at runtime based on the object). Method Hiding utilizes Static Binding (decided at compile-time based on the reference type)."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q76.** A company designs a hierarchy: Bird -> Sparrow, Eagle, Penguin. The Bird class has a fly() method, but Penguin cannot fly. Which SOLID principle is violated?",
        options: [
            "Single Responsibility Principle (SRP)", 
            "Open/Closed Principle (OCP)", 
            "Liskov Substitution Principle (LSP)", 
            "Dependency Inversion Principle (DIP)"
        ], 
        correctAnswer: "Liskov Substitution Principle (LSP)",
        explanation: "LSP states that objects of a superclass shall be replaceable with objects of its subclasses without breaking the application. A Penguin failing on a fly() call breaks this strict substitutability."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q77.** A notification system supports Email. You must add SMS and Push notifications without modifying the existing notification logic. Which design principle supports this?",
        options: [
            "Single Responsibility Principle", 
            "Open/Closed Principle", 
            "Interface Segregation Principle", 
            "Encapsulation"
        ], 
        correctAnswer: "Open/Closed Principle",
        explanation: "The Open/Closed Principle (OCP) dictates that software entities should be open for extension (adding SMS/Push via new classes) but closed for modification (not touching the core, tested logic)."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q78.** A reporting module directly creates objects of MySQLDatabase, OracleDatabase, and MongoDatabase using the new keyword. What is the primary design issue?",
        options: ["Loose Coupling", "Tight Coupling", "Runtime Polymorphism", "Constructor Chaining"], 
        correctAnswer: "Tight Coupling",
        explanation: "Using the 'new' keyword directly hardcodes the dependencies. The module is tightly coupled to specific database implementations, making it difficult to test, mock, or change later."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q79.** Which design change best resolves the problem in Question 78?",
        options: [
            "Make every class static.", 
            "Introduce a common Database interface and depend on the abstraction.", 
            "Use only inheritance.", 
            "Declare every method as final."
        ], 
        correctAnswer: "Introduce a common Database interface and depend on the abstraction.",
        explanation: "By depending on a general 'Database' interface rather than concrete classes, you apply the Dependency Inversion Principle, achieving loose coupling and high modularity."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q80.** A ShoppingCart class calculates prices, processes payments, sends emails, generates invoices, and writes logs. Which SOLID principle is most clearly violated?",
        options: [
            "Open/Closed Principle", 
            "Single Responsibility Principle", 
            "Liskov Substitution Principle", 
            "Dependency Inversion Principle"
        ], 
        correctAnswer: "Single Responsibility Principle",
        explanation: "The Single Responsibility Principle (SRP) states that a class should have only one reason to change. Doing payments, emailing, and logging means this class has multiple unrelated responsibilities."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q81.** A developer creates the following relationship: `Car extends Engine`. Which statement is correct?",
        options: [
            "The design correctly models an 'is-a' relationship.", 
            "The design should use Composition because a Car has an Engine.", 
            "Aggregation is mandatory here.", 
            "Multiple inheritance should be used instead."
        ], 
        correctAnswer: "The design should use Composition because a Car has an Engine.",
        explanation: "Inheritance is strictly for 'is-a' relationships. A Car is NOT an Engine. Since a Car 'has-a' Engine (and controls its lifecycle), it must be modeled using Composition."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q82.** Which UML relationship is represented by a filled (solid) diamond?",
        options: ["Association", "Aggregation", "Composition", "Dependency"], 
        correctAnswer: "Composition",
        explanation: "In UML diagrams, a solid, filled black diamond pointing to the container class visually represents a Composition relationship (strong ownership)."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q83.** Which UML relationship is represented by a hollow diamond?",
        options: ["Composition", "Aggregation", "Dependency", "Generalization"], 
        correctAnswer: "Aggregation",
        explanation: "In UML diagrams, a hollow or empty diamond pointing to the container class represents an Aggregation relationship (weak ownership)."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q84.** An application must support multiple payment providers (UPI, Credit Card, Wallet), and new providers are expected frequently. Which design pattern is the most suitable?",
        options: ["Singleton", "Factory Pattern", "Strategy Pattern", "Prototype Pattern"], 
        correctAnswer: "Strategy Pattern",
        explanation: "The Strategy Pattern is perfect here. You encapsulate each payment algorithm in its own strategy class. The client simply selects which strategy to use at runtime, easily supporting new future providers."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q85.** A weather application automatically updates all registered displays whenever the temperature changes. Which design pattern best fits this requirement?",
        options: ["Builder", "Observer", "Factory", "Adapter"], 
        correctAnswer: "Observer",
        explanation: "The Observer pattern models exactly this publish/subscribe behavior. The weather station is the 'Subject' that notifies all 'Observer' displays instantly when state changes."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q86.** An object should never change its state after creation because it is frequently shared between multiple threads. Which design approach is most appropriate?",
        options: ["Mutable Object", "Immutable Object", "Static Object", "Singleton Object"], 
        correctAnswer: "Immutable Object",
        explanation: "Immutable objects are naturally thread-safe. Because their state cannot be changed by any thread after initialization, there is absolutely no need for complex locking or synchronization mechanisms."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q87.** A library management system contains classes such as Book, Member, Librarian, and IssueService. Which class should primarily contain the business logic for issuing books?",
        options: ["Book", "Member", "IssueService", "Librarian"], 
        correctAnswer: "IssueService",
        explanation: "Following Domain-Driven Design and High Cohesion, dedicated Service classes (like IssueService) should handle business logic. Data classes (Book, Member) should remain focused purely on holding state."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q88.** Which statement best describes high cohesion?",
        options: [
            "A class performs many unrelated responsibilities.", 
            "A class has one focused responsibility and closely related functionality.", 
            "Classes depend heavily on one another.", 
            "All methods are declared as static."
        ], 
        correctAnswer: "A class has one focused responsibility and closely related functionality.",
        explanation: "High cohesion means that all methods and data members inside a class are strictly relevant to each other, working together to perform a single, well-defined logical task."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q89.** Which statement best describes loose coupling?",
        options: [
            "Classes know every implementation detail of other classes.", 
            "Classes interact mainly through abstractions or interfaces, reducing dependencies.", 
            "Classes always inherit from one another.", 
            "Every object directly creates its own dependencies."
        ], 
        correctAnswer: "Classes interact mainly through abstractions or interfaces, reducing dependencies.",
        explanation: "Loose coupling means modules are independent. They communicate via well-defined interfaces without needing to know the complex internal workings or concrete implementations of each other."
    },
    {
        category: "OOPS", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q90.** A software architect recommends: 'Prefer Composition over Inheritance. Program to Interfaces. Depend on Abstractions.' What is the primary benefit of following these guidelines?",
        options: [
            "Reduced memory usage only.", 
            "Faster compilation only.", 
            "Improved maintainability, extensibility, and testability.", 
            "Elimination of all runtime errors."
        ], 
        correctAnswer: "Improved maintainability, extensibility, and testability.",
        explanation: "These are the core tenets of modern OOP architecture (like SOLID principles). They ensure that the software is highly modular, making it incredibly easy to test (mocking), maintain, and safely extend."
    }
];

const seedOOPSQuestions61to90 = async () => {
    try {
        // Uncomment to wipe prior Advanced OOPS questions
        // await Question.deleteMany({ category: "OOPS", topic: "Advanced" }); 
        
        console.log(`🚀 Injecting ${oopsQuestionsBatch61to90.length} Advanced OOPS Questions...`);
        await Question.insertMany(oopsQuestionsBatch61to90);
        
        console.log(`✅ SUCCESS! Questions 61 to 90 Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding OOPS data:", error);
        process.exit(1);
    }
};

seedOOPSQuestions61to90();