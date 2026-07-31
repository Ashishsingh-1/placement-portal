const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Divisibility Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch30Questions = [
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Easy",
        questionText: "**Q1.** Which is the smallest number that must be added to 98765 to make it divisible by 9?",
        options: ["1", "2", "4", "7"], correctAnswer: "1",
        explanation: "Sum of the digits of 98765 = 9 + 8 + 7 + 6 + 5 = 35. The next multiple of 9 is 36. Therefore, the number to be added is 36 - 35 = 1."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q2.** Find the remainder when 7¹⁰⁰ is divided by 13.",
        options: ["1", "3", "9", "12"], correctAnswer: "9",
        explanation: "Using cyclicity mod 13: 7¹ ≡ 7, 7² ≡ 10, 7³ ≡ 5, 7⁴ ≡ 9, 7⁵ ≡ 11, 7⁶ ≡ 12, 7⁷ ≡ 6, 7⁸ ≡ 3, 7⁹ ≡ 8, 7¹⁰ ≡ 4, 7¹¹ ≡ 2, 7¹² ≡ 1 (Fermat's Little Theorem). Cycle is 12. 100 = 12 × 8 + 4. So, 7¹⁰⁰ ≡ 7⁴ ≡ 9 (mod 13)."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q3.** How many numbers between 1000 and 2000 are divisible by 7 and 11 both?",
        options: ["12", "13", "14", "15"], correctAnswer: "13",
        explanation: "A number divisible by both 7 and 11 must be divisible by LCM(7, 11) = 77. The smallest multiple of 77 above 1000 is 1001 (77 × 13). The largest below 2000 is 1925 (77 × 25). Total numbers = (25 - 13) + 1 = 13."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q4.** What is the greatest 5-digit number divisible by 18?",
        options: ["99990", "99988", "99972", "99996"], correctAnswer: "99990",
        explanation: "The largest 5-digit number is 99999. Dividing 99999 by 18 gives a remainder of 9. Therefore, greatest number = 99999 - 9 = 99990."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q5.** Find the least number to be subtracted from 54321 to make it divisible by 12.",
        options: ["3", "5", "9", "11"], correctAnswer: "9",
        explanation: "Dividing 54321 by 12 gives a quotient of 4526 and a remainder of 9. To make it perfectly divisible, we must subtract the remainder (9)."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q6.** How many 4-digit numbers are divisible by 15?",
        options: ["599", "600", "601", "602"], correctAnswer: "600",
        explanation: "The smallest 4-digit multiple of 15 is 1005 (15 × 67). The largest is 9990 (15 × 666). Number of terms = (666 - 67) + 1 = 600."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q7.** A number leaves remainder 5 when divided by 8. What remainder will its square leave when divided by 8?",
        options: ["1", "2", "3", "5"], correctAnswer: "1",
        explanation: "Let the number be N = 8k + 5. N² = (8k + 5)² = 64k² + 80k + 25. Both 64k² and 80k are divisible by 8. We only check 25. 25 divided by 8 gives a remainder of 1."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Easy",
        questionText: "**Q8.** Find the remainder when 999999 is divided by 37.",
        options: ["0", "1", "9", "36"], correctAnswer: "0",
        explanation: "999999 = 999 × 1001. Since 999 = 37 × 27, the entire number is perfectly divisible by 37. Remainder is 0."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q9.** What is the smallest 6-digit number divisible by 72?",
        options: ["100000", "100008", "100016", "100080"], correctAnswer: "100008",
        explanation: "The smallest 6-digit number is 100000. Dividing 100000 by 72 gives a remainder of 64. Required number = 100000 + (72 - 64) = 100008."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q10.** How many numbers from 1 to 10,000 are divisible by neither 2 nor 5?",
        options: ["3000", "4000", "5000", "6000"], correctAnswer: "4000",
        explanation: "Using Euler's Totient concept for regular patterns: The numbers divisible by neither 2 nor 5 are essentially the numbers coprime to 10. Number = 10000 × (1 - 1/2) × (1 - 1/5) = 10000 × (1/2) × (4/5) = 4000."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Easy",
        questionText: "**Q11.** The number 74x52 is divisible by 9. Find x.",
        options: ["0", "2", "4", "9"], correctAnswer: "0",
        explanation: "For divisibility by 9, the sum of digits must be a multiple of 9. Sum = 7 + 4 + x + 5 + 2 = 18 + x. Since 18 is already divisible by 9, x can be 0 or 9. Only 0 is in the options."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q12.** Find the largest number that divides 615 and 963 leaving remainder 3 in each case.",
        options: ["12", "24", "36", "48"], correctAnswer: "12",
        explanation: "The required number is the HCF of (615 - 3) and (963 - 3) => HCF of 612 and 960. 612 = 12 × 51, 960 = 12 × 80. The HCF is 12."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q13.** How many multiples of 13 lie between 500 and 2000?",
        options: ["114", "115", "116", "117"], correctAnswer: "115",
        explanation: "Smallest multiple after 500 is 507 (13 × 39). Largest multiple before 2000 is 1989 (13 × 153). Count = (153 - 39) + 1 = 115."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q14.** Find the remainder when 2¹⁰⁰⁰ is divided by 7.",
        options: ["1", "2", "3", "4"], correctAnswer: "2",
        explanation: "We know 2³ = 8 ≡ 1 (mod 7). We can write 1000 = 3 × 333 + 1. So, 2¹⁰⁰⁰ = (2³)³³³ × 2¹ ≡ 1³³³ × 2 ≡ 2 (mod 7)."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q15.** What least value should replace * in 34*72 so that the number becomes divisible by 11?",
        options: ["2", "4", "6", "8"], correctAnswer: "6",
        explanation: "Difference of sums of alternate digits must be 0 or a multiple of 11. (3 + x + 2) - (4 + 7) = (x + 5) - 11 = x - 6. For this to be 0, x must be 6."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q16.** How many numbers between 1 and 500 are divisible by 4 or 6?",
        options: ["165", "166", "167", "168"], correctAnswer: "167",
        explanation: "Divisible by 4 = Floor(500/4) = 125. Divisible by 6 = Floor(500/6) = 83. Divisible by LCM(4,6)=12 = Floor(500/12) = 41. Total = 125 + 83 - 41 = 167."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Easy",
        questionText: "**Q17.** Find the remainder when 17¹⁰⁰ is divided by 16.",
        options: ["0", "1", "2", "15"], correctAnswer: "1",
        explanation: "17 ≡ 1 (mod 16). Therefore, 17¹⁰⁰ ≡ 1¹⁰⁰ ≡ 1 (mod 16)."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q18.** A number is divisible by 3, 4, and 5. What is the least possible value greater than 100?",
        options: ["105", "110", "120", "180"], correctAnswer: "120",
        explanation: "The number must be a multiple of LCM(3, 4, 5) = 60. The multiples are 60, 120, 180... The least value strictly greater than 100 is 120."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q19.** How many trailing zeros are there in 100!?",
        options: ["20", "22", "24", "25"], correctAnswer: "24",
        explanation: "Trailing zeros depend on the power of 5 in the factorial. Power of 5 = Floor(100/5) + Floor(100/25) = 20 + 4 = 24."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q20.** Find the largest number less than 5000 divisible by 27.",
        options: ["4968", "4990", "4995", "4999"], correctAnswer: "4995",
        explanation: "Divide 5000 by 27. Quotient is 185. Largest number = 27 × 185 = 4995."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q21.** A number leaves remainder 7 when divided by 11. Find the remainder when twice the number is divided by 11.",
        options: ["1", "2", "3", "4"], correctAnswer: "3",
        explanation: "Let N = 11k + 7. Then 2N = 22k + 14. Modulo 11: 22k is divisible. 14 ≡ 3 (mod 11). Remainder is 3."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q22.** How many numbers between 1 and 1000 are divisible by exactly one of 2 or 3?",
        options: ["333", "500", "501", "666"], correctAnswer: "501",
        explanation: "Div by 2 (A) = 500. Div by 3 (B) = 333. Div by 6 (A∩B) = 166. Exactly one = A + B - 2(A∩B) = 500 + 333 - 2(166) = 833 - 332 = 501."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q23.** Find the remainder when 11¹⁰¹ + 11¹⁰⁰ is divided by 10.",
        options: ["0", "1", "2", "3"], correctAnswer: "2",
        explanation: "We know 11 ≡ 1 (mod 10). So, 11¹⁰¹ ≡ 1 (mod 10) and 11¹⁰⁰ ≡ 1 (mod 10). Sum = 1 + 1 = 2."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q24.** The number 8x34y is divisible by 72. Find the total number of possible pairs (x, y).",
        options: ["1 pair", "2 pairs", "3 pairs", "4 pairs"], correctAnswer: "1 pair",
        explanation: "Must be div by 8 and 9. For 8, '34y' must be div by 8. 344/8 = 43, so y=4. For 9, sum = 8+x+3+4+4 = 19+x must be div by 9. x=8 (19+8=27). Only 1 valid pair (8,4)."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q25.** What is the least number to be added to 99999 to make it divisible by 125?",
        options: ["1", "25", "26", "100"], correctAnswer: "1",
        explanation: "Since 100,000 is perfectly divisible by 125 (125 × 800), adding exactly 1 to 99999 will make it 100,000. Answer is 1."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q26.** How many integers from 1 to 5000 are divisible by 12 but not by 18?",
        options: ["276", "278", "280", "282"], correctAnswer: "278",
        explanation: "Total multiples of 12 = Floor(5000/12) = 416. Multiples of both 12 & 18 = Multiples of LCM(36) = Floor(5000/36) = 138. Divisible by 12 but not 18 = 416 - 138 = 278."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q27.** Find the remainder when (3¹⁰⁰ + 4¹⁰⁰) is divided by 5.",
        options: ["0", "1", "2", "4"], correctAnswer: "2",
        explanation: "Modulo 5: 3 ≡ -2, 3² ≡ 4 ≡ -1. 3¹⁰⁰ = (3²)⁵⁰ ≡ (-1)⁵⁰ ≡ 1. And 4 ≡ -1. 4¹⁰⁰ ≡ (-1)¹⁰⁰ ≡ 1. Total remainder = 1 + 1 = 2."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q28.** A 7-digit number 24x68y2 is divisible by 72. Find a possible value for x + y.",
        options: ["5", "8", "10", "12"], correctAnswer: "5",
        explanation: "Div by 8 and 9. For 8, '8y2' div by 8. y can be 3 (832) or 7 (872). If y=3, sum = 2+4+x+6+8+3+2 = 25+x. For div by 9, x=2. x+y = 2+3=5. (Options match 5)."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Medium",
        questionText: "**Q29.** How many numbers between 10000 and 99999 have a digit sum divisible by 9?",
        options: ["9000", "9999", "10000", "11111"], correctAnswer: "10000",
        explanation: "A number's digit sum is divisible by 9 IF AND ONLY IF the number itself is divisible by 9. We need multiples of 9 from 10000 to 99999. Total numbers = 90000. 90000 / 9 = 10000."
    },
    {
        category: "Aptitude", topic: "Divisibility & Number Theory", difficulty: "Hard",
        questionText: "**Q30 (Ultra Tough – Deloitte Pattern).** N leaves remainder 2 when divided by 3, remainder 3 when divided by 5, and remainder 5 when divided by 7. Find the smallest positive value of N.",
        options: ["68", "103", "128", "233"], correctAnswer: "68",
        explanation: "Using Chinese Remainder Theorem: Let N = 15m + 8 (solves 3 and 5). N ≡ 5 (mod 7). 15m + 8 ≡ m + 1 ≡ 5 (mod 7), so m ≡ 4. Minimum N = 15(4) + 8 = 68. Check: 68/3 rem 2, 68/5 rem 3, 68/7 rem 5."
    }
];

const seedBatch30Divisibility = async () => {
    try {
        console.log("🧹 Clearing old Divisibility records...");
        await Question.deleteMany({ topic: "Divisibility & Number Theory" }); 
        
        console.log(`🚀 Injecting ${batch30Questions.length} Formatted Questions...`);
        await Question.insertMany(batch30Questions);
        
        console.log(`✅ SUCCESS! All 30 Divisibility Questions Seeded in 'Aptitude' Category.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch30Divisibility();