const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Computer Network Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const cnQuestionsBatch31to60 = [
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q31.** Which version of the Internet Protocol provides a 128-bit address space?",
        options: ["IPv2", "IPv4", "IPv5", "IPv6"], 
        correctAnswer: "IPv6",
        explanation: "IPv6 was developed to replace IPv4. While IPv4 uses a 32-bit address space (providing about 4.3 billion addresses), IPv6 uses a 128-bit address space, allowing for a virtually inexhaustible number of unique IP addresses."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q32.** An IPv4 address consists of:",
        options: ["16 bits", "32 bits", "64 bits", "128 bits"], 
        correctAnswer: "32 bits",
        explanation: "An IPv4 address is composed of 32 bits, typically represented in human-readable format as four 8-bit decimal numbers (octets) separated by periods (e.g., 192.168.1.1)."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q33.** Which of the following is a valid IPv4 address?",
        options: ["192.168.1.256", "172.16.0.1", "10.25.300.5", "256.10.10.10"], 
        correctAnswer: "172.16.0.1",
        explanation: "In an IPv4 address, each of the four octets must be a number between 0 and 255. The numbers 256 and 300 are outside this valid range."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q34.** Which IPv4 address range belongs to Class A?",
        options: [
            "1.0.0.0 – 126.255.255.255", 
            "128.0.0.0 – 191.255.255.255", 
            "192.0.0.0 – 223.255.255.255", 
            "224.0.0.0 – 239.255.255.255"
        ], 
        correctAnswer: "1.0.0.0 – 126.255.255.255",
        explanation: "Class A IP addresses range from 1 to 126 in their first octet. (Note: 0 is reserved, and 127 is reserved for loopback testing)."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q35.** Which of the following is a private IPv4 address range?",
        options: ["8.8.8.0/24", "172.16.0.0/12", "11.0.0.0/8", "100.0.0.0/8"], 
        correctAnswer: "172.16.0.0/12",
        explanation: "IANA explicitly reserved three blocks of the IP address space for private networks: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. These addresses are not routable on the public internet."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q36.** CIDR was introduced primarily to:",
        options: [
            "Increase CPU utilization.", 
            "Reduce the exhaustion of IPv4 addresses and improve routing efficiency.", 
            "Replace DNS.", 
            "Eliminate subnet masks."
        ], 
        correctAnswer: "Reduce the exhaustion of IPv4 addresses and improve routing efficiency.",
        explanation: "Classless Inter-Domain Routing (CIDR) replaced the rigid Class A/B/C system, allowing for flexible subnetting. This conserved IP addresses and summarized routing tables."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q37.** Which subnet mask corresponds to a /24 network?",
        options: ["255.255.0.0", "255.255.255.0", "255.255.255.128", "255.255.255.252"], 
        correctAnswer: "255.255.255.0",
        explanation: "A /24 means the first 24 bits of the subnet mask are 1s. This equals 8+8+8 bits, resulting in the decimal equivalent of 255.255.255.0."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q38.** A network has the prefix 192.168.10.0/26. How many usable host addresses are available?",
        options: ["30", "62", "126", "254"], 
        correctAnswer: "62",
        explanation: "A /26 network uses 26 bits for the network, leaving 6 bits for hosts (32 - 26 = 6). Total addresses = 2^6 = 64. Usable hosts = 64 - 2 (network and broadcast address) = 62."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q39.** Which protocol is used to map an IPv4 address to a MAC address within the same local network?",
        options: ["DHCP", "DNS", "ARP", "ICMP"], 
        correctAnswer: "ARP",
        explanation: "The Address Resolution Protocol (ARP) is used to find the physical MAC address associated with a known logical IP address on a local area network."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q40.** Which protocol was historically used to map a MAC address to an IPv4 address?",
        options: ["ARP", "ICMP", "RARP", "NAT"], 
        correctAnswer: "RARP",
        explanation: "Reverse Address Resolution Protocol (RARP) was historically used by diskless workstations to discover their own IP address from a RARP server using their known physical MAC address."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q41.** Which protocol is primarily used by the ping command?",
        options: ["TCP", "UDP", "ICMP", "ARP"], 
        correctAnswer: "ICMP",
        explanation: "The `ping` utility uses the Internet Control Message Protocol (ICMP) by sending 'Echo Request' packets to the target and waiting for 'Echo Reply' packets to test reachability."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q42.** Which protocol translates domain names into IP addresses?",
        options: ["DHCP", "DNS", "FTP", "SMTP"], 
        correctAnswer: "DNS",
        explanation: "The Domain Name System (DNS) acts as the phonebook of the internet, converting human-readable domain names (like www.google.com) into machine-readable IP addresses."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q43.** Which protocol automatically assigns IP addresses to devices on a network?",
        options: ["DNS", "DHCP", "ARP", "ICMP"], 
        correctAnswer: "DHCP",
        explanation: "The Dynamic Host Configuration Protocol (DHCP) automatically assigns IP addresses, subnet masks, default gateways, and other network parameters to client devices."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q44.** What is the primary purpose of NAT (Network Address Translation)?",
        options: [
            "Encrypt network traffic.", 
            "Convert domain names into IP addresses.", 
            "Allow multiple private devices to share one or more public IP addresses.", 
            "Detect transmission errors."
        ], 
        correctAnswer: "Allow multiple private devices to share one or more public IP addresses.",
        explanation: "NAT allows a single router to act as an agent between the Internet and a local private network, mapping multiple private IP addresses to a single public IP, which heavily conserves IPv4 addresses."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q45.** A host wants to communicate with another host located on a different network. To which device should it normally send the packet first?",
        options: ["DNS Server", "Default Gateway", "Switch", "Hub"], 
        correctAnswer: "Default Gateway",
        explanation: "If the destination IP is not on the same local subnet, a host will forward the packet to its Default Gateway (typically the local router interface), which will then route the packet toward its destination."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q46.** A network is assigned the address 192.168.1.0/27. How many usable host IP addresses are available?",
        options: ["14", "30", "62", "126"], 
        correctAnswer: "30",
        explanation: "A /27 subnet mask leaves 5 bits for hosts (32 - 27 = 5). The total number of addresses is 2^5 = 32. Subtracting 2 (network and broadcast) leaves 30 usable host IPs."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q47.** Which subnet mask corresponds to a /30 prefix?",
        options: ["255.255.255.0", "255.255.255.128", "255.255.255.252", "255.255.255.254"], 
        correctAnswer: "255.255.255.252",
        explanation: "A /30 prefix means 30 bits are turned on for the network. The last octet has 6 bits on (11111100), which equals 128 + 64 + 32 + 16 + 8 + 4 = 252."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q48.** A /30 subnet is commonly used for:",
        options: ["Large enterprise LANs", "Point-to-Point WAN links", "Wireless LANs", "Broadcast networks"], 
        correctAnswer: "Point-to-Point WAN links",
        explanation: "Because a /30 subnet provides exactly 2 usable host IP addresses, it is highly efficient and perfectly designed for connecting two routers directly together on a point-to-point link."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q49.** What is the primary purpose of a Routing Table?",
        options: [
            "Store MAC addresses of devices", 
            "Maintain mappings of domain names", 
            "Determine the best path for forwarding packets", 
            "Store TCP port numbers"
        ], 
        correctAnswer: "Determine the best path for forwarding packets",
        explanation: "A Routing Table is a database stored in a router or networked computer that lists the routes to particular network destinations, acting as a map to determine where packets should be forwarded."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q50.** Which routing method requires the network administrator to manually configure routes?",
        options: ["Dynamic Routing", "Static Routing", "Adaptive Routing", "Hybrid Routing"], 
        correctAnswer: "Static Routing",
        explanation: "Static Routing requires the manual configuration of routes by an administrator. It does not automatically adjust if the network topology changes or a link goes down."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Easy",
        questionText: "**Q51.** Which routing method automatically updates routes when the network topology changes?",
        options: ["Static Routing", "Manual Routing", "Dynamic Routing", "Fixed Routing"], 
        correctAnswer: "Dynamic Routing",
        explanation: "Dynamic Routing uses routing protocols (like OSPF or BGP) to automatically communicate with other routers, recalculate paths, and update the routing table if network changes occur."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q52.** Which routing protocol is a Distance Vector protocol?",
        options: ["OSPF", "IS-IS", "RIP", "BGP"], 
        correctAnswer: "RIP",
        explanation: "The Routing Information Protocol (RIP) is one of the oldest distance-vector routing protocols. It determines routes based strictly on the 'distance' (hop count) and 'vector' (direction/next-hop)."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q53.** Which routing protocol uses hop count as its routing metric?",
        options: ["OSPF", "RIP", "BGP", "EIGRP"], 
        correctAnswer: "RIP",
        explanation: "RIP uses hop count to determine the best path to a destination. A 'hop' is counted every time a packet crosses a router."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q54.** What is the maximum hop count allowed in RIP before a destination is considered unreachable?",
        options: ["8", "15", "16", "32"], 
        correctAnswer: "15",
        explanation: "To prevent routing loops, RIP implements a maximum hop limit of 15. A hop count of 16 signifies that the network destination is 'infinite' or unreachable."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q55.** Which routing protocol is a Link-State protocol?",
        options: ["RIP", "OSPF", "BGP", "RARP"], 
        correctAnswer: "OSPF",
        explanation: "Open Shortest Path First (OSPF) is a Link-State routing protocol. Unlike distance vector protocols, OSPF routers build a complete topological map of the entire network."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q56.** Which algorithm is used by OSPF to compute the shortest path?",
        options: [
            "Bellman-Ford Algorithm", 
            "Dijkstra's Shortest Path First Algorithm", 
            "Kruskal's Algorithm", 
            "Prim's Algorithm"
        ], 
        correctAnswer: "Dijkstra's Shortest Path First Algorithm",
        explanation: "OSPF routers run Dijkstra's algorithm against their link-state databases to calculate the most efficient, shortest path tree to all known destinations."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q57.** Which routing protocol is primarily used for routing between Autonomous Systems (AS) on the Internet?",
        options: ["RIP", "OSPF", "BGP", "ICMP"], 
        correctAnswer: "BGP",
        explanation: "The Border Gateway Protocol (BGP) is an Exterior Gateway Protocol (EGP) designed to exchange routing and reachability information between different Autonomous Systems on the global Internet."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q58.** Which statement correctly compares Distance Vector and Link-State routing protocols?",
        options: [
            "Distance Vector routers maintain a complete network topology map.", 
            "Link-State protocols exchange the complete routing table periodically.", 
            "Distance Vector protocols generally converge more slowly than Link-State protocols.", 
            "Both protocols use only hop count as the routing metric."
        ], 
        correctAnswer: "Distance Vector protocols generally converge more slowly than Link-State protocols.",
        explanation: "Link-State protocols (like OSPF) immediately flood state changes resulting in very fast convergence. Distance Vector protocols (like RIP) rely on periodic, timer-based table exchanges, making them much slower to adapt to changes."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Medium",
        questionText: "**Q59.** Which routing protocol generally provides faster convergence in large enterprise networks?",
        options: ["RIP", "OSPF", "RARP", "ARP"], 
        correctAnswer: "OSPF",
        explanation: "OSPF detects link failures almost instantly and floods updates to the area immediately, whereas RIP waits for 30-second timers, making OSPF vastly superior for large, fast-converging networks."
    },
    {
        category: "Computer Network", topic: "Intermediate", difficulty: "Hard",
        questionText: "**Q60.** A company with hundreds of routers requires fast convergence, scalability, and hierarchical routing. Which routing protocol is generally the best choice?",
        options: ["RIP", "Static Routing", "OSPF", "ICMP"], 
        correctAnswer: "OSPF",
        explanation: "OSPF supports hierarchical network design (using OSPF Areas to limit routing overhead), offers extremely fast convergence, and scales efficiently for large enterprise topologies."
    }
];

const seedCNQuestions31to60 = async () => {
    try {
        // Uncomment below to wipe old Intermediate CN questions
        // await Question.deleteMany({ category: "Computer Network", topic: "Intermediate" }); 
        
        console.log(`🚀 Injecting ${cnQuestionsBatch31to60.length} Intermediate CN Questions...`);
        await Question.insertMany(cnQuestionsBatch31to60);
        
        console.log(`✅ SUCCESS! Questions 31 to 60 (Intermediate CN) Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding CN data:", error);
        process.exit(1);
    }
};

seedCNQuestions31to60();