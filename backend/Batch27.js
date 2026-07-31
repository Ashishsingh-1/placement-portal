const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Ultimate Caselets Seeding'))
  .catch(err => console.log(err));

// ==========================================
// DYNAMIC JSON CHARTS FOR CASELETS
// ==========================================
const set1Pie = `\n\`\`\`json\n{ "type": "pie", "data": [ {"name": "Technology", "value": 40}, {"name": "Operations", "value": 25}, {"name": "HR", "value": 21}, {"name": "Finance", "value": 14} ] }\n\`\`\`\n`;
const set2Pie = `\n\`\`\`json\n{ "type": "pie", "data": [ {"name": "Product A", "value": 35}, {"name": "Product B", "value": 25}, {"name": "Product C", "value": 20}, {"name": "Product D", "value": 10}, {"name": "Product E", "value": 10} ] }\n\`\`\`\n`;
const set2Line = `\n\`\`\`json\n{ "type": "line", "data": [ {"name": "A", "Margin %": 18}, {"name": "B", "Margin %": 22}, {"name": "C", "Margin %": 25}, {"name": "D", "Margin %": 15}, {"name": "E", "Margin %": 30} ] }\n\`\`\`\n`;
const set3Pie = `\n\`\`\`json\n{ "type": "pie", "data": [ {"name": "Electronics", "value": 30}, {"name": "Fashion", "value": 25}, {"name": "Grocery", "value": 20}, {"name": "Home", "value": 15}, {"name": "Others", "value": 10} ] }\n\`\`\`\n`;
const set3Bar = `\n\`\`\`json\n{ "type": "bar", "data": [ {"name": "Elec", "value": 8}, {"name": "Fash", "value": 12}, {"name": "Groc", "value": 3}, {"name": "Home", "value": 5}, {"name": "Oth", "value": 10} ] }\n\`\`\`\n`;
const set4Bar1 = `\n\`\`\`json\n{ "type": "bar", "data": [ {"name": "Healthcare", "value": 150}, {"name": "BFSI", "value": 120}, {"name": "Retail", "value": 90}, {"name": "Telecom", "value": 80}, {"name": "Mfg", "value": 60} ] }\n\`\`\`\n`;
const set4Line = `\n\`\`\`json\n{ "type": "line", "data": [ {"name": "Healthcare", "Success %": 88}, {"name": "BFSI", "Success %": 82}, {"name": "Retail", "Success %": 90}, {"name": "Telecom", "Success %": 85}, {"name": "Mfg", "Success %": 80} ] }\n\`\`\`\n`;
const set5Pie = `\n\`\`\`json\n{ "type": "pie", "data": [ {"name": "Enterprise", "value": 35}, {"name": "Mid-Market", "value": 40}, {"name": "Small Biz", "value": 25} ] }\n\`\`\`\n`;
const set5Bar = `\n\`\`\`json\n{ "type": "bar", "data": [ {"name": "Enterprise", "value": 50000}, {"name": "Mid-Market", "value": 25000}, {"name": "Small Biz", "value": 10000} ] }\n\`\`\`\n`;

// ==========================================
// PASSAGES
// ==========================================
const caselet1 = `**Caselet DI Set 1: Employee Distribution**\n\nA company has 1200 employees. \n- 40% work in Technology.\n- 25% work in Operations.\n- The remaining work in HR and Finance in the ratio 3:2.\n- 60% of Technology employees are male.\n- 55% of Operations employees are female.\n\n**Department Distribution Visualized:**${set1Pie}`;
const caselet2 = `**Caselet DI Set 2: Startup Revenue**\n\nA startup earns ₹150 Cr total revenue.\n- Product A contributes 35%, Product B 25%, Product C 20%.\n- Remaining revenue comes equally from D and E.\n\n**Revenue Share Visualized:**${set2Pie}\n**Profit Margins Visualized:**${set2Line}`;
const caselet3 = `**Caselet DI Set 3: E-commerce Orders**\n\nAn e-commerce company receives 50,000 orders.\n\n**Order Distribution:**${set3Pie}\n**Return Rates (%) per Category:**${set3Bar}`;
const caselet4 = `**Caselet DI Set 4: Consulting Projects**\n\nA consulting firm handled 500 projects.\n\n**Projects Handled (Volume):**${set4Bar1}\n**Success Rate (%) Visualized:**${set4Line}`;
const caselet5 = `**Caselet DI Set 5: ZS / Mu Sigma Style SaaS Metrics**\n\nA SaaS company reports Total Customers = 80,000.\n\n**Customer Mix:**${set5Pie}\n**Annual Revenue per Customer (₹):**${set5Bar}\n**Retention Rates:** Enterprise = 92%, Mid-Market = 85%, Small Business = 75%.\n\n`;

const batch28Questions = [
    // SET 1
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Easy",
        questionText: `${caselet1}**Q1.** Find the number of employees in each department (Tech, Ops, HR, Finance).`,
        options: ["480, 300, 252, 168", "450, 320, 240, 190", "480, 300, 260, 160", "500, 280, 252, 168"], correctAnswer: "480, 300, 252, 168", explanation: "Tech = 40% of 1200 = 480. Ops = 25% = 300. Rem = 35% = 420. HR:Fin = 3:2. HR = (3/5)*420 = 252. Fin = (2/5)*420 = 168."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Easy",
        questionText: `${caselet1}**Q2.** Find the number of male employees in Technology.`,
        options: ["240", "268", "288", "312"], correctAnswer: "288", explanation: "Tech = 480. Males = 60% of 480 = 288."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Easy",
        questionText: `${caselet1}**Q3.** Find the number of female employees in Operations.`,
        options: ["135", "150", "165", "180"], correctAnswer: "165", explanation: "Ops = 300. Females = 55% of 300 = 165."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Easy",
        questionText: `${caselet1}**Q4.** Find the total number of HR employees.`,
        options: ["200", "225", "252", "260"], correctAnswer: "252", explanation: "Remaining = 420. Ratio = 3:2. HR = 420 * 3/5 = 252."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Easy",
        questionText: `${caselet1}**Q5.** Find the ratio of HR to Finance employees.`,
        options: ["2:3", "3:2", "4:3", "5:4"], correctAnswer: "3:2", explanation: "Directly given in the passage as 3:2."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet1}**Q6.** If exactly 20% of Finance employees leave the company, what is the new total workforce?`,
        options: ["1150", "1166", "1172", "1180"], correctAnswer: "1166", explanation: "Fin = 168. 20% leave = 33.6 (Approx 34). Total = 1200 - 33.6 = 1166.4 (Rounds to 1166)."
    },

    // SET 2
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet2}**Q7.** Find the revenue (in ₹ Cr) generated by each product (A, B, C, D, E).`,
        options: ["50, 40, 30, 15, 15", "52.5, 37.5, 30, 15, 15", "55, 35, 30, 20, 10", "60, 30, 30, 15, 15"], correctAnswer: "52.5, 37.5, 30, 15, 15", explanation: "150 * [0.35, 0.25, 0.20, 0.10, 0.10]."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Easy",
        questionText: `${caselet2}**Q8.** Find the total profit generated from Product C.`,
        options: ["₹5.5 Cr", "₹6.0 Cr", "₹7.5 Cr", "₹8.0 Cr"], correctAnswer: "₹7.5 Cr", explanation: "C Rev = 30 Cr. Margin = 25%. Profit = 30 * 0.25 = 7.5 Cr."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet2}**Q9.** Find the total company profit.`,
        options: ["₹28.50 Cr", "₹30.25 Cr", "₹31.95 Cr", "₹34.50 Cr"], correctAnswer: "₹31.95 Cr", explanation: "A: 52.5*0.18=9.45. B: 37.5*0.22=8.25. C: 30*0.25=7.5. D: 15*0.15=2.25. E: 15*0.3=4.5. Total = 31.95 Cr."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet2}**Q10.** Which product contributes the maximum absolute profit?`,
        options: ["Product A", "Product B", "Product C", "Product E"], correctAnswer: "Product A", explanation: "A gives 9.45 Cr, B gives 8.25 Cr, C gives 7.5 Cr. Product A is the highest."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet2}**Q11.** Find the weighted average profit margin of the startup.`,
        options: ["20.5%", "21.3%", "22.0%", "23.5%"], correctAnswer: "21.3%", explanation: "(Total Profit / Total Rev) * 100 = (31.95 / 150) * 100 = 21.3%."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet2}**Q12.** If Product E revenue doubles, what is the revised total company profit?`,
        options: ["₹34.25 Cr", "₹35.50 Cr", "₹36.45 Cr", "₹38.20 Cr"], correctAnswer: "₹36.45 Cr", explanation: "E rev doubles = +15 Cr extra. Profit on this = 15 * 0.30 = 4.5 Cr extra. New total = 31.95 + 4.5 = 36.45 Cr."
    },

    // SET 3
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet3}**Q13.** Find the total number of returned Electronics orders.`,
        options: ["1000", "1150", "1200", "1500"], correctAnswer: "1200", explanation: "Elec orders = 30% of 50000 = 15000. Returns = 8% of 15000 = 1200."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet3}**Q14.** Find the total number of returned orders across all categories.`,
        options: ["3500", "3650", "3875", "4000"], correctAnswer: "3875", explanation: "Elec: 15000*0.08=1200. Fash: 12500*0.12=1500. Groc: 10000*0.03=300. Home: 7500*0.05=375. Oth: 5000*0.10=500. Total = 3875."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Easy",
        questionText: `${caselet3}**Q15.** Which category contributes the most to the total returns?`,
        options: ["Electronics", "Fashion", "Home", "Others"], correctAnswer: "Fashion", explanation: "Fashion contributes 1500 returns, the highest among all."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet3}**Q16.** Find the total number of successful deliveries.`,
        options: ["45000", "46125", "46500", "47250"], correctAnswer: "46125", explanation: "Total orders = 50000. Total returns = 3875. Successful = 50000 - 3875 = 46125."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet3}**Q17.** What percentage of the total returns comes from Fashion?`,
        options: ["35.5%", "38.7%", "40.0%", "42.2%"], correctAnswer: "38.7%", explanation: "(1500 / 3875) * 100 ≈ 38.7%."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet3}**Q18.** If the Electronics return rate improves to 5%, what is the revised total returns count?`,
        options: ["3250", "3425", "3500", "3600"], correctAnswer: "3425", explanation: "New Elec returns = 5% of 15000 = 750 (drops by 450). New total = 3875 - 450 = 3425."
    },

    // SET 4
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet4}**Q19.** Find the number of successful Healthcare projects.`,
        options: ["120", "125", "132", "140"], correctAnswer: "132", explanation: "Healthcare projects = 150. Success = 88%. 150 * 0.88 = 132."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet4}**Q20.** Find the total number of successful projects across all sectors.`,
        options: ["415", "420", "427", "435"], correctAnswer: "427", explanation: "HC: 132. BFSI: 120*0.82=98.4. Retail: 90*0.9=81. Telecom: 80*0.85=68. Mfg: 60*0.8=48. Total = 427.4 (Approx 427)."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Easy",
        questionText: `${caselet4}**Q21.** Which sector contributes the maximum successful projects?`,
        options: ["Healthcare", "BFSI", "Retail", "Telecom"], correctAnswer: "Healthcare", explanation: "Healthcare has 132 successful projects, the highest."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet4}**Q22.** Find the overall success rate of the firm.`,
        options: ["82.5%", "84.2%", "85.5%", "88.0%"], correctAnswer: "85.5%", explanation: "Total Success = 427.4. Total Projects = 500. Rate = (427.4 / 500) * 100 ≈ 85.5%."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet4}**Q23.** How many more successful Telecom projects are required to equal the successful Retail projects?`,
        options: ["10", "13", "15", "18"], correctAnswer: "13", explanation: "Retail Success = 81. Telecom Success = 68. Difference = 81 - 68 = 13."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet4}**Q24.** Find the ratio of failed projects in BFSI to failed projects in Manufacturing.`,
        options: ["7:4", "8:5", "9:5", "2:1"], correctAnswer: "9:5", explanation: "BFSI Fail = 120 - 98.4 = 21.6. Mfg Fail = 60 - 48 = 12. Ratio = 21.6 / 12 = 1.8 = 9:5."
    },

    // SET 5
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet5}**Q25.** Find the annual revenue (in ₹ Cr) from each segment (Enterprise, Mid-Market, Small Business).`,
        options: ["1200, 900, 300", "1400, 800, 200", "1500, 750, 250", "1600, 600, 200"], correctAnswer: "1400, 800, 200", explanation: "Ent Cust = 35% of 80k = 28000. Rev = 28k * 50k = 1400 Cr. Mid = 40% = 32000. Rev = 32k * 25k = 800 Cr. Small = 25% = 20000. Rev = 20k * 10k = 200 Cr."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Easy",
        questionText: `${caselet5}**Q26.** Find the total annual revenue generated by the SaaS company.`,
        options: ["₹2000 Cr", "₹2200 Cr", "₹2400 Cr", "₹2600 Cr"], correctAnswer: "₹2400 Cr", explanation: "1400 + 800 + 200 = 2400 Cr."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet5}**Q27.** Find the total number of retained customers across all segments after one year.`,
        options: ["65000", "66500", "67960", "68500"], correctAnswer: "67960", explanation: "Ent Ret = 28k * 0.92 = 25760. Mid Ret = 32k * 0.85 = 27200. Small Ret = 20k * 0.75 = 15000. Total = 67960."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet5}**Q28.** Find the total retained revenue (in ₹ Cr) after one year.`,
        options: ["₹1950 Cr", "₹2050 Cr", "₹2118 Cr", "₹2250 Cr"], correctAnswer: "₹2118 Cr", explanation: "Ent Ret Rev = 25760 * 50k = 1288 Cr. Mid Ret Rev = 27200 * 25k = 680 Cr. Small Ret Rev = 15000 * 10k = 150 Cr. Total = 1288 + 680 + 150 = 2118 Cr."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Medium",
        questionText: `${caselet5}**Q29.** Which segment contributes the most to the total retained revenue?`,
        options: ["Enterprise", "Mid-Market", "Small Business", "Cannot be determined"], correctAnswer: "Enterprise", explanation: "Enterprise contributes ₹1288 Cr, which is the highest."
    },
    {
        category: "Data Interpretation", topic: "Ultimate Caselets", difficulty: "Hard",
        questionText: `${caselet5}**Q30 (Actual Analytics-Style).** Management target is to have retained revenue ≥ ₹2500 Cr next year. Assuming the initial customer mix and retention rates remain unchanged, is the target achievable as is?`,
        options: ["Yes, easily achievable", "No, it falls short by ₹382 Cr", "No, it falls short by ₹250 Cr", "Yes, exactly hits target"], correctAnswer: "No, it falls short by ₹382 Cr", explanation: "Current calculated retained revenue is 2118 Cr. Target is 2500 Cr. Shortfall = 2500 - 2118 = 382 Cr."
    }
];

const seedBatch28CaseletDI = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Caselet questions...");
        await Question.deleteMany({ topic: "Ultimate Caselets" }); 
        
        console.log(`🚀 Injecting ${batch28Questions.length} Ultimate Mixed Caselet Questions...`);
        
        await Question.insertMany(batch28Questions);
        console.log(`✅ BOOM! Tables, Line, Bar aur Pie chart combos seed ho gaye hain!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch28CaseletDI();