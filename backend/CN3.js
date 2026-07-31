const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Computer Network Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const cnQuestionsBatch61to90 = [
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q61.** Which transport layer protocol provides reliable, connection-oriented communication?",
        options: ["UDP", "TCP", "ICMP", "ARP"], 
        correctAnswer: "TCP",
        explanation: "Transmission Control Protocol (TCP) is a reliable, connection-oriented protocol that ensures data is delivered accurately and in the correct order using handshakes and acknowledgments."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q62.** Which transport layer protocol is generally preferred for real-time applications such as live video streaming and online gaming?",
        options: ["TCP", "UDP", "FTP", "SMTP"], 
        correctAnswer: "UDP",
        explanation: "User Datagram Protocol (UDP) is connectionless and does not guarantee delivery, making it incredibly fast with low overhead. This makes it ideal for real-time applications where speed is more critical than occasional packet loss."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q63.** Which feature is provided by TCP but not by UDP?",
        options: [
            "Multiplexing using port numbers", 
            "Checksum", 
            "Connection establishment and reliable delivery", 
            "Process-to-process communication"
        ], 
        correctAnswer: "Connection establishment and reliable delivery",
        explanation: "Both TCP and UDP use ports for multiplexing and both have checksums for basic error detection. However, only TCP establishes a formal connection and guarantees the reliable, ordered delivery of packets."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q64.** Which TCP mechanism is used to establish a connection between a client and a server?",
        options: ["Two-Way Handshake", "Three-Way Handshake", "Four-Way Handshake", "Sliding Window"], 
        correctAnswer: "Three-Way Handshake",
        explanation: "TCP uses a Three-Way Handshake to safely establish a logical connection before any actual payload data is transmitted between the client and server."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q65.** Which sequence correctly represents the TCP Three-Way Handshake?",
        options: [
            "SYN → ACK → SYN", 
            "SYN → SYN-ACK → ACK", 
            "ACK → SYN → FIN", 
            "SYN → FIN → ACK"
        ], 
        correctAnswer: "SYN → SYN-ACK → ACK",
        explanation: "The client sends a SYN (Synchronize) packet, the server responds with a SYN-ACK (Synchronize-Acknowledge), and the client finalizes it with an ACK (Acknowledge) packet."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q66.** TCP connection termination normally uses:",
        options: ["Two-Way Handshake", "Three-Way Handshake", "Four-Way Handshake", "Five-Way Handshake"], 
        correctAnswer: "Four-Way Handshake",
        explanation: "To gracefully close a full-duplex connection, TCP typically uses a four-step process (Four-Way Handshake) involving FIN and ACK packets from both directions."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q67.** Which TCP flag is primarily used to gracefully terminate a connection?",
        options: ["SYN", "ACK", "FIN", "RST"], 
        correctAnswer: "FIN",
        explanation: "The FIN (Finish) flag indicates that the sender has no more data to transmit, initiating a graceful termination of the connection."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q68.** Which TCP mechanism prevents the sender from overwhelming the receiver with too much data?",
        options: ["Congestion Control", "Flow Control", "Routing", "Fragmentation"], 
        correctAnswer: "Flow Control",
        explanation: "Flow Control (managed via the Sliding Window protocol) is a mechanism that matches the sender's transmission rate to the receiver's reading speed and buffer capacity."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q69.** Which TCP mechanism prevents excessive traffic from congesting the network itself?",
        options: ["Flow Control", "Congestion Control", "Error Detection", "Address Resolution"], 
        correctAnswer: "Congestion Control",
        explanation: "While Flow Control protects the specific receiver, Congestion Control (using algorithms like Slow Start) protects the entire intermediate network (routers/links) from being overloaded."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q70.** Which TCP algorithm gradually increases the transmission rate until packet loss occurs?",
        options: ["Stop-and-Wait", "Slow Start", "Go-Back-N", "Selective Repeat"], 
        correctAnswer: "Slow Start",
        explanation: "In Congestion Control, the 'Slow Start' algorithm begins by sending data at a low rate and exponentially increases the window size until it senses network congestion (packet loss)."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q71.** Which protocol is used to transfer web pages over the Internet?",
        options: ["FTP", "HTTP", "SMTP", "DNS"], 
        correctAnswer: "HTTP",
        explanation: "The Hypertext Transfer Protocol (HTTP) is the foundation of data communication for the World Wide Web, used specifically to fetch and render HTML pages and web assets."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q72.** What is the primary advantage of HTTPS over HTTP?",
        options: [
            "Faster routing", 
            "Lower bandwidth usage", 
            "Encrypted communication using SSL/TLS", 
            "No need for DNS"
        ], 
        correctAnswer: "Encrypted communication using SSL/TLS",
        explanation: "HTTPS (HTTP Secure) encrypts the data being transferred using Transport Layer Security (TLS/SSL), protecting sensitive information from eavesdropping and man-in-the-middle attacks."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q73.** Which protocol is primarily used to transfer files between computers?",
        options: ["SMTP", "FTP", "POP3", "SNMP"], 
        correctAnswer: "FTP",
        explanation: "The File Transfer Protocol (FTP) is a standard network protocol provided on TCP/IP networks specifically to download, upload, and manage files on a remote server."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q74.** Which protocol is primarily responsible for sending emails?",
        options: ["FTP", "SMTP", "POP3", "IMAP"], 
        correctAnswer: "SMTP",
        explanation: "The Simple Mail Transfer Protocol (SMTP) is the industry standard for pushing (sending) emails from a mail client to a mail server, or between mail servers."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q75.** Which protocol allows users to access and manage emails directly on the mail server, keeping messages synchronized across multiple devices?",
        options: ["POP3", "IMAP", "SMTP", "FTP"], 
        correctAnswer: "IMAP",
        explanation: "The Internet Message Access Protocol (IMAP) keeps emails stored on the server, allowing seamless synchronization across phones, laptops, and web clients. (POP3, conversely, typically downloads and deletes them from the server)."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q76.** Which protocol provides secure remote login by encrypting all communication between the client and the server?",
        options: ["Telnet", "FTP", "SSH", "HTTP"], 
        correctAnswer: "SSH",
        explanation: "Secure Shell (SSH) is a cryptographic network protocol used for secure data communication, remote command-line login, and remote command execution over an unsecured network."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q77.** What is the primary disadvantage of Telnet compared to SSH?",
        options: [
            "It does not support authentication.", 
            "It transmits data, including passwords, in plain text.", 
            "It cannot connect to remote systems.", 
            "It uses UDP instead of TCP."
        ], 
        correctAnswer: "It transmits data, including passwords, in plain text.",
        explanation: "Telnet does not use encryption. Everything you type—including admin usernames and passwords—is sent in plain text, making it highly vulnerable to packet sniffing."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q78.** What is the primary function of a Firewall?",
        options: [
            "Translate domain names into IP addresses.", 
            "Monitor and filter incoming and outgoing network traffic based on security rules.", 
            "Increase Internet speed.", 
            "Assign IP addresses automatically."
        ], 
        correctAnswer: "Monitor and filter incoming and outgoing network traffic based on security rules.",
        explanation: "A firewall acts as a security barrier between a trusted internal network and untrusted external networks, analyzing traffic against preconfigured rules to block malicious connections."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q79.** Which type of firewall examines the state of active connections before allowing packets?",
        options: [
            "Packet Filtering Firewall", 
            "Stateless Firewall", 
            "Stateful Inspection Firewall", 
            "Application Proxy"
        ], 
        correctAnswer: "Stateful Inspection Firewall",
        explanation: "A Stateful firewall tracks the operating state and characteristics of network connections. It only allows returning packets if it recognizes them as part of an actively established outgoing session."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q80.** A Proxy Server primarily acts as:",
        options: [
            "A replacement for DNS.", 
            "An intermediary between clients and external servers.", 
            "A routing protocol.", 
            "A transport layer protocol."
        ], 
        correctAnswer: "An intermediary between clients and external servers.",
        explanation: "A proxy server sits between a client application and the internet. The client connects to the proxy, which then makes the actual request to the external server on the client's behalf."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q81.** Which of the following is a common benefit of using a Proxy Server?",
        options: [
            "Hardware virtualization", 
            "Content filtering and caching", 
            "CPU overclocking", 
            "Memory management"
        ], 
        correctAnswer: "Content filtering and caching",
        explanation: "Proxies are heavily used in corporate environments to cache frequently accessed web pages (saving bandwidth) and to filter out dangerous or inappropriate content."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q82.** The primary purpose of a VPN (Virtual Private Network) is to:",
        options: [
            "Increase bandwidth.", 
            "Create a secure encrypted tunnel over a public network.", 
            "Replace TCP with UDP.", 
            "Assign MAC addresses."
        ], 
        correctAnswer: "Create a secure encrypted tunnel over a public network.",
        explanation: "A VPN establishes a secure, encrypted connection (tunnel) across the public Internet, ensuring that data transmitted remains private and secure from interception."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Hard",
        questionText: "**Q83.** Which statement correctly distinguishes Cookies and Sessions?",
        options: [
            "Cookies are always stored on the server.", 
            "Sessions are always stored in the browser.", 
            "Cookies are typically stored on the client, while session data is generally stored on the server.", 
            "There is no difference between them."
        ], 
        correctAnswer: "Cookies are typically stored on the client, while session data is generally stored on the server.",
        explanation: "A Cookie is a small piece of data stored locally in the user's web browser. A Session is a server-side storage mechanism that securely holds user data during their visit, often identified by a Session ID stored in a cookie."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q84.** Which of the following uniquely identifies a communication endpoint in TCP/IP networking?",
        options: ["MAC Address only", "IP Address only", "Socket (IP Address + Port Number)", "Domain Name"], 
        correctAnswer: "Socket (IP Address + Port Number)",
        explanation: "A network Socket combines an IP address (identifying the specific machine) and a Port number (identifying the specific application/process running on that machine)."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q85.** Which well-known port is used by HTTP?",
        options: ["21", "22", "80", "443"], 
        correctAnswer: "80",
        explanation: "Port 80 is the standard, globally recognized port used by web servers to listen for unencrypted HTTP traffic."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q86.** Which well-known port is used by HTTPS?",
        options: ["25", "53", "110", "443"], 
        correctAnswer: "443",
        explanation: "Port 443 is the standard port reserved for HTTP over TLS/SSL (HTTPS), ensuring secure web communication."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Easy",
        questionText: "**Q87.** Which well-known port is used by SSH?",
        options: ["20", "21", "22", "23"], 
        correctAnswer: "22",
        explanation: "Secure Shell (SSH) universally listens on Port 22 by default to accept secure, encrypted remote login connections."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q88.** Which DNS record type maps a domain name to an IPv4 address?",
        options: ["MX", "CNAME", "PTR", "A"], 
        correctAnswer: "A",
        explanation: "An 'A' (Address) record is the most fundamental DNS record, used to point a domain or subdomain directly to its corresponding IPv4 address. (An 'AAAA' record is used for IPv6)."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q89.** Which DNS record specifies the mail server responsible for receiving emails for a domain?",
        options: ["NS", "MX", "AAAA", "TXT"], 
        correctAnswer: "MX",
        explanation: "An MX (Mail Exchanger) record directs email to a mail server. It tells the global email delivery system where to route emails addressed to your domain."
    },
    {
        category: "Computer Network", topic: "Advanced", difficulty: "Medium",
        questionText: "**Q90.** A company wants to allow employees to securely access its internal network while working remotely over the Internet. Which technology is the most appropriate?",
        options: ["FTP", "VPN", "Telnet", "Hub"], 
        correctAnswer: "VPN",
        explanation: "A Virtual Private Network (VPN) creates an encrypted tunnel over the internet, allowing remote workers to safely access internal corporate resources as if they were physically plugged into the office network."
    }
];

const seedCNQuestions61to90 = async () => {
    try {
        // Uncomment below to wipe old Advanced CN questions if needed
        // await Question.deleteMany({ category: "Computer Network", topic: "Advanced" }); 
        
        console.log(`🚀 Injecting ${cnQuestionsBatch61to90.length} Advanced CN Questions...`);
        await Question.insertMany(cnQuestionsBatch61to90);
        
        console.log(`✅ SUCCESS! Questions 61 to 90 (Advanced CN) Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding CN data:", error);
        process.exit(1);
    }
};

seedCNQuestions61to90();