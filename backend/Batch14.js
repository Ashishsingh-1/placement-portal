const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Probability Seeding'))
  .catch(err => console.log(err));

const batch13Questions = [
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "Three fair dice are thrown simultaneously. Find the probability that exactly two dice show the same number.",
        options: ["5/12", "1/2", "7/12", "5/18"],
        correctAnswer: "5/12",
        explanation: "Step 1: Total possible outcomes = 6^3 = 216.\nStep 2: Choose which 2 dice will show the same number (3C2 = 3 ways).\nStep 3: Choose the number for those 2 dice (6 ways).\nStep 4: Choose a different number for the 3rd die (5 ways).\nStep 5: Total favorable outcomes = 3 * 6 * 5 = 90.\nStep 6: Probability = 90 / 216 = 5/12."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "Four fair coins are tossed. Find the probability that no two consecutive heads occur.",
        options: ["3/8", "1/2", "5/16", "9/16"],
        correctAnswer: "1/2",
        explanation: "Step 1: Total outcomes = 2^4 = 16.\nStep 2: Valid sequences without 'HH': TTTT(1), HTTT(1), THTT(1), TTHT(1), TTTH(1), HTHT(1), THTH(1), HTTH(1).\nStep 3: Total valid patterns = 8. (Fibonacci sequence rule can also be used: F_{n+2} where F_6 = 8).\nStep 4: Probability = 8 / 16 = 1/2."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "Two cards are drawn from a deck without replacement. Find the probability that both cards are face cards given that at least one card is a face card.",
        options: ["11/91", "12/91", "22/221", "66/546"],
        correctAnswer: "11/91",
        explanation: "Step 1: Face cards = 12, Non-face = 40. Total pairs = 52C2 = 1326.\nStep 2: P(Both Face) = 12C2 / 1326 = 66 / 1326.\nStep 3: P(At least one face) = 1 - P(None Face) = 1 - (40C2 / 1326) = 1 - 780/1326 = 546/1326.\nStep 4: P(Both | At least one) = P(Both) / P(At least one) = 66 / 546 = 11/91."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "A bag contains 6 red, 5 blue and 4 green balls. Three balls are drawn without replacement. Find the probability that exactly two are red.",
        options: ["27/91", "30/91", "33/91", "45/182"],
        correctAnswer: "27/91",
        explanation: "Step 1: Total balls = 15. Total ways to draw 3 = 15C3 = 455.\nStep 2: Ways to draw exactly 2 red = (Ways to draw 2 Red) * (Ways to draw 1 Non-Red).\nStep 3: Red = 6, Non-Red = 9. Favorable ways = 6C2 * 9C1 = 15 * 9 = 135.\nStep 4: Probability = 135 / 455 = 27/91."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "Three dice are rolled. Find the probability that their sum is divisible by 4.",
        options: ["1/4", "13/54", "55/216", "7/27"],
        correctAnswer: "55/216",
        explanation: "Step 1: Total outcomes = 216. Possible sums divisible by 4 are 4, 8, 12, 16.\nStep 2: Combinations for Sum 4: (1,1,2) -> 3 permutations.\nStep 3: Sum 8 combinations (e.g., 116, 125, 134, 224, 233) yield 21 permutations.\nStep 4: Sum 12 combinations yield 25 permutations. Sum 16 combinations (466, 556) yield 6 permutations.\nStep 5: Total favorable = 3 + 21 + 25 + 6 = 55.\nStep 6: Probability = 55 / 216. (Note: It is very close to 1/4, which is 54/216)."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "A committee of 5 is chosen from 8 men and 7 women. Find the probability that it contains at least 3 women.",
        options: ["60/143", "61/143", "62/143", "64/143"],
        correctAnswer: "61/143",
        explanation: "Step 1: Total ways = 15C5 = 3003.\nStep 2: At least 3 women = (3W, 2M) + (4W, 1M) + (5W, 0M).\nStep 3: (7C3 * 8C2) = 35 * 28 = 980.\nStep 4: (7C4 * 8C1) = 35 * 8 = 280.\nStep 5: (7C5 * 8C0) = 21 * 1 = 21.\nStep 6: Total favorable = 980 + 280 + 21 = 1281.\nStep 7: Probability = 1281 / 3003 = 61/143."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "Five cards are drawn from a deck. Find the probability of getting exactly one pair.",
        options: ["352/833", "380/833", "400/833", "422/833"],
        correctAnswer: "352/833",
        explanation: "Step 1: Total ways to draw 5 cards = 52C5 = 2,598,960.\nStep 2: Choose the rank for the pair (13C1 = 13 ways). Choose 2 suits for it (4C2 = 6 ways).\nStep 3: Choose 3 different ranks for remaining cards (12C3 = 220 ways). Choose 1 suit for each (4^3 = 64 ways).\nStep 4: Favorable ways = 13 * 6 * 220 * 64 = 1,098,240.\nStep 5: Probability = 1098240 / 2598960 = 352/833 (Approx 42.25%)."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "A coin is tossed 10 times. Find the probability of getting more heads than tails.",
        options: ["193/512", "195/512", "197/512", "201/512"],
        correctAnswer: "193/512",
        explanation: "Step 1: Total outcomes = 2^10 = 1024.\nStep 2: More heads than tails means getting 6, 7, 8, 9, or 10 heads.\nStep 3: Favorable = 10C6 + 10C7 + 10C8 + 10C9 + 10C10 = 210 + 120 + 45 + 10 + 1 = 386.\nStep 4: Probability = 386 / 1024 = 193/512."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Easy",
        questionText: "Two dice are thrown. Find the probability that the product is a perfect square.",
        options: ["7/36", "2/9", "1/4", "5/18"],
        correctAnswer: "2/9",
        explanation: "Step 1: Total outcomes = 36. Possible perfect square products = 1, 4, 9, 16, 25, 36.\nStep 2: (1,1)->1 way; (1,4), (4,1), (2,2)->3 ways; (3,3)->1 way; (4,4)->1 way; (5,5)->1 way; (6,6)->1 way.\nStep 3: Total favorable = 1 + 3 + 1 + 1 + 1 + 1 = 8 ways.\nStep 4: Probability = 8 / 36 = 2/9."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Easy",
        questionText: "A box contains 8 bulbs, 3 of which are defective. Three bulbs are selected. Find the probability that at least one is defective.",
        options: ["17/28", "19/28", "21/28", "23/28"],
        correctAnswer: "23/28",
        explanation: "Step 1: P(At least 1 defective) = 1 - P(None are defective).\nStep 2: Good bulbs = 5. Ways to choose 3 good bulbs = 5C3 = 10.\nStep 3: Total ways to choose 3 bulbs = 8C3 = 56.\nStep 4: P(None defective) = 10 / 56 = 5/28.\nStep 5: P(At least 1 defective) = 1 - 5/28 = 23/28."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "Three cards are drawn from a deck. Find the probability that all are from different suits.",
        options: ["169/425", "180/425", "196/425", "200/425"],
        correctAnswer: "169/425",
        explanation: "Step 1: Probability = (52/52) * (39/51) * (26/50).\nStep 2: Card 1 can be anything. Card 2 must be from one of the remaining 3 suits (39 cards). Card 3 must be from one of the remaining 2 suits (26 cards).\nStep 3: 1 * (13/17) * (13/25) = 169 / 425."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "A fair die is rolled 5 times. Find the probability that exactly two 6s occur.",
        options: ["625/3888", "625/7776", "1250/3888", "125/3888"],
        correctAnswer: "625/3888",
        explanation: "Step 1: Use binomial probability formula: P(X=k) = nCk * p^k * q^(n-k).\nStep 2: n = 5, k = 2, p = 1/6 (success), q = 5/6 (failure).\nStep 3: 5C2 * (1/6)^2 * (5/6)^3 = 10 * (1/36) * (125/216) = 1250 / 7776.\nStep 4: Simplify = 625 / 3888."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Easy",
        questionText: "Four people are seated randomly in a row. Find the probability that two particular persons sit together.",
        options: ["1/4", "1/3", "1/2", "2/3"],
        correctAnswer: "1/2",
        explanation: "Step 1: Total seating arrangements = 4! = 24.\nStep 2: Treat the 2 particular persons as a single unit. Total units = 3. Arrangements = 3! = 6.\nStep 3: The 2 persons can swap seats among themselves in 2! = 2 ways.\nStep 4: Favorable ways = 6 * 2 = 12.\nStep 5: Probability = 12 / 24 = 1/2."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "From numbers 1–20, three numbers are selected. Find the probability that their sum is even.",
        options: ["1/4", "1/2", "3/4", "1/3"],
        correctAnswer: "1/2",
        explanation: "Step 1: There are 10 Even and 10 Odd numbers.\nStep 2: Sum is even if (3 Even) OR (1 Even, 2 Odd).\nStep 3: Ways for 3 Even = 10C3 = 120.\nStep 4: Ways for 1 Even, 2 Odd = 10C1 * 10C2 = 10 * 45 = 450.\nStep 5: Total favorable = 120 + 450 = 570. Total space = 20C3 = 1140.\nStep 6: Probability = 570 / 1140 = 1/2."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "A bag contains 10 red and 15 blue balls. Four balls are drawn. Find the probability that exactly three are red.",
        options: ["30/253", "36/253", "42/253", "48/253"],
        correctAnswer: "36/253",
        explanation: "Step 1: Total balls = 25. Total ways to draw 4 = 25C4 = 12,650.\nStep 2: Exactly 3 red means (3 Red and 1 Blue).\nStep 3: Favorable = 10C3 * 15C1 = 120 * 15 = 1800.\nStep 4: Probability = 1800 / 12650 = 180 / 1265 = 36/253."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "A set of three fair coins is tossed repeatedly until at least one head appears. Find the probability that the first appearance of a head occurs on the third trial.",
        options: ["7/512", "7/64", "49/512", "1/512"],
        correctAnswer: "7/512",
        explanation: "Step 1: Probability of getting at least one head in a single trial of 3 coins = 7/8. Probability of failing (all tails) = 1/8.\nStep 2: To succeed on the 3rd trial, you must fail trial 1, fail trial 2, and succeed on trial 3.\nStep 3: Probability = (1/8) * (1/8) * (7/8) = 7/512."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "Five cards are drawn. Find the probability of getting exactly two kings and one queen.",
        options: ["473/54145", "490/54145", "500/54145", "520/54145"],
        correctAnswer: "473/54145",
        explanation: "Step 1: Total combinations = 52C5 = 2,598,960.\nStep 2: Kings = 4, Queens = 4, Others = 44.\nStep 3: Favorable ways = (4C2 for Kings) * (4C1 for Queen) * (44C2 for Others).\nStep 4: 6 * 4 * 946 = 22,704.\nStep 5: Probability = 22704 / 2598960 = 473/54145."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Easy",
        questionText: "Two dice are thrown. Given that the sum is greater than 8, find the probability that the sum is 10.",
        options: ["1/4", "3/10", "1/3", "2/5"],
        correctAnswer: "3/10",
        explanation: "Step 1: Sample space condition is Sum > 8. Possible sums: 9, 10, 11, 12.\nStep 2: Number of ways: Sum 9(4 ways), 10(3 ways), 11(2 ways), 12(1 way). Total = 10 ways.\nStep 3: Sum = 10 happens in 3 ways.\nStep 4: Probability = 3 / 10."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "A class contains 12 boys and 8 girls. Four students are selected. Find the probability that exactly two are girls.",
        options: ["516/1615", "580/1615", "616/1615", "640/1615"],
        correctAnswer: "616/1615",
        explanation: "Step 1: Total ways = 20C4 = 4845.\nStep 2: Favorable ways = Select 2 girls (8C2) AND 2 boys (12C2).\nStep 3: 8C2 = 28. 12C2 = 66. Favorable = 28 * 66 = 1848.\nStep 4: Probability = 1848 / 4845 = 616 / 1615."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Easy",
        questionText: "A number is chosen from 1 to 1000. Find the probability that it is divisible by neither 2 nor 5.",
        options: ["1/5", "2/5", "3/5", "3/10"],
        correctAnswer: "2/5",
        explanation: "Step 1: Using Inclusion-Exclusion. n(2) = 500, n(5) = 200, n(10) = 100.\nStep 2: Divisible by 2 or 5 = 500 + 200 - 100 = 600 numbers.\nStep 3: Divisible by neither = 1000 - 600 = 400 numbers.\nStep 4: Probability = 400 / 1000 = 2/5."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "Three dice are thrown. Find the probability that the maximum number obtained is exactly 5.",
        options: ["50/216", "55/216", "61/216", "65/216"],
        correctAnswer: "61/216",
        explanation: "Step 1: P(Max is 5) = P(All dice <= 5) - P(All dice <= 4).\nStep 2: Ways all dice <= 5 = 5^3 = 125.\nStep 3: Ways all dice <= 4 = 4^3 = 64.\nStep 4: Favorable ways = 125 - 64 = 61.\nStep 5: Probability = 61 / 216."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "A deck is shuffled. Four cards are drawn. Find the probability that all are red cards.",
        options: ["46/833", "52/833", "58/833", "64/833"],
        correctAnswer: "46/833",
        explanation: "Step 1: Total ways = 52C4 = 270,725.\nStep 2: Red cards = 26. Ways to choose 4 red = 26C4 = 14,950.\nStep 3: Probability = 14950 / 270725. Divide by 325.\nStep 4: 46 / 833."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "Five coins are tossed. Find the probability that exactly three heads occur and no two heads are adjacent.",
        options: ["1/16", "1/32", "3/32", "5/32"],
        correctAnswer: "1/32",
        explanation: "Step 1: Total outcomes = 2^5 = 32.\nStep 2: The only way to arrange 3 Heads in 5 slots without them touching is H T H T H.\nStep 3: Number of valid arrangements = 1.\nStep 4: Probability = 1 / 32."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "A box contains 4 white, 5 black and 6 red balls. Four balls are drawn without replacement. Find the probability that at least one ball of each color is selected.",
        options: ["40/91", "44/91", "48/91", "52/91"],
        correctAnswer: "48/91",
        explanation: "Step 1: Total ways = 15C4 = 1365.\nStep 2: At least 1 of each means selecting (2W,1B,1R) OR (1W,2B,1R) OR (1W,1B,2R).\nStep 3: (4C2 * 5 * 6) = 6 * 30 = 180.\nStep 4: (4 * 5C2 * 6) = 24 * 10 = 240.\nStep 5: (4 * 5 * 6C2) = 20 * 15 = 300.\nStep 6: Total favorable = 180 + 240 + 300 = 720.\nStep 7: Probability = 720 / 1365 = 48/91."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "A die is rolled repeatedly until a 6 appears. Find the probability that the first 6 appears after the fifth roll.",
        options: ["1024/7776", "2500/7776", "3125/7776", "3800/7776"],
        correctAnswer: "3125/7776",
        explanation: "Step 1: For the first 6 to appear after the 5th roll, the first 5 rolls must all be NON-6s.\nStep 2: Probability of a non-6 on a single roll = 5/6.\nStep 3: Probability for 5 consecutive non-6s = (5/6)^5.\nStep 4: 5^5 / 6^5 = 3125 / 7776."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Easy",
        questionText: "Two cards are drawn successively without replacement. Find the probability that the second card is an ace given that the first card is a king.",
        options: ["1/13", "4/51", "1/17", "3/51"],
        correctAnswer: "4/51",
        explanation: "Step 1: After drawing a King, there are 51 cards left in the deck.\nStep 2: All 4 Aces are still in the deck.\nStep 3: Probability = 4 / 51."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "Three couples are seated randomly around a circular table. Find the probability that every husband sits next to his wife.",
        options: ["1/15", "2/15", "1/5", "4/15"],
        correctAnswer: "2/15",
        explanation: "Step 1: Total seating arrangements for 6 people in a circle = (6-1)! = 120.\nStep 2: Treat each couple as a single unit (3 units). Ways to arrange 3 units in a circle = (3-1)! = 2.\nStep 3: Within each unit, husband and wife can swap seats = 2^3 = 8 ways.\nStep 4: Total favorable = 2 * 8 = 16.\nStep 5: Probability = 16 / 120 = 2/15."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Medium",
        questionText: "A fair coin is tossed 8 times. Find the probability that heads and tails occur equally often.",
        options: ["35/128", "35/256", "70/128", "15/64"],
        correctAnswer: "35/128",
        explanation: "Step 1: Total outcomes = 2^8 = 256.\nStep 2: Equal heads and tails means exactly 4 Heads and 4 Tails.\nStep 3: Favorable = 8C4 = 70.\nStep 4: Probability = 70 / 256 = 35/128."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "Four dice are rolled. Find the probability that at least one die shows 6 and at least one die shows 1.",
        options: ["145/648", "151/648", "155/648", "160/648"],
        correctAnswer: "151/648",
        explanation: "Step 1: Total = 6^4 = 1296. Let A = No 6s, B = No 1s. We need 1 - P(A U B).\nStep 2: |A| = 5^4 = 625. |B| = 5^4 = 625.\nStep 3: |A ∩ B| = No 6s AND No 1s = 4^4 = 256.\nStep 4: |A U B| = 625 + 625 - 256 = 994.\nStep 5: Favorable (Both present) = 1296 - 994 = 302.\nStep 6: Probability = 302 / 1296 = 151/648."
    },
    {
        category: "Aptitude", topic: "Probability", difficulty: "Hard",
        questionText: "A bag contains 5 Red, 4 Blue, 3 Green. Four balls are drawn without replacement. Find the probability that: Exactly two are red, At least one is blue, AND No green ball appears before a blue ball in the sequence drawn.",
        options: ["7/33", "8/33", "10/33", "4/11"],
        correctAnswer: "8/33",
        explanation: "Step 1: Total ordered draws P(12,4) = 11,880. We need 2R AND >=1B AND (B before G if G exists).\nStep 2: Case 1: Draw (2R, 2B). Ways to pick = 5C2 * 4C2 = 60. Permutations of these 4 specific balls = 4! = 24. Total = 60*24 = 1440. (No Green, so sequence rule is passed).\nStep 3: Case 2: Draw (2R, 1B, 1G). Ways to pick = 5C2 * 4C1 * 3C1 = 120. Total permutations of these 4 specific balls = 4! = 24. Since there's 1B and 1G, exactly half of these have B before G (symmetry). Valid permutations = 12. Total = 120*12 = 1440.\nStep 4: Sum of valid ordered outcomes = 1440 + 1440 = 2880.\nStep 5: Probability = 2880 / 11880 = 288 / 1188 = 8/33."
    }
];

const seedBatch13Probability = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Probability questions...");
        await Question.deleteMany({ topic: "Probability" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch13Questions.length} Premium Probability Questions...`);
        
        await Question.insertMany(batch13Questions);
        console.log(`✅ BOOM! Tumhare pure 30 questions successfully seed ho gaye hain! Q30 is a masterpiece.`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch13Probability();