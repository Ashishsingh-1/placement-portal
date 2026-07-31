const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Advanced Partnership Seeding'))
  .catch(err => console.log(err));

const batch9AdvancedQuestions = [
    // --- 20 Retained Standard & Medium Questions ---
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A invests ₹50,000 for 12 months and B invests ₹80,000 for 9 months. If total profit is ₹44,000, find their shares.",
        options: ["A=20000, B=24000", "A=22000, B=22000", "A=18000, B=26000", "A=24000, B=20000"],
        correctAnswer: "A=20000, B=24000",
        explanation: "Effective capital A = 50k * 12 = 600k. B = 80k * 9 = 720k. Ratio = 600:720 = 5:6. Total parts = 11. 1 part = 4000. A = 20k, B = 24k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A invests ₹80,000 and B invests ₹1,20,000. After 4 months, A withdraws ₹20,000. Find profit-sharing ratio at year-end.",
        options: ["4:9", "5:9", "6:11", "7:12"],
        correctAnswer: "5:9",
        explanation: "A = (80k * 4) + (60k * 8) = 320k + 480k = 800k. B = 120k * 12 = 1440k. Ratio A:B = 800 : 1440 = 5:9."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A starts a business with ₹90,000. After 3 months, B joins with ₹60,000. If annual profit is ₹54,000, find B's share.",
        options: ["₹15,000", "₹16,000", "₹18,000", "₹20,000"],
        correctAnswer: "₹18,000",
        explanation: "A = 90k * 12 = 1080k. B = 60k * 9 = 540k. Ratio = 2:1. Total 3 parts = 54k. B's 1 part = 18k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A invests ₹70,000 for 12 months and B invests ₹50,000 for 8 months. Profit is ₹62,000. Find A's share.",
        options: ["₹36,000", "₹40,000", "₹42,000", "₹45,000"],
        correctAnswer: "₹42,000",
        explanation: "A = 70k * 12 = 840k. B = 50k * 8 = 400k. Ratio = 84:40 = 21:10. Total 31 parts = 62k. A = 21 * 2k = 42k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A invests ₹1,20,000. B joins after 4 months with ₹80,000. Profit is ₹1,30,000. Find their shares.",
        options: ["A=80k, B=50k", "A=90k, B=40k", "A=100k, B=30k", "A=70k, B=60k"],
        correctAnswer: "A=90k, B=40k",
        explanation: "A = 120k * 12 = 1440k. B = 80k * 8 = 640k. Ratio = 144:64 = 9:4. Total 13 parts = 130k. A = 90k, B = 40k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A and B invest ₹60,000 and ₹90,000. After 6 months, A doubles his investment. Find profit-sharing ratio.",
        options: ["1:1", "2:3", "3:4", "4:5"],
        correctAnswer: "1:1",
        explanation: "A = (60k * 6) + (120k * 6) = 1080k. B = 90k * 12 = 1080k. Ratio = 1:1."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A and B invest ₹80,000 and ₹1,20,000. After 3 months, B withdraws ₹40,000. Find final profit ratio.",
        options: ["4:5", "5:6", "8:9", "9:10"],
        correctAnswer: "8:9",
        explanation: "A = 80k * 12 = 960k. B = (120k * 3) + (80k * 9) = 1080k. Ratio = 960:1080 = 8:9."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A invests ₹50,000 for the whole year. B invests ₹75,000 after 4 months. Total profit is ₹66,000. Find B's share.",
        options: ["₹30,000", "₹33,000", "₹36,000", "₹40,000"],
        correctAnswer: "₹33,000",
        explanation: "A = 50k * 12 = 600k. B = 75k * 8 = 600k. Ratio 1:1. B = 66k / 2 = 33k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A, B and C share profit in ratio 3:4:5. If C gets ₹30,000 more than A, find total profit.",
        options: ["₹1,20,000", "₹1,50,000", "₹1,80,000", "₹2,00,000"],
        correctAnswer: "₹1,80,000",
        explanation: "Diff between C and A = 5 - 3 = 2 parts. 2 parts = 30k -> 1 part = 15k. Total = 12 parts * 15k = 180k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A invests ₹1,50,000. After 6 months B joins with ₹1,00,000. Profit is ₹1,20,000. Find A's share.",
        options: ["₹75,000", "₹80,000", "₹85,000", "₹90,000"],
        correctAnswer: "₹90,000",
        explanation: "A = 150k * 12 = 1800k. B = 100k * 6 = 600k. Ratio = 3:1. Total 4 parts = 120k. A = 3 * 30k = 90k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A invests ₹40,000 and B invests ₹60,000. After 8 months A withdraws half his investment. Find ratio of profits.",
        options: ["4:7", "5:8", "5:9", "6:11"],
        correctAnswer: "5:9",
        explanation: "A = (40k * 8) + (20k * 4) = 400k. B = 60k * 12 = 720k. Ratio = 40:72 = 5:9."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A invests ₹60,000. B invests ₹90,000 after 2 months. If profit is ₹72,000, find B's share.",
        options: ["₹32,000", "₹36,000", "₹40,000", "₹45,000"],
        correctAnswer: "₹40,000",
        explanation: "A = 60k * 12 = 720k. B = 90k * 10 = 900k. Ratio = 4:5. Total 9 parts = 72k. B = 5 * 8k = 40k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A invests ₹1,20,000 for 8 months and B invests ₹80,000 for 12 months. Profit is ₹88,000. Find profit ratio.",
        options: ["1:1", "2:3", "3:2", "4:3"],
        correctAnswer: "1:1",
        explanation: "A = 120k * 8 = 960k. B = 80k * 12 = 960k. Ratio = 1:1."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "Three partners invest in ratio 2:5:7. Total profit is ₹2,10,000. Find each share.",
        options: ["30k, 70k, 110k", "30k, 75k, 105k", "40k, 60k, 110k", "20k, 80k, 110k"],
        correctAnswer: "30k, 75k, 105k",
        explanation: "Total 14 parts = 210k -> 1 part = 15k. Shares = 2*15k, 5*15k, 7*15k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A invests ₹1,00,000 and B invests ₹1,50,000. After 4 months B adds ₹50,000 more. Find final ratio.",
        options: ["5:8", "6:11", "7:12", "8:13"],
        correctAnswer: "6:11",
        explanation: "A = 100k * 12 = 1200k. B = (150k * 4) + (200k * 8) = 2200k. Ratio = 12:22 = 6:11."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A, B and C invest ₹80,000, ₹1,20,000 and ₹1,60,000. After 6 months, C withdraws half. Profit is ₹1,44,000. Find C's share.",
        options: ["₹45,000", "₹48,000", "₹50,000", "₹54,000"],
        correctAnswer: "₹54,000",
        explanation: "A=960k, B=1440k, C=(160k*6)+(80k*6)=1440k. Ratio = 2:3:3. Total 8 parts=144k. C = 3*18k = 54k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A starts with ₹50,000. After 4 months he adds ₹25,000. B starts with ₹75,000 and withdraws ₹15,000 after 8 months. Find profit ratio.",
        options: ["18:19", "19:20", "20:21", "21:22"],
        correctAnswer: "20:21",
        explanation: "A = (50k * 4) + (75k * 8) = 800k. B = (75k * 8) + (60k * 4) = 840k. Ratio = 80:84 = 20:21."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A and B invest ₹1,00,000 and ₹80,000. After 5 months, A withdraws ₹20,000 while B adds ₹40,000. Find final ratio.",
        options: ["50:59", "51:60", "52:61", "53:62"],
        correctAnswer: "53:62",
        explanation: "A = (100k * 5) + (80k * 7) = 1060k. B = (80k * 5) + (120k * 7) = 1240k. Ratio = 106:124 = 53:62."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Medium",
        questionText: "A invests ₹60,000 for 12 months. B invests ₹80,000 for 9 months. C invests ₹1,20,000 for 6 months. Profit is ₹1,08,000. Find each share.",
        options: ["30000 each", "36000 each", "40000 each", "45000 each"],
        correctAnswer: "36000 each",
        explanation: "A=720k, B=720k, C=720k. Ratio is 1:1:1. Each gets 108k / 3 = 36k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A starts a business with ₹2,00,000. After 3 months, B joins with ₹1,50,000. After another 3 months, C joins with ₹1,00,000. At the end of the year, profit is ₹2,90,000. Find the share of each partner.",
        options: ["140k, 100k, 50k", "150k, 90k, 50k", "160k, 90k, 40k", "180k, 80k, 30k"],
        correctAnswer: "160k, 90k, 40k",
        explanation: "A = 200k*12 = 2400k. B = 150k*9 = 1350k. C = 100k*6 = 600k. Ratio = 16:9:4. Total 29 parts = 290k."
    },

    // --- 10 NEW ULTRA-ADVANCED PLACEMENT QUESTIONS ---
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A starts a business with ₹1,20,000. After 4 months, B joins with ₹1,80,000. After another 2 months, C joins with ₹2,40,000. After 3 more months, A withdraws 25% of his capital and B withdraws 1/3 of his capital. At the end of the year, the profit is ₹2,52,000. Find the share of each partner.",
        options: ["84k, 78.4k, 89.6k", "80k, 80k, 92k", "90k, 70k, 92k", "85k, 75k, 92k"],
        correctAnswer: "84k, 78.4k, 89.6k",
        explanation: "Step 1: The events happen at start (0m), 4m, 6m, and 9m. \nStep 2: A's capital = (120k * 9m) + (90k * 3m) = 1350k. \nStep 3: B joins at 4m. B's capital = (180k * 5m) + (120k * 3m) = 1260k. \nStep 4: C joins at 6m. C's capital = (240k * 6m) = 1440k. \nStep 5: Ratio A:B:C = 1350:1260:1440 = 15:14:16. Total parts = 45. \nStep 6: 45 parts = 252k => 1 part = 5.6k. Shares = 84k, 78.4k, 89.6k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A, B and C invest in a business. A invests twice the amount invested by B and B invests three times the amount invested by C. After 6 months, A withdraws half his investment while B doubles his investment. If total profit is ₹4,20,000, find C's share.",
        options: ["40k", "42k", "45k", "50k"],
        correctAnswer: "42k",
        explanation: "Step 1: Let C = x. Then B = 3x, A = 6x. \nStep 2: A's equivalent = (6x * 6) + (3x * 6) = 54x. \nStep 3: B's equivalent = (3x * 6) + (6x * 6) = 54x. \nStep 4: C's equivalent = (x * 12) = 12x. \nStep 5: Ratio = 54:54:12 = 9:9:2. Total parts = 20. \nStep 6: 20 parts = 420k => 1 part = 21k. C's share = 2 * 21k = 42k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A and B start a business with capitals in ratio 5:7. After 4 months, A adds 50% of his capital and B withdraws 20% of his capital. If profit after 1 year is ₹3,82,000, find their shares.",
        options: ["200k, 182k", "190k, 192k", "210k, 172k", "180k, 202k"],
        correctAnswer: "200k, 182k",
        explanation: "Step 1: Let initials be 50 and 70. \nStep 2: A adds 50% (25) -> becomes 75. B withdraws 20% (14) -> becomes 56. \nStep 3: A's equivalent = (50 * 4) + (75 * 8) = 200 + 600 = 800. \nStep 4: B's equivalent = (70 * 4) + (56 * 8) = 280 + 448 = 728. \nStep 5: Ratio = 800:728 = 100:91. Total = 191 parts. \nStep 6: 191 parts = 382k => 1 part = 2k. Shares = 200k, 182k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "Three partners A, B and C invest in ratio 4:5:6. After 3 months, A withdraws 25% of his investment, B adds 20%, and C withdraws 50%. At year end, total profit is ₹5,10,000. Find each share.",
        options: ["130k, 230k, 150k", "140k, 220k, 150k", "120k, 240k, 150k", "150k, 200k, 160k"],
        correctAnswer: "130k, 230k, 150k",
        explanation: "Step 1: Let initials be 4, 5, 6. \nStep 2: After 3m: A becomes 3, B becomes 6, C becomes 3. \nStep 3: A = (4*3) + (3*9) = 39. \nStep 4: B = (5*3) + (6*9) = 69. \nStep 5: C = (6*3) + (3*9) = 45. \nStep 6: Ratio = 39:69:45 = 13:23:15. Total = 51 parts. \nStep 7: 51 parts = 510k => 1 part = 10k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A starts with ₹2,00,000. After 4 months B joins with ₹3,00,000. After another 2 months C joins with ₹4,00,000. After 3 more months A doubles his capital. Profit at year end is ₹5,85,000. Find each share.",
        options: ["225k, 180k, 180k", "250k, 160k, 175k", "200k, 200k, 185k", "240k, 170k, 175k"],
        correctAnswer: "225k, 180k, 180k",
        explanation: "Step 1: A's timeline = 200k for 9m, then 400k for 3m. Total A = 1800k + 1200k = 3000k. \nStep 2: B's timeline = Joins at 4m, active for 8m. Total B = 300k * 8 = 2400k. \nStep 3: C's timeline = Joins at 6m, active for 6m. Total C = 400k * 6 = 2400k. \nStep 4: Ratio = 3000:2400:2400 = 5:4:4. Total 13 parts. \nStep 5: 13 parts = 585k => 1 part = 45k. Shares = 225k, 180k, 180k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A, B and C invest ₹60,000, ₹90,000 and ₹1,20,000 respectively. After every 3 months: A increases capital by ₹20,000, B decreases capital by ₹30,000, C doubles his current capital. Find profit-sharing ratio after one year.",
        options: ["2:1:10", "3:2:12", "1:1:5", "4:3:15"],
        correctAnswer: "2:1:10",
        explanation: "Step 1: Changes happen at 3m, 6m, 9m (4 quarters). \nStep 2: A's quarters = 60, 80, 100, 120. Total A = 360 * 3m = 1080. \nStep 3: B's quarters = 90, 60, 30, 0. Total B = 180 * 3m = 540. \nStep 4: C's quarters = 120, 240, 480, 960. Total C = 1800 * 3m = 5400. \nStep 5: Ratio = 1080:540:5400 = 108:54:540 = 2:1:10."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A and B start a business with equal capitals. After 6 months, A withdraws 40% of his capital while B adds 60% more capital. At year end, profit is ₹2,10,000. Find their shares.",
        options: ["80k, 130k", "90k, 120k", "100k, 110k", "70k, 140k"],
        correctAnswer: "80k, 130k",
        explanation: "Step 1: Let initial capital be 100. \nStep 2: A = (100 * 6) + (60 * 6) = 600 + 360 = 960. \nStep 3: B = (100 * 6) + (160 * 6) = 600 + 960 = 1560. \nStep 4: Ratio = 960:1560 = 24:39 = 8:13. Total parts = 21. \nStep 5: 21 parts = 210k => 1 part = 10k. A = 80k, B = 130k."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A, B, C and D enter into a partnership. Their capitals are in ratio 2:3:5:8. B joins after 3 months and D joins after 6 months. Profit at year end is ₹5,30,000. Find D's share.",
        options: ["1.6 Lakhs", "1.8 Lakhs", "2.0 Lakhs", "2.2 Lakhs"],
        correctAnswer: "1.6 Lakhs",
        explanation: "Step 1: A and C are active for 12 months. \nStep 2: A = 2 * 12 = 24. C = 5 * 12 = 60. \nStep 3: B is active for 9m. B = 3 * 9 = 27. \nStep 4: D is active for 6m. D = 8 * 6 = 48. \nStep 5: Ratio A:B:C:D = 24:27:60:48. Divide by 3 -> 8:9:20:16. Total parts = 53. \nStep 6: 53 parts = 5.3 Lakhs. D's share = 16 parts = 1.6 Lakhs."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A and B invest ₹1,50,000 and ₹2,00,000 respectively. After 5 months, A withdraws ₹50,000 and B adds ₹1,00,000. After another 3 months, both double their existing investments. Profit after 12 months is ₹7,38,000. Find each share.",
        options: ["A=2.22L, B=5.16L", "A=2.50L, B=4.88L", "A=2L, B=5.38L", "A=3L, B=4.38L"],
        correctAnswer: "A=2.22L, B=5.16L",
        explanation: "Step 1: Timeline A = 150k(5m), then 100k(3m), then 200k(4m). Total A = 750 + 300 + 800 = 1850. \nStep 2: Timeline B = 200k(5m), then 300k(3m), then 600k(4m). Total B = 1000 + 900 + 2400 = 4300. \nStep 3: Ratio A:B = 185:430 = 37:86. Total parts = 123. \nStep 4: 123 parts = 7.38 Lakhs => 1 part = 6000. A = 37*6000 = 2.22L, B = 86*6000 = 5.16L."
    },
    {
        category: "Aptitude", topic: "Partnership", difficulty: "Hard",
        questionText: "A starts with ₹3L. After 2m, B joins with ₹4L. After another 2m, C joins with ₹5L. After another 2m: A withdraws ₹1L, B adds ₹2L, C withdraws 40% capital. After another 2m: A doubles capital, B withdraws 25%, C adds ₹3L. Total profit after 12 months = ₹18,60,000. Find exact shares.",
        options: ["5.7L, 6.9L, 6.0L", "6.0L, 6.5L, 6.1L", "5.5L, 7.0L, 6.1L", "5.0L, 7.2L, 6.4L"],
        correctAnswer: "5.7L, 6.9L, 6.0L",
        explanation: "Step 1: A's timeline (0-6m, 6-8m, 8-12m) = 3L*6 + 2L*2 + 4L*4 = 18 + 4 + 16 = 38L. \nStep 2: B's timeline (2-6m, 6-8m, 8-12m) = 4L*4 + 6L*2 + 4.5L*4 = 16 + 12 + 18 = 46L. \nStep 3: C's timeline (4-6m, 6-8m, 8-12m) = 5L*2 + 3L*2 + 6L*4 = 10 + 6 + 24 = 40L. \nStep 4: Ratio = 38:46:40 = 19:23:20. Total = 62 parts. \nStep 5: 62 parts = 18.6L => 1 part = 30k. A = 5.7L, B = 6.9L, C = 6.0L."
    }
];

const seedBatch9PartnershipAdvanced = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Partnership questions to inject Advanced Batch...");
        await Question.deleteMany({ topic: "Partnership" }); 
        console.log("🗑️ Purana Partnership data safely deleted!");

        console.log(`🚀 Injecting ${batch9AdvancedQuestions.length} Custom Advanced Partnership Questions into the database...`);
        
        await Question.insertMany(batch9AdvancedQuestions);
        console.log(`✅ BOOM! Tumhara ultra-advanced 'Partnership' data successfully seed ho gaya!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch9PartnershipAdvanced();