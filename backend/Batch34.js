const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Direction Sense Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch35Questions = [
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Easy",
        questionText: "**Q1.** A person walks 12 m North, 5 m East, 12 m South, and 9 m East. How far and in which direction is he from the starting point?",
        options: ["14 m East", "14 m North", "5 m East", "9 m South"], correctAnswer: "14 m East",
        explanation: "North and South movements cancel each other out (12m N - 12m S = 0). Total East movement = 5m + 9m = 14m East."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Medium",
        questionText: "**Q2.** Rahul walks 20 m East, then turns right and walks 15 m, then turns left and walks 10 m. Find the shortest distance from the starting point.",
        options: ["25 m", "30 m", "15√5 m", "20√5 m"], correctAnswer: "15√5 m",
        explanation: "Total East = 20 + 10 = 30m. Total South (right turn from East) = 15m. Shortest distance = √(30² + 15²) = √(900 + 225) = √1125 = 15√5 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Easy",
        questionText: "**Q3.** A man walks 15 km South, then 20 km East, then 15 km North. How far is he from the starting point?",
        options: ["15 km", "20 km", "35 km", "50 km"], correctAnswer: "20 km",
        explanation: "South 15 km and North 15 km cancel out. Only 20 km East remains."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Easy",
        questionText: "**Q4.** A person moves 10 m North, 24 m East, 10 m South. Find displacement.",
        options: ["10 m", "24 m", "26 m", "34 m"], correctAnswer: "24 m",
        explanation: "North 10m and South 10m cancel out. Displacement is exactly 24 m East."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Medium",
        questionText: "**Q5.** A person starts facing North. He turns 135° clockwise, then 90° anticlockwise. Which direction is he facing now?",
        options: ["North-East", "North-West", "South-East", "South-West"], correctAnswer: "North-East",
        explanation: "Net rotation = 135° CW - 90° ACW = 45° CW. 45° clockwise from North is North-East."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Easy",
        questionText: "**Q6.** A person walks 8 m West, then 15 m North, then 8 m East. Find distance from start.",
        options: ["8 m", "15 m", "17 m", "23 m"], correctAnswer: "15 m",
        explanation: "West 8m and East 8m cancel out. Net distance is 15 m North."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Medium",
        questionText: "**Q7.** Ravi walks 30 m East, 40 m North, 30 m West, and 10 m South. Find shortest distance from starting point.",
        options: ["20 m", "30 m", "40 m", "50 m"], correctAnswer: "30 m",
        explanation: "East and West cancel out (30m - 30m = 0). Net North = 40m - 10m(South) = 30 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Medium",
        questionText: "**Q8.** A person walks 14 m South, 48 m East. Find displacement.",
        options: ["50 m", "52 m", "60 m", "62 m"], correctAnswer: "50 m",
        explanation: "Pythagorean triplet. Displacement = √(14² + 48²) = √(196 + 2304) = √2500 = 50 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Easy",
        questionText: "**Q9.** A person walks 25 m North, 60 m East, 25 m South. Find shortest distance.",
        options: ["25 m", "35 m", "60 m", "85 m"], correctAnswer: "60 m",
        explanation: "North 25m and South 25m cancel. Net distance = 60 m East."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Easy",
        questionText: "**Q10.** Starting from North, a person turns right, right, left, right. Which direction is he facing?",
        options: ["North", "South", "East", "West"], correctAnswer: "South",
        explanation: "One Right and One Left cancel each other. Net movement is Right + Right = 180° turn. Opposite of North is South."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Medium",
        questionText: "**Q11.** A walks 10 m East, B walks 10 m West from the same point. What is the distance between them?",
        options: ["0 m", "10 m", "20 m", "Cannot be determined"], correctAnswer: "20 m",
        explanation: "They move in exactly opposite directions. Total distance = 10 + 10 = 20 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Medium",
        questionText: "**Q12.** A person walks 18 m North, 24 m East. Find shortest distance from starting point.",
        options: ["28 m", "30 m", "32 m", "42 m"], correctAnswer: "30 m",
        explanation: "Displacement = √(18² + 24²) = √(324 + 576) = √900 = 30 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Medium",
        questionText: "**Q13.** A man walks 6 km South, then 8 km East. Find displacement.",
        options: ["10 km", "12 km", "14 km", "100 km"], correctAnswer: "10 km",
        explanation: "Pythagorean triplet (6, 8, 10). Displacement = √(6² + 8²) = √(36 + 64) = √100 = 10 km."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Medium",
        questionText: "**Q14.** Facing West, a person turns left, then right, then right. Which direction is he facing?",
        options: ["North", "South", "East", "West"], correctAnswer: "North",
        explanation: "Left and Right cancel. Net turn is 1 Right turn from West. 90° clockwise from West is North."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Medium",
        questionText: "**Q15.** A person moves: 20 m North, 15 m West, 20 m South, 10 m East. Find final position from start.",
        options: ["5 m East", "5 m West", "10 m West", "15 m West"], correctAnswer: "5 m West",
        explanation: "Net North/South = 20N - 20S = 0. Net West/East = 15W - 10E = 5 m West."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q16.** P is 10 m North of Q. Q is 8 m East of R. Find direction of P from R.",
        options: ["North-East", "North-West", "South-East", "South-West"], correctAnswer: "North-East",
        explanation: "From R, go 8m East to reach Q. From Q, go 10m North to reach P. Net movement from R is East and North -> North-East."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q17.** A is 12 m South of B. B is 5 m West of C. Find shortest distance between A and C.",
        options: ["13 m", "15 m", "17 m", "19 m"], correctAnswer: "13 m",
        explanation: "Triangle formed by A, B, and C with right angle at B. Distance = √(12² + 5²) = √(144 + 25) = √169 = 13 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q18.** M is North of N. N is East of O. O is South of P. Find direction of M from P.",
        options: ["North-East", "South-East", "North-West", "Cannot be determined"], correctAnswer: "Cannot be determined",
        explanation: "M is East of P line (since N is East of O). But we do not know the exact distances, so M could be North of P, South of P, or exactly East of P. Hence, cannot be determined."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q19.** R is 15 m West of S. T is 20 m South of R. Find shortest distance between T and S.",
        options: ["20 m", "25 m", "30 m", "35 m"], correctAnswer: "25 m",
        explanation: "R, S, T form a right triangle. TS = √(15² + 20²) = √(225 + 400) = √625 = 25 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q20.** A is 8 m East of B. B is 6 m North of C. Find shortest distance between A and C.",
        options: ["10 m", "12 m", "14 m", "100 m"], correctAnswer: "10 m",
        explanation: "Right triangle AC. Distance = √(8² + 6²) = √(64 + 36) = √100 = 10 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q21 (Ultra Tough).** A person starts from O. Moves: 10m North, 10m East, 10m South, 10m West, 15m North. Find final distance from O.",
        options: ["0 m", "10 m", "15 m", "25 m"], correctAnswer: "15 m",
        explanation: "First 4 moves (10N, 10E, 10S, 10W) form a closed square, bringing him back exactly to O. Final move is 15m North. Distance is 15 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q22 (Ultra Tough).** A man walks: 25m East, 20m South, 25m West, 15m South. Find shortest distance.",
        options: ["5 m", "30 m", "35 m", "40 m"], correctAnswer: "35 m",
        explanation: "East 25m and West 25m cancel. Net movement is 20m South + 15m South = 35 m South."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q23.** A person walks: 7 m North, 24 m East, 7 m South. Find displacement.",
        options: ["17 m", "24 m", "25 m", "31 m"], correctAnswer: "24 m",
        explanation: "North 7m and South 7m cancel. Displacement is purely 24 m East."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q24.** Facing North, a person rotates: 90° clockwise, 180° anticlockwise, 270° clockwise. Final direction?",
        options: ["North", "South", "East", "West"], correctAnswer: "South",
        explanation: "Net rotation = +90 - 180 + 270 = +180° clockwise. 180° from North is South."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q25.** A person walks: 16 m West, 12 m South. Find shortest distance.",
        options: ["18 m", "20 m", "24 m", "28 m"], correctAnswer: "20 m",
        explanation: "√(16² + 12²) = √(256 + 144) = √400 = 20 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q26.** A is North of B. B is West of C. C is South of D. Find direction of A from D.",
        options: ["South-West", "North-West", "South-East", "Cannot be determined"], correctAnswer: "Cannot be determined",
        explanation: "We know A is West of D's vertical line. But since the exact vertical distances (A to B, and C to D) are not given, A could be North, South, or exactly West of D."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q27.** A person walks: 30 m North, 40 m East, 30 m South, 20 m West. Find shortest distance.",
        options: ["10 m", "20 m", "30 m", "40 m"], correctAnswer: "20 m",
        explanation: "Net North/South = 0. Net East = 40E - 20W = 20 m East."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q28.** A man moves: 12 m East, 5 m North, 12 m West, 9 m South. Find displacement.",
        options: ["4 m", "5 m", "12 m", "14 m"], correctAnswer: "4 m",
        explanation: "East/West cancels (12 - 12 = 0). Net North/South = 5N - 9S = 4 m South. Displacement is 4 m."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q29.** Facing South, a person turns: Left, Left, Right, Right, Left. Final direction?",
        options: ["North", "South", "East", "West"], correctAnswer: "East",
        explanation: "Two Lefts cancel Two Rights. Remaining turn is 1 Left. Turning left from South points you East."
    },
    {
        category: "Logical Reasoning", topic: "Direction Sense", difficulty: "Hard",
        questionText: "**Q30 (Deloitte Pattern).** A person starts from O. Moves: 20m N, 15m E, 10m S, 25m W, 30m N, 10m E. Find final direction and shortest distance from O.",
        options: ["40m North", "40m North-East", "30m North", "50m North-West"], correctAnswer: "40m North",
        explanation: "Net North = 20N - 10S + 30N = 40m North. Net East = 15E - 25W + 10E = 25E - 25W = 0m. Final position is exactly 40m North."
    }
];

const seedBatch35DirectionSense = async () => {
    try {
        console.log("🧹 Clearing old Direction Sense records...");
        await Question.deleteMany({ topic: "Direction Sense" }); 
        
        console.log(`🚀 Injecting ${batch35Questions.length} Formatted Questions...`);
        await Question.insertMany(batch35Questions);
        
        console.log(`✅ SUCCESS! All 30 Direction Sense Questions Seeded in 'Logical Reasoning' Category.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch35DirectionSense();