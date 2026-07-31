const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Simple & Compound Interest Seeding'))
  .catch(err => console.log(err));

const batch5Questions = [
    // SIMPLE INTEREST (20 Questions)
    
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Medium",
        questionText: "A sum amounts to ₹12,000 in 4 years and ₹13,500 in 7 years at simple interest. Find the principal and rate.",
        options: ["P=10000, R=5%", "P=9000, R=6%", "P=10000, R=6%", "P=8000, R=5%"],
        correctAnswer: "P=10000, R=5%",
        explanation: "Step 1: Interest for 3 years (7 - 4) = 13500 - 12000 = ₹1500.\nStep 2: Interest for 1 year = 1500 / 3 = ₹500.\nStep 3: Interest for 4 years = 500 * 4 = ₹2000.\nStep 4: Principal = Amount(4 yrs) - SI(4 yrs) = 12000 - 2000 = ₹10000.\nStep 5: Rate = (1 year SI * 100) / P = (500 * 100) / 10000 = 5%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Medium",
        questionText: "A certain sum becomes ₹9,600 in 5 years and ₹11,040 in 8 years at simple interest. Find the principal.",
        options: ["₹6800", "₹7000", "₹7200", "₹7500"],
        correctAnswer: "₹7200",
        explanation: "Step 1: Interest for 3 years (8 - 5) = 11040 - 9600 = ₹1440.\nStep 2: Interest for 1 year = 1440 / 3 = ₹480.\nStep 3: Interest for 5 years = 480 * 5 = ₹2400.\nStep 4: Principal = 9600 - 2400 = ₹7200."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Easy",
        questionText: "A sum doubles itself in 12 years at simple interest. Find the rate of interest.",
        options: ["8.33%", "10%", "12%", "12.5%"],
        correctAnswer: "8.33%",
        explanation: "Step 1: If a sum doubles, Interest (SI) = Principal (P).\nStep 2: SI = (P * R * T) / 100 => P = (P * R * 12) / 100.\nStep 3: 1 = 12R / 100 => R = 100 / 12.\nStep 4: R = 8.33%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Easy",
        questionText: "A sum triples itself in 20 years at simple interest. Find the annual rate.",
        options: ["5%", "8%", "10%", "15%"],
        correctAnswer: "10%",
        explanation: "Step 1: If sum triples, Amount = 3P. Therefore, SI = 3P - P = 2P.\nStep 2: SI = (P * R * T) / 100 => 2P = (P * R * 20) / 100.\nStep 3: 2 = 20R / 100 => 200 = 20R.\nStep 4: R = 10%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Hard",
        questionText: "The difference between SI on ₹8,000 for 5 years and ₹6,000 for 8 years at the same rate is ₹320. Find the rate.",
        options: ["3%", "4%", "5%", "6%"],
        correctAnswer: "4%",
        explanation: "Step 1: SI_1 = (8000 * R * 5) / 100 = 400R.\nStep 2: SI_2 = (6000 * R * 8) / 100 = 480R.\nStep 3: Difference = 480R - 400R = 80R.\nStep 4: 80R = 320 => R = 320 / 80 = 4%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Easy",
        questionText: "A man invested ₹15,000 at SI. After 6 years, he received ₹20,400. Find the rate.",
        options: ["5%", "6%", "7%", "8%"],
        correctAnswer: "6%",
        explanation: "Step 1: SI = Amount - Principal = 20400 - 15000 = ₹5400.\nStep 2: Formula: R = (SI * 100) / (P * T).\nStep 3: R = (5400 * 100) / (15000 * 6) = 540000 / 90000.\nStep 4: R = 6%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Medium",
        questionText: "The ratio of principal and SI for 8 years is 25:8. Find the rate.",
        options: ["3%", "4%", "5%", "6%"],
        correctAnswer: "4%",
        explanation: "Step 1: Let P = 25x and SI = 8x.\nStep 2: Time (T) = 8 years.\nStep 3: R = (SI * 100) / (P * T) = (8x * 100) / (25x * 8).\nStep 4: R = 800 / 200 = 4%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Medium",
        questionText: "A sum earns ₹2,400 SI in 4 years at 10% p.a. Find the amount after 7 years.",
        options: ["₹8400", "₹9600", "₹10200", "₹10800"],
        correctAnswer: "₹10200",
        explanation: "Step 1: P = (SI * 100) / (R * T) = (2400 * 100) / (10 * 4) = ₹6000.\nStep 2: SI for 7 years = (6000 * 10 * 7) / 100 = ₹4200.\nStep 3: Amount after 7 years = P + SI = 6000 + 4200 = ₹10200."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Medium",
        questionText: "A sum becomes ₹18,000 after 5 years and ₹21,600 after 8 years at SI. Find the principal.",
        options: ["₹10000", "₹12000", "₹14000", "₹15000"],
        correctAnswer: "₹12000",
        explanation: "Step 1: SI for 3 years = 21600 - 18000 = ₹3600.\nStep 2: SI for 1 year = 3600 / 3 = ₹1200.\nStep 3: SI for 5 years = 1200 * 5 = ₹6000.\nStep 4: Principal = Amount(5y) - SI(5y) = 18000 - 6000 = ₹12000."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Hard",
        questionText: "A sum is invested at 12% p.a. simple interest. Find the time required for the amount to become double.",
        options: ["6 years", "8 years", "8.33 years", "10 years"],
        correctAnswer: "8.33 years",
        explanation: "Step 1: Amount doubles means SI = P.\nStep 2: P = (P * R * T) / 100 => 1 = (12 * T) / 100.\nStep 3: T = 100 / 12 = 25 / 3.\nStep 4: T = 8.33 years (or 8 years 4 months)."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Hard",
        questionText: "Two sums are invested at the same rate of SI. The first earns ₹1,800 in 3 years on ₹10,000. Find the SI on ₹25,000 for 5 years.",
        options: ["₹6000", "₹6500", "₹7000", "₹7500"],
        correctAnswer: "₹7500",
        explanation: "Step 1: Rate = (SI * 100) / (P * T) = (1800 * 100) / (10000 * 3) = 6%.\nStep 2: New SI = (25000 * 6 * 5) / 100.\nStep 3: New SI = 250 * 30 = ₹7500."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Easy",
        questionText: "A person borrows ₹50,000 at SI. After 4 years he pays ₹68,000. Find the annual rate.",
        options: ["7%", "8%", "9%", "10%"],
        correctAnswer: "9%",
        explanation: "Step 1: Total SI = Amount - P = 68000 - 50000 = ₹18000.\nStep 2: R = (SI * 100) / (P * T) = (18000 * 100) / (50000 * 4).\nStep 3: R = 1800000 / 200000 = 9%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Easy",
        questionText: "At what rate percent per annum will ₹8,000 amount to ₹11,200 in 5 years?",
        options: ["6%", "7%", "8%", "10%"],
        correctAnswer: "8%",
        explanation: "Step 1: SI = 11200 - 8000 = ₹3200.\nStep 2: R = (SI * 100) / (P * T) = (3200 * 100) / (8000 * 5).\nStep 3: R = 320000 / 40000 = 8%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Easy",
        questionText: "The SI on a sum for 7 years at 8% is ₹4,480. Find the principal.",
        options: ["₹7000", "₹7500", "₹8000", "₹8500"],
        correctAnswer: "₹8000",
        explanation: "Step 1: P = (SI * 100) / (R * T).\nStep 2: P = (4480 * 100) / (8 * 7).\nStep 3: P = 448000 / 56 = ₹8000."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Hard",
        questionText: "The difference between amounts for 6 years and 10 years on the same principal at SI is ₹3,200. If rate is 10%, find the principal.",
        options: ["₹6000", "₹8000", "₹10000", "₹12000"],
        correctAnswer: "₹8000",
        explanation: "Step 1: Difference in time = 10 - 6 = 4 years.\nStep 2: The difference in amounts is entirely due to the SI of these 4 years. So, SI for 4 years = ₹3200.\nStep 3: P = (SI * 100) / (R * T) = (3200 * 100) / (10 * 4).\nStep 4: P = 320000 / 40 = ₹8000."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Medium",
        questionText: "A sum invested at SI amounts to ₹14,000 in 4 years and ₹17,000 in 9 years. Find the principal.",
        options: ["₹10000", "₹10800", "₹11600", "₹12000"],
        correctAnswer: "₹11600",
        explanation: "Step 1: SI for 5 years (9 - 4) = 17000 - 14000 = ₹3000.\nStep 2: SI for 1 year = 3000 / 5 = ₹600.\nStep 3: SI for 4 years = 600 * 4 = ₹2400.\nStep 4: Principal = 14000 - 2400 = ₹11600."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Hard",
        questionText: "A sum of money becomes ₹18,750 in 5 years and ₹22,500 in 8 years at SI. Find the rate.",
        options: ["8%", "10%", "12%", "15%"],
        correctAnswer: "10%",
        explanation: "Step 1: SI for 3 years = 22500 - 18750 = ₹3750.\nStep 2: SI for 1 year = 1250. SI for 5 years = 1250 * 5 = ₹6250.\nStep 3: Principal = 18750 - 6250 = ₹12500.\nStep 4: R = (1250 * 100) / 12500 = 10%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Medium",
        questionText: "A principal yields SI equal to 40% of itself in 8 years. Find the annual rate.",
        options: ["4%", "5%", "6%", "8%"],
        correctAnswer: "5%",
        explanation: "Step 1: SI = 0.4P.\nStep 2: R = (SI * 100) / (P * T) = (0.4P * 100) / (P * 8).\nStep 3: R = 40 / 8 = 5%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Hard",
        questionText: "A man invests ₹20,000 and ₹30,000 at the same SI rate. If total interest earned in 5 years is ₹10,000, find the rate.",
        options: ["3%", "4%", "5%", "6%"],
        correctAnswer: "4%",
        explanation: "Step 1: Total Principal = 20000 + 30000 = ₹50000.\nStep 2: Total SI = ₹10000, Time = 5 years.\nStep 3: R = (Total SI * 100) / (Total P * T) = (10000 * 100) / (50000 * 5).\nStep 4: R = 1000000 / 250000 = 4%."
    },
    {
        category: "Aptitude", topic: "Simple Interest", difficulty: "Hard",
        questionText: "A sum becomes ₹16,500 in 4 years and ₹21,000 in 10 years at SI. Find the amount after 15 years.",
        options: ["₹22500", "₹24750", "₹25000", "₹26250"],
        correctAnswer: "₹24750",
        explanation: "Step 1: SI for 6 years = 21000 - 16500 = ₹4500.\nStep 2: SI for 1 year = 4500 / 6 = ₹750.\nStep 3: SI for 4 years = 3000. Principal = 16500 - 3000 = ₹13500.\nStep 4: Amount after 15 years = P + (15 * 1 year SI) = 13500 + (15 * 750) = 13500 + 11250 = ₹24750."
    },

    // COMPOUND INTEREST (20 Questions)
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Medium",
        questionText: "Find the CI on ₹20,000 for 3 years at 10% p.a. compounded annually.",
        options: ["₹6000", "₹6620", "₹6800", "₹7000"],
        correctAnswer: "₹6620",
        explanation: "Step 1: Amount = P(1 + R/100)^T = 20000(1 + 10/100)^3.\nStep 2: A = 20000 * (1.1)^3 = 20000 * 1.331 = 26620.\nStep 3: CI = Amount - P = 26620 - 20000 = ₹6620."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Medium",
        questionText: "A sum amounts to ₹13,310 in 3 years at 10% CI. Find the principal.",
        options: ["₹9000", "₹10000", "₹11000", "₹12000"],
        correctAnswer: "₹10000",
        explanation: "Step 1: A = P(1 + R/100)^T => 13310 = P(1.1)^3.\nStep 2: 13310 = P * 1.331.\nStep 3: P = 13310 / 1.331 = ₹10000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "The difference between CI and SI on ₹12,000 for 2 years at 10% is?",
        options: ["₹100", "₹120", "₹144", "₹200"],
        correctAnswer: "₹120",
        explanation: "Step 1: Shortcut for 2 years Difference = P * (R/100)^2.\nStep 2: Diff = 12000 * (10/100)^2 = 12000 * 0.01.\nStep 3: Diff = ₹120."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Medium",
        questionText: "A sum doubles itself in 8 years at CI. In how many years will it become four times?",
        options: ["12 years", "16 years", "24 years", "32 years"],
        correctAnswer: "16 years",
        explanation: "Step 1: Let P become 2P in 8 years (1 cycle).\nStep 2: To become 4 times (4P), it needs to double again. Since 4 = 2^2.\nStep 3: Total time = Power * Cycle time = 2 * 8 = 16 years."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Easy",
        questionText: "A sum becomes ₹24,200 in 2 years at 10% CI. Find the principal.",
        options: ["₹18000", "₹20000", "₹22000", "₹24000"],
        correctAnswer: "₹20000",
        explanation: "Step 1: A = P(1.1)^2.\nStep 2: 24200 = P * 1.21.\nStep 3: P = 24200 / 1.21 = ₹20000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Easy",
        questionText: "Find the CI on ₹8,000 for 2 years at 5% compounded annually.",
        options: ["₹800", "₹820", "₹840", "₹8820"],
        correctAnswer: "₹820",
        explanation: "Step 1: Amount = 8000 * (1 + 5/100)^2 = 8000 * (1.05)^2.\nStep 2: A = 8000 * 1.1025 = ₹8820.\nStep 3: CI = Amount - P = 8820 - 8000 = ₹820."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "A sum grows to ₹11,576.25 in 3 years at 5% compounded annually. Find the principal.",
        options: ["₹9000", "₹9500", "₹10000", "₹10500"],
        correctAnswer: "₹10000",
        explanation: "Step 1: Amount = P(1 + 5/100)^3 = P(1.05)^3.\nStep 2: 1.05^3 = 1.157625.\nStep 3: 11576.25 = P * 1.157625.\nStep 4: P = 11576.25 / 1.157625 = ₹10000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "Find the difference between CI and SI on ₹50,000 for 3 years at 8%.",
        options: ["₹900", "₹960", "₹985.6", "₹1000"],
        correctAnswer: "₹985.6",
        explanation: "Step 1: Formula for 3 years difference = P * (R/100)^2 * (3 + R/100).\nStep 2: Diff = 50000 * (8/100)^2 * (3 + 8/100).\nStep 3: Diff = 50000 * 0.0064 * 3.08.\nStep 4: Diff = 320 * 3.08 = ₹985.6."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "A sum amounts to ₹17,640 in 2 years and ₹19,404 in 3 years at CI. Find the rate.",
        options: ["8%", "10%", "12%", "15%"],
        correctAnswer: "10%",
        explanation: "Step 1: In CI, the amount at the end of the 2nd year acts as the principal for the 3rd year.\nStep 2: Interest for 3rd year = A3 - A2 = 19404 - 17640 = ₹1764.\nStep 3: Rate = (Interest * 100) / P(previous year) = (1764 * 100) / 17640.\nStep 4: Rate = 10%."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Medium",
        questionText: "The population of a town grows by 10% annually. If current population is 1,33,100, find population 3 years ago.",
        options: ["90,000", "1,00,000", "1,10,000", "1,20,000"],
        correctAnswer: "1,00,000",
        explanation: "Step 1: Current Population = P_ago * (1 + R/100)^3.\nStep 2: 133100 = P_ago * (1.1)^3.\nStep 3: 133100 = P_ago * 1.331.\nStep 4: P_ago = 133100 / 1.331 = 1,00,000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "A machine depreciates by 15% every year. If present value is ₹61,412.5, find its value 2 years ago.",
        options: ["₹80,000", "₹85,000", "₹90,000", "₹1,00,000"],
        correctAnswer: "₹85,000",
        explanation: "Step 1: Depreciation means the value decreases. Final Value = Initial Value * (1 - R/100)^n.\nStep 2: 61412.5 = P * (1 - 15/100)^2 = P * (0.85)^2.\nStep 3: 61412.5 = P * 0.7225.\nStep 4: P = 61412.5 / 0.7225 = ₹85,000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "A sum invested at CI becomes ₹48,400 in 2 years and ₹53,240 in 3 years. Find the Principal.",
        options: ["₹36,000", "₹38,000", "₹40,000", "₹42,000"],
        correctAnswer: "₹40,000",
        explanation: "Step 1: Interest for 3rd year = 53240 - 48400 = 4840.\nStep 2: Rate = (4840 / 48400) * 100 = 10%.\nStep 3: P * (1.1)^2 = A2 => P * 1.21 = 48400.\nStep 4: P = 48400 / 1.21 = ₹40,000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "Find CI on ₹25,000 for 1.5 years at 8% p.a., compounded annually.",
        options: ["₹3000", "₹3080", "₹3120", "₹3200"],
        correctAnswer: "₹3080",
        explanation: "Step 1: For 1.5 years compounded annually, A = P * (1 + 8/100)^1 * (1 + (0.5*8)/100).\nStep 2: A = 25000 * 1.08 * 1.04.\nStep 3: A = 25000 * 1.1232 = ₹28080.\nStep 4: CI = 28080 - 25000 = ₹3080."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Medium",
        questionText: "A sum becomes ₹1,21,000 in 2 years at 10% compounded annually. Find the principal.",
        options: ["₹90,000", "₹1,00,000", "₹1,10,000", "₹1,20,000"],
        correctAnswer: "₹1,00,000",
        explanation: "Step 1: A = P(1 + R/100)^T => 121000 = P(1.1)^2.\nStep 2: 121000 = P * 1.21.\nStep 3: P = 121000 / 1.21 = ₹1,00,000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "The difference between CI and SI for 2 years at 12% on a sum is ₹432. Find the principal.",
        options: ["₹25000", "₹28000", "₹30000", "₹35000"],
        correctAnswer: "₹30000",
        explanation: "Step 1: Formula for 2 years diff: Diff = P * (R/100)^2.\nStep 2: 432 = P * (12/100)^2 = P * 0.0144.\nStep 3: P = 432 / 0.0144.\nStep 4: P = ₹30000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "A sum doubles in 6 years under CI. What fraction of the original sum will it become in 18 years?",
        options: ["4 times", "6 times", "8 times", "12 times"],
        correctAnswer: "8 times",
        explanation: "Step 1: Under CI, if a sum becomes 'x' times in 'T' years, it becomes x^n times in nT years.\nStep 2: Here, it doubles (2 times) in 6 years.\nStep 3: 18 years = 3 * 6 years (so n=3).\nStep 4: It will become 2^3 = 8 times."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "A bank offers 8% CI compounded half-yearly. Find the amount on ₹50,000 after 2 years.",
        options: ["₹58,320", "₹58,492.93", "₹59,000", "₹60,000"],
        correctAnswer: "₹58,492.93",
        explanation: "Step 1: Since it's half-yearly, Rate = 8/2 = 4% per half-year. Time = 2 * 2 = 4 periods.\nStep 2: A = P(1 + 4/100)^4 = 50000 * (1.04)^4.\nStep 3: 1.04^4 ≈ 1.16985856.\nStep 4: A = 50000 * 1.16985856 = ₹58,492.93."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "A sum becomes ₹12,100 in 2 years and ₹13,310 in 3 years under CI. Find the Principal.",
        options: ["₹8000", "₹9000", "₹10000", "₹11000"],
        correctAnswer: "₹10000",
        explanation: "Step 1: Interest for 3rd year = 13310 - 12100 = 1210.\nStep 2: Rate = (1210 / 12100) * 100 = 10%.\nStep 3: A2 = P * (1.1)^2 => 12100 = P * 1.21.\nStep 4: P = 12100 / 1.21 = ₹10000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "The value of an asset depreciates by 20% annually. If it is worth ₹81,920 after 4 years, find its original value.",
        options: ["₹1,50,000", "₹1,80,000", "₹2,00,000", "₹2,50,000"],
        correctAnswer: "₹2,00,000",
        explanation: "Step 1: Depreciation formula: Final = Original * (1 - R/100)^T.\nStep 2: 81920 = P * (1 - 20/100)^4 = P * (0.8)^4.\nStep 3: (0.8)^4 = 0.4096.\nStep 4: 81920 = P * 0.4096 => P = 81920 / 0.4096 = ₹2,00,000."
    },
    {
        category: "Aptitude", topic: "Compound Interest", difficulty: "Hard",
        questionText: "A sum invested at CI amounts to ₹66,550 after 2 years and ₹73,205 after 3 years. Find the amount after 5 years.",
        options: ["₹80,525.5", "₹85,000", "₹88,578.05", "₹90,000"],
        correctAnswer: "₹88,578.05",
        explanation: "Step 1: Find Rate: Interest for 3rd year = 73205 - 66550 = 6655. R = (6655 / 66550) * 100 = 10%.\nStep 2: Find Principal: 66550 = P * (1.1)^2 => P = 66550 / 1.21 = 55000.\nStep 3: Amount after 5 years = P * (1.1)^5.\nStep 4: (1.1)^5 = 1.61051. Amount = 55000 * 1.61051 = ₹88,578.05."
    }
];

const seedBatch5Interest = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Simple/Compound Interest questions...");
        await Question.deleteMany({ topic: { $in: ["Simple Interest", "Compound Interest", "Simple & Compound Interest"] } }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting ${batch5Questions.length} Custom CI/SI Questions into the database...`);
        
        await Question.insertMany(batch5Questions);
        console.log(`✅ BOOM! Tumhara CI/SI data successfully seed ho gaya! Full mathematical explanations ke sath.`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch5Interest();