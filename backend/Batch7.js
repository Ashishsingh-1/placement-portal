const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Averages Seeding'))
  .catch(err => console.log(err));

const batch7Questions = [
    {
        category: "Aptitude", topic: "Averages", difficulty: "Easy",
        questionText: "The average age of 40 students is 18 years. When the teacher is included, the average becomes 19 years. Find the teacher's age.",
        options: ["50", "55", "59", "60"],
        correctAnswer: "59",
        explanation: "Step 1: Total age of 40 students = 40 * 18 = 720 years.\nStep 2: When teacher is included, total members = 41. New average = 19.\nStep 3: New total age = 41 * 19 = 779 years.\nStep 4: Teacher's age = New Total - Old Total = 779 - 720 = 59 years."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of 25 numbers is 48. If one number is excluded, the average becomes 47. Find the excluded number.",
        options: ["68", "70", "72", "74"],
        correctAnswer: "72",
        explanation: "Step 1: Total of 25 numbers = 25 * 48 = 1200.\nStep 2: Total of remaining 24 numbers = 24 * 47 = 1128.\nStep 3: Excluded number = Total of 25 - Total of 24 = 1200 - 1128 = 72."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of 20 numbers is 35. The average of the first 12 numbers is 32 and that of the last 9 numbers is 40. Find the 12th number.",
        options: ["40", "42", "44", "46"],
        correctAnswer: "44",
        explanation: "Step 1: Total of 20 numbers = 20 * 35 = 700.\nStep 2: Total of first 12 = 12 * 32 = 384.\nStep 3: Total of last 9 = 9 * 40 = 360.\nStep 4: Since 12 + 9 = 21, the 12th number is counted twice.\nStep 5: 12th number = (384 + 360) - 700 = 744 - 700 = 44."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average weight of 8 persons increases by 2.5 kg when a person weighing 72 kg replaces another person. Find the weight of the replaced person.",
        options: ["50 kg", "52 kg", "54 kg", "56 kg"],
        correctAnswer: "52 kg",
        explanation: "Step 1: Total weight increase = 8 persons * 2.5 kg = 20 kg.\nStep 2: The new person brings 20 kg more weight than the old person.\nStep 3: Weight of replaced (old) person = New person's weight - Increase = 72 - 20 = 52 kg."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Hard",
        questionText: "The average marks of a class of 45 students is 68. If the average marks of boys is 72 and girls is 63, find the number of boys.",
        options: ["15", "20", "25", "30"],
        correctAnswer: "25",
        explanation: "Step 1: Use mixture and alligation. Boys = 72, Girls = 63, Overall = 68.\nStep 2: Ratio of Boys : Girls = (68 - 63) : (72 - 68) = 5 : 4.\nStep 3: Total parts = 5 + 4 = 9. 9 parts = 45 students.\nStep 4: 1 part = 5 students.\nStep 5: Number of boys = 5 parts = 5 * 5 = 25."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average age of a husband, wife and their child is 24 years. If the child is 6 years old, find the average age of husband and wife.",
        options: ["30", "32", "33", "34"],
        correctAnswer: "33",
        explanation: "Step 1: Total age of husband, wife, and child (3 people) = 3 * 24 = 72 years.\nStep 2: Child's age = 6 years.\nStep 3: Total age of husband and wife = 72 - 6 = 66 years.\nStep 4: Average age of husband and wife = 66 / 2 = 33 years."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Easy",
        questionText: "The average of five consecutive odd numbers is 51. Find the largest number.",
        options: ["53", "55", "57", "59"],
        correctAnswer: "55",
        explanation: "Step 1: For any consecutive arithmetic sequence with an odd number of terms, the average is the exact middle term.\nStep 2: Middle term (3rd number) = 51.\nStep 3: The sequence is 47, 49, 51, 53, 55.\nStep 4: Largest number = 55."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Easy",
        questionText: "The average of 15 numbers is 28. If each number is increased by 4, find the new average.",
        options: ["30", "32", "34", "36"],
        correctAnswer: "32",
        explanation: "Step 1: Property of Averages: If a constant 'k' is added to every observation, the average also increases by 'k'.\nStep 2: New Average = Old Average + 4.\nStep 3: New Average = 28 + 4 = 32."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of 12 numbers is 30. If two numbers 40 and 50 are replaced by 60 and 80, find the new average.",
        options: ["32.5", "33.33", "34.16", "35"],
        correctAnswer: "34.16",
        explanation: "Step 1: Total initial sum = 12 * 30 = 360.\nStep 2: Removed sum = 40 + 50 = 90. Added sum = 60 + 80 = 140.\nStep 3: Net change in sum = 140 - 90 = +50.\nStep 4: New total sum = 360 + 50 = 410.\nStep 5: New average = 410 / 12 = 34.166... ≈ 34.16."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of 10 numbers is 45. One number was incorrectly taken as 60 instead of 90. Find the correct average.",
        options: ["46", "47", "48", "49"],
        correctAnswer: "48",
        explanation: "Step 1: Error in reading = Correct value - Incorrect value = 90 - 60 = +30.\nStep 2: This means the sum was short by 30.\nStep 3: Increase in average = Total Error / Number of items = 30 / 10 = +3.\nStep 4: Correct average = 45 + 3 = 48."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average income of 15 employees is ₹25,000. If the manager's salary is included, the average becomes ₹28,000. Find the manager's salary.",
        options: ["₹70,000", "₹72,000", "₹73,000", "₹75,000"],
        correctAnswer: "₹73,000",
        explanation: "Step 1: Total salary of 15 employees = 15 * 25,000 = ₹3,75,000.\nStep 2: Total salary of 16 people (including manager) = 16 * 28,000 = ₹4,48,000.\nStep 3: Manager's salary = 4,48,000 - 3,75,000 = ₹73,000."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Hard",
        questionText: "The average age of 50 players is 22 years. If 5 players leave whose average age is 18 years, find the average age of remaining players.",
        options: ["22.44", "22.5", "23", "23.2"],
        correctAnswer: "22.44",
        explanation: "Step 1: Total age of 50 players = 50 * 22 = 1100.\nStep 2: Total age of 5 leaving players = 5 * 18 = 90.\nStep 3: Remaining age = 1100 - 90 = 1010.\nStep 4: Remaining players = 50 - 5 = 45.\nStep 5: New average = 1010 / 45 = 22.44 years."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of 8 consecutive integers is 24.5. Find the smallest integer.",
        options: ["20", "21", "22", "23"],
        correctAnswer: "21",
        explanation: "Step 1: The average of an even number of consecutive integers falls exactly between the two middle numbers.\nStep 2: The 4th and 5th numbers average 24.5. So, 4th number = 24 and 5th number = 25.\nStep 3: To find the 1st (smallest) number: 24 - 3 = 21."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Hard",
        questionText: "The average marks of 20 students is 74. The average marks of passed students is 80 and failed students is 50. If 4 students failed, find the total marks of the passed students.",
        options: ["1080", "1200", "1280", "1350"],
        correctAnswer: "1280",
        explanation: "Step 1: Number of failed students = 4. Number of passed students = 20 - 4 = 16.\nStep 2: Average of passed students = 80.\nStep 3: Total marks of passed students = 16 * 80 = 1280."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of 30 observations is 72. If one observation 96 is omitted, find the average of remaining observations.",
        options: ["70", "71.17", "72", "73"],
        correctAnswer: "71.17",
        explanation: "Step 1: Total sum of 30 observations = 30 * 72 = 2160.\nStep 2: New sum after omitting 96 = 2160 - 96 = 2064.\nStep 3: Remaining observations = 29.\nStep 4: New average = 2064 / 29 = 71.172... ≈ 71.17."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Hard",
        questionText: "The average age of A, B and C is 30 years. If D joins them, the average becomes 32 years. Find D's age.",
        options: ["36", "38", "40", "42"],
        correctAnswer: "38",
        explanation: "Step 1: Total age of A, B, C (3 people) = 3 * 30 = 90 years.\nStep 2: Total age of A, B, C, D (4 people) = 4 * 32 = 128 years.\nStep 3: D's age = Total of 4 - Total of 3 = 128 - 90 = 38 years."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of 50 numbers is 40. Later it is found that one number 36 was wrongly read as 63. Find the correct average.",
        options: ["39.46", "39.5", "40.5", "40.54"],
        correctAnswer: "39.46",
        explanation: "Step 1: Error = Correct - Incorrect = 36 - 63 = -27.\nStep 2: Total sum was overestimated by 27.\nStep 3: Error per number = -27 / 50 = -0.54.\nStep 4: Correct average = 40 - 0.54 = 39.46."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Easy",
        questionText: "The average score of a batsman in 10 innings is 54. In the next inning he scores 96 runs. Find his new average.",
        options: ["56.5", "57.81", "58", "58.2"],
        correctAnswer: "57.81",
        explanation: "Step 1: Total runs in 10 innings = 10 * 54 = 540.\nStep 2: Runs in 11th inning = 96. New total = 540 + 96 = 636.\nStep 3: New average = 636 / 11 = 57.818... ≈ 57.81."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of 7 numbers is 42. If the average of first 4 numbers is 38 and that of last 4 numbers is 46, find the middle number.",
        options: ["38", "40", "42", "44"],
        correctAnswer: "42",
        explanation: "Step 1: Total sum of 7 numbers = 7 * 42 = 294.\nStep 2: Sum of first 4 numbers = 4 * 38 = 152.\nStep 3: Sum of last 4 numbers = 4 * 46 = 184.\nStep 4: Since the 4th (middle) number is counted twice, Middle Number = (152 + 184) - 294 = 336 - 294 = 42."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Hard",
        questionText: "The average age of a class is 16 years. If 8 new students join with average age 20 years, the overall average becomes 16.8 years. Find original class strength.",
        options: ["24", "28", "32", "36"],
        correctAnswer: "32",
        explanation: "Step 1: Let original strength be x. Total age = 16x.\nStep 2: Total age of 8 new students = 8 * 20 = 160.\nStep 3: New total age = 16x + 160. New strength = x + 8.\nStep 4: (16x + 160) / (x + 8) = 16.8 => 16x + 160 = 16.8x + 134.4.\nStep 5: 0.8x = 25.6 => x = 32."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Easy",
        questionText: "The average of 40 numbers is 60. If each number is multiplied by 2, find the new average.",
        options: ["62", "80", "120", "240"],
        correctAnswer: "120",
        explanation: "Step 1: Property of Averages: If every observation is multiplied by a constant 'k', the average is also multiplied by 'k'.\nStep 2: New Average = Old Average * 2.\nStep 3: New Average = 60 * 2 = 120."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average salary of 12 workers is ₹18,500. If one worker earning ₹22,000 leaves, find the average salary of remaining workers.",
        options: ["18000", "18181.81", "18200", "18300"],
        correctAnswer: "18181.81",
        explanation: "Step 1: Total salary of 12 workers = 12 * 18500 = ₹2,22,000.\nStep 2: Remaining total salary = 2,22,000 - 22,000 = ₹2,00,000.\nStep 3: Remaining workers = 11.\nStep 4: New average = 200000 / 11 = 18181.818... ≈ ₹18181.81."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Easy",
        questionText: "The average of three numbers is 24. The second is twice the first and the third is three times the first. Find the numbers.",
        options: ["10, 20, 30", "12, 24, 36", "14, 28, 42", "16, 32, 48"],
        correctAnswer: "12, 24, 36",
        explanation: "Step 1: Total sum = 3 * 24 = 72.\nStep 2: Let the first number be x. Second = 2x, Third = 3x.\nStep 3: x + 2x + 3x = 72 => 6x = 72.\nStep 4: x = 12. \nStep 5: Numbers are 12, 24, 36."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Easy",
        questionText: "The average of 100 observations is 50. If every observation is increased by 10%, find the new average.",
        options: ["50", "55", "60", "65"],
        correctAnswer: "55",
        explanation: "Step 1: If every observation is increased by x%, the average also increases by x%.\nStep 2: Increase = 10% of 50 = 5.\nStep 3: New Average = 50 + 5 = 55."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average age of 25 students is 14 years. If the teacher's age is included, the average becomes 15 years. Find teacher's age.",
        options: ["38", "40", "42", "45"],
        correctAnswer: "40",
        explanation: "Step 1: Total age of 25 students = 25 * 14 = 350.\nStep 2: Total age of 26 members (with teacher) = 26 * 15 = 390.\nStep 3: Teacher's age = 390 - 350 = 40 years."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of first n natural numbers is 25.5. Find n.",
        options: ["49", "50", "51", "52"],
        correctAnswer: "50",
        explanation: "Step 1: The average of the first 'n' natural numbers is given by the formula (n + 1) / 2.\nStep 2: (n + 1) / 2 = 25.5.\nStep 3: n + 1 = 51.\nStep 4: n = 50."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average of 11 numbers is 60. The average of first 6 numbers is 55 and that of last 6 numbers is 65. Find the middle number.",
        options: ["55", "60", "65", "70"],
        correctAnswer: "60",
        explanation: "Step 1: Total sum of 11 numbers = 11 * 60 = 660.\nStep 2: Sum of first 6 = 6 * 55 = 330. Sum of last 6 = 6 * 65 = 390.\nStep 3: Since the middle (6th) number is counted twice, Middle Number = (330 + 390) - 660.\nStep 4: 720 - 660 = 60."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Medium",
        questionText: "The average expenditure of a family for the first 4 months is ₹12,000 and for the next 8 months is ₹15,000. Find the average monthly expenditure for the whole year.",
        options: ["13000", "13500", "14000", "14500"],
        correctAnswer: "14000",
        explanation: "Step 1: Total expenditure for first 4 months = 4 * 12000 = ₹48,000.\nStep 2: Total expenditure for next 8 months = 8 * 15000 = ₹1,20,000.\nStep 3: Total expenditure for 12 months = 48000 + 120000 = ₹1,68,000.\nStep 4: Average for the whole year = 168000 / 12 = ₹14,000."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Hard",
        questionText: "The average of 15 consecutive even numbers is 40. Find the smallest number.",
        options: ["24", "26", "28", "30"],
        correctAnswer: "26",
        explanation: "Step 1: The average of 15 consecutive even numbers falls exactly on the middle (8th) term. So, 8th term = 40.\nStep 2: The numbers differ by 2. To get from the 8th term to the 1st term, we subtract 7 intervals of 2.\nStep 3: Smallest number = 40 - (7 * 2) = 40 - 14 = 26."
    },
    {
        category: "Aptitude", topic: "Averages", difficulty: "Hard",
        questionText: "The average of 30 numbers is 52. The average of the first 10 numbers is 45 and the average of the last 10 numbers is 58. Find the average of the remaining 10 numbers (from 11th to 20th position).",
        options: ["52", "53", "54", "55"],
        correctAnswer: "53",
        explanation: "Step 1: Total sum of 30 numbers = 30 * 52 = 1560.\nStep 2: Sum of first 10 numbers = 10 * 45 = 450.\nStep 3: Sum of last 10 numbers = 10 * 58 = 580.\nStep 4: Sum of remaining 10 numbers = 1560 - 450 - 580 = 530.\nStep 5: Average of these remaining 10 numbers = 530 / 10 = 53."
    }
];

const seedBatch7Averages = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Averages questions...");
        await Question.deleteMany({ topic: "Averages" }); 
        console.log("🗑️ Purana Averages data safely deleted!");

        console.log(`🚀 Injecting ${batch7Questions.length} Custom Averages Questions into the database...`);
        
        await Question.insertMany(batch7Questions);
        console.log(`✅ BOOM! Tumhara custom 'Averages' data successfully seed ho gaya!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch7Averages();