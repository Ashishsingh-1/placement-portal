const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Problems on Trains Seeding'))
  .catch(err => console.log(err));

const batch12Questions = [
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Easy",
        questionText: "A train 180 m long crosses a pole in 9 seconds. Find its speed in km/h.",
        options: ["54 km/h", "60 km/h", "72 km/h", "90 km/h"],
        correctAnswer: "72 km/h",
        explanation: "Step 1: Speed = Distance / Time = 180 / 9 = 20 m/s.\nStep 2: Convert to km/h by multiplying by (18/5).\nStep 3: 20 * (18/5) = 72 km/h."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A train crosses a platform 240 m long in 24 seconds and a pole in 12 seconds. Find the length of the train.",
        options: ["180 m", "200 m", "240 m", "300 m"],
        correctAnswer: "240 m",
        explanation: "Step 1: Time to cross platform alone = 24 - 12 = 12 seconds.\nStep 2: Speed of train = Length of Platform / Time = 240 / 12 = 20 m/s.\nStep 3: Length of train = Speed * Time to cross pole = 20 * 12 = 240 m."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "Two trains of lengths 340 m and 360 m run in opposite directions at 54 km/h and 72 km/h. Find the time taken to cross each other completely.",
        options: ["16 seconds", "18 seconds", "20 seconds", "24 seconds"],
        correctAnswer: "20 seconds",
        explanation: "Step 1: Relative Speed = 54 + 72 = 126 km/h = 126 * (5/18) = 35 m/s.\nStep 2: Total Distance = L1 + L2 = 340 + 360 = 700 m.\nStep 3: Time = 700 / 35 = 20 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "Two trains of equal lengths running in opposite directions at 60 km/h and 90 km/h cross each other in 12 seconds. Find the length of each train.",
        options: ["200 m", "250 m", "300 m", "500 m"],
        correctAnswer: "250 m",
        explanation: "Step 1: Relative Speed = 60 + 90 = 150 km/h = 150 * (5/18) = 125/3 m/s.\nStep 2: Total Distance (2L) = Speed * Time = (125/3) * 12 = 500 m.\nStep 3: Length of each train (L) = 500 / 2 = 250 m."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "A train crosses a man walking in the same direction at 6 km/h in 18 seconds and a man walking in the opposite direction at 6 km/h in 12 seconds. Find the speed of the train.",
        options: ["24 km/h", "30 km/h", "36 km/h", "45 km/h"],
        correctAnswer: "30 km/h",
        explanation: "Step 1: Let train speed be V km/h. (V - 6) * 18 = (V + 6) * 12 (since Length is constant).\nStep 2: 18V - 108 = 12V + 72 => 6V = 180.\nStep 3: V = 30 km/h."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A train crosses a platform in 30 seconds and a pole in 18 seconds. If the speed of the train is 72 km/h, find the platform length.",
        options: ["200 m", "240 m", "300 m", "360 m"],
        correctAnswer: "240 m",
        explanation: "Step 1: Speed = 72 * (5/18) = 20 m/s.\nStep 2: Time taken to cross platform alone = 30 - 18 = 12 seconds.\nStep 3: Platform Length = 20 * 12 = 240 m."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Easy",
        questionText: "A train 300 m long moving at 72 km/h crosses a bridge 500 m long. Find the time taken.",
        options: ["30s", "36s", "40s", "45s"],
        correctAnswer: "40s",
        explanation: "Step 1: Speed = 72 * (5/18) = 20 m/s.\nStep 2: Total Distance = 300 + 500 = 800 m.\nStep 3: Time = 800 / 20 = 40 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "Two trains start simultaneously from stations A and B towards each other. They meet after 5 hours. After meeting, one takes 20 hours to reach B. Find the time taken by the other train to reach A.",
        options: ["1 hour 15 mins", "1 hour 30 mins", "2 hours", "2 hours 15 mins"],
        correctAnswer: "1 hour 15 mins",
        explanation: "Step 1: Meeting time formula: T = √(t1 * t2).\nStep 2: 5 = √(20 * t2) => 25 = 20 * t2.\nStep 3: t2 = 25 / 20 = 1.25 hours.\nStep 4: 1.25 hours = 1 hour 15 minutes."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A train moving at 90 km/h crosses another train moving at 54 km/h in the opposite direction in 15 seconds. If their lengths are equal, find the length of each train.",
        options: ["250 m", "300 m", "400 m", "600 m"],
        correctAnswer: "300 m",
        explanation: "Step 1: Rel Speed = 90 + 54 = 144 km/h = 40 m/s.\nStep 2: Total Distance (2L) = 40 * 15 = 600 m.\nStep 3: Length of each train = 600 / 2 = 300 m."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "A train crosses a platform 200 m long in 20 seconds and another platform 350 m long in 26 seconds. Find the length and speed of the train.",
        options: ["L=300m, S=90km/h", "L=250m, S=72km/h", "L=350m, S=108km/h", "L=200m, S=90km/h"],
        correctAnswer: "L=300m, S=90km/h",
        explanation: "Step 1: Difference in platform lengths = 350 - 200 = 150 m. Difference in time = 26 - 20 = 6 s.\nStep 2: Speed = 150 / 6 = 25 m/s = 90 km/h.\nStep 3: Length = (25 * 20) - 200 = 500 - 200 = 300 m."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "Two trains of lengths 250 m and 350 m move in the same direction at 90 km/h and 72 km/h respectively. Find the time required for the faster train to overtake the slower train.",
        options: ["100s", "120s", "140s", "150s"],
        correctAnswer: "120s",
        explanation: "Step 1: Relative Speed = 90 - 72 = 18 km/h = 5 m/s.\nStep 2: Total Distance = 250 + 350 = 600 m.\nStep 3: Time = 600 / 5 = 120 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A train crosses a pole in 16 seconds and a platform in 40 seconds. If the platform length is 480 m, find the speed of the train.",
        options: ["54 km/h", "72 km/h", "90 km/h", "108 km/h"],
        correctAnswer: "72 km/h",
        explanation: "Step 1: Time for platform alone = 40 - 16 = 24 seconds.\nStep 2: Speed = 480 / 24 = 20 m/s.\nStep 3: 20 m/s = 72 km/h."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Easy",
        questionText: "A train 400 m long moving at 108 km/h enters a tunnel 800 m long. Find the time required to completely emerge from the tunnel.",
        options: ["30s", "36s", "40s", "45s"],
        correctAnswer: "40s",
        explanation: "Step 1: Speed = 108 * (5/18) = 30 m/s.\nStep 2: Total Distance = 400 + 800 = 1200 m.\nStep 3: Time = 1200 / 30 = 40 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "Two trains moving in opposite directions cross a man standing between them in 12 seconds and 9 seconds respectively. If their speeds are 54 km/h and 72 km/h, verify their lengths.",
        options: ["150m each", "180m each", "200m each", "240m each"],
        correctAnswer: "180m each",
        explanation: "Step 1: Speed 1 = 54 km/h = 15 m/s. Length 1 = 15 * 12 = 180 m.\nStep 2: Speed 2 = 72 km/h = 20 m/s. Length 2 = 20 * 9 = 180 m.\nStep 3: Both trains are 180m long."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "A train moving at 72 km/h crosses a cyclist moving at 18 km/h in the same direction in 25 seconds. If the cyclist had moved in the opposite direction, what would the crossing time be?",
        options: ["12s", "15s", "18s", "20s"],
        correctAnswer: "15s",
        explanation: "Step 1: Speed of train = 20 m/s. Cyclist = 5 m/s.\nStep 2: Same direction relative speed = 15 m/s. Length = 15 * 25 = 375 m.\nStep 3: Opp direction relative speed = 25 m/s.\nStep 4: Time = 375 / 25 = 15 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Easy",
        questionText: "A train crosses a platform in 25 seconds and a pole in 10 seconds. Find the ratio of train length to platform length.",
        options: ["2:3", "3:2", "5:2", "2:5"],
        correctAnswer: "2:3",
        explanation: "Step 1: Time for train = 10s. Time for platform = 25 - 10 = 15s.\nStep 2: Since speed is constant, Ratio of lengths = Ratio of times = 10 : 15 = 2:3."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "Two trains of lengths 300 m and 400 m moving at 54 km/h and 72 km/h cross each other. Find the time if moving in opposite directions.",
        options: ["18s", "20s", "24s", "30s"],
        correctAnswer: "20s",
        explanation: "Step 1: Total Length = 700 m.\nStep 2: Opp dir Rel Speed = 54 + 72 = 126 km/h = 35 m/s.\nStep 3: Time = 700 / 35 = 20 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Easy",
        questionText: "A train crosses a platform in 36 seconds and a pole in 24 seconds. Find the ratio of platform length to train length.",
        options: ["1:2", "2:1", "3:2", "2:3"],
        correctAnswer: "1:2",
        explanation: "Step 1: Time for platform = 36 - 24 = 12s.\nStep 2: Ratio of Platform to Train = 12 : 24 = 1:2."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A train moving at 54 km/h crosses a pole in 20 seconds. If its speed increases by 25%, find the new crossing time.",
        options: ["12s", "15s", "16s", "18s"],
        correctAnswer: "16s",
        explanation: "Step 1: Length = 15 m/s * 20s = 300 m.\nStep 2: New Speed = 15 + 25% = 18.75 m/s. (Or time reduces inversely by ratio 4:5).\nStep 3: Time = 300 / 18.75 = 16 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "Two trains A and B start from stations 600 km apart towards each other. Speed of A = 60 km/h, Speed of B = 90 km/h. A bird starts from train A towards train B at 120 km/h. Whenever it reaches a train, it instantly turns back. Find the total distance flown by the bird.",
        options: ["360 km", "400 km", "450 km", "480 km"],
        correctAnswer: "480 km",
        explanation: "Step 1: Time taken for trains to meet = 600 / (60 + 90) = 600 / 150 = 4 hours.\nStep 2: The bird flies non-stop for 4 hours.\nStep 3: Total distance flown = 120 * 4 = 480 km."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A train crosses a pole in 15 seconds and a platform 180 m long in 24 seconds. Find the length and speed of the train.",
        options: ["L=300m, S=72km/h", "L=250m, S=60km/h", "L=350m, S=90km/h", "L=200m, S=54km/h"],
        correctAnswer: "L=300m, S=72km/h",
        explanation: "Step 1: Time for platform alone = 24 - 15 = 9s.\nStep 2: Speed = 180 / 9 = 20 m/s = 72 km/h.\nStep 3: Length = 20 * 15 = 300 m."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "Two trains of lengths 300 m and 200 m move in opposite directions at speeds of 72 km/h and 108 km/h. They will cross each other completely in how many seconds?",
        options: ["8s", "10s", "12s", "15s"],
        correctAnswer: "10s",
        explanation: "Step 1: Rel Speed = 72 + 108 = 180 km/h = 50 m/s.\nStep 2: Total Distance = 500 m.\nStep 3: Time = 500 / 50 = 10 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A train crosses a pole in 20 seconds and a bridge in 40 seconds. If the train's speed is 54 km/h, find the length of the train and the bridge.",
        options: ["Train=300m, Bridge=300m", "Train=250m, Bridge=250m", "Train=400m, Bridge=200m", "Train=350m, Bridge=350m"],
        correctAnswer: "Train=300m, Bridge=300m",
        explanation: "Step 1: Speed = 54 * (5/18) = 15 m/s.\nStep 2: Length of train = 15 * 20 = 300 m.\nStep 3: Time for bridge alone = 40 - 20 = 20s. Bridge = 15 * 20 = 300 m."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "Two trains start from stations A and B towards each other at 80 km/h and 120 km/h. They meet after 3 hours. After meeting, the first takes x hours to reach B, and the second takes y hours to reach A. Find x : y.",
        options: ["3:2", "4:9", "9:4", "16:9"],
        correctAnswer: "9:4",
        explanation: "Step 1: Using ratio of speeds S1/S2 = √(y/x) => 80/120 = √(y/x) => 2/3 = √(y/x).\nStep 2: Squaring gives 4/9 = y/x => x/y = 9/4. Ratio is 9:4."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "A train moving at 72 km/h crosses a man walking at 18 km/h in the opposite direction in 12 seconds. If the train crosses another man walking at 18 km/h in the same direction, find the time taken.",
        options: ["15s", "18s", "20s", "24s"],
        correctAnswer: "20s",
        explanation: "Step 1: Train=20m/s, Man=5m/s. Opp dir Rel Speed = 25 m/s.\nStep 2: Length = 25 * 12 = 300 m.\nStep 3: Same dir Rel Speed = 20 - 5 = 15 m/s.\nStep 4: Time = 300 / 15 = 20 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "Two trains of equal length cross each other in 8 seconds when moving in opposite directions. When moving in the same direction, they cross each other in 40 seconds. Find the ratio of their speeds.",
        options: ["2:1", "3:2", "4:3", "5:3"],
        correctAnswer: "3:2",
        explanation: "Step 1: 2L / (S1 + S2) = 8 => S1 + S2 = 2L/8 = L/4.\nStep 2: 2L / (S1 - S2) = 40 => S1 - S2 = 2L/40 = L/20.\nStep 3: S1 = (L/4 + L/20)/2 = 6L/40. S2 = (L/4 - L/20)/2 = 4L/40.\nStep 4: Ratio = 6:4 = 3:2."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Medium",
        questionText: "A 360m long train crosses a pole in 18 seconds. If the train's speed is reduced by 25%, find the new crossing time.",
        options: ["20s", "24s", "28s", "30s"],
        correctAnswer: "24s",
        explanation: "Step 1: Original Speed = 360 / 18 = 20 m/s.\nStep 2: Reduced by 25% = 20 * 0.75 = 15 m/s.\nStep 3: New time = 360 / 15 = 24 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "A 200m train crosses a platform in 30 seconds and a tunnel in 50 seconds. If the train speed is 72 km/h, find the lengths of the platform and the tunnel.",
        options: ["P=400m, T=800m", "P=300m, T=700m", "P=500m, T=900m", "P=200m, T=600m"],
        correctAnswer: "P=400m, T=800m",
        explanation: "Step 1: Speed = 20 m/s.\nStep 2: Platform + Train = 20 * 30 = 600m => Platform = 600 - 200 = 400m.\nStep 3: Tunnel + Train = 20 * 50 = 1000m => Tunnel = 1000 - 200 = 800m."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "Train A (240m) moving at 54 km/h overtakes Train B (360m) moving at 36 km/h. At the same instant, Train C (460m) moving in opposite direction at 72 km/h crosses Train A. Find the time taken by Train C to cross Train A.",
        options: ["15s", "18s", "20s", "24s"],
        correctAnswer: "20s",
        explanation: "Step 1: Train A = 15 m/s, Train C = 20 m/s. Opp dir Rel Speed = 35 m/s.\nStep 2: Total length A+C = 240 + 460 = 700 m.\nStep 3: Time to cross = 700 / 35 = 20 seconds."
    },
    {
        category: "Aptitude", topic: "Problems on Trains", difficulty: "Hard",
        questionText: "Two trains A and B are 720 km apart. Train A starts at 60 km/h, Train B starts at 90 km/h. A bird flies from A to B at 150 km/h. Find the total distance travelled by the bird before the trains meet.",
        options: ["600 km", "650 km", "700 km", "720 km"],
        correctAnswer: "720 km",
        explanation: "Step 1: Time for trains to meet = 720 / (60 + 90) = 720 / 150 = 4.8 hours.\nStep 2: Bird flies continuously for 4.8 hours at 150 km/h.\nStep 3: Distance = 150 * 4.8 = 720 km."
    }
];

const seedBatch12Trains = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Problems on Trains questions...");
        await Question.deleteMany({ topic: "Problems on Trains" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch12Questions.length} Problems on Trains Questions...`);
        
        await Question.insertMany(batch12Questions);
        console.log(`✅ BOOM! Tumhare pure 30 questions successfully seed ho gaye hain!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch12Trains();