const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Advanced Arrangements Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const p1_base = "**Puzzle 1:** Eight students A, B, C, D, E, F, G, H give presentations on 2, 4, 8, 10, 14, 16, 20, 22 of January.\n- A presents before C. Exactly two presentations occur between A and C.\n- F presents immediately after D.\n- H presents on an even date greater than 16.\n- E is before B.\n- G is neither first nor last.\n- C is after F.\n- B is not on 22 January.\n\n";

const p2_base = "**Puzzle 2:** Nine candidates A, B, C, D, E, F, G, H, I interview in January, February, March on dates 5, 15, 25.\n- A is interviewed in February.\n- B is immediately after C in the same month.\n- H is on 25.\n- Exactly one person is between D and F.\n- G is before A.\n- I is in March.\n- E is not in January.\n- C is not on 25.\n\n";

const p3_base = "**Puzzle 3:** Seven companies A, B, C, D, E, F, G launch products on April 2, 6, 10, 14, 18, 22, 26.\n- A launches after D. Three launches occur between D and A.\n- F is immediately before C.\n- G launches after A.\n- E is not on the last date.\n- B is before F.\n- C is not on 26.\n\n";

const p4_base = "**Puzzle 4:** Ten employees A–J train in May and June on dates 3, 6, 9, 12, 15.\n- A is in May.\n- B is immediately before C.\n- D is after H.\n- J is on 15 June.\n- F is on an odd date.\n- G is before A.\n- I is in June.\n- Exactly three people are between E and F.\n- C is not in June.\n\n";

const p5_base = "**Puzzle 5 (Deloitte Pattern):** Eleven consultants A–K are scheduled in Jan, Feb, Mar on dates 5, 10, 15, 20 (first 11 slots used).\n- A is before D. Exactly four consultants are between A and D.\n- H is immediately after F.\n- K is in March.\n- G is before C.\n- B is not on date 20.\n- I is in February.\n- E is immediately before J.\n- C is after D.\n- F is not in January.\n- A is not on the first slot.\n\n";

const batch41Questions = [
    // ================== PUZZLE 1 (Q1 - Q6) ==================
    // Solved Stack: 1:E, 2:A, 3:D, 4:F, 5:C, 6:G, 7:B, 8:H
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p1_base + "**Q1.** Who presents on 10 January?",
        options: ["F", "D", "C", "G"], correctAnswer: "F",
        explanation: "Final Order: 1(2nd):E, 2(4th):A, 3(8th):D, 4(10th):F, 5(14th):C, 6(16th):G, 7(20th):B, 8(22nd):H. F presents on the 4th slot (10 Jan)."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p1_base + "**Q2.** Who presents first?",
        options: ["E", "A", "D", "G"], correctAnswer: "E",
        explanation: "Based on the arrangement (E, A, D, F, C, G, B, H), E presents first on 2 January."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p1_base + "**Q3.** How many presentations occur between D and C?",
        options: ["0", "1", "2", "3"], correctAnswer: "1",
        explanation: "D is 3rd and C is 5th. Only F (4th) presents between them. So, 1 presentation."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p1_base + "**Q4.** Who presents on 20 January?",
        options: ["G", "B", "H", "C"], correctAnswer: "B",
        explanation: "The 7th slot corresponds to 20 January. B is placed in the 7th slot since H takes 22 January."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p1_base + "**Q5.** Who presents immediately before B?",
        options: ["C", "F", "G", "H"], correctAnswer: "G",
        explanation: "In the sequence E, A, D, F, C, G, B, H, G presents immediately before B."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p1_base + "**Q6.** Who presents last?",
        options: ["B", "H", "G", "C"], correctAnswer: "H",
        explanation: "H is on an even date greater than 16 (either 20 or 22). B cannot be on 22, so H must be on 22 January (last)."
    },

    // ================== PUZZLE 2 (Q7 - Q12) ==================
    // Solved Stack: Jan(C,B,H), Feb(G,A,D), Mar(I,F,E)
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Hard",
        questionText: p2_base + "**Q7.** Who is interviewed on 15 February?",
        options: ["A", "D", "G", "F"], correctAnswer: "A",
        explanation: "Final Order: Jan(5:C, 15:B, 25:H), Feb(5:G, 15:A, 25:D), Mar(5:I, 15:F, 25:E). A is scheduled on 15 Feb."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Hard",
        questionText: p2_base + "**Q8.** Who is on 5 March?",
        options: ["F", "I", "E", "D"], correctAnswer: "I",
        explanation: "In the derived sequence, March has I, F, E. The first date in March (5 March) is taken by I."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p2_base + "**Q9.** Which month contains F?",
        options: ["January", "February", "March", "Cannot be determined"], correctAnswer: "March",
        explanation: "F is scheduled on 15 March to maintain exactly one person (I) between D (25 Feb) and F."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p2_base + "**Q10.** Who is immediately before B?",
        options: ["A", "C", "G", "H"], correctAnswer: "C",
        explanation: "B is immediately after C in the same month (January). Therefore, C is immediately before B."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p2_base + "**Q11.** Who is interviewed first?",
        options: ["G", "C", "B", "I"], correctAnswer: "C",
        explanation: "C is scheduled on 5 January, which is the very first slot."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p2_base + "**Q12.** Which candidate is on 25 January?",
        options: ["H", "D", "E", "A"], correctAnswer: "H",
        explanation: "H is fixed on 25. Since C and B take 5 and 15 Jan, H perfectly fits 25 Jan."
    },

    // ================== PUZZLE 3 (Q13 - Q18) ==================
    // Solved Stack: 1:D, 2:B, 3:F, 4:C, 5:A, 6:E, 7:G
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p3_base + "**Q13.** Who launches on 10 April?",
        options: ["B", "F", "C", "A"], correctAnswer: "F",
        explanation: "Final Order: 2:D, 6:B, 10:F, 14:C, 18:A, 22:E, 26:G. F launches on 10 April."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p3_base + "**Q14.** Who launches first?",
        options: ["D", "B", "A", "F"], correctAnswer: "D",
        explanation: "D launches first on 2 April to allow exactly three companies (B, F, C) before A."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p3_base + "**Q15.** How many launches occur after G?",
        options: ["0", "1", "2", "3"], correctAnswer: "0",
        explanation: "G launches on 26 April, which is the last date. Therefore, 0 launches occur after G."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p3_base + "**Q16.** Who launches on 22 April?",
        options: ["A", "E", "G", "C"], correctAnswer: "E",
        explanation: "E is not on the last date (26th) and is placed on 22 April right before G."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p3_base + "**Q17.** Who is immediately after B?",
        options: ["D", "F", "C", "A"], correctAnswer: "F",
        explanation: "In the sequence D, B, F, C, A, E, G, F launches immediately after B."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p3_base + "**Q18.** Who launches last?",
        options: ["G", "E", "A", "C"], correctAnswer: "G",
        explanation: "G is the only one left for 26 April, so G launches last."
    },

    // ================== PUZZLE 4 (Q19 - Q24) ==================
    // Solved Stack: May(B,C,G,E,A), June(H,I,F,D,J)
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Hard",
        questionText: p4_base + "**Q19.** Who attends on 6 May?",
        options: ["C", "B", "G", "E"], correctAnswer: "C",
        explanation: "Final Order: May(3:B, 6:C, 9:G, 12:E, 15:A), June(3:H, 6:I, 9:F, 12:D, 15:J). C attends on 6 May."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p4_base + "**Q20.** Who attends on 15 May?",
        options: ["A", "E", "G", "H"], correctAnswer: "A",
        explanation: "A is in May. After placing B,C,G,E, A takes the 15 May slot."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p4_base + "**Q21.** Who is immediately after B?",
        options: ["G", "E", "C", "A"], correctAnswer: "C",
        explanation: "B is immediately before C, so C is immediately after B."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p4_base + "**Q22.** Who attends first?",
        options: ["B", "C", "G", "A"], correctAnswer: "B",
        explanation: "B attends first on 3 May."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p4_base + "**Q23.** Who attends on 9 June?",
        options: ["I", "F", "D", "H"], correctAnswer: "F",
        explanation: "F is on an odd date. June 9 is an odd date and satisfies the '3 people between E and F' condition perfectly."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p4_base + "**Q24.** Who attends last?",
        options: ["D", "J", "F", "I"], correctAnswer: "J",
        explanation: "J is strictly given to be on 15 June, which is the last available date."
    },

    // ================== PUZZLE 5 (Q25 - Q30) ==================
    // Solved Stack: 1:E, 2:J, 3:G, 4:A, 5:B, 6:F, 7:H, 8:I, 9:D, 10:C, 11:K
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Hard",
        questionText: p5_base + "**Q25.** Who is scheduled on 10 February?",
        options: ["B", "F", "H", "I"], correctAnswer: "F",
        explanation: "Final Order: E, J, G, A, B, F, H, I, D, C, K. The 6th slot corresponds to 10 Feb. F is scheduled there."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Hard",
        questionText: p5_base + "**Q26.** Who is the first consultant?",
        options: ["A", "G", "E", "J"], correctAnswer: "E",
        explanation: "E is immediately before J, and A is not on the first slot. E takes the 1st position (5 Jan)."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p5_base + "**Q27.** How many consultants are between A and D?",
        options: ["2", "3", "4", "5"], correctAnswer: "4",
        explanation: "This is explicitly stated in the puzzle conditions: Exactly four consultants are between A and D."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p5_base + "**Q28.** Who is immediately before J?",
        options: ["E", "G", "A", "C"], correctAnswer: "E",
        explanation: "As per the direct condition, E is immediately before J."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Easy",
        questionText: p5_base + "**Q29.** Who is scheduled last?",
        options: ["D", "C", "K", "I"], correctAnswer: "K",
        explanation: "K is in March. Based on the 11-slot layout, K takes the final 11th slot (15 March)."
    },
    {
        category: "Logical Reasoning", topic: "Advanced Arrangements", difficulty: "Medium",
        questionText: p5_base + "**Q30.** Which consultant is on 15 March?",
        options: ["C", "D", "K", "H"], correctAnswer: "K",
        explanation: "15 March is the 11th slot. K occupies this final slot."
    }
];

const seedBatch41AdvancedArrangements = async () => {
    try {
        console.log("🧹 Clearing old Advanced Arrangements records...");
        await Question.deleteMany({ topic: "Advanced Arrangements" }); 
        
        console.log(`🚀 Injecting ${batch41Questions.length} Self-Contained Questions...`);
        await Question.insertMany(batch41Questions);
        
        console.log(`✅ SUCCESS! All 30 Advanced Arrangement Questions Seeded with full context.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch41AdvancedArrangements();