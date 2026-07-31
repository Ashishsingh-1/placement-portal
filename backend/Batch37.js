const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Tournaments Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch38Questions = [
    // ================== SET 1: Round Robin (League) Basics ==================
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Easy",
        questionText: "**Q1.** In a tournament, every team plays every other team exactly once. If there are 12 teams, how many matches are played?",
        options: ["60", "66", "72", "132"], correctAnswer: "66",
        explanation: "Formula for a single round-robin tournament is n(n-1)/2. For n=12, Matches = (12 × 11) / 2 = 66."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Easy",
        questionText: "**Q2.** A league consists of 18 teams. Find the total number of matches.",
        options: ["153", "162", "171", "306"], correctAnswer: "153",
        explanation: "Using n(n-1)/2. For n=18, Matches = (18 × 17) / 2 = 9 × 17 = 153."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q3.** In a round-robin tournament, 190 matches are played. Find the number of teams.",
        options: ["18", "19", "20", "21"], correctAnswer: "20",
        explanation: "n(n-1)/2 = 190. So, n(n-1) = 380. The factors are 20 and 19 (20 × 19 = 380). Hence, n = 20."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q4.** A tournament has 15 teams. Each win gives 3 points, draw gives 1 point to each team. If no match ends in a draw, find the total points distributed.",
        options: ["300", "315", "330", "345"], correctAnswer: "315",
        explanation: "Total matches = (15 × 14) / 2 = 105. Since there are no draws, every match yields exactly 3 points to the winning team. Total points = 105 × 3 = 315."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Hard",
        questionText: "**Q5.** In a league of 10 teams, exactly 8 matches end in draws. Find the total points distributed. (Win=3, Draw=1 point each).",
        options: ["120", "125", "127", "130"], correctAnswer: "127",
        explanation: "Total matches = (10 × 9) / 2 = 45. A draw distributes 2 points total (1+1). A win distributes 3 points. Total Points = (8 draws × 2 pts) + (37 wins × 3 pts) = 16 + 111 = 127."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Easy",
        questionText: "**Q6.** A tournament has 16 teams. How many matches involve a particular team?",
        options: ["14", "15", "16", "30"], correctAnswer: "15",
        explanation: "In a single round-robin, each team plays against every other team exactly once. Since there are 16 teams, a team will play against the remaining 15 teams."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q7.** A round-robin tournament contains 153 matches. Find the number of teams.",
        options: ["16", "17", "18", "19"], correctAnswer: "18",
        explanation: "n(n-1)/2 = 153. So, n(n-1) = 306. 18 × 17 = 306. Therefore, n = 18."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q8.** A tournament has 21 teams. How many matches are NOT played by Team A?",
        options: ["180", "190", "200", "210"], correctAnswer: "190",
        explanation: "Matches not involving Team A are the matches played exclusively among the remaining 20 teams. Formula: (20 × 19) / 2 = 190."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q9.** A league has 14 teams. If every match has a winner, how many total wins occur?",
        options: ["91", "105", "182", "196"], correctAnswer: "91",
        explanation: "Total matches = (14 × 13) / 2 = 91. If every match has a winner, there is exactly 1 win per match. Total wins = 91."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q10.** In a league of n teams, the total matches = 300. Find n.",
        options: ["20", "24", "25", "30"], correctAnswer: "25",
        explanation: "n(n-1)/2 = 300. So, n(n-1) = 600. 25 × 24 = 600. Therefore, n = 25."
    },

    // ================== SET 2: Knockout Tournaments ==================
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Easy",
        questionText: "**Q11.** A knockout tournament has 64 teams. How many matches are required to determine the winner?",
        options: ["32", "63", "64", "128"], correctAnswer: "63",
        explanation: "In a single-elimination knockout tournament, every match eliminates exactly one team. To find 1 winner out of n teams, you must eliminate n-1 teams. Matches = 64 - 1 = 63."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Easy",
        questionText: "**Q12.** A knockout tournament contains 127 matches. Find the number of teams.",
        options: ["64", "127", "128", "256"], correctAnswer: "128",
        explanation: "Matches = n - 1. So, n - 1 = 127 => n = 128 teams."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q13.** A knockout tournament has 256 teams. How many rounds are needed?",
        options: ["6", "7", "8", "9"], correctAnswer: "8",
        explanation: "The number of rounds required to reach a single winner is log2(n). log2(256) = 8. (Or simply: 256->128->64->32->16->8->4->2->1 = 8 rounds)."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Easy",
        questionText: "**Q14.** A tournament begins with 1024 players. Find the total matches.",
        options: ["512", "1023", "1024", "2048"], correctAnswer: "1023",
        explanation: "Matches = n - 1 = 1024 - 1 = 1023."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q15.** In a knockout tournament, 7 rounds are played. Find the number of teams.",
        options: ["64", "128", "256", "512"], correctAnswer: "128",
        explanation: "Number of teams = 2^rounds. Teams = 2^7 = 128."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Easy",
        questionText: "**Q16.** A knockout tournament has 500 teams. Find total matches needed.",
        options: ["250", "499", "500", "501"], correctAnswer: "499",
        explanation: "Matches = n - 1 = 500 - 1 = 499 matches."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Hard",
        questionText: "**Q17.** A knockout tournament has 128 teams. How many teams are eliminated after Round 3?",
        options: ["96", "112", "120", "127"], correctAnswer: "112",
        explanation: "After 3 rounds, the number of teams remaining is 128 / (2³) = 128 / 8 = 16. Total teams eliminated = 128 - 16 = 112."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Easy",
        questionText: "**Q18.** In a knockout event, 31 matches are played. Find the number of participants.",
        options: ["16", "31", "32", "64"], correctAnswer: "32",
        explanation: "Participants = Matches + 1 = 31 + 1 = 32."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Hard",
        questionText: "**Q19.** A tournament starts with 512 players. How many matches occur before the quarterfinals begin?",
        options: ["496", "500", "504", "508"], correctAnswer: "504",
        explanation: "Quarterfinals involve 8 players. To reduce 512 players to 8, we need to eliminate 512 - 8 = 504 players. Since each match eliminates exactly 1 player, 504 matches must occur before QFs."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q20.** A knockout tournament starts with 64 teams. How many matches occur from the quarterfinal onward?",
        options: ["3", "7", "15", "31"], correctAnswer: "7",
        explanation: "From the QFs onward, 8 teams remain. Matches needed to find a winner = 8 - 1 = 7. (4 in QF, 2 in SF, 1 in Final)."
    },

    // ================== SET 3: Advanced Tournament Logic ==================
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Hard",
        questionText: "**Q21.** 8 teams participate in a league. Each team wins exactly 3 matches. How many matches ended in a draw?",
        options: ["2", "4", "6", "8"], correctAnswer: "4",
        explanation: "Total matches = (8 × 7) / 2 = 28. Total wins = 8 teams × 3 wins = 24. A match with a decisive result produces exactly 1 winner. So, 24 matches had results. Matches drawn = Total - Decisive = 28 - 24 = 4."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Hard",
        questionText: "**Q22.** A league has 10 teams. Total matches = 45. If 15 matches end in draws, find the total points distributed. (Win=3, Draw=1 per team).",
        options: ["110", "115", "120", "125"], correctAnswer: "120",
        explanation: "Remaining decisive matches = 45 - 15 = 30. Points from 15 draws = 15 × 2 = 30. Points from 30 wins = 30 × 3 = 90. Total points = 30 + 90 = 120."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q23.** 12 teams participate. Each team plays every other team twice. Find total matches.",
        options: ["66", "132", "144", "264"], correctAnswer: "132",
        explanation: "Formula for Double Round-Robin is n(n-1). For n=12, Matches = 12 × 11 = 132."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q24.** A double round-robin league has 20 teams. Find total matches.",
        options: ["190", "380", "400", "760"], correctAnswer: "380",
        explanation: "Double Round-Robin = n(n-1). 20 × 19 = 380 matches."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q25.** A tournament has 16 teams. Each team plays every other team twice. If each match has a winner, find total wins.",
        options: ["120", "240", "256", "480"], correctAnswer: "240",
        explanation: "Total matches = 16 × 15 = 240. If every match has a winner, the total number of wins equals the total number of matches = 240."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Hard",
        questionText: "**Q26.** In a league of 14 teams, a Win = 3 points and Draw = 1 point each. 20 matches ended in draws. Find total points awarded.",
        options: ["240", "245", "250", "253"], correctAnswer: "253",
        explanation: "Total matches = (14 × 13) / 2 = 91. Matches with winners = 91 - 20 = 71. Points from wins = 71 × 3 = 213. Points from draws = 20 × 2 = 40. Total = 213 + 40 = 253."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Hard",
        questionText: "**Q27.** A league contains n teams. Total matches = 630. Find n.",
        options: ["34", "35", "36", "37"], correctAnswer: "36",
        explanation: "n(n-1)/2 = 630 => n(n-1) = 1260. 36 × 35 = 1260. Therefore, n = 36."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Medium",
        questionText: "**Q28.** A tournament has 32 teams. Each team plays every other team twice. How many matches involve Team A?",
        options: ["31", "62", "64", "961"], correctAnswer: "62",
        explanation: "Team A plays against the other 31 teams. Since it's a double round-robin, it plays each team twice. Total = 31 × 2 = 62 matches."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Hard",
        questionText: "**Q29.** A round robin league has 25 teams. Find the ratio of: (Matches involving Team A) : (Matches NOT involving Team A).",
        options: ["1:11", "2:23", "2:25", "1:12"], correctAnswer: "2:23",
        explanation: "Total matches = 25 × 24 / 2 = 300. Matches involving A = 24. Matches NOT involving A = 300 - 24 = 276. Ratio = 24 : 276. Dividing by 12 yields 2 : 23."
    },
    {
        category: "Aptitude", topic: "Tournaments & Leagues", difficulty: "Hard", // Ultra Tough Deloitte Pattern
        questionText: "**Q30 (Ultra Tough).** A double round-robin league contains 18 teams. Win = 3 pts, Draw = 1 pt each. At the end, there were 36 draws. Find Total Matches, Matches with Winners, and Total Points distributed.",
        options: ["Matches: 306, Winners: 270, Points: 882", "Matches: 153, Winners: 117, Points: 423", "Matches: 306, Winners: 270, Points: 846", "Matches: 324, Winners: 288, Points: 900"], correctAnswer: "Matches: 306, Winners: 270, Points: 882",
        explanation: "Double RR Matches = 18 × 17 = 306. Matches with winners = 306 - 36 = 270. Total points = (36 draws × 2) + (270 wins × 3) = 72 + 810 = 882."
    }
];

const seedBatch38Tournaments = async () => {
    try {
        console.log("🧹 Clearing old Tournaments & Leagues records...");
        await Question.deleteMany({ topic: "Tournaments & Leagues" }); 
        
        console.log(`🚀 Injecting ${batch38Questions.length} Formatted Questions...`);
        await Question.insertMany(batch38Questions);
        
        console.log(`✅ SUCCESS! All 30 Tournament Questions Seeded in 'Aptitude' Category.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch38Tournaments();