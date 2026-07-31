const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); // Apne path ke hisaab se adjust kar lena

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Architecture & Deployment Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const architectureQuestions = [
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q1.** A React application serves 2 million users/day. Static assets (JS/CSS/images) are taking 2–3 seconds to load globally.\n\nWhich architecture change will provide the greatest improvement?",
        options: ["Increase MongoDB indexes", "Serve static assets through a CDN", "Increase Express middleware", "Move JWT to LocalStorage"],
        correctAnswer: "Serve static assets through a CDN",
        explanation: "A Content Delivery Network (CDN) caches static assets on edge servers distributed globally. This significantly reduces latency by serving files to users from a server physically closest to them."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q2.** Your Express server runs behind Nginx.\n\nWhat is the primary responsibility of Nginx in this setup?",
        options: ["Compile React code", "Reverse Proxy and Load Balancing", "Store MongoDB data", "Execute Node.js code faster"],
        correctAnswer: "Reverse Proxy and Load Balancing",
        explanation: "Nginx is commonly used as a reverse proxy to handle incoming HTTP requests, provide SSL termination, serve static files efficiently, and load balance traffic across multiple Node.js instances."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q3.** Which load-balancing algorithm distributes requests one by one across available servers?",
        options: ["FIFO", "Round Robin", "DFS", "LRU"],
        correctAnswer: "Round Robin",
        explanation: "Round Robin is a simple load balancing algorithm that forwards incoming requests to each server in the cluster sequentially, ensuring an even distribution of traffic."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q4.** An API receives 1000 identical requests/sec for the same product details.\n\nWhich solution most effectively reduces database load?",
        options: ["Use synchronous queries", "Add Redis caching", "Restart MongoDB", "Disable indexes"],
        correctAnswer: "Add Redis caching",
        explanation: "Caching the database response in a fast, in-memory data store like Redis allows the API to serve identical, repeated requests instantly without hitting the main database."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q5.** Which cache strategy minimizes stale data immediately after an update?",
        options: ["Cache Forever", "Cache-Aside with Cache Invalidation", "Browser Cache Only", "Random Cache Refresh"],
        correctAnswer: "Cache-Aside with Cache Invalidation",
        explanation: "By actively invalidating (deleting or updating) the cached entry exactly when the underlying database is updated, you ensure the next read fetches and caches the fresh data."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q6.** Your application stores frequently accessed user sessions.\n\nWhich storage is the best choice?",
        options: ["JSON file", "Redis", "MongoDB Collection", "Browser LocalStorage"],
        correctAnswer: "Redis",
        explanation: "Redis is an in-memory key-value store optimized for high-speed reads and writes, making it the industry standard for managing fast-expiring session data."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q7.** A WebSocket connection is preferred over REST when:",
        options: ["Data changes rarely.", "Real-time bidirectional communication is required.", "Only file uploads are needed.", "Authentication is unnecessary."],
        correctAnswer: "Real-time bidirectional communication is required.",
        explanation: "Unlike REST (which is stateless and request-response based), WebSockets keep a persistent connection open, allowing both the client and server to push real-time data to each other instantly."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q8.** Which technology is most suitable for a real-time chat application?",
        options: ["Polling", "WebSocket", "FTP", "SMTP"],
        correctAnswer: "WebSocket",
        explanation: "WebSockets provide a persistent, low-latency, two-way communication channel perfectly suited for live chat applications where messages must be delivered instantly."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q9.** Server-Sent Events (SSE) differ from WebSockets because SSE:",
        options: ["Supports bidirectional communication.", "Supports only server-to-client communication.", "Requires UDP.", "Replaces HTTP."],
        correctAnswer: "Supports only server-to-client communication.",
        explanation: "SSE is a unidirectional technology where the client subscribes to a stream of updates from the server over standard HTTP, ideal for live feeds but not for two-way chat."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Hard",
        questionText: "**Q10.** Which deployment strategy minimizes downtime during production releases?",
        options: ["Manual deployment", "Blue-Green Deployment", "Delete old server first", "Restart MongoDB before deployment"],
        correctAnswer: "Blue-Green Deployment",
        explanation: "Blue-Green deployment maintains two identical production environments. Traffic routes to the 'Blue' (active) environment while the 'Green' gets the update. Traffic is then instantly switched, resulting in zero downtime."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q11.** Which Docker command creates an image from a Dockerfile?",
        options: ["docker run", "docker build", "docker exec", "docker logs"],
        correctAnswer: "docker build",
        explanation: "The `docker build` command reads a Dockerfile and executes its instructions to compile a portable, executable Docker Image."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q12.** What is the primary purpose of Docker containers?",
        options: ["Replace Linux", "Package an application with its dependencies for consistent execution", "Replace databases", "Compile JavaScript"],
        correctAnswer: "Package an application with its dependencies for consistent execution",
        explanation: "Containers bundle an application's code, runtime, system tools, and libraries together, guaranteeing that it will run exactly the same regardless of the host environment."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q13.** Which CI/CD stage is primarily responsible for automatically running tests?",
        options: ["Deployment", "Integration Pipeline", "Monitoring", "Rollback"],
        correctAnswer: "Integration Pipeline",
        explanation: "Continuous Integration (CI) pipelines automatically build the code and run automated tests every time new code is committed, ensuring bugs are caught before deployment."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q14.** A Node.js application experiences memory leaks.\n\nWhich tool would you investigate first?",
        options: ["Chrome DevTools Heap Snapshot", "MongoDB Compass", "VS Code Themes", "npm install"],
        correctAnswer: "Chrome DevTools Heap Snapshot",
        explanation: "By connecting Node.js to Chrome DevTools, developers can take heap snapshots to track object allocation and identify memory leaks over time."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q15.** A React application is slow because every component re-renders after every state update.\n\nWhich optimization is least appropriate?",
        options: ["React.memo", "useMemo", "useCallback", "setInterval"],
        correctAnswer: "setInterval",
        explanation: "`setInterval` is a timer function and provides no performance optimization. `React.memo`, `useMemo`, and `useCallback` are specifically designed to prevent unnecessary re-renders in React."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q16.** Which HTTP compression algorithm commonly reduces response payload size?",
        options: ["Base64", "Gzip", "SHA-256", "JWT"],
        correctAnswer: "Gzip",
        explanation: "Gzip (and Brotli) are standard compression algorithms used by web servers to reduce the size of HTTP response bodies (like JSON or HTML) before sending them over the network."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q17.** A production API receives many repeated GET requests.\n\nWhich HTTP mechanism allows browsers to reuse cached responses?",
        options: ["CORS", "Cache-Control", "Authorization", "Origin"],
        correctAnswer: "Cache-Control",
        explanation: "The `Cache-Control` HTTP header defines caching policies, instructing the browser on how long and under what conditions it can serve a previously cached response."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q18.** A CDN primarily improves:",
        options: ["Database indexing", "Global content delivery latency", "JWT validation", "MongoDB aggregation"],
        correctAnswer: "Global content delivery latency",
        explanation: "By keeping copies of static content on geographically distributed edge servers, a CDN drastically cuts down the physical distance data must travel to reach the user."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q19.** Which database design minimizes the N+1 Query Problem in MongoDB?",
        options: ["Random indexing", "Appropriate embedding when relationships are closely related", "Disabling indexes", "Always using $lookup"],
        correctAnswer: "Appropriate embedding when relationships are closely related",
        explanation: "By embedding closely related child data within the parent document (denormalization), you retrieve all necessary data in one query, avoiding the N+1 problem of making secondary queries for each result."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q20.** Your Express API becomes CPU-bound during image resizing.\n\nWhich architecture is most scalable?",
        options: ["Resize images in every request handler.", "Move image processing to background workers or dedicated services.", "Disable compression.", "Increase JWT expiration time."],
        correctAnswer: "Move image processing to background workers or dedicated services.",
        explanation: "Node.js runs on a single thread. CPU-heavy tasks like image processing will block the event loop. Offloading these to a background worker or microservice keeps the main API highly responsive."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q21.** Which security header helps prevent Clickjacking?",
        options: ["X-Frame-Options", "Access-Control-Allow-Origin", "Authorization", "ETag"],
        correctAnswer: "X-Frame-Options",
        explanation: "The `X-Frame-Options` HTTP response header can be used to indicate whether a browser should be allowed to render a page in a `<frame>`, `<iframe>`, `<embed>` or `<object>`, thereby preventing clickjacking attacks."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q22.** Which HTTP header enforces Content Security Policy (CSP)?",
        options: ["CSP", "Content-Security-Policy", "Security-Policy", "XSS-Policy"],
        correctAnswer: "Content-Security-Policy",
        explanation: "The `Content-Security-Policy` header allows site administrators to declare approved sources of content that the browser is allowed to load, mitigating XSS and data injection attacks."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q23.** Which architecture pattern is most suitable for scaling independently deployable backend services?",
        options: ["Monolithic Architecture", "Microservices", "MVC", "Singleton"],
        correctAnswer: "Microservices",
        explanation: "Microservices architecture breaks down an application into smaller, loosely coupled, and independently deployable services, making scaling and maintaining large systems easier."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q24.** A distributed system needs asynchronous communication between services.\n\nWhich technology is most appropriate?",
        options: ["Message Queue (RabbitMQ/Kafka)", "Local Storage", "CSS Grid", "HTML Forms"],
        correctAnswer: "Message Queue (RabbitMQ/Kafka)",
        explanation: "Message brokers like RabbitMQ or Kafka facilitate reliable, asynchronous communication by holding messages in a queue until the receiving service is ready to process them."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q25.** What is the primary advantage of API Gateway in a microservices architecture?",
        options: ["Replaces databases", "Provides a single entry point for routing, authentication, and rate limiting", "Compiles React code", "Replaces Redis"],
        correctAnswer: "Provides a single entry point for routing, authentication, and rate limiting",
        explanation: "An API Gateway centralizes cross-cutting concerns (like security, routing, and throttling) so individual microservices don't have to redundantly implement them."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q26.** Which monitoring metric most directly indicates server saturation?",
        options: ["CPU utilization consistently near 100%", "Number of CSS files", "Number of HTML pages", "Browser version"],
        correctAnswer: "CPU utilization consistently near 100%",
        explanation: "When a server's CPU hits and stays near 100%, it implies the hardware is completely saturated, leading to queued requests, sluggish performance, and potential downtime."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Easy",
        questionText: "**Q27.** Which strategy best protects an API from brute-force login attempts?",
        options: ["Disable HTTPS", "Rate limiting with temporary account/IP lockout", "Increase JWT size", "Disable authentication logs"],
        correctAnswer: "Rate limiting with temporary account/IP lockout",
        explanation: "Rate limiting restricts the number of login attempts an attacker can make in a given timeframe, effectively neutralizing automated brute-force scripts."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Hard",
        questionText: "**Q28.** Which deployment strategy allows gradually shifting traffic to a new version before full rollout?",
        options: ["Canary Deployment", "Big Bang Deployment", "Manual FTP Deployment", "Cold Restart"],
        correctAnswer: "Canary Deployment",
        explanation: "Canary releases involve deploying the new version to a small subset of users first. If it is stable, traffic is gradually increased until 100% of users are on the new version."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Medium",
        questionText: "**Q29.** An application suffers from a Single Point of Failure (SPOF).\n\nWhich solution most effectively improves availability?",
        options: ["Deploy multiple redundant instances behind a load balancer", "Increase JavaScript bundle size", "Disable health checks", "Store logs in memory only"],
        correctAnswer: "Deploy multiple redundant instances behind a load balancer",
        explanation: "Running multiple redundant instances ensures that if one server crashes, the load balancer automatically redirects traffic to healthy servers, eliminating the SPOF."
    },
    {
        category: "Backend Development", topic: "Performance & Deployment", difficulty: "Hard",
        questionText: "**Q30.** A production MERN application must support millions of users while maintaining low latency, high availability, and secure authentication.\n\nWhich architecture is the best overall choice?",
        options: [
            "Single Node.js server + Local Storage authentication + no cache",
            "Multiple Node.js instances behind a Load Balancer + Redis Cache + CDN + MongoDB Replica Set + JWT with Refresh Token Rotation + Monitoring",
            "One Express server with synchronous file I/O",
            "MongoDB without indexes and browser polling for all updates"
        ],
        correctAnswer: "Multiple Node.js instances behind a Load Balancer + Redis Cache + CDN + MongoDB Replica Set + JWT with Refresh Token Rotation + Monitoring",
        explanation: "This architecture is robust and enterprise-ready. It uses horizontal scaling (Load Balancer), minimizes latency (Redis, CDN), ensures database resilience (Replica Sets), protects security (Token Rotation), and tracks health (Monitoring)."
    }
];

const seedArchitectureQuestions = async () => {
    try {
        console.log("🧹 Clearing old Backend Development records...");
        await Question.deleteMany({ topic: "Performance & Deployment" }); 
        
        console.log(`🚀 Injecting ${architectureQuestions.length} Formatted Questions...`);
        await Question.insertMany(architectureQuestions);
        
        console.log(`✅ SUCCESS! All 30 Architecture Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedArchitectureQuestions();