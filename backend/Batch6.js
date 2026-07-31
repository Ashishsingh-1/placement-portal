const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Problems on Ages Seeding'))
  .catch(err => console.log(err));

const batch6Questions = [
    {
        category: "Aptitude", topic: "Ages", difficulty: "Easy",
        questionText: "The present age of A is twice the age of B. After 10 years, A's age will be 1.5 times B's age. Find their present ages.",
        options: ["20, 10", "24, 12", "30, 15", "40, 20"],
        correctAnswer: "20, 10",
        explanation: "Step 1: Let B's present age be x. A's present age = 2x.\nStep 2: After 10 years, A = 2x + 10 and B = x + 10.\nStep 3: Given: 2x + 10 = 1.5(x + 10).\nStep 4: 2x + 10 = 1.5x + 15 => 0.5x = 5 => x = 10.\nStep 5: Present ages: B = 10, A = 20."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Easy",
        questionText: "The ratio of present ages of A and B is 4:5. After 6 years, the ratio becomes 5:6. Find their present ages.",
        options: ["20, 25", "24, 30", "28, 35", "32, 40"],
        correctAnswer: "24, 30",
        explanation: "Step 1: Let ages be 4x and 5x.\nStep 2: (4x + 6) / (5x + 6) = 5 / 6.\nStep 3: Cross multiply: 6(4x + 6) = 5(5x + 6) => 24x + 36 = 25x + 30.\nStep 4: x = 6.\nStep 5: Present ages: A = 4(6) = 24, B = 5(6) = 30."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The sum of ages of a father and son is 60 years. Ten years ago, the father's age was four times the son's age. Find their present ages.",
        options: ["40, 20", "42, 18", "45, 15", "48, 12"],
        correctAnswer: "42, 18",
        explanation: "Step 1: Let son's present age = x, Father's present age = 60 - x.\nStep 2: 10 years ago: Son = x - 10, Father = 50 - x.\nStep 3: 50 - x = 4(x - 10) => 50 - x = 4x - 40.\nStep 4: 5x = 90 => x = 18.\nStep 5: Present ages: Son = 18, Father = 60 - 18 = 42."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "A mother is 24 years older than her daughter. After 8 years, she will be twice her daughter's age. Find their present ages.",
        options: ["36, 12", "40, 16", "42, 18", "48, 24"],
        correctAnswer: "40, 16",
        explanation: "Step 1: Let daughter's age = x. Mother's age = x + 24.\nStep 2: After 8 years: Daughter = x + 8, Mother = x + 32.\nStep 3: x + 32 = 2(x + 8) => x + 32 = 2x + 16.\nStep 4: x = 16.\nStep 5: Present ages: Daughter = 16, Mother = 16 + 24 = 40."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The present ages of two persons differ by 12 years. Five years ago, the elder was twice as old as the younger. Find their present ages.",
        options: ["25, 13", "27, 15", "29, 17", "31, 19"],
        correctAnswer: "29, 17",
        explanation: "Step 1: Let the younger be x. Elder = x + 12.\nStep 2: Five years ago: Younger = x - 5, Elder = x + 7.\nStep 3: x + 7 = 2(x - 5) => x + 7 = 2x - 10.\nStep 4: x = 17.\nStep 5: Present ages: Younger = 17, Elder = 17 + 12 = 29."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The ratio of ages of A and B is 3:4. After 8 years, the ratio becomes 4:5. Find present ages.",
        options: ["18, 24", "21, 28", "24, 32", "27, 36"],
        correctAnswer: "24, 32",
        explanation: "Step 1: Let present ages be 3x and 4x.\nStep 2: (3x + 8) / (4x + 8) = 4 / 5.\nStep 3: 15x + 40 = 16x + 32.\nStep 4: x = 8.\nStep 5: Present ages: A = 3(8) = 24, B = 4(8) = 32."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The sum of ages of a father and son is 72 years. Fifteen years ago, the father was five times the son's age. Find present ages.",
        options: ["50, 22", "52, 20", "54, 18", "55, 17"],
        correctAnswer: "50, 22",
        explanation: "Step 1: Present sum = 72. 15 years ago, sum of their ages = 72 - (15*2) = 42.\nStep 2: 15 years ago, Father = 5x, Son = x. Sum = 6x.\nStep 3: 6x = 42 => x = 7.\nStep 4: Ages 15 years ago: Son = 7, Father = 35.\nStep 5: Present ages: Son = 7 + 15 = 22. Father = 35 + 15 = 50."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The ratio of ages of A, B and C is 2:3:5. After 10 years, their ages will be in the ratio 4:5:7. Find present ages.",
        options: ["8, 12, 20", "10, 15, 25", "12, 18, 30", "14, 21, 35"],
        correctAnswer: "10, 15, 25",
        explanation: "Step 1: Compare the ratios. Present = 2:3:5. Future = 4:5:7.\nStep 2: Notice that each term increases by exactly 2 parts (4-2=2, 5-3=2, 7-5=2).\nStep 3: This 2 parts increase corresponds to 10 years.\nStep 4: 2 parts = 10 => 1 part = 5.\nStep 5: Present ages: 2(5)=10, 3(5)=15, 5(5)=25."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "Ten years ago, the age ratio of A and B was 1:2. Five years from now, it will be 2:3. Find their present ages.",
        options: ["20, 35", "25, 40", "30, 45", "35, 50"],
        correctAnswer: "25, 40",
        explanation: "Step 1: Let ages 10 years ago be x and 2x. Present ages = (x+10) and (2x+10).\nStep 2: 5 years from now, ages will be (x+15) and (2x+15).\nStep 3: (x+15) / (2x+15) = 2 / 3.\nStep 4: 3x + 45 = 4x + 30 => x = 15.\nStep 5: Present ages: A = 15 + 10 = 25. B = 2*15 + 10 = 40."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The average age of a husband and wife was 23 years when they were married 5 years ago. Now they have a child and the average age of the family is 20 years. Find the age of the child.",
        options: ["2 years", "3 years", "4 years", "5 years"],
        correctAnswer: "4 years",
        explanation: "Step 1: 5 years ago, sum of ages of husband and wife = 23 * 2 = 46 years.\nStep 2: Present sum of ages of husband and wife = 46 + (5 * 2) = 56 years.\nStep 3: Present average of family (3 members) = 20 years. Total sum = 20 * 3 = 60 years.\nStep 4: Child's age = Total sum - (Sum of husband and wife) = 60 - 56 = 4 years."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The present age of a father is three times that of his son. Fifteen years later, he will be twice the son's age. Find their present ages.",
        options: ["30, 10", "36, 12", "42, 14", "45, 15"],
        correctAnswer: "45, 15",
        explanation: "Step 1: Let son's age = x, Father = 3x.\nStep 2: After 15 years: Son = x + 15, Father = 3x + 15.\nStep 3: 3x + 15 = 2(x + 15) => 3x + 15 = 2x + 30.\nStep 4: x = 15.\nStep 5: Present ages: Son = 15, Father = 3(15) = 45."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The ratio of ages of two brothers is 5:7. Four years ago, the ratio was 3:5. Find their present ages.",
        options: ["10, 14", "15, 21", "20, 28", "25, 35"],
        correctAnswer: "10, 14",
        explanation: "Step 1: Let present ages be 5x and 7x.\nStep 2: Four years ago: (5x - 4) / (7x - 4) = 3 / 5.\nStep 3: 25x - 20 = 21x - 12.\nStep 4: 4x = 8 => x = 2.\nStep 5: Present ages: 5(2) = 10, 7(2) = 14."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Easy",
        questionText: "A is 8 years older than B. Ten years ago, A was twice B's age. Find present ages.",
        options: ["24, 16", "26, 18", "28, 20", "30, 22"],
        correctAnswer: "26, 18",
        explanation: "Step 1: Let B = x, A = x + 8.\nStep 2: 10 years ago: B = x - 10, A = x - 2.\nStep 3: x - 2 = 2(x - 10) => x - 2 = 2x - 20.\nStep 4: x = 18.\nStep 5: Present ages: B = 18, A = 18 + 8 = 26."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The sum of ages of A and B is 54 years. Six years ago, the ratio was 3:4. Find their present ages.",
        options: ["20, 34", "22, 32", "24, 30", "26, 28"],
        correctAnswer: "24, 30",
        explanation: "Step 1: Present sum = 54. 6 years ago, sum = 54 - 12 = 42.\nStep 2: 6 years ago ratio = 3:4. So, 3x + 4x = 42 => 7x = 42 => x = 6.\nStep 3: Ages 6 years ago: A = 18, B = 24.\nStep 4: Present ages: A = 18 + 6 = 24, B = 24 + 6 = 30."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The ratio of ages of father and son is 7:2. Twelve years later, the ratio becomes 11:4. Find present ages.",
        options: ["70, 20", "84, 24", "91, 26", "98, 28"],
        correctAnswer: "98, 28",
        explanation: "Step 1: Let present ages be 7x and 2x.\nStep 2: (7x + 12) / (2x + 12) = 11 / 4.\nStep 3: 28x + 48 = 22x + 132.\nStep 4: 6x = 84 => x = 14.\nStep 5: Present ages: 7(14) = 98, 2(14) = 28."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The average age of 30 students is 16 years. One student leaves and a new student joins. The average increases by 0.5 years. Find the age difference between the two students.",
        options: ["10 years", "12 years", "15 years", "18 years"],
        correctAnswer: "15 years",
        explanation: "Step 1: Total initial age = 30 * 16 = 480.\nStep 2: Number of students remains 30. New average = 16.5.\nStep 3: New total age = 30 * 16.5 = 495.\nStep 4: The difference in total age is caused by the new student. Difference = 495 - 480 = 15 years."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "A father is 30 years older than his son. After 5 years, he will be three times as old as his son. Find present ages.",
        options: ["35, 5", "40, 10", "45, 15", "50, 20"],
        correctAnswer: "40, 10",
        explanation: "Step 1: Let son's age = x, Father = x + 30.\nStep 2: After 5 years: Son = x + 5, Father = x + 35.\nStep 3: x + 35 = 3(x + 5) => x + 35 = 3x + 15.\nStep 4: 2x = 20 => x = 10.\nStep 5: Present ages: Son = 10, Father = 10 + 30 = 40."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The present age ratio of A and B is 6:7. After 12 years, the ratio becomes 7:8. Find their present ages.",
        options: ["48, 56", "60, 70", "72, 84", "84, 98"],
        correctAnswer: "72, 84",
        explanation: "Step 1: The ratio goes from 6:7 to 7:8. Each part increases by 1.\nStep 2: This 1 part increase corresponds to 12 years.\nStep 3: 1 part = 12 years.\nStep 4: Present ages: A = 6(12) = 72, B = 7(12) = 84."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The average age of a class is 18 years. When the teacher joins, the average becomes 19 years. If there are 40 students, find teacher's age.",
        options: ["45", "50", "55", "59"],
        correctAnswer: "59",
        explanation: "Step 1: Total age of 40 students = 40 * 18 = 720.\nStep 2: When teacher joins, total members = 41. New average = 19.\nStep 3: New total age = 41 * 19 = 779.\nStep 4: Teacher's age = 779 - 720 = 59 years."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The ratio of ages of husband and wife is 5:4. Eight years ago, the ratio was 4:3. Find present ages.",
        options: ["35, 28", "40, 32", "45, 36", "50, 40"],
        correctAnswer: "40, 32",
        explanation: "Step 1: Ratio goes from 4:3 (past) to 5:4 (present). Each part increases by 1.\nStep 2: 1 part = 8 years.\nStep 3: Present ages: Husband = 5(8) = 40, Wife = 4(8) = 32."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The sum of ages of grandfather, father and son is 120 years. The ratio of their ages is 8:5:2. Find their present ages.",
        options: ["60:35:15", "64:40:16", "72:36:12", "80:30:10"],
        correctAnswer: "64:40:16",
        explanation: "Step 1: Total parts = 8 + 5 + 2 = 15 parts.\nStep 2: 15 parts = 120 years => 1 part = 8 years.\nStep 3: Grandfather = 8(8) = 64, Father = 5(8) = 40, Son = 2(8) = 16."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Easy",
        questionText: "A's age after 15 years will be four times what it was 15 years ago. Find A's present age.",
        options: ["20", "25", "30", "35"],
        correctAnswer: "25",
        explanation: "Step 1: Let present age be x.\nStep 2: x + 15 = 4(x - 15).\nStep 3: x + 15 = 4x - 60.\nStep 4: 3x = 75 => x = 25."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The ratio of present ages of A and B is 7:9. Six years ago, the ratio was 5:7. Find present ages.",
        options: ["14, 18", "21, 27", "28, 36", "35, 45"],
        correctAnswer: "21, 27",
        explanation: "Step 1: Ratio goes from 5:7 to 7:9. Each part increases by exactly 2.\nStep 2: 2 parts = 6 years => 1 part = 3 years.\nStep 3: Present ages: A = 7(3) = 21, B = 9(3) = 27."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "A mother is three times as old as her daughter. After 12 years, she will be twice as old. Find present ages.",
        options: ["30, 10", "33, 11", "36, 12", "42, 14"],
        correctAnswer: "36, 12",
        explanation: "Step 1: Let daughter = x, Mother = 3x.\nStep 2: After 12 years: Daughter = x + 12, Mother = 3x + 12.\nStep 3: 3x + 12 = 2(x + 12) => 3x + 12 = 2x + 24.\nStep 4: x = 12.\nStep 5: Present ages: Daughter = 12, Mother = 3(12) = 36."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Medium",
        questionText: "The difference between ages of two sisters is 6 years. Four years ago, the elder was twice as old as the younger. Find present ages.",
        options: ["12, 6", "14, 8", "16, 10", "18, 12"],
        correctAnswer: "16, 10",
        explanation: "Step 1: Let younger = x, Elder = x + 6.\nStep 2: Four years ago: Younger = x - 4, Elder = x + 2.\nStep 3: x + 2 = 2(x - 4) => x + 2 = 2x - 8.\nStep 4: x = 10.\nStep 5: Present ages: Younger = 10, Elder = 16."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The present ages of A, B and C are in the ratio 3:4:5. Five years ago, their ages were in the ratio 2:3:4. Find present ages.",
        options: ["12:16:20", "15:20:25", "18:24:30", "21:28:35"],
        correctAnswer: "15:20:25",
        explanation: "Step 1: From 5 years ago to present, the ratio changes from 2:3:4 to 3:4:5. Each person's ratio part increases by exactly 1.\nStep 2: 1 part = 5 years.\nStep 3: Present ages = 3(5), 4(5), 5(5) = 15, 20, 25."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "A father is 4 times as old as his son. Eight years ago, he was 6 times as old. Find present ages.",
        options: ["60, 15", "64, 16", "72, 18", "80, 20"],
        correctAnswer: "80, 20",
        explanation: "Step 1: Let son = x, Father = 4x.\nStep 2: 8 years ago: Son = x - 8, Father = 4x - 8.\nStep 3: 4x - 8 = 6(x - 8) => 4x - 8 = 6x - 48.\nStep 4: 2x = 40 => x = 20.\nStep 5: Present ages: Son = 20, Father = 4(20) = 80."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The average age of a cricket team of 11 players is 24 years. A player aged 30 is replaced by another player. The average decreases by 1 year. Find the new player's age.",
        options: ["18 years", "19 years", "20 years", "21 years"],
        correctAnswer: "19 years",
        explanation: "Step 1: Total initial age = 11 * 24 = 264.\nStep 2: New average = 23. New total age = 11 * 23 = 253.\nStep 3: Difference in total = 264 - 253 = 11 years.\nStep 4: New player is 11 years younger than the old player.\nStep 5: New player's age = 30 - 11 = 19 years."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The ratio of ages of A and B is 4:7. Seven years ago, the ratio was 1:2. Find present ages.",
        options: ["20, 35", "24, 42", "28, 49", "32, 56"],
        correctAnswer: "28, 49",
        explanation: "Step 1: Let present ages be 4x and 7x.\nStep 2: (4x - 7) / (7x - 7) = 1 / 2.\nStep 3: 8x - 14 = 7x - 7.\nStep 4: x = 7.\nStep 5: Present ages: A = 4(7) = 28, B = 7(7) = 49."
    },
    {
        category: "Aptitude", topic: "Ages", difficulty: "Hard",
        questionText: "The sum of ages of a father, mother and son is 105 years. Five years ago, the ratio of their ages was 9:7:2. Find their present ages.",
        options: ["48:42:15", "50:40:15", "52:38:15", "55:35:15"],
        correctAnswer: "50:40:15",
        explanation: "Step 1: Present sum = 105. Sum 5 years ago = 105 - (3 * 5) = 105 - 15 = 90.\nStep 2: Ratio 5 years ago = 9:7:2. Total parts = 18.\nStep 3: 18 parts = 90 => 1 part = 5.\nStep 4: Ages 5 years ago: 9(5)=45, 7(5)=35, 2(5)=10.\nStep 5: Present ages: 45+5 = 50, 35+5 = 40, 10+5 = 15."
    }
];

const seedBatch6Ages = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Ages questions...");
        await Question.deleteMany({ topic: "Ages" }); 
        console.log("🗑️ Purana Ages data safely deleted!");

        console.log(`🚀 Injecting ${batch6Questions.length} Custom Ages Questions into the database...`);
        
        await Question.insertMany(batch6Questions);
        console.log(`✅ BOOM! Tumhara custom 'Problems on Ages' data successfully seed ho gaya!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch6Ages();