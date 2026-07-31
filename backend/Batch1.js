const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question'); // Apna model path verify kar lena

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Custom Time & Work Seeding'))
  .catch(err => console.log(err));

const myCustomQuestions = [
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "A can complete a work in 12 days and B in 18 days. They work together for 4 days, then A leaves. In how many more days will B finish the remaining work?",
        options: ["6 days", "8 days", "10 days", "12 days"],
        correctAnswer: "8 days",
        explanation: "Step 1: LCM of 12 and 18 is 36 (Total Work).\nStep 2: A's efficiency = 36/12 = 3. B's efficiency = 36/18 = 2.\nStep 3: Together they do (3+2)=5 units/day. In 4 days = 20 units.\nStep 4: Remaining work = 36 - 20 = 16 units.\nStep 5: B finishes 16 units at 2 units/day. Time = 16/2 = 8 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "A, B, and C can do a work in 10, 15, and 20 days respectively. They start together. After 2 days A leaves and after another 2 days B leaves. Find the total time taken.",
        options: ["9.5 days", "10.66 days", "11 days", "12.33 days"],
        correctAnswer: "10.66 days",
        explanation: "Step 1: LCM(10, 15, 20) = 60 units. A=6, B=4, C=3.\nStep 2: First 2 days (A+B+C) = 13*2 = 26 units. Remaining = 34.\nStep 3: Next 2 days (B+C) = 7*2 = 14 units. Remaining = 20.\nStep 4: C finishes 20 units at 3 units/day. Time = 20/3 = 6.66 days.\nStep 5: Total time = 2 + 2 + 6.66 = 10.66 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A is twice as efficient as B and B is thrice as efficient as C. If C alone finishes a work in 36 days, how many days will A and B together take?",
        options: ["4 days", "6 days", "8 days", "9 days"],
        correctAnswer: "4 days",
        explanation: "Step 1: Efficiencies: C=1. B = 3*1 = 3. A = 2*3 = 6.\nStep 2: Total work = C's eff * C's time = 1 * 36 = 36 units.\nStep 3: Combined eff of A and B = 6 + 3 = 9.\nStep 4: Time taken by A and B together = 36 / 9 = 4 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "12 men can complete a work in 20 days. After 8 days, 4 more men join. Find the remaining time.",
        options: ["8 days", "9 days", "10 days", "12 days"],
        correctAnswer: "9 days",
        explanation: "Step 1: Total work = 12 men * 20 days = 240 man-days.\nStep 2: Work done in 8 days = 12 * 8 = 96 man-days.\nStep 3: Remaining work = 240 - 96 = 144 man-days.\nStep 4: New workforce = 12 + 4 = 16 men.\nStep 5: Remaining time = 144 / 16 = 9 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "15 workers working 8 hours a day finish a project in 24 days. How many workers are needed to finish the same project in 16 days working 10 hours a day?",
        options: ["16 workers", "18 workers", "20 workers", "22 workers"],
        correctAnswer: "18 workers",
        explanation: "Step 1: Use formula M1 * D1 * H1 = M2 * D2 * H2.\nStep 2: 15 * 24 * 8 = M2 * 16 * 10.\nStep 3: 2880 = M2 * 160.\nStep 4: M2 = 2880 / 160 = 18 workers."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A can do a piece of work in 24 days, B in 30 days. They work on alternate days starting with A. In how many days is the work completed?",
        options: ["25.5 days", "26.6 days", "26.8 days", "27 days"],
        correctAnswer: "26.6 days",
        explanation: "Step 1: LCM(24, 30) = 120. A=5, B=4.\nStep 2: 2-day cycle = 9 units.\nStep 3: Max cycles in 120 is 13 (13*9=117 units in 26 days).\nStep 4: Remaining = 3 units. Day 27 is A's turn.\nStep 5: A takes 3/5 day (0.6). Total = 26.6 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "A can do a work in 16 days. B is 25% more efficient than A. Find the time taken by B.",
        options: ["12 days", "12.8 days", "13.5 days", "14 days"],
        correctAnswer: "12.8 days",
        explanation: "Step 1: Efficiency ratio A:B = 100:125 = 4:5.\nStep 2: Time ratio is inversely proportional, A:B = 5:4.\nStep 3: 5 parts = 16 days. So, 1 part = 3.2 days.\nStep 4: B takes 4 parts = 4 * 3.2 = 12.8 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A and B together can do a work in 8 days. B and C together in 12 days. A and C together in 16 days. Find the time taken by A, B and C together.",
        options: ["6 days", "7.38 days", "8.5 days", "9 days"],
        correctAnswer: "7.38 days",
        explanation: "Step 1: LCM(8, 12, 16) = 48. A+B=6, B+C=4, A+C=3.\nStep 2: 2(A+B+C) = 13 => A+B+C = 6.5 units/day.\nStep 3: Time taken = 48 / 6.5 = 96 / 13 = 7.38 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "20 men can build a wall in 18 days. After 6 days, 5 men leave. How many more days are required?",
        options: ["14 days", "15 days", "16 days", "18 days"],
        correctAnswer: "16 days",
        explanation: "Step 1: Total work = 20 * 18 = 360 man-days.\nStep 2: Work in 6 days = 20 * 6 = 120 man-days. Remaining = 240.\nStep 3: Men left = 15. Time required = 240 / 15 = 16 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "A pipe fills a tank in 12 hours and another in 18 hours. A leak can empty the full tank in 36 hours. Find the time required to fill the tank.",
        options: ["8 hours", "9 hours", "10 hours", "12 hours"],
        correctAnswer: "9 hours",
        explanation: "Step 1: LCM(12, 18, 36) = 36 units.\nStep 2: Efficiencies: P1=3, P2=2, Leak=-1.\nStep 3: Net eff = 3 + 2 - 1 = 4 units/hour.\nStep 4: Time = 36 / 4 = 9 hours."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Easy",
        questionText: "A completes 40% of a work in 8 days. How many days will he take to complete the whole work?",
        options: ["16 days", "18 days", "20 days", "24 days"],
        correctAnswer: "20 days",
        explanation: "Step 1: 40% (2/5) of work is done in 8 days.\nStep 2: Total work (100%) = 8 * (5 / 2) = 20 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A can do a work in 10 days, B in 15 days. They work together but every third day B is absent. Find total completion time.",
        options: ["6 days", "6.8 days", "7 days", "7.5 days"],
        correctAnswer: "6.8 days",
        explanation: "Step 1: LCM(10, 15) = 30. A=3, B=2.\nStep 2: Day 1: 5. Day 2: 5. Day 3: A alone = 3. Cycle of 3 days = 13 units.\nStep 3: 2 cycles (6 days) = 26 units. Remaining = 4 units.\nStep 4: Day 7 is A+B (eff=5). Time for 4 units = 4/5 = 0.8 days.\nStep 5: Total = 6.8 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Easy",
        questionText: "A and B together finish a work in 6 days. If A alone takes 10 days, find B's time.",
        options: ["12 days", "15 days", "18 days", "20 days"],
        correctAnswer: "15 days",
        explanation: "Step 1: LCM(6, 10) = 30. (A+B)=5, A=3.\nStep 2: B's eff = 5 - 3 = 2 units/day.\nStep 3: B's time = 30 / 2 = 15 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "40 workers can complete a project in 30 days. After 10 days, work is stopped for 5 days. How many extra workers are required to finish on schedule?",
        options: ["10", "12", "14", "16"],
        correctAnswer: "14",
        explanation: "Step 1: Total = 1200 man-days. Done in 10 days = 400. Remaining = 800.\nStep 2: Days left to meet schedule = 30 - 10 - 5 = 15 days.\nStep 3: Workers needed = 800 / 15 = 53.33 workers.\nStep 4: To safely complete, 54 workers needed. Extra = 54 - 40 = 14 workers."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "A does half the work in 6 days. B completes the remaining half in 4 days. If they work together, how many days will they take?",
        options: ["4 days", "4.8 days", "5 days", "5.5 days"],
        correctAnswer: "4.8 days",
        explanation: "Step 1: A does full work in 12 days. B does full work in 8 days.\nStep 2: LCM(12, 8) = 24. A=2, B=3.\nStep 3: A+B eff = 5.\nStep 4: Total time = 24 / 5 = 4.8 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "Three men and two women can finish a work in 12 days. Two men and three women can finish it in 15 days. Find the time taken by one man and one woman together.",
        options: ["30 days", "33.33 days", "36 days", "40 days"],
        correctAnswer: "33.33 days",
        explanation: "Step 1: 12(3M+2W) = 15(2M+3W) => 36M+24W = 30M+45W => 6M=21W => 2M=7W => M/W = 7/2.\nStep 2: Total work = 12*(3*7 + 2*2) = 12*(25) = 300 units.\nStep 3: 1M + 1W eff = 7 + 2 = 9.\nStep 4: Time = 300 / 9 = 33.33 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "A alone can do a work in 15 days. B alone in 20 days. They work together but A leaves after 3 days. Find total completion time.",
        options: ["14 days", "15 days", "16 days", "18 days"],
        correctAnswer: "16 days",
        explanation: "Step 1: LCM(15, 20) = 60. A=4, B=3.\nStep 2: Together in 3 days = 3*(4+3) = 21 units. Remaining = 39.\nStep 3: B finishes 39 units in 39/3 = 13 days.\nStep 4: Total time = 3 + 13 = 16 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A contractor estimates that 24 workers can finish a work in 25 days. After 5 days, only 20 workers remain. Find delay in completion.",
        options: ["2 days", "3 days", "4 days", "5 days"],
        correctAnswer: "4 days",
        explanation: "Step 1: Total = 24 * 25 = 600. Done in 5 days = 120. Remaining = 480.\nStep 2: 20 workers finish it in 480/20 = 24 days.\nStep 3: Total time = 5 + 24 = 29 days.\nStep 4: Delay = 29 - 25 = 4 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A can complete a work in 20 days and B in 30 days. If A works every day and B works every alternate day, find total time.",
        options: ["14.5 days", "15.2 days", "16 days", "16.8 days"],
        correctAnswer: "15.2 days",
        explanation: "Step 1: LCM=60. A=3, B=2.\nStep 2: Day 1: A=3. Day 2: A+B=5. 2-day cycle = 8 units.\nStep 3: 7 cycles (14 days) = 56 units. Remaining = 4 units.\nStep 4: Day 15: A alone does 3. Remaining = 1.\nStep 5: Day 16: A+B does 5. Time for 1 unit = 1/5 = 0.2 days. Total = 15.2 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "A, B, and C together complete a work in 4 days. A alone can do it in 12 days and B alone in 18 days. Find C's time.",
        options: ["8 days", "9 days", "10 days", "12 days"],
        correctAnswer: "9 days",
        explanation: "Step 1: LCM(4, 12, 18) = 36. A+B+C=9, A=3, B=2.\nStep 2: C's eff = 9 - (3+2) = 4 units/day.\nStep 3: C's time = 36 / 4 = 9 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A can complete a work in 30 days. After working for 10 days, B joins and together they finish the remaining work in 8 days. Find B's time.",
        options: ["15 days", "18 days", "20 days", "24 days"],
        correctAnswer: "20 days",
        explanation: "Step 1: Let Work = 30 units. A's eff = 1.\nStep 2: A worked 10 days = 10 units. Remaining = 20 units.\nStep 3: A+B finish 20 in 8 days => A+B eff = 2.5.\nStep 4: B's eff = 2.5 - 1.0 = 1.5 units/day.\nStep 5: B's time = 30 / 1.5 = 20 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "8 men and 12 boys finish a work in 10 days. 12 men and 8 boys finish it in 8 days. Find the time taken by 1 man and 1 boy together.",
        options: ["80 days", "85 days", "88.88 days", "90 days"],
        correctAnswer: "88.88 days",
        explanation: "Step 1: 10(8M+12B) = 8(12M+8B) => 80M+120B = 96M+64B => 16M=56B => 2M=7B => M/B = 7/2.\nStep 2: Total work = 10*(8*7 + 12*2) = 800 units.\nStep 3: 1M + 1B eff = 7 + 2 = 9.\nStep 4: Time = 800 / 9 = 88.88 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A takes 25% more time than B to complete a work. If together they finish it in 12 days, find individual times.",
        options: ["A=27, B=21.6", "A=25, B=20", "A=24, B=18", "A=30, B=24"],
        correctAnswer: "A=27, B=21.6",
        explanation: "Step 1: Time ratio A:B = 125:100 = 5:4. Efficiency ratio A:B = 4:5.\nStep 2: Combined eff = 9. Total work = 12 * 9 = 108 units.\nStep 3: A's time = 108 / 4 = 27 days. B's time = 108 / 5 = 21.6 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "A and B can do a work in 9 days, B and C in 12 days, C and A in 18 days. Find the time taken by all three together.",
        options: ["6 days", "7 days", "8 days", "9 days"],
        correctAnswer: "8 days",
        explanation: "Step 1: LCM(9, 12, 18) = 36. A+B=4, B+C=3, C+A=2.\nStep 2: 2(A+B+C) = 9 => A+B+C eff = 4.5.\nStep 3: Time taken = 36 / 4.5 = 8 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "24 workers working 6 hours a day complete a work in 20 days. How many workers are needed to finish the same work in 15 days working 8 hours daily?",
        options: ["20 workers", "22 workers", "24 workers", "26 workers"],
        correctAnswer: "24 workers",
        explanation: "Step 1: M1 * D1 * H1 = M2 * D2 * H2.\nStep 2: 24 * 20 * 6 = M2 * 15 * 8.\nStep 3: 2880 = M2 * 120.\nStep 4: M2 = 2880 / 120 = 24 workers."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Medium",
        questionText: "A can do a work in 40 days. B is 60% more efficient than A. How many days will B take?",
        options: ["20 days", "22.5 days", "24 days", "25 days"],
        correctAnswer: "25 days",
        explanation: "Step 1: Eff ratio A:B = 100:160 = 5:8.\nStep 2: Total work = A's eff * A's time = 5 * 40 = 200 units.\nStep 3: B's time = Total work / B's eff = 200 / 8 = 25 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Easy",
        questionText: "A and B together can do a work in 5 days. If B alone takes 15 days, find A's time.",
        options: ["7.5 days", "8.5 days", "9 days", "10 days"],
        correctAnswer: "7.5 days",
        explanation: "Step 1: LCM(5, 15) = 15. A+B=3, B=1.\nStep 2: A's eff = 3 - 1 = 2.\nStep 3: A's time = 15 / 2 = 7.5 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A can do a work in 18 days and B in 24 days. They work together for 3 days, then both leave and C completes the remaining work in 5 days. Find C's time.",
        options: ["6.8 days", "7.05 days", "7.5 days", "8.2 days"],
        correctAnswer: "7.05 days",
        explanation: "Step 1: LCM(18, 24) = 72. A=4, B=3.\nStep 2: 3 days together = 3*(4+3) = 21 units. Remaining = 51 units.\nStep 3: C finishes 51 units in 5 days => C's eff = 51/5 = 10.2.\nStep 4: C's total time = 72 / 10.2 = 120 / 17 ≈ 7.05 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A work can be completed by 25 men in 16 days. After 4 days, 5 men leave and after another 4 days, 10 more men leave. Find total completion time.",
        options: ["25 days", "28 days", "30 days", "32 days"],
        correctAnswer: "30 days",
        explanation: "Step 1: Total work = 25 * 16 = 400 man-days.\nStep 2: First 4 days: 25 * 4 = 100. Remaining = 300.\nStep 3: Next 4 days: 20 * 4 = 80. Remaining = 220.\nStep 4: Men left = 10. Time = 220 / 10 = 22 days.\nStep 5: Total time = 4 + 4 + 22 = 30 days."
    },
    {
        category: "Aptitude", topic: "Time & work", difficulty: "Hard",
        questionText: "A, B, and C can complete a work in 12, 18, and 24 days respectively. They start together. After every day, one worker leaves in the order A, then B, then C and the cycle repeats until the work is finished. Find the total time required.",
        options: ["8 days", "9 days", "9.23 days", "10 days"],
        correctAnswer: "9.23 days",
        explanation: "Step 1: LCM = 72. A=6, B=4, C=3. Total eff=13.\nStep 2: Cycle: Day 1 (A+B+C) = 13. Day 2 (B+C) = 7. Day 3 (C) = 3. Total 3-day cycle = 23 units.\nStep 3: 3 cycles (9 days) = 3 * 23 = 69 units. Remaining = 3 units.\nStep 4: Day 10 starts with A+B+C (eff=13). Time = 3/13 ≈ 0.23 days.\nStep 5: Total time = 9 + 0.23 = 9.23 days (9 3/13 days)."
    }
];

const seedMyData = async () => {
    try {
        console.log("🧹 ALERT: Deleting old TIME & WORK questions...");
        // Purana time and work ka saara kachra uda rahe hain
        await Question.deleteMany({ topic: "Time & work" }); 
        console.log("🗑️ Purana Time & Work data safely deleted!");

        console.log(`🚀 Injecting ${myCustomQuestions.length} Custom Placement Questions into the database...`);
        
        await Question.insertMany(myCustomQuestions);
        console.log(`✅ BOOM! Tumhara custom Time & Work data successfully seed ho gaya!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedMyData();