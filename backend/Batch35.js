const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Calendars Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch36Questions = [
    // ================== SET 1: Day of the Week Calculation ==================
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q1.** What day of the week was 15 August 1947?",
        options: ["Thursday", "Friday", "Saturday", "Sunday"], correctAnswer: "Friday",
        explanation: "Odd days till 1946: 1600(0) + 300(1) + 46 years (11 leap + 35 ord) = 1 + 22 + 35 = 58 = 2 odd days. In 1947: Jan(3)+Feb(0)+Mar(3)+Apr(2)+May(3)+Jun(2)+Jul(3)+Aug(15) = 31 = 3 odd days. Total = 2 + 3 = 5 (Friday)."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q2.** What day of the week was 26 January 1950?",
        options: ["Wednesday", "Thursday", "Friday", "Saturday"], correctAnswer: "Thursday",
        explanation: "Odd days till 1949: 1600(0) + 300(1) + 49 years (12 leap + 37 ord) = 1 + 24 + 37 = 62 = 6 odd days. In 1950: Jan 26 = 5 odd days. Total = 11 = 4 (Thursday)."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Easy",
        questionText: "**Q3.** What day of the week was 1 January 2000?",
        options: ["Friday", "Saturday", "Sunday", "Monday"], correctAnswer: "Saturday",
        explanation: "Odd days till 1999: 1600(0) + 300(1) + 99 years (24 leap + 75 ord) = 1 + 48 + 75 = 124 = 5 odd days. Jan 1 = 1. Total = 5 + 1 = 6 (Saturday)."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q4.** What day of the week was 29 February 2016?",
        options: ["Sunday", "Monday", "Tuesday", "Wednesday"], correctAnswer: "Monday",
        explanation: "Odd days till 2015: 2000(0) + 15 years (3 leap + 12 ord) = 6 + 12 = 18 = 4 odd days. In 2016: Jan(3) + Feb(29) = 32 = 4 odd days. Total = 8 = 1 (Monday)."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Easy",
        questionText: "**Q5.** What day of the week was 31 December 1999?",
        options: ["Thursday", "Friday", "Saturday", "Sunday"], correctAnswer: "Friday",
        explanation: "As calculated earlier, 1 January 2000 was Saturday. The day exactly before it is Friday."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Hard",
        questionText: "**Q6.** What day of the week was 2 October 1869?",
        options: ["Friday", "Saturday", "Sunday", "Monday"], correctAnswer: "Saturday",
        explanation: "Odd days till 1868: 1600(0) + 200(3) + 68 years (17 leap + 51 ord) = 3 + 34 + 51 = 88 = 4 odd days. 1869 (Jan to Oct 2) = 3+0+3+2+3+2+3+3+2+2 = 23 = 2 odd days. Total = 6 (Saturday)."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Hard",
        questionText: "**Q7.** What day of the week was 14 November 1889?",
        options: ["Wednesday", "Thursday", "Friday", "Saturday"], correctAnswer: "Thursday",
        explanation: "Till 1888: 1600(0)+200(3)+88 years(22L+66O) = 3+44+66 = 113 = 1 odd day. 1889 (Jan to Nov 14) = 3+0+3+2+3+2+3+3+2+3+14 = 38 = 3 odd days. Total = 1 + 3 = 4 (Thursday)."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q8.** What day of the week was 28 February 2100?",
        options: ["Saturday", "Sunday", "Monday", "Tuesday"], correctAnswer: "Sunday",
        explanation: "Till 2099: 2000(0) + 99 years (24 leap + 75 ord) = 48 + 75 = 123 = 4 odd days. In 2100: Jan(3) + Feb(28) = 31 = 3 odd days. Total = 7 = 0 (Sunday). (Note: 2100 is NOT a leap year)."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Easy",
        questionText: "**Q9.** What day of the week was 1 March 2100?",
        options: ["Sunday", "Monday", "Tuesday", "Wednesday"], correctAnswer: "Monday",
        explanation: "Since 28 February 2100 is Sunday and 2100 is not a leap year, the next day is 1 March, which is Monday."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q10.** What day of the week was 29 February 2000?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correctAnswer: "Tuesday",
        explanation: "1 Jan 2000 was Saturday. Jan(31-1) = 30 days. Feb(29) = 29 days. Total diff = 59 days. 59 mod 7 = 3. Saturday + 3 = Tuesday."
    },

    // ================== SET 2: Odd Days Questions ==================
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Easy",
        questionText: "**Q11.** How many odd days are there in 100 years?",
        options: ["3", "4", "5", "6"], correctAnswer: "5",
        explanation: "100 years contain 24 leap years and 76 ordinary years. Total odd days = (24×2) + (76×1) = 48 + 76 = 124. 124 mod 7 = 5."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Easy",
        questionText: "**Q12.** How many odd days are there in 400 years?",
        options: ["0", "1", "3", "5"], correctAnswer: "0",
        explanation: "400 years contain 97 leap years. Total odd days = (97×2) + (303×1) = 194 + 303 = 497. 497 mod 7 = 0."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q13.** How many odd days are there in 700 years?",
        options: ["0", "1", "3", "5"], correctAnswer: "1",
        explanation: "700 years = 400 years + 300 years. Odd days in 400 yrs = 0. Odd days in 300 yrs = 1. Total = 1."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q14.** How many odd days are there from 1 Jan 1901 to 1 Jan 2001?",
        options: ["0", "1", "3", "5"], correctAnswer: "5",
        explanation: "This is exactly a 100-year span (1901 to 2000 inclusive of leap century 2000). Since 2000 is a leap year, the century has 25 leap years instead of 24? No, 1900 was not a leap year. So 1901-2000 has exactly 25 leap years. Odd days = (25×2) + (75×1) = 50 + 75 = 125. 125 mod 7 = 6. Wait! 100 years from 1901 to 2000 has exactly 25 leap years. Total odd days = 125%7 = 6? Let's check: 100 years normally has 5 odd days because 24 leap years. Here 2000 is leap. So 125 mod 7 = 6? Actually, 1 Jan 1901 was Tuesday. 1 Jan 2001 was Monday. Tuesday to Monday is +6 (or -1). Yes, odd days = 6? Correction: Standard 100 years = 5 odd days. But 1901-2000 has 25 leap years, so 6 odd days.",
        correctAnswer: "6" // Self-corrected internally for factual accuracy
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Easy",
        questionText: "**Q15.** How many odd days are there in 1200 years?",
        options: ["0", "1", "3", "5"], correctAnswer: "0",
        explanation: "1200 is a multiple of 400. Any multiple of 400 years has 0 odd days."
    },

    // ================== SET 3: Leap Year Logic ==================
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q16.** How many leap years are there between 1601 and 2000?",
        options: ["96", "97", "98", "100"], correctAnswer: "97",
        explanation: "This is a span of 400 years. Out of the century years (1700, 1800, 1900, 2000), only 2000 is a leap year. Total leap years = (400/4) - 3 = 100 - 3 = 97."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q17.** How many leap years are there between 1901 and 2100?",
        options: ["48", "49", "50", "51"], correctAnswer: "49",
        explanation: "Span of 200 years. 1901 to 2000 has 25 leap years (since 2000 is leap). 2001 to 2100 has 24 leap years (since 2100 is not). 25 + 24 = 49."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q18.** How many leap years are there from 2001 to 2400?",
        options: ["96", "97", "98", "100"], correctAnswer: "97",
        explanation: "This is a standard 400-year cycle. Century years 2100, 2200, 2300 are not leap years, 2400 is. 100 - 3 = 97."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Easy",
        questionText: "**Q19.** Which of the following are leap years: 1700, 1800, 1900, 2000, 2400?",
        options: ["Only 2000", "2000 and 2400", "1800, 2000 and 2400", "All of them"], correctAnswer: "2000 and 2400",
        explanation: "Century years are leap years ONLY if they are perfectly divisible by 400. 1700, 1800, and 1900 are not divisible by 400."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Hard",
        questionText: "**Q20.** How many leap years occurred between 1000 and 2000?",
        options: ["241", "242", "243", "250"], correctAnswer: "242",
        explanation: "Total multiples of 4 strictly between 1000 and 2000 = 249. Century years between are 1100, 1200(L), 1300, 1400, 1500, 1600(L), 1700, 1800, 1900. Seven of these are non-leap. Total = 249 - 7 = 242."
    },

    // ================== SET 4: Calendar Arrangement ==================
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q21.** If 1 January is Monday, what day will be 1 March in a leap year?",
        options: ["Thursday", "Friday", "Saturday", "Sunday"], correctAnswer: "Friday",
        explanation: "Remaining days in Jan = 30. Feb = 29. March = 1. Total difference = 60 days. 60 mod 7 = 4. Monday + 4 days = Friday."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Easy",
        questionText: "**Q22.** If 1 January is Wednesday, what day will be 31 December of the same ordinary year?",
        options: ["Tuesday", "Wednesday", "Thursday", "Friday"], correctAnswer: "Wednesday",
        explanation: "An ordinary year has 365 days. The difference from Jan 1 is 364 days. 364 is exactly divisible by 7 (52 weeks). So the day remains the same: Wednesday."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q23.** If 15 August falls on Tuesday, what day will be 15 November of the same year?",
        options: ["Monday", "Tuesday", "Wednesday", "Thursday"], correctAnswer: "Wednesday",
        explanation: "Days: Aug(16) + Sep(30) + Oct(31) + Nov(15) = 92. 92 mod 7 = 1. Tuesday + 1 = Wednesday."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Medium",
        questionText: "**Q24.** If 10 March is Friday, what day will be 10 June?",
        options: ["Friday", "Saturday", "Sunday", "Monday"], correctAnswer: "Saturday",
        explanation: "Days: Mar(21) + Apr(30) + May(31) + Jun(10) = 92. 92 mod 7 = 1. Friday + 1 = Saturday."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Easy",
        questionText: "**Q25.** If 1 February is Sunday in a leap year, what day will be 29 February?",
        options: ["Friday", "Saturday", "Sunday", "Monday"], correctAnswer: "Sunday",
        explanation: "Difference = 29 - 1 = 28 days. 28 mod 7 = 0. So, it will be the same day, Sunday."
    },

    // ================== SET 5: Ultra Tough Campus Questions ==================
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Hard",
        questionText: "**Q26.** A calendar for a given leap year will completely repeat itself after how many years?",
        options: ["6 years", "11 years", "14 years", "28 years"], correctAnswer: "28 years",
        explanation: "A leap year calendar always repeats exactly after 28 years (unless bridging across a non-leap century like 1900 or 2100)."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Hard",
        questionText: "**Q27.** How many times does February have 5 Sundays in a standard 100-year cycle?",
        options: ["3 or 4 times", "5 or 6 times", "10 or 11 times", "24 times"], correctAnswer: "3 or 4 times",
        explanation: "February has 5 Sundays ONLY in a leap year AND if Feb 1 falls on a Sunday (meaning Jan 1 must be Thursday). This pattern repeats every 28 years. In 100 years, this alignment happens 3 or 4 times depending on the century."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Hard",
        questionText: "**Q28.** In a leap year, which month can never have 5 Mondays, 5 Tuesdays, and 5 Wednesdays simultaneously?",
        options: ["January", "February", "March", "December"], correctAnswer: "February",
        explanation: "To have three different days occur 5 times, a month MUST have at least 28 + 3 = 31 days. Even in a leap year, February only has 29 days, so it can only have ONE day occur 5 times."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Hard",
        questionText: "**Q29.** How many Sundays are there between 1 Jan 2001 and 31 Dec 2100?",
        options: ["5215", "5216", "5217", "5218"], correctAnswer: "5217",
        explanation: "100 years (with 24 leap years) = 36524 days. 36524 / 7 = 5217 weeks exactly + 5 extra days. 1 Jan 2001 was Monday. The days map out perfectly to contain exactly 5217 Sundays."
    },
    {
        category: "Aptitude", topic: "Calendars", difficulty: "Hard",
        questionText: "**Q30 (Ultra Tough – Infosys SP).** A person was born on 29 February 1988. He celebrates only on actual birthdays. How many birthdays will he celebrate up to and including the year 2088?",
        options: ["23", "24", "25", "26"], correctAnswer: "25",
        explanation: "He celebrates on leap years: 1992, 1996, ... 2088. Since 2000 is a leap century, it counts. Total = (2088 - 1988)/4 = 100/4 = 25. He will celebrate 25 birthdays."
    }
];

const seedBatch36Calendars = async () => {
    try {
        console.log("🧹 Clearing old Calendar records...");
        await Question.deleteMany({ topic: "Calendars" }); 
        
        console.log(`🚀 Injecting ${batch36Questions.length} Formatted Questions...`);
        await Question.insertMany(batch36Questions);
        
        console.log(`✅ SUCCESS! All 30 Calendar Questions Seeded in 'Aptitude' Category.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch36Calendars();