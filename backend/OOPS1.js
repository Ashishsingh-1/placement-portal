const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for OOPS Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const oopsQuestionsBatch1to30 = [
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q1.** Which of the following best describes Encapsulation?",
        options: [
            "Hiding implementation details and exposing only the required functionality", 
            "Creating multiple objects of the same class", 
            "Combining multiple classes into one class", 
            "Executing multiple methods simultaneously"
        ], 
        correctAnswer: "Hiding implementation details and exposing only the required functionality",
        explanation: "Encapsulation is the bundling of data (variables) and methods that operate on that data into a single unit (class), while restricting direct access to some of the object's components (data hiding)."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q2.** Which OOP principle allows an object to take multiple forms?",
        options: [
            "Encapsulation", 
            "Abstraction", 
            "Polymorphism", 
            "Inheritance"
        ], 
        correctAnswer: "Polymorphism",
        explanation: "Polymorphism (poly = many, morph = forms) allows objects of different classes to be treated as objects of a common superclass, enabling a single interface to represent different underlying forms (data types)."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q3.** Which feature of OOP promotes code reusability?",
        options: [
            "Constructor", 
            "Inheritance", 
            "Destructor", 
            "Method Overloading"
        ], 
        correctAnswer: "Inheritance",
        explanation: "Inheritance allows a new class (child) to acquire the properties and behaviors of an existing class (parent). This heavily promotes code reusability and establishes a logical hierarchy."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q4.** Which OOP principle focuses on exposing only essential information while hiding implementation details?",
        options: [
            "Inheritance", 
            "Encapsulation", 
            "Abstraction", 
            "Composition"
        ], 
        correctAnswer: "Abstraction",
        explanation: "While Encapsulation hides the internal state (data hiding), Abstraction focuses on hiding the complex internal implementation details and showing only the essential features to the user."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q5.** Which of the following is NOT considered a pillar of Object-Oriented Programming?",
        options: [
            "Encapsulation", 
            "Abstraction", 
            "Polymorphism", 
            "Compilation"
        ], 
        correctAnswer: "Compilation",
        explanation: "The four core pillars of OOP are Abstraction, Encapsulation, Inheritance, and Polymorphism. Compilation is a process in programming, not an OOP concept."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q6.** A class is best described as:",
        options: [
            "An instance of an object", 
            "A blueprint for creating objects", 
            "A memory location", 
            "A method inside an object"
        ], 
        correctAnswer: "A blueprint for creating objects",
        explanation: "A class is a template or blueprint from which objects are created. It defines the properties (attributes) and behaviors (methods) that the objects will have."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q7.** An object is:",
        options: [
            "A function inside a class", 
            "A runtime instance of a class", 
            "A package", 
            "A constructor"
        ], 
        correctAnswer: "A runtime instance of a class",
        explanation: "An object is a real-world entity and a specific runtime instance created using a class as its blueprint. It occupies memory when instantiated."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q8.** Which keyword is commonly used to create an object in Java?",
        options: ["create", "object", "new", "class"], 
        correctAnswer: "new",
        explanation: "The 'new' keyword is used in Java (and many other OOP languages) to dynamically allocate memory for an object at runtime."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q9.** Which component of an object represents its current state?",
        options: [
            "Methods", 
            "Attributes (Data Members)", 
            "Constructors", 
            "Packages"
        ], 
        correctAnswer: "Attributes (Data Members)",
        explanation: "The state of an object is represented by its attributes, variables, or data members. These hold the specific values assigned to the object at any given time."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q10.** Which component of an object defines its behavior?",
        options: [
            "Variables", 
            "Methods", 
            "Packages", 
            "Constructors"
        ], 
        correctAnswer: "Methods",
        explanation: "The behavior of an object is defined by its methods (functions). Methods dictate how the object can interact with its data and other objects."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q11.** Which of the following statements about constructors is correct?",
        options: [
            "A constructor can have a return type.", 
            "A constructor is automatically invoked when an object is created.", 
            "Constructors must always be called explicitly.", 
            "Constructors cannot be overloaded."
        ], 
        correctAnswer: "A constructor is automatically invoked when an object is created.",
        explanation: "A constructor is a special block of code used to initialize an object. It is called automatically when an instance of the class is created using the 'new' keyword. It has no return type."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q12.** Which type of constructor takes no parameters?",
        options: [
            "Copy Constructor", 
            "Parameterized Constructor", 
            "Default Constructor", 
            "Static Constructor"
        ], 
        correctAnswer: "Default Constructor",
        explanation: "A constructor that takes no arguments is known as a no-arg or default constructor. If no constructor is provided, the compiler supplies a default one."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q13.** If a programmer does not define any constructor in a Java class, the compiler automatically provides:",
        options: [
            "Copy Constructor", 
            "Destructor", 
            "Default Constructor", 
            "Parameterized Constructor"
        ], 
        correctAnswer: "Default Constructor",
        explanation: "To allow object creation, the Java compiler automatically inserts a default (no-argument) constructor into the bytecode if the class contains no explicit constructors."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q14.** Which of the following statements about method overloading is correct?",
        options: [
            "It requires different class names.", 
            "It allows multiple methods with the same name but different parameter lists.", 
            "It is achieved only through inheritance.", 
            "It changes only the return type."
        ], 
        correctAnswer: "It allows multiple methods with the same name but different parameter lists.",
        explanation: "Method Overloading allows a class to have more than one method with the same name, as long as their parameter lists (number, type, or order of arguments) are different."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q15.** Method Overloading is an example of:",
        options: [
            "Runtime Polymorphism", 
            "Compile-Time Polymorphism", 
            "Multiple Inheritance", 
            "Dynamic Binding"
        ], 
        correctAnswer: "Compile-Time Polymorphism",
        explanation: "Because the compiler can determine which method to call based on the arguments provided at compile time, method overloading is considered Compile-Time (or Static) Polymorphism."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q16.** Which type of inheritance is NOT supported directly for classes in Java?",
        options: [
            "Single Inheritance", 
            "Multilevel Inheritance", 
            "Hierarchical Inheritance", 
            "Multiple Inheritance"
        ], 
        correctAnswer: "Multiple Inheritance",
        explanation: "Java does not support Multiple Inheritance (a class inheriting from more than one class) to avoid the 'Diamond Problem' of ambiguity. However, it can be achieved using Interfaces."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q17.** Which keyword is used to inherit a class in Java?",
        options: ["implements", "inherits", "extends", "super"], 
        correctAnswer: "extends",
        explanation: "In Java, the 'extends' keyword is used by a subclass to inherit the properties and methods of a parent (super) class."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q18.** Which statement about method overriding is correct?",
        options: [
            "The method name must be different from the parent method.", 
            "Only the return type must be different.", 
            "The child class provides its own implementation of an inherited method with the same signature.", 
            "It is resolved at compile time."
        ], 
        correctAnswer: "The child class provides its own implementation of an inherited method with the same signature.",
        explanation: "Method Overriding happens when a subclass provides a specific implementation for a method that is already defined in its superclass, maintaining the exact same name, return type, and parameters."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q19.** Method Overriding is an example of:",
        options: [
            "Compile-Time Polymorphism", 
            "Runtime Polymorphism", 
            "Constructor Chaining", 
            "Encapsulation"
        ], 
        correctAnswer: "Runtime Polymorphism",
        explanation: "Since the exact method to be called is determined by the JVM at runtime based on the actual object type (not the reference type), overriding represents Runtime (or Dynamic) Polymorphism."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q20.** What is Dynamic Method Dispatch in Java?",
        options: [
            "Resolving overloaded methods at compile time.", 
            "Resolving overridden methods at runtime based on the actual object.", 
            "Automatically calling constructors.", 
            "Executing multiple methods simultaneously."
        ], 
        correctAnswer: "Resolving overridden methods at runtime based on the actual object.",
        explanation: "Dynamic Method Dispatch is the mechanism by which a call to an overridden method is resolved at runtime. It looks at the actual object created in memory to decide whose method to execute."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q21.** What is the primary purpose of the super keyword?",
        options: [
            "Create a new object.", 
            "Access members of the parent class or invoke its constructor.", 
            "Access private methods of another class.", 
            "Declare a static method."
        ], 
        correctAnswer: "Access members of the parent class or invoke its constructor.",
        explanation: "The 'super' keyword acts as a reference variable used to refer to the immediate parent class object. It is heavily used to call parent constructors or overridden parent methods."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q22.** Which statement about the 'this' keyword is correct?",
        options: [
            "It refers to the parent class object.", 
            "It refers to the current object.", 
            "It refers to a static method.", 
            "It refers to the JVM."
        ], 
        correctAnswer: "It refers to the current object.",
        explanation: "The 'this' keyword is a reference variable that refers to the current object invoking the method or constructor. It's often used to resolve shadowing between class attributes and parameters."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q23.** Which access modifier makes a member accessible only within the same class?",
        options: ["public", "protected", "default", "private"], 
        correctAnswer: "private",
        explanation: "The 'private' access modifier restricts access strictly to the class in which it is declared, forming the basis of data hiding and Encapsulation."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q24.** Which access modifier allows access from any class in any package?",
        options: ["protected", "private", "public", "default"], 
        correctAnswer: "public",
        explanation: "The 'public' access modifier is the most permissive. Members marked public can be accessed from any class, regardless of what package they belong to."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q25.** Which access modifier allows access within the same package and also in subclasses outside the package?",
        options: ["private", "protected", "default", "static"], 
        correctAnswer: "protected",
        explanation: "The 'protected' modifier allows access to classes within the same package, and crucially, to subclasses residing in different packages, making it vital for inheritance trees."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q26.** Which relationship represents a 'uses-a' relationship?",
        options: ["Inheritance", "Association", "Method Overloading", "Encapsulation"], 
        correctAnswer: "Association",
        explanation: "Association defines a relationship where one class 'uses' or interacts with another class (e.g., a Driver uses a Car). Inheritance represents an 'is-a' relationship."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q27.** A University contains multiple Departments, but a Department can continue to exist even if the University object is removed. This relationship is:",
        options: ["Composition", "Aggregation", "Inheritance", "Dependency"], 
        correctAnswer: "Aggregation",
        explanation: "Aggregation is a specialized form of Association representing a weak 'has-a' relationship. The child entities can logically exist independently of the parent entity."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q28.** A House contains multiple Rooms, and the Rooms cannot logically exist independently of the House. This relationship is:",
        options: ["Aggregation", "Association", "Composition", "Inheritance"], 
        correctAnswer: "Composition",
        explanation: "Composition is a strong 'has-a' relationship where the child object's lifecycle is completely dependent on the parent object. If the House is destroyed, the Rooms are automatically destroyed."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q29.** Which relationship represents the strongest ownership in OOP?",
        options: ["Association", "Aggregation", "Composition", "Dependency"], 
        correctAnswer: "Composition",
        explanation: "Composition represents the strongest form of ownership. The contained objects belong exclusively to the container and are destroyed when the container is destroyed."
    },
    {
        category: "OOPS", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q30.** Which of the following statements correctly distinguishes Aggregation from Composition?",
        options: [
            "Aggregation implies strong ownership, while Composition implies weak ownership.", 
            "Composition allows the contained object to exist independently of the container.", 
            "Aggregation represents a weak 'has-a' relationship, whereas Composition represents a strong 'has-a' relationship with dependent object lifetime.", 
            "There is no practical difference between Aggregation and Composition."
        ], 
        correctAnswer: "Aggregation represents a weak 'has-a' relationship, whereas Composition represents a strong 'has-a' relationship with dependent object lifetime.",
        explanation: "In Aggregation, objects have independent lifecycles (e.g., Teacher and School). In Composition, the child object's lifecycle is strictly tied to the parent (e.g., Heart and Human Body)."
    }
];

const seedOOPSQuestions = async () => {
    try {
        // Comment out if you don't want to wipe the previous OOPS questions!
        // await Question.deleteMany({ category: "OOPS", topic: "Fundamental" }); 
        
        console.log(`🚀 Injecting ${oopsQuestionsBatch1to30.length} Formatted OOPS Questions...`);
        await Question.insertMany(oopsQuestionsBatch1to30);
        
        console.log(`✅ SUCCESS! All 30 OOPS Fundamental Questions Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding OOPS data:", error);
        process.exit(1);
    }
};

seedOOPSQuestions();