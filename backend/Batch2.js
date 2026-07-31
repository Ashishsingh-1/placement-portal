const mongoose = require('mongoose');
require('dotenv').config(); // <-- isko wapas normal kar do
const Question = require('./models/Question'); // <-- yahan '../' ki jagah './' kar do Question = require('../models/Question'); // path fix kiya hua hai

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Custom Profit & Loss Seeding'))
  .catch(err => console.log(err));

const batch2Questions = [
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Easy",
        questionText: "A shopkeeper sells an article for ₹2400 and gains 20%. Find the cost price.",
        options: ["₹1800", "₹2000", "₹2200", "₹2500"],
        correctAnswer: "₹2000",
        explanation: "Step 1: Selling Price (SP) = ₹2400, Gain = 20%.\nStep 2: Formula: SP = CP * (1 + Gain/100)\nStep 3: 2400 = CP * (1 + 20/100) = CP * 1.2\nStep 4: CP = 2400 / 1.2 = ₹2000."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Easy",
        questionText: "An article is sold at a loss of 15%. If the selling price is ₹2550, find the cost price.",
        options: ["₹2800", "₹3000", "₹3200", "₹3500"],
        correctAnswer: "₹3000",
        explanation: "Step 1: SP = ₹2550, Loss = 15%.\nStep 2: Formula: SP = CP * (1 - Loss/100)\nStep 3: 2550 = CP * (1 - 15/100) = CP * 0.85\nStep 4: CP = 2550 / 0.85 = ₹3000."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A trader marks an article 40% above cost price and allows a discount of 10%. Find his profit percentage.",
        options: ["24%", "25%", "26%", "28%"],
        correctAnswer: "26%",
        explanation: "Step 1: Let Cost Price (CP) = 100.\nStep 2: Marked Price (MP) = 100 + 40% = 140.\nStep 3: Discount is 10% on MP. Discount = 10% of 140 = 14.\nStep 4: Selling Price (SP) = MP - Discount = 140 - 14 = 126.\nStep 5: Profit = SP - CP = 126 - 100 = 26. Profit % = 26%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "An article is sold at a profit of 25%. If its cost price increases by 20% and selling price remains the same, find the new profit/loss percentage.",
        options: ["4.16% Profit", "5% Profit", "8.33% Profit", "10% Profit"],
        correctAnswer: "4.16% Profit",
        explanation: "Step 1: Let initial CP = 100. Then initial SP = 125.\nStep 2: New CP is increased by 20%, so New CP = 120.\nStep 3: New SP remains same = 125.\nStep 4: New Profit = 125 - 120 = 5.\nStep 5: New Profit % = (Profit / New CP) * 100 = (5 / 120) * 100 = 25 / 6 = 4.16%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A shopkeeper gains 20% by selling an article. Had he sold it for ₹120 less, he would have gained only 10%. Find the cost price.",
        options: ["₹1000", "₹1200", "₹1500", "₹1800"],
        correctAnswer: "₹1200",
        explanation: "Step 1: Difference in Profit % = 20% - 10% = 10%.\nStep 2: This 10% difference in CP corresponds to the difference in SP, which is ₹120.\nStep 3: Therefore, 10% of CP = ₹120.\nStep 4: CP = (120 / 10) * 100 = ₹1200."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "The cost price of 20 articles equals the selling price of 16 articles. Find the profit percentage.",
        options: ["20%", "25%", "30%", "33.33%"],
        correctAnswer: "25%",
        explanation: "Step 1: 20 * CP = 16 * SP.\nStep 2: Ratio of SP / CP = 20 / 16 = 5 / 4.\nStep 3: Profit = SP - CP = 5 - 4 = 1 part.\nStep 4: Profit % = (Profit / CP) * 100 = (1 / 4) * 100 = 25%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A trader mixes two varieties of rice costing ₹40/kg and ₹60/kg in the ratio 3:2. He sells the mixture at ₹58/kg. Find the profit percentage.",
        options: ["18.5%", "20%", "20.83%", "25%"],
        correctAnswer: "20.83%",
        explanation: "Step 1: Let he mixes 3 kg and 2 kg. Total weight = 5 kg.\nStep 2: Total CP = (3 * 40) + (2 * 60) = 120 + 120 = ₹240.\nStep 3: Average CP per kg = 240 / 5 = ₹48/kg.\nStep 4: SP = ₹58/kg. Profit = 58 - 48 = ₹10/kg.\nStep 5: Profit % = (10 / 48) * 100 = 1000 / 48 = 20.83%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A man buys a watch and sells it at 10% loss. Had he sold it for ₹300 more, he would have gained 5%. Find the cost price.",
        options: ["₹1800", "₹2000", "₹2400", "₹2500"],
        correctAnswer: "₹2000",
        explanation: "Step 1: Let CP = 100%. Initial SP = 90% (due to 10% loss).\nStep 2: New SP = 105% (due to 5% gain).\nStep 3: Difference in SP percentage = 105% - 90% = 15%.\nStep 4: 15% of CP = ₹300.\nStep 5: CP = (300 / 15) * 100 = ₹2000."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "After giving two successive discounts of 20% and 10%, a trader still gains 8%. Find the marked price percentage above cost price.",
        options: ["40%", "45%", "50%", "60%"],
        correctAnswer: "50%",
        explanation: "Step 1: Equivalent discount for 20% and 10% = 20 + 10 - (20*10)/100 = 28%.\nStep 2: SP = MP * (1 - 28/100) = 0.72 MP.\nStep 3: Gain is 8%, so SP = CP * 1.08.\nStep 4: Equating SP: 0.72 MP = 1.08 CP => MP/CP = 1.08 / 0.72 = 1.5.\nStep 5: MP is 1.5 times CP, which means it is 50% above CP."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A shopkeeper marks goods 50% above cost price and allows a discount of 20%. Find the profit percentage.",
        options: ["15%", "20%", "25%", "30%"],
        correctAnswer: "20%",
        explanation: "Step 1: Let CP = 100. Then MP = 150.\nStep 2: Discount = 20% of MP = 20% of 150 = 30.\nStep 3: SP = MP - Discount = 150 - 30 = 120.\nStep 4: Profit = 120 - 100 = 20. Profit % = 20%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "An article is sold at a profit of 30%. If the cost price was ₹500 less and selling price remained unchanged, the profit would have been 50%. Find the original cost price.",
        options: ["₹3000", "₹3500", "₹3750", "₹4000"],
        correctAnswer: "₹3750",
        explanation: "Step 1: Initial SP = 1.3 * CP.\nStep 2: New CP = CP - 500. New SP remains 1.3 * CP.\nStep 3: New Profit is 50%, so New SP = 1.5 * New CP.\nStep 4: 1.3 * CP = 1.5 * (CP - 500) => 1.3 CP = 1.5 CP - 750.\nStep 5: 0.2 CP = 750 => CP = 750 / 0.2 = ₹3750."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A trader gains 25% on one article and loses 20% on another. If both articles are sold for ₹2000 each, find the overall profit/loss percentage.",
        options: ["No profit no loss", "2.43% loss", "4% loss", "5% loss"],
        correctAnswer: "2.43% loss",
        explanation: "Step 1: Total SP = 2000 + 2000 = ₹4000.\nStep 2: CP of first article = 2000 / 1.25 = ₹1600.\nStep 3: CP of second article = 2000 / 0.80 = ₹2500.\nStep 4: Total CP = 1600 + 2500 = ₹4100.\nStep 5: Overall Loss = 4100 - 4000 = ₹100. Loss % = (100 / 4100) * 100 ≈ 2.43% loss."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A shopkeeper uses a false weight of 900 g instead of 1 kg and sells at cost price. Find his gain percentage.",
        options: ["10%", "11.11%", "12.5%", "15%"],
        correctAnswer: "11.11%",
        explanation: "Step 1: He charges for 1000g but actually gives 900g.\nStep 2: Profit in terms of weight = 1000g - 900g = 100g.\nStep 3: Profit % = (Error / True Weight given) * 100 = (100 / 900) * 100.\nStep 4: 100/9 = 11.11%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A trader marks goods 25% above cost and allows a discount of 10%. Find his net profit percentage.",
        options: ["10%", "12%", "12.5%", "15%"],
        correctAnswer: "12.5%",
        explanation: "Step 1: Let CP = 100. MP = 125.\nStep 2: Discount = 10% of 125 = 12.5.\nStep 3: SP = 125 - 12.5 = 112.5.\nStep 4: Profit = SP - CP = 112.5 - 100 = 12.5%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A sells an article to B at 20% profit and B sells it to C at 25% profit. If C pays ₹4500, find A's cost price.",
        options: ["₹2500", "₹2800", "₹3000", "₹3200"],
        correctAnswer: "₹3000",
        explanation: "Step 1: Let A's CP be 'x'.\nStep 2: SP of A (which is CP of B) = x * 1.20.\nStep 3: SP of B (which is CP of C) = (x * 1.20) * 1.25 = 4500.\nStep 4: x * 1.50 = 4500.\nStep 5: x = 4500 / 1.5 = ₹3000."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A trader gains 15% after allowing a discount of 25% on marked price. Marked price is what percent above cost price?",
        options: ["40%", "50%", "53.33%", "60%"],
        correctAnswer: "53.33%",
        explanation: "Step 1: SP = 1.15 * CP (since 15% gain).\nStep 2: SP is also = MP * (1 - 0.25) = 0.75 * MP.\nStep 3: Therefore, 0.75 * MP = 1.15 * CP.\nStep 4: MP / CP = 1.15 / 0.75 = 115 / 75 = 23 / 15 = 1.5333.\nStep 5: This means MP is 53.33% above CP."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A man sold an article for ₹690 at a loss of 8%. At what price should he sell it to gain 15%?",
        options: ["₹800", "₹825", "₹850", "₹862.5"],
        correctAnswer: "₹862.5",
        explanation: "Step 1: SP = ₹690, Loss = 8% => SP = 92% of CP.\nStep 2: CP = 690 / 0.92 = ₹750.\nStep 3: Target Gain = 15%. New SP = CP * 1.15.\nStep 4: New SP = 750 * 1.15 = ₹862.5."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A trader purchases 100 articles for ₹80 each. He sells 60 at ₹100 each and remaining at ₹70 each. Find overall profit/loss.",
        options: ["₹600 Profit", "₹800 Profit", "₹1000 Profit", "₹800 Loss"],
        correctAnswer: "₹800 Profit",
        explanation: "Step 1: Total Cost Price (CP) = 100 * 80 = ₹8000.\nStep 2: SP of 60 articles = 60 * 100 = ₹6000.\nStep 3: SP of remaining 40 articles = 40 * 70 = ₹2800.\nStep 4: Total SP = 6000 + 2800 = ₹8800.\nStep 5: Total Profit = SP - CP = 8800 - 8000 = ₹800 Profit."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A dealer marks an article 60% above cost price and gives two successive discounts of 10% and 20%. Find profit percentage.",
        options: ["12%", "15.2%", "18%", "20%"],
        correctAnswer: "15.2%",
        explanation: "Step 1: Let CP = 100. MP = 160.\nStep 2: After 1st discount (10%): Price = 160 * 0.9 = 144.\nStep 3: After 2nd discount (20%): Final SP = 144 * 0.8 = 115.2.\nStep 4: Profit = SP - CP = 115.2 - 100 = 15.2%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "An article is sold at 25% profit. If both cost price and selling price increase by ₹100, the profit becomes 20%. Find the original cost price.",
        options: ["₹300", "₹400", "₹500", "₹600"],
        correctAnswer: "₹400",
        explanation: "Step 1: Let initial CP = x. Initial SP = 1.25x.\nStep 2: New CP = x + 100. New SP = 1.25x + 100.\nStep 3: New Profit is 20%, so New SP = 1.2 * New CP.\nStep 4: 1.25x + 100 = 1.2(x + 100) => 1.25x + 100 = 1.2x + 120.\nStep 5: 0.05x = 20 => x = 400. Original CP is ₹400."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A trader buys an article for ₹1200 and sells it at a profit equal to 20% of the selling price. Find the selling price.",
        options: ["₹1400", "₹1440", "₹1500", "₹1600"],
        correctAnswer: "₹1500",
        explanation: "Step 1: CP = ₹1200. Profit = 20% of SP = 0.2 * SP.\nStep 2: We know SP = CP + Profit.\nStep 3: SP = 1200 + 0.2 * SP.\nStep 4: SP - 0.2 * SP = 1200 => 0.8 * SP = 1200.\nStep 5: SP = 1200 / 0.8 = ₹1500."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "The selling price of 12 articles equals the cost price of 15 articles. Find the profit or loss percentage.",
        options: ["20% Profit", "25% Profit", "20% Loss", "25% Loss"],
        correctAnswer: "25% Profit",
        explanation: "Step 1: 12 * SP = 15 * CP.\nStep 2: Ratio SP/CP = 15/12 = 5/4.\nStep 3: Profit = SP - CP = 5 - 4 = 1 part.\nStep 4: Profit % = (Profit/CP)*100 = (1/4)*100 = 25% Profit."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A shopkeeper sells sugar at 10% profit but uses a weight of 950 g instead of 1 kg. Find actual gain percentage.",
        options: ["12.5%", "15%", "15.78%", "20%"],
        correctAnswer: "15.78%",
        explanation: "Step 1: Let CP of 1000g be ₹1000. So CP of 950g = ₹950 (Actual cost to shopkeeper).\nStep 2: He claims 10% profit on 1000g, so SP = ₹1000 * 1.1 = ₹1100.\nStep 3: Actual Profit = SP - Actual Cost = 1100 - 950 = ₹150.\nStep 4: Gain % = (150 / 950) * 100 = 1500 / 95 = 300 / 19 ≈ 15.78%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A trader marks goods 80% above cost price and allows a discount such that he gains 20%. Find the discount percentage.",
        options: ["20%", "25%", "30%", "33.33%"],
        correctAnswer: "33.33%",
        explanation: "Step 1: Let CP = 100. MP = 180.\nStep 2: Required Gain = 20%, so required SP = 120.\nStep 3: Discount Amount = MP - SP = 180 - 120 = 60.\nStep 4: Discount % = (Discount / MP) * 100 = (60 / 180) * 100 = 33.33%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A trader sold two articles for ₹5000 each. On one he gained 25% and on the other he lost 25%. Find net profit/loss amount.",
        options: ["₹500 Loss", "₹600 Loss", "₹666.67 Loss", "₹750 Loss"],
        correctAnswer: "₹666.67 Loss",
        explanation: "Step 1: Total SP = 5000 + 5000 = ₹10000.\nStep 2: CP of first article = 5000 / 1.25 = ₹4000.\nStep 3: CP of second article = 5000 / 0.75 = ₹6666.67.\nStep 4: Total CP = 4000 + 6666.67 = ₹10666.67.\nStep 5: Loss = Total CP - Total SP = 10666.67 - 10000 = ₹666.67 Loss."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Medium",
        questionText: "A retailer buys an article and marks it 50% above cost price. During a sale, he offers 20% discount and still earns ₹240 profit. Find the cost price.",
        options: ["₹1000", "₹1200", "₹1500", "₹1800"],
        correctAnswer: "₹1200",
        explanation: "Step 1: Let CP = x. MP = 1.5x.\nStep 2: SP after 20% discount = 1.5x * 0.8 = 1.2x.\nStep 3: Profit = SP - CP = 1.2x - x = 0.2x.\nStep 4: Given Profit = 240, so 0.2x = 240.\nStep 5: x = 240 / 0.2 = ₹1200."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A dishonest trader claims to sell at cost price but uses weights that are 20% less than standard. Find gain percentage.",
        options: ["15%", "20%", "25%", "30%"],
        correctAnswer: "25%",
        explanation: "Step 1: He gives 800g instead of 1000g (20% less weight).\nStep 2: He charges for 1000g. Profit is the 200g he saved.\nStep 3: Gain % = (Error / True Weight Given) * 100.\nStep 4: Gain % = (200 / 800) * 100 = 1/4 * 100 = 25%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Easy",
        questionText: "A trader buys 40 pens for ₹600 and sells them at ₹18 each. Find profit percentage.",
        options: ["15%", "18%", "20%", "25%"],
        correctAnswer: "20%",
        explanation: "Step 1: CP of 1 pen = 600 / 40 = ₹15.\nStep 2: SP of 1 pen = ₹18.\nStep 3: Profit per pen = 18 - 15 = ₹3.\nStep 4: Profit % = (3 / 15) * 100 = 20%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A dealer marks goods 100% above cost price. He offers two successive discounts of 20% and x%. If he still gains 28%, find x.",
        options: ["10%", "15%", "20%", "25%"],
        correctAnswer: "20%",
        explanation: "Step 1: Let CP = 100. MP = 200. Gain is 28%, so final SP = 128.\nStep 2: SP after 1st discount (20%) = 200 * 0.8 = 160.\nStep 3: 2nd discount 'x' is applied on 160 to reach 128.\nStep 4: SP = 160 * (1 - x/100) = 128.\nStep 5: (1 - x/100) = 128 / 160 = 0.8 => x/100 = 0.2 => x = 20%."
    },
    {
        category: "Aptitude", topic: "Profit & loss", difficulty: "Hard",
        questionText: "A trader marks an article 80% above cost price. He offers a discount of 20%. During a festive sale he offers an additional discount of 10%. He also uses a false weight giving only 900 g instead of 1 kg. Find his overall gain percentage",
        options: ["40%", "42%", "44%", "48%"],
        correctAnswer: "44%",
        explanation: "Step 1: Let CP of 1000g = 1000. So CP for 900g (actual cost) = 900.\nStep 2: MP for 1000g = 1000 + 80% = 1800.\nStep 3: Final SP after 2 discounts = 1800 * 0.8 * 0.9 = 1296.\nStep 4: Actual Profit = SP - Actual Cost = 1296 - 900 = 396.\nStep 5: Gain % = (Profit / Actual Cost) * 100 = (396 / 900) * 100 = 44%."
    }
];

const seedBatch2ProfitLoss = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Profit & Loss questions...");
        // Purana Profit & loss ka data delete kar rahe hain
        await Question.deleteMany({ topic: "Profit & loss" }); 
        console.log("🗑️ Purana Profit & Loss data safely deleted!");

        console.log(`🚀 Injecting ${batch2Questions.length} Custom Placement Questions into the database...`);
        
        await Question.insertMany(batch2Questions);
        console.log(`✅ BOOM! Tumhara custom Profit & Loss data successfully seed ho gaya!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch2ProfitLoss();