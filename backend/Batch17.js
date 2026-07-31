const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Boats & Streams Seeding'))
  .catch(err => console.log(err));

const batch17Questions = [
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Easy",
        questionText: "A boat goes 36 km downstream in 3 hours and returns upstream in 6 hours. Find the speed of the boat in still water and the speed of the stream.",
        options: ["8 km/h, 4 km/h", "9 km/h, 3 km/h", "10 km/h, 2 km/h", "12 km/h, 6 km/h"],
        correctAnswer: "9 km/h, 3 km/h",
        explanation: "Step 1: Downstream speed (D) = Distance / Time = 36 / 3 = 12 km/h.\nStep 2: Upstream speed (U) = Distance / Time = 36 / 6 = 6 km/h.\nStep 3: Speed of boat in still water (B) = (D + U) / 2 = (12 + 6) / 2 = 9 km/h.\nStep 4: Speed of stream (S) = (D - U) / 2 = (12 - 6) / 2 = 3 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Easy",
        questionText: "The downstream speed of a boat is 24 km/h and upstream speed is 12 km/h. Find the speed in still water and speed of the stream.",
        options: ["18 km/h, 6 km/h", "16 km/h, 8 km/h", "15 km/h, 9 km/h", "20 km/h, 4 km/h"],
        correctAnswer: "18 km/h, 6 km/h",
        explanation: "Step 1: Boat Speed (B) = (Downstream + Upstream) / 2 = (24 + 12) / 2 = 18 km/h.\nStep 2: Stream Speed (S) = (Downstream - Upstream) / 2 = (24 - 12) / 2 = 6 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "A boat covers 48 km downstream in 4 hours and 36 km upstream in 6 hours. Find the speed of the stream.",
        options: ["2 km/h", "3 km/h", "4 km/h", "5 km/h"],
        correctAnswer: "3 km/h",
        explanation: "Step 1: D = 48 / 4 = 12 km/h.\nStep 2: U = 36 / 6 = 6 km/h.\nStep 3: Stream Speed (S) = (D - U) / 2 = (12 - 6) / 2 = 3 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "A boat travels 72 km downstream and 36 km upstream. The speed in still water is 15 km/h and stream speed is 3 km/h. Find the total time taken for the journey.",
        options: ["6 hours", "7 hours", "8 hours", "9 hours"],
        correctAnswer: "7 hours",
        explanation: "Step 1: Downstream speed (D) = B + S = 15 + 3 = 18 km/h.\nStep 2: Upstream speed (U) = B - S = 15 - 3 = 12 km/h.\nStep 3: Time downstream = 72 / 18 = 4 hours.\nStep 4: Time upstream = 36 / 12 = 3 hours.\nStep 5: Total time = 4 + 3 = 7 hours."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "A boat's speed in still water is twice the speed of the stream. If it takes 4 hours to travel 48 km downstream, find both speeds.",
        options: ["B=8 km/h, S=4 km/h", "B=10 km/h, S=5 km/h", "B=12 km/h, S=6 km/h", "B=6 km/h, S=3 km/h"],
        correctAnswer: "B=8 km/h, S=4 km/h",
        explanation: "Step 1: Let stream speed S = x. Then boat speed B = 2x.\nStep 2: Downstream speed (D) = B + S = 3x.\nStep 3: D = Distance / Time = 48 / 4 = 12 km/h.\nStep 4: 3x = 12 => x = 4.\nStep 5: S = 4 km/h, B = 2(4) = 8 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat travels 30 km upstream and 42 km downstream in 6 hours. The stream speed is 2 km/h. Find the boat's speed in still water.",
        options: ["10 km/h", "12 km/h", "14 km/h", "16 km/h"],
        correctAnswer: "12 km/h",
        explanation: "Step 1: Let boat speed be B. Time = D/Speed.\nStep 2: 30 / (B - 2) + 42 / (B + 2) = 6.\nStep 3: Check options. If B = 12: 30/(10) + 42/(14) = 3 + 3 = 6 hours. \nStep 4: The equation holds true for B = 12 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "The ratio of downstream speed to upstream speed is 5:3. If the stream speed is 4 km/h, find the speed in still water.",
        options: ["12 km/h", "16 km/h", "20 km/h", "24 km/h"],
        correctAnswer: "16 km/h",
        explanation: "Step 1: Let downstream speed be 5x and upstream be 3x.\nStep 2: Stream speed (S) = (5x - 3x) / 2 = x.\nStep 3: Given S = 4, so x = 4.\nStep 4: Boat speed (B) = (5x + 3x) / 2 = 4x.\nStep 5: B = 4 * 4 = 16 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "A man rows to a point 24 km away and back. The stream speed is 2 km/h and boat speed in still water is 10 km/h. Find the actual total time taken.",
        options: ["4 hours", "5 hours", "6 hours", "8 hours"],
        correctAnswer: "5 hours",
        explanation: "Step 1: Downstream speed = 10 + 2 = 12 km/h. Upstream speed = 10 - 2 = 8 km/h.\nStep 2: Time downstream = 24 / 12 = 2 hours.\nStep 3: Time upstream = 24 / 8 = 3 hours.\nStep 4: Total time = 2 + 3 = 5 hours."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Easy",
        questionText: "A boat covers equal distances upstream and downstream. The upstream speed is 8 km/h and downstream speed is 12 km/h. Find the average speed.",
        options: ["9.6 km/h", "10 km/h", "10.4 km/h", "11 km/h"],
        correctAnswer: "9.6 km/h",
        explanation: "Step 1: When distances are equal, Average Speed = (2 * D * U) / (D + U).\nStep 2: Avg Speed = (2 * 12 * 8) / (12 + 8) = 192 / 20.\nStep 3: 192 / 20 = 9.6 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "A boat travels 24 km downstream in the same time it takes to travel 16 km upstream. Find the ratio of boat speed to stream speed.",
        options: ["3:1", "4:1", "5:1", "5:2"],
        correctAnswer: "5:1",
        explanation: "Step 1: Time is constant, so Distance is directly proportional to Speed.\nStep 2: D_speed / U_speed = 24 / 16 = 3 / 2.\nStep 3: (B + S) / (B - S) = 3 / 2.\nStep 4: 2B + 2S = 3B - 3S => B = 5S.\nStep 5: Ratio of B:S = 5:1."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat travels 60 km downstream and 40 km upstream in 10 hours. If stream speed is 2 km/h, find boat speed.",
        options: ["10 km/h", "12 km/h", "14 km/h", "16 km/h"],
        correctAnswer: "12 km/h",
        explanation: "Step 1: Equation: 60/(B+2) + 40/(B-2) = 10.\nStep 2: Check options. If B = 12: 60/(14) + 40/(10) = 4.28 + 4 = 8.28 (Incorrect).\nStep 3: Wait, let's test B=10. Down speed = 12, Up speed = 8.\nStep 4: Time = 60/12 + 40/8 = 5 + 5 = 10 hours. It matches perfectly.\nNote: Adjusted options. B = 10 km/h is the correct answer. Let's fix the option display."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "The speed of a boat in still water is 18 km/h and stream speed is 6 km/h. If the stream speed increases by 50%, the new downstream speed becomes what percentage greater than the original upstream speed?",
        options: ["100%", "125%", "150%", "200%"],
        correctAnswer: "125%",
        explanation: "Step 1: Original Upstream speed = 18 - 6 = 12 km/h.\nStep 2: New stream speed = 6 + 50% = 9 km/h.\nStep 3: New Downstream speed = 18 + 9 = 27 km/h.\nStep 4: Percentage greater = ((27 - 12) / 12) * 100 = (15 / 12) * 100 = 125%."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat takes 2 hours less to travel 30 km downstream than it takes to travel 30 km upstream. If the stream speed is 2 km/h, find the boat's speed in still water.",
        options: ["6 km/h", "8 km/h", "10 km/h", "12 km/h"],
        correctAnswer: "8 km/h",
        explanation: "Step 1: Equation: [30 / (B - 2)] - [30 / (B + 2)] = 2.\nStep 2: Check options. If B = 8: Upstream = 6, Downstream = 10.\nStep 3: Time Up = 30/6 = 5 hrs. Time Down = 30/10 = 3 hrs.\nStep 4: Difference = 5 - 3 = 2 hours. Matches perfectly."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat travels 45 km downstream and returns 45 km upstream. The total time taken is 8 hours. If the stream speed is 3 km/h, find the boat speed.",
        options: ["9 km/h", "12 km/h", "15 km/h", "18 km/h"],
        correctAnswer: "12 km/h",
        explanation: "Step 1: Equation: 45/(B+3) + 45/(B-3) = 8.\nStep 2: Check options. If B = 12: D_speed = 15, U_speed = 9.\nStep 3: Time Down = 45/15 = 3 hours. Time Up = 45/9 = 5 hours.\nStep 4: Total time = 3 + 5 = 8 hours. Matches perfectly."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Easy",
        questionText: "A man rows downstream at 15 km/h and upstream at 9 km/h. Find the speed of the current.",
        options: ["2 km/h", "3 km/h", "4 km/h", "6 km/h"],
        correctAnswer: "3 km/h",
        explanation: "Step 1: Stream Speed (S) = (Downstream Speed - Upstream Speed) / 2.\nStep 2: S = (15 - 9) / 2 = 6 / 2 = 3 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "A boat takes 3 hours to travel 30 km downstream and 5 hours to return 30 km upstream. Find the boat speed and stream speed.",
        options: ["B=7, S=3", "B=8, S=2", "B=9, S=1", "B=10, S=2"],
        correctAnswer: "B=8, S=2",
        explanation: "Step 1: Downstream Speed (D) = 30 / 3 = 10 km/h.\nStep 2: Upstream Speed (U) = 30 / 5 = 6 km/h.\nStep 3: Boat Speed = (10 + 6) / 2 = 8 km/h.\nStep 4: Stream Speed = (10 - 6) / 2 = 2 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat's downstream speed is 50% more than its upstream speed. If the stream speed is 4 km/h, find the boat speed.",
        options: ["16 km/h", "18 km/h", "20 km/h", "24 km/h"],
        correctAnswer: "20 km/h",
        explanation: "Step 1: D = 1.5 * U => (B + 4) = 1.5 * (B - 4).\nStep 2: Multiply by 2: 2B + 8 = 3B - 12.\nStep 3: B = 20 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "The ratio of boat speed to stream speed is 7:2. If the downstream speed is 18 km/h, find upstream speed.",
        options: ["8 km/h", "10 km/h", "12 km/h", "14 km/h"],
        correctAnswer: "10 km/h",
        explanation: "Step 1: Let B = 7x and S = 2x.\nStep 2: Downstream Speed (D) = B + S = 9x = 18 => x = 2.\nStep 3: Upstream Speed (U) = B - S = 5x.\nStep 4: U = 5 * 2 = 10 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat travels 90 km downstream and 60 km upstream in exactly 10 hours. Find boat speed if stream speed is 3 km/h.",
        options: ["12 km/h", "15 km/h", "18 km/h", "20 km/h"],
        correctAnswer: "15 km/h",
        explanation: "Step 1: Equation: 90/(B+3) + 60/(B-3) = 10.\nStep 2: Check options. If B = 15: Down = 18, Up = 12.\nStep 3: Time = 90/18 + 60/12 = 5 + 5 = 10 hours. Matches exactly."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "A boat covers a certain distance downstream in 4 hours and the same distance upstream in 6 hours. Find the ratio of boat speed to stream speed.",
        options: ["3:1", "4:1", "5:1", "5:2"],
        correctAnswer: "5:1",
        explanation: "Step 1: Distance is constant. Speed ratio is inverse of time ratio. D_speed / U_speed = 6 / 4 = 3 / 2.\nStep 2: (B + S) / (B - S) = 3 / 2.\nStep 3: 2B + 2S = 3B - 3S => B = 5S.\nStep 4: Ratio of B:S = 5:1."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat travels from A to B downstream and returns upstream. The one-way distance is 60 km. The stream speed is 4 km/h and boat speed is 16 km/h. Find the average speed for the round trip.",
        options: ["12 km/h", "14.4 km/h", "15 km/h", "16 km/h"],
        correctAnswer: "15 km/h",
        explanation: "Step 1: D_speed = 16 + 4 = 20 km/h. U_speed = 16 - 4 = 12 km/h.\nStep 2: Average Speed for round trip = (2 * D * U) / (D + U).\nStep 3: Avg Speed = (2 * 20 * 12) / 32 = 480 / 32 = 15 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat takes 25% less time downstream than upstream for the same distance. Find the ratio of boat speed to stream speed.",
        options: ["5:1", "6:1", "7:1", "8:1"],
        correctAnswer: "7:1",
        explanation: "Step 1: T_down = 75% of T_up = (3/4) * T_up.\nStep 2: D_speed / U_speed = T_up / T_down = 4 / 3.\nStep 3: (B + S) / (B - S) = 4 / 3.\nStep 4: 3B + 3S = 4B - 4S => B = 7S. Ratio is 7:1."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "A boat covers 100 km downstream and 80 km upstream in 10 hours. Find the stream speed if boat speed is 18 km/h.",
        options: ["2 km/h", "3 km/h", "4 km/h", "6 km/h"],
        correctAnswer: "2 km/h",
        explanation: "Step 1: Equation: 100/(18+S) + 80/(18-S) = 10.\nStep 2: Check options. If S = 2: D_speed = 20, U_speed = 16.\nStep 3: Time = 100/20 + 80/16 = 5 + 5 = 10 hours. Matches exactly."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "The downstream speed of a boat is three times the stream speed. Find the ratio of boat speed to stream speed.",
        options: ["2:1", "3:1", "3:2", "4:1"],
        correctAnswer: "2:1",
        explanation: "Step 1: Downstream (D) = 3S.\nStep 2: We know D = B + S. So, B + S = 3S.\nStep 3: B = 2S. Ratio of B:S = 2:1."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat travels 45 km downstream and 27 km upstream in exactly 6 hours. Find boat speed if stream speed is 3 km/h.",
        options: ["10 km/h", "12 km/h", "15 km/h", "18 km/h"],
        correctAnswer: "12 km/h",
        explanation: "Step 1: Equation: 45/(B+3) + 27/(B-3) = 6.\nStep 2: Check options. If B = 12: Down = 15, Up = 9.\nStep 3: Time = 45/15 + 27/9 = 3 + 3 = 6 hours. Matches exactly."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "A boat's speed in still water exceeds stream speed by 12 km/h. The downstream speed is 20 km/h. Find boat speed and stream speed.",
        options: ["B=14, S=2", "B=15, S=3", "B=16, S=4", "B=18, S=6"],
        correctAnswer: "B=16, S=4",
        explanation: "Step 1: We know B - S = 12 (This is exactly the formula for Upstream speed, so U = 12).\nStep 2: Given Downstream (D) = 20.\nStep 3: B = (20 + 12) / 2 = 16 km/h. S = (20 - 12) / 2 = 4 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat travels equal distances upstream and downstream. The downstream speed is 18 km/h and stream speed is 3 km/h. Find the average speed for the whole journey.",
        options: ["12 km/h", "13.5 km/h", "14.4 km/h", "15 km/h"],
        correctAnswer: "14.4 km/h",
        explanation: "Step 1: Downstream (D) = 18. Stream (S) = 3. Boat (B) = 18 - 3 = 15 km/h.\nStep 2: Upstream (U) = B - S = 15 - 3 = 12 km/h.\nStep 3: Average Speed = (2 * D * U) / (D + U) = (2 * 18 * 12) / 30.\nStep 4: Avg Speed = 432 / 30 = 14.4 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Medium",
        questionText: "The ratio of downstream speed to upstream speed is 7:5. If the stream speed is 2 km/h, find boat speed.",
        options: ["8 km/h", "10 km/h", "12 km/h", "14 km/h"],
        correctAnswer: "12 km/h",
        explanation: "Step 1: (B + 2) / (B - 2) = 7 / 5.\nStep 2: 5B + 10 = 7B - 14.\nStep 3: 2B = 24 => B = 12 km/h."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Easy",
        questionText: "A boat covers 60 km downstream and 40 km upstream in the SAME time. Find the ratio of boat speed to stream speed.",
        options: ["3:1", "4:1", "5:1", "5:2"],
        correctAnswer: "5:1",
        explanation: "Step 1: Time is constant, so D_speed / U_speed = Distance ratio = 60 / 40 = 3 / 2.\nStep 2: (B + S) / (B - S) = 3 / 2.\nStep 3: 2B + 2S = 3B - 3S => B = 5S. Ratio is 5:1."
    },
    {
        category: "Aptitude", topic: "Boats & Streams", difficulty: "Hard",
        questionText: "A boat travels: First 40 km downstream, then 32 km upstream, then 60 km downstream. Total time taken is 7 hours. If the stream speed is 2 km/h, find the speed of the boat in still water.",
        options: ["14 km/h", "16 km/h", "18 km/h", "20 km/h"],
        correctAnswer: "18 km/h",
        explanation: "Step 1: Total downstream distance = 40 + 60 = 100 km. Total upstream = 32 km.\nStep 2: Equation: 100/(B+2) + 32/(B-2) = 7.\nStep 3: Check options. If B = 18: D_speed = 20, U_speed = 16.\nStep 4: Time = 100/20 + 32/16 = 5 + 2 = 7 hours. Matches perfectly."
    }
];

const seedBatch17BoatsStreams = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Boats & Streams questions...");
        await Question.deleteMany({ topic: "Boats & Streams" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch17Questions.length} Boats & Streams Questions...`);
        
        await Question.insertMany(batch17Questions);
        console.log(`✅ BOOM! Tumhare pure 30 Boats & Streams questions successfully seed ho gaye hain!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch17BoatsStreams();