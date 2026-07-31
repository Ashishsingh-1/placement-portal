const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Alpha-Numeric Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch34Questions = [
    // ================== SET 1: Alpha-Numeric Progression ==================
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Easy",
        questionText: "**Q1.** Find the next term in the series: A1, C4, F9, J16, O25, ?",
        options: ["S36", "T36", "U36", "V36"], correctAnswer: "U36",
        explanation: "Letters: A(+2)C(+3)F(+4)J(+5)O(+6) = U. Numbers: 1², 2², 3², 4², 5², next is 6² = 36. Answer is U36."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q2.** Find the next term in the series: Z2, X4, U8, Q16, L32, ?",
        options: ["F64", "G64", "H64", "E64"], correctAnswer: "F64",
        explanation: "Letters: Z(-2)X(-3)U(-4)Q(-5)L(-6) = F. Numbers: Powers of 2 (2, 4, 8, 16, 32, 64). Answer is F64."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q3.** Find the next term in the series: A2, D6, G12, J20, M30, ?",
        options: ["P42", "Q42", "P40", "O42"], correctAnswer: "P42",
        explanation: "Letters: A(+3)D(+3)G(+3)J(+3)M(+3) = P. Numbers: n*(n+1) -> 1*2, 2*3, 3*4, 4*5, 5*6, next is 6*7 = 42. Answer is P42."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q4.** Find the next term in the series: B3, E6, J12, Q24, Z48, ?",
        options: ["K96", "J96", "L96", "M96"], correctAnswer: "K96",
        explanation: "Letters: B(+3)E(+5)J(+7)Q(+9)Z(+11). Z is 26. 26+11=37. 37-26=11=K. Numbers: Multiply by 2. 48*2 = 96. Answer is K96."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Easy",
        questionText: "**Q5.** Find the next term in the series: A1Z, B2Y, C3X, D4W, ?",
        options: ["E5V", "F5V", "E6V", "E5U"], correctAnswer: "E5V",
        explanation: "First letter: A, B, C, D -> E. Number: 1, 2, 3, 4 -> 5. Third letter: Z, Y, X, W (reverse) -> V. Answer is E5V."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q6.** Find the next term in the series: M1, O4, R9, V16, A25, ?",
        options: ["G36", "H36", "F36", "E36"], correctAnswer: "G36",
        explanation: "Letters: M(13) +2=O(15) +3=R(18) +4=V(22) +5=A(27/1) +6=G(7). Numbers are perfect squares: 1, 4, 9, 16, 25, 36. Answer is G36."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q7.** Find the next term in the series: A1, B4, D9, G16, K25, ?",
        options: ["P36", "Q36", "O36", "R36"], correctAnswer: "P36",
        explanation: "Letters: A(+1)B(+2)D(+3)G(+4)K(+5) = P. Numbers are perfect squares: 1, 4, 9, 16, 25, 36. Answer is P36."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q8.** Find the next term in the series: C2, F6, J12, O20, U30, ?",
        options: ["B42", "A42", "C42", "D42"], correctAnswer: "B42",
        explanation: "Letters: C(+3)F(+4)J(+5)O(+6)U(+7). U(21)+7=28. 28-26=2=B. Numbers: n*(n+1) -> 1*2, 2*3, 3*4, 4*5, 5*6, 6*7=42. Answer is B42."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q9.** Find the next term in the series: A1B, C4D, F9G, J16K, ?",
        options: ["O25P", "N25O", "O25Q", "P25Q"], correctAnswer: "O25P",
        explanation: "First letter: A(+2)C(+3)F(+4)J(+5)O. Number: 1², 2², 3², 4², 5²=25. Last letter: B(+2)D(+3)G(+4)K(+5)P. Answer is O25P."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q10.** Find the next term in the series: Z1, Y3, W6, T10, P15, ?",
        options: ["K21", "J21", "L21", "K20"], correctAnswer: "K21",
        explanation: "Letters: Z(-1)Y(-2)W(-3)T(-4)P(-5)K. Numbers: 1(+2)3(+3)6(+4)10(+5)15(+6)21. Answer is K21."
    },

    // ================== SET 2: Position-Based Coding ==================
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Easy",
        questionText: "**Q11.** Use A=1, B=2... Z=26. If CAT = 24, then DOG = ?",
        options: ["25", "26", "27", "28"], correctAnswer: "26",
        explanation: "C(3) + A(1) + T(20) = 24. For DOG: D(4) + O(15) + G(7) = 26."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Easy",
        questionText: "**Q12.** If BOOK = 43, then NOTE = ?",
        options: ["52", "54", "56", "58"], correctAnswer: "54",
        explanation: "B(2) + O(15) + O(15) + K(11) = 43. NOTE: N(14) + O(15) + T(20) + E(5) = 54."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q13.** If APPLE = 50, then GRAPE = ?",
        options: ["45", "46", "47", "48"], correctAnswer: "47",
        explanation: "A(1) + P(16) + P(16) + L(12) + E(5) = 50. GRAPE: G(7) + R(18) + A(1) + P(16) + E(5) = 47."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q14.** If SKY = 55, then CLOUD = ?",
        options: ["53", "55", "57", "59"], correctAnswer: "55",
        explanation: "S(19) + K(11) + Y(25) = 55. CLOUD: C(3) + L(12) + O(15) + U(21) + D(4) = 55."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Easy",
        questionText: "**Q15.** If TEAM = 39, then LEAD = ?",
        options: ["20", "22", "24", "26"], correctAnswer: "22",
        explanation: "T(20) + E(5) + A(1) + M(13) = 39. LEAD: L(12) + E(5) + A(1) + D(4) = 22."
    },

    // ================== SET 3: Multi-Variable Series Logic ==================
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q16.** Find the next TWO terms in the series: A1, D3, H7, M13, ?, ?",
        options: ["S21, Z31", "T21, Y31", "S20, Z30", "S21, Y31"], correctAnswer: "S21, Z31",
        explanation: "Letters: A(+3)D(+4)H(+5)M(+6)S(+7)Z. Numbers: 1(+2)3(+4)7(+6)13(+8)21(+10)31. Answer is S21, Z31."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q17.** Find the next TWO terms in the series: Z26, X24, U21, Q17, ?, ?",
        options: ["M13, G7", "L12, F6", "L12, G7", "M13, F6"], correctAnswer: "L12, F6",
        explanation: "Letters: Z(-2)X(-3)U(-4)Q(-5)L(-6)F. Numbers exactly match letter positions: L=12, F=6."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q18.** Find the next term in the series: A2, C6, F12, J20, O30, ?",
        options: ["U42", "V42", "U40", "V40"], correctAnswer: "U42",
        explanation: "Letters: A(+2)C(+3)F(+4)J(+5)O(+6)U. Numbers: 1x2=2, 2x3=6, 3x4=12... next is 6x7=42."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q19.** Find the next term in the series: B1, E2, J4, Q8, Z16, ?",
        options: ["K32", "J32", "L32", "M32"], correctAnswer: "K32",
        explanation: "Letters: B(+3)E(+5)J(+7)Q(+9)Z(+11). 26+11=37 -> 11=K. Numbers: Powers of 2. Next is 32."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q20.** Find the next term in the series: A1, B2, D6, G24, K120, ?",
        options: ["P720", "O720", "P500", "Q720"], correctAnswer: "P720",
        explanation: "Letters: A(+1)B(+2)D(+3)G(+4)K(+5)P. Numbers: Factorials (1!, 2!, 3!, 4!, 5!). Next is 6! = 720."
    },

    // ================== SET 4: Sum Logic Variations ==================
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q21.** If DELHI = 38 and MUMBAI = 59, then find the value of CHENNAI.",
        options: ["50", "52", "54", "56"], correctAnswer: "54",
        explanation: "Pure sum of alphabetical positions. DELHI = 4+5+12+8+9 = 38. CHENNAI = 3+8+5+14+14+1+9 = 54."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Easy",
        questionText: "**Q22.** If APPLE = 50 and MANGO = 50, find ORANGE.",
        options: ["55", "58", "60", "62"], correctAnswer: "60",
        explanation: "Sum of positions. ORANGE = 15 + 18 + 1 + 14 + 7 + 5 = 60."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q23.** If TRAIN = 62 and PLANE = 48, find HELICOPTER.",
        options: ["100", "105", "111", "115"], correctAnswer: "111",
        explanation: "Sum of positions. H(8)+E(5)+L(12)+I(9)+C(3)+O(15)+P(16)+T(20)+E(5)+R(18) = 111."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q24.** If CAR = 22 and BIKE = 27, find TRUCK.",
        options: ["70", "75", "78", "82"], correctAnswer: "75",
        explanation: "Sum of positions. T(20) + R(18) + U(21) + C(3) + K(11) = 75."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q25.** If INDIA = 37 and JAPAN = 42, find CANADA.",
        options: ["20", "22", "24", "26"], correctAnswer: "24",
        explanation: "Sum of positions. C(3) + A(1) + N(14) + A(1) + D(4) + A(1) = 24."
    },

    // ================== SET 5: Arrangement & Sequence Analysis ==================
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q26 (Arrangement).** Study: `A 7 B 4 C 9 D 2 E 6 F 1 G 8 H 3 I 5 J`. How many letters have exactly one number between themselves and the next consecutive letter in the alphabet?",
        options: ["6", "7", "8", "9"], correctAnswer: "9",
        explanation: "Check the pairs: A_B, B_C, C_D, D_E, E_F, F_G, G_H, H_I, I_J. In this exact sequence, every consecutive letter pair has exactly one number sitting between them. Total 9 pairs."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Medium",
        questionText: "**Q27.** In the sequence `A 7 B 4 C 9 D 2 E 6 F 1 G 8 H 3 I 5 J`, which element is exactly midway between C and H?",
        options: ["E", "6", "F", "1"], correctAnswer: "6",
        explanation: "Elements between C and H are: 9, D, 2, E, 6, F, 1, G, 8. There are 9 elements. The 5th (middle) element is 6."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q28.** In `A 7 B 4 C 9 D 2 E 6 F 1 G 8 H 3 I 5 J`, if all numbers are sorted in ascending order while letters remain fixed, what is the new position of F from the left?",
        options: ["10th", "11th", "12th", "13th"], correctAnswer: "11th",
        explanation: "The sorted sequence becomes: A 1 B 2 C 3 D 4 E 5 F 6 G 7 H 8 I 9 J. Position of F is the 11th element."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q29.** In `A 7 B 4 C 9 D 2 E 6 F 1 G 8 H 3 I 5 J`, how many consonants are immediately preceded by an odd number?",
        options: ["2", "3", "4", "5"], correctAnswer: "4",
        explanation: "Check consonants and their preceding numbers: B(7-odd), C(4-even), D(9-odd), F(6-even), G(1-odd), H(8-even), J(5-odd). Total 4 consonants match."
    },
    {
        category: "Logical Reasoning", topic: "Alpha-Numeric Series", difficulty: "Hard",
        questionText: "**Q30 (Ultra Tough – Infosys SP Pattern).** In the series: `A 3 C 5 F 8 J 13 O 21 U 34 ?`, find the missing term.",
        options: ["B 55", "C 55", "B 47", "A 55"], correctAnswer: "B 55",
        explanation: "Letters: A(+2)C(+3)F(+4)J(+5)O(+6)U(+7)B (since 21+7=28, 28-26=2=B). Numbers follow Fibonacci: 3+5=8, 5+8=13, 8+13=21, 21+34=55. Result: B 55."
    }
];

const seedBatch34AlphaNumeric = async () => {
    try {
        console.log("🧹 Clearing old Alpha-Numeric records...");
        await Question.deleteMany({ topic: "Alpha-Numeric Series" }); 
        
        console.log(`🚀 Injecting ${batch34Questions.length} Formatted Questions...`);
        await Question.insertMany(batch34Questions);
        
        console.log(`✅ SUCCESS! All 30 Alpha-Numeric Questions Seeded in 'Logical Reasoning' Category.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch34AlphaNumeric();