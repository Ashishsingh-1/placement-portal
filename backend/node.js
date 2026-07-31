const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); // Apne path ke hisaab se adjust kar lena

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Node.js Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const nodeJsQuestions = [
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q1.** Which statement best explains why Node.js can handle thousands of concurrent I/O operations despite running JavaScript on a single thread?",
        options: [
            "JavaScript creates one OS thread per request.",
            "The V8 engine executes all I/O in parallel.",
            "Node.js delegates asynchronous I/O to libuv and the operating system while the event loop remains non-blocking.",
            "Node.js internally creates one process per socket."
        ],
        correctAnswer: "Node.js delegates asynchronous I/O to libuv and the operating system while the event loop remains non-blocking.",
        explanation: "Node.js uses a single-threaded event loop, but heavy I/O tasks are delegated to the libuv library, which uses a thread pool and the OS kernel to process tasks in the background, keeping the main thread free."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Hard",
        questionText: "**Q2.** Consider:\n\n```javascript\nconst fs = require('fs');\nconsole.log('A');\nfs.readFile('test.txt', () => {\n    console.log('B');\n});\nPromise.resolve().then(() => console.log('C'));\nprocess.nextTick(() => console.log('D'));\nconsole.log('E');\n```\nWhat is the correct execution order?",
        options: ["A E D C B", "A D E C B", "A E C D B", "A B C D E"],
        correctAnswer: "A E D C B",
        explanation: "Synchronous code runs first (A, E). Then, the microtask queue is checked. `process.nextTick` (D) takes priority over Promises (C). Finally, the I/O callback macro-task (B) executes in the poll phase of the event loop."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q3.** Which statement about `process.nextTick()` is correct?",
        options: [
            "It executes after timers.",
            "It is scheduled before Promise microtasks in Node.js.",
            "It executes only after the event loop completes one iteration.",
            "It belongs to the timers phase."
        ],
        correctAnswer: "It is scheduled before Promise microtasks in Node.js.",
        explanation: "In Node.js, `process.nextTick` callbacks are added to a special queue that is processed immediately after the current operation completes, before any other microtasks (like Promises) or event loop phases."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q4.** Which of the following operations is most likely to block the Node.js event loop?",
        options: [
            "fs.readFile()",
            "setTimeout()",
            "JSON.parse() on a 500 MB JSON string",
            "Database query using an asynchronous driver"
        ],
        correctAnswer: "JSON.parse() on a 500 MB JSON string",
        explanation: "`JSON.parse()` is a synchronous, CPU-bound operation. Running it on a massive string will block the main thread. The other options are asynchronous and will be handled by the event loop."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q5.** A Node.js application performs CPU-intensive image processing and becomes unresponsive. Which solution is the most appropriate?",
        options: [
            "Increase the heap size.",
            "Replace Promises with callbacks.",
            "Use Worker Threads.",
            "Replace Express with Fastify."
        ],
        correctAnswer: "Use Worker Threads.",
        explanation: "Worker Threads are designed specifically to handle CPU-intensive tasks in Node.js by allowing JavaScript execution in parallel threads without blocking the main event loop."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q6.** Which statement correctly distinguishes Cluster from Worker Threads?",
        options: [
            "Cluster shares the same JavaScript heap among workers.",
            "Worker Threads create separate Node.js processes.",
            "Cluster creates multiple processes, while Worker Threads execute within a process using separate threads.",
            "They are functionally identical."
        ],
        correctAnswer: "Cluster creates multiple processes, while Worker Threads execute within a process using separate threads.",
        explanation: "The Cluster module forks the entire process (each with its own memory heap). Worker Threads run within the same Node.js process and can share memory."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q7.** Which stream type can only read data?",
        options: ["Duplex", "Transform", "Writable", "Readable"],
        correctAnswer: "Readable",
        explanation: "A Readable stream is used for read-only operations, such as reading a file using `fs.createReadStream()`."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q8.** Which stream type can both read and write, with the output depending on the input?",
        options: ["Writable", "Duplex", "Transform", "Readable"],
        correctAnswer: "Transform",
        explanation: "A Transform stream is a special type of Duplex stream where the output is computed or modified based on the input data (e.g., zlib compression streams)."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q9.** Which technique is recommended for sending a 5 GB file from an Express server?",
        options: [
            "fs.readFile()",
            "res.sendFile() after loading the file into memory.",
            "Pipe a readable stream to the response.",
            "Convert the file to Base64 first."
        ],
        correctAnswer: "Pipe a readable stream to the response.",
        explanation: "Piping a readable stream (e.g., `fs.createReadStream().pipe(res)`) sends the file in small chunks, keeping memory consumption low. Loading 5 GB into memory would crash the application."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q10.** Which middleware is responsible for parsing incoming JSON request bodies in modern Express?",
        options: ["express.urlencoded()", "express.static()", "express.json()", "bodyParser.xml()"],
        correctAnswer: "express.json()",
        explanation: "`express.json()` is the built-in middleware in Express based on body-parser, specifically used to parse incoming requests with JSON payloads."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q11.** Assume the following middleware order:\n\n```javascript\napp.use(middlewareA);\napp.use(middlewareB);\napp.get('/user', handler);\n```\nIf `middlewareA` does not call `next()` or send a response, what happens?",
        options: [
            "middlewareB still executes.",
            "handler executes directly.",
            "The request remains pending until it times out.",
            "Express automatically skips to the route handler."
        ],
        correctAnswer: "The request remains pending until it times out.",
        explanation: "In Express, if a middleware function does not terminate the request-response cycle (e.g., via `res.send()`) or pass control using `next()`, the client's request will hang indefinitely."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q12.** Which HTTP status code should an Express API return after successfully creating a new resource?",
        options: ["200", "201", "204", "302"],
        correctAnswer: "201",
        explanation: "HTTP 201 'Created' is the standard semantic status code indicating that a request has succeeded and a new resource has been created."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q13.** An Express application throws an exception inside an asynchronous route. Which approach is recommended to ensure centralized error handling?",
        options: [
            "Wrap every route in try/catch only.",
            "Use an async wrapper (or Express 5 async handling) and forward errors to error middleware.",
            "Ignore rejected Promises.",
            "Use process.exit() inside the route."
        ],
        correctAnswer: "Use an async wrapper (or Express 5 async handling) and forward errors to error middleware.",
        explanation: "Express 4 does not automatically catch unhandled async errors. Best practice is to use an async wrapper or a package like `express-async-errors` to catch rejections and pass them to `next(err)`."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q14.** Which middleware should generally be placed last in the middleware chain?",
        options: [
            "Authentication middleware",
            "Logging middleware",
            "Error-handling middleware",
            "JSON parser middleware"
        ],
        correctAnswer: "Error-handling middleware",
        explanation: "Error-handling middleware must be defined after all other `app.use()` and routes so it can catch any errors passed down the chain via the `next(err)` function."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q15.** Which function signature identifies an Express error-handling middleware?",
        options: [
            "(req, res)",
            "(req, res, next)",
            "(err, req, res, next)",
            "(err, res)"
        ],
        correctAnswer: "(err, req, res, next)",
        explanation: "Express uniquely identifies an error-handling middleware by its 4-argument signature: `(err, req, res, next)`."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q16.** Which statement about CORS is correct?",
        options: [
            "CORS encrypts HTTP requests.",
            "CORS is enforced by browsers to control cross-origin access.",
            "CORS prevents SQL Injection.",
            "CORS replaces authentication."
        ],
        correctAnswer: "CORS is enforced by browsers to control cross-origin access.",
        explanation: "Cross-Origin Resource Sharing (CORS) is a security mechanism enforced by web browsers. It restricts web pages from making API requests to a domain different from the one that served the web page."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q17.** Which HTTP header is primarily used to allow requests from another origin?",
        options: ["Authorization", "Access-Control-Allow-Origin", "Content-Type", "X-Powered-By"],
        correctAnswer: "Access-Control-Allow-Origin",
        explanation: "The `Access-Control-Allow-Origin` response header indicates whether the response can be shared with requesting code from the given origin."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q18.** A public REST API is receiving thousands of requests per second from the same IP. Which Express middleware is most appropriate to reduce abuse?",
        options: ["Compression", "Helmet", "Rate Limiting", "Morgan"],
        correctAnswer: "Rate Limiting",
        explanation: "Rate limiting middleware (e.g., `express-rate-limit`) limits the number of requests a single IP address can make within a specific time window, preventing brute-force and DoS attacks."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q19.** Which middleware is commonly used to improve security by setting HTTP response headers?",
        options: ["Helmet", "Multer", "Passport", "Nodemon"],
        correctAnswer: "Helmet",
        explanation: "Helmet helps secure Express apps by setting various HTTP headers to mitigate common vulnerabilities like Cross-Site Scripting (XSS) and Clickjacking."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q20.** Which package is most commonly used in Express to handle `multipart/form-data` file uploads?",
        options: ["Morgan", "Multer", "Axios", "Passport"],
        correctAnswer: "Multer",
        explanation: "Multer is a Node.js middleware exclusively designed for handling `multipart/form-data`, which is primarily used for uploading files via forms."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q21.** Which Express architectural pattern improves maintainability by separating business logic from routing?",
        options: ["Observer", "MVC", "Singleton", "Adapter"],
        correctAnswer: "MVC",
        explanation: "Model-View-Controller (MVC) is a design pattern that separates application data handling (Models), user interfaces (Views), and routing/business logic (Controllers)."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q22.** Which statement about environment variables is correct?",
        options: [
            "Secrets such as database passwords should be hardcoded.",
            "Environment variables help separate configuration from application code.",
            ".env files should always be committed to public repositories.",
            "API keys should be stored inside React components."
        ],
        correctAnswer: "Environment variables help separate configuration from application code.",
        explanation: "Environment variables allow you to store sensitive credentials and environment-specific configs (like dev vs. production URLs) outside of your codebase."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q23.** Which package is commonly used to load environment variables from a `.env` file?",
        options: ["nodemon", "dotenv", "cors", "express-session"],
        correctAnswer: "dotenv",
        explanation: "The `dotenv` module loads environment variables from a `.env` file into `process.env`, making them accessible throughout the Node.js application."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q24.** Which logging middleware is widely used with Express for HTTP request logging?",
        options: ["Helmet", "Morgan", "Multer", "Passport"],
        correctAnswer: "Morgan",
        explanation: "Morgan is an HTTP request logger middleware for Node.js that generates log entries for incoming server requests."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q25.** Which Node.js module is responsible for creating HTTP servers without Express?",
        options: ["path", "http", "url", "events"],
        correctAnswer: "http",
        explanation: "The native `http` module provides `http.createServer()`, which is the foundation for handling HTTP requests in Node.js (and is what Express uses under the hood)."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q26.** Which statement about `EventEmitter` is correct?",
        options: [
            "It allows objects to emit and listen for custom events.",
            "It replaces Promises.",
            "It is used only for file system operations.",
            "It is available only in browsers."
        ],
        correctAnswer: "It allows objects to emit and listen for custom events.",
        explanation: "`EventEmitter` (from the 'events' module) implements the Observer pattern, allowing Node.js objects to publish events and subscribe to them using `.emit()` and `.on()`."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Easy",
        questionText: "**Q27.** Which Node.js module is used to work with file and directory paths in a platform-independent manner?",
        options: ["crypto", "fs", "path", "stream"],
        correctAnswer: "path",
        explanation: "The `path` module provides utilities (like `path.join()`) to handle file paths properly across different operating systems (Windows uses `\\` while POSIX uses `/`)."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q28.** Which approach is recommended for password storage in a Node.js application?",
        options: [
            "Store passwords in plain text.",
            "Encrypt passwords using Base64.",
            "Hash passwords using a strong algorithm such as bcrypt.",
            "Store only MD5 hashes without salt."
        ],
        correctAnswer: "Hash passwords using a strong algorithm such as bcrypt.",
        explanation: "Passwords should always be hashed (not encrypted) using secure, salt-based algorithms like `bcrypt` or `argon2` to protect user credentials if the database is breached."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q29.** A Node.js application crashes because of an unhandled Promise rejection. What is the best long-term solution?",
        options: [
            "Ignore the rejection.",
            "Catch and properly handle rejected Promises throughout the application.",
            "Disable Promises.",
            "Replace all async functions with synchronous code."
        ],
        correctAnswer: "Catch and properly handle rejected Promises throughout the application.",
        explanation: "Unhandled promise rejections can cause memory leaks or unpredictable states. The correct approach is to implement comprehensive error handling using `.catch()` or `try/catch` blocks."
    },
    {
        category: "Backend Development", topic: "Node.js & Express", difficulty: "Medium",
        questionText: "**Q30.** Which design choice most improves the scalability of a Node.js REST API under heavy traffic?",
        options: [
            "Perform synchronous file I/O inside request handlers.",
            "Keep long-running CPU-intensive tasks on the event loop.",
            "Offload CPU-intensive work and keep request handlers non-blocking.",
            "Store all application state in global variables."
        ],
        correctAnswer: "Offload CPU-intensive work and keep request handlers non-blocking.",
        explanation: "Because Node.js runs on a single thread, keeping that thread non-blocking is crucial for scaling. CPU-heavy tasks must be offloaded to Worker Threads or microservices so the server can continue accepting incoming requests."
    }
];

const seedNodeJsQuestions = async () => {
    try {
        console.log("🧹 Clearing old Node.js & Express records...");
        await Question.deleteMany({ topic: "Node.js & Express" }); 
        
        console.log(`🚀 Injecting ${nodeJsQuestions.length} Formatted Questions...`);
        await Question.insertMany(nodeJsQuestions);
        
        console.log(`✅ SUCCESS! All 30 Node.js & Express Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedNodeJsQuestions();