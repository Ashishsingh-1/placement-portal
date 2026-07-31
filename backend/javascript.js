const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Web Dev Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const jsQuestionsBatch = [
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Hard",
        questionText: "**Q1.** What is the output?\nlet x = 1; function outer() { console.log(x); let x = 2; function inner() { console.log(x); } inner(); } outer();",
        options: ["1 2", "undefined 2", "ReferenceError", "2 2"],
        correctAnswer: "ReferenceError",
        explanation: "Due to Temporal Dead Zone (TDZ), when 'let x' is declared in the same scope, the 'x' in console.log(x) is not hoisted like 'var'. Accessing it before initialization throws a ReferenceError."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q2.** What is the output?\nconsole.log(a); var a = 10; (function () { console.log(a); var a = 20; })();",
        options: ["10 20", "undefined undefined", "undefined 20", "ReferenceError 20"],
        correctAnswer: "undefined undefined",
        explanation: "The first 'a' is hoisted as undefined. Inside the IIFE, 'var a' is hoisted to the top of the function scope, masking the outer 'a' and resulting in undefined again."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q3.** What is the output?\nlet obj = { name: \"JS\", show() { return (() => this.name)(); } }; console.log(obj.show());",
        options: ["undefined", "JS", "window", "TypeError"],
        correctAnswer: "JS",
        explanation: "Arrow functions do not have their own 'this'. They lexically inherit 'this' from the surrounding scope, which is the 'obj' object here."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q4.** What is the output?\nfor (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }",
        options: ["0 1 2", "3 3 3", "1 2 3", "0 0 0"],
        correctAnswer: "3 3 3",
        explanation: "'var' has function scope. By the time the timeout callback runs, the loop has finished and 'i' is 3."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q5.** What is the output?\nfor (let i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }",
        options: ["3 3 3", "0 1 2", "1 2 3", "undefined"],
        correctAnswer: "0 1 2",
        explanation: "'let' has block scope. A new binding for 'i' is created for each iteration of the loop, preserving the value for the timeout."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Easy",
        questionText: "**Q6.** What is the output?\nconsole.log(typeof null);\nconsole.log(typeof []);",
        options: ["null array", "object object", "null object", "object array"],
        correctAnswer: "object object",
        explanation: "This is a well-known legacy bug in JS where 'typeof null' returns 'object'. Arrays are also objects in JS."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Hard",
        questionText: "**Q7.** What is the output?\nPromise.resolve().then(() => console.log(1));\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);",
        options: ["1 2 3", "3 2 1", "3 1 2", "2 1 3"],
        correctAnswer: "3 1 2",
        explanation: "Synchronous code (3) runs first. Then, the Microtask Queue (Promise.then) is processed before the Macrotask Queue (setTimeout)."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q8.** What is the output?\nconst obj = { x: 10, getX() { return this.x; } };\nconst fn = obj.getX;\nconsole.log(fn());",
        options: ["10", "undefined", "null", "TypeError"],
        correctAnswer: "undefined",
        explanation: "When 'obj.getX' is assigned to a standalone variable 'fn', the context (this) is lost and defaults to the global object (undefined in strict mode)."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q9.** Which operation creates a shallow copy?",
        options: ["JSON.parse(JSON.stringify(obj))", "structuredClone(obj)", "Object.assign({}, obj)", "lodash.cloneDeep(obj)"],
        correctAnswer: "Object.assign({}, obj)",
        explanation: "Object.assign() copies top-level properties but nested objects remain referenced by their original memory addresses (shallow copy)."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q10.** What is the output?\nconsole.log([] == false);\nconsole.log([] === false);",
        options: ["true false", "false false", "true true", "false true"],
        correctAnswer: "true false",
        explanation: "[] is coerced to '' then 0, which equals false. '===' checks for type equality too, and [] (object) is not a boolean."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Easy",
        questionText: "**Q11.** What is the output?\nconsole.log(typeof NaN);",
        options: ["NaN", "number", "undefined", "object"],
        correctAnswer: "number",
        explanation: "Despite its name (Not-a-Number), NaN is a numeric type in JavaScript."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q12.** Which statement about JavaScript closures is correct?",
        options: [
            "A closure stores only primitive variables.", 
            "A closure retains access to variables from its lexical scope even after the outer function has returned.", 
            "Closures exist only with arrow functions.", 
            "Closures automatically free captured variables after every invocation."
        ],
        correctAnswer: "A closure retains access to variables from its lexical scope even after the outer function has returned.",
        explanation: "Closures are the combination of a function bundled together with references to its surrounding state (the lexical environment)."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q13.** What is the output?\nconsole.log(0.1 + 0.2 === 0.3);",
        options: ["true", "false", "undefined", "TypeError"],
        correctAnswer: "false",
        explanation: "Floating point arithmetic in JS uses IEEE 754, where 0.1 + 0.2 results in 0.30000000000000004, making the comparison false."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Hard",
        questionText: "**Q14.** Which queue has higher priority in the JavaScript event loop?",
        options: ["Callback Queue", "Timer Queue", "Microtask Queue", "Render Queue"],
        correctAnswer: "Microtask Queue",
        explanation: "The Event Loop always drains the entire Microtask Queue (Promises, queueMicrotask) before moving on to any Macrotask (Callback/Timer Queue)."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q15.** What is the output?\nasync function test() { return 100; }\nconsole.log(test());",
        options: ["100", "Promise {100} (resolved Promise)", "undefined", "TypeError"],
        correctAnswer: "Promise {100} (resolved Promise)",
        explanation: "An async function always implicitly returns a Promise. If the function returns a value, the promise is resolved with that value."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q16.** What is the output?\nconsole.log(foo); var foo = 1; function foo() { return 2; } console.log(foo);",
        options: ["undefined 1", "function foo(){...} 1", "1 1", "ReferenceError"],
        correctAnswer: "function foo(){...} 1",
        explanation: "Function declarations are hoisted before 'var' declarations. The 'var' later overwrites the variable reference."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q17.** What is the output?\nlet a = { x: 1 }; let b = a; b.x = 10; b = { x: 20 }; console.log(a.x); console.log(b.x);",
        options: ["10 20", "20 20", "10 10", "1 20"],
        correctAnswer: "10 20",
        explanation: "Variables store references. b = a copies the reference. b.x = 10 modifies the original object. b = {x: 20} points b to a completely new object."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q18.** What is the output?\nfunction test() { console.log(a); if (true) { var a = 100; } console.log(a); } test();",
        options: ["100 100", "undefined 100", "ReferenceError 100", "undefined undefined"],
        correctAnswer: "undefined 100",
        explanation: "'var' has function scope. The declaration is hoisted to the top of 'test()', so the first log is undefined."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q19.** What is the output?\nconst obj = { x: 10, regular() { return this.x; }, arrow: () => this.x }; console.log(obj.regular()); console.log(obj.arrow());",
        options: ["10 10", "10 undefined", "undefined 10", "TypeError"],
        correctAnswer: "10 undefined",
        explanation: "Regular functions use their caller as 'this'. Arrow functions use the 'this' from the outer lexical scope (global/window), where 'this.x' doesn't exist."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Hard",
        questionText: "**Q20.** Predict the output.\nconsole.log([] + []);\nconsole.log([] + {});\nconsole.log({} + []);",
        options: ["[object Object] ...", "[] {} {}", "0 0 0", "Syntax Error"],
        correctAnswer: "[object Object] [object Object]",
        explanation: "Adding objects/arrays triggers toString(). [] becomes '', {} becomes '[object Object]'. The first two result in strings, the third is a common JS quirk returning the object string."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Hard",
        questionText: "**Q21.** What is the output?\nPromise.resolve().then(() => { console.log(1); return Promise.resolve(2); }).then(console.log);\nconsole.log(3);",
        options: ["1 2 3", "3 1 2", "3 2 1", "1 3 2"],
        correctAnswer: "3 1 2",
        explanation: "Microtasks execute after sync code (3). The first then() logs 1, the returned promise causes the next then() to log 2."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Hard",
        questionText: "**Q22.** What is the output?\nsetTimeout(() => console.log(\"A\"));\nPromise.resolve().then(() => console.log(\"B\"));\nqueueMicrotask(() => console.log(\"C\"));\nconsole.log(\"D\");",
        options: ["D B C A", "D C B A", "B C D A", "D A B C"],
        correctAnswer: "D B C A",
        explanation: "D is sync. Then, the entire microtask queue (B and C) is emptied. Finally, the task queue (setTimeout A) is processed."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q23.** Which statement about Object.freeze() is correct?",
        options: [
            "Prevents adding new properties only.", 
            "Performs a deep freeze recursively.", 
            "Prevents adding, deleting, or modifying own properties, but nested objects remain mutable.", 
            "Makes the object immutable at every level."
        ],
        correctAnswer: "Prevents adding, deleting, or modifying own properties, but nested objects remain mutable.",
        explanation: "Object.freeze() is shallow. If an object has a property that is an object itself, that nested object can still be modified."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q24.** What is the output?\nconst obj = { a: 1 }; Object.freeze(obj); obj.a = 100; console.log(obj.a);",
        options: ["100", "1", "undefined", "TypeError"],
        correctAnswer: "1",
        explanation: "Object.freeze() prevents modification. In non-strict mode, it fails silently; in strict mode, it throws a TypeError. 'a' remains 1."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Hard",
        questionText: "**Q25.** Which expression creates a deep copy for most modern JavaScript objects without using external libraries?",
        options: ["Object.assign({}, obj)", "{ ...obj }", "structuredClone(obj)", "Object.create(obj)"],
        correctAnswer: "structuredClone(obj)",
        explanation: "structuredClone() is a modern built-in API specifically designed to create true deep copies of complex objects."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Easy",
        questionText: "**Q26.** What is the output?\nconsole.log(typeof typeof 100);",
        options: ["number", "string", "object", "undefined"],
        correctAnswer: "string",
        explanation: "'typeof 100' is 'number'. 'typeof \"number\"' is 'string'."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q27.** Which statement about debouncing is correct?",
        options: [
            "Executes a function at fixed intervals.", 
            "Executes only the first call within a time window.", 
            "Delays execution until calls stop for a specified delay.", 
            "Executes every callback in the event queue."
        ],
        correctAnswer: "Delays execution until calls stop for a specified delay.",
        explanation: "Debouncing ensures that a function is not called again until a certain amount of time has passed since the last time it was called."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q28.** Which statement about throttling is correct?",
        options: [
            "Delays execution until user stops triggering events.", 
            "Ensures a function executes at most once during a specified interval.", 
            "Prevents multiple event listeners.", 
            "Converts synchronous code into asynchronous code."
        ],
        correctAnswer: "Ensures a function executes at most once during a specified interval.",
        explanation: "Throttling guarantees that a function is called at a maximum frequency (e.g., once every 200ms), regardless of how many times the event fires."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Medium",
        questionText: "**Q29.** What is the output?\nconst person = { name: \"Alex\", greet() { console.log(this.name); } };\nconst greet = person.greet.bind({ name: \"John\" });\ngreet();",
        options: ["Alex", "John", "undefined", "TypeError"],
        correctAnswer: "John",
        explanation: "The bind() method creates a new function with the provided object bound as its 'this' context, overriding the original object."
    },
    {
        category: "Web Development", topic: "JavaScript", difficulty: "Hard",
        questionText: "**Q30.** What is the output?\nlet x = 5; (function () { console.log(x); let x = 10; })();",
        options: ["5", "10", "undefined", "ReferenceError"],
        correctAnswer: "ReferenceError",
        explanation: "Same as Q1: the 'let x' inside the IIFE creates a Temporal Dead Zone for the 'x' in that scope. Accessing it before declaration in the same scope throws a ReferenceError."
    }
];

const seedJSQuestions = async () => {
    try {
        console.log("🧹 Clearing old JS Fundamental records...");
        await Question.deleteMany({ category: "Web Development", topic: "JavaScript" });
        
        console.log(`🚀 Injecting ${jsQuestionsBatch.length} Formatted JS Questions...`);
        await Question.insertMany(jsQuestionsBatch);
        
        console.log(`✅ SUCCESS! All 30 JS Questions Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding JS data:", error);
        process.exit(1);
    }
};
seedJSQuestions();