const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); // Apne path ke hisaab se adjust kar lena

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Advanced MERN Architecture Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const advancedQuestions = [
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Hard",
        questionText: "**Q1.** A React application stores the Access Token in memory and the Refresh Token in an HttpOnly cookie.\n\nFive API requests are fired simultaneously after the Access Token expires. Which architecture avoids multiple refresh requests?",
        options: [
            "Refresh before every request.",
            "Queue pending requests while one refresh request is in progress.",
            "Store Refresh Token in LocalStorage.",
            "Increase Access Token expiry to 24 hours."
        ],
        correctAnswer: "Queue pending requests while one refresh request is in progress.",
        explanation: "Implementing an interceptor that pauses (queues) outgoing requests while a refresh token request is active prevents race conditions and redundant network calls."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q2.** A Node.js API performs image compression synchronously inside an Express route.\n\nUnder heavy traffic, response time increases drastically. What is the best architectural improvement?",
        options: [
            "Use setTimeout().",
            "Move image processing to Worker Threads/background jobs.",
            "Increase Express middleware.",
            "Disable compression."
        ],
        correctAnswer: "Move image processing to Worker Threads/background jobs.",
        explanation: "Synchronous CPU-bound tasks block the Node.js single-threaded event loop. Offloading them to Worker Threads or external background jobs keeps the main thread responsive."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Hard",
        questionText: "**Q3.** A MongoDB query:\n\n\`\`\`javascript\ndb.orders.find({\n    customerId: 101,\n    status: 'PAID'\n}).sort({\n    createdAt: -1\n})\n\`\`\`\n\nWhich compound index is generally the best?",
        options: [
            "{ customerId: 1 }",
            "{ status: 1 }",
            "{ customerId: 1, status: 1, createdAt: -1 }",
            "{ createdAt: -1 }"
        ],
        correctAnswer: "{ customerId: 1, status: 1, createdAt: -1 }",
        explanation: "Following the ESR (Equality, Sort, Range) rule, equality matches (`customerId`, `status`) should be placed first, followed by the sort field (`createdAt`)."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Hard",
        questionText: "**Q4.** A React component passes this prop:\n\n\`\`\`javascript\n<UserCard user={{ name: 'Alex' }} />\n\`\`\`\n\nThe parent re-renders every second. Why does React.memo(UserCard) still re-render?",
        options: [
            "React.memo ignores objects.",
            "A new object reference is created every render.",
            "JSX cannot compare props.",
            "React always re-renders memoized components."
        ],
        correctAnswer: "A new object reference is created every render.",
        explanation: "`React.memo` uses shallow comparison. Passing an inline object `{name: 'Alex'}` creates a new memory reference on every parent render, breaking the memoization."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Hard",
        questionText: "**Q5.** Which execution order is correct?\n\n\`\`\`javascript\nconsole.log(1);\nsetTimeout(() => console.log(2));\nPromise.resolve().then(() => console.log(3));\nqueueMicrotask(() => console.log(4));\nprocess.nextTick(() => console.log(5));\nconsole.log(6);\n\`\`\`",
        options: [
            "1 6 5 3 4 2",
            "1 5 6 4 3 2",
            "1 6 3 5 4 2",
            "1 2 3 4 5 6"
        ],
        correctAnswer: "1 6 5 3 4 2",
        explanation: "Synchronous code runs first (1, 6). Next is `process.nextTick` (5). Then other microtasks: Promises (3) and queueMicrotask (4). Finally, macrotasks like `setTimeout` (2) execute."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q6.** A login endpoint is under a brute-force attack.\n\nWhich combination provides the best protection?",
        options: [
            "JWT only",
            "HTTPS only",
            "Rate Limiting + Account Lockout + CAPTCHA",
            "Increase JWT expiry"
        ],
        correctAnswer: "Rate Limiting + Account Lockout + CAPTCHA",
        explanation: "Rate limiting slows down attacks, account lockouts stop persistent attempts on a single user, and CAPTCHA prevents automated bots."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q7.** A REST API must return user details along with 10 recent orders.\n\nWhich design is generally preferred?",
        options: [
            "11 separate API calls",
            "One optimized endpoint with aggregation/join logic",
            "Browser loops",
            "LocalStorage"
        ],
        correctAnswer: "One optimized endpoint with aggregation/join logic",
        explanation: "Reducing network round-trips by aggregating data on the backend is generally much more performant than making multiple independent API calls from the client."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q8.** Which deployment strategy allows 1% of users to receive the new version before everyone else?",
        options: [
            "Blue-Green",
            "Canary",
            "Rolling Back",
            "Cold Deployment"
        ],
        correctAnswer: "Canary",
        explanation: "Canary deployments slowly roll out changes to a small subset of users to test stability before a full release."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q9.** A production React bundle is 8 MB.\n\nWhich optimization gives the largest initial-load improvement?",
        options: [
            "Increase RAM",
            "React.lazy + Code Splitting",
            "More CSS",
            "Redux"
        ],
        correctAnswer: "React.lazy + Code Splitting",
        explanation: "Code splitting with `React.lazy` allows you to break the large bundle into smaller chunks that are loaded on demand, drastically reducing the initial load time."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Hard",
        questionText: "**Q10.** A JWT is valid but the user's role has changed from Admin to User.\n\nHow should authorization be handled?",
        options: [
            "Trust JWT forever.",
            "Validate permissions against current server-side data or invalidate tokens appropriately.",
            "Ignore role changes.",
            "Extend token expiry."
        ],
        correctAnswer: "Validate permissions against current server-side data or invalidate tokens appropriately.",
        explanation: "JWTs are stateless. If critical roles change, you must check the database for sensitive routes or implement token revocation to force a new token issue."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Easy",
        questionText: "**Q11.** Which HTTP status code should be returned when a client exceeds API rate limits?",
        options: ["200", "401", "429", "500"],
        correctAnswer: "429",
        explanation: "HTTP 429 'Too Many Requests' is the standard HTTP status code used when rate limiting is applied."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q12.** A Node.js server uses `fs.readFileSync()` inside every request.\n\nWhat is the biggest problem?",
        options: [
            "Better concurrency",
            "Event loop blocking",
            "MongoDB replication",
            "JWT failure"
        ],
        correctAnswer: "Event loop blocking",
        explanation: "`readFileSync` is synchronous and blocks the single-threaded Node.js event loop, preventing the server from handling any other concurrent requests."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q13.** A MongoDB aggregation performs: `$lookup`, `$group`, `$match`.\n\nWhich optimization is generally recommended?",
        options: [
            "Place $match as early as possible.",
            "Place $group first.",
            "Always remove $lookup.",
            "Use $limit first regardless of the query."
        ],
        correctAnswer: "Place $match as early as possible.",
        explanation: "Putting `$match` early filters out unnecessary documents before computationally expensive operations like `$lookup` and `$group` are executed."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Easy",
        questionText: "**Q14.** Which attack can steal an Access Token stored in LocalStorage?",
        options: ["CSRF", "XSS", "SQL Injection", "SSRF"],
        correctAnswer: "XSS",
        explanation: "Cross-Site Scripting (XSS) allows attackers to execute malicious JavaScript in the browser, which can easily read and exfiltrate data from LocalStorage."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q15.** Which storage option is generally preferred for Refresh Tokens in browser applications?",
        options: [
            "LocalStorage",
            "SessionStorage",
            "HttpOnly Secure Cookie",
            "IndexedDB"
        ],
        correctAnswer: "HttpOnly Secure Cookie",
        explanation: "HttpOnly cookies cannot be accessed by client-side JavaScript, protecting the sensitive refresh token from XSS attacks."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Hard",
        questionText: "**Q16.** A React list contains 500,000 rows.\n\nWhich optimization is most appropriate?",
        options: ["useEffect", "Virtualization (Windowing)", "useState", "React.Fragment"],
        correctAnswer: "Virtualization (Windowing)",
        explanation: "Virtualization (using libraries like `react-window`) only renders the DOM nodes currently visible in the viewport, saving immense memory and CPU."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q17.** A production API becomes slow because every request performs identical database queries.\n\nWhich architecture is most appropriate?",
        options: [
            "Disable indexes.",
            "Redis caching.",
            "Remove MongoDB.",
            "Restart Express every hour."
        ],
        correctAnswer: "Redis caching.",
        explanation: "An in-memory cache like Redis can store the results of frequent, identical queries, bypassing the database entirely for subsequent requests."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q18.** Which CSP directive most directly restricts JavaScript execution sources?",
        options: ["img-src", "script-src", "font-src", "frame-src"],
        correctAnswer: "script-src",
        explanation: "The `script-src` directive in Content Security Policy specifically dictates from which locations JavaScript is permitted to load and execute."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q19.** Which Node.js feature enables true parallel execution of CPU-intensive JavaScript?",
        options: ["Event Loop", "Worker Threads", "Promises", "Streams"],
        correctAnswer: "Worker Threads",
        explanation: "Worker Threads allow Node.js to spawn separate threads running in parallel, which is perfect for offloading heavy CPU-bound tasks from the main event loop."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Hard",
        questionText: "**Q20.** Which architecture best supports millions of concurrent WebSocket connections?",
        options: [
            "Single Node.js instance",
            "Horizontally scaled WebSocket servers with sticky sessions or a shared pub/sub backend",
            "PHP sessions",
            "LocalStorage synchronization"
        ],
        correctAnswer: "Horizontally scaled WebSocket servers with sticky sessions or a shared pub/sub backend",
        explanation: "A single server cannot handle millions of sockets. Scaling out horizontally and using a pub/sub system (like Redis) ensures messages are routed correctly across multiple instances."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q21.** A React application experiences unnecessary child re-renders because callback props change every render.\n\nWhich optimization is most suitable?",
        options: ["useEffect", "useCallback", "useReducer", "createContext"],
        correctAnswer: "useCallback",
        explanation: "`useCallback` memoizes the function reference, ensuring the same function instance is passed to children on re-renders unless its dependencies change."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Easy",
        questionText: "**Q22.** Which MongoDB feature provides automatic failover?",
        options: ["Aggregation", "Replica Set", "Sharding", "TTL Index"],
        correctAnswer: "Replica Set",
        explanation: "A Replica Set consists of a primary node and multiple secondary nodes. If the primary fails, the set automatically elects a new primary to maintain availability."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q23.** Which authentication flow is recommended for modern Single Page Applications?",
        options: [
            "OAuth Implicit Flow",
            "OAuth Authorization Code Flow with PKCE",
            "Password Grant",
            "Basic Authentication"
        ],
        correctAnswer: "OAuth Authorization Code Flow with PKCE",
        explanation: "PKCE (Proof Key for Code Exchange) secures the Authorization Code flow for public clients (SPAs) without needing a static client secret."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Easy",
        questionText: "**Q24.** Which HTTP header is primarily used for Bearer Token authentication?",
        options: ["Accept", "Authorization", "Origin", "Content-Length"],
        correctAnswer: "Authorization",
        explanation: "Bearer tokens are sent in the HTTP request via the `Authorization: Bearer <token>` header."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q25.** A MERN application suffers from the N+1 query problem.\n\nWhich approach generally reduces database round trips?",
        options: [
            "Better schema design (embedding where appropriate) or optimized aggregation/population",
            "Increase CSS size",
            "Disable indexes",
            "Use synchronous APIs"
        ],
        correctAnswer: "Better schema design (embedding where appropriate) or optimized aggregation/population",
        explanation: "Avoiding N+1 requires fetching related data efficiently, either by embedding it natively in the document or by utilizing efficient `$lookup` (JOIN) or Mongoose `populate`."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q26.** A production API returns 500 Internal Server Error after an unhandled async exception.\n\nWhich Express practice prevents server crashes and centralizes error responses?",
        options: [
            "Ignore rejected promises.",
            "Async wrapper (or Express 5 async support) with centralized error middleware.",
            "Wrap everything in setTimeout().",
            "Restart the server after every request."
        ],
        correctAnswer: "Async wrapper (or Express 5 async support) with centralized error middleware.",
        explanation: "Wrapping async route handlers catches promise rejections and forwards them to a centralized Express error-handling middleware (`(err, req, res, next)`)."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Easy",
        questionText: "**Q27.** Which HTTP response header helps prevent Clickjacking?",
        options: ["Authorization", "X-Frame-Options", "Content-Type", "ETag"],
        correctAnswer: "X-Frame-Options",
        explanation: "`X-Frame-Options` prevents an application from being rendered inside an iframe, stopping attackers from tricking users into clicking hidden elements."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Medium",
        questionText: "**Q28.** A React application fetches data on every page visit even though the data rarely changes.\n\nWhich optimization is generally the most appropriate?",
        options: [
            "Disable caching.",
            "Client-side/server-side caching with appropriate cache invalidation.",
            "Increase bundle size.",
            "Remove API responses."
        ],
        correctAnswer: "Client-side/server-side caching with appropriate cache invalidation.",
        explanation: "Caching the data locally (e.g., via React Query) or utilizing HTTP caching headers stops unnecessary API calls and database reads."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Hard",
        questionText: "**Q29.** A company wants zero-downtime deployment with instant rollback capability.\n\nWhich deployment strategy is most appropriate?",
        options: [
            "Manual FTP deployment",
            "Blue-Green Deployment",
            "Cold Restart",
            "Database Restart"
        ],
        correctAnswer: "Blue-Green Deployment",
        explanation: "Blue-Green runs the old and new versions simultaneously. You switch traffic instantly at the load balancer level, and if something fails, you switch back instantly."
    },
    {
        category: "Backend Development", topic: "Advanced MERN Architecture", difficulty: "Hard",
        questionText: "**Q30.** A MERN application must satisfy all of the following:\n- Low latency\n- High availability\n- Secure authentication\n- Horizontal scalability\n- Efficient database access\n- Real-time notifications\n- Zero-downtime deployments\n\nWhich architecture best satisfies these requirements?",
        options: [
            "Single Express server + LocalStorage JWT + No Cache + Polling",
            "Multiple Node.js instances behind a Load Balancer + Redis Cache + CDN + MongoDB Replica Set + Optimized Indexes + WebSockets + JWT with Refresh Token Rotation + Blue-Green/Canary Deployment + Centralized Monitoring",
            "Single MongoDB instance + readFileSync() + SessionStorage",
            "React polling every second with no backend caching"
        ],
        correctAnswer: "Multiple Node.js instances behind a Load Balancer + Redis Cache + CDN + MongoDB Replica Set + Optimized Indexes + WebSockets + JWT with Refresh Token Rotation + Blue-Green/Canary Deployment + Centralized Monitoring",
        explanation: "This comprehensive architecture combines all best practices across scaling, security, real-time sync, caching, and CI/CD to meet enterprise requirements."
    }
];

const seedAdvancedQuestions = async () => {
    try {
        console.log("🧹 Clearing old Advanced MERN Architecture records...");
        await Question.deleteMany({ topic: "Advanced MERN Architecture" }); 
        
        console.log(`🚀 Injecting ${advancedQuestions.length} Formatted Questions...`);
        await Question.insertMany(advancedQuestions);
        
        console.log(`✅ SUCCESS! All 30 Advanced Architecture Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedAdvancedQuestions();