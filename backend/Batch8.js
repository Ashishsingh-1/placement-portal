const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Mixture & Alligation Seeding'))
  .catch(err => console.log(err));

const batch8Questions = [
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Easy",
        questionText: "A mixture contains milk and water in the ratio 7:3. How much water should be added to 40 litres of the mixture so that the ratio becomes 7:5?",
        options: ["6L", "8L", "10L", "12L"],
        correctAnswer: "8L",
        explanation: "Step 1: Total mixture = 40L. Milk = (7/10) * 40 = 28L, Water = (3/10) * 40 = 12L.\nStep 2: Let x litres of water be added. New ratio = 7:5.\nStep 3: Milk remains 28L. So, 28 / (12 + x) = 7 / 5.\nStep 4: 140 = 7(12 + x) => 140 = 84 + 7x.\nStep 5: 7x = 56 => x = 8L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "A vessel contains 60 litres of milk. 12 litres are removed and replaced with water. This process is repeated once more. Find the quantity of milk left.",
        options: ["36L", "38.4L", "40L", "42L"],
        correctAnswer: "38.4L",
        explanation: "Step 1: Use the replacement formula: Final Quantity = Initial * (1 - Removed/Total)^n.\nStep 2: Initial = 60, Removed = 12, Total = 60, n = 2 (repeated once more means 2 times total).\nStep 3: Final = 60 * (1 - 12/60)^2 = 60 * (1 - 1/5)^2 = 60 * (4/5)^2.\nStep 4: 60 * (16 / 25) = 960 / 25 = 38.4L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "Two varieties of rice costing ₹40/kg and ₹60/kg are mixed in the ratio 3:2. Find the cost price of the mixture.",
        options: ["₹45/kg", "₹48/kg", "₹50/kg", "₹52/kg"],
        correctAnswer: "₹48/kg",
        explanation: "Step 1: Average Cost = (Quantity1 * Price1 + Quantity2 * Price2) / Total Quantity.\nStep 2: Avg Cost = (3 * 40 + 2 * 60) / (3 + 2).\nStep 3: (120 + 120) / 5 = 240 / 5 = ₹48/kg."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "A trader mixes rice costing ₹50/kg and ₹70/kg in such a way that he gains 20% by selling the mixture at ₹72/kg. Find the ratio of mixing.",
        options: ["1:1", "1:2", "2:1", "3:2"],
        correctAnswer: "1:1",
        explanation: "Step 1: Find the actual Cost Price (CP) of the mixture. SP = 72, Profit = 20%.\nStep 2: CP = SP / 1.2 = 72 / 1.2 = ₹60/kg.\nStep 3: Use Alligation Rule on CPs: (50) and (70) with mean (60).\nStep 4: Ratio = (70 - 60) : (60 - 50) = 10 : 10 = 1:1."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "A container has milk and water in the ratio 4:1. If 10 litres of water are added, the ratio becomes 2:1. Find the original quantity.",
        options: ["40L", "45L", "50L", "60L"],
        correctAnswer: "50L",
        explanation: "Step 1: Let initial Milk = 4x, Water = x.\nStep 2: After adding 10L water, new ratio = 4x / (x + 10) = 2 / 1.\nStep 3: 4x = 2x + 20 => 2x = 20 => x = 10.\nStep 4: Original quantity = 4x + x = 5x = 5(10) = 50L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "A mixture contains alcohol and water in the ratio 5:3. How much water should be added to 64 litres of mixture to make the ratio 5:7?",
        options: ["24L", "28L", "32L", "36L"],
        correctAnswer: "32L",
        explanation: "Step 1: Total = 64L. Alcohol = (5/8)*64 = 40L, Water = (3/8)*64 = 24L.\nStep 2: Alcohol remains same (40L). New ratio = 5:7.\nStep 3: 5 parts = 40L => 1 part = 8L.\nStep 4: New Water (7 parts) = 7 * 8 = 56L.\nStep 5: Water to be added = 56 - 24 = 32L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Easy",
        questionText: "Two liquids costing ₹80/litre and ₹120/litre are mixed so that the mixture costs ₹95/litre. Find the ratio.",
        options: ["3:2", "4:3", "5:3", "5:4"],
        correctAnswer: "5:3",
        explanation: "Step 1: Use Alligation Rule. Liquid A = 80, Liquid B = 120, Mean = 95.\nStep 2: Ratio = (120 - 95) : (95 - 80).\nStep 3: Ratio = 25 : 15 = 5:3."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "A vessel contains 80 litres of mixture of milk and water in ratio 3:2. How much mixture should be removed and replaced by water to make the ratio 1:1?",
        options: ["10L", "13.33L", "15L", "16L"],
        correctAnswer: "13.33L",
        explanation: "Step 1: Initial M = 48L, W = 32L. Let x litres of mixture be replaced.\nStep 2: Mixture removed has milk = (3/5)x. Remaining milk = 48 - 0.6x.\nStep 3: Final volume is 80L, ratio 1:1, so final Milk = 40L.\nStep 4: 48 - 0.6x = 40 => 0.6x = 8.\nStep 5: x = 8 / 0.6 = 80 / 6 = 13.33L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Easy",
        questionText: "A trader mixes 20 kg sugar costing ₹40/kg with 30 kg sugar costing ₹60/kg. Find the average cost.",
        options: ["₹50/kg", "₹52/kg", "₹54/kg", "₹55/kg"],
        correctAnswer: "₹52/kg",
        explanation: "Step 1: Total Cost = (20 * 40) + (30 * 60) = 800 + 1800 = ₹2600.\nStep 2: Total Quantity = 20 + 30 = 50 kg.\nStep 3: Average Cost = 2600 / 50 = ₹52/kg."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "Three types of rice costing ₹30/kg, ₹40/kg and ₹50/kg are mixed in ratio 2:3:5. Find the average cost of the mixture.",
        options: ["₹41/kg", "₹42/kg", "₹43/kg", "₹44/kg"],
        correctAnswer: "₹43/kg",
        explanation: "Step 1: Let quantities be 2kg, 3kg, and 5kg. Total = 10kg.\nStep 2: Total Cost = (30 * 2) + (40 * 3) + (50 * 5) = 60 + 120 + 250 = ₹430.\nStep 3: Average Cost = 430 / 10 = ₹43/kg."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "A mixture of 90 litres contains milk and water in ratio 7:2. How much water should be added so that milk becomes 70% of the mixture?",
        options: ["8L", "10L", "12L", "15L"],
        correctAnswer: "10L",
        explanation: "Step 1: Initial Milk = (7/9)*90 = 70L. Water = 20L.\nStep 2: Milk remains 70L, but now it represents 70% of the new mixture.\nStep 3: 70% of Total = 70L => Total New Mixture = 100L.\nStep 4: Added water = New Total - Old Total = 100 - 90 = 10L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "A container has 54 litres of milk. 1/3 of it is removed and replaced with water. Find the quantity of milk remaining.",
        options: ["30L", "32L", "36L", "40L"],
        correctAnswer: "36L",
        explanation: "Step 1: 1/3 of 54L is removed, which is 18L. Replaced with water.\nStep 2: Remaining Milk = 54 - 18 = 36L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Easy",
        questionText: "In what ratio should rice costing ₹36/kg be mixed with rice costing ₹54/kg to get a mixture worth ₹45/kg?",
        options: ["1:1", "1:2", "2:1", "3:2"],
        correctAnswer: "1:1",
        explanation: "Step 1: Use Alligation Rule. Type A = 36, Type B = 54, Mean = 45.\nStep 2: Ratio = (54 - 45) : (45 - 36) = 9 : 9.\nStep 3: Ratio is 1:1."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "A vessel contains milk and water in ratio 5:4. How much fraction of the mixture must be removed and replaced with water to make ratio 1:1?",
        options: ["1/5", "1/9", "1/10", "1/12"],
        correctAnswer: "1/10",
        explanation: "Step 1: Let total be 9 units. Milk = 5, Water = 4.\nStep 2: We want Milk = 4.5 and Water = 4.5.\nStep 3: Milk needs to reduce from 5 to 4.5, so 0.5 units of milk must be removed.\nStep 4: Since milk is 5/9 of the mixture, removing 0.5 milk means removing (0.5 / (5/9)) = 0.9 units of mixture.\nStep 5: Fraction of mixture to remove = 0.9 / 9 = 1/10."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "A trader mixes tea worth ₹400/kg and ₹500/kg and sells mixture at an average price of ₹480/kg. Find ratio of mixing.",
        options: ["1:3", "1:4", "1:5", "2:3"],
        correctAnswer: "1:4",
        explanation: "Step 1: Use Alligation Rule. Type A = 400, Type B = 500, Mean = 480.\nStep 2: Ratio = (500 - 480) : (480 - 400) = 20 : 80.\nStep 3: Ratio is 1:4."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Easy",
        questionText: "Two varieties of pulses costing ₹80/kg and ₹120/kg are mixed. If mixture costs ₹96/kg, find ratio.",
        options: ["2:3", "3:2", "4:3", "5:4"],
        correctAnswer: "3:2",
        explanation: "Step 1: Use Alligation Rule. A = 80, B = 120, Mean = 96.\nStep 2: Ratio = (120 - 96) : (96 - 80) = 24 : 16.\nStep 3: Ratio is 3:2."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "A solution contains acid and water in ratio 8:5. 13 litres of water are added and ratio becomes 4:3. Find original quantity.",
        options: ["130L", "156L", "169L", "182L"],
        correctAnswer: "169L",
        explanation: "Step 1: Let initial Acid = 8x, Water = 5x. Total = 13x.\nStep 2: Add 13L water => 8x / (5x + 13) = 4 / 3.\nStep 3: 24x = 20x + 52 => 4x = 52 => x = 13.\nStep 4: Original quantity = 13x = 13 * 13 = 169L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "A vessel contains 100 litres of milk. 20 litres are removed and replaced with water. The process is repeated twice more (total 3 times). Find milk left.",
        options: ["51.2L", "64L", "72.8L", "80L"],
        correctAnswer: "51.2L",
        explanation: "Step 1: Use formula: Final = Initial * (1 - Removed/Total)^n.\nStep 2: Initial = 100, Removed = 20, Total = 100, n = 3.\nStep 3: Final = 100 * (1 - 20/100)^3 = 100 * (0.8)^3.\nStep 4: Final = 100 * 0.512 = 51.2L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Easy",
        questionText: "A trader mixes 25 kg wheat costing ₹30/kg with 35 kg wheat costing ₹42/kg. Find average cost per kg.",
        options: ["₹35/kg", "₹36/kg", "₹37/kg", "₹38/kg"],
        correctAnswer: "₹37/kg",
        explanation: "Step 1: Total Cost = (25 * 30) + (35 * 42) = 750 + 1470 = ₹2220.\nStep 2: Total Weight = 25 + 35 = 60 kg.\nStep 3: Average Cost = 2220 / 60 = ₹37/kg."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "A mixture contains spirit and water in ratio 4:1. 10 litres of mixture is removed and replaced with water. Ratio becomes 3:1. Find original quantity.",
        options: ["120L", "140L", "150L", "160L"],
        correctAnswer: "160L",
        explanation: "Step 1: Let total be V. Initial Spirit = 4/5 of V. When 10L is removed, remaining mixture = V-10.\nStep 2: Remaining Spirit = (4/5)*(V-10).\nStep 3: Final volume is V. Final ratio 3:1 means final Spirit = (3/4)*V.\nStep 4: Since no spirit was added, (4/5)*(V-10) = (3/4)*V.\nStep 5: 16(V-10) = 15V => 16V - 160 = 15V => V = 160L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Easy",
        questionText: "In what ratio should two varieties of tea costing ₹250/kg and ₹350/kg be mixed to obtain a mixture costing ₹310/kg?",
        options: ["2:3", "3:2", "3:4", "4:3"],
        correctAnswer: "2:3",
        explanation: "Step 1: Use Alligation Rule. Type A = 250, Type B = 350, Mean = 310.\nStep 2: Ratio = (350 - 310) : (310 - 250) = 40 : 60.\nStep 3: Ratio is 2:3."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "A vessel contains 120 litres of milk-water mixture in ratio 5:3. How much water should be added to make ratio 5:4?",
        options: ["10L", "12L", "15L", "20L"],
        correctAnswer: "15L",
        explanation: "Step 1: Total = 120L. Milk = (5/8)*120 = 75L, Water = (3/8)*120 = 45L.\nStep 2: We want new ratio 5:4. Milk is unchanged at 75L.\nStep 3: 5 parts = 75L => 1 part = 15L.\nStep 4: New Water (4 parts) = 4 * 15 = 60L.\nStep 5: Water added = 60 - 45 = 15L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "Three liquids costing ₹20, ₹30 and ₹50 per litre are mixed in ratio 1:2:3. Find average price.",
        options: ["₹35/L", "₹36.66/L", "₹38.33/L", "₹40/L"],
        correctAnswer: "₹38.33/L",
        explanation: "Step 1: Total Cost = (1 * 20) + (2 * 30) + (3 * 50) = 20 + 60 + 150 = ₹230.\nStep 2: Total Quantity = 1 + 2 + 3 = 6 Litres.\nStep 3: Average Price = 230 / 6 = 115 / 3 = ₹38.33/L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "A container has 100 litres of milk and water in ratio 9:1. How much water must be added so that ratio becomes 3:1?",
        options: ["10L", "15L", "20L", "25L"],
        correctAnswer: "20L",
        explanation: "Step 1: Initial Milk = 90L, Water = 10L.\nStep 2: Milk remains 90L. New ratio = 3:1.\nStep 3: 3 parts = 90L => 1 part = 30L.\nStep 4: New Water should be 30L. Added water = 30 - 10 = 20L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "A trader mixes two varieties of coffee costing ₹300/kg and ₹450/kg and sells at an average cost of ₹420/kg. Find mixing ratio.",
        options: ["1:3", "1:4", "1:5", "2:3"],
        correctAnswer: "1:4",
        explanation: "Step 1: Use Alligation Rule. Type A = 300, Type B = 450, Mean = 420.\nStep 2: Ratio = (450 - 420) : (420 - 300) = 30 : 120.\nStep 3: Ratio is 1:4."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "A vessel contains 81 litres of mixture. One-third is removed and replaced with water. Process repeated twice. Find quantity of milk left.",
        options: ["16L", "24L", "32L", "36L"],
        correctAnswer: "24L",
        explanation: "Step 1: One-third is removed, which means 2/3 remains.\nStep 2: Repeated twice (total 3 times). Final = Initial * (2/3)^3.\nStep 3: Final = 81 * (8/27).\nStep 4: Final = 3 * 8 = 24L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "Milk and water are in ratio 7:5. 24 litres of water are added and ratio becomes 7:8. Find original quantity.",
        options: ["84L", "96L", "108L", "120L"],
        correctAnswer: "96L",
        explanation: "Step 1: Ratio goes from 7:5 to 7:8. Milk is unchanged. Water parts increase from 5 to 8 (increase of 3 parts).\nStep 2: 3 parts = 24L => 1 part = 8L.\nStep 3: Original total parts = 7 + 5 = 12 parts.\nStep 4: Original quantity = 12 * 8 = 96L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "A solution contains acid and water in ratio 3:2. 20 litres of solution removed and replaced with water. Ratio becomes 2:3. Find original quantity.",
        options: ["40L", "50L", "60L", "80L"],
        correctAnswer: "60L",
        explanation: "Step 1: Let total be V. Initial Acid = (3/5)V. Remove 20L => Acid removed = (3/5)*20 = 12L.\nStep 2: Remaining Acid = (3/5)V - 12.\nStep 3: Final volume is V. Final Acid ratio is 2:3, meaning Acid is (2/5)V.\nStep 4: (3/5)V - 12 = (2/5)V => (1/5)V = 12 => V = 60L."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Medium",
        questionText: "A trader mixes rice costing ₹48/kg and ₹72/kg. The mixture is sold at an average cost of ₹66/kg. Find ratio of mixing.",
        options: ["1:2", "1:3", "2:3", "3:4"],
        correctAnswer: "1:3",
        explanation: "Step 1: Use Alligation Rule. Type A = 48, Type B = 72, Mean = 66.\nStep 2: Ratio = (72 - 66) : (66 - 48) = 6 : 18.\nStep 3: Ratio is 1:3."
    },
    {
        category: "Aptitude", topic: "Mixture & Alligation", difficulty: "Hard",
        questionText: "Three vessels contain milk and water in ratios 4:1, 5:2 and 7:3 respectively. Equal quantities are taken from each vessel and mixed together. Find the final ratio of milk to water.",
        options: ["11:4", "16:5", "31:11", "45:17"],
        correctAnswer: "31:11",
        explanation: "Step 1: Parts in vessels = 5 (4+1), 7 (5+2), and 10 (7+3). LCM of 5, 7, 10 = 70 units.\nStep 2: Let's take 70 units from each. V1 Milk = 70*(4/5) = 56, Water = 14.\nStep 3: V2 Milk = 70*(5/7) = 50, Water = 20.\nStep 4: V3 Milk = 70*(7/10) = 49, Water = 21.\nStep 5: Total Milk = 56+50+49 = 155. Total Water = 14+20+21 = 55.\nStep 6: Ratio = 155:55 = 31:11."
    }
];

const seedBatch8Mixtures = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Mixture & Alligation questions...");
        await Question.deleteMany({ topic: "Mixture & Alligation" }); 
        console.log("🗑️ Purana Mixture & Alligation data safely deleted!");

        console.log(`🚀 Injecting ${batch8Questions.length} Custom Mixture Questions into the database...`);
        
        await Question.insertMany(batch8Questions);
        console.log(`✅ BOOM! Tumhara custom 'Mixture & Alligation' data successfully seed ho gaya!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch8Mixtures();