const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Pipes & Cisterns Seeding'))
  .catch(err => console.log(err));

const batch10Questions = [
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Easy",
        questionText: "Pipe A fills a tank in 12 hours and Pipe B fills it in 18 hours. A leak can empty the full tank in 36 hours. If all three are opened together, how long will it take to fill the tank?",
        options: ["8 hours", "9 hours", "10 hours", "12 hours"],
        correctAnswer: "9 hours",
        explanation: "Step 1: Total Capacity = LCM(12, 18, 36) = 36 units.\nStep 2: Efficiency of A = 36/12 = +3. B = 36/18 = +2. Leak C = 36/36 = -1.\nStep 3: Net Efficiency = 3 + 2 - 1 = 4 units/hr.\nStep 4: Total Time = 36 / 4 = 9 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "Pipe A can fill a tank in 20 hours and Pipe B in 30 hours. They are opened together, but after 6 hours Pipe B is closed. Find the total time required.",
        options: ["14 hours", "15 hours", "16 hours", "18 hours"],
        correctAnswer: "16 hours",
        explanation: "Step 1: LCM(20, 30) = 60 units. Efficiency A = +3, B = +2.\nStep 2: Work done in 6 hours together = 6 * (3 + 2) = 30 units.\nStep 3: Remaining work = 60 - 30 = 30 units.\nStep 4: A fills the rest: Time = 30 / 3 = 10 hours.\nStep 5: Total Time = 6 + 10 = 16 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "A cistern has two inlet pipes A and B which can fill it in 15 and 20 hours respectively. An outlet pipe C can empty it in 30 hours. If all pipes are opened together, find the time taken to fill the tank.",
        options: ["10 hours", "12 hours", "14 hours", "15 hours"],
        correctAnswer: "12 hours",
        explanation: "Step 1: LCM(15, 20, 30) = 60 units.\nStep 2: Efficiencies: A = +4, B = +3, C = -2.\nStep 3: Net Efficiency = 4 + 3 - 2 = 5 units/hr.\nStep 4: Total Time = 60 / 5 = 12 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Easy",
        questionText: "Pipe A fills a tank in 10 hours and Pipe B empties it in 15 hours. If both are opened together, how long will it take to fill the tank?",
        options: ["20 hours", "25 hours", "30 hours", "35 hours"],
        correctAnswer: "30 hours",
        explanation: "Step 1: LCM(10, 15) = 30 units.\nStep 2: Efficiency A = +3, B = -2.\nStep 3: Net Efficiency = 3 - 2 = +1 unit/hr.\nStep 4: Total Time = 30 / 1 = 30 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Three pipes A, B and C can fill a tank in 12, 15 and 20 hours respectively. They are opened together for 2 hours, then A is closed. Find total time to fill the tank.",
        options: ["6 hours", "7.14 hours", "8 hours", "8.5 hours"],
        correctAnswer: "7.14 hours",
        explanation: "Step 1: LCM(12, 15, 20) = 60 units. Eff: A=5, B=4, C=3.\nStep 2: Together they fill in 2 hrs = 2 * (5+4+3) = 24 units.\nStep 3: Remaining = 60 - 24 = 36 units.\nStep 4: A is closed. B+C efficiency = 4+3 = 7. Time for remaining = 36 / 7 = 5.14 hrs.\nStep 5: Total Time = 2 + 5.14 = 7.14 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "A pipe fills a tank in 8 hours. Due to a leak, it takes 10 hours to fill. Find the time taken by the leak alone to empty the full tank.",
        options: ["30 hours", "36 hours", "40 hours", "48 hours"],
        correctAnswer: "40 hours",
        explanation: "Step 1: Capacity = LCM(8, 10) = 40 units.\nStep 2: Normal Efficiency = 40/8 = +5. Net Efficiency with leak = 40/10 = +4.\nStep 3: Leak Efficiency = 5 - 4 = 1 unit/hr (emptying).\nStep 4: Time taken by leak = 40 / 1 = 40 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Pipe A fills a tank in 24 hours. Pipe B empties it in 36 hours. If A is opened at 8 AM and B at 12 PM, find how many hours it takes to fill after B is opened.",
        options: ["48 hours", "54 hours", "60 hours", "72 hours"],
        correctAnswer: "60 hours",
        explanation: "Step 1: Capacity = LCM(24, 36) = 72 units. Eff A = +3, B = -2.\nStep 2: From 8 AM to 12 PM (4 hours), A works alone. Fills 4 * 3 = 12 units.\nStep 3: Remaining = 72 - 12 = 60 units.\nStep 4: At 12 PM, B opens. Net Eff = 3 - 2 = 1.\nStep 5: Time from 12 PM = 60 / 1 = 60 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "Two pipes can fill a tank in 16 and 24 hours. A third pipe can empty it in 48 hours. If all are opened together, find the filling time.",
        options: ["10 hours", "12 hours", "14 hours", "16 hours"],
        correctAnswer: "12 hours",
        explanation: "Step 1: LCM(16, 24, 48) = 48 units.\nStep 2: Efficiencies: A = +3, B = +2, C = -1.\nStep 3: Net Efficiency = 3 + 2 - 1 = 4 units/hr.\nStep 4: Total Time = 48 / 4 = 12 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Pipe A fills a tank in 18 hours and Pipe B in 24 hours. They are opened alternately starting with A. Find the time taken to fill the tank.",
        options: ["20 hours", "20.5 hours", "21 hours", "21.5 hours"],
        correctAnswer: "20.5 hours",
        explanation: "Step 1: Capacity = LCM(18, 24) = 72 units. Eff A = 4, B = 3.\nStep 2: 2-hour cycle (A then B) = 4 + 3 = 7 units.\nStep 3: 10 cycles (20 hours) = 70 units.\nStep 4: Remaining = 2 units. Turn is A's. Time taken by A = 2/4 = 0.5 hours.\nStep 5: Total Time = 20 + 0.5 = 20.5 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Pipe A fills a tank in 30 hours. After 10 hours, Pipe B joins and together they fill the remaining tank in 8 hours. Find B's filling time.",
        options: ["15 hours", "18 hours", "20 hours", "24 hours"],
        correctAnswer: "20 hours",
        explanation: "Step 1: In 10 hours, A fills 10/30 = 1/3 of the tank. Remaining = 2/3.\nStep 2: A and B together fill 2/3 in 8 hours. So they fill 1 full tank in 8 * (3/2) = 12 hours.\nStep 3: LCM(A=30, A+B=12) = 60 units. Eff A = 2, A+B = 5.\nStep 4: Eff B = 5 - 2 = 3.\nStep 5: Time for B = 60 / 3 = 20 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Three pipes A, B and C can fill a tank in 12, 18 and 24 hours. They are opened one after another for one hour each cyclically. Find the time required to fill the tank.",
        options: ["16 hours", "16.25 hours", "16.5 hours", "17 hours"],
        correctAnswer: "16.25 hours",
        explanation: "Step 1: Capacity = LCM(12, 18, 24) = 72 units. Eff A=6, B=4, C=3.\nStep 2: 3-hour cycle (A->B->C) = 6 + 4 + 3 = 13 units.\nStep 3: 5 cycles (15 hours) = 13 * 5 = 65 units. Remaining = 7 units.\nStep 4: 16th hour: A fills 6 units. Remaining = 1 unit.\nStep 5: 17th hour: B fills 1 unit in 1/4 hour = 0.25 hrs.\nStep 6: Total Time = 15 + 1 + 0.25 = 16.25 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "Pipe A fills a tank in 15 hours. A leak empties it in 45 hours. If the tank is initially half full, find the time needed to completely fill it.",
        options: ["10.25 hours", "11 hours", "11.25 hours", "12 hours"],
        correctAnswer: "11.25 hours",
        explanation: "Step 1: Capacity = LCM(15, 45) = 45 units. Eff A = +3, L = -1. Net = +2.\nStep 2: Tank is half full. Empty space to fill = 45 / 2 = 22.5 units.\nStep 3: Time = 22.5 / 2 = 11.25 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "Pipe A can fill a tank in 20 hours and Pipe B in 25 hours. If both are opened together but A is closed after 5 hours, find total filling time.",
        options: ["16.5 hours", "18 hours", "18.75 hours", "20 hours"],
        correctAnswer: "18.75 hours",
        explanation: "Step 1: LCM(20, 25) = 100 units. Eff A=5, B=4.\nStep 2: 5 hours together = 5 * (5+4) = 45 units. Remaining = 55 units.\nStep 3: A is closed. B completes the rest in 55 / 4 = 13.75 hours.\nStep 4: Total Time = 5 + 13.75 = 18.75 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "An inlet fills a tank in 10 hours while an outlet empties it in 20 hours. If the outlet is opened after 3 hours, find total filling time.",
        options: ["15 hours", "16 hours", "17 hours", "18 hours"],
        correctAnswer: "17 hours",
        explanation: "Step 1: Capacity = LCM(10, 20) = 20 units. Inlet = +2, Outlet = -1.\nStep 2: Inlet works alone for 3 hours = 3 * 2 = 6 units. Remaining = 14 units.\nStep 3: Outlet opens. Net Eff = 2 - 1 = 1.\nStep 4: Time for remainder = 14 / 1 = 14 hours.\nStep 5: Total Time = 3 + 14 = 17 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "Two pipes fill a tank in 12 and 18 hours. Due to leakage, they together take 8 hours. Find the leakage rate.",
        options: ["36 hours", "48 hours", "60 hours", "72 hours"],
        correctAnswer: "72 hours",
        explanation: "Step 1: LCM(12, 18, 8) = 72 units. Normal Eff A=6, B=4. Total normal = 10.\nStep 2: Net Eff (with leak taking 8 hours to fill) = 72 / 8 = 9 units/hr.\nStep 3: Leak efficiency = Normal - Net = 10 - 9 = 1 unit/hr.\nStep 4: Leak Time = 72 / 1 = 72 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "A tank is filled by Pipe A in 16 hours. Pipe B empties it in 24 hours. Pipe C fills it in 48 hours. Find the net filling time when all three operate together.",
        options: ["20 hours", "24 hours", "30 hours", "36 hours"],
        correctAnswer: "24 hours",
        explanation: "Step 1: Capacity = LCM(16, 24, 48) = 48 units.\nStep 2: Efficiencies: A=+3, B=-2, C=+1.\nStep 3: Net Efficiency = 3 - 2 + 1 = 2 units/hr.\nStep 4: Time = 48 / 2 = 24 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Easy",
        questionText: "Pipe A fills 1/5 of a tank per hour while Pipe B empties 1/10 per hour. How long will it take to fill an empty tank?",
        options: ["5 hours", "8 hours", "10 hours", "12 hours"],
        correctAnswer: "10 hours",
        explanation: "Step 1: Net filling rate = (1/5) - (1/10) = 2/10 - 1/10 = 1/10 of the tank per hour.\nStep 2: It will take exactly 10 hours to fill the whole tank."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Pipe A fills a tank in 8 hours and Pipe B in 12 hours. They are opened alternately every hour, starting with A. Find the filling time.",
        options: ["9 hours", "9.5 hours", "10 hours", "10.5 hours"],
        correctAnswer: "9.5 hours",
        explanation: "Step 1: Capacity = LCM(8, 12) = 24 units. Eff A=3, B=2.\nStep 2: 2-hour cycle = 3 + 2 = 5 units.\nStep 3: 4 cycles (8 hours) = 20 units. Remaining = 4 units.\nStep 4: 9th hour: A fills 3 units. Remaining = 1 unit.\nStep 5: 10th hour: B fills 1 unit in 1/2 hour (0.5 hrs).\nStep 6: Total Time = 8 + 1 + 0.5 = 9.5 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "A tank is filled by three pipes in 10, 15 and 30 hours respectively. If the third pipe is closed after 2 hours, find total filling time.",
        options: ["4 hours", "5 hours", "5.6 hours", "6 hours"],
        correctAnswer: "5.6 hours",
        explanation: "Step 1: Capacity = LCM(10, 15, 30) = 30 units. Eff A=3, B=2, C=1.\nStep 2: First 2 hours all work: 2 * (3+2+1) = 12 units. Remaining = 18 units.\nStep 3: C is closed. A+B = 5 units/hr. Time for remaining = 18 / 5 = 3.6 hours.\nStep 4: Total Time = 2 + 3.6 = 5.6 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "Pipe A fills a tank in 9 hours and Pipe B empties it in 12 hours. If the tank is already 1/3 full, find the time required to fill it.",
        options: ["18 hours", "20 hours", "24 hours", "36 hours"],
        correctAnswer: "24 hours",
        explanation: "Step 1: Capacity = LCM(9, 12) = 36 units. Eff A=+4, B=-3. Net = 1.\nStep 2: Tank is 1/3 full = 12 units. Empty space = 36 - 12 = 24 units.\nStep 3: Time required = 24 / 1 = 24 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "Pipe A can fill a tank in 14 hours and Pipe B in 21 hours. A leak can empty the tank in 42 hours. Find the effective filling time.",
        options: ["10 hours", "10.5 hours", "12 hours", "14.5 hours"],
        correctAnswer: "10.5 hours",
        explanation: "Step 1: LCM(14, 21, 42) = 42 units. Eff A=3, B=2, L=-1.\nStep 2: Net Efficiency = 3 + 2 - 1 = 4 units/hr.\nStep 3: Time = 42 / 4 = 10.5 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "A pipe fills a tank in 6 hours. Due to leakage, it takes 7.5 hours. Find the leak's emptying time.",
        options: ["20 hours", "24 hours", "30 hours", "36 hours"],
        correctAnswer: "30 hours",
        explanation: "Step 1: Capacity = LCM(6, 7.5) -> Let's use 30 units.\nStep 2: Normal Eff = 30/6 = 5. Net Eff = 30/7.5 = 4.\nStep 3: Leak Efficiency = Normal - Net = 5 - 4 = 1 unit/hr.\nStep 4: Leak Time = 30 / 1 = 30 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "Pipe A fills a tank in 10 hours and Pipe B in 15 hours. They are opened together but B is closed after 4 hours. Find total filling time.",
        options: ["6 hours", "6.66 hours", "7.33 hours", "8 hours"],
        correctAnswer: "7.33 hours",
        explanation: "Step 1: LCM(10, 15) = 30 units. Eff A=3, B=2.\nStep 2: 4 hours together = 4 * (3+2) = 20 units. Remaining = 10 units.\nStep 3: A fills remaining: 10 / 3 = 3.33 hours.\nStep 4: Total Time = 4 + 3.33 = 7.33 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Medium",
        questionText: "Three pipes fill a tank in 12, 15 and 20 hours. One leak empties it in 30 hours. Find the time required when all operate together.",
        options: ["5 hours", "6 hours", "7.5 hours", "8 hours"],
        correctAnswer: "6 hours",
        explanation: "Step 1: LCM(12, 15, 20, 30) = 60 units.\nStep 2: Efficiencies: A=5, B=4, C=3, Leak=-2.\nStep 3: Net Eff = 5 + 4 + 3 - 2 = 10 units/hr.\nStep 4: Time = 60 / 10 = 6 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Pipe A fills a tank in 8 hours. Pipe B fills it in 12 hours. Pipe C empties it in 24 hours. Pipes are opened in sequence A → B → C repeatedly every hour. Find total filling time.",
        options: ["15 hours", "16.5 hours", "18 hours", "19.5 hours"],
        correctAnswer: "16.5 hours",
        explanation: "Step 1: LCM(8, 12, 24) = 24 units. Eff A=3, B=2, C=-1.\nStep 2: 3-hour cycle = 3 + 2 - 1 = 4 units.\nStep 3: We need to reach 24. After 5 cycles (15 hours) = 20 units.\nStep 4: 16th hour: A fills 3 units (Total 23). Remaining = 1.\nStep 5: 17th hour: B fills 1 unit in 1/2 hour (0.5 hrs).\nStep 6: Total Time = 15 + 1 + 0.5 = 16.5 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Easy",
        questionText: "A tank can be filled by Pipe A in 18 hours. Pipe B is 50% more efficient than A. Find the time taken when both work together.",
        options: ["6 hours", "7.2 hours", "8 hours", "9 hours"],
        correctAnswer: "7.2 hours",
        explanation: "Step 1: B is 50% more efficient, so B takes 18 / 1.5 = 12 hours.\nStep 2: LCM(18, 12) = 36 units. Eff A=2, B=3.\nStep 3: Total Efficiency = 5 units/hr.\nStep 4: Time = 36 / 5 = 7.2 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Two pipes fill a tank in 20 and 30 hours. An outlet empties it in 60 hours. If the outlet works only for the last half of the operation time, find total time.",
        options: ["12 hours", "13.33 hours", "14 hours", "15 hours"],
        correctAnswer: "13.33 hours",
        explanation: "Step 1: LCM(20, 30, 60) = 60 units. Eff A=3, B=2, L=-1.\nStep 2: Let total time be T. First half (T/2) only A+B=5. Second half (T/2) A+B+L=4.\nStep 3: (T/2)*5 + (T/2)*4 = 60 => 4.5T = 60.\nStep 4: T = 60 / 4.5 = 13.33 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Pipe A fills a tank in 12 hours and Pipe B in 18 hours. A leak that empties the tank in 36 hours starts operating every third hour. Find total filling time.",
        options: ["7 hours", "7.6 hours", "8 hours", "8.5 hours"],
        correctAnswer: "7.6 hours",
        explanation: "Step 1: LCM(12, 18, 36) = 36 units. Eff A=3, B=2, L=-1.\nStep 2: In a 3-hr block: Hr 1 (A+B=5), Hr 2 (A+B=5), Hr 3 (A+B+L=4). 3-hr cycle = 14 units.\nStep 3: 2 cycles (6 hrs) = 28 units. Remaining = 8 units.\nStep 4: 7th hr = 5 units. Remaining = 3 units.\nStep 5: 8th hr = 3/5 hr = 0.6 hr.\nStep 6: Total Time = 6 + 1 + 0.6 = 7.6 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Three identical pipes can fill a tank in 12 hours each. One pipe is opened initially, second after 2 hours and third after 4 hours. Find total filling time.",
        options: ["5 hours", "6 hours", "7 hours", "8 hours"],
        correctAnswer: "6 hours",
        explanation: "Step 1: Capacity = 12 units. Eff of each pipe = 1 unit/hr.\nStep 2: 0-2 hours: 1 pipe works = 2 units. Remaining = 10.\nStep 3: 2-4 hours: 2 pipes work = 4 units. Remaining = 6.\nStep 4: After 4 hours: 3 pipes work (Eff=3). Time = 6 / 3 = 2 hours.\nStep 5: Total Time = 2 + 2 + 2 = 6 hours."
    },
    {
        category: "Aptitude", topic: "Pipes & Cisterns", difficulty: "Hard",
        questionText: "Pipe A fills a tank in 12 hours, Pipe B in 18 hours and Pipe C in 24 hours. First 2 hours A and B operate, next 2 hours B and C operate, next 2 hours A and C operate. This cycle repeats until full. Find exact time required.",
        options: ["6 hours", "7 hours", "8 hours", "9 hours"],
        correctAnswer: "8 hours",
        explanation: "Step 1: LCM(12, 18, 24) = 72 units. Eff A=6, B=4, C=3.\nStep 2: First 2 hrs (A+B) = 2 * 10 = 20.\nStep 3: Next 2 hrs (B+C) = 2 * 7 = 14.\nStep 4: Next 2 hrs (A+C) = 2 * 9 = 18.\nStep 5: 6-hr cycle = 52 units. Remaining = 72 - 52 = 20 units.\nStep 6: Next turn is A+B (Eff=10). Time for 20 units = 20/10 = 2 hours.\nStep 7: Total Time = 6 + 2 = 8 hours exactly."
    }
];

const seedBatch10Pipes = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Pipes & Cisterns questions...");
        await Question.deleteMany({ topic: "Pipes & Cisterns" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting ${batch10Questions.length} Custom Pipes & Cisterns Questions...`);
        
        await Question.insertMany(batch10Questions);
        console.log(`✅ BOOM! Tumhara Pipes & Cisterns ka premium dataset seed ho gaya!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch10Pipes();