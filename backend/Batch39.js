const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Stack Puzzles Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const p1_base = "**Puzzle 1:** Eight boxes A, B, C, D, E, F, G and H are stacked one above another.\n- A is above D. Exactly 3 boxes are between A and D.\n- G is immediately below D.\n- H is at the topmost position.\n- F is above B. Exactly 2 boxes are between F and B.\n- C is immediately above E.\n- E is not at the bottom.\n\n";

const p2_base = "**Puzzle 2:** Nine books A, B, C, D, E, F, G, H, I are stacked from top to bottom.\n- A is above C.\n- B is immediately below E.\n- D is between F and G.\n- Exactly 2 books are between A and H.\n- I is at the bottom.\n- C is immediately above D.\n- F is above B.\n\n";

const p3_base = "**Puzzle 3:** Seven files P, Q, R, S, T, U, V are stacked.\n- P is above R.\n- Two files are between P and R.\n- U is immediately below R.\n- V is topmost.\n- T is above S.\n- Q is not adjacent to P.\n\n";

const p4_base = "**Puzzle 4:** Ten containers A, B, C, D, E, F, G, H, I, J are stacked vertically.\n- J is topmost.\n- A is immediately below D.\n- Exactly 4 containers are between D and H.\n- F is above G. Exactly 2 containers are between F and G.\n- B is immediately above E.\n- I is not at an extreme end.\n- C is below H.\n\n";

const p5_base = "**Puzzle 5 ** Eleven servers A, B, C, D, E, F, G, H, I, J, K are arranged vertically.\n- K is topmost.\n- Exactly 3 servers are between A and D. D is above A.\n- B is immediately below A.\n- G is above H. Exactly 2 servers are between G and H.\n- F is immediately above I.\n- J is not at the bottom.\n- C is below H.\n- E is above B.\n\n";

const batch40Questions = [
    // ================== PUZZLE 1 (Q1 - Q6) ==================
    // Solved Stack (1 to 8): H, A, C, E, F, D, G, B
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p1_base + "**Q1.** Which box is at position 4 from top?",
        options: ["C", "E", "F", "A"], correctAnswer: "E",
        explanation: "Final Stack (Top to Bottom): 1:H, 2:A, 3:C, 4:E, 5:F, 6:D, 7:G, 8:B. Box E is at the 4th position."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p1_base + "**Q2.** How many boxes are between H and G?",
        options: ["3", "4", "5", "6"], correctAnswer: "5",
        explanation: "Stack: H, A, C, E, F, D, G, B. The boxes between H (1st) and G (7th) are A, C, E, F, and D. Total = 5 boxes."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p1_base + "**Q3.** Which box is immediately above B?",
        options: ["D", "E", "G", "F"], correctAnswer: "G",
        explanation: "Stack: H, A, C, E, F, D, G, B. G is immediately above B."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Easy",
        questionText: p1_base + "**Q4.** Which box is at the bottom?",
        options: ["E", "D", "G", "B"], correctAnswer: "B",
        explanation: "Since E cannot be at the bottom, and G is immediately below D (positions 6 and 7), B falls into the 8th (bottom) position."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Easy",
        questionText: p1_base + "**Q5.** What is the position of C from top?",
        options: ["2nd", "3rd", "4th", "5th"], correctAnswer: "3rd",
        explanation: "Stack: H, A, C, E, F, D, G, B. C is placed at the 3rd position."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p1_base + "**Q6.** Which pair has exactly 2 boxes between them?",
        options: ["A and F", "C and D", "F and B", "Both A & F, and F & B"], correctAnswer: "Both A & F, and F & B",
        explanation: "Between A(2) and F(5) there are 2 boxes (C, E). Between F(5) and B(8) there are 2 boxes (D, G). Both pairs are correct."
    },

    // ================== PUZZLE 2 (Q7 - Q12) ==================
    // Solved Stack (1 to 9): F, A, E, B, H, C, D, G, I
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Hard",
        questionText: p2_base + "**Q7.** Which book is 3rd from top?",
        options: ["E", "A", "F", "B"], correctAnswer: "E",
        explanation: "Final Stack: 1:F, 2:A, 3:E, 4:B, 5:H, 6:C, 7:D, 8:G, 9:I. Book E sits at the 3rd position."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Hard",
        questionText: p2_base + "**Q8.** How many books are between F and I?",
        options: ["5", "6", "7", "8"], correctAnswer: "7",
        explanation: "F is 1st and I is 9th. The number of books strictly between them is 7."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p2_base + "**Q9.** Who is immediately above H?",
        options: ["E", "B", "C", "A"], correctAnswer: "B",
        explanation: "Stack: F, A, E, B, H, C, D, G, I. Book B is immediately above H."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p2_base + "**Q10.** Position of G from top?",
        options: ["6th", "7th", "8th", "9th"], correctAnswer: "8th",
        explanation: "Stack: F, A, E, B, H, C, D, G, I. G is placed 8th, just above I."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Easy",
        questionText: p2_base + "**Q11.** Which book is at the middle?",
        options: ["B", "H", "C", "D"], correctAnswer: "H",
        explanation: "In a stack of 9, the middle position is the 5th book. H is at the 5th spot."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Easy",
        questionText: p2_base + "**Q12.** Which book is immediately below D?",
        options: ["G", "C", "I", "H"], correctAnswer: "G",
        explanation: "Stack: F, A, E, B, H, C, D, G, I. G is immediately below D."
    },

    // ================== PUZZLE 3 (Q13 - Q18) ==================
    // Solved Stack (1 to 7): V, P, T, S, R, U, Q
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p3_base + "**Q13.** Which file is at position 5?",
        options: ["S", "R", "U", "Q"], correctAnswer: "R",
        explanation: "Final Stack: 1:V, 2:P, 3:T, 4:S, 5:R, 6:U, 7:Q. File R sits at position 5."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p3_base + "**Q14.** How many files are below U?",
        options: ["0", "1", "2", "3"], correctAnswer: "1",
        explanation: "U is at the 6th position. Only Q (7th) is below U."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Easy",
        questionText: p3_base + "**Q15.** Which file is immediately above S?",
        options: ["V", "P", "T", "R"], correctAnswer: "T",
        explanation: "Stack: V, P, T, S, R, U, Q. T is immediately above S."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Easy",
        questionText: p3_base + "**Q16.** What is the position of R?",
        options: ["4th", "5th", "6th", "7th"], correctAnswer: "5th",
        explanation: "R is 5th, maintaining exactly 2 files (T, S) between P(2nd) and itself."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Easy",
        questionText: p3_base + "**Q17.** Which file is bottommost?",
        options: ["R", "U", "Q", "S"], correctAnswer: "Q",
        explanation: "Q cannot be adjacent to P (2nd), so Q is forced to the 7th (bottommost) position."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p3_base + "**Q18.** How many files are between V and U?",
        options: ["3", "4", "5", "6"], correctAnswer: "4",
        explanation: "V is 1st, U is 6th. The files strictly between them are P, T, S, R (4 files)."
    },

    // ================== PUZZLE 4 (Q19 - Q24) ==================
    // Solved Stack (1 to 10): J, D, A, B, E, F, H, I, G, C
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Hard",
        questionText: p4_base + "**Q19.** Which container is at 6th position from top?",
        options: ["F", "H", "I", "E"], correctAnswer: "F",
        explanation: "Final Stack: 1:J, 2:D, 3:A, 4:B, 5:E, 6:F, 7:H, 8:I, 9:G, 10:C. Container F is 6th."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Hard",
        questionText: p4_base + "**Q20.** How many containers are between D and H?",
        options: ["2", "3", "4", "5"], correctAnswer: "4",
        explanation: "D is 2nd, H is 7th. The containers between them are A, B, E, F. Total = 4."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p4_base + "**Q21.** Who is immediately below B?",
        options: ["A", "E", "F", "H"], correctAnswer: "E",
        explanation: "B is given to be immediately above E. Hence, E is immediately below B."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p4_base + "**Q22.** Position of I from top?",
        options: ["7th", "8th", "9th", "10th"], correctAnswer: "8th",
        explanation: "Stack: J, D, A, B, E, F, H, I, G, C. I is at the 8th position."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Easy",
        questionText: p4_base + "**Q23.** Which container is at the bottom?",
        options: ["G", "H", "C", "I"], correctAnswer: "C",
        explanation: "Since C must be below H (7th), and positions 8 & 9 are taken by I and G, C takes the 10th spot."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Hard",
        questionText: p4_base + "**Q24.** Which pair is adjacent?",
        options: ["F and H", "A and E", "H and G", "D and B"], correctAnswer: "F and H",
        explanation: "Looking at the stack: F is 6th and H is 7th. They are directly adjacent."
    },

    // ================== PUZZLE 5 (Q25 - Q30) ==================
    // Solved Stack: 1:K, 2:D, 3:E/J, 4:E/J, 5:G, 6:A, 7:B, 8:H, 9:F, 10:I, 11:C
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Hard",
        questionText: p5_base + "**Q25.** Which server is at position 5 from top?",
        options: ["G", "A", "H", "F"], correctAnswer: "G",
        explanation: "Final Stable Framework: 1:K, 2:D, (3&4: E/J), 5:G, 6:A, 7:B, 8:H, 9:F, 10:I, 11:C. Server G is locked at position 5."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Hard",
        questionText: p5_base + "**Q26.** How many servers are between K and B?",
        options: ["4", "5", "6", "7"], correctAnswer: "5",
        explanation: "K is 1st, B is 7th. The servers between them are D, (E/J), G, A. Total = 5 servers."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p5_base + "**Q27.** Which server is immediately below F?",
        options: ["H", "I", "C", "J"], correctAnswer: "I",
        explanation: "F is immediately above I. So I is immediately below F (Positions 9 and 10)."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Medium",
        questionText: p5_base + "**Q28.** Position of H from top?",
        options: ["7th", "8th", "9th", "10th"], correctAnswer: "8th",
        explanation: "Since G is 5th and there are 2 servers between G and H (6th and 7th), H must be 8th."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Easy",
        questionText: p5_base + "**Q29.** Which server is bottommost?",
        options: ["I", "J", "C", "B"], correctAnswer: "C",
        explanation: "C is below H (8th). Since 9 and 10 are strictly F and I, C is forced to the 11th position."
    },
    {
        category: "Logical Reasoning", topic: "Stack & Arrangement Puzzles", difficulty: "Hard",
        questionText: p5_base + "**Q30.** How many servers are below E?",
        options: ["7", "8", "6", "Cannot be determined strictly"], correctAnswer: "7",
        explanation: "Whether E is 3rd or 4th, the servers strictly below position 4 are G, A, B, H, F, I, C (exactly 7 servers)."
    }
];

const seedBatch40StackPuzzles = async () => {
    try {
        console.log("🧹 Clearing old Stack Puzzles records...");
        await Question.deleteMany({ topic: "Stack & Arrangement Puzzles" }); 
        
        console.log(`🚀 Injecting ${batch40Questions.length} Self-Contained Questions...`);
        await Question.insertMany(batch40Questions);
        
        console.log(`✅ SUCCESS! All 30 Stack Puzzle Questions Seeded with full context.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch40StackPuzzles();