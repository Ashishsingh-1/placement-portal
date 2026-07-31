const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Line Graphs Seeding'))
  .catch(err => console.log(err));

const line1 = `\n\`\`\`json\n{ "type": "line", "data": [ {"name": "Q1", "2022": 120, "2023": 180, "2024": 240}, {"name": "Q2", "2022": 150, "2023": 210, "2024": 280}, {"name": "Q3", "2022": 180, "2023": 250, "2024": 340}, {"name": "Q4", "2022": 220, "2023": 310, "2024": 420} ] }\n\`\`\`\n`;
const line2 = `\n\`\`\`json\n{ "type": "line", "data": [ {"name": "Jan", "App A": 20, "App B": 18}, {"name": "Feb", "App A": 24, "App B": 22}, {"name": "Mar", "App A": 28, "App B": 25}, {"name": "Apr", "App A": 35, "App B": 30}, {"name": "May", "App A": 44, "App B": 38}, {"name": "Jun", "App A": 58, "App B": 45} ] }\n\`\`\`\n`;
const line3 = `\n\`\`\`json\n{ "type": "line", "data": [ {"name": "2020", "CAC": 900, "CLV": 2400}, {"name": "2021", "CAC": 850, "CLV": 2800}, {"name": "2022", "CAC": 760, "CLV": 3500}, {"name": "2023", "CAC": 640, "CLV": 4200}, {"name": "2024", "CAC": 520, "CLV": 5200} ] }\n\`\`\`\n`;
const line4 = `\n\`\`\`json\n{ "type": "line", "data": [ {"name": "Jan", "Stock X": 120, "Stock Y": 100}, {"name": "Feb", "Stock X": 130, "Stock Y": 105}, {"name": "Mar", "Stock X": 145, "Stock Y": 112}, {"name": "Apr", "Stock X": 170, "Stock Y": 120}, {"name": "May", "Stock X": 200, "Stock Y": 135}, {"name": "Jun", "Stock X": 240, "Stock Y": 150} ] }\n\`\`\`\n`;
const line5 = `\n\`\`\`json\n{ "type": "line", "data": [ {"name": "2020", "Customers": 120, "Revenue": 60}, {"name": "2021", "Customers": 180, "Revenue": 90}, {"name": "2022", "Customers": 270, "Revenue": 150}, {"name": "2023", "Customers": 420, "Revenue": 260}, {"name": "2024", "Customers": 650, "Revenue": 430} ] }\n\`\`\`\n`;

const batch25Questions = [
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 1: Quarterly Revenue Trend**\n\nA company's quarterly revenue (₹ Crore) over 3 years:${line1}**Q1 (Mu Sigma Style).** Find the absolute percentage growth from Q1 2022 to Q4 2024.`,
        options: ["200%", "250%", "300%", "350%"], correctAnswer: "250%", explanation: "Revenue in Q1 2022 = ₹120. Q4 2024 = ₹420. Growth = ((420 - 120) / 120) * 100 = 250%."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 1: Quarterly Revenue Trend**${line1}**Q2 (ZS Pattern).** Which year recorded the highest percentage growth over its previous year?`,
        options: ["2023", "2024", "Both are equal", "Cannot be determined"], correctAnswer: "2023", explanation: "2022 Total = 670, 2023 Total = 950, 2024 Total = 1280. 2023 Growth = 41.79%, 2024 Growth = 34.73%."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 1: Quarterly Revenue Trend**${line1}**Q3.** Find the average quarterly absolute growth during 2024.`,
        options: ["50 Cr", "60 Cr", "70 Cr", "80 Cr"], correctAnswer: "60 Cr", explanation: "QoQ growth in 2024: 40, 60, 80. Average = 180 / 3 = 60 Cr."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 1: Quarterly Revenue Trend**${line1}**Q4.** If Q1 and Q2 of 2025 grow by the average quarterly absolute increase of 2024, predict their revenues.`,
        options: ["Q1=460, Q2=500", "Q1=480, Q2=540", "Q1=500, Q2=560", "Q1=480, Q2=520"], correctAnswer: "Q1=480, Q2=540", explanation: "Base is Q4 2024 (420). Q1 = 420+60 = 480. Q2 = 480+60 = 540."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 1: Quarterly Revenue Trend**${line1}**Q5.** Management targets ₹1500 Cr total revenue in 2025. Based on the 2024 average quarterly trend (+60 Cr), is the target achievable?`,
        options: ["No, shortfall of ~100 Cr", "No, shortfall of ~50 Cr", "Yes, exactly met", "Yes, it will easily exceed by ~780 Cr"], correctAnswer: "Yes, it will easily exceed by ~780 Cr", explanation: "Projected 2025 quarters: 480, 540, 600, 660. Total = 2280 Cr. Target is 1500, so it exceeds by 780."
    },

    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 2: Monthly Active Users**\n\nMonthly Active Users (MAU in lakhs):${line2}**Q6.** Find the overall absolute growth percentage of App A and App B from Jan to Jun.`,
        options: ["A=190%, B=150%", "A=150%, B=120%", "A=180%, B=140%", "A=200%, B=160%"], correctAnswer: "A=190%, B=150%", explanation: "A: ((58-20)/20)*100 = 190%. B: ((45-18)/18)*100 = 150%."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 2: Monthly Active Users**${line2}**Q7.** At what point does App A's absolute month-over-month addition noticeably surpass App B's?`,
        options: ["Feb", "Mar", "Apr", "May"], correctAnswer: "Apr", explanation: "In April, App A adds +7 while B adds +5."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Easy",
        questionText: `**Line Graph DI Set 2: Monthly Active Users**${line2}**Q8.** Find the difference in total cumulative users acquired by both apps by June.`,
        options: ["10 Lakhs", "13 Lakhs", "15 Lakhs", "18 Lakhs"], correctAnswer: "13 Lakhs", explanation: "58 - 45 = 13 Lakhs."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 2: Monthly Active Users**${line2}**Q9.** If the overall 6-month retention rate is 78% for App A and 85% for App B, find the number of retained users (in lakhs) for both by June.`,
        options: ["A=42.24, B=35.5", "A=45.24, B=38.25", "A=46.5, B=40.2", "A=48.2, B=42.5"], correctAnswer: "A=45.24, B=38.25", explanation: "A: 58 * 0.78 = 45.24. B: 45 * 0.85 = 38.25."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 2: Monthly Active Users**${line2}**Q10 (Tiger Analytics).** Assume average monthly revenue per active user is ₹180 for App A and ₹220 for App B. Find total revenue generated during these six months.`,
        options: ["₹650.5 Cr", "₹767.8 Cr", "₹820.2 Cr", "₹910.4 Cr"], correctAnswer: "₹767.8 Cr", explanation: "A Total MAU = 209. B Total MAU = 178. A Rev = 209*180 = 37620. B Rev = 178*220 = 39160. Total = 767.8 Cr."
    },

    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 3: Actual Analytics Style**\n\nCAC vs CLV in ₹:${line3}**Q11.** Find the CLV to CAC ratio for 2024.`,
        options: ["6.56", "8.2", "9.5", "10"], correctAnswer: "10", explanation: "5200 / 520 = 10."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 3: Actual Analytics Style**${line3}**Q12.** Which year saw the maximum absolute improvement in the CLV/CAC ratio compared to its previous year?`,
        options: ["2021", "2022", "2023", "2024"], correctAnswer: "2024", explanation: "Ratios are 2.66, 3.29, 4.60, 6.56, 10.0. Max jump is in 2024 (+3.44)."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Easy",
        questionText: `**Line Graph DI Set 3: Actual Analytics Style**${line3}**Q13.** Find the percentage reduction in CAC from 2020 to 2024.`,
        options: ["35.5%", "40.0%", "42.22%", "45.6%"], correctAnswer: "42.22%", explanation: "Reduction = 900 - 520 = 380. (380/900)*100 = 42.22%."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 3: Actual Analytics Style**${line3}**Q14.** Find the percentage increase in CLV from 2020 to 2024.`,
        options: ["100%", "116.67%", "125.5%", "130%"], correctAnswer: "116.67%", explanation: "Increase = 5200 - 2400 = 2800. (2800/2400)*100 = 116.67%."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Easy",
        questionText: `**Line Graph DI Set 3: Actual Analytics Style**${line3}**Q15.** A company considers operations "Highly Profitable" if the CLV/CAC ratio is > 5. In which years was this condition met?`,
        options: ["2022, 2023", "2023, 2024", "2022, 2023, 2024", "Only 2024"], correctAnswer: "2023, 2024", explanation: "2023 ratio = 6.56. 2024 ratio = 10.0."
    },

    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 4: Deloitte Analytics Pattern**\n\nStock Prices:${line4}**Q16.** Calculate the overall return percentage for both stocks from Jan to Jun.`,
        options: ["X=80%, Y=40%", "X=100%, Y=50%", "X=120%, Y=60%", "X=150%, Y=75%"], correctAnswer: "X=100%, Y=50%", explanation: "X: ((240-120)/120)*100 = 100%. Y: ((150-100)/100)*100 = 50%."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 4: Deloitte Analytics Pattern**${line4}**Q17.** Based on the absolute monthly price changes, which stock is more volatile?`,
        options: ["Stock X", "Stock Y", "Both are equally volatile", "Cannot be determined"], correctAnswer: "Stock X", explanation: "Stock X jumps erratically (+10, +15, +25, +30, +40), highly volatile."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 4: Deloitte Analytics Pattern**${line4}**Q18.** If an investor splits ₹1 Lakh equally between Stock X and Y in Jan, what is the total value in June?`,
        options: ["₹1.25 Lakhs", "₹1.50 Lakhs", "₹1.75 Lakhs", "₹2.00 Lakhs"], correctAnswer: "₹1.75 Lakhs", explanation: "X gives 100% (50k -> 1L). Y gives 50% (50k -> 75k). Total = 1.75 Lakhs."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 4: Deloitte Analytics Pattern**${line4}**Q19.** Assuming the 5-month growth rate remains constant for a full 12 months, what is the simple annualized return for Stock X?`,
        options: ["150%", "200%", "240%", "300%"], correctAnswer: "240%", explanation: "100% over 5 months = 20% per month. 20% * 12 = 240%."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 4: Deloitte Analytics Pattern**${line4}**Q20.** For a risk-averse investor prioritizing lowest volatility, which stock is better visually?`,
        options: ["Stock X", "Stock Y", "Both are equal", "Neither"], correctAnswer: "Stock Y", explanation: "Stock Y climbs smoothly with less variance."
    },

    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 5: ZS + Mu Sigma PYQ Style**\n\nSaaS Company Growth:${line5}**Q21.** Find the revenue per customer in the year 2022.`,
        options: ["₹4000", "₹5000", "₹5555", "₹6000"], correctAnswer: "₹5555", explanation: "150 Cr / 2,70,000 = 5555.55"
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Medium",
        questionText: `**Line Graph DI Set 5: ZS + Mu Sigma PYQ Style**${line5}**Q22.** By analyzing the customer acquisition curve, what type of growth trend does this represent?`,
        options: ["Linear", "Exponential / Compounding", "Stagnant", "Logarithmic"], correctAnswer: "Exponential / Compounding", explanation: "Customers grow by roughly ~1.5x each year (Multiplicative)."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 5: ZS + Mu Sigma PYQ Style**${line5}**Q23.** Predict the customer count (in thousands) for 2025 using the established compounding trend (~1.5x).`,
        options: ["800", "850", "900", "975"], correctAnswer: "975", explanation: "650 * 1.5 = 975k."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 5: ZS + Mu Sigma PYQ Style**${line5}**Q24.** Predict the revenue (in ₹ Cr) for 2025 assuming the revenue multiplier trend continues (~1.6x).`,
        options: ["550", "600", "688", "750"], correctAnswer: "688", explanation: "430 * 1.6 = 688 Cr."
    },
    {
        category: "Data Interpretation", topic: "Line Graphs & Trends", difficulty: "Hard",
        questionText: `**Line Graph DI Set 5: ZS + Mu Sigma PYQ Style**${line5}**Q25.** Find the elasticity of revenue with respect to customer growth from 2023 to 2024.`,
        options: ["0.85", "1.0", "1.2", "1.5"], correctAnswer: "1.2", explanation: "% Change Rev = 65.38%. % Change Cust = 54.76%. Elasticity = 65.38/54.76 = 1.19."
    }
];

const seedBatch25LineGraphs = async () => {
    try {
        await Question.deleteMany({ topic: "Line Graphs & Trends" }); 
        await Question.insertMany(batch25Questions);
        console.log(`✅ BOOM! Asli Multi-Line Graphs ka data perfectly seed ho gaya!`);
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch25LineGraphs();