const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Custom Percentage Seeding'))
  .catch(err => console.log(err));

const batch4Questions = [
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Easy",
        questionText: "A number is increased by 25% and then decreased by 20%. Find the net percentage change.",
        options: ["5% increase", "5% decrease", "0% (No change)", "10% increase"],
        correctAnswer: "0% (No change)",
        explanation: "Step 1: Use the successive percentage formula: Net Change = a + b + (ab/100).\nStep 2: Here, a = +25 and b = -20.\nStep 3: Net Change = 25 - 20 + (25 * -20)/100.\nStep 4: 5 - (500/100) = 5 - 5 = 0%.\nStep 5: Since the result is 0, there is no change."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Easy",
        questionText: "The population of a town increases by 10% in the first year and decreases by 10% in the second year. Find the net percentage change.",
        options: ["1% increase", "1% decrease", "No change", "2% decrease"],
        correctAnswer: "1% decrease",
        explanation: "Step 1: When a value is increased by x% and then decreased by x%, there is always a net decrease.\nStep 2: Decrease % = (x^2) / 100.\nStep 3: Here x = 10. Decrease % = (10^2) / 100 = 100 / 100 = 1% decrease."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Easy",
        questionText: "A student's marks increase from 480 to 600. Find the percentage increase.",
        options: ["20%", "25%", "30%", "33.33%"],
        correctAnswer: "25%",
        explanation: "Step 1: Initial Marks = 480, Final Marks = 600.\nStep 2: Increase in marks = 600 - 480 = 120.\nStep 3: Percentage Increase = (Increase / Initial Value) * 100.\nStep 4: (120 / 480) * 100 = (1 / 4) * 100 = 25%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "The price of a commodity rises by 20%. By what percentage should consumption be reduced so that expenditure remains unchanged?",
        options: ["16.66%", "20%", "25%", "33.33%"],
        correctAnswer: "16.66%",
        explanation: "Step 1: Use the consumption reduction formula: Reduction % = (Increase % / (100 + Increase %)) * 100.\nStep 2: Here, Increase % = 20.\nStep 3: Reduction % = (20 / 120) * 100 = (1 / 6) * 100.\nStep 4: 100 / 6 = 16.66%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "A number is first increased by 40% and then decreased by 25%. Find the overall percentage change.",
        options: ["5% increase", "5% decrease", "10% increase", "15% increase"],
        correctAnswer: "5% increase",
        explanation: "Step 1: Use successive percentage formula: Net Change = a + b + (ab/100).\nStep 2: Here, a = +40 and b = -25.\nStep 3: Net Change = 40 - 25 + (40 * -25)/100.\nStep 4: 15 - 1000/100 = 15 - 10 = +5%.\nStep 5: Positive sign indicates a 5% increase."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "The salary of an employee is increased by 20% and then by 30%. Find the total percentage increase.",
        options: ["44%", "50%", "56%", "60%"],
        correctAnswer: "56%",
        explanation: "Step 1: Use successive percentage formula: Net Change = a + b + (ab/100).\nStep 2: Here, a = +20 and b = +30.\nStep 3: Net Change = 20 + 30 + (20 * 30)/100.\nStep 4: 50 + 600/100 = 50 + 6 = 56% increase."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "The value of a machine depreciates by 10% annually. If its current value is ₹81,000, find its value 2 years ago.",
        options: ["₹90,000", "₹95,000", "₹1,00,000", "₹1,20,000"],
        correctAnswer: "₹1,00,000",
        explanation: "Step 1: Let the value 2 years ago be P.\nStep 2: Current Value = P * (1 - r/100)^n.\nStep 3: 81,000 = P * (1 - 10/100)^2.\nStep 4: 81,000 = P * (0.9)^2 => 81,000 = P * 0.81.\nStep 5: P = 81,000 / 0.81 = ₹1,00,000."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "A shopkeeper gains 25% on selling an article. If the cost price increases by 20% but selling price remains unchanged, find the new profit/loss percentage.",
        options: ["4.16%", "5%", "8.33%", "10%"],
        correctAnswer: "4.16%",
        explanation: "Step 1: Let initial Cost Price (CP) = 100. Then initial Selling Price (SP) = 125.\nStep 2: New CP increases by 20%, so New CP = 120.\nStep 3: SP remains unchanged, so New SP = 125.\nStep 4: New Profit = SP - New CP = 125 - 120 = 5.\nStep 5: New Profit % = (Profit / New CP) * 100 = (5 / 120) * 100 = 25 / 6 = 4.16%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Easy",
        questionText: "If A is 25% more than B, then B is what percent less than A?",
        options: ["16.66%", "20%", "25%", "33.33%"],
        correctAnswer: "20%",
        explanation: "Step 1: Use the shortcut formula: Less % = (x / (100 + x)) * 100.\nStep 2: Here, x = 25.\nStep 3: Less % = (25 / 125) * 100.\nStep 4: (1 / 5) * 100 = 20%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "The population of a city is 5,00,000. It increases by 8% annually. Find the population after 2 years.",
        options: ["5,40,000", "5,80,000", "5,83,200", "5,90,000"],
        correctAnswer: "5,83,200",
        explanation: "Step 1: Use the formula: Final Population = P * (1 + r/100)^n.\nStep 2: P = 5,00,000, r = 8, n = 2.\nStep 3: Final = 5,00,000 * (1.08)^2.\nStep 4: Final = 5,00,000 * 1.1664 = 5,83,200."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "A number is increased by x% and then decreased by x%. The net decrease is 9%. Find x.",
        options: ["10", "20", "30", "40"],
        correctAnswer: "30",
        explanation: "Step 1: Net decrease percentage for same x% increase and decrease = (x^2) / 100.\nStep 2: Given that decrease is 9%, so (x^2) / 100 = 9.\nStep 3: x^2 = 900.\nStep 4: x = 30."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "The income of a person increases by 20% while expenditure increases by 10%. If savings increase by 40%, find the ratio of original income to expenditure.",
        options: ["2:1", "3:2", "4:3", "5:3"],
        correctAnswer: "3:2",
        explanation: "Step 1: Let Income = I, Expenditure = E. Savings S = I - E.\nStep 2: New Income = 1.20 * I. New Exp = 1.10 * E. New Savings = 1.40 * S.\nStep 3: New Savings = New Income - New Exp. So, 1.40 * (I - E) = 1.20 * I - 1.10 * E.\nStep 4: 1.40I - 1.40E = 1.20I - 1.10E => 0.20I = 0.30E.\nStep 5: Ratio I / E = 0.30 / 0.20 = 3 / 2, which is 3:2."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "In an election, a candidate gets 60% votes and wins by 12,000 votes. Find total votes polled.",
        options: ["40,000", "50,000", "60,000", "80,000"],
        correctAnswer: "60,000",
        explanation: "Step 1: Winner gets 60% votes. Loser gets (100% - 60%) = 40% votes.\nStep 2: Winning margin = 60% - 40% = 20% of total votes.\nStep 3: 20% of Total = 12,000.\nStep 4: Total votes = (12,000 / 20) * 100 = 60,000."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "The price of sugar rises by 25%. By what percentage should consumption be reduced so that expenditure remains the same?",
        options: ["16.66%", "20%", "25%", "33.33%"],
        correctAnswer: "20%",
        explanation: "Step 1: Use the reduction formula: Reduction % = (Increase % / (100 + Increase %)) * 100.\nStep 2: Reduction % = (25 / 125) * 100.\nStep 3: (1 / 5) * 100 = 20%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "A company's revenue increased by 30% while expenses increased by 20%. If profit was ₹2 lakh initially, find percentage increase in profit given revenue was ₹10 lakh.",
        options: ["40%", "50%", "60%", "70%"],
        correctAnswer: "70%",
        explanation: "Step 1: Initial Revenue = 10L. Initial Profit = 2L. So, Initial Expense = 10L - 2L = 8L.\nStep 2: New Revenue = 10L + 30% = 13L.\nStep 3: New Expense = 8L + 20% = 8L * 1.2 = 9.6L.\nStep 4: New Profit = New Rev - New Exp = 13L - 9.6L = 3.4L.\nStep 5: Increase in Profit = 3.4L - 2.L = 1.4L. Increase % = (1.4 / 2) * 100 = 70%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "A is 20% taller than B. B is 25% taller than C. By what percentage is A taller than C?",
        options: ["40%", "45%", "50%", "55%"],
        correctAnswer: "50%",
        explanation: "Step 1: Let height of C = 100.\nStep 2: B is 25% taller than C. So, B = 125.\nStep 3: A is 20% taller than B. So, A = 125 + (20% of 125) = 125 + 25 = 150.\nStep 4: Difference between A and C = 150 - 100 = 50.\nStep 5: Percentage A is taller than C = (50 / 100) * 100 = 50%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Easy",
        questionText: "The pass percentage in a class is 80%. If 40 students fail, find the total number of students.",
        options: ["150", "180", "200", "250"],
        correctAnswer: "200",
        explanation: "Step 1: Pass % = 80%. Therefore, Fail % = 100% - 80% = 20%.\nStep 2: We are given that 20% of total students = 40.\nStep 3: Total students = (40 / 20) * 100 = 200."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "A's salary is 25% less than B's salary. By what percentage is B's salary more than A's?",
        options: ["20%", "25%", "33.33%", "50%"],
        correctAnswer: "33.33%",
        explanation: "Step 1: Use the 'More %' formula: More % = (x / (100 - x)) * 100.\nStep 2: Here, x = 25.\nStep 3: More % = (25 / 75) * 100.\nStep 4: (1 / 3) * 100 = 33.33%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "The population of a city decreases by 15% every year. If current population is 72,250, find the population 2 years ago.",
        options: ["90,000", "1,00,000", "1,10,000", "1,20,000"],
        correctAnswer: "1,00,000",
        explanation: "Step 1: Let population 2 years ago be P.\nStep 2: Current Population = P * (1 - r/100)^2.\nStep 3: 72,250 = P * (1 - 0.15)^2 = P * (0.85)^2.\nStep 4: 72,250 = P * 0.7225.\nStep 5: P = 72,250 / 0.7225 = 1,00,000."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "A number is increased by 50% and then reduced by 50%. Find net percentage change.",
        options: ["20% decrease", "25% increase", "25% decrease", "No change"],
        correctAnswer: "25% decrease",
        explanation: "Step 1: Net decrease % for same increase and decrease = (x^2) / 100.\nStep 2: Here, x = 50.\nStep 3: Decrease % = (50^2) / 100 = 2500 / 100 = 25% decrease."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "The price of petrol increases by 20%. A person wants to limit expenditure increase to only 8%. By what percentage should he reduce consumption?",
        options: ["8%", "10%", "12%", "15%"],
        correctAnswer: "10%",
        explanation: "Step 1: Let initial Price = 100 and initial Consumption = 100. Expenditure = 100 * 100 = 10,000.\nStep 2: New Price = 120. Desired New Expenditure = 10,000 + 8% = 10,800.\nStep 3: New Consumption = New Expenditure / New Price = 10800 / 120 = 90.\nStep 4: Reduction in Consumption = 100 - 90 = 10.\nStep 5: Percentage reduction = 10%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "A businessman sells two articles at the same selling price. He gains 20% on one and loses 20% on the other. Find overall profit/loss percentage.",
        options: ["2% loss", "4% loss", "4% profit", "No profit no loss"],
        correctAnswer: "4% loss",
        explanation: "Step 1: Whenever two articles are sold at the same SP and gain/loss percentages are same (x%), there is always an overall loss.\nStep 2: Loss % = (x^2) / 100.\nStep 3: Loss % = (20^2) / 100 = 400 / 100 = 4% loss."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "The ratio of boys to girls is 5:4. If the number of boys increases by 20% and girls by 25%, find the new ratio.",
        options: ["5:4", "6:5", "7:5", "7:6"],
        correctAnswer: "6:5",
        explanation: "Step 1: Let the number of boys be 50 and girls be 40.\nStep 2: New number of boys = 50 + (20% of 50) = 50 + 10 = 60.\nStep 3: New number of girls = 40 + (25% of 40) = 40 + 10 = 50.\nStep 4: New Ratio = 60 : 50 = 6:5."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "A number is first increased by 10%, then by 20%, and finally decreased by 30%. Find net percentage change.",
        options: ["7.6% increase", "7.6% decrease", "8.4% decrease", "9.2% decrease"],
        correctAnswer: "7.6% decrease",
        explanation: "Step 1: Let the initial number be 100.\nStep 2: After 10% increase: 100 * 1.10 = 110.\nStep 3: After 20% increase: 110 * 1.20 = 132.\nStep 4: After 30% decrease: 132 * 0.70 = 92.4.\nStep 5: Net Change = 100 - 92.4 = 7.6. Since it's less than 100, it is a 7.6% decrease."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "The production of a factory increases by 15% in Year 1, 20% in Year 2, and decreases by 10% in Year 3. Find overall percentage change.",
        options: ["20% increase", "22.4% increase", "24.2% increase", "25% increase"],
        correctAnswer: "24.2% increase",
        explanation: "Step 1: Let initial production be 100.\nStep 2: Year 1 end: 100 * 1.15 = 115.\nStep 3: Year 2 end: 115 * 1.20 = 138.\nStep 4: Year 3 end (10% decrease): 138 * 0.90 = 124.2.\nStep 5: Net change = 124.2 - 100 = +24.2%. (24.2% increase)."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "The population of a city increases by 20% annually. Due to migration, 10% of the population leaves every year. Find effective annual growth rate.",
        options: ["8%", "10%", "12%", "15%"],
        correctAnswer: "8%",
        explanation: "Step 1: Treat this as successive changes. First an increase of 20%, then a decrease of 10%.\nStep 2: Net Change = a + b + (ab/100).\nStep 3: Net Change = 20 - 10 + (20 * -10)/100.\nStep 4: 10 - 200/100 = 10 - 2 = 8%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "A company increases salaries by 15%. Inflation is 12%. Find real percentage increase in purchasing power.",
        options: ["2.5%", "2.67%", "3%", "3.5%"],
        correctAnswer: "2.67%",
        explanation: "Step 1: Let Initial Salary = 100 and Initial Price Index = 100. Purchasing Power (PP) = 100/100 = 1.\nStep 2: New Salary = 115. New Price Index = 112.\nStep 3: New PP = 115 / 112.\nStep 4: Percentage increase in PP = [((115/112) - 1) / 1] * 100 = (3/112) * 100.\nStep 5: 300 / 112 = 2.678% ≈ 2.67%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "The marked price of an article is increased by 25% and then a discount of 20% is offered. Find net percentage effect on the original price.",
        options: ["5% increase", "5% decrease", "No change", "2% decrease"],
        correctAnswer: "No change",
        explanation: "Step 1: Use successive percentage formula: Net Change = a + b + (ab/100).\nStep 2: Here a = +25 and b = -20.\nStep 3: Net Change = 25 - 20 + (25 * -20)/100 = 5 - 500/100 = 5 - 5 = 0.\nStep 4: Since the result is 0, there is no change."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Medium",
        questionText: "The length and breadth of a rectangle increase by 20% and 30% respectively. Find percentage increase in area.",
        options: ["50%", "54%", "56%", "60%"],
        correctAnswer: "56%",
        explanation: "Step 1: Since Area = Length * Breadth, we can use successive percentage formula for the product of two variables.\nStep 2: Increase % = a + b + (ab/100).\nStep 3: Increase % = 20 + 30 + (20 * 30)/100.\nStep 4: 50 + 600/100 = 50 + 6 = 56%."
    },
    {
        category: "Aptitude", topic: "Percentage", difficulty: "Hard",
        questionText: "The population of a city increases by 20% in the first year, 25% in the second year, and decreases by 20% in the third year. If the final population is 72,000, find the original population.",
        options: ["50,000", "60,000", "64,000", "70,000"],
        correctAnswer: "60,000",
        explanation: "Step 1: Let the original population be P.\nStep 2: Final Population = P * (1 + 20/100) * (1 + 25/100) * (1 - 20/100).\nStep 3: 72,000 = P * 1.20 * 1.25 * 0.80.\nStep 4: 1.20 * 1.25 = 1.50. And 1.50 * 0.80 = 1.20.\nStep 5: 72,000 = P * 1.20 => P = 72,000 / 1.2 = 60,000."
    }
];

const seedBatch4Percentage = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Percentage questions...");
        await Question.deleteMany({ topic: "Percentage" }); 
        console.log("🗑️ Purana Percentage data safely deleted!");

        console.log(`🚀 Injecting ${batch4Questions.length} Custom Percentage Questions into the database...`);
        
        await Question.insertMany(batch4Questions);
        console.log(`✅ BOOM! Tumhara custom Percentage data successfully seed ho gaya!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch4Percentage();