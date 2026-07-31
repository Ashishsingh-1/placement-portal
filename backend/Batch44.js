const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Cloze Test Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const p1 = "Artificial Intelligence has become one of the most rapidly evolving technologies. Companies are investing heavily because AI helps improve productivity and (1) manual effort. However, successful implementation requires careful planning (2) skilled professionals. Organizations that ignore ethical concerns may (3) serious challenges in the future. Therefore, businesses should focus (4) innovation while maintaining transparency. This approach enables companies to remain (5) in the competitive market.";
const p2 = "Campus placements require not only technical knowledge but also excellent communication skills. Students who practice regularly (6) more confident during interviews. Recruiters often evaluate how clearly candidates (7) their ideas. Even highly skilled programmers may fail if they cannot (8) effectively. Therefore, consistent preparation is (9) than last-minute revision. Confidence grows (10) continuous learning.";
const p3 = "Many startups fail not because of poor ideas but because they (11) market research. Understanding customer needs is (12) important than developing advanced features. Entrepreneurs should test their products (13) launching them nationwide. Feedback allows companies to (14) necessary improvements. A well-planned strategy greatly (15) the chances of success.";
const p4 = "Cybersecurity has become a major concern for organizations. Hackers continuously develop new techniques (16) sensitive information. Companies should regularly update their security systems (17) employees about cyber threats. Even a small mistake can (18) to significant financial losses. Preventive measures are always (19) effective than corrective actions. Every employee should remain (20) while handling confidential data.";
const p5 = "Successful leaders inspire others (21) their actions rather than their words. They encourage innovation and (22) employees to take ownership of their work. Challenges are viewed (23) opportunities to learn. Effective leadership also depends (24) emotional intelligence. Great leaders never stop (25).";
const p6 = "Data-driven decision-making has transformed modern businesses. Managers now rely (26) analytics to identify trends and predict customer behavior. However, data alone cannot guarantee success unless it is (27) accurately. Organizations must ensure that information is both reliable (28) relevant. Poor-quality data may lead (29) incorrect business decisions. Therefore, companies invest heavily in systems that (30) data integrity.";

const batch45Questions = [
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p1 + "\n\n**Q1.** (1) ____", options: ["reduce", "reducing", "reduced", "reduction"], correctAnswer: "reduce", explanation: "Follows 'help improve... and [base verb]'." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p1 + "\n\n**Q2.** (2) ____", options: ["but", "and", "or", "although"], correctAnswer: "and", explanation: "'Planning AND professionals' needed." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p1 + "\n\n**Q3.** (3) ____", options: ["faces", "facing", "face", "faced"], correctAnswer: "face", explanation: "Modal 'may' takes base form." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p1 + "\n\n**Q4.** (4) ____", options: ["at", "on", "into", "over"], correctAnswer: "on", explanation: "Collocation: Focus on." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p1 + "\n\n**Q5.** (5) ____", options: ["competitive", "compete", "competition", "competitively"], correctAnswer: "competitive", explanation: "Adjective for 'market'." },
    
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p2 + "\n\n**Q6.** (6) ____", options: ["becomes", "become", "became", "becoming"], correctAnswer: "become", explanation: "Subject 'Students' (plural) + become." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p2 + "\n\n**Q7.** (7) ____", options: ["express", "expressing", "expressed", "expression"], correctAnswer: "express", explanation: "Candidates [action]." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p2 + "\n\n**Q8.** (8) ____", options: ["communicate", "communication", "communicated", "communicates"], correctAnswer: "communicate", explanation: "After 'cannot'." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p2 + "\n\n**Q9.** (9) ____", options: ["good", "better", "best", "well"], correctAnswer: "better", explanation: "Followed by 'than'." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p2 + "\n\n**Q10.** (10) ____", options: ["with", "by", "through", "over"], correctAnswer: "through", explanation: "Growth happens through learning." },

    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p3 + "\n\n**Q11.** (11) ____", options: ["neglect", "neglects", "neglected", "neglecting"], correctAnswer: "neglect", explanation: "Plural subject 'they' + base form." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p3 + "\n\n**Q12.** (12) ____", options: ["more", "most", "much", "many"], correctAnswer: "more", explanation: "Comparison 'more ... than'." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p3 + "\n\n**Q13.** (13) ____", options: ["before", "after", "during", "between"], correctAnswer: "before", explanation: "Test before launch." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p3 + "\n\n**Q14.** (14) ____", options: ["make", "making", "made", "makes"], correctAnswer: "make", explanation: "After 'allow companies to'." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p3 + "\n\n**Q15.** (15) ____", options: ["increase", "increases", "increasing", "increased"], correctAnswer: "increases", explanation: "Singular subject 'strategy'." },

    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p4 + "\n\n**Q16.** (16) ____", options: ["steal", "to steal", "stealing", "stolen"], correctAnswer: "to steal", explanation: "Purpose infinitive." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p4 + "\n\n**Q17.** (17) ____", options: ["educate", "educating", "educated", "educates"], correctAnswer: "educating", explanation: "Parallel instruction." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p4 + "\n\n**Q18.** (18) ____", options: ["lead", "leading", "led", "leads"], correctAnswer: "lead", explanation: "After 'can'." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p4 + "\n\n**Q19.** (19) ____", options: ["much", "more", "most", "many"], correctAnswer: "more", explanation: "Comparative 'than'." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p4 + "\n\n**Q20.** (20) ____", options: ["alert", "alerts", "alerting", "alerted"], correctAnswer: "alert", explanation: "Adjective after 'remain'." },

    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p5 + "\n\n**Q21.** (21) ____", options: ["by", "with", "for", "through"], correctAnswer: "by", explanation: "Means of action." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p5 + "\n\n**Q22.** (22) ____", options: ["motivates", "motivate", "motivating", "motivated"], correctAnswer: "motivate", explanation: "Parallel to encourage." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p5 + "\n\n**Q23.** (23) ____", options: ["like", "as", "for", "into"], correctAnswer: "as", explanation: "View as opportunity." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p5 + "\n\n**Q24.** (24) ____", options: ["at", "on", "into", "over"], correctAnswer: "on", explanation: "Depends on." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Medium", questionText: p5 + "\n\n**Q25.** (25) ____", options: ["learning", "learn", "learned", "learns"], correctAnswer: "learning", explanation: "Gerund after stop." },

    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Hard", questionText: p6 + "\n\n**Q26.** (26) ____", options: ["in", "on", "at", "over"], correctAnswer: "on", explanation: "Rely on." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Hard", questionText: p6 + "\n\n**Q27.** (27) ____", options: ["interpreted", "interpreting", "interpret", "interprets"], correctAnswer: "interpreted", explanation: "Passive voice." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Hard", questionText: p6 + "\n\n**Q28.** (28) ____", options: ["but", "and", "although", "because"], correctAnswer: "and", explanation: "Additive conjunction." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Hard", questionText: p6 + "\n\n**Q29.** (29) ____", options: ["for", "to", "into", "with"], correctAnswer: "to", explanation: "Lead to." },
    { category: "Verbal Ability", topic: "Cloze Test", difficulty: "Hard", questionText: p6 + "\n\n**Q30.** (30) ____", options: ["maintain", "maintains", "maintained", "maintaining"], correctAnswer: "maintain", explanation: "Base verb in relative clause." }
];

const seedBatch45ClozeTest = async () => {
    try {
        console.log("🧹 Clearing old Cloze Test records...");
        await Question.deleteMany({ topic: "Cloze Test" }); 
        
        console.log(`🚀 Injecting ${batch45Questions.length} Questions...`);
        await Question.insertMany(batch45Questions);
        
        console.log(`✅ SUCCESS! All 30 Cloze Test Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch45ClozeTest();