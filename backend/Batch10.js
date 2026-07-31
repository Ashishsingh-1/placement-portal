const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Detailed Advanced Partnership Seeding'))
  .catch(err => console.log(err));

const detailedAdvancedQuestions = [
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A starts a business with ₹1,20,000. After 4 months, B joins with ₹1,80,000. After another 2 months, C joins with ₹2,40,000. After 3 more months, A withdraws 25% of his capital and B withdraws 1/3 of his capital. At the end of the year, the profit is ₹2,52,000. Find the share of each partner.",
        options: ["84k, 78.4k, 89.6k", "80k, 80k, 92k", "90k, 70k, 92k", "85k, 75k, 92k"],
        correctAnswer: "84k, 78.4k, 89.6k",
        explanation: "CONCEPT: Effective Capital = Investment × Time.\n\nSTEP 1 (A's Timeline): A starts at month 0. At month 9 (4+2+3), A withdraws 25% of 120k = 30k. So, A has 120k for 9 months, and 90k for the last 3 months.\nA's Capital = (120 × 9) + (90 × 3) = 1080 + 270 = 1350 units.\n\nSTEP 2 (B's Timeline): B joins at month 4. At month 9, B withdraws 1/3 of 180k = 60k. B's 180k was active for 5 months (month 4 to 9), and 120k for the last 3 months.\nB's Capital = (180 × 5) + (120 × 3) = 900 + 360 = 1260 units.\n\nSTEP 3 (C's Timeline): C joins at month 6 with 240k and makes no changes. C is active for 6 months (month 6 to 12).\nC's Capital = 240 × 6 = 1440 units.\n\nSTEP 4 (Ratio & Profit): Ratio A:B:C = 1350 : 1260 : 1440. Dividing by 90 gives 15 : 14 : 16.\nTotal parts = 45. Profit = 252k.\n1 part = 252k / 45 = 5.6k.\nShares: A = 15 × 5.6k = 84k, B = 14 × 5.6k = 78.4k, C = 16 × 5.6k = 89.6k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A, B and C invest in a business. A invests twice the amount invested by B and B invests three times the amount invested by C. After 6 months, A withdraws half his investment while B doubles his investment. If total profit is ₹4,20,000, find C's share.",
        options: ["40k", "42k", "45k", "50k"],
        correctAnswer: "42k",
        explanation: "STEP 1 (Initial Investments): Let C = x. Then B = 3x, and A = 2(3x) = 6x.\n\nSTEP 2 (A's Timeline): A has 6x for 6 months. Then withdraws half, leaving 3x for 6 months.\nA's Capital = (6x × 6) + (3x × 6) = 36x + 18x = 54x.\n\nSTEP 3 (B's Timeline): B has 3x for 6 months. Then doubles it to 6x for 6 months.\nB's Capital = (3x × 6) + (6x × 6) = 18x + 36x = 54x.\n\nSTEP 4 (C's Timeline): C has x for all 12 months.\nC's Capital = x × 12 = 12x.\n\nSTEP 5 (Ratio & Profit): Ratio A:B:C = 54x : 54x : 12x = 9:9:2.\nTotal parts = 9 + 9 + 2 = 20 parts.\n20 parts = 420k => 1 part = 21k.\nC's share = 2 parts = 2 × 21k = 42k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A and B start a business with capitals in ratio 5:7. After 4 months, A adds 50% of his capital and B withdraws 20% of his capital. If profit after 1 year is ₹3,82,000, find their shares.",
        options: ["200k, 182k", "190k, 192k", "210k, 172k", "180k, 202k"],
        correctAnswer: "200k, 182k",
        explanation: "STEP 1 (Initial Capitals): Let A's initial capital = 50 and B's = 70 (using 10x for easy percentage calculation).\n\nSTEP 2 (A's Timeline): A has 50 for 4 months. Adds 50% of 50 (+25) = 75 for remaining 8 months.\nA's Capital = (50 × 4) + (75 × 8) = 200 + 600 = 800 units.\n\nSTEP 3 (B's Timeline): B has 70 for 4 months. Withdraws 20% of 70 (-14) = 56 for remaining 8 months.\nB's Capital = (70 × 4) + (56 × 8) = 280 + 448 = 728 units.\n\nSTEP 4 (Ratio & Profit): Ratio A:B = 800 : 728. Divide by 8 gives 100 : 91.\nTotal parts = 191.\n191 parts = 382k => 1 part = 2k.\nShares: A = 100 × 2k = 200k, B = 91 × 2k = 182k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "Three partners A, B and C invest in ratio 4:5:6. After 3 months, A withdraws 25% of his investment, B adds 20%, and C withdraws 50%. At year end, total profit is ₹5,10,000. Find each share.",
        options: ["130k, 230k, 150k", "140k, 220k, 150k", "120k, 240k, 150k", "150k, 200k, 160k"],
        correctAnswer: "130k, 230k, 150k",
        explanation: "STEP 1 (Initial Capitals): Let A = 4, B = 5, C = 6.\n\nSTEP 2 (A's Timeline): A has 4 for 3 months. Withdraws 25% of 4 (-1) = 3 for 9 months.\nA's Capital = (4 × 3) + (3 × 9) = 12 + 27 = 39 units.\n\nSTEP 3 (B's Timeline): B has 5 for 3 months. Adds 20% of 5 (+1) = 6 for 9 months.\nB's Capital = (5 × 3) + (6 × 9) = 15 + 54 = 69 units.\n\nSTEP 4 (C's Timeline): C has 6 for 3 months. Withdraws 50% of 6 (-3) = 3 for 9 months.\nC's Capital = (6 × 3) + (3 × 9) = 18 + 27 = 45 units.\n\nSTEP 5 (Ratio & Profit): Ratio A:B:C = 39 : 69 : 45. Divide by 3 gives 13 : 23 : 15.\nTotal parts = 51.\n51 parts = 510k => 1 part = 10k.\nShares: A = 130k, B = 230k, C = 150k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A starts with ₹2,00,000. After 4 months B joins with ₹3,00,000. After another 2 months C joins with ₹4,00,000. After 3 more months A doubles his capital. Profit at year end is ₹5,85,000. Find each share.",
        options: ["225k, 180k, 180k", "250k, 160k, 175k", "200k, 200k, 185k", "240k, 170k, 175k"],
        correctAnswer: "225k, 180k, 180k",
        explanation: "STEP 1 (A's Timeline): A starts at month 0. At month 9 (4+2+3), A doubles his 200k to 400k.\nA's Capital = (200k × 9) + (400k × 3) = 1800k + 1200k = 3000k units.\n\nSTEP 2 (B's Timeline): B joins at month 4. Active for remaining 8 months.\nB's Capital = 300k × 8 = 2400k units.\n\nSTEP 3 (C's Timeline): C joins at month 6 (4+2). Active for remaining 6 months.\nC's Capital = 400k × 6 = 2400k units.\n\nSTEP 4 (Ratio & Profit): Ratio A:B:C = 3000 : 2400 : 2400 = 5 : 4 : 4.\nTotal parts = 13.\n13 parts = 585k => 1 part = 45k.\nShares: A = 5 × 45k = 225k, B = 4 × 45k = 180k, C = 4 × 45k = 180k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A, B and C invest ₹60,000, ₹90,000 and ₹1,20,000 respectively. After every 3 months: A increases capital by ₹20,000, B decreases capital by ₹30,000, C doubles his current capital. Find profit-sharing ratio after one year.",
        options: ["2:1:10", "3:2:12", "1:1:5", "4:3:15"],
        correctAnswer: "2:1:10",
        explanation: "Changes happen at Q1 (3m), Q2 (6m), Q3 (9m).\n\nSTEP 1 (A's Capital): Starts at 60. Then 80, 100, 120. \nA = (60×3) + (80×3) + (100×3) + (120×3) = 180 + 240 + 300 + 360 = 1080 units.\n\nSTEP 2 (B's Capital): Starts at 90. Then 60, 30, 0.\nB = (90×3) + (60×3) + (30×3) + (0×3) = 270 + 180 + 90 + 0 = 540 units.\n\nSTEP 3 (C's Capital): Starts at 120. Then 240, 480, 960.\nC = (120×3) + (240×3) + (480×3) + (960×3) = 360 + 720 + 1440 + 2880 = 5400 units.\n\nSTEP 4 (Ratio): A:B:C = 1080 : 540 : 5400. \nDivide by 540 gives 2 : 1 : 10."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A and B start a business with equal capitals. After 6 months, A withdraws 40% of his capital while B adds 60% more capital. At year end, profit is ₹2,10,000. Find their shares.",
        options: ["80k, 130k", "90k, 120k", "100k, 110k", "70k, 140k"],
        correctAnswer: "80k, 130k",
        explanation: "STEP 1: Let initial capital of both A and B be 100.\n\nSTEP 2 (A's Timeline): A has 100 for 6 months. Withdraws 40% (-40) leaving 60 for 6 months.\nA's Capital = (100 × 6) + (60 × 6) = 600 + 360 = 960 units.\n\nSTEP 3 (B's Timeline): B has 100 for 6 months. Adds 60% (+60) making it 160 for 6 months.\nB's Capital = (100 × 6) + (160 × 6) = 600 + 960 = 1560 units.\n\nSTEP 4 (Ratio & Profit): Ratio A:B = 960 : 1560. Divide by 120 gives 8 : 13.\nTotal parts = 21.\n21 parts = 210k => 1 part = 10k.\nShares: A = 8 × 10k = 80k, B = 13 × 10k = 130k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A, B, C and D enter into a partnership. Their capitals are in ratio 2:3:5:8. B joins after 3 months and D joins after 6 months. Profit at year end is ₹5,30,000. Find D's share.",
        options: ["1.6 Lakhs", "1.8 Lakhs", "2.0 Lakhs", "2.2 Lakhs"],
        correctAnswer: "1.6 Lakhs",
        explanation: "STEP 1 (A & C Timeline): A and C start from month 0 and stay for 12 months.\nA's Capital = 2 × 12 = 24. C's Capital = 5 × 12 = 60.\n\nSTEP 2 (B's Timeline): B joins at month 3, so active for 9 months.\nB's Capital = 3 × 9 = 27.\n\nSTEP 3 (D's Timeline): D joins at month 6, active for 6 months.\nD's Capital = 8 × 6 = 48.\n\nSTEP 4 (Ratio & Profit): Ratio A:B:C:D = 24 : 27 : 60 : 48. Divide by 3 gives 8 : 9 : 20 : 16.\nTotal parts = 8 + 9 + 20 + 16 = 53 parts.\n53 parts = 5.3 Lakhs => 1 part = 0.1 Lakh (10k).\nD's share = 16 parts = 1.6 Lakhs."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A and B invest ₹1,50,000 and ₹2,00,000 respectively. After 5 months, A withdraws ₹50,000 and B adds ₹1,00,000. After another 3 months, both double their existing investments. Profit after 12 months is ₹7,38,000. Find each share.",
        options: ["A=2.22L, B=5.16L", "A=2.50L, B=4.88L", "A=2L, B=5.38L", "A=3L, B=4.38L"],
        correctAnswer: "A=2.22L, B=5.16L",
        explanation: "Changes happen at month 5 and month 8 (5+3). Last phase is 4 months (12-8).\n\nSTEP 1 (A's Timeline): Phase 1 (5m) = 150k. Phase 2 (3m) = 150k - 50k = 100k. Phase 3 (4m) = 100k × 2 = 200k.\nA = (150 × 5) + (100 × 3) + (200 × 4) = 750 + 300 + 800 = 1850 units.\n\nSTEP 2 (B's Timeline): Phase 1 (5m) = 200k. Phase 2 (3m) = 200k + 100k = 300k. Phase 3 (4m) = 300k × 2 = 600k.\nB = (200 × 5) + (300 × 3) + (600 × 4) = 1000 + 900 + 2400 = 4300 units.\n\nSTEP 3 (Ratio & Profit): Ratio A:B = 1850 : 4300 = 37 : 86.\nTotal parts = 123. Profit = 7.38L.\n1 part = 7.38L / 123 = 6000 (0.06L).\nShares: A = 37 × 6k = 2.22 Lakhs, B = 86 × 6k = 5.16 Lakhs."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A starts with ₹3L. After 2m, B joins with ₹4L. After another 2m, C joins with ₹5L. After another 2m: A withdraws ₹1L, B adds ₹2L, C withdraws 40% capital. After another 2m: A doubles capital, B withdraws 25%, C adds ₹3L. Total profit after 12 months = ₹18,60,000. Find exact shares.",
        options: ["5.7L, 6.9L, 6.0L", "6.0L, 6.5L, 6.1L", "5.5L, 7.0L, 6.1L", "5.0L, 7.2L, 6.4L"],
        correctAnswer: "5.7L, 6.9L, 6.0L",
        explanation: "This is a 4-phase timeline: 0-6m, 6-8m, 8-12m. Let's break it down.\n\nSTEP 1 (A's Timeline): Starts at 0m. At 6m (2+2+2), withdraws 1L (has 2L). At 8m, doubles 2L (has 4L).\nA = (3L × 6m) + (2L × 2m) + (4L × 4m) = 18 + 4 + 16 = 38L units.\n\nSTEP 2 (B's Timeline): Joins at 2m. At 6m, adds 2L (has 6L). At 8m, withdraws 25% of 6L (has 4.5L).\nB = (4L × 4m) + (6L × 2m) + (4.5L × 4m) = 16 + 12 + 18 = 46L units.\n\nSTEP 3 (C's Timeline): Joins at 4m. At 6m, withdraws 40% of 5L (has 3L). At 8m, adds 3L (has 6L).\nC = (5L × 2m) + (3L × 2m) + (6L × 4m) = 10 + 6 + 24 = 40L units.\n\nSTEP 4 (Ratio & Profit): Ratio A:B:C = 38 : 46 : 40 = 19 : 23 : 20. Total parts = 62.\n62 parts = 18.6L => 1 part = 30k (0.3L).\nShares: A = 19 × 0.3L = 5.7L. B = 23 × 0.3L = 6.9L. C = 20 × 0.3L = 6.0L."
    }
];

const seedAdvancedPartnership = async () => {
    try {
        console.log("🧹 ALERT: Wiping old Partnership data for the Masterclass Version...");
        await Question.deleteMany({ topic: "Partnership" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting ${detailedAdvancedQuestions.length} Masterclass Partnership Questions...`);
        
        await Question.insertMany(detailedAdvancedQuestions);
        console.log(`✅ BOOM! Tumhare 10 Ultra-Advanced Questions detailed explanations ke sath successfully seed ho gaye!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedAdvancedPartnership();