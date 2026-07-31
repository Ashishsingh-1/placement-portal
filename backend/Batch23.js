const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for REAL Bar Graphs'))
  .catch(err => console.log(err));

// JSON data block inside markdown
const chart1 = `\n\`\`\`json\n[\n  {"name": "A", "value": 120},\n  {"name": "B", "value": 180},\n  {"name": "C", "value": 240},\n  {"name": "D", "value": 300},\n  {"name": "E", "value": 420},\n  {"name": "F", "value": 540}\n]\n\`\`\`\n`;
const chart2 = `\n\`\`\`json\n[\n  {"name": "P", "value": 85},\n  {"name": "Q", "value": 120},\n  {"name": "R", "value": 145},\n  {"name": "S", "value": 180},\n  {"name": "T", "value": 240},\n  {"name": "U", "value": 310}\n]\n\`\`\`\n`;
const chart3 = `\n\`\`\`json\n[\n  {"name": "TCS", "value": 180},\n  {"name": "Infosys", "value": 140},\n  {"name": "Accenture", "value": 110},\n  {"name": "Capgemini", "value": 130},\n  {"name": "Cognizant", "value": 120},\n  {"name": "Deloitte", "value": 70}\n]\n\`\`\`\n`;
const chart4 = `\n\`\`\`json\n[\n  {"name": "2020", "value": 120},\n  {"name": "2021", "value": 180},\n  {"name": "2022", "value": 260},\n  {"name": "2023", "value": 390},\n  {"name": "2024", "value": 520}\n]\n\`\`\`\n`;
const chart5 = `\n\`\`\`json\n[\n  {"name": "Jan", "value": 1800},\n  {"name": "Feb", "value": 2400},\n  {"name": "Mar", "value": 3200},\n  {"name": "Apr", "value": 4500},\n  {"name": "May", "value": 6100},\n  {"name": "Jun", "value": 8200}\n]\n\`\`\`\n`;

const batch24Questions = [
    // SET 1
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Easy",
        questionText: `**Bar Graph DI Set 1: Revenue Analysis**\n\nThe bar graph below shows the revenue of 6 companies (in ₹ Crore).${chart1}**Q1.** Find the total revenue of all the companies combined.`,
        options: ["1750", "1800", "1860", "1920"], correctAnswer: "1800",
        explanation: "120 + 180 + 240 + 300 + 420 + 540 = 1800 Crore."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 1: Revenue Analysis**\n\nRevenue in ₹ Crore:${chart1}**Q2.** What percentage of total revenue is contributed by Company F?`,
        options: ["25%", "28%", "30%", "33.3%"], correctAnswer: "30%",
        explanation: "(540 / 1800) * 100 = 30%."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Easy",
        questionText: `**Bar Graph DI Set 1: Revenue Analysis**\n\nRevenue in ₹ Crore:${chart1}**Q3.** Find the ratio of revenue of E to the combined revenue of A and B.`,
        options: ["7:4", "7:5", "5:3", "9:5"], correctAnswer: "7:5",
        explanation: "E = 420. A+B = 300. Ratio = 420:300 = 7:5."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 1: Revenue Analysis**\n\nRevenue in ₹ Crore:${chart1}**Q4.** If Company C's revenue increases by 25%, what is the new total revenue?`,
        options: ["1800", "1840", "1860", "1900"], correctAnswer: "1860",
        explanation: "New total = 1800 + (25% of 240) = 1800 + 60 = 1860."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Hard",
        questionText: `**Bar Graph DI Set 1: Revenue Analysis**\n\nRevenue in ₹ Crore:${chart1}**Q5.** By what percentage should Company D increase its revenue to equal Company F?`,
        options: ["60%", "75%", "80%", "100%"], correctAnswer: "80%",
        explanation: "Difference = 540 - 300 = 240. (240 / 300) * 100 = 80%."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Easy",
        questionText: `**Bar Graph DI Set 1: Revenue Analysis**\n\nRevenue in ₹ Crore:${chart1}**Q6.** What is the average revenue of all the companies?`,
        options: ["250", "280", "300", "320"], correctAnswer: "300",
        explanation: "1800 / 6 = 300 Crore."
    },

    // SET 2
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 2: Production Units**\n\nProduction of 6 factories in thousands:${chart2}**Q7.** Find the total production of all factories.`,
        options: ["1040", "1080", "1120", "1150"], correctAnswer: "1080",
        explanation: "85 + 120 + 145 + 180 + 240 + 310 = 1080."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 2: Production Units**\n\nProduction (000s):${chart2}**Q8.** Factory U contributes what percentage of the total production?`,
        options: ["25.4%", "28.7%", "30.1%", "32.5%"], correctAnswer: "28.7%",
        explanation: "(310 / 1080) * 100 ≈ 28.7%."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 2: Production Units**\n\nProduction (000s):${chart2}**Q9.** Find the median production among the factories.`,
        options: ["145", "162.5", "180", "200"], correctAnswer: "162.5",
        explanation: "Middle two are 145 and 180. Avg = 162.5."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Hard",
        questionText: `**Bar Graph DI Set 2: Production Units**\n\nProduction (000s):${chart2}**Q10.** If the production of P and Q doubles, find the new total production.`,
        options: ["1165", "1240", "1285", "1300"], correctAnswer: "1285",
        explanation: "Add another P(85) + Q(120) = 205. New total = 1080 + 205 = 1285."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Hard",
        questionText: `**Bar Graph DI Set 2: Production Units**\n\nProduction (000s):${chart2}**Q11.** Difference between highest and lowest production as % of lowest.`,
        options: ["200%", "235.5%", "264.7%", "300%"], correctAnswer: "264.7%",
        explanation: "Difference = 310 - 85 = 225. (225 / 85) * 100 ≈ 264.7%."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 2: Production Units**\n\nProduction (000s):${chart2}**Q12.** Ratio of production of top 3 to bottom 3 factories.`,
        options: ["70:33", "73:35", "75:38", "80:41"], correctAnswer: "73:35",
        explanation: "Top 3 (180+240+310=730). Bottom 3 (85+120+145=350). Ratio 730:350 = 73:35."
    },

    // SET 3
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Easy",
        questionText: `**Bar Graph DI Set 3: Campus Placements**\n\nNumber of students selected:${chart3}**Q13.** Find the total number of selections.`,
        options: ["700", "720", "750", "800"], correctAnswer: "750",
        explanation: "Total = 750."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 3: Campus Placements**\n\nNumber of students selected:${chart3}**Q14.** What percentage of students got placed in TCS and Infosys together?`,
        options: ["40%", "42.67%", "45.5%", "48%"], correctAnswer: "42.67%",
        explanation: "(320 / 750) * 100 = 42.666%."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 3: Campus Placements**\n\nNumber of students selected:${chart3}**Q15.** If Deloitte increases its hiring by 150%, what is the new total?`,
        options: ["820", "855", "870", "890"], correctAnswer: "855",
        explanation: "Add 1.5 * 70 = 105. New total = 750 + 105 = 855."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Hard",
        questionText: `**Bar Graph DI Set 3: Campus Placements**\n\nAssume Deloitte is Consulting, rest are Service-based.${chart3}**Q16.** Find the ratio of service-based to consulting selections.`,
        options: ["62:7", "65:9", "68:7", "70:9"], correctAnswer: "68:7",
        explanation: "Service = 680. Consulting = 70. Ratio = 68:7."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Hard",
        questionText: `**Bar Graph DI Set 3: Campus Placements**\n\nNumber of students selected:${chart3}**Q17.** How many more hires must Cognizant make to surpass TCS by exactly 10%?`,
        options: ["68", "72", "78", "82"], correctAnswer: "78",
        explanation: "Target = 180 + 18 = 198. Cognizant has 120. Needs 198 - 120 = 78."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Easy",
        questionText: `**Bar Graph DI Set 3: Campus Placements**\n\nNumber of students selected:${chart3}**Q18.** What is the average number of selections per company?`,
        options: ["115", "120", "125", "130"], correctAnswer: "125",
        explanation: "750 / 6 = 125."
    },

    // SET 4
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 4: Analytics Hiring**\n\nHiring Trends:${chart4}**Q19.** Find the overall absolute growth percentage from 2020 to 2024.`,
        options: ["300%", "333.33%", "350%", "400%"], correctAnswer: "333.33%",
        explanation: "Increase = 400. (400/120)*100 = 333.33%."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 4: Analytics Hiring**\n\nHiring Trends:${chart4}**Q20.** Find the average annual absolute increase.`,
        options: ["80", "90", "100", "110"], correctAnswer: "100",
        explanation: "Total increase = 400 over 4 years. Avg = 100."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 4: Analytics Hiring**\n\nHiring Trends:${chart4}**Q21.** Which year had the maximum absolute increase from its preceding year?`,
        options: ["2022", "2023", "2024", "Both 2023 & 2024"], correctAnswer: "Both 2023 & 2024",
        explanation: "Increases: 60, 80, 130, 130."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Hard",
        questionText: `**Bar Graph DI Set 4: Analytics Hiring**\n\nHiring Trends:${chart4}**Q22.** What percentage of total hires over the 5 years came from 2024?`,
        options: ["30%", "33.3%", "35.37%", "38.5%"], correctAnswer: "35.37%",
        explanation: "520 / 1470 * 100 ≈ 35.37%."
    },

    // SET 5
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 5: ZS Ultra Hard**\n\nMonthly customers acquired:${chart5}**Q25.** Find the total customers acquired in 6 months.`,
        options: ["25000", "26200", "27500", "28000"], correctAnswer: "26200",
        explanation: "Sum = 26200."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Hard",
        questionText: `**Bar Graph DI Set 5: ZS Ultra Hard**\n\nMonthly customers acquired:${chart5}**Q26.** Find the percentage growth from Jan to Jun.`,
        options: ["300%", "325.5%", "355.55%", "400%"], correctAnswer: "355.55%",
        explanation: "(6400 / 1800) * 100 = 355.55%."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Easy",
        questionText: `**Bar Graph DI Set 5: ZS Ultra Hard**\n\nMonthly customers acquired:${chart5}**Q27.** Find the average monthly acquisition.`,
        options: ["4250", "4366.67", "4450", "4500"], correctAnswer: "4366.67",
        explanation: "26200 / 6 = 4366.67."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Medium",
        questionText: `**Bar Graph DI Set 5: ZS Ultra Hard**\n\nMonthly customers acquired:${chart5}**Q28.** If CAC is ₹800/customer, find total acquisition expenditure.`,
        options: ["₹1.80 Cr", "₹2.096 Cr", "₹2.20 Cr", "₹2.50 Cr"], correctAnswer: "₹2.096 Cr",
        explanation: "26200 * 800 = 2.096 Cr."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Hard",
        questionText: `**Bar Graph DI Set 5: ZS Ultra Hard**\n\nMonthly customers acquired:${chart5}**Q29.** If Revenue = ₹2500, find net profit (Revenue - CAC 800).`,
        options: ["₹4.20 Cr", "₹4.454 Cr", "₹4.80 Cr", "₹5.10 Cr"], correctAnswer: "₹4.454 Cr",
        explanation: "Profit per user = 1700. 26200 * 1700 = 4.454 Cr."
    },
    {
        category: "Data Interpretation", topic: "Bar Graphs", difficulty: "Hard",
        questionText: `**Bar Graph DI Set 5: ZS Analytics Level**\n\nMonthly customers acquired:${chart5}\nSuppose the retention rate is: Jan=70%, Feb=72%, Mar=75%, Apr=80%, May=82%, Jun=85%.\n**Q30.** Find total retained customers.`,
        options: ["19500", "20450", "20960", "21500"], correctAnswer: "20960",
        explanation: "(1800*0.7) + (2400*0.72) + (3200*0.75) + (4500*0.8) + (6100*0.82) + (8200*0.85) = 20960."
    }
];

const seedBatch24BarGraphs = async () => {
    try {
        await Question.deleteMany({ topic: "Bar Graphs" }); 
        await Question.insertMany(batch24Questions);
        console.log(`✅ BOOM! Asli Vertical Bar Graph Data Seed ho gaya!`);
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch24BarGraphs();