const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); // Apne path ke hisaab se adjust kar lena

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for API & Security Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const securityQuestions = [
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q1.** Which statement best describes a RESTful API?",
        options: [
            "Every request must maintain server-side session state.",
            "Each request should contain all information needed to process it.",
            "Every endpoint must use only the GET method.",
            "REST requires JWT authentication."
        ],
        correctAnswer: "Each request should contain all information needed to process it.",
        explanation: "RESTful APIs must be stateless. This means the server does not store any session context about the client, and every request must contain all the necessary information to understand and process it."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q2.** Which HTTP method is both idempotent and typically used to completely replace a resource?",
        options: ["POST", "PATCH", "PUT", "CONNECT"],
        correctAnswer: "PUT",
        explanation: "The PUT method is used to completely replace an existing resource with the request payload. It is idempotent, meaning multiple identical PUT requests have the same effect as a single request."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q3.** Which HTTP method is not idempotent?",
        options: ["GET", "PUT", "DELETE", "POST"],
        correctAnswer: "POST",
        explanation: "POST is typically used to create a new resource. Sending the same POST request multiple times will result in multiple distinct resources being created, making it non-idempotent."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q4.** A client sends the same PUT request 10 times with identical data.\n\nAccording to REST principles, the final server state should be:",
        options: [
            "Different after every request",
            "Identical to the state after the first successful request",
            "Undefined",
            "Server-dependent only"
        ],
        correctAnswer: "Identical to the state after the first successful request",
        explanation: "Because PUT is an idempotent operation, applying it once or multiple times successively has the exact same intended effect on the server's state."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q5.** A JWT consists of:",
        options: [
            "Payload + Signature",
            "Header + Payload + Signature",
            "Header + Session ID",
            "Payload + Cookie"
        ],
        correctAnswer: "Header + Payload + Signature",
        explanation: "A JSON Web Token (JWT) is composed of three parts separated by dots: a Header (algorithm/type), a Payload (claims/data), and a Signature (to verify integrity)."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q6.** Which JWT component is digitally signed to prevent tampering?",
        options: [
            "Header only",
            "Payload only",
            "Header and Payload together",
            "Signature only"
        ],
        correctAnswer: "Header and Payload together",
        explanation: "The signature is created by taking the encoded header, the encoded payload, a secret, and the algorithm specified in the header to digitally sign the entire content."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q7.** Which claim is commonly used to represent the expiration time of a JWT?",
        options: ["uid", "iss", "exp", "iat"],
        correctAnswer: "exp",
        explanation: "The 'exp' (expiration time) claim identifies the expiration time on or after which the JWT must not be accepted for processing."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q8.** What is the primary purpose of a Refresh Token?",
        options: [
            "Replace HTTPS",
            "Obtain a new Access Token without requiring the user to log in again",
            "Encrypt the Access Token",
            "Replace JWT signatures"
        ],
        correctAnswer: "Obtain a new Access Token without requiring the user to log in again",
        explanation: "Refresh tokens are long-lived credentials used to request new, short-lived Access Tokens after they expire, providing better security and user experience."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q9.** Which storage mechanism is generally considered the most secure for Refresh Tokens in browser-based applications?",
        options: [
            "Local Storage",
            "Session Storage",
            "HttpOnly Secure Cookie",
            "JavaScript Variable"
        ],
        correctAnswer: "HttpOnly Secure Cookie",
        explanation: "HttpOnly cookies cannot be accessed via JavaScript, mitigating the risk of attackers stealing the token through Cross-Site Scripting (XSS) attacks."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q10.** A company stores its Access Token in Local Storage.\n\nWhat is the biggest security risk?",
        options: ["CSRF", "SQL Injection", "XSS", "SSRF"],
        correctAnswer: "XSS",
        explanation: "Local Storage is fully accessible to JavaScript. In a Cross-Site Scripting (XSS) attack, malicious scripts injected into the app can easily read and steal tokens stored there."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q11.** An application stores JWTs inside HttpOnly cookies.\n\nWhich attack risk is significantly reduced?",
        options: ["CSRF", "XSS token theft", "Clickjacking", "DNS Spoofing"],
        correctAnswer: "XSS token theft",
        explanation: "Because an HttpOnly cookie cannot be accessed by client-side scripts (JavaScript), the risk of the token being stolen via an XSS attack is largely eliminated."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q12.** Which attack exploits a browser automatically sending cookies to another site?",
        options: ["XSS", "CSRF", "MITM", "SSR"],
        correctAnswer: "CSRF",
        explanation: "Cross-Site Request Forgery (CSRF) tricks a victim's browser into executing an unwanted action on a trusted site by automatically attaching cookies (like session identifiers) to the request."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q13.** Which mechanism is the most effective protection against CSRF for authenticated browser requests?",
        options: [
            "Base64 encoding",
            "CSRF Token (Synchronizer/Double Submit Pattern)",
            "URL Encoding",
            "Minification"
        ],
        correctAnswer: "CSRF Token (Synchronizer/Double Submit Pattern)",
        explanation: "Using an anti-CSRF token ensures that the request originated from your actual application, as the attacker's site cannot read or generate this unpredictable token."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q14.** Which attack injects malicious JavaScript into a trusted webpage?",
        options: ["CSRF", "XSS", "SQL Injection", "Replay Attack"],
        correctAnswer: "XSS",
        explanation: "Cross-Site Scripting (XSS) occurs when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q15.** Which HTTP status code should be returned when authentication credentials are missing or invalid?",
        options: ["400", "401", "403", "409"],
        correctAnswer: "401",
        explanation: "HTTP 401 Unauthorized indicates that the request lacks valid authentication credentials for the target resource."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q16.** A user is authenticated but does not have permission to access a resource.\n\nWhich HTTP status code is most appropriate?",
        options: ["200", "401", "403", "404"],
        correctAnswer: "403",
        explanation: "HTTP 403 Forbidden means the server understood the request and knows the user's identity, but refuses to authorize the user to access the requested resource."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Hard",
        questionText: "**Q17.** Which OAuth 2.0 flow is recommended for Single Page Applications (SPAs) today?",
        options: [
            "Implicit Flow",
            "Authorization Code Flow with PKCE",
            "Resource Owner Password Flow",
            "Client Credentials Flow"
        ],
        correctAnswer: "Authorization Code Flow with PKCE",
        explanation: "Proof Key for Code Exchange (PKCE) replaces the vulnerable Implicit Flow for SPAs. It provides a secure way to exchange an authorization code for an access token without requiring a static client secret."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q18.** Which OAuth component issues Access Tokens after successful authorization?",
        options: ["Resource Server", "Authorization Server", "Client", "Browser"],
        correctAnswer: "Authorization Server",
        explanation: "The Authorization Server is responsible for authenticating the user and issuing Access Tokens (and Refresh Tokens) to the Client after obtaining authorization."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q19.** What is the main purpose of OpenID Connect (OIDC)?",
        options: [
            "Database replication",
            "User authentication built on top of OAuth 2.0",
            "HTTP caching",
            "API versioning"
        ],
        correctAnswer: "User authentication built on top of OAuth 2.0",
        explanation: "While OAuth 2.0 is purely an authorization framework (granting access), OpenID Connect adds an identity layer on top of it, returning an ID Token to authenticate who the user actually is."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q20.** A JWT signature validation fails.\n\nWhat should the API do?",
        options: [
            "Ignore the signature and read the payload.",
            "Return 401 Unauthorized.",
            "Generate a new JWT automatically.",
            "Return 200 OK."
        ],
        correctAnswer: "Return 401 Unauthorized.",
        explanation: "If the signature validation fails, it means the token was modified by an unauthorized party or signed with the wrong key. The server must reject the request immediately with a 401."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q21.** Which algorithm is commonly used with JWT for symmetric signing?",
        options: ["RSA", "AES", "HS256", "SHA-1"],
        correctAnswer: "HS256",
        explanation: "HS256 (HMAC with SHA-256) is a symmetric algorithm, meaning it uses the same secret key to both sign the token and verify its signature."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q22.** Which algorithm commonly uses a public/private key pair for JWT signing?",
        options: ["HS256", "RS256", "MD5", "AES-256"],
        correctAnswer: "RS256",
        explanation: "RS256 (RSA Signature with SHA-256) is an asymmetric algorithm. The authorization server uses a private key to sign the JWT, and clients/resource servers use the public key to verify it."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q23.** Why should passwords never be stored directly in JWT payloads?",
        options: [
            "JWT payloads are encrypted by default.",
            "JWT payloads are Base64URL-encoded, not encrypted.",
            "JWTs cannot contain strings.",
            "Passwords are automatically hashed inside JWTs."
        ],
        correctAnswer: "JWT payloads are Base64URL-encoded, not encrypted.",
        explanation: "The payload in a standard JWT is just encoded, not encrypted. Anyone who intercepts the token can easily decode the payload and read its contents, including passwords or sensitive data."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q24.** Which HTTP header normally carries a Bearer Access Token?",
        options: ["Content-Type", "Authorization", "Cookie", "Accept"],
        correctAnswer: "Authorization",
        explanation: "The standard way to send an access token is in the Authorization header using the Bearer schema (e.g., `Authorization: Bearer <token>`)."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q25.** Which password hashing algorithm is recommended for modern Node.js authentication systems?",
        options: ["MD5", "SHA-1", "bcrypt", "Base64"],
        correctAnswer: "bcrypt",
        explanation: "bcrypt (or argon2) is an industry-standard, slow cryptographic hashing algorithm designed specifically to hash passwords securely and protect against brute-force attacks."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Hard",
        questionText: "**Q26.** A Refresh Token is suspected to be stolen.\n\nWhich strategy provides the strongest protection?",
        options: [
            "Never expire Refresh Tokens.",
            "Implement Refresh Token Rotation with server-side revocation.",
            "Increase JWT expiration time.",
            "Store Refresh Tokens in Local Storage."
        ],
        correctAnswer: "Implement Refresh Token Rotation with server-side revocation.",
        explanation: "Refresh Token Rotation issues a new refresh token with every access token request. If a stolen token is reused, the server detects the breach, revokes the token family, and forces re-authentication."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q27.** Which SameSite cookie attribute provides the strongest protection against CSRF (while also restricting cross-site usage)?",
        options: ["None", "Lax", "Strict", "Disabled"],
        correctAnswer: "Strict",
        explanation: "SameSite=Strict ensures that the cookie is only sent in a first-party context, preventing the browser from sending it during any cross-site requests, which effectively stops CSRF."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Easy",
        questionText: "**Q28.** Which REST API versioning strategy is most commonly recommended for public APIs?",
        options: [
            "Database versioning",
            "URL versioning (e.g., /api/v1/users)",
            "JavaScript versioning",
            "DNS versioning"
        ],
        correctAnswer: "URL versioning (e.g., /api/v1/users)",
        explanation: "URL versioning is highly visible, easy to document, and cache-friendly, making it the most pragmatic and common approach for publicly consumed REST APIs."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Medium",
        questionText: "**Q29.** Which HTTP caching header allows clients to make conditional requests and avoid downloading unchanged resources?",
        options: ["Content-Length", "ETag", "Authorization", "Host"],
        correctAnswer: "ETag",
        explanation: "The ETag (Entity Tag) is an identifier for a specific version of a resource. Clients can send a conditional request (`If-None-Match: <ETag>`) to check if the data has changed, saving bandwidth."
    },
    {
        category: "Backend Development", topic: "REST, JWT & Authentication", difficulty: "Hard",
        questionText: "**Q30.** A production application experiences multiple simultaneous requests after an Access Token expires, causing every request to trigger its own Refresh Token call.\n\nWhich architecture is generally considered the best solution?",
        options: [
            "Disable Refresh Tokens.",
            "Queue pending requests while a single refresh operation is in progress, then retry them using the new Access Token.",
            "Refresh the token before every API request.",
            "Extend Access Tokens to never expire."
        ],
        correctAnswer: "Queue pending requests while a single refresh operation is in progress, then retry them using the new Access Token.",
        explanation: "Implementing an interceptor that pauses (queues) outgoing requests while the first refresh call is being made prevents race conditions and redundant token calls, resuming them once the new token arrives."
    }
];

const seedSecurityQuestions = async () => {
    try {
        console.log("🧹 Clearing old API & Security records...");
        await Question.deleteMany({ topic: "REST, JWT & Authentication" }); 
        
        console.log(`🚀 Injecting ${securityQuestions.length} Formatted Questions...`);
        await Question.insertMany(securityQuestions);
        
        console.log(`✅ SUCCESS! All 30 API & Security Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedSecurityQuestions();