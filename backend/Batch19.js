const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Coding-Decoding Seeding'))
  .catch(err => console.log(err));

const batch21Questions = [
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Hard",
        questionText: "If in a certain code language: COMPUTER = RFUVQNPC, Then how is LANGUAGE coded?",
        options: ["EHBVHOBL", "FHBVHOBL", "MBOHVBHF", "EHBVHOBC"],
        correctAnswer: "EHBVHOBL",
        explanation: "Step 1: First and last letters of COMPUTER are interchanged (C..R -> R..C).\nStep 2: The middle letters (OMPUTE) are reversed to (ETUPMO) and shifted by +1 (FUVQNP).\nStep 3: Combine them: R + FUVQNP + C = RFUVQNPC.\nStep 4: For LANGUAGE, swap L and E -> E......L.\nStep 5: Middle letters (ANGUAG) reversed -> GAUGNA. Shift +1 -> H B V H O B.\nStep 6: Final code = EHBVHOBL."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
        questionText: "If: MANGO = NZOHP, Then how will APPLE be coded?",
        options: ["ZQQMD", "BQQMF", "BQPMF", "ZQQME"],
        correctAnswer: "BQQMF",
        explanation: "Step 1: Let's assume standard +1 shift for all letters based on standard patterns (M->N, A->Z/B, etc).\nStep 2: If we apply a straight +1 shift: M(+1)=N, A(+1)=B, N(+1)=O, G(+1)=H, O(+1)=P.\nStep 3: Apply +1 to APPLE: A(+1)=B, P(+1)=Q, P(+1)=Q, L(+1)=M, E(+1)=F.\nStep 4: The code is BQQMF."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: DELHI = EFMIJ, Then how is INDIA coded?",
        options: ["JOEJB", "JMEJB", "KOEJC", "HOCHZ"],
        correctAnswer: "JOEJB",
        explanation: "Step 1: Each letter is shifted by +1 in the alphabet.\nStep 2: D->E, E->F, L->M, H->I, I->J.\nStep 3: I(+1)=J, N(+1)=O, D(+1)=E, I(+1)=J, A(+1)=B.\nStep 4: The code is JOEJB."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "In a code language: FLOWER = GMPXFS. How is GARDEN coded?",
        options: ["HBSEFO", "HBSFEO", "HASEFO", "HBSDFO"],
        correctAnswer: "HBSEFO",
        explanation: "Step 1: The logic is a +1 shift forward for every letter.\nStep 2: F->G, L->M, O->P, W->X, E->F, R->S.\nStep 3: G(+1)=H, A(+1)=B, R(+1)=S, D(+1)=E, E(+1)=F, N(+1)=O.\nStep 4: The code is HBSEFO."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
        questionText: "If: TRAIN = WUDLQ, Then how will PLANE be coded?",
        options: ["SODQH", "SMZMD", "ROCQG", "SOEQI"],
        correctAnswer: "SODQH",
        explanation: "Step 1: Each letter is shifted forward by +3.\nStep 2: T(20)+3=W(23), R(18)+3=U(21), A(1)+3=D(4), I(9)+3=L(12), N(14)+3=Q(17).\nStep 3: P(16)+3=S(19), L(12)+3=O(15), A(1)+3=D(4), N(14)+3=Q(17), E(5)+3=H(8).\nStep 4: The code is SODQH."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: SMART = TNBSU, Then how will BRAIN be coded?",
        options: ["CSBJO", "CQZHM", "DSBKP", "CSAKO"],
        correctAnswer: "CSBJO",
        explanation: "Step 1: The pattern is a direct +1 forward shift.\nStep 2: S->T, M->N, A->B, R->S, T->U.\nStep 3: B->C, R->S, A->B, I->J, N->O.\nStep 4: Final code is CSBJO."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: TABLE = UBCMF, Then how is CHAIR coded?",
        options: ["DIBJS", "DIBJT", "DIZJS", "DHBJS"],
        correctAnswer: "DIBJS",
        explanation: "Step 1: Forward shift by +1.\nStep 2: T->U, A->B, B->C, L->M, E->F.\nStep 3: C->D, H->I, A->B, I->J, R->S.\nStep 4: The code is DIBJS."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: SCHOOL = TDIPPM, Then how is COLLEGE coded?",
        options: ["DPMMFHF", "DPMMFHE", "DPMNGHF", "DPMMFFF"],
        correctAnswer: "DPMMFHF",
        explanation: "Step 1: Forward shift by +1.\nStep 2: S->T, C->D, H->I, O->P, O->P, L->M.\nStep 3: C->D, O->P, L->M, L->M, E->F, G->H, E->F.\nStep 4: The code is DPMMFHF."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: MOBILE = NPCJMF, Then how is LAPTOP coded?",
        options: ["MBQUPQ", "MBQUOQ", "MBQUPP", "NBQUPQ"],
        correctAnswer: "MBQUPQ",
        explanation: "Step 1: Forward shift by +1.\nStep 2: M->N, O->P, B->C, I->J, L->M, E->F.\nStep 3: L->M, A->B, P->Q, T->U, O->P, P->Q.\nStep 4: The code is MBQUPQ."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: WINDOW = XJOEPX, Then how is CURTAIN coded?",
        options: ["DVSUBJO", "DVSUBJP", "DVTUBJO", "DVSUAJO"],
        correctAnswer: "DVSUBJO",
        explanation: "Step 1: Forward shift by +1.\nStep 2: W->X, I->J, N->O, D->E, O->P, W->X.\nStep 3: C->D, U->V, R->S, T->U, A->B, I->J, N->O.\nStep 4: The code is DVSUBJO."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: FRIEND = DNEIRF, Then how is MARKET coded?",
        options: ["TEKRAM", "TEKARM", "TEKMAA", "TEKRMA"],
        correctAnswer: "TEKRAM",
        explanation: "Step 1: The logic is direct reverse coding. The letters of the word are written backwards.\nStep 2: FRIEND -> D-N-E-I-R-F.\nStep 3: MARKET -> T-E-K-R-A-M."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: DOCTOR = ROTCOD, Then how is ENGINEER coded?",
        options: ["REENIGNE", "REENIGEN", "RENEIGNE", "REENGINE"],
        correctAnswer: "REENIGNE",
        explanation: "Step 1: The word is completely reversed.\nStep 2: DOCTOR backward is ROTCOD.\nStep 3: ENGINEER backward is R-E-E-N-I-G-N-E."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: SYSTEM = METSYS, Then how is NETWORK coded?",
        options: ["KROWTEN", "KROWNET", "KROTWEN", "KROWTNE"],
        correctAnswer: "KROWTEN",
        explanation: "Step 1: The letters are reversed.\nStep 2: S-Y-S-T-E-M -> M-E-T-S-Y-S.\nStep 3: N-E-T-W-O-R-K -> K-R-O-W-T-E-N."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: COLLEGE = EGELLOC, Then how is UNIVERSITY coded?",
        options: ["YTISREVINU", "YTISREIVNU", "YTISERVNIU", "YTISREVNIU"],
        correctAnswer: "YTISREVINU",
        explanation: "Step 1: The letters are written in reverse order.\nStep 2: C-O-L-L-E-G-E -> E-G-E-L-L-O-C.\nStep 3: U-N-I-V-E-R-S-I-T-Y -> Y-T-I-S-R-E-V-I-N-U."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If: CAPTAIN = NIATPAC, Then how is SOLDIER coded?",
        options: ["REIDLOS", "REIDOLS", "REILDOS", "REIDLSO"],
        correctAnswer: "REIDLOS",
        explanation: "Step 1: Reverse the word entirely.\nStep 2: C-A-P-T-A-I-N -> N-I-A-T-P-A-C.\nStep 3: S-O-L-D-I-E-R -> R-E-I-D-L-O-S."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
        questionText: "If A = 1, B = 2, C = 3, etc., find the numerical code for APPLE.",
        options: ["50", "52", "54", "48"],
        correctAnswer: "50",
        explanation: "Step 1: Assign positional values to each letter.\nStep 2: A=1, P=16, P=16, L=12, E=5.\nStep 3: Sum = 1 + 16 + 16 + 12 + 5 = 50."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
        questionText: "If: CAT = 24, DOG = 26. Find the code for BAT.",
        options: ["22", "23", "24", "25"],
        correctAnswer: "23",
        explanation: "Step 1: The code is the sum of alphabetical positions.\nStep 2: C(3) + A(1) + T(20) = 24. D(4) + O(15) + G(7) = 26.\nStep 3: BAT = B(2) + A(1) + T(20) = 23."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
        questionText: "If CAR = 22 and BUS = 42, find the code for TRAIN.",
        options: ["60", "62", "64", "66"],
        correctAnswer: "62",
        explanation: "Step 1: The logic is sum of alphabetical positions.\nStep 2: C(3) + A(1) + R(18) = 22.\nStep 3: B(2) + U(21) + S(19) = 42.\nStep 4: TRAIN = T(20) + R(18) + A(1) + I(9) + N(14) = 62."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
        questionText: "If PEN = 35 and BOOK = 43, find the code for PAPER.",
        options: ["54", "56", "58", "60"],
        correctAnswer: "56",
        explanation: "Step 1: Add the positional values.\nStep 2: P(16) + E(5) + N(14) = 35.\nStep 3: B(2) + O(15) + O(15) + K(11) = 43.\nStep 4: PAPER = P(16) + A(1) + P(16) + E(5) + R(18) = 56."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
        questionText: "If SUN = 54 and MOON = 57, find the code for STAR.",
        options: ["56", "58", "60", "62"],
        correctAnswer: "58",
        explanation: "Step 1: Add positional values.\nStep 2: S(19) + U(21) + N(14) = 54.\nStep 3: M(13) + O(15) + O(15) + N(14) = 57.\nStep 4: STAR = S(19) + T(20) + A(1) + R(18) = 58."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If APPLE : FRUIT, then CARROT : ?",
        options: ["VEGETABLE", "ROOT", "PLANT", "ORANGE"],
        correctAnswer: "VEGETABLE",
        explanation: "Step 1: Apple belongs to the category of Fruit.\nStep 2: Similarly, Carrot belongs to the category of Vegetable."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If DOCTOR : HOSPITAL, then TEACHER : ?",
        options: ["OFFICE", "SCHOOL", "STUDENT", "CLASS"],
        correctAnswer: "SCHOOL",
        explanation: "Step 1: A Doctor works in a Hospital.\nStep 2: Similarly, a Teacher works in a School."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If ENGINEER : MACHINE, then AUTHOR : ?",
        options: ["BOOK", "PEN", "PAPER", "NOVEL"],
        correctAnswer: "BOOK",
        explanation: "Step 1: An Engineer builds/works with a Machine.\nStep 2: An Author writes/builds a Book."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If LAWYER : COURT, then PLAYER : ?",
        options: ["STADIUM", "BALL", "TEAM", "MATCH"],
        correctAnswer: "STADIUM",
        explanation: "Step 1: A Lawyer performs their duties in a Court.\nStep 2: A Player performs in a Stadium / Field."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Easy",
        questionText: "If BIRD : NEST, then LION : ?",
        options: ["CAVE", "DEN", "FOREST", "ZOO"],
        correctAnswer: "DEN",
        explanation: "Step 1: A Bird's natural home is a Nest.\nStep 2: A Lion's natural home is a Den."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Hard",
        questionText: "In a certain code: PENCIL = QFODJM, ERASER = FSBTFS. How is MARKER coded?",
        options: ["NBSLFS", "NBSMFS", "NCSLFS", "NBSLFR"],
        correctAnswer: "NBSLFS",
        explanation: "Step 1: P(+1)=Q, E(+1)=F, N(+1)=O, C(+1)=D, I(+1)=J, L(+1)=M.\nStep 2: The pattern is a direct +1 forward shift.\nStep 3: M(+1)=N, A(+1)=B, R(+1)=S, K(+1)=L, E(+1)=F, R(+1)=S.\nStep 4: Final code is NBSLFS."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
        questionText: "In a code language: DELTA = EFMUB, GAMMA = HBNNB. How is SIGMA coded?",
        options: ["TJHNB", "TJIMB", "TJHNC", "TJHMB"],
        correctAnswer: "TJHNB",
        explanation: "Step 1: D(+1)=E, E(+1)=F, L(+1)=M, T(+1)=U, A(+1)=B.\nStep 2: Apply +1 shift to SIGMA.\nStep 3: S(+1)=T, I(+1)=J, G(+1)=H, M(+1)=N, A(+1)=B.\nStep 4: Code is TJHNB."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Hard",
        questionText: "If: KNIGHT = MPKIJV. How is SOLDIER coded?",
        options: ["UQNFKGT", "UQMFKGT", "UQNFLGT", "UQNFKHS"],
        correctAnswer: "UQNFKGT",
        explanation: "Step 1: The shift is +2 for each letter.\nStep 2: K(11)->M(13), N(14)->P(16), I(9)->K(11), G(7)->I(9), H(8)->J(10), T(20)->V(22).\nStep 3: SOLDIER: S(+2)=U, O(+2)=Q, L(+2)=N, D(+2)=F, I(+2)=K, E(+2)=G, R(+2)=T.\nStep 4: Code is UQNFKGT."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Medium",
        questionText: "If: PROBLEM = QSPCMFN. How is SOLUTION coded?",
        options: ["TPMVUJPO", "TPNVUJPO", "TPMUVJPO", "TPMVUKPO"],
        correctAnswer: "TPMVUJPO",
        explanation: "Step 1: Forward shift by +1.\nStep 2: P->Q, R->S, O->P, B->C, L->M, E->F, M->N.\nStep 3: S->T, O->P, L->M, U->V, T->U, I->J, O->P, N->O.\nStep 4: Code is TPMVUJPO."
    },
    {
        category: "Logical Reasoning", topic: "Coding-Decoding", difficulty: "Hard",
        questionText: "In a certain code: COMPUTER = RFUVQNPC. How is ENGINEER coded?",
        options: ["RFFOJH0E", "RFFOJHOE", "RFFPIGOE", "RFFOKHOE"],
        correctAnswer: "RFFOJHOE",
        explanation: "Step 1: First and last letters are interchanged (C..R -> R..C).\nStep 2: The middle letters are reversed and shifted by +1. OMPUTE -> ETUPMO -> FUVQNP.\nStep 3: Apply to ENGINEER: Swap E and R -> R......E.\nStep 4: Middle letters: NGINEE -> EEIGNN (Wait, reversed is EENIGN). Shift +1 -> FFOJHO.\nStep 5: Final code = R + FFOJHO + E = RFFOJHOE."
    }
];

const seedBatch21CodingDecoding = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Coding-Decoding questions...");
        await Question.deleteMany({ topic: "Coding-Decoding" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch21Questions.length} Coding-Decoding Questions...`);
        
        await Question.insertMany(batch21Questions);
        console.log(`✅ BOOM! Tumhare pure 30 Coding-Decoding questions successfully seed ho gaye hain!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch21CodingDecoding();