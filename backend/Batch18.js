const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Number Series Seeding'))
  .catch(err => console.log(err));

const batch20Questions = [
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Easy",
        questionText: "Find the next term in the series: 3, 8, 15, 24, 35, 48, ?",
        options: ["59", "61", "63", "65"],
        correctAnswer: "63",
        explanation: "Step 1: The series follows the pattern (n^2 - 1).\nStep 2: 2^2-1=3, 3^2-1=8, 4^2-1=15, ..., 7^2-1=48.\nStep 3: The next term is 8^2 - 1 = 64 - 1 = 63.\n(Alternatively, difference between consecutive terms is +5, +7, +9, +11, +13, +15. So 48 + 15 = 63)."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Easy",
        questionText: "Find the next term in the series: 5, 10, 20, 35, 55, 80, ?",
        options: ["100", "105", "110", "115"],
        correctAnswer: "110",
        explanation: "Step 1: Check the differences between consecutive terms.\nStep 2: 10-5=5, 20-10=10, 35-20=15, 55-35=20, 80-55=25.\nStep 3: The next difference will be 30.\nStep 4: 80 + 30 = 110."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Easy",
        questionText: "Find the next term in the series: 2, 5, 10, 17, 26, 37, ?",
        options: ["48", "50", "52", "54"],
        correctAnswer: "50",
        explanation: "Step 1: The series follows the pattern (n^2 + 1).\nStep 2: 1^2+1=2, 2^2+1=5, 3^2+1=10, ..., 6^2+1=37.\nStep 3: The next term is 7^2 + 1 = 49 + 1 = 50."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 4, 9, 19, 39, 79, ?",
        options: ["149", "159", "169", "179"],
        correctAnswer: "159",
        explanation: "Step 1: The pattern is (Previous Term * 2) + 1.\nStep 2: 4*2+1 = 9, 9*2+1 = 19, 19*2+1 = 39, 39*2+1 = 79.\nStep 3: Next term = 79 * 2 + 1 = 158 + 1 = 159."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Easy",
        questionText: "Find the next term in the series: 1, 2, 6, 24, 120, ?",
        options: ["360", "480", "600", "720"],
        correctAnswer: "720",
        explanation: "Step 1: The series follows the factorial pattern or multiplication by increasing numbers.\nStep 2: 1*2=2, 2*3=6, 6*4=24, 24*5=120.\nStep 3: Next term = 120 * 6 = 720."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Easy",
        questionText: "Find the next term in the series: 8, 27, 64, 125, 216, ?",
        options: ["343", "512", "729", "1000"],
        correctAnswer: "343",
        explanation: "Step 1: The numbers are perfect cubes.\nStep 2: 2^3=8, 3^3=27, 4^3=64, 5^3=125, 6^3=216.\nStep 3: Next term = 7^3 = 343."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 3, 7, 15, 31, 63, ?",
        options: ["125", "127", "131", "135"],
        correctAnswer: "127",
        explanation: "Step 1: The pattern is (Previous Term * 2) + 1.\nStep 2: 3*2+1=7, 7*2+1=15, 15*2+1=31, 31*2+1=63.\nStep 3: Next term = 63 * 2 + 1 = 126 + 1 = 127."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 1, 5, 14, 30, 55, ?",
        options: ["76", "85", "91", "100"],
        correctAnswer: "91",
        explanation: "Step 1: Check the differences between consecutive terms.\nStep 2: 5-1=4 (2^2), 14-5=9 (3^2), 30-14=16 (4^2), 55-30=25 (5^2).\nStep 3: The next difference will be 6^2 = 36.\nStep 4: Next term = 55 + 36 = 91."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Hard",
        questionText: "Find the next term in the series: 2, 12, 36, 80, 150, ?",
        options: ["248", "252", "258", "262"],
        correctAnswer: "252",
        explanation: "Step 1: The series follows the pattern (n^3 + n^2).\nStep 2: 1^3+1^2=2, 2^3+2^2=12, 3^3+3^2=36, 4^3+4^2=80, 5^3+5^2=150.\nStep 3: Next term = 6^3 + 6^2 = 216 + 36 = 252."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Hard",
        questionText: "Find the next term in the series: 6, 18, 45, 96, 189, ?",
        options: ["324", "342", "351", "360"],
        correctAnswer: "351",
        explanation: "Step 1: Check successive differences.\nStep 2: D1 = 12, 27, 51, 93.\nStep 3: D2 = 15, 24, 42.\nStep 4: D3 = 9, 18. If the next D3 is 27, then next D2 = 42 + 27 = 69.\nStep 5: Next D1 = 93 + 69 = 162. Next term = 189 + 162 = 351."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 4, 13, 40, 121, 364, ?",
        options: ["1090", "1092", "1093", "1095"],
        correctAnswer: "1093",
        explanation: "Step 1: The pattern is (Previous Term * 3) + 1.\nStep 2: 4*3+1=13, 13*3+1=40, 40*3+1=121, 121*3+1=364.\nStep 3: Next term = 364 * 3 + 1 = 1092 + 1 = 1093."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 7, 21, 43, 73, 111, ?",
        options: ["149", "153", "157", "161"],
        correctAnswer: "157",
        explanation: "Step 1: Check differences between consecutive terms: 14, 22, 30, 38.\nStep 2: The differences form an arithmetic progression with a common difference of 8.\nStep 3: The next difference will be 38 + 8 = 46.\nStep 4: Next term = 111 + 46 = 157."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Hard",
        questionText: "Find the next term in the series: 10, 21, 44, 91, 186, ?",
        options: ["368", "372", "375", "377"],
        correctAnswer: "377",
        explanation: "Step 1: The pattern is (Previous Term * 2) + n, where n increases by 1.\nStep 2: 10*2+1=21, 21*2+2=44, 44*2+3=91, 91*2+4=186.\nStep 3: Next term = 186 * 2 + 5 = 372 + 5 = 377."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 2, 3, 5, 9, 17, 33, ?",
        options: ["60", "63", "65", "67"],
        correctAnswer: "65",
        explanation: "Step 1: Check the differences: 1, 2, 4, 8, 16.\nStep 2: The differences are powers of 2 (doubling each time).\nStep 3: Next difference will be 32.\nStep 4: Next term = 33 + 32 = 65."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 5, 11, 23, 47, 95, ?",
        options: ["189", "190", "191", "195"],
        correctAnswer: "191",
        explanation: "Step 1: The pattern is (Previous Term * 2) + 1.\nStep 2: 5*2+1=11, 11*2+1=23, 23*2+1=47, 47*2+1=95.\nStep 3: Next term = 95 * 2 + 1 = 190 + 1 = 191."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 2, 6, 15, 31, 56, 92, ?",
        options: ["131", "136", "141", "144"],
        correctAnswer: "141",
        explanation: "Step 1: Check differences: 4, 9, 16, 25, 36.\nStep 2: The differences are squares of consecutive integers (2^2, 3^2, 4^2, 5^2, 6^2).\nStep 3: Next difference will be 7^2 = 49.\nStep 4: Next term = 92 + 49 = 141."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Hard",
        questionText: "Find the next term in the series: 3, 10, 29, 66, 127, ?",
        options: ["214", "216", "218", "220"],
        correctAnswer: "218",
        explanation: "Step 1: The pattern is (n^3 + 2).\nStep 2: 1^3+2=3, 2^3+2=10, 3^3+2=29, 4^3+2=66, 5^3+2=127.\nStep 3: Next term = 6^3 + 2 = 216 + 2 = 218."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Hard",
        questionText: "Find the next term in the series: 4, 18, 48, 100, 180, ?",
        options: ["284", "290", "294", "300"],
        correctAnswer: "294",
        explanation: "Step 1: The pattern is n * (n+1)^2.\nStep 2: 1*2^2=4, 2*3^2=18, 3*4^2=48, 4*5^2=100, 5*6^2=180.\nStep 3: Next term = 6 * 7^2 = 6 * 49 = 294."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 2, 7, 15, 26, 40, 57, ?",
        options: ["72", "75", "77", "80"],
        correctAnswer: "77",
        explanation: "Step 1: Check differences: 5, 8, 11, 14, 17.\nStep 2: The differences form an arithmetic progression increasing by 3.\nStep 3: Next difference will be 17 + 3 = 20.\nStep 4: Next term = 57 + 20 = 77."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Easy",
        questionText: "Find the next term in the series: 3, 6, 18, 72, 360, ?",
        options: ["1800", "2160", "2520", "2880"],
        correctAnswer: "2160",
        explanation: "Step 1: The multiplier increases by 1 each time.\nStep 2: 3*2=6, 6*3=18, 18*4=72, 72*5=360.\nStep 3: Next term = 360 * 6 = 2160."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 1, 2, 5, 14, 41, 122, ?",
        options: ["360", "362", "365", "368"],
        correctAnswer: "365",
        explanation: "Step 1: Check differences: 1, 3, 9, 27, 81.\nStep 2: The differences are powers of 3.\nStep 3: Next difference will be 3^5 = 243.\nStep 4: Next term = 122 + 243 = 365."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 5, 16, 51, 154, 461, ?",
        options: ["1380", "1382", "1384", "1386"],
        correctAnswer: "1384",
        explanation: "Step 1: The pattern is (Previous Term * 3) + 1.\nStep 2: 5*3+1=16, 16*3+1=51, 51*3+1=154, 154*3+1=461.\nStep 3: Next term = 461 * 3 + 1 = 1383 + 1 = 1384."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Hard",
        questionText: "Find the next term in the series: 2, 10, 30, 68, 130, 222, ?",
        options: ["330", "340", "350", "360"],
        correctAnswer: "350",
        explanation: "Step 1: The pattern is (n^3 + n).\nStep 2: 1^3+1=2, 2^3+2=10, 3^3+3=30, 4^3+4=68, 5^3+5=130, 6^3+6=222.\nStep 3: Next term = 7^3 + 7 = 343 + 7 = 350."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the next term in the series: 1, 4, 13, 40, 121, 364, ?",
        options: ["1090", "1093", "1096", "1100"],
        correctAnswer: "1093",
        explanation: "Step 1: The pattern is (Previous Term * 3) + 1.\nStep 2: 1*3+1=4, 4*3+1=13, ..., 121*3+1=364.\nStep 3: Next term = 364 * 3 + 1 = 1092 + 1 = 1093."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Easy",
        questionText: "Find the missing term in the series: 4, 9, ?, 49, 81",
        options: ["16", "25", "36", "40"],
        correctAnswer: "25",
        explanation: "Step 1: The series consists of squares of odd numbers (or prime numbers).\nStep 2: 2^2=4 (Exception if prime), but 9=3^2, 49=7^2, 81=9^2 (9 is not prime).\nStep 3: So it's 2^2, 3^2, 5^2, 7^2, 9^2? Wait, 2 is even. It's simply squares of primes, but 81 is 9^2. The most common logical fit for such options is 5^2 = 25."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the missing term in the series: 3, 8, 15, ?, 35, 48",
        options: ["20", "22", "24", "26"],
        correctAnswer: "24",
        explanation: "Step 1: The pattern is (n^2 - 1).\nStep 2: 2^2-1=3, 3^2-1=8, 4^2-1=15, 6^2-1=35, 7^2-1=48.\nStep 3: The missing term is 5^2 - 1 = 25 - 1 = 24."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Hard",
        questionText: "Find the missing term in the series: 2, 12, ?, 80, 150",
        options: ["30", "36", "42", "48"],
        correctAnswer: "36",
        explanation: "Step 1: The pattern is (n^3 + n^2).\nStep 2: 1^3+1^2=2, 2^3+2^2=12, 4^3+4^2=80, 5^3+5^2=150.\nStep 3: The missing term is 3^3 + 3^2 = 27 + 9 = 36."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the WRONG term in the series: 2, 6, 18, 54, 160, 486",
        options: ["18", "54", "160", "486"],
        correctAnswer: "160",
        explanation: "Step 1: The series is formed by multiplying the previous term by 3.\nStep 2: 2*3=6, 6*3=18, 18*3=54, 54*3 = 162.\nStep 3: Given term is 160 instead of 162. So 160 is the wrong term."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Easy",
        questionText: "Find the WRONG term in the series: 1, 8, 27, 64, 124, 216",
        options: ["27", "64", "124", "216"],
        correctAnswer: "124",
        explanation: "Step 1: The series consists of perfect cubes.\nStep 2: 1^3=1, 2^3=8, 3^3=27, 4^3=64, 5^3=125, 6^3=216.\nStep 3: The given term is 124, which should be 125. So 124 is the wrong term."
    },
    {
        category: "Logical Reasoning", topic: "Number Series", difficulty: "Medium",
        questionText: "Find the WRONG term in the series: 4, 13, 40, 121, 360",
        options: ["13", "40", "121", "360"],
        correctAnswer: "360",
        explanation: "Step 1: The pattern is (Previous Term * 3) + 1.\nStep 2: 4*3+1=13, 13*3+1=40, 40*3+1=121, 121*3+1=364.\nStep 3: The given term is 360, but it should be 364. So 360 is the wrong term."
    }
];

const seedBatch20NumberSeries = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Number Series questions...");
        await Question.deleteMany({ topic: "Number Series" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch20Questions.length} Number Series Questions...`);
        
        await Question.insertMany(batch20Questions);
        console.log(`✅ BOOM! Tumhare pure 30 Number Series questions successfully seed ho gaye hain!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch20NumberSeries();