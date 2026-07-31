const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Pie Charts Seeding'))
  .catch(err => console.log(err));

const pie1 = `\n\`\`\`json\n{ "type": "pie", "data": [ {"name": "Marketing", "value": 28}, {"name": "Technology", "value": 24}, {"name": "Operations", "value": 18}, {"name": "HR", "value": 12}, {"name": "Sales", "value": 10}, {"name": "Misc", "value": 8} ] }\n\`\`\`\n`;
const pie2 = `\n\`\`\`json\n{ "type": "pie", "data": [ {"name": "Company A", "value": 26}, {"name": "Company B", "value": 22}, {"name": "Company C", "value": 18}, {"name": "Company D", "value": 14}, {"name": "Company E", "value": 12}, {"name": "Others", "value": 8} ] }\n\`\`\`\n`;
const pie3 = `\n\`\`\`json\n{ "type": "pie", "data": [ {"name": "IT", "value": 32}, {"name": "Sales", "value": 24}, {"name": "Operations", "value": 18}, {"name": "Finance", "value": 12}, {"name": "HR", "value": 8}, {"name": "Others", "value": 6} ] }\n\`\`\`\n`;
const pie4 = `\n\`\`\`json\n{ "type": "pie", "data": [ {"name": "Product A", "value": 30}, {"name": "Product B", "value": 22}, {"name": "Product C", "value": 18}, {"name": "Product D", "value": 15}, {"name": "Product E", "value": 10}, {"name": "Product F", "value": 5} ] }\n\`\`\`\n`;
const pie5 = `\n\`\`\`json\n{ "type": "pie", "data": [ {"name": "Healthcare", "value": 32}, {"name": "BFSI", "value": 26}, {"name": "Retail", "value": 18}, {"name": "Telecom", "value": 14}, {"name": "Manufacturing", "value": 10} ] }\n\`\`\`\n`;

const batch26Questions = [
    // SET 1
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Easy",
        questionText: `**Pie Chart DI Set 1: Company Budget Allocation**\n\nThe pie chart shows the percentage distribution of a total budget of ₹800 Crore.${pie1}**Q1.** Find the total expenditure on Technology.`,
        options: ["₹180 Cr", "₹192 Cr", "₹200 Cr", "₹224 Cr"], correctAnswer: "₹192 Cr", explanation: "Technology = 24% of ₹800 Cr = 0.24 * 800 = ₹192 Cr."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 1: Company Budget Allocation**\n\nTotal Budget = ₹800 Crore.${pie1}**Q2.** How much more is spent on Marketing than HR?`,
        options: ["₹100 Cr", "₹112 Cr", "₹128 Cr", "₹140 Cr"], correctAnswer: "₹128 Cr", explanation: "Difference = 28% (Marketing) - 12% (HR) = 16%. 16% of 800 = ₹128 Cr."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Easy",
        questionText: `**Pie Chart DI Set 1: Company Budget Allocation**\n\nTotal Budget = ₹800 Crore.${pie1}**Q3.** Find the ratio of Technology to Operations spending.`,
        options: ["3:2", "4:3", "5:4", "7:5"], correctAnswer: "4:3", explanation: "Ratio = 24% : 18% = 24/18 = 4:3."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 1: Company Budget Allocation**\n\nTotal Budget = ₹800 Crore.${pie1}**Q4.** If the total budget increases by 25% next year (assuming same pie distribution), find the new Marketing expenditure.`,
        options: ["₹250 Cr", "₹280 Cr", "₹300 Cr", "₹320 Cr"], correctAnswer: "₹280 Cr", explanation: "New Budget = 800 * 1.25 = 1000 Cr. Marketing = 28% of 1000 = ₹280 Cr."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 1: Company Budget Allocation**\n\nTotal Budget = ₹800 Crore.${pie1}**Q5.** What percentage of the strictly *non-Marketing* expenditure is spent on Technology?`,
        options: ["30%", "33.33%", "35%", "40%"], correctAnswer: "33.33%", explanation: "Non-Marketing = 100% - 28% = 72%. Technology is 24%. Percentage = (24 / 72) * 100 = 33.33%."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 1: Company Budget Allocation**\n\nTotal Budget = ₹800 Crore.${pie1}**Q6.** If Technology spending alone rises by 20% (in absolute terms) and all other department budgets remain constant, find the new total budget of the company.`,
        options: ["₹820.5 Cr", "₹838.4 Cr", "₹850.0 Cr", "₹872.6 Cr"], correctAnswer: "₹838.4 Cr", explanation: "Tech = 192 Cr. 20% rise = 38.4 Cr. New Total = 800 + 38.4 = ₹838.4 Cr."
    },

    // SET 2
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Easy",
        questionText: `**Pie Chart DI Set 2: Market Share Analysis**\n\nTotal Industry Revenue = ₹12,000 Crore.${pie2}**Q7.** Find the revenue of Company A.`,
        options: ["₹2850 Cr", "₹3120 Cr", "₹3200 Cr", "₹3450 Cr"], correctAnswer: "₹3120 Cr", explanation: "26% of 12000 = 0.26 * 12000 = ₹3120 Cr."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Easy",
        questionText: `**Pie Chart DI Set 2: Market Share Analysis**\n\nTotal Industry Revenue = ₹12,000 Crore.${pie2}**Q8.** Find the combined revenue of B and C.`,
        options: ["₹4500 Cr", "₹4800 Cr", "₹5100 Cr", "₹5250 Cr"], correctAnswer: "₹4800 Cr", explanation: "22% + 18% = 40%. 40% of 12000 = ₹4800 Cr."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 2: Market Share Analysis**\n\nTotal Industry Revenue = ₹12,000 Crore.${pie2}**Q9.** Assume Market Leaders = (A+B) and Market Laggards = (D+E+Others). Find the absolute difference in revenue between Leaders and Laggards.`,
        options: ["₹1500 Cr", "₹1680 Cr", "₹1800 Cr", "₹2000 Cr"], correctAnswer: "₹1680 Cr", explanation: "Leaders = 26+22 = 48%. Laggards = 14+12+8 = 34%. Diff = 14%. 14% of 12000 = ₹1680 Cr."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 2: Market Share Analysis**\n\nTotal Industry Revenue = ₹12,000 Crore.${pie2}**Q10.** What percentage larger is Company A compared to Company D?`,
        options: ["75%", "85.7%", "90.2%", "100%"], correctAnswer: "85.7%", explanation: "A = 26%, D = 14%. Difference = 12%. % larger = (12 / 14) * 100 = 85.71%."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 2: Market Share Analysis**\n\nTotal Industry Revenue = ₹12,000 Crore.${pie2}**Q11.** If Company C actively captures 4% market share directly from Company A, find their new revised individual revenues.`,
        options: ["A=2640, C=2640", "A=2500, C=2500", "A=2750, C=2750", "A=2800, C=2600"], correctAnswer: "A=2640, C=2640", explanation: "A becomes 26-4 = 22%. C becomes 18+4 = 22%. 22% of 12000 = ₹2640 Cr each."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 2: Market Share Analysis**\n\nTotal Industry Revenue = ₹12,000 Crore.${pie2}**Q12.** Calculate the Herfindahl-Hirschman Index (HHI) approximation (Sum of squares of all market shares).`,
        options: ["1650", "1724", "1888", "1950"], correctAnswer: "1888", explanation: "26² + 22² + 18² + 14² + 12² + 8² = 676 + 484 + 324 + 196 + 144 + 64 = 1888."
    },

    // SET 3
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Easy",
        questionText: `**Pie Chart DI Set 3: Employee Distribution**\n\nTotal Employees = 15,000.${pie3}**Q13.** Find the total number of IT employees.`,
        options: ["4500", "4800", "5000", "5200"], correctAnswer: "4800", explanation: "32% of 15000 = 4800."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 3: Employee Distribution**\n\nTotal Employees = 15,000.${pie3}**Q14.** Find the average number of employees per department across all 6 segments.`,
        options: ["2000", "2250", "2500", "3000"], correctAnswer: "2500", explanation: "Total = 15000. 6 segments. Avg = 15000 / 6 = 2500."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 3: Employee Distribution**\n\nTotal Employees = 15,000.${pie3}**Q15.** How many more employees must Finance hire to equal the headcount of Operations?`,
        options: ["700", "850", "900", "1000"], correctAnswer: "900", explanation: "Ops(18%) - Fin(12%) = 6%. 6% of 15000 = 900."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Easy",
        questionText: `**Pie Chart DI Set 3: Employee Distribution**\n\nTotal Employees = 15,000.${pie3}**Q16.** Find the ratio of IT employees to all Non-IT employees.`,
        options: ["8:17", "7:15", "9:19", "8:15"], correctAnswer: "8:17", explanation: "IT = 32%. Non-IT = 68%. Ratio = 32:68 = 8:17."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 3: Employee Distribution**\n\nTotal Employees = 15,000.${pie3}**Q17.** If 10% of the current IT employees leave the company, find the new total workforce.`,
        options: ["14250", "14520", "14800", "14950"], correctAnswer: "14520", explanation: "IT = 4800. 10% of 4800 = 480 leave. New total = 15000 - 480 = 14520."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 3: Employee Distribution**\n\nTotal Employees = 15,000.${pie3}**Q18.** Excluding the 'Others' segment, what is the total number of employees in the main departments?`,
        options: ["13800", "14100", "14500", "14800"], correctAnswer: "14100", explanation: "Others = 6% of 15000 = 900. Total main = 15000 - 900 = 14100."
    },

    // SET 4
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Easy",
        questionText: `**Pie Chart DI Set 4: Revenue Contribution**\n\nTotal Revenue = ₹5000 Crore.${pie4}**Q19.** Find the revenue from Product B.`,
        options: ["₹1000 Cr", "₹1100 Cr", "₹1200 Cr", "₹1250 Cr"], correctAnswer: "₹1100 Cr", explanation: "22% of 5000 = 1100."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 4: Revenue Contribution**\n\nTotal Revenue = ₹5000 Crore.${pie4}**Q20.** Find the combined revenue from the top 3 products.`,
        options: ["₹3200 Cr", "₹3400 Cr", "₹3500 Cr", "₹3800 Cr"], correctAnswer: "₹3500 Cr", explanation: "A+B+C = 30+22+18 = 70%. 70% of 5000 = 3500."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 4: Revenue Contribution**\n\nTotal Revenue = ₹5000 Crore.${pie4}**Q21.** What percentage of total revenue comes from the bottom 3 products combined?`,
        options: ["25%", "30%", "33.3%", "35%"], correctAnswer: "30%", explanation: "D+E+F = 15+10+5 = 30%."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 4: Revenue Contribution**\n\nTotal Revenue = ₹5000 Crore.${pie4}**Q22.** If Product C's absolute revenue grows by 40%, what is the revised total company revenue?`,
        options: ["₹5200 Cr", "₹5360 Cr", "₹5500 Cr", "₹5800 Cr"], correctAnswer: "₹5360 Cr", explanation: "Product C = 18% of 5000 = 900. 40% growth = 360. New total = 5000 + 360 = 5360."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 4: Revenue Contribution**\n\nTotal Revenue = ₹5000 Crore.${pie4}**Q23.** By what percentage must Product F's revenue grow to match Product D's current revenue?`,
        options: ["100%", "150%", "200%", "300%"], correctAnswer: "200%", explanation: "F is 5%, D is 15%. F needs to grow from 5 to 15 (a jump of 10). (10/5)*100 = 200%."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 4: Revenue Contribution**\n\nTotal Revenue = ₹5000 Crore.${pie4}**Q24.** Find the ratio of the top 2 products combined to the remaining products combined.`,
        options: ["11:10", "13:12", "14:11", "15:13"], correctAnswer: "13:12", explanation: "Top 2 (A+B) = 52%. Remaining = 48%. Ratio 52:48 = 13:12."
    },

    // SET 5
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 5: Ultra Tough Analytics**\n\nA consulting company earns ₹2000 Cr across 5 segments.${pie5}**Q25.** Find the absolute revenue generated by the Healthcare segment.`,
        options: ["₹600 Cr", "₹640 Cr", "₹680 Cr", "₹720 Cr"], correctAnswer: "₹640 Cr", explanation: "32% of 2000 = 640."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 5: Ultra Tough Analytics**\n\nTotal Revenue = ₹2000 Crore.${pie5}**Q26.** If Healthcare grows by 25% and BFSI by 20%, find the revised total revenue.`,
        options: ["₹2150 Cr", "₹2264 Cr", "₹2300 Cr", "₹2450 Cr"], correctAnswer: "₹2264 Cr", explanation: "Healthcare base = 640. 25% growth = +160. BFSI base = 520. 20% growth = +104. Total increase = 264. New total = 2264."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 5: Ultra Tough Analytics**\n\nTotal Revenue = ₹2000 Crore.${pie5}**Q27.** After the growth mentioned in Q26, what percentage contribution will Healthcare have in the NEW total revenue?`,
        options: ["30.5%", "33.3%", "35.33%", "38%"], correctAnswer: "35.33%", explanation: "New Healthcare = 640 + 160 = 800. New Total = 2264. Percentage = (800 / 2264) * 100 ≈ 35.33%."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Medium",
        questionText: `**Pie Chart DI Set 5: Ultra Tough Analytics**\n\nTotal Revenue = ₹2000 Crore.${pie5}**Q28.** If Manufacturing revenue declines by 15%, find the new total revenue as a percentage of the original.`,
        options: ["95.5%", "98.5%", "99%", "101.5%"], correctAnswer: "98.5%", explanation: "Mfg drops 15% of its 10% share, which is a 1.5% drop of the total pie. Remaining = 100 - 1.5 = 98.5%."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Easy",
        questionText: `**Pie Chart DI Set 5: Ultra Tough Analytics**\n\nTotal Revenue = ₹2000 Crore.${pie5}**Q29.** Calculate the average revenue per segment.`,
        options: ["₹350 Cr", "₹400 Cr", "₹450 Cr", "₹500 Cr"], correctAnswer: "₹400 Cr", explanation: "2000 / 5 = 400."
    },
    {
        category: "Data Interpretation", topic: "Pie Charts", difficulty: "Hard",
        questionText: `**Pie Chart DI Set 5: Ultra Tough Analytics**\n\nTotal Revenue = ₹2000 Crore.${pie5}**Q30 (Analytics Case).** Company strategy dictates:\n- Healthcare ≤ 35%\n- BFSI ≤ 25%\n- Retail ≥ 20%\nWithout changing total revenue, determine the minimum revenue redistribution (in ₹ Cr) required among segments to meet these targets.`,
        options: ["₹20 Cr", "₹40 Cr", "₹50 Cr", "₹60 Cr"], correctAnswer: "₹40 Cr", explanation: "Healthcare is 32% (Ok). BFSI is 26% (Needs to drop 1%). Retail is 18% (Needs to gain 2%). Move 1% from BFSI to Retail. Move another 1% from any other segment to Retail. Total shifted = 2% of 2000 = ₹40 Cr."
    }
];

const seedBatch26PieCharts = async () => {
    try {
        await Question.deleteMany({ topic: "Pie Charts" }); 
        await Question.insertMany(batch26Questions);
        console.log(`✅ BOOM! Asli Colorful Pie Charts Data perfectly seed ho gaya!`);
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch26PieCharts();