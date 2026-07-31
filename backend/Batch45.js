const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Sentence Improvement Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch46Questions = [
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q1.** The HR manager insisted to conduct another technical interview.",
        options: ["insisted on conducting", "insisted for conducting", "insisted conducting", "No Improvement"], correctAnswer: "A. insisted on conducting",
        explanation: "Correct expression is 'insisted on' followed by the -ing form."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q2.** Neither the project manager nor the developers was aware of the security issue.",
        options: ["were aware", "have been aware", "are aware", "No Improvement"], correctAnswer: "A. were aware",
        explanation: "The verb should match the closer subject, which is 'developers' (plural)."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q3.** The committee has took an important decision regarding the recruitment process.",
        options: ["had took", "has taken", "have took", "No Improvement"], correctAnswer: "B. has taken",
        explanation: "'Has' is followed by the third form of the verb, which is 'taken'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q4.** Hardly had the presentation started when the projector failed.",
        options: ["than the projector failed", "when the projector had failed", "then the projector failed", "No Improvement"], correctAnswer: "D. No Improvement",
        explanation: "The pairing of 'Hardly' and 'when' is correct."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Hard",
        questionText: "**Q5.** The candidate is one of the engineers who has solved the maximum number of coding problems.",
        options: ["have solved", "had solved", "were solving", "No Improvement"], correctAnswer: "A. have solved",
        explanation: "The verb must be plural to match 'engineers'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q6.** The CEO appreciated the employees despite of the unexpected challenges.",
        options: ["despite", "in spite", "although", "No Improvement"], correctAnswer: "A. despite",
        explanation: "'Despite' is used without 'of'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q7.** Scarcely had the server restarted than another error appeared.",
        options: ["when", "then", "while", "No Improvement"], correctAnswer: "A. when",
        explanation: "'Scarcely' is paired with 'when'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q8.** Every one of the submitted reports were verified by the audit team.",
        options: ["was verified", "have been verified", "are verified", "No Improvement"], correctAnswer: "A. was verified",
        explanation: "'Every one' refers to a single unit, requiring a singular verb."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q9.** No sooner had the interview ended when the result was announced.",
        options: ["than", "then", "while", "No Improvement"], correctAnswer: "A. than",
        explanation: "'No sooner' is always paired with 'than'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Easy",
        questionText: "**Q10.** She is more smarter than any other participant in the discussion.",
        options: ["smarter", "more smart", "smartest", "No Improvement"], correctAnswer: "A. smarter",
        explanation: "Avoid using 'more' with words already in comparative form."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Hard",
        questionText: "**Q11.** If I would have known about the schedule change, I would have informed you.",
        options: ["had known", "have known", "knew", "No Improvement"], correctAnswer: "A. had known",
        explanation: "Use 'had known' instead of 'would have known' for past conditions."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Easy",
        questionText: "**Q12.** The manager asked the team to discuss about the implementation plan.",
        options: ["discuss", "discussing about", "discussed about", "No Improvement"], correctAnswer: "A. discuss",
        explanation: "The word 'discuss' does not need 'about' after it."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q13.** Each of the interns have submitted the assignment.",
        options: ["has submitted", "had submitted", "submit", "No Improvement"], correctAnswer: "A. has submitted",
        explanation: "'Each' indicates a singular focus."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q14.** The software was designed for improving system performance.",
        options: ["to improve", "improve", "improving", "No Improvement"], correctAnswer: "A. to improve",
        explanation: "Use 'to' + base verb to show the purpose of the design."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q15.** He is capable to complete the project before the deadline.",
        options: ["of completing", "for completing", "completing", "No Improvement"], correctAnswer: "A. of completing",
        explanation: "'Capable' is followed by 'of' and the -ing form."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q16.** The data are insufficient to draw a conclusion.",
        options: ["is insufficient", "were insufficient", "has insufficient", "No Improvement"], correctAnswer: "D. No Improvement",
        explanation: "Both singular and plural forms are accepted in modern business context."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q17.** One of my friends are working at a multinational company.",
        options: ["is working", "have worked", "were working", "No Improvement"], correctAnswer: "A. is working",
        explanation: "Only one friend is the subject, so use 'is'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q18.** The meeting was postponed due the heavy rainfall.",
        options: ["due to the", "because the", "owing the", "No Improvement"], correctAnswer: "A. due to the",
        explanation: "The correct phrase is 'due to'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q19.** The proposal was rejected because it lacked of proper documentation.",
        options: ["lacked", "lacked for", "was lacking of", "No Improvement"], correctAnswer: "A. lacked",
        explanation: "The word 'lacked' does not need 'of' when used as a verb."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Hard",
        questionText: "**Q20.** She prefers working than studying late at night.",
        options: ["working to", "to work than", "working over", "No Improvement"], correctAnswer: "A. working to",
        explanation: "Use 'to' instead of 'than' when using the word 'prefer'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Hard",
        questionText: "**Q21.** Not only the developers but also the tester were present during the release meeting.",
        options: ["was present", "is present", "have been present", "No Improvement"], correctAnswer: "A. was present",
        explanation: "The verb should match the subject closest to it ('tester')."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Hard",
        questionText: "**Q22.** The report comprises of five detailed sections.",
        options: ["comprises", "is comprised of", "comprising of", "No Improvement"], correctAnswer: "A. comprises",
        explanation: "'Comprises' is used without the word 'of'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q23.** The consultant explained the solution in details to the client.",
        options: ["in detail", "into details", "with detail", "No Improvement"], correctAnswer: "A. in detail",
        explanation: "The common phrase is 'in detail'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q24.** The new software is superior than the previous version.",
        options: ["superior to", "superior over", "more superior to", "No Improvement"], correctAnswer: "A. superior to",
        explanation: "Words ending in -ior take 'to' for comparisons."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q25.** The trainer emphasized on maintaining coding standards.",
        options: ["emphasized maintaining", "emphasized to maintain", "emphasized for maintaining", "No Improvement"], correctAnswer: "A. emphasized maintaining",
        explanation: "The verb 'emphasize' does not take 'on'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Hard",
        questionText: "**Q26.** By the time the client arrived, the team already completed the presentation.",
        options: ["had already completed", "already completes", "has already completed", "No Improvement"], correctAnswer: "A. had already completed",
        explanation: "Use 'had completed' for actions happening before another past event."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Hard",
        questionText: "**Q27.** The manager requested that every employee is present before 9 a.m.",
        options: ["be present", "was present", "are present", "No Improvement"], correctAnswer: "A. be present",
        explanation: "Use the base form 'be' after words like 'request'."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q28.** The number of applicants have increased significantly this year.",
        options: ["has increased", "had increase", "were increasing", "No Improvement"], correctAnswer: "A. has increased",
        explanation: "'The number of' is treated as a singular unit."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Medium",
        questionText: "**Q29.** He denied to copy the source code from the internet.",
        options: ["copying", "copy", "copied", "No Improvement"], correctAnswer: "A. copying",
        explanation: "'Deny' is followed by the -ing form."
    },
    {
        category: "Verbal Ability", topic: "Sentence Improvement", difficulty: "Hard",
        questionText: "**Q30 (Ultra Tough).** The panel considered the candidate capable to lead a global development team.",
        options: ["capable of leading", "capable for leading", "capable to leading", "No Improvement"], correctAnswer: "A. capable of leading",
        explanation: "'Capable' is always followed by 'of' + the -ing form."
    }
];

const seedBatch46SentenceImprovement = async () => {
    try {
        console.log("🧹 Clearing old records...");
        await Question.deleteMany({ topic: "Sentence Improvement" }); 
        await Question.insertMany(batch46Questions);
        console.log(`✅ SUCCESS! All 30 Sentence Improvement Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

seedBatch46SentenceImprovement();