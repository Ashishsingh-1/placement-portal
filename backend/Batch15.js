const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Permutations & Combinations Seeding'))
  .catch(err => console.log(err));

const batch14Questions = [
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "In how many ways can the letters of the word MISSISSIPPI be arranged?",
        options: ["34650", "36450", "41580", "50400"],
        correctAnswer: "34650",
        explanation: "Step 1: The word has 11 letters in total: 1 M, 4 I's, 4 S's, 2 P's.\nStep 2: Formula for arrangement with repetitions = n! / (p1! * p2! ...)\nStep 3: Ways = 11! / (4! * 4! * 2!) = 39916800 / (24 * 24 * 2) = 34650."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "How many 5-digit numbers can be formed using digits 1, 2, 3, 4, 5, 6 without repetition?",
        options: ["120", "360", "720", "4320"],
        correctAnswer: "720",
        explanation: "Step 1: We need to arrange 5 digits out of 6.\nStep 2: Formula is 6P5 = 6! / (6-5)! = 6! / 1!.\nStep 3: 6 * 5 * 4 * 3 * 2 = 720."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "In how many ways can 8 people be seated around a circular table?",
        options: ["720", "2520", "5040", "40320"],
        correctAnswer: "5040",
        explanation: "Step 1: Circular permutation of n distinct objects is (n - 1)!.\nStep 2: Here, n = 8. So, ways = (8 - 1)! = 7!.\nStep 3: 7! = 7 * 6 * 5 * 4 * 3 * 2 * 1 = 5040."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "In how many ways can 10 people sit in a row if two particular persons must always sit together?",
        options: ["362880", "725760", "1451520", "3628800"],
        correctAnswer: "725760",
        explanation: "Step 1: Treat the 2 particular persons as 1 single unit. Now we have 8 others + 1 unit = 9 units.\nStep 2: These 9 units can be arranged in 9! ways.\nStep 3: The 2 particular persons can swap places within their unit in 2! ways.\nStep 4: Total ways = 9! * 2! = 362,880 * 2 = 725,760."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "How many arrangements of the word BANANA are possible?",
        options: ["60", "120", "360", "720"],
        correctAnswer: "60",
        explanation: "Step 1: The word has 6 letters: 1 B, 3 A's, 2 N's.\nStep 2: Ways = 6! / (3! * 2!) = 720 / (6 * 2).\nStep 3: 720 / 12 = 60."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "A committee of 4 is to be selected from 6 men and 5 women. In how many ways can it be formed if at least 2 women must be included?",
        options: ["150", "215", "250", "330"],
        correctAnswer: "215",
        explanation: "Step 1: Cases are (2W, 2M), (3W, 1M), or (4W, 0M).\nStep 2: Case 1: 5C2 * 6C2 = 10 * 15 = 150.\nStep 3: Case 2: 5C3 * 6C1 = 10 * 6 = 60.\nStep 4: Case 3: 5C4 * 6C0 = 5 * 1 = 5.\nStep 5: Total ways = 150 + 60 + 5 = 215."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "How many numbers greater than 5000 can be formed using digits 1,2,3,4,5 without repetition?",
        options: ["120", "144", "180", "240"],
        correctAnswer: "144",
        explanation: "Step 1: The number can be a 4-digit or 5-digit number.\nStep 2: 4-digit numbers > 5000 must start with 5. Ways = 1 * 4 * 3 * 2 = 24.\nStep 3: All 5-digit numbers formed will be > 5000. Ways = 5! = 120.\nStep 4: Total ways = 24 + 120 = 144."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "In how many ways can 5 boys and 5 girls sit in a row if boys and girls must alternate?",
        options: ["14400", "28800", "43200", "86400"],
        correctAnswer: "28800",
        explanation: "Step 1: There are two patterns: BGBGBGBGBG or GBGBGBGBGB.\nStep 2: For pattern 1: Arrange 5 boys (5!) AND arrange 5 girls (5!) = 120 * 120 = 14400.\nStep 3: For pattern 2: Arrange 5 girls (5!) AND arrange 5 boys (5!) = 120 * 120 = 14400.\nStep 4: Total ways = 14400 + 14400 = 28800."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "How many diagonals are there in a polygon with 20 sides?",
        options: ["150", "170", "190", "210"],
        correctAnswer: "170",
        explanation: "Step 1: Formula for diagonals in an n-sided polygon = n(n-3) / 2.\nStep 2: n = 20. Ways = 20(20 - 3) / 2 = 20 * 17 / 2.\nStep 3: 340 / 2 = 170."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "From 10 students, in how many ways can a President, Vice-President and Secretary be chosen?",
        options: ["120", "360", "720", "1000"],
        correctAnswer: "720",
        explanation: "Step 1: We are arranging 3 distinct positions from 10 people (order matters).\nStep 2: Ways = 10P3 = 10 * 9 * 8.\nStep 3: Total = 720."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "How many arrangements of the word SUCCESS are possible?",
        options: ["210", "420", "840", "5040"],
        correctAnswer: "420",
        explanation: "Step 1: The word has 7 letters: 3 S's, 2 C's, 1 U, 1 E.\nStep 2: Ways = 7! / (3! * 2!) = 5040 / (6 * 2) = 5040 / 12.\nStep 3: Total = 420."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "A committee of 5 is selected from 8 men and 7 women. In how many ways can it be formed if it contains exactly 3 women?",
        options: ["840", "900", "980", "1050"],
        correctAnswer: "980",
        explanation: "Step 1: Exactly 3 women means we need 3 Women AND 2 Men.\nStep 2: Select women = 7C3 = 35.\nStep 3: Select men = 8C2 = 28.\nStep 4: Total ways = 35 * 28 = 980."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "How many 4-digit even numbers can be formed using digits 0, 1, 2, 3, 4, 5 without repetition?",
        options: ["120", "144", "156", "180"],
        correctAnswer: "156",
        explanation: "Step 1: The number must end in 0, 2, or 4.\nStep 2: If it ends in 0: Remaining 3 places from 5 non-zero digits = 5P3 = 60.\nStep 3: If it ends in 2: 1st digit can't be 0 or 2 (4 choices). 2nd and 3rd from remaining 4 = 4 * 4P2 = 4 * 12 = 48.\nStep 4: If it ends in 4: Same logic as 2 = 48.\nStep 5: Total = 60 + 48 + 48 = 156."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "In how many ways can 7 different books be arranged on a shelf if 2 particular books must not be together?",
        options: ["1440", "3600", "4320", "5040"],
        correctAnswer: "3600",
        explanation: "Step 1: Total arrangements without restriction = 7! = 5040.\nStep 2: Arrangements where 2 books are together: Treat as 1 unit. Total 6 units. Ways = 6! * 2! = 720 * 2 = 1440.\nStep 3: Not together = Total - Together = 5040 - 1440 = 3600."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "A bag contains 8 different balls. In how many ways can 4 balls be selected?",
        options: ["40", "56", "70", "1680"],
        correctAnswer: "70",
        explanation: "Step 1: Selection means order doesn't matter, so we use Combinations.\nStep 2: Ways = 8C4 = (8 * 7 * 6 * 5) / (4 * 3 * 2 * 1).\nStep 3: Total = 70."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "How many ways can the letters of MATHEMATICS be arranged?",
        options: ["2,494,800", "4,989,600", "9,979,200", "39,916,800"],
        correctAnswer: "4,989,600",
        explanation: "Step 1: 11 letters total: 2 M's, 2 A's, 2 T's.\nStep 2: Ways = 11! / (2! * 2! * 2!) = 39,916,800 / 8.\nStep 3: Total = 4,989,600."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "In how many ways can 6 men and 4 women be seated in a row if all women sit together?",
        options: ["17280", "40320", "86400", "120960"],
        correctAnswer: "120960",
        explanation: "Step 1: Treat 4 women as 1 unit. We have 6 men + 1 unit = 7 units.\nStep 2: Arrange 7 units = 7! = 5040 ways.\nStep 3: The 4 women can arrange among themselves = 4! = 24 ways.\nStep 4: Total ways = 5040 * 24 = 120,960."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "How many 6-digit numbers can be formed from digits 1–9 if repetition is allowed?",
        options: ["60480", "100000", "531441", "1000000"],
        correctAnswer: "531441",
        explanation: "Step 1: We have 6 places to fill. Each place can take any of the 9 digits (1-9).\nStep 2: Ways = 9 * 9 * 9 * 9 * 9 * 9 = 9^6.\nStep 3: Total = 531441."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "In how many ways can 12 people be divided into 3 groups of 4 each?",
        options: ["5775", "11550", "34650", "369600"],
        correctAnswer: "5775",
        explanation: "Step 1: Formula for dividing n items into k equal groups of size r is n! / ( (r!)^k * k! ).\nStep 2: Ways = 12! / ( (4!)^3 * 3! ).\nStep 3: 479001600 / (13824 * 6) = 479001600 / 82944 = 5775."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "A cricket team of 11 players is to be selected from 15 players. In how many ways can it be done if 2 particular players must always be selected?",
        options: ["286", "715", "1001", "1365"],
        correctAnswer: "715",
        explanation: "Step 1: Since 2 players are already selected, we need to select the remaining 9 players.\nStep 2: Available players = 15 - 2 = 13.\nStep 3: We need to choose 9 from 13. Ways = 13C9 = 13C4 = (13*12*11*10)/(4*3*2*1) = 715."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "How many arrangements of the word STATISTICS are possible?",
        options: ["25200", "50400", "100800", "302400"],
        correctAnswer: "50400",
        explanation: "Step 1: The word has 10 letters: 3 S's, 3 T's, 2 I's.\nStep 2: Ways = 10! / (3! * 3! * 2!) = 3,628,800 / (6 * 6 * 2).\nStep 3: 3628800 / 72 = 50,400."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "In how many ways can 9 persons be seated around a circular table if two particular persons must not sit together?",
        options: ["10080", "20160", "30240", "40320"],
        correctAnswer: "30240",
        explanation: "Step 1: Total ways in circle without restriction = (9-1)! = 8! = 40320.\nStep 2: Ways they ARE together: Treat as 1 unit. 8 units in circle = 7!. They can swap = 2!. Ways = 5040 * 2 = 10080.\nStep 3: Not together = Total - Together = 40320 - 10080 = 30240."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "How many 7-digit numbers can be formed using digits 0–9 if repetition is not allowed and the number must be divisible by 5?",
        options: ["80640", "114240", "120960", "134400"],
        correctAnswer: "114240",
        explanation: "Step 1: Number must end in 0 or 5.\nStep 2: Ends in 0: First 6 places from 9 digits = 9P6 = 60480.\nStep 3: Ends in 5: First digit can't be 0 (8 choices). Next 5 places from remaining 8 digits = 8 * 8P5 = 8 * 6720 = 53760.\nStep 4: Total = 60480 + 53760 = 114,240."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "A committee of 6 is selected from 10 men and 8 women. Find the number of ways if at least 4 men are required.",
        options: ["5880", "6400", "7896", "8106"],
        correctAnswer: "8106",
        explanation: "Step 1: Cases are (4M, 2W), (5M, 1W), and (6M, 0W).\nStep 2: 4M, 2W = 10C4 * 8C2 = 210 * 28 = 5880.\nStep 3: 5M, 1W = 10C5 * 8C1 = 252 * 8 = 2016.\nStep 4: 6M, 0W = 10C6 * 8C0 = 210 * 1 = 210.\nStep 5: Total = 5880 + 2016 + 210 = 8106."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Easy",
        questionText: "How many different triangles can be formed using 12 points on a plane, no three of which are collinear?",
        options: ["132", "220", "440", "1320"],
        correctAnswer: "220",
        explanation: "Step 1: A triangle requires 3 non-collinear points.\nStep 2: Since no 3 points are collinear, any 3 points form a triangle.\nStep 3: Ways = 12C3 = (12 * 11 * 10) / (3 * 2 * 1) = 220."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "Five married couples are seated around a circular table. In how many ways can they sit if every husband sits next to his wife?",
        options: ["384", "768", "1920", "3840"],
        correctAnswer: "768",
        explanation: "Step 1: Treat each couple as 1 unit. There are 5 units.\nStep 2: Circular arrangement of 5 units = (5-1)! = 4! = 24 ways.\nStep 3: Within each couple, husband and wife can swap seats in 2! ways. For 5 couples = 2^5 = 32 ways.\nStep 4: Total ways = 24 * 32 = 768."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Medium",
        questionText: "How many arrangements of the word ENGINEERING are possible?",
        options: ["138600", "277200", "554400", "831600"],
        correctAnswer: "277200",
        explanation: "Step 1: 11 letters total: 3 E's, 3 N's, 2 G's, 2 I's.\nStep 2: Ways = 11! / (3! * 3! * 2! * 2!) = 39,916,800 / (6 * 6 * 2 * 2).\nStep 3: 39916800 / 144 = 277,200."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "A class has 12 boys and 8 girls. A team of 5 is to be formed such that at least 2 girls and at least 2 boys are included. Find the number of ways.",
        options: ["8124", "9856", "10240", "11648"],
        correctAnswer: "9856",
        explanation: "Step 1: Valid cases: (2G, 3B) or (3G, 2B).\nStep 2: 2G, 3B = 8C2 * 12C3 = 28 * 220 = 6160.\nStep 3: 3G, 2B = 8C3 * 12C2 = 56 * 66 = 3696.\nStep 4: Total ways = 6160 + 3696 = 9856."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "Ten different books are arranged on a shelf. Find the number of arrangements if three particular books must always remain together and two other particular books must never be together.",
        options: ["120960", "181440", "241920", "302400"],
        correctAnswer: "181440",
        explanation: "Step 1: Treat the 3 'together' books as Unit B1 (arranges internally in 3! ways). Total objects = 8 (B1 + 7 other books).\nStep 2: Without restriction on the 2 'never together' books (B2, B3), ways = 8! * 3! = 241,920.\nStep 3: Subtract cases where B2 and B3 ARE together. Treat B2 and B3 as Unit B23 (arranges 2! ways). Total objects = 7 (B1, B23, 5 others).\nStep 4: Invalid ways = 7! * 3! * 2! = 5040 * 6 * 2 = 60,480.\nStep 5: Valid ways = 241,920 - 60,480 = 181,440."
    },
    {
        category: "Aptitude", topic: "Permutation & Combination", difficulty: "Hard",
        questionText: "There are 8 men and 6 women. A committee of 6 members is to be formed such that: At least 2 women are selected, Two particular men (M1, M2) cannot be together, and One particular woman (W1) MUST be selected. Find the total number of possible committees.",
        options: ["940", "1086", "1124", "1231"],
        correctAnswer: "1086",
        explanation: "Step 1: W1 is selected. Need 5 more from 8M and 5W. To satisfy 'At least 2 women' overall, we need at least 1 more woman from 5W (can't select 5M, 0W).\nStep 2: Total ways without M1/M2 restriction = 13C5 (Total) - (8C5 * 5C0) (Zero W) = 1287 - 56 = 1231.\nStep 3: Subtract cases where M1 and M2 ARE together. If M1, M2, W1 are selected, need 3 more from 6M and 5W. We must avoid 0 women in these 3 (which means 3M, 0W = 6C3 = 20 ways).\nStep 4: Invalid cases = 11C3 (Total ways for 3) - 20 (Zero W) = 165 - 20 = 145.\nStep 5: Final Answer = 1231 - 145 = 1086."
    }
];

const seedBatch14PnC = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Permutation & Combination questions...");
        await Question.deleteMany({ topic: "Permutation & Combination" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch14Questions.length} P&C Questions...`);
        
        await Question.insertMany(batch14Questions);
        console.log(`✅ BOOM! Tumhare pure 30 questions successfully seed ho gaye hain! Q30 Analytics level done.`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch14PnC();