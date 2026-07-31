const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Number System Seeding'))
  .catch(err => console.log(err));

const batch15Questions = [
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "Find the remainder when 7^100 is divided by 13.",
        options: ["3", "7", "9", "11"],
        correctAnswer: "9",
        explanation: "Step 1: Use Fermat's Little Theorem. A^(P-1) = 1 mod P. So, 7^12 = 1 mod 13.\nStep 2: Divide power 100 by 12. 100 = 12 * 8 + 4. Remainder is 4.\nStep 3: So, 7^100 mod 13 is equivalent to 7^4 mod 13.\nStep 4: 7^2 = 49 = 10 (or -3) mod 13. Then (-3)^2 = 9 mod 13."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Easy",
        questionText: "How many trailing zeros are there in 100! ?",
        options: ["20", "21", "24", "25"],
        correctAnswer: "24",
        explanation: "Step 1: Trailing zeros are determined by the number of 5s in the prime factorization of n!.\nStep 2: Use successive division: [100/5] + [100/25] + [100/125].\nStep 3: 20 + 4 + 0 = 24 trailing zeros."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Easy",
        questionText: "Find the units digit of 17^123.",
        options: ["1", "3", "7", "9"],
        correctAnswer: "3",
        explanation: "Step 1: Unit digit of 17 depends only on 7. Cyclicity of 7 is 4 (7, 9, 3, 1).\nStep 2: Divide the power 123 by 4. Remainder is 3.\nStep 3: The 3rd power in the cycle of 7 ends in 3 (7^3 = 343). So, the unit digit is 3."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "What is the remainder when (2^100 + 3^100) is divided by 5?",
        options: ["0", "1", "2", "4"],
        correctAnswer: "2",
        explanation: "Step 1: Find 2^100 mod 5. By Fermat's theorem, 2^4 = 1 mod 5. Since 100 is a multiple of 4, 2^100 = 1 mod 5.\nStep 2: Find 3^100 mod 5. Similarly, 3^4 = 1 mod 5. Since 100 is a multiple of 4, 3^100 = 1 mod 5.\nStep 3: Total remainder = 1 + 1 = 2."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "How many numbers between 1 and 1000 are divisible by 3, 5, or 7?",
        options: ["540", "542", "543", "545"],
        correctAnswer: "543",
        explanation: "Step 1: Use Inclusion-Exclusion Principle. n(3 U 5 U 7) = n(3) + n(5) + n(7) - n(15) - n(21) - n(35) + n(105).\nStep 2: n(3)=333, n(5)=200, n(7)=142.\nStep 3: n(15)=66, n(21)=47, n(35)=28.\nStep 4: n(105)=9.\nStep 5: Total = 333 + 200 + 142 - 66 - 47 - 28 + 9 = 543."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "Find the greatest 4-digit number divisible by 18, 24 and 30.",
        options: ["9360", "9720", "9840", "9960"],
        correctAnswer: "9720",
        explanation: "Step 1: Find LCM of 18, 24, 30. LCM = 360.\nStep 2: The largest 4-digit number is 9999. Divide 9999 by 360.\nStep 3: 9999 = 360 * 27 + 279 (Remainder).\nStep 4: Subtract remainder from 9999: 9999 - 279 = 9720."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Easy",
        questionText: "How many integers from 1 to 1000 are not divisible by either 2 or 5?",
        options: ["200", "300", "400", "600"],
        correctAnswer: "400",
        explanation: "Step 1: Find numbers divisible by 2 or 5. n(2 U 5) = n(2) + n(5) - n(10).\nStep 2: 500 + 200 - 100 = 600 numbers are divisible.\nStep 3: Numbers NOT divisible = Total - Divisible = 1000 - 600 = 400."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "Find the remainder when 999^999 is divided by 13.",
        options: ["2", "5", "8", "11"],
        correctAnswer: "5",
        explanation: "Step 1: Reduce base modulo 13. 999 / 13 = 76 with remainder 11. So 999 ≡ -2 mod 13.\nStep 2: Reduce power using Fermat's Theorem. (-2)^12 ≡ 1 mod 13.\nStep 3: 999 = 12 * 83 + 3. So (-2)^999 ≡ (-2)^3 mod 13.\nStep 4: (-2)^3 = -8. And -8 mod 13 is strictly positive 5."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "The product of three consecutive integers is 2730. Find the integers.",
        options: ["12, 13, 14", "13, 14, 15", "14, 15, 16", "15, 16, 17"],
        correctAnswer: "13, 14, 15",
        explanation: "Step 1: Estimate using cube root. Cube root of 2730 is slightly less than 14 (14^3 = 2744).\nStep 2: The middle number should be around 14.\nStep 3: Let's test 13 * 14 * 15. 13 * 14 = 182. 182 * 15 = 2730. Correct."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "How many factors does 7560 have?",
        options: ["48", "60", "64", "72"],
        correctAnswer: "64",
        explanation: "Step 1: Prime factorization of 7560 = 756 * 10 = (2^2 * 3^3 * 7) * (2 * 5) = 2^3 * 3^3 * 5^1 * 7^1.\nStep 2: Add 1 to each power and multiply.\nStep 3: Number of factors = (3+1)(3+1)(1+1)(1+1) = 4 * 4 * 2 * 2 = 64."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Easy",
        questionText: "Find the remainder when 13^75 is divided by 7.",
        options: ["1", "3", "5", "6"],
        correctAnswer: "6",
        explanation: "Step 1: Reduce base modulo 7. 13 ≡ -1 mod 7.\nStep 2: (-1)^75 = -1.\nStep 3: A negative remainder of -1 modulo 7 is equivalent to 7 - 1 = 6."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "Find the last two digits of 7^222.",
        options: ["07", "43", "49", "93"],
        correctAnswer: "49",
        explanation: "Step 1: Last two digits means taking modulo 100.\nStep 2: 7^4 = 2401, which ends in 01.\nStep 3: 222 = 4 * 55 + 2.\nStep 4: 7^222 = (7^4)^55 * 7^2 = (...01)^55 * 49 = 49."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "What is the units digit of (3^100 + 4^100 + 5^100)?",
        options: ["0", "2", "4", "8"],
        correctAnswer: "2",
        explanation: "Step 1: 3^100 -> power is multiple of 4, ends in 1.\nStep 2: 4^100 -> even power of 4 always ends in 6.\nStep 3: 5^100 -> any power of 5 ends in 5.\nStep 4: Sum of unit digits = 1 + 6 + 5 = 12. So it ends in 2."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "Find the remainder when (5^55 + 6^66) is divided by 7.",
        options: ["2", "4", "5", "6"],
        correctAnswer: "6",
        explanation: "Step 1: Base 5 ≡ -2 mod 7. Base 6 ≡ -1 mod 7.\nStep 2: 5^55 ≡ (-2)^55. (-2)^3 = -8 ≡ -1. Since 55 = 18*3 + 1, ((-2)^3)^18 * (-2) ≡ (-1)^18 * -2 = -2 ≡ 5 mod 7.\nStep 3: 6^66 ≡ (-1)^66 = 1 mod 7.\nStep 4: 5 + 1 = 6."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Easy",
        questionText: "Find the smallest number that leaves remainder 3 when divided by 5, 7 and 9.",
        options: ["315", "318", "321", "323"],
        correctAnswer: "318",
        explanation: "Step 1: The number is of the form LCM(5, 7, 9)k + Remainder.\nStep 2: LCM of 5, 7, and 9 is 315.\nStep 3: For smallest number, put k=1. Number = 315 + 3 = 318."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Easy",
        questionText: "Find the remainder when 123456789 is divided by 11.",
        options: ["2", "4", "5", "8"],
        correctAnswer: "5",
        explanation: "Step 1: Divisibility rule for 11 is (Sum of odd places) - (Sum of even places).\nStep 2: Odd places (from right): 9+7+5+3+1 = 25.\nStep 3: Even places: 8+6+4+2 = 20.\nStep 4: 25 - 20 = 5."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "How many factors of (2^10 * 3^8 * 5^4) are perfect squares?",
        options: ["72", "90", "120", "150"],
        correctAnswer: "90",
        explanation: "Step 1: A perfect square factor must have even powers for all its prime bases.\nStep 2: Choices for power of 2 (0,2,4,6,8,10) = 6 choices.\nStep 3: Choices for power of 3 (0,2,4,6,8) = 5 choices.\nStep 4: Choices for power of 5 (0,2,4) = 3 choices.\nStep 5: Total combinations = 6 * 5 * 3 = 90."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "Find the highest power of 5 in 100!.",
        options: ["20", "21", "24", "25"],
        correctAnswer: "24",
        explanation: "Step 1: Use Legendre's formula: [100/5] + [100/25] + [100/125]...\nStep 2: 20 + 4 = 24. Since 125 is greater than 100, we stop."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "How many zeros occur at the end of 200! ?",
        options: ["48", "49", "50", "51"],
        correctAnswer: "49",
        explanation: "Step 1: Trailing zeros depend on the power of 5.\nStep 2: [200/5] + [200/25] + [200/125].\nStep 3: 40 + 8 + 1 = 49."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "Find the remainder when 999^99 is divided by 8.",
        options: ["1", "3", "5", "7"],
        correctAnswer: "7",
        explanation: "Step 1: 999 divided by 8 leaves a remainder of 7 (or -1). Because 1000 is divisible by 8, so 999 is 1 less.\nStep 2: (-1)^99 = -1.\nStep 3: A negative remainder of -1 mod 8 is 7."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "A number leaves remainder 2 when divided by 3, remainder 3 when divided by 5 and remainder 4 when divided by 7. Find the least such number.",
        options: ["53", "58", "68", "105"],
        correctAnswer: "53",
        explanation: "Step 1: Using Chinese Remainder Theorem. N = 3k + 2.\nStep 2: N ≡ 3 mod 5 => 3k + 2 ≡ 3 mod 5 => 3k ≡ 1 mod 5 => k = 2. So N = 3(2) + 2 = 8.\nStep 3: General form of N for first two conditions is 15m + 8.\nStep 4: N ≡ 4 mod 7 => 15m + 8 ≡ 4 mod 7 => m + 1 ≡ 4 => m = 3.\nStep 5: Least N = 15(3) + 8 = 53."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "Find the number of positive divisors of: (2^8 * 3^5 * 5^3 * 7^2)",
        options: ["324", "486", "648", "720"],
        correctAnswer: "648",
        explanation: "Step 1: Add 1 to each exponent.\nStep 2: (8+1) * (5+1) * (3+1) * (2+1) = 9 * 6 * 4 * 3.\nStep 3: 54 * 12 = 648."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "Find the sum of all divisors of: (2^4 * 3^2 * 5)",
        options: ["2418", "2500", "2600", "2814"],
        correctAnswer: "2418",
        explanation: "Step 1: Formula for sum of divisors = [((p^(a+1))-1)/(p-1)] * ...\nStep 2: For 2^4: (2^5 - 1)/(2-1) = 31.\nStep 3: For 3^2: (3^3 - 1)/(3-1) = 26/2 = 13.\nStep 4: For 5^1: (5^2 - 1)/(5-1) = 24/4 = 6.\nStep 5: Product = 31 * 13 * 6 = 2418."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "How many 5-digit numbers can be formed using digits 1,2,3,4,5 if repetition is allowed and the number is divisible by 3?",
        options: ["1024", "1041", "1250", "3125"],
        correctAnswer: "1041",
        explanation: "Step 1: Total possible 5-digit numbers = 5^5 = 3125.\nStep 2: For divisibility by 3, the sum of digits must be a multiple of 3.\nStep 3: In a sequence of 5 independent digits drawn from a set not balanced mod 3, the exact count deviates slightly from Total/3.\nStep 4: By building the combinations algorithmically, the counts are 1041 (sum≡0), 1042 (sum≡1), 1042 (sum≡2). Therefore, 1041 valid numbers."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "Find the highest power of 2 dividing 100!.",
        options: ["96", "97", "98", "99"],
        correctAnswer: "97",
        explanation: "Step 1: Successive division by 2.\nStep 2: 50 + 25 + 12 + 6 + 3 + 1 = 97."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "If N = (2^5 * 3^4 * 5^3), how many factors of N are divisible by 60?",
        options: ["36", "48", "60", "72"],
        correctAnswer: "48",
        explanation: "Step 1: 60 = 2^2 * 3^1 * 5^1. A factor divisible by 60 must have at least these powers.\nStep 2: Power of 2 can be 2,3,4,5 (4 choices).\nStep 3: Power of 3 can be 1,2,3,4 (4 choices).\nStep 4: Power of 5 can be 1,2,3 (3 choices).\nStep 5: 4 * 4 * 3 = 48."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "How many numbers between 1 and 10,000 are divisible by neither 2, 3 nor 5?",
        options: ["2664", "2666", "2668", "3333"],
        correctAnswer: "2666",
        explanation: "Step 1: Every block of 30 numbers has exactly φ(30) = 8 such numbers.\nStep 2: 10,000 = 333 * 30 + 10.\nStep 3: 333 complete blocks yield 333 * 8 = 2664 numbers.\nStep 4: The remaining 10 numbers (1 to 10) have exactly 2 numbers (1, 7) coprime to 30.\nStep 5: Total = 2664 + 2 = 2666."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "Find the remainder when (1! + 2! + 3! + ... + 20!) is divided by 10.",
        options: ["1", "3", "5", "7"],
        correctAnswer: "3",
        explanation: "Step 1: Any factorial from 5! onwards (5!, 6!, etc.) ends in 0, meaning it is perfectly divisible by 10.\nStep 2: We only need to find the sum of 1! + 2! + 3! + 4!.\nStep 3: 1 + 2 + 6 + 24 = 33.\nStep 4: 33 mod 10 = 3."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Easy",
        questionText: "Find the last non-zero digit of 10!.",
        options: ["2", "4", "6", "8"],
        correctAnswer: "8",
        explanation: "Step 1: 10! = 3628800.\nStep 2: The last non-zero digit is visually 8."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "How many positive integers less than 10,000 satisfy: divisible by 4, divisible by 6, but NOT divisible by 9?",
        options: ["555", "556", "833", "277"],
        correctAnswer: "556",
        explanation: "Step 1: Divisible by 4 and 6 means divisible by LCM(4,6) = 12.\nStep 2: Total multiples of 12 < 10000 = floor(9999/12) = 833.\nStep 3: Subtract numbers also divisible by 9. LCM(12, 9) = 36.\nStep 4: Multiples of 36 = floor(9999/36) = 277.\nStep 5: Valid numbers = 833 - 277 = 556."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "What is the remainder when 1001^1001 is divided by 1000?",
        options: ["1", "11", "101", "999"],
        correctAnswer: "1",
        explanation: "Step 1: 1001 ≡ 1 mod 1000.\nStep 2: (1)^1001 = 1."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "How many factors of 3600 are odd?",
        options: ["6", "9", "12", "15"],
        correctAnswer: "9",
        explanation: "Step 1: 3600 = 2^4 * 3^2 * 5^2.\nStep 2: Odd factors only contain odd prime bases (3 and 5).\nStep 3: Number of combinations = (2+1) * (2+1) = 3 * 3 = 9."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Medium",
        questionText: "Find the units digit of: (2^50 * 3^40 * 7^30).",
        options: ["2", "4", "6", "8"],
        correctAnswer: "6",
        explanation: "Step 1: 2^50 -> 50 = 12*4 + 2 -> Unit digit is 2^2 = 4.\nStep 2: 3^40 -> 40 is multiple of 4 -> Unit digit is 1.\nStep 3: 7^30 -> 30 = 7*4 + 2 -> Unit digit is 7^2 = 9.\nStep 4: Total product ends in 4 * 1 * 9 = 36 => 6."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Hard",
        questionText: "How many integers between 1 and 10000 have exactly 3 divisors?",
        options: ["21", "24", "25", "26"],
        correctAnswer: "25",
        explanation: "Step 1: A number has exactly 3 divisors only if it is the square of a prime number (p^2).\nStep 2: We need p^2 <= 10000, so p <= 100.\nStep 3: There are exactly 25 prime numbers up to 100."
    },
    {
        category: "Aptitude", topic: "Number System", difficulty: "Easy",
        questionText: "Find the smallest positive integer divisible by 12, 15, 18 and 20.",
        options: ["120", "180", "240", "360"],
        correctAnswer: "180",
        explanation: "Step 1: Smallest integer divisible by multiple numbers is their LCM.\nStep 2: 12=2^2*3, 15=3*5, 18=2*3^2, 20=2^2*5.\nStep 3: LCM = 2^2 * 3^2 * 5 = 4 * 9 * 5 = 180."
    }
];

const seedBatch15NumberSystem = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Number System questions...");
        await Question.deleteMany({ topic: "Number System" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch15Questions.length} Number System Questions...`);
        
        await Question.insertMany(batch15Questions);
        console.log(`✅ BOOM! Tumhare pure 35 Number System questions successfully seed ho gaye hain!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch15NumberSystem();