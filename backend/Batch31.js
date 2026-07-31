const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Mensuration Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch32Questions = [
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Easy",
        questionText: "**Q1.** A cylinder has radius 7 cm and height 20 cm. Find its volume.",
        options: ["2800 cm³", "3080 cm³", "3250 cm³", "3500 cm³"], correctAnswer: "3080 cm³",
        explanation: "Volume of a cylinder = πr²h. V = (22/7) × (7)² × 20 = 22 × 7 × 20 = 3080 cm³."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Easy",
        questionText: "**Q2.** A cylinder has radius 14 cm and height 15 cm. Find its curved surface area (CSA).",
        options: ["1200 cm²", "1320 cm²", "1450 cm²", "1540 cm²"], correctAnswer: "1320 cm²",
        explanation: "CSA = 2πrh. CSA = 2 × (22/7) × 14 × 15 = 44 × 2 × 15 = 1320 cm²."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Medium",
        questionText: "**Q3.** The height of a cylinder is twice its radius. If radius = 8 cm, find its Total Surface Area (TSA).",
        options: ["384π cm²", "400π cm²", "512π cm²", "256π cm²"], correctAnswer: "384π cm²",
        explanation: "Radius r = 8 cm. Height h = 2r = 16 cm. TSA = 2πr(r + h) = 2π(8)(8 + 16) = 16π(24) = 384π cm²."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Easy",
        questionText: "**Q4.** Find the volume of a cylinder having diameter 28 cm and height 25 cm.",
        options: ["12500 cm³", "14400 cm³", "15400 cm³", "16800 cm³"], correctAnswer: "15400 cm³",
        explanation: "Diameter = 28 cm, so r = 14 cm. V = πr²h = (22/7) × (14)² × 25 = 22 × 28 × 25 = 15400 cm³."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Medium",
        questionText: "**Q5.** A cylindrical water tank has radius 10 m and height 8 m. Find its approximate capacity in liters.",
        options: ["1.5M Liters", "2.0M Liters", "2.51M Liters", "3.14M Liters"], correctAnswer: "2.51M Liters",
        explanation: "V = πr²h = (22/7) × 100 × 8 ≈ 2514.28 m³. Since 1 m³ = 1000 Liters, Capacity = 2514.28 × 1000 ≈ 2,514,285 Liters (approx 2.51M)."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Medium",
        questionText: "**Q6.** Radius is increased by 20% while height remains unchanged. Find the percentage increase in volume.",
        options: ["20%", "40%", "44%", "48%"], correctAnswer: "44%",
        explanation: "Volume V = πr²h. Since V is directly proportional to r², a 20% increase in r (multiplier 1.2) results in 1.2² = 1.44. The volume increases by 44%."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Medium",
        questionText: "**Q7 (Company Level).** A cylinder has volume 1232 cm³ and radius 7 cm. Find its height.",
        options: ["6 cm", "8 cm", "10 cm", "12 cm"], correctAnswer: "8 cm",
        explanation: "V = πr²h. 1232 = (22/7) × 49 × h. 1232 = 154 × h. h = 1232 / 154 = 8 cm."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Easy",
        questionText: "**Q8.** The ratio of radii of two cylinders is 3:5 and their heights are equal. Find the ratio of their volumes.",
        options: ["3:5", "6:10", "9:25", "27:125"], correctAnswer: "9:25",
        explanation: "Since heights are equal, V1 / V2 = (r1 / r2)² = (3/5)² = 9:25."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Easy",
        questionText: "**Q9.** The ratio of heights of two cylinders is 4:7 and their radii are equal. Find the ratio of their volumes.",
        options: ["4:7", "16:49", "2:3.5", "64:343"], correctAnswer: "4:7",
        explanation: "Since radii are equal, Volume is directly proportional to height. Ratio = h1 / h2 = 4:7."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Medium",
        questionText: "**Q10.** A cylinder has CSA = 880 cm² and radius = 7 cm. Find its height.",
        options: ["15 cm", "18 cm", "20 cm", "25 cm"], correctAnswer: "20 cm",
        explanation: "CSA = 2πrh. 880 = 2 × (22/7) × 7 × h. 880 = 44h. h = 880 / 44 = 20 cm."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q11.** The TSA of a cylinder is 968 cm² and radius is 7 cm. Find its height.",
        options: ["10 cm", "12 cm", "15 cm", "18 cm"], correctAnswer: "15 cm",
        explanation: "TSA = 2πr(r + h). 968 = 2 × (22/7) × 7 × (7 + h). 968 = 44(7 + h). 7 + h = 22. h = 15 cm."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Medium",
        questionText: "**Q12.** Find the radius of a cylinder whose volume is 1386 cm³ and height is 9 cm.",
        options: ["5 cm", "7 cm", "9 cm", "14 cm"], correctAnswer: "7 cm",
        explanation: "V = πr²h. 1386 = (22/7) × r² × 9. 1386 = (198/7) × r². r² = 1386 × 7 / 198 = 49. r = 7 cm."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Medium",
        questionText: "**Q13 (Logic Based).** A solid cylinder is melted and recast into 3 identical cylinders. Find the ratio of new height to original height if the radius remains the same.",
        options: ["1:1", "1:3", "3:1", "1:9"], correctAnswer: "1:3",
        explanation: "Original Volume = 3 × New Volume. πr²H = 3 × πr²h. H = 3h. Ratio of new height (h) to original height (H) is 1:3."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q14.** A cylinder of radius 14 cm and height 20 cm is melted into spheres of radius 7 cm. How many complete spheres are formed?",
        options: ["6", "8", "10", "12"], correctAnswer: "8",
        explanation: "Volume of cylinder = π(14)²(20) = 3920π. Volume of one sphere = (4/3)π(7)³ = 1372π/3. Number of spheres = 3920π / (1372π/3) = 11760 / 1372 = 8.57. So, 8 complete spheres are formed."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q15.** A cylindrical tank is filled at the rate of 550 liters/minute. Radius = 7 m, height = 10 m. Find the time required to fill it.",
        options: ["2000 mins", "2400 mins", "2800 mins", "3200 mins"], correctAnswer: "2800 mins",
        explanation: "Volume = (22/7) × 49 × 10 = 1540 m³. Capacity in liters = 1540 × 1000 = 1,540,000 L. Time = 1540000 / 550 = 2800 minutes."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q16.** Height decreases by 10% and radius increases by 10%. Find percentage change in volume.",
        options: ["1.1% Increase", "8.9% Increase", "10% Increase", "11.1% Decrease"], correctAnswer: "8.9% Increase",
        explanation: "V ∝ r²h. New V factor = (1.1)² × (0.9) = 1.21 × 0.9 = 1.089. This means an 8.9% increase."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q17.** Radius increases by 50% while height decreases by 20%. Find percentage change in volume.",
        options: ["50% Increase", "60% Increase", "80% Increase", "100% Increase"], correctAnswer: "80% Increase",
        explanation: "New V factor = (1.5)² × (0.8) = 2.25 × 0.8 = 1.80. This represents an 80% increase in volume."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Medium",
        questionText: "**Q18.** Find the ratio of TSA to CSA of a cylinder having radius 10 cm and height 40 cm.",
        options: ["3:2", "4:3", "5:4", "6:5"], correctAnswer: "5:4",
        explanation: "Ratio = TSA / CSA = 2πr(r + h) / 2πrh = (r + h) / h = (10 + 40) / 40 = 50 / 40 = 5:4."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q19 (Advanced Mensuration).** The volume of a cylinder is 15400 cm³ and height is 50 cm. Find its radius.",
        options: ["7 cm", "7√2 cm", "14 cm", "14√2 cm"], correctAnswer: "7√2 cm",
        explanation: "V = πr²h. 15400 = (22/7) × r² × 50. 308 = (22/7) × r². r² = (308 × 7) / 22 = 14 × 7 = 98. r = √98 = 7√2 cm."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q20.** A cylindrical pipe has outer radius 8 cm, inner radius 6 cm and length 20 cm. Find the volume of material used.",
        options: ["1640 cm³", "1760 cm³", "1820 cm³", "1900 cm³"], correctAnswer: "1760 cm³",
        explanation: "Volume = πh(R² - r²) = (22/7) × 20 × (8² - 6²) = (22/7) × 20 × (64 - 36) = (22/7) × 20 × 28 = 22 × 20 × 4 = 1760 cm³."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Medium",
        questionText: "**Q21.** A cylinder and a cone have the same base radius and same height. Find the ratio of their volumes.",
        options: ["1:3", "2:3", "3:1", "3:2"], correctAnswer: "3:1",
        explanation: "Volume of Cylinder = πr²h. Volume of Cone = (1/3)πr²h. Ratio = 1 / (1/3) = 3:1."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q22.** A cylinder and sphere have equal radii. The height of the cylinder equals the diameter of the sphere. Find the ratio of their volumes.",
        options: ["3:2", "2:3", "4:3", "3:4"], correctAnswer: "3:2",
        explanation: "Height of cylinder h = 2r. V_cyl = πr²(2r) = 2πr³. V_sphere = (4/3)πr³. Ratio = 2 / (4/3) = 6/4 = 3:2."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q23.** The volume of a cylinder is equal to the volume of a cube of side 14 cm. Radius of the cylinder = 7 cm. Find its approximate height.",
        options: ["15.5 cm", "16.8 cm", "17.8 cm", "18.5 cm"], correctAnswer: "17.8 cm",
        explanation: "Volume of cube = 14³ = 2744. Volume of cylinder = (22/7) × 49 × h = 154h. 154h = 2744. h = 2744 / 154 ≈ 17.81 cm."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Easy",
        questionText: "**Q24.** A cylindrical tank contains water up to 80% of its capacity. If total capacity is 22000 liters, find the amount of water present.",
        options: ["15000 L", "16400 L", "17600 L", "18000 L"], correctAnswer: "17600 L",
        explanation: "Water present = 80% of 22000 = 0.8 × 22000 = 17600 Liters."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q25 (Ultra Tough).** A cylinder's radius is increased by 25% and height by 20%. Find the percentage increase in volume.",
        options: ["75.5%", "80%", "87.5%", "95%"], correctAnswer: "87.5%",
        explanation: "New V factor = (1.25)² × 1.2 = 1.5625 × 1.2 = 1.875. This means the volume increased by 87.5%."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q26 (Ultra Tough).** A cylinder's TSA is 1320 cm² and CSA is 880 cm². Find its radius.",
        options: ["√70 cm", "8 cm", "√80 cm", "10 cm"], correctAnswer: "√70 cm",
        explanation: "TSA = CSA + 2πr². 1320 = 880 + 2πr². 2πr² = 440. πr² = 220. (22/7)r² = 220. r² = 70, so r = √70 cm."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q27 (Ultra Tough).** A cylindrical tank of radius 3.5 m and height 8 m is filled by a pipe delivering 22 liters/sec. Find filling time in hours.",
        options: ["~2.5 hrs", "~3.9 hrs", "~4.5 hrs", "~5.2 hrs"], correctAnswer: "~3.9 hrs",
        explanation: "Volume = (22/7) × (3.5)² × 8 = 308 m³. Capacity = 308,000 Liters. Time = 308000 / 22 = 14000 sec. In hours: 14000 / 3600 ≈ 3.88 hours."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q28 (Ultra Tough).** A solid cylinder of radius 10 cm and height 21 cm is melted into smaller cylinders of radius 2 cm and height 3 cm. How many small cylinders are formed?",
        options: ["125", "150", "175", "200"], correctAnswer: "175",
        explanation: "Number = Volume of big / Volume of small. V_big = π(10)²(21) = 2100π. V_small = π(2)²(3) = 12π. 2100π / 12π = 175."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q29 (Ultra Tough).** A cylindrical vessel of radius 14 cm is partially filled. A solid iron sphere of radius 7 cm is immersed completely. By how much will the water level rise?",
        options: ["1.5 cm", "2.33 cm", "3.0 cm", "4.66 cm"], correctAnswer: "2.33 cm",
        explanation: "Volume of sphere = Volume of displaced water. (4/3)π(7)³ = π(14)² × rise. 1372/3 = 196 × rise. rise = 1372 / (3 × 196) = 7/3 ≈ 2.33 cm."
    },
    {
        category: "Aptitude", topic: "Mensuration - Cylinders", difficulty: "Hard",
        questionText: "**Q30 (Deloitte Pattern).** Two cylinders have equal volumes. Cyl A has r=14, h=20. Cyl B has r=10. Find the TSA of Cylinder B.",
        options: ["~2800 cm²", "~3092 cm²", "~3400 cm²", "~3850 cm²"], correctAnswer: "~3092 cm²",
        explanation: "V_A = π(14)²(20) = 3920π. V_B = π(10)²(h_B) = 100π(h_B). 100π(h_B) = 3920π -> h_B = 39.2. TSA_B = 2π(10)(10 + 39.2) = 20π(49.2) = 984π = 984 × (22/7) ≈ 3092.5 cm²."
    }
];

const seedBatch32Cylinders = async () => {
    try {
        console.log("🧹 Clearing old Mensuration (Cylinders) records...");
        await Question.deleteMany({ topic: "Mensuration - Cylinders" }); 
        
        console.log(`🚀 Injecting ${batch32Questions.length} Formatted Questions...`);
        await Question.insertMany(batch32Questions);
        
        console.log(`✅ SUCCESS! All 30 Mensuration Questions Seeded in 'Aptitude' Category.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch32Cylinders();