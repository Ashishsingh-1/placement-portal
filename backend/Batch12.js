const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Complete Time, Speed & Distance Seeding'))
  .catch(err => console.log(err));

const batch11FinalQuestions = [
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Easy",
        questionText: "A man covers a certain distance at 30 km/h and returns over the same route at 20 km/h. If the total journey takes 10 hours, find the distance one way.",
        options: ["100 km", "120 km", "140 km", "150 km"],
        correctAnswer: "120 km",
        explanation: "Step 1: Let the distance one way be D. Time = Distance / Speed.\nStep 2: Total Time = (D/30) + (D/20) = 10.\nStep 3: LCM of 30 and 20 is 60. So, (2D + 3D) / 60 = 10.\nStep 4: 5D = 600 => D = 120 km."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Medium",
        questionText: "A train leaves Delhi for Jaipur at 60 km/h. Another train leaves Jaipur for Delhi at 90 km/h at the same time. If the distance is 300 km, find how far from Delhi they meet.",
        options: ["100 km", "120 km", "150 km", "180 km"],
        correctAnswer: "120 km",
        explanation: "Step 1: Since they travel in opposite directions, Relative Speed = 60 + 90 = 150 km/h.\nStep 2: Time taken to meet = Total Distance / Relative Speed = 300 / 150 = 2 hours.\nStep 3: Distance from Delhi = Speed of Delhi train * Time = 60 * 2 = 120 km."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Medium",
        questionText: "A car covers half the distance at 40 km/h, one-third of the remaining distance at 60 km/h, and the rest at 80 km/h. Find the average speed.",
        options: ["45.5 km/h", "51.42 km/h", "55.33 km/h", "60 km/h"],
        correctAnswer: "51.42 km/h",
        explanation: "Step 1: Let total distance be D. Part 1 = D/2. Remaining = D/2. Part 2 = 1/3 of D/2 = D/6. Part 3 = D/2 - D/6 = D/3.\nStep 2: Total Time = (D/2)/40 + (D/6)/60 + (D/3)/80 = D/80 + D/360 + D/240.\nStep 3: LCM(80, 360, 240) = 720. Total Time = 9D/720 + 2D/720 + 3D/720 = 14D/720.\nStep 4: Average Speed = D / (14D/720) = 720/14 = 51.42 km/h."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Easy",
        questionText: "A person walks from A to B at 5 km/h and returns at 3 km/h. If the total time taken is 16 hours, find the distance AB.",
        options: ["20 km", "25 km", "30 km", "40 km"],
        correctAnswer: "30 km",
        explanation: "Step 1: Let distance be D. (D/5) + (D/3) = 16.\nStep 2: (3D + 5D) / 15 = 16 => 8D / 15 = 16.\nStep 3: 8D = 240 => D = 30 km."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A train crosses a platform in 36 seconds and a man standing on the platform in 24 seconds. If the platform is 240 m long, find the train's length.",
        options: ["240 m", "360 m", "480 m", "500 m"],
        correctAnswer: "480 m",
        explanation: "Step 1: Let train length be L and speed be S.\nStep 2: When crossing a man, S = L / 24.\nStep 3: When crossing platform, S = (L + 240) / 36.\nStep 4: L / 24 = (L + 240) / 36 => 36L = 24L + 5760 => 12L = 5760 => L = 480 m."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "A car travels the first 120 km at 40 km/h and the next 180 km at 60 km/h. What should be the speed for the last 300 km so that the overall average speed becomes exactly 60 km/h?",
        options: ["60 km/h", "70 km/h", "75 km/h", "80 km/h"],
        correctAnswer: "75 km/h",
        explanation: "Step 1: Total Distance = 120 + 180 + 300 = 600 km.\nStep 2: Desired Average Speed = 60 km/h. Total allowed time = 600 / 60 = 10 hours.\nStep 3: Time taken so far = (120/40) + (180/60) = 3 + 3 = 6 hours.\nStep 4: Remaining time for last 300 km = 10 - 6 = 4 hours.\nStep 5: Required Speed = 300 / 4 = 75 km/h."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "Two cyclists start towards each other from points 180 km apart. One travels at 12 km/h and the other at 18 km/h. A bird flies continuously between them at 30 km/h until they meet. Find the total distance flown by the bird.",
        options: ["120 km", "150 km", "180 km", "200 km"],
        correctAnswer: "180 km",
        explanation: "Step 1: Time taken for cyclists to meet = Total Distance / Relative Speed = 180 / (12 + 18) = 180 / 30 = 6 hours.\nStep 2: The bird flies non-stop for these 6 hours.\nStep 3: Distance flown by bird = Bird's Speed * Total Time = 30 * 6 = 180 km."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Medium",
        questionText: "A man starts 30 minutes late and drives at 72 km/h instead of 60 km/h to reach his destination on time. Find the distance travelled.",
        options: ["150 km", "180 km", "210 km", "240 km"],
        correctAnswer: "180 km",
        explanation: "Step 1: Let the normal time be T hours at 60 km/h. Distance D = 60T.\nStep 2: New Speed = 72 km/h. New Time = T - 0.5 hours. D = 72(T - 0.5).\nStep 3: 60T = 72T - 36 => 12T = 36 => T = 3 hours.\nStep 4: Distance = 60 * 3 = 180 km."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "Two trains of equal length travel in opposite directions at 54 km/h and 72 km/h. They cross each other in 12 seconds. Find the length of each train.",
        options: ["180 m", "200 m", "210 m", "240 m"],
        correctAnswer: "210 m",
        explanation: "Step 1: Relative Speed = 54 + 72 = 126 km/h. Convert to m/s: 126 * (5/18) = 35 m/s.\nStep 2: Total Distance Covered = Relative Speed * Time = 35 * 12 = 420 m.\nStep 3: Since both trains are of equal length (L), L + L = 420 => 2L = 420 => L = 210 m."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "A person covers a certain distance at a certain speed in 8 hours. If he increases his speed by 10 km/h, he reaches 1.6 hours earlier. Find the original speed.",
        options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
        correctAnswer: "40 km/h",
        explanation: "Step 1: Let original speed be S. Distance D = 8S.\nStep 2: New Speed = S + 10. New Time = 8 - 1.6 = 6.4 hours.\nStep 3: D = 6.4(S + 10).\nStep 4: 8S = 6.4S + 64 => 1.6S = 64 => S = 64 / 1.6 = 40 km/h."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "A train running at 72 km/h crosses a pole in 18 seconds. How long will it take to cross another train of half its length moving in the opposite direction at 90 km/h?",
        options: ["10 seconds", "12 seconds", "15 seconds", "18 seconds"],
        correctAnswer: "12 seconds",
        explanation: "Step 1: Speed of T1 = 72 km/h = 20 m/s. Length of T1 = 20 * 18 = 360 m.\nStep 2: Length of T2 = Half of T1 = 180 m. Total Distance to cross = 360 + 180 = 540 m.\nStep 3: Relative Speed = 72 + 90 = 162 km/h = 162 * (5/18) = 45 m/s.\nStep 4: Time taken = 540 / 45 = 12 seconds."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Easy",
        questionText: "A person travels from A to B at 40 km/h and returns at 60 km/h. Find the average speed for the complete round trip.",
        options: ["48 km/h", "50 km/h", "52 km/h", "54 km/h"],
        correctAnswer: "48 km/h",
        explanation: "Step 1: If distances are equal, Average Speed = (2 * S1 * S2) / (S1 + S2).\nStep 2: Average Speed = (2 * 40 * 60) / (40 + 60) = 4800 / 100 = 48 km/h."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A train running at 90 km/h crosses a platform in 30 seconds and a pole in 18 seconds. Find the platform's length.",
        options: ["200 m", "250 m", "300 m", "350 m"],
        correctAnswer: "300 m",
        explanation: "Step 1: Speed = 90 km/h = 90 * (5/18) = 25 m/s.\nStep 2: Train length = Speed * Time to cross pole = 25 * 18 = 450 m.\nStep 3: Platform + Train = Speed * Time to cross platform = 25 * 30 = 750 m.\nStep 4: Platform length = 750 - 450 = 300 m."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Easy",
        questionText: "A man walks 3 km North, then 4 km East. Find the ratio of his displacement (shortest distance) to the actual distance travelled.",
        options: ["5:7", "7:5", "3:4", "4:5"],
        correctAnswer: "5:7",
        explanation: "Step 1: Displacement is the hypotenuse of the right triangle = √(3² + 4²) = √(9 + 16) = √25 = 5 km.\nStep 2: Actual distance travelled = 3 + 4 = 7 km.\nStep 3: Ratio = 5 : 7."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Easy",
        questionText: "A train is 300 m long and moving at 72 km/h. How long will it take to completely cross a bridge that is 500 m long?",
        options: ["30s", "36s", "40s", "45s"],
        correctAnswer: "40s",
        explanation: "Step 1: Speed = 72 * (5/18) = 20 m/s.\nStep 2: Total Distance to cover = Train length + Bridge length = 300 + 500 = 800 m.\nStep 3: Time = 800 / 20 = 40 seconds."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "Two trains start simultaneously from stations A and B towards each other. After meeting, one takes 9 hours to reach B while the other takes 16 hours to reach A. Find the ratio of their speeds.",
        options: ["3:4", "4:3", "9:16", "16:9"],
        correctAnswer: "4:3",
        explanation: "Step 1: Let speeds be S1 and S2, and times taken after meeting be T1 and T2.\nStep 2: The standard formula is S1 / S2 = √(T2 / T1).\nStep 3: S1 / S2 = √(16 / 9) = 4 / 3. Ratio is 4:3."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Medium",
        questionText: "A car covers a journey in three stages of equal distances: First stage at 30 km/h, Second stage at 45 km/h, Third stage at 90 km/h. Find the average speed for the whole journey.",
        options: ["45 km/h", "50 km/h", "55 km/h", "60 km/h"],
        correctAnswer: "45 km/h",
        explanation: "Step 1: Let the distance of each stage be LCM(30, 45, 90) = 90 km. Total Distance = 270 km.\nStep 2: Time 1 = 90/30 = 3 hrs. Time 2 = 90/45 = 2 hrs. Time 3 = 90/90 = 1 hr.\nStep 3: Total Time = 3 + 2 + 1 = 6 hours.\nStep 4: Average Speed = 270 / 6 = 45 km/h."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "A train crosses a platform in 40 seconds and a pole in 25 seconds. If its speed is 54 km/h, find the length of the train and the platform respectively.",
        options: ["Train=300m, Plat=200m", "Train=375m, Plat=225m", "Train=400m, Plat=250m", "Train=350m, Plat=250m"],
        correctAnswer: "Train=375m, Plat=225m",
        explanation: "Step 1: Speed = 54 * (5/18) = 15 m/s.\nStep 2: Train length = Speed * Time (pole) = 15 * 25 = 375 m.\nStep 3: Time taken for the platform alone = 40 - 25 = 15 seconds.\nStep 4: Platform length = 15 * 15 = 225 m."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Medium",
        questionText: "Two men start walking towards each other from two towns 84 km apart. One walks at 5 km/h and the other at 7 km/h. A dog runs continuously between them at 12 km/h. Find the total distance covered by the dog before the men meet.",
        options: ["72 km", "80 km", "84 km", "96 km"],
        correctAnswer: "84 km",
        explanation: "Step 1: Relative speed of men = 5 + 7 = 12 km/h.\nStep 2: Time taken to meet = 84 / 12 = 7 hours.\nStep 3: The dog runs non-stop for these 7 hours at 12 km/h.\nStep 4: Distance covered by dog = 12 * 7 = 84 km."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "A person travels from A to B. First 30% of the distance at 30 km/h, next 40% at 40 km/h, and the remaining 30% distance at 60 km/h. If the total journey takes 10 hours, find the total distance.",
        options: ["300 km", "360 km", "400 km", "450 km"],
        correctAnswer: "400 km",
        explanation: "Step 1: Let the total distance be D. Part 1 = 0.3D, Part 2 = 0.4D, Part 3 = 0.3D.\nStep 2: Time = (0.3D/30) + (0.4D/40) + (0.3D/60) = 10.\nStep 3: (D/100) + (D/100) + (0.5D/100) = 10.\nStep 4: 2.5D / 100 = 10 => 2.5D = 1000 => D = 400 km."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "A person travels from A to B at 40 km/h and returns at 60 km/h. If he had traveled the entire round trip at the arithmetic mean of his speeds (50 km/h), he would have saved 1 hour. Find the distance between A and B.",
        options: ["400 km", "500 km", "600 km", "800 km"],
        correctAnswer: "600 km",
        explanation: "Step 1: Arithmetic mean speed = (40 + 60) / 2 = 50 km/h.\nStep 2: Actual Time = (D/40) + (D/60) = 5D/120 = D/24.\nStep 3: Time at 50 km/h = 2D/50 = D/25.\nStep 4: D/24 - D/25 = 1 => (25D - 24D)/600 = 1 => D = 600 km."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "A train crosses a 300m long platform in 45 seconds and another platform twice as long (600m) in 75 seconds. Find the length of the train.",
        options: ["100 m", "120 m", "150 m", "180 m"],
        correctAnswer: "150 m",
        explanation: "Step 1: Let train length be L and speed be V.\nStep 2: L + 300 = 45V and L + 600 = 75V.\nStep 3: Subtracting equations gives: 300 = 30V => V = 10 m/s.\nStep 4: L + 300 = 45(10) => L + 300 = 450 => L = 150 m."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "Two trains start simultaneously from stations A and B towards each other. They meet after 6 hours. After meeting, the first train takes 9 hours to reach B. Find the time taken by the second train to reach A after meeting.",
        options: ["4 hours", "5 hours", "6 hours", "8 hours"],
        correctAnswer: "4 hours",
        explanation: "Step 1: Meeting time formula: T = √(t1 * t2), where t1 and t2 are times taken after meeting.\nStep 2: 6 = √(9 * t2).\nStep 3: Squaring both sides: 36 = 9 * t2.\nStep 4: t2 = 36 / 9 = 4 hours."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "A car covers 1/3 of a journey at 20 km/h, 1/2 of the journey at 30 km/h, and the remaining distance at 60 km/h. The total journey takes 13 hours. Find the total distance.",
        options: ["300 km", "360 km", "400 km", "420 km"],
        correctAnswer: "360 km",
        explanation: "Step 1: Remaining fraction = 1 - (1/3 + 1/2) = 1 - 5/6 = 1/6.\nStep 2: Let total distance be D. Time = (D/3)/20 + (D/2)/30 + (D/6)/60 = 13.\nStep 3: (D/60) + (D/60) + (D/360) = 13.\nStep 4: (6D + 6D + D) / 360 = 13 => 13D / 360 = 13 => D = 360 km."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Medium",
        questionText: "A man walks to his office at 4 km/h and reaches 15 minutes late. If he walks at 5 km/h, he reaches 15 minutes early. Find the distance to the office.",
        options: ["8 km", "10 km", "12 km", "15 km"],
        correctAnswer: "10 km",
        explanation: "Step 1: Time difference = 15 min late + 15 min early = 30 minutes = 1/2 hour.\nStep 2: (D/4) - (D/5) = 1/2.\nStep 3: (5D - 4D) / 20 = 1/2 => D / 20 = 1/2.\nStep 4: D = 10 km."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "Two trains of lengths 240 m and 360 m travel in the same direction at 54 km/h and 72 km/h respectively. Find the time taken by the faster train to completely overtake the slower train.",
        options: ["90s", "100s", "120s", "150s"],
        correctAnswer: "120s",
        explanation: "Step 1: Relative Speed = 72 - 54 = 18 km/h = 18 * (5/18) = 5 m/s.\nStep 2: Total Distance to cross = L1 + L2 = 240 + 360 = 600 m.\nStep 3: Time = 600 / 5 = 120 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "Train A crosses a pole in 20 seconds. Train B is half as long as A and moves at 54 km/h. If they travel in opposite directions, they cross each other in 12 seconds. Find the speed of Train A.",
        options: ["36 km/h", "45 km/h", "54 km/h", "72 km/h"],
        correctAnswer: "36 km/h",
        explanation: "Step 1: Let Train A's speed be V m/s. Length of A = 20V. Length of B = 10V.\nStep 2: Speed of B = 54 km/h = 15 m/s. Opp direction crossing time = 12s.\nStep 3: Total Distance / Relative Speed = Time => (20V + 10V) / (V + 15) = 12.\nStep 4: 30V = 12V + 180 => 18V = 180 => V = 10 m/s.\nStep 5: 10 m/s = 36 km/h."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Medium",
        questionText: "A person covers a journey in three equal TIME intervals at speeds of 30 km/h, 45 km/h, and 60 km/h respectively. Find the average speed for the whole journey.",
        options: ["40 km/h", "42.5 km/h", "45 km/h", "48 km/h"],
        correctAnswer: "45 km/h",
        explanation: "Step 1: Trap Alert! When TIME intervals are equal (not distances), the average speed is just the simple arithmetic mean of the speeds.\nStep 2: Average Speed = (30 + 45 + 60) / 3.\nStep 3: 135 / 3 = 45 km/h."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "A cyclist leaves A for B at 15 km/h. Two hours later another cyclist leaves B for A at 20 km/h. If the distance between A and B is 170 km, find when they meet from the start of the first cyclist.",
        options: ["4 hours", "5 hours", "6 hours", "7 hours"],
        correctAnswer: "6 hours",
        explanation: "Step 1: In 2 hours, 1st cyclist travels 15 * 2 = 30 km. Remaining distance = 170 - 30 = 140 km.\nStep 2: Now both are moving. Relative speed = 15 + 20 = 35 km/h.\nStep 3: Time taken to meet from this point = 140 / 35 = 4 hours.\nStep 4: Total time from start of first cyclist = 2 + 4 = 6 hours."
    },
    {
        category: "Aptitude", topic: "Time & Distance", difficulty: "Hard",
        questionText: "A person travels from A to B (360 km) and back. The onward journey is split in equal distance: first half at 40 km/h, second at 60 km/h. The return journey is split in equal distance: first half at 80 km/h, second at 120 km/h. Find average speed for round trip.",
        options: ["Time=10.5h, Avg=60km/h", "Time=11.25h, Avg=64km/h", "Time=12h, Avg=60km/h", "Time=11.25h, Avg=60km/h"],
        correctAnswer: "Time=11.25h, Avg=64km/h",
        explanation: "Step 1: Onward 360km: 180km at 40 km/h (4.5 hrs) + 180km at 60 km/h (3 hrs) = 7.5 hrs.\nStep 2: Return 360km: 180km at 80 km/h (2.25 hrs) + 180km at 120 km/h (1.5 hrs) = 3.75 hrs.\nStep 3: Total Time = 7.5 + 3.75 = 11.25 hours.\nStep 4: Total Distance = 720 km. Avg Speed = 720 / 11.25 = 64 km/h."
    }
];

const seedBatch11TSD = async () => {
    try {
        console.log("🧹 ALERT: Deleting old TSD questions...");
        await Question.deleteMany({ topic: { $in: ["Time & Distance", "Problems on Trains"] } }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch11FinalQuestions.length} Time, Speed & Distance Questions...`);
        
        await Question.insertMany(batch11FinalQuestions);
        console.log(`✅ BOOM! Tumhare pure 30 questions successfully seed ho gaye hain!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch11TSD();