const mongoose = require('mongoose');
require('dotenv').config(); 
// Ensure this path matches your actual Model file
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Computer Network Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const cnQuestionsBatch1to30 = [
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q1.** What is the primary purpose of a computer network?",
        options: [
            "To increase CPU speed", 
            "To enable communication and resource sharing among devices", 
            "To increase RAM capacity", 
            "To reduce disk fragmentation"
        ], 
        correctAnswer: "To enable communication and resource sharing among devices",
        explanation: "The main goal of any computer network is to allow multiple devices to communicate with each other and share resources like data, printers, and internet access seamlessly."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q2.** Which of the following is NOT a network topology?",
        options: ["Star", "Ring", "Tree", "Stack"], 
        correctAnswer: "Stack",
        explanation: "Star, Ring, and Tree are valid network topologies that describe how nodes are physically or logically arranged. Stack is a data structure, not a network topology."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q3.** In a Star Topology, all devices are connected to:",
        options: [
            "Each other directly", 
            "A central hub or switch", 
            "A ring cable", 
            "Multiple routers only"
        ], 
        correctAnswer: "A central hub or switch",
        explanation: "In a Star Topology, every node connects to a central network device (like a Hub or a Switch). If a cable fails, only that specific node goes down."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q4.** Which network topology has no central device, and each node is connected to exactly two neighboring nodes?",
        options: ["Star", "Ring", "Bus", "Mesh"], 
        correctAnswer: "Ring",
        explanation: "In a Ring Topology, each computer is connected to exactly two other computers, forming a closed logical loop or 'ring'."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q5.** Which topology provides the highest fault tolerance because every node is connected to every other node?",
        options: ["Bus", "Ring", "Mesh", "Star"], 
        correctAnswer: "Mesh",
        explanation: "A Full Mesh Topology connects every single node to every other node in the network. This provides maximum redundancy and fault tolerance, as multiple paths exist between any two nodes."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q6.** Which type of network typically covers a small geographical area, such as an office or college campus building?",
        options: ["WAN", "MAN", "LAN", "PAN"], 
        correctAnswer: "LAN",
        explanation: "A LAN (Local Area Network) is restricted to a small geographic area, such as a single room, building, or office, usually utilizing Ethernet or Wi-Fi."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q7.** Which type of network generally spans multiple cities or countries?",
        options: ["LAN", "PAN", "WAN", "SAN"], 
        correctAnswer: "WAN",
        explanation: "A WAN (Wide Area Network) covers a large geographical area, such as a country, continent, or the entire globe (e.g., the Internet)."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q8.** Which networking device primarily operates at the Data Link Layer (Layer 2) of the OSI model?",
        options: ["Hub", "Switch", "Router", "Gateway"], 
        correctAnswer: "Switch",
        explanation: "A network Switch operates at Layer 2 (Data Link Layer). It uses MAC addresses to forward data frames intelligently only to the specific destination port."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q9.** Which networking device operates at the Network Layer (Layer 3) and forwards packets based on IP addresses?",
        options: ["Hub", "Switch", "Router", "Repeater"], 
        correctAnswer: "Router",
        explanation: "A Router operates at Layer 3 (Network Layer) of the OSI model. It reads the logical IP addresses to route packets between different subnets and networks."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q10.** Which device simply regenerates and amplifies network signals without understanding the data?",
        options: ["Router", "Switch", "Repeater", "Gateway"], 
        correctAnswer: "Repeater",
        explanation: "A Repeater operates at the Physical layer. Its sole purpose is to receive a weak signal, amplify/regenerate it, and transmit it further to overcome distance limitations."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q11.** A Hub operates at which layer of the OSI model?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"], 
        correctAnswer: "Physical Layer",
        explanation: "A Hub is considered a Layer 1 (Physical Layer) device. It is essentially a multi-port repeater that broadcasts signals to all connected ports without any filtering."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q12.** Which device can connect different types of networks and perform protocol conversion?",
        options: ["Hub", "Repeater", "Gateway", "Bridge"], 
        correctAnswer: "Gateway",
        explanation: "A Gateway is a network node that connects two networks operating with entirely different transmission protocols. It translates the data formats so the networks can communicate."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q13.** Which of the following best describes the OSI Model?",
        options: [
            "A routing protocol", 
            "A seven-layer reference model for network communication", 
            "A network cable standard", 
            "An IP addressing scheme"
        ], 
        correctAnswer: "A seven-layer reference model for network communication",
        explanation: "The Open Systems Interconnection (OSI) model is a conceptual framework created by ISO to standardize and describe the functions of a telecommunication or computing system into 7 distinct layers."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q14.** How many layers are present in the OSI Reference Model?",
        options: ["4", "5", "6", "7"], 
        correctAnswer: "7",
        explanation: "The OSI model consists of exactly 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q15.** Which OSI layer is responsible for routing packets between different networks?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Session Layer"], 
        correctAnswer: "Network Layer",
        explanation: "The Network Layer (Layer 3) handles the logical addressing (IP addresses) and routing of data packets across multiple networks to ensure they reach their final destination."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q16.** Which OSI layer is responsible for end-to-end process communication and provides services such as segmentation, flow control, and error recovery?",
        options: ["Network Layer", "Transport Layer", "Session Layer", "Data Link Layer"], 
        correctAnswer: "Transport Layer",
        explanation: "The Transport Layer (Layer 4) ensures reliable and orderly delivery of data between processes (using protocols like TCP and UDP) by handling segmentation, multiplexing, and error checking."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q17.** Which OSI layer is responsible for logical addressing (IP Addressing)?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Application Layer"], 
        correctAnswer: "Network Layer",
        explanation: "The Network Layer is responsible for assigning and utilizing logical addresses (such as IPv4 or IPv6) so that data can traverse across different interconnected networks."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q18.** Which OSI layer is responsible for framing and MAC addressing?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Session Layer"], 
        correctAnswer: "Data Link Layer",
        explanation: "The Data Link Layer (Layer 2) takes packets from the Network layer, packages them into frames, and uses physical (MAC) addresses to transfer them across a single local link."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q19.** Which OSI layer is responsible for encryption, compression, and data translation?",
        options: ["Session Layer", "Presentation Layer", "Transport Layer", "Application Layer"], 
        correctAnswer: "Presentation Layer",
        explanation: "The Presentation Layer (Layer 6) formats the data for the application layer. It acts as the network's data translator, handling syntax, encryption/decryption, and compression."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q20.** Which OSI layer is responsible for establishing, maintaining, and terminating communication sessions?",
        options: ["Session Layer", "Transport Layer", "Network Layer", "Physical Layer"], 
        correctAnswer: "Session Layer",
        explanation: "The Session Layer (Layer 5) establishes, manages, and gracefully terminates the dialogs (sessions) between two communicating applications."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q21.** Which OSI layer is closest to the end user?",
        options: ["Presentation Layer", "Application Layer", "Session Layer", "Transport Layer"], 
        correctAnswer: "Application Layer",
        explanation: "The Application Layer (Layer 7) is the topmost layer. It interfaces directly with user applications (like web browsers or email clients) providing network services."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q22.** The process of adding protocol-specific headers as data moves down the networking stack is called:",
        options: ["Fragmentation", "Decapsulation", "Encapsulation", "Multiplexing"], 
        correctAnswer: "Encapsulation",
        explanation: "Encapsulation is the process where each layer adds its own specific control information (headers/trailers) to the data as it travels down the OSI model from the Application to the Physical layer."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q23.** The process of removing protocol headers as data moves up the networking stack at the receiver is called:",
        options: ["Encapsulation", "Decapsulation", "Routing", "Switching"], 
        correctAnswer: "Decapsulation",
        explanation: "Decapsulation is the reverse of encapsulation. As the received data moves up the OSI layers, each layer reads and strips off its corresponding header before passing the payload to the layer above."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q24.** Which address is globally unique and assigned to a Network Interface Card (NIC) by the manufacturer?",
        options: ["IP Address", "Port Number", "MAC Address", "Socket Address"], 
        correctAnswer: "MAC Address",
        explanation: "A MAC (Media Access Control) address is a physical, 48-bit address burned into the NIC by the manufacturer, ensuring global uniqueness for every network device."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Easy",
        questionText: "**Q25.** Which address is logical and can change when a device moves to a different network?",
        options: ["MAC Address", "IP Address", "Physical Address", "Hardware Address"], 
        correctAnswer: "IP Address",
        explanation: "An IP (Internet Protocol) address is a logical address dynamically or statically assigned to a device. If you move your laptop from your home Wi-Fi to a cafe, your IP address changes."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q26.** Which device is primarily used to connect two LAN segments and operates at the Data Link Layer?",
        options: ["Router", "Bridge", "Gateway", "Repeater"], 
        correctAnswer: "Bridge",
        explanation: "A Bridge is a Layer 2 device used to connect two identical LAN segments. It inspects incoming traffic and decides whether to forward or discard the frames based on MAC addresses."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q27.** Compared with a Hub, a Switch primarily improves network performance because it:",
        options: [
            "Broadcasts every frame to all ports.", 
            "Creates a separate collision domain for each port.", 
            "Operates only at Layer 1.", 
            "Eliminates broadcast traffic completely."
        ], 
        correctAnswer: "Creates a separate collision domain for each port.",
        explanation: "Unlike a Hub which shares a single collision domain across all ports, a Switch creates a dedicated collision domain per port, drastically reducing packet collisions and increasing effective bandwidth."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q28.** How many collision domains are created by a Switch with 24 active ports (assuming one device per port)?",
        options: ["1", "2", "12", "24"], 
        correctAnswer: "24",
        explanation: "A Switch logically separates each port. Therefore, a 24-port switch creates exactly 24 individual collision domains, allowing all 24 devices to transmit simultaneously."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Hard",
        questionText: "**Q29.** A standard Layer-2 Switch without VLANs creates how many broadcast domains?",
        options: [
            "One broadcast domain", 
            "One broadcast domain per port", 
            "Two broadcast domains", 
            "Twenty-four broadcast domains"
        ], 
        correctAnswer: "One broadcast domain",
        explanation: "While switches break up collision domains, they by default forward broadcast frames (like ARP requests) out of every port. Thus, the entire standard switch forms a single broadcast domain."
    },
    {
        category: "Computer Network", topic: "Fundamental", difficulty: "Medium",
        questionText: "**Q30.** Which statement correctly compares the OSI Model and the TCP/IP Model?",
        options: [
            "Both models contain exactly seven layers.", 
            "TCP/IP has four (or five) layers, while OSI has seven layers.", 
            "OSI has four layers, while TCP/IP has seven layers.", 
            "Both models define the same layers with different names only."
        ], 
        correctAnswer: "TCP/IP has four (or five) layers, while OSI has seven layers.",
        explanation: "The OSI model is a theoretical 7-layer framework. The practical TCP/IP model condenses these into 4 layers (Network Access, Internet, Transport, and Application)."
    }
];

const seedCNQuestions = async () => {
    try {
        // Uncomment to wipe old CN Fundamental records
        // await Question.deleteMany({ category: "Computer Network", topic: "Fundamental" }); 
        
        console.log(`🚀 Injecting ${cnQuestionsBatch1to30.length} Formatted CN Questions...`);
        await Question.insertMany(cnQuestionsBatch1to30);
        
        console.log(`✅ SUCCESS! All 30 CN Fundamental Questions Seeded Successfully.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding CN data:", error);
        process.exit(1);
    }
};

seedCNQuestions();