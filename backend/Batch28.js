const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Data Sufficiency Seeding'))
  .catch(err => console.log(err));

const directionsText = `**Data Sufficiency Directions:**\nEvaluate each statement to determine the correct option:\n- **Option A:** Statement I alone is sufficient, but Statement II alone is not sufficient.\n- **Option B:** Statement II alone is sufficient, but Statement I alone is not sufficient.\n- **Option C:** Both statements together are sufficient, but neither statement alone is sufficient.\n- **Option D:** Each statement alone is sufficient.\n- **Option E:** Statements I and II together are not sufficient to answer the question.`;

const batch29Questions = [
    // ==========================================
    // SET 1: REVENUE & PROFIT ANALYTICS
    // ==========================================
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q1.** What is the company's total profit?\n\n**Statement I:** Revenue = ₹500 Cr\n**Statement II:** Profit margin = 20%`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Statement I gives only Revenue (₹500 Cr), Profit is unknown.\nLine 2: Statement II gives only Margin (20%), absolute profit is unknown.\nLine 3: Combining both: Profit = 20% of ₹500 Cr = ₹100 Cr.\nLine 4: Hence, both statements together are sufficient."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q2.** What is Product A's revenue?\n\n**Statement I:** Product A contributes 25% of total revenue.\n**Statement II:** Total company revenue = ₹800 Cr.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Statement I gives only percentage share (25%), total is unknown.\nLine 2: Statement II gives only total company revenue (₹800 Cr), share is unknown.\nLine 3: Combining both: Product A Revenue = 25% of 800 = ₹200 Cr.\nLine 4: Hence, both statements together are sufficient."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q3.** Find the profit of Product B.\n\n**Statement I:** Revenue of B = ₹150 Cr.\n**Statement II:** Margin of B = 18%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Statement I specifies revenue only.\nLine 2: Statement II specifies margin percentage only.\nLine 3: Combining both: Profit = 18% of ₹150 Cr = ₹27 Cr.\nLine 4: Together they are sufficient to find the exact value."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q4.** What is the overall company margin?\n\n**Statement I:** Profit = ₹120 Cr.\n**Statement II:** Revenue = ₹600 Cr.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Margin is calculated as (Profit / Revenue) * 100.\nLine 2: Statement I alone lacks revenue data.\nLine 3: Statement II alone lacks profit data.\nLine 4: Combining both: Margin = (120 / 600) * 100 = 20%. Both are required."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q5.** Find the total revenue for the next year.\n\n**Statement I:** Current revenue = ₹1000 Cr.\n**Statement II:** Expected growth rate = 15%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Next Year Revenue = Current Revenue * (1 + Growth Rate).\nLine 2: Statement I lacks the growth rate.\nLine 3: Statement II lacks the base current value.\nLine 4: Combined: Next year = 1000 * 1.15 = ₹1150 Cr. Both are sufficient."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q6.** Did the company achieve its target revenue?\n\n**Statement I:** Actual revenue = ₹900 Cr.\n**Statement II:** Target revenue = ₹850 Cr.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: To answer a 'Yes/No' question, we must compare Actual vs Target.\nLine 2: Statement I gives only Actual. Statement II gives only Target.\nLine 3: Combined: 900 Cr (Actual) > 850 Cr (Target). The answer is a definitive 'Yes'.\nLine 4: Together they are sufficient."
    },

    // ==========================================
    // SET 2: EMPLOYEE ANALYTICS
    // ==========================================
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q7.** How many employees are in the IT department?\n\n**Statement I:** Total employees = 2400.\n**Statement II:** IT accounts for 35% of total employees.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Statement I gives base workforce size.\nLine 2: Statement II gives the segment allocation percentage.\nLine 3: Combining both: IT Count = 35% of 2400 = 840.\nLine 4: Combined statements are required."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q8.** Find the number of female employees in HR.\n\n**Statement I:** HR employees = 300.\n**Statement II:** 40% of HR employees are female.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: We need both the base segment size and the gender split.\nLine 2: Statement I gives the base (300). Statement II gives the split (40%).\nLine 3: Combined: 40% of 300 = 120 females.\nLine 4: Both are necessary."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q9.** Find the number of Operations employees.\n\n**Statement I:** Ratio of Operations to HR = 4:3.\n**Statement II:** HR employees = 180.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Statement I gives the relationship ratio but no absolute value.\nLine 2: Statement II provides the absolute value for one part of the ratio.\nLine 3: Combined: Ops = (4/3) * 180 = 240.\nLine 4: Both are needed."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q10.** Find the total workforce after hiring.\n\n**Statement I:** Current employees = 1500.\n**Statement II:** 20% increase is planned.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: New Total = Current * (1 + increase).\nLine 2: Neither statement alone has both parameters.\nLine 3: Combined: 1500 * 1.20 = 1800.\nLine 4: Option C is correct."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q11.** Did IT have more employees than Sales?\n\n**Statement I:** IT employees = 500.\n**Statement II:** Sales employees = 450.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: A comparison requires values for both entities.\nLine 2: I gives IT only. II gives Sales only.\nLine 3: Combined: 500 > 450. The answer is definitively 'Yes'.\nLine 4: Both are needed."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q12.** Find the average number of employees per department.\n\n**Statement I:** Total employees = 2500.\n**Statement II:** Number of departments = 5.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Average = Total / Count.\nLine 2: Statement I gives Total. Statement II gives Count.\nLine 3: Combined: 2500 / 5 = 500 average.\nLine 4: Both are necessary."
    },

    // ==========================================
    // SET 3: MARKET SHARE ANALYTICS
    // ==========================================
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q13.** Find the revenue of Company A.\n\n**Statement I:** Total market size = ₹10,000 Cr.\n**Statement II:** Company A holds an 18% market share.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Company Revenue = Market Size * Market Share.\nLine 2: Statement I provides size. Statement II provides share.\nLine 3: Combined: 18% of 10,000 = ₹1800 Cr.\nLine 4: Both are required."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q14.** Find the market share percentage of Company B.\n\n**Statement I:** Revenue of B = ₹2200 Cr.\n**Statement II:** Total market size = ₹11,000 Cr.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Market Share = (Company Revenue / Market Size) * 100.\nLine 2: I gives numerator. II gives denominator.\nLine 3: Combined: (2200 / 11000) * 100 = 20%.\nLine 4: Both statements are needed."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Hard",
        questionText: `${directionsText}\n\n---\n\n**Q15.** Did Company A lead the market (i.e., hold the highest share)?\n\n**Statement I:** Company A share = 24%.\n**Statement II:** The largest competitor's share = 22%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: To prove market leadership, A's share must be > the next highest competitor.\nLine 2: Statement I only gives A's share. Statement II gives the max competitor's share.\nLine 3: Combined: 24% > 22%. Yes, A led the market.\nLine 4: Both are required."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q16.** Find the combined revenue of Company A and Company B.\n\n**Statement I:** A revenue = ₹1500 Cr.\n**Statement II:** B revenue = ₹1800 Cr.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Combined = A + B.\nLine 2: I gives A. II gives B.\nLine 3: Combined: 1500 + 1800 = ₹3300 Cr.\nLine 4: Both are needed."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Hard",
        questionText: `${directionsText}\n\n---\n\n**Q17.** Find the market concentration ratio of the top 4 firms.\n\n**Statement I:** The top 4 firms hold 70% of the market.\n**Statement II:** Total market size = ₹20,000 Cr.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option A",
        explanation: "Line 1: Market concentration ratio is defined purely as the sum of market shares (%) of the top N firms.\nLine 2: Statement I explicitly gives this ratio as 70%.\nLine 3: Statement II (Market size) is irrelevant and not needed to answer the question.\nLine 4: Statement I alone is sufficient."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Hard",
        questionText: `${directionsText}\n\n---\n\n**Q18.** Find Company C's rank by market share.\n\n**Statement I:** The revenue order is A > B > C > D.\n**Statement II:** There are exactly 4 companies in the entire market.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Statement I tells us C is 3rd among A,B,C,D, but there could be more companies (E, F) ahead of A.\nLine 2: Statement II confirms there are ONLY 4 companies.\nLine 3: Combined: Out of exactly 4, the order A>B>C>D confirms C is rank 3.\nLine 4: Both are needed to be absolutely certain."
    },

    // ==========================================
    // SET 4: GROWTH & FORECASTING
    // ==========================================
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q19.** Predict next year's revenue.\n\n**Statement I:** Current revenue = ₹1200 Cr.\n**Statement II:** Expected growth = 18%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Prediction requires current value and growth multiplier.\nLine 2: I gives base. II gives multiplier.\nLine 3: Combined: 1200 * 1.18 = ₹1416 Cr.\nLine 4: Both are sufficient."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Hard",
        questionText: `${directionsText}\n\n---\n\n**Q20.** Find the Compound Annual Growth Rate (CAGR).\n\n**Statement I:** Initial revenue = ₹500 Cr.\n**Statement II:** Final revenue = ₹900 Cr after exactly 3 years.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: CAGR formula requires Initial Value, Final Value, and Time (N).\nLine 2: I provides Initial. II provides Final and Time (N=3).\nLine 3: Combined: CAGR = (900/500)^(1/3) - 1. We have all variables.\nLine 4: Option C is correct."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q21.** Did the revenue growth exceed 20%?\n\n**Statement I:** Revenue rose from ₹400 Cr to ₹500 Cr.\n**Statement II:** No additional information is provided.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option A",
        explanation: "Line 1: Statement I gives both old and new values. Growth = ((500-400)/400)*100 = 25%.\nLine 2: 25% is definitively greater than 20%.\nLine 3: Statement II is blank/useless.\nLine 4: Statement I alone is sufficient."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q22.** Find the future customer count.\n\n**Statement I:** Current customers = 80,000.\n**Statement II:** Expected increase = 25%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Future = Current * (1 + Increase).\nLine 2: Combined: 80,000 * 1.25 = 100,000.\nLine 3: Both are needed to calculate."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q23.** Find the total number of retained customers.\n\n**Statement I:** Total initial customers = 50,000.\n**Statement II:** Retention rate = 84%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Retained = Total Base * Retention Rate.\nLine 2: I gives base. II gives rate.\nLine 3: Combined: 50,000 * 0.84 = 42,000.\nLine 4: Both are required."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Easy",
        questionText: `${directionsText}\n\n---\n\n**Q24.** Find the future revenue.\n\n**Statement I:** Current revenue = ₹700 Cr.\n**Statement II:** The growth rate is completely unknown.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option E",
        explanation: "Line 1: To find future revenue, a growth rate is strictly required.\nLine 2: Statement I gives the base, but Statement II explicitly states growth is unknown.\nLine 3: Since a required variable is missing, we cannot calculate it.\nLine 4: Neither statement, even combined, is sufficient."
    },

    // ==========================================
    // SET 5: ACTUAL ANALYTICS PATTERNS
    // ==========================================
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Hard",
        questionText: `${directionsText}\n\n---\n\n**Q25.** A company invests only in segments that outperform its average margin. Should the company invest in Segment A?\n\n**Statement I:** Segment A margin = 28%.\n**Statement II:** Company average margin = 20%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: The investment rule is: 'Is Segment Margin > Average Margin?'.\nLine 2: I gives segment margin. II gives average margin.\nLine 3: Combined: 28% > 20%. The answer is a definitive 'Yes'.\nLine 4: Both are required to make the comparison."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Hard",
        questionText: `${directionsText}\n\n---\n\n**Q26.** Can Segment B become the largest contributor to revenue next year?\n\n**Statement I:** Current contribution of B = 22%.\n**Statement II:** Expected growth of B = 40%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option E",
        explanation: "Line 1: To determine if B becomes the 'largest', we must know the growth and shares of ALL OTHER segments.\nLine 2: Both statements only provide data for Segment B.\nLine 3: Since data on competitors is missing, we cannot answer the question.\nLine 4: Both statements combined are NOT sufficient."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q27.** Will the total profit exceed ₹500 Cr?\n\n**Statement I:** Revenue = ₹2000 Cr.\n**Statement II:** Margin = 26%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Profit = Revenue * Margin.\nLine 2: Combined: 2000 * 0.26 = ₹520 Cr.\nLine 3: We can definitively answer 'Yes' (520 > 500) using both.\nLine 4: Both are required."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Medium",
        questionText: `${directionsText}\n\n---\n\n**Q28.** Can the customer target be achieved next year?\n\n**Statement I:** Current customers = 700,000.\n**Statement II:** Expected growth = 18%, Target = 800,000.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Projected = Current * (1 + Growth).\nLine 2: Statement I has base. Statement II has growth and target.\nLine 3: Combined: 700k * 1.18 = 826k. Since 826k > 800k target, the answer is 'Yes'.\nLine 4: Option C is correct."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Hard",
        questionText: `${directionsText}\n\n---\n\n**Q29.** The company prioritizes the segment with the highest profit margin. Should management prioritize Healthcare?\n\n**Statement I:** Healthcare margin = 32%.\n**Statement II:** Healthcare has the highest margin among all segments.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option B",
        explanation: "Line 1: The rule dictates prioritizing the segment with the 'highest' margin.\nLine 2: Statement II explicitly states Healthcare is the highest. This alone gives a definitive 'Yes'.\nLine 3: Statement I gives the absolute value (32%) but without knowing other segments, we can't prove it's the highest.\nLine 4: Therefore, Statement II alone is sufficient."
    },
    {
        category: "Logical Reasoning", topic: "Data Sufficiency", difficulty: "Hard",
        questionText: `${directionsText}\n\n---\n\n**Q30 (Mu Sigma / ZS Final Round Style).** Can the company achieve Revenue = ₹3000 Cr AND Margin = 25% next year?\n\n**Statement I:** Current revenue = ₹2500 Cr.\n**Statement II:** Expected growth = 15%, expected margin = 24%.`,
        options: ["Option A", "Option B", "Option C", "Option D", "Option E"], correctAnswer: "Option C",
        explanation: "Line 1: Projected Rev = 2500 * 1.15 = ₹2875 Cr (Fails the 3000 Cr target).\nLine 2: Projected Margin = 24% (Fails the 25% target).\nLine 3: Since both conditions fail, we can give a definitive 'No' to the question.\nLine 4: We needed both statements to calculate the exact future parameters and answer conclusively. Option C."
    }
];

const seedBatch29DataSufficiency = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Data Sufficiency questions...");
        await Question.deleteMany({ topic: "Data Sufficiency" }); 
        
        console.log(`🚀 Injecting ${batch29Questions.length} Premium Data Sufficiency Questions...`);
        
        await Question.insertMany(batch29Questions);
        console.log(`✅ BOOM! Saara ZS / Mu Sigma level ka Data Sufficiency successfully seed ho gaya!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch29DataSufficiency();