const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Alphabet Series Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch33Questions = [
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Easy",
        questionText: "**Q1.** Find the next term in the series: A, C, F, J, O, ?",
        options: ["S", "T", "U", "V"], correctAnswer: "U",
        explanation: "Convert to numbers: A=1, C=3, F=6, J=10, O=15. The differences are +2, +3, +4, +5. Next difference is +6. 15 + 6 = 21 = U."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Easy",
        questionText: "**Q2.** Find the next term in the series: B, E, J, Q, Z, ?",
        options: ["I", "J", "K", "L"], correctAnswer: "K",
        explanation: "Numbers: B=2, E=5, J=10, Q=17, Z=26. Differences are +3, +5, +7, +9 (odd numbers). Next difference is +11. 26 + 11 = 37. Since 37 > 26, subtract 26: 37 - 26 = 11 = K."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q3.** Find the next term in the series: Z, X, U, Q, L, ?",
        options: ["E", "F", "G", "H"], correctAnswer: "F",
        explanation: "Numbers: Z=26, X=24, U=21, Q=17, L=12. The differences are -2, -3, -4, -5. Next difference is -6. 12 - 6 = 6 = F."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q4.** Find the missing term in the series: D, H, N, V, ?, Z",
        options: ["E", "F", "G", "H"], correctAnswer: "F",
        explanation: "Numbers: D=4, H=8, N=14, V=22. Differences: +4, +6, +8. Next difference should be +10. 22 + 10 = 32. Equivalent to 32 - 26 = 6 = F. Checking next: F(6) + 20? The gap resets cyclically."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q5.** Find the next term in the series: A, D, I, P, Y, ?",
        options: ["H", "I", "J", "K"], correctAnswer: "J",
        explanation: "Numbers: A=1, D=4, I=9, P=16, Y=25. These are squares of natural numbers (1², 2², 3², 4², 5²). Next is 6² = 36. 36 - 26 = 10 = J."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Hard",
        questionText: "**Q6.** Find the missing term in the series: C, F, K, R, ?, J",
        options: ["A", "B", "C", "Z"], correctAnswer: "A",
        explanation: "Numbers: 3, 6, 11, 18. Differences: +3, +5, +7. Next difference is +9. 18 + 9 = 27. 27 - 26 = 1 = A. Checking next: A(1) + 9 = J(10)."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Easy",
        questionText: "**Q7.** Find the next term in the series: AZ, BY, CX, DW, ?",
        options: ["EV", "EU", "FU", "FV"], correctAnswer: "EV",
        explanation: "The first letters move forward: A, B, C, D -> E. The second letters are their reverse alphabetical pairs (Z, Y, X, W -> V). Hence, EV."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Easy",
        questionText: "**Q8.** Find the next term in the series: AB, DE, GH, JK, ?",
        options: ["LM", "MN", "NO", "PQ"], correctAnswer: "MN",
        explanation: "The series skips one letter after each pair. AB (skip C) DE (skip F) GH (skip I) JK (skip L) MN."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q9.** Find the next term in the series: ACE, BDF, CEG, DFH, ?",
        options: ["EFG", "EGI", "EGJ", "FGH"], correctAnswer: "EGI",
        explanation: "Each letter shifts forward by 1 in the next group. A->B->C->D->E. C->D->E->F->G. E->F->G->H->I. Result: EGI."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q10.** Find the next term in the series: AAA, BBC, CCG, DDM, ?",
        options: ["EEQ", "EER", "EES", "EEU"], correctAnswer: "EEU",
        explanation: "First two letters are repeating consecutive alphabets: AA, BB, CC, DD -> EE. Third letter: A(1), C(3), G(7), M(13). Differences: +2, +4, +6. Next is +8. 13 + 8 = 21 = U. Result: EEU."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Easy",
        questionText: "**Q11.** Find the next term in the series: M, O, R, V, A, ?",
        options: ["E", "F", "G", "H"], correctAnswer: "G",
        explanation: "Numbers: 13, 15, 18, 22, 27(A). Differences: +2, +3, +4, +5. Next difference is +6. 27 + 6 = 33. Equivalent to 33 - 26 = 7 = G."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q12.** Find the next term in the series: A, Z, C, X, E, V, ?",
        options: ["G", "H", "I", "J"], correctAnswer: "G",
        explanation: "This is an alternating series. Odd positions: A(1), C(3), E(5), next is G(7). Even positions are the opposite letters: Z(26), X(24), V(22)."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q13.** Find the next term in the series: B, F, L, T, D, ?",
        options: ["N", "O", "P", "Q"], correctAnswer: "P",
        explanation: "Numbers: 2, 6, 12, 20, 30(D). Differences: +4, +6, +8, +10. Next difference is +12. 30 + 12 = 42. Equivalent to 42 - 26 = 16 = P."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q14.** Find the next term in the series: P, T, Y, E, L, ?",
        options: ["S", "T", "U", "V"], correctAnswer: "T",
        explanation: "Numbers: 16, 20, 25, 31(E), 38(L). Differences: +4, +5, +6, +7. Next difference is +8. 38 + 8 = 46. Equivalent to 46 - 26 = 20 = T."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q15.** Find the next term in the series: ZA, XC, VE, TG, ?",
        options: ["RI", "RJ", "SI", "SJ"], correctAnswer: "RI",
        explanation: "First letters: Z, X, V, T (Decreasing by 2) -> R. Second letters: A, C, E, G (Increasing by 2) -> I. Result: RI."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Hard",
        questionText: "**Q16.** Find the next term in the series: AD, EH, IM, OS, ?",
        options: ["UY", "UZ", "VZ", "VY"], correctAnswer: "UZ",
        explanation: "First letters: A, E, I, O (Vowels in order) -> next is U. Second letters: D(4), H(8), M(13), S(19). Differences: +4, +5, +6. Next difference is +7. 19 + 7 = 26 = Z. Result: UZ."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Easy",
        questionText: "**Q17.** Find the next term in the series: AA, BD, CG, DJ, ?",
        options: ["EK", "EL", "EM", "EN"], correctAnswer: "EM",
        explanation: "First letters: A, B, C, D -> E. Second letters: A(1), D(4), G(7), J(10). Difference is +3. Next is 13 = M. Result: EM."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q18.** Find the next term in the series: A, B, D, G, K, P, ?",
        options: ["U", "V", "W", "X"], correctAnswer: "V",
        explanation: "Numbers: 1, 2, 4, 7, 11, 16. Differences: +1, +2, +3, +4, +5. Next difference is +6. 16 + 6 = 22 = V."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q19.** Find the next term in the series: Z, W, S, N, H, ?",
        options: ["A", "B", "C", "D"], correctAnswer: "A",
        explanation: "Numbers: 26, 23, 19, 14, 8. Differences: -3, -4, -5, -6. Next difference is -7. 8 - 7 = 1 = A."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Hard",
        questionText: "**Q20.** Find the next term in the series: AB, CF, HM, OV, ?",
        options: ["WD", "XE", "XC", "XG"], correctAnswer: "XG",
        explanation: "First letters: A(1), C(3), H(8), O(15). Pattern is n² - 1 (1, 3, 8, 15). Next is 5² - 1 = 24 = X. Difference between letters in pair: AB(+1), CF(+3), HM(+5), OV(+7). Next pair distance is +9. X(24) + 9 = 33. Equivalent to 33 - 26 = 7 = G. Result: XG."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q21.** Find the next term in the series: A, E, K, S, C, ?",
        options: ["M", "N", "O", "P"], correctAnswer: "O",
        explanation: "Numbers: 1, 5, 11, 19, 29(C). Differences: +4, +6, +8, +10. Next difference is +12. 29 + 12 = 41. Equivalent to 41 - 26 = 15 = O."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Easy",
        questionText: "**Q22.** Find the next term in the series: BZ, DX, FV, HT, ?",
        options: ["JQ", "JR", "KQ", "KR"], correctAnswer: "JR",
        explanation: "First letters: B, D, F, H (+2 each) -> J. Second letters: Z, X, V, T (-2 each) -> R. Result: JR."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q23.** Find the next term in the series: AZC, BYD, CXE, DWF, ?",
        options: ["EUG", "EVG", "FUG", "FVG"], correctAnswer: "EVG",
        explanation: "First letters: A, B, C, D -> E. Second letters: Z, Y, X, W -> V. Third letters: C, D, E, F -> G. Result: EVG."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Hard",
        questionText: "**Q24.** Find the missing term in the series: A, C, G, O, ?, K",
        options: ["E", "D", "C", "F"], correctAnswer: "E",
        explanation: "Numbers: 1, 3, 7, 15. Differences: 2, 4, 8. Next difference should be 16. 15 + 16 = 31. Equivalent to 31 - 26 = 5 = E. Checking next: E(5) + 32 = 37. 37 - 26 = 11 = K."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q25.** Find the next term in the series: M, N, P, S, W, B, ?",
        options: ["G", "H", "I", "J"], correctAnswer: "H",
        explanation: "Numbers: 13, 14, 16, 19, 23, 28(B). Differences: +1, +2, +3, +4, +5. Next difference is +6. 28 + 6 = 34. Equivalent to 34 - 26 = 8 = H."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Easy",
        questionText: "**Q26.** Find the next term in the series: ABC, CDE, EFG, GHI, ?",
        options: ["IJK", "HIJ", "JKL", "IKL"], correctAnswer: "IJK",
        explanation: "The last letter of the previous term becomes the first letter of the next. CDE starts with C. EFG starts with E. GHI starts with G. Next term must start with I, followed by J, K. Result: IJK."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Hard",
        questionText: "**Q27.** Find the next term in the series: AAA, ABB, BDD, DGG, ?",
        options: ["GJJ", "GKK", "HKK", "HLL"], correctAnswer: "GKK",
        explanation: "First letters: A(1), A(1), B(2), D(4). Differences: 0, 1, 2. Next difference is 3. 4 + 3 = 7 = G. Second & Third letters: A(1), B(2), D(4), G(7). Differences: 1, 2, 3. Next is 4. 7 + 4 = 11 = K. Result: GKK."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Medium",
        questionText: "**Q28.** Find the next term in the series: AZ, DW, GT, JQ, ?",
        options: ["MN", "MO", "NN", "NM"], correctAnswer: "MN",
        explanation: "First letters: A(1), D(4), G(7), J(10). Next is 13 = M. Second letters: Z(26), W(23), T(20), Q(17). Next is 14 = N. These are also opposite pairs. Result: MN."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Hard",
        questionText: "**Q29.** Find the missing term in the series: A, D, J, S, ?",
        options: ["E", "F", "G", "H"], correctAnswer: "E",
        explanation: "Numbers: 1, 4, 10, 19. Differences are 3, 6, 9 (Multiples of 3). Next difference is 12. 19 + 12 = 31. Equivalent to 31 - 26 = 5 = E."
    },
    {
        category: "Logical Reasoning", topic: "Alphabet Series", difficulty: "Hard", // Ultra Tough Pattern
        questionText: "**Q30 (Ultra Tough – Deloitte Pattern).** Find the next term in the series: A, B, D, H, P, F, ?",
        options: ["J", "K", "L", "M"], correctAnswer: "L",
        explanation: "Convert to numbers: 1, 2, 4, 8, 16, 32(which is 32-26 = 6 = F). These are powers of 2 (2⁰, 2¹, 2², 2³, 2⁴, 2⁵). The next term is 2⁶ = 64. Equivalent letter: 64 mod 26 = 12. The 12th letter is L."
    }
];

const seedBatch33AlphabetSeries = async () => {
    try {
        console.log("🧹 Clearing old Alphabet Series records...");
        await Question.deleteMany({ topic: "Alphabet Series" }); 
        
        console.log(`🚀 Injecting ${batch33Questions.length} Formatted Questions...`);
        await Question.insertMany(batch33Questions);
        
        console.log(`✅ SUCCESS! All 30 Alphabet Series Questions Seeded in 'Logical Reasoning' Category.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch33AlphabetSeries();