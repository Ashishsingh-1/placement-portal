const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');
 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Cubes & Dice Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch37Questions = [
    // ================== SET 1: Dice Basics & Face Identification ==================
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Easy",
        questionText: "**Q1.** A standard dice has faces numbered 1 to 6. If face 2 is opposite face 5, and face 1 is adjacent to both 2 and 5, which face is opposite to 1?",
        options: ["3", "4", "5", "6"], correctAnswer: "6",
        explanation: "In a standard dice, the sum of opposite faces is always 7. Therefore, 1 is opposite to 6, 2 is opposite to 5, and 3 is opposite to 4."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q2.** Two positions of the same dice are shown:\nPosition 1: Top = 1, Front = 2, Right = 3\nPosition 2: Top = 2, Front = 6, Right = 3\nFind the face opposite to 3.",
        options: ["1", "4", "5", "6"], correctAnswer: "4",
        explanation: "Since the 'Right' face is 3 in both views, the dice was rotated around the axis passing through the Right and Left faces. In Pos 1, Top=1 and Front=2. In Pos 2, Top=2 and Front=6. This means 1 is opposite to 6. So the faces 1, 2, 6, and 5 (opposite 2) revolve around 3. If standard conventions apply, 3 is opposite to 4."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q3.** Three different views of a dice are: (1, 2, 3), (1, 4, 5), and (2, 4, 6). Which face is opposite to 1?",
        options: ["2", "3", "4", "6"], correctAnswer: "6",
        explanation: "From the first two views, the face '1' is adjacent to 2, 3, 4, and 5. The only face remaining that cannot be adjacent to 1 is 6. Hence, 6 is opposite to 1."
    },

    // ================== SET 2: Dice Probability ==================
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Easy",
        questionText: "**Q4.** A dice is rolled twice. What is the probability that the sum of the two top faces is 9?",
        options: ["1/9", "1/12", "1/6", "5/36"], correctAnswer: "1/9",
        explanation: "Pairs that sum to 9: (3,6), (4,5), (5,4), (6,3). Total favorable outcomes = 4. Total possible outcomes = 36. Probability = 4/36 = 1/9."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Easy",
        questionText: "**Q5.** A dice is painted and rolled. What is the probability that an even-numbered face appears?",
        options: ["1/2", "1/3", "1/4", "1/6"], correctAnswer: "1/2",
        explanation: "The word 'painted' is a distractor. The even numbers on a dice are 2, 4, and 6 (3 outcomes). Probability = 3/6 = 1/2."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q6.** A standard dice is rolled 3 times. Find the probability that all outcomes are different.",
        options: ["1/6", "5/9", "4/9", "5/12"], correctAnswer: "5/9",
        explanation: "First roll can be anything (6 options). Second roll must be different (5 options). Third roll must be different from first two (4 options). Total combinations = 6 × 5 × 4 = 120. Total sample space = 6³ = 216. Prob = 120/216 = 5/9."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Hard",
        questionText: "**Q7.** What is the probability that the product of two dice outcomes is divisible by 6?",
        options: ["11/36", "5/12", "15/36", "17/36"], correctAnswer: "5/12",
        explanation: "Product is divisible by 6 if at least one die is a 6 (11 cases) OR if one die is even and the other is a multiple of 3 (excluding the 6s). These are (2,3), (3,2), (4,3), (3,4) = 4 cases. Total favorable = 11 + 4 = 15. Probability = 15/36 = 5/12."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q8.** Two dice are thrown simultaneously. Find the probability of obtaining exactly one prime number.",
        options: ["1/4", "1/2", "5/12", "7/18"], correctAnswer: "1/2",
        explanation: "Primes on a dice: 2, 3, 5 (3 numbers). Non-primes: 1, 4, 6 (3 numbers). We need exactly one prime: (Prime, Non-Prime) = 3×3 = 9 cases. (Non-Prime, Prime) = 3×3 = 9 cases. Total = 18 cases. Prob = 18/36 = 1/2."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Hard",
        questionText: "**Q9.** A dice is thrown until a 6 appears. Find the probability that the first 6 appears exactly on the third throw.",
        options: ["25/216", "1/216", "5/216", "25/36"], correctAnswer: "25/216",
        explanation: "Sequence must be: (Not 6) and (Not 6) and (6). Probability = (5/6) × (5/6) × (1/6) = 25/216."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Easy",
        questionText: "**Q10.** Three dice are thrown together. Find the probability that all show the same number.",
        options: ["1/36", "1/216", "1/18", "1/6"], correctAnswer: "1/36",
        explanation: "Favorable outcomes: (1,1,1), (2,2,2), (3,3,3), (4,4,4), (5,5,5), (6,6,6) = 6 cases. Total outcomes = 216. Prob = 6/216 = 1/36."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Easy",
        questionText: "**Q11.** A dice has its faces numbered: 1, 2, 2, 3, 3, 6. Find the probability of getting a number greater than 2.",
        options: ["1/3", "1/2", "2/3", "1/6"], correctAnswer: "1/2",
        explanation: "Faces strictly greater than 2 are: 3, 3, 6 (Total 3 faces). Total faces = 6. Prob = 3/6 = 1/2."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q12.** Two fair dice are thrown. Find the probability that the sum is neither 7 nor 11.",
        options: ["2/9", "7/9", "5/6", "8/9"], correctAnswer: "7/9",
        explanation: "Sums to 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 cases. Sums to 11: (5,6),(6,5) = 2 cases. Total = 8 cases. Neither = 36 - 8 = 28. Prob = 28/36 = 7/9."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Hard",
        questionText: "**Q13.** A die is rolled four times. Find the probability of getting exactly two sixes.",
        options: ["25/216", "25/1296", "125/1296", "150/1296"], correctAnswer: "25/216",
        explanation: "Using Binomial Probability: P(X=2) = 4C2 × (1/6)² × (5/6)² = 6 × (1/36) × (25/36) = 150/1296. Simplifying yields 25/216."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q14.** Three positions of a cube-shaped die are: (2, 4, 5), (4, 3, 1), and (5, 2, 6). Find the face opposite to 4.",
        options: ["1", "3", "5", "6"], correctAnswer: "6",
        explanation: "From the first two positions, we can see that face 4 is adjacent to 2, 5, 3, and 1. The only number left that is not adjacent is 6. Therefore, 6 is opposite to 4."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Hard",
        questionText: "**Q15.** A die is rolled twice. Find the probability that the second number is strictly greater than the first.",
        options: ["5/12", "1/2", "7/12", "5/36"], correctAnswer: "5/12",
        explanation: "Outcomes where 2nd > 1st: If 1st is 1 (5 cases), if 2 (4 cases), if 3 (3 cases), if 4 (2 cases), if 5 (1 case), if 6 (0 cases). Total = 5+4+3+2+1 = 15. Prob = 15/36 = 5/12."
    },

    // ================== SET 3: Standard Painted Cubes ==================
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Easy",
        questionText: "**Q16.** A cube of side 6 cm is painted on all faces and cut into 1 cm cubes. How many small cubes are obtained in total?",
        options: ["125", "216", "256", "343"], correctAnswer: "216",
        explanation: "Total number of small cubes = n³ = 6³ = 216."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Easy",
        questionText: "**Q17.** From Q16 (6 cm cube), how many cubes have exactly 3 painted faces?",
        options: ["4", "6", "8", "12"], correctAnswer: "8",
        explanation: "Cubes with 3 painted faces are located exactly at the corners of the large cube. A cube always has exactly 8 corners."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q18.** From Q16 (6 cm cube), how many cubes have exactly 2 painted faces?",
        options: ["24", "36", "48", "60"], correctAnswer: "48",
        explanation: "Cubes with exactly 2 painted faces lie on the edges (excluding corners). Formula: 12 × (n - 2). Here n=6, so 12 × 4 = 48 cubes."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q19.** From Q16 (6 cm cube), how many cubes have exactly 1 painted face?",
        options: ["54", "64", "84", "96"], correctAnswer: "96",
        explanation: "Cubes with exactly 1 painted face lie in the middle of the faces. Formula: 6 × (n - 2)². Here n=6, so 6 × 4² = 6 × 16 = 96 cubes."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q20.** From Q16 (6 cm cube), how many cubes have no painted face?",
        options: ["27", "64", "125", "216"], correctAnswer: "64",
        explanation: "Cubes with no painted faces form the inner core. Formula: (n - 2)³. Here n=6, so 4³ = 64 cubes."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q21.** A cube of side 8 cm is painted on all sides and cut into 1 cm cubes. How many cubes have exactly two painted faces?",
        options: ["60", "72", "84", "96"], correctAnswer: "72",
        explanation: "Using the formula 12 × (n - 2), where n=8. 12 × (8 - 2) = 12 × 6 = 72."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q22.** A cube of side 10 cm is painted and cut into 1 cm cubes. How many cubes have exactly one painted face?",
        options: ["256", "384", "480", "512"], correctAnswer: "384",
        explanation: "Using the formula 6 × (n - 2)², where n=10. 6 × (8)² = 6 × 64 = 384."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q23.** A cube of side 12 cm is painted and cut into 1 cm cubes. How many cubes have no painted face?",
        options: ["512", "729", "1000", "1331"], correctAnswer: "1000",
        explanation: "Using the formula (n - 2)³, where n=12. (10)³ = 1000."
    },

    // ================== SET 4: Advanced & Asymmetric Cube Cuts ==================
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Hard",
        questionText: "**Q24.** A cube is painted on only three mutually adjacent faces (like top, front, and right) and cut into 125 equal cubes. How many cubes remain completely unpainted?",
        options: ["27", "64", "81", "100"], correctAnswer: "64",
        explanation: "Total cubes = 5³. Painting 3 adjacent faces 'consumes' exactly 1 layer from each of those 3 dimensions. The completely unpainted inner block will have dimensions (5-1) × (5-1) × (5-1) = 4 × 4 × 4 = 64 cubes."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q25.** A cube of side 9 cm is cut into 1 cm cubes. How many cubes lie along the edges EXCLUDING the corners?",
        options: ["72", "84", "96", "108"], correctAnswer: "84",
        explanation: "A cube has 12 edges. Each edge has 'n' cubes. Excluding the 2 corner cubes per edge leaves (n - 2) cubes per edge. For n=9, 12 × 7 = 84 cubes."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Hard",
        questionText: "**Q26.** A cube is painted on all sides and cut into 343 equal cubes. How many cubes have at least one painted face?",
        options: ["125", "180", "218", "256"], correctAnswer: "218",
        explanation: "343 cubes means n=7. 'At least one' = Total cubes - Unpainted cubes. Unpainted = (7 - 2)³ = 125. At least one = 343 - 125 = 218."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Medium",
        questionText: "**Q27.** A cube of side 15 cm is cut into 1 cm cubes. How many cubes have exactly one painted face?",
        options: ["864", "1014", "1152", "1200"], correctAnswer: "1014",
        explanation: "Using 6 × (n - 2)², where n=15. 6 × (13)² = 6 × 169 = 1014."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Hard",
        questionText: "**Q28.** A cube is painted and divided into 729 equal cubes. Find the number of cubes having exactly two painted faces.",
        options: ["72", "84", "96", "108"], correctAnswer: "84",
        explanation: "729 cubes means n=9. Cubes with 2 painted faces = 12 × (n - 2) = 12 × 7 = 84."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Hard",
        questionText: "**Q29.** A cube is painted on all six faces and cut into 1331 equal cubes. Find the number of cubes having no painted face.",
        options: ["512", "729", "1000", "1331"], correctAnswer: "729",
        explanation: "1331 cubes means n=11. Cubes with 0 painted faces = (n - 2)³ = (11 - 2)³ = 9³ = 729."
    },
    {
        category: "Logical Reasoning", topic: "Cubes & Dice", difficulty: "Hard", // Ultra Tough Pattern
        questionText: "**Q30 (Ultra Tough – Infosys SP Pattern).** A cube of side 12 cm is painted on all faces and cut into 1 cm cubes. Find the probability that a randomly selected small cube has at least one painted face.",
        options: ["125/216", "91/216", "27/64", "37/64"], correctAnswer: "91/216",
        explanation: "Total cubes = 12³ = 1728. Unpainted cubes = (12-2)³ = 1000. Cubes with at least one painted face = 1728 - 1000 = 728. Probability = 728 / 1728. Dividing by 8: 91 / 216."
    }
];

const seedBatch37CubesDice = async () => {
    try {
        console.log("🧹 Clearing old Cubes & Dice records...");
        await Question.deleteMany({ topic: "Cubes & Dice" }); 
        
        console.log(`🚀 Injecting ${batch37Questions.length} Formatted Questions...`);
        await Question.insertMany(batch37Questions);
        
        console.log(`✅ SUCCESS! All 30 Cubes & Dice Questions Seeded in 'Logical Reasoning' Category.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch37CubesDice();