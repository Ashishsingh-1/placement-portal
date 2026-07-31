const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Reading Comprehension Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const p1 = "**Passage 1 – Artificial Intelligence in Recruitment**\nMany multinational companies have adopted Artificial Intelligence (AI) to streamline recruitment. AI-based systems can analyze thousands of resumes within minutes, identify relevant skills, and shortlist suitable candidates. This significantly reduces the workload of recruiters and speeds up the hiring process.\n\nHowever, experts argue that AI systems may unintentionally inherit biases from historical recruitment data. If previous hiring decisions favored certain groups, AI models may continue the same pattern unless carefully monitored. Therefore, organizations are investing in explainable AI models that improve transparency and fairness while maintaining efficiency.";

const p2 = "**Passage 2 – Remote Work**\nRemote work became widely accepted after organizations realized that productivity depends more on outcomes than physical presence. Employees gained flexibility, while employers reduced infrastructure costs. Nevertheless, remote work also introduced challenges such as reduced collaboration, communication gaps, and employee isolation.\n\nExperts recommend hybrid work models where organizations combine remote flexibility with periodic office interactions. Such models attempt to maximize productivity while preserving teamwork and organizational culture.";

const p3 = "**Passage 3 – Cybersecurity**\nCybersecurity threats have become increasingly sophisticated due to rapid digital transformation. Organizations now face ransomware attacks, phishing attempts, insider threats, and data breaches on a regular basis. Experts emphasize that technology alone cannot solve cybersecurity problems; employee awareness and regular training are equally important.\n\nCompanies that invest in preventive measures often recover faster from attacks and suffer lower financial losses than organizations that react only after incidents occur.";

const p4 = "**Passage 4 – Startup Innovation**\nMany startups fail despite possessing technically superior products. Industry experts believe that understanding customer needs, market timing, pricing strategies, and execution often matter more than technological excellence alone. Successful startups continuously gather customer feedback and adapt quickly to changing market conditions.\n\nInnovation, therefore, should not be viewed as a one-time activity but as a continuous process driven by experimentation and learning.";

const p5 = "**Passage 5 – Data Analytics**\nModern organizations increasingly rely on data analytics to support strategic decisions. Instead of depending solely on intuition, managers now use statistical models and predictive analytics to identify trends, forecast demand, and optimize operations. However, data-driven decisions are effective only when the underlying data is accurate, relevant, and free from significant bias.\n\nExperts caution that excessive dependence on data without human judgment may result in overlooking factors that cannot be quantified, such as employee morale or organizational culture.";

const batch49Questions = [
    // ================== Passage 1 ==================
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Easy",
        questionText: p1 + "\n\n**Q1.** What is the primary purpose of using AI in recruitment?",
        options: ["Replacing interviewers completely", "Reducing recruitment time", "Eliminating technical interviews", "Increasing employee salaries"], 
        correctAnswer: "Reducing recruitment time",
        explanation: "The passage explicitly states that AI speeds up the hiring process and reduces workload."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p1 + "\n\n**Q2.** According to the passage, AI may become biased because",
        options: ["recruiters dislike AI", "historical hiring data may contain bias", "candidates manipulate resumes", "AI cannot process resumes"], 
        correctAnswer: "historical hiring data may contain bias",
        explanation: "The text mentions AI systems may unintentionally inherit biases from historical recruitment data."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p1 + "\n\n**Q3.** The word streamline most nearly means",
        options: ["Complicate", "Simplify and improve efficiency", "Delay", "Eliminate"], 
        correctAnswer: "Simplify and improve efficiency",
        explanation: "Streamline means to make a process more efficient by simplifying it."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p1 + "\n\n**Q4.** Which statement is TRUE?",
        options: ["AI guarantees unbiased recruitment.", "AI always rejects experienced candidates.", "Explainable AI improves transparency.", "Companies are abandoning AI."], 
        correctAnswer: "Explainable AI improves transparency.",
        explanation: "The passage states organizations invest in explainable AI models that improve transparency and fairness."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Hard",
        questionText: p1 + "\n\n**Q5.** The tone of the passage is",
        options: ["Emotional", "Analytical", "Humorous", "Critical"], 
        correctAnswer: "Analytical",
        explanation: "The author objectively examines both the benefits and the potential flaws of AI in recruitment."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p1 + "\n\n**Q6.** The author mainly emphasizes",
        options: ["AI should replace humans entirely.", "AI offers benefits but requires responsible implementation.", "Recruitment should become manual.", "AI cannot improve hiring."], 
        correctAnswer: "AI offers benefits but requires responsible implementation.",
        explanation: "The passage balances the advantages of AI with the need for careful monitoring and transparency."
    },

    // ================== Passage 2 ==================
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Easy",
        questionText: p2 + "\n\n**Q7.** The passage mainly discusses",
        options: ["Office construction", "Remote and hybrid work", "Salary structures", "Internet technology"], 
        correctAnswer: "Remote and hybrid work",
        explanation: "The passage talks about the pros and cons of remote work and suggests hybrid models as a solution."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Easy",
        questionText: p2 + "\n\n**Q8.** According to the passage, remote work increased",
        options: ["Infrastructure costs", "Flexibility", "Office attendance", "Supervision"], 
        correctAnswer: "Flexibility",
        explanation: "The passage directly states that 'Employees gained flexibility'."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p2 + "\n\n**Q9.** Which challenge is NOT mentioned?",
        options: ["Communication gaps", "Isolation", "Reduced collaboration", "Increased taxation"], 
        correctAnswer: "Increased taxation",
        explanation: "Taxation is never mentioned in the passage as a challenge of remote work."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p2 + "\n\n**Q10.** The suggested solution is",
        options: ["Permanent office work", "Hybrid work", "Eliminate meetings", "Reduce employees"], 
        correctAnswer: "Hybrid work",
        explanation: "Experts recommend hybrid work models to balance flexibility and teamwork."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Hard",
        questionText: p2 + "\n\n**Q11.** The author's attitude is",
        options: ["Balanced", "Negative", "Biased", "Emotional"], 
        correctAnswer: "Balanced",
        explanation: "The author points out both the positive aspects and the challenges of remote work fairly."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p2 + "\n\n**Q12.** The word preserving means",
        options: ["Destroying", "Maintaining", "Ignoring", "Replacing"], 
        correctAnswer: "Maintaining",
        explanation: "Preserving means to keep something in its original state or in good condition."
    },

    // ================== Passage 3 ==================
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Easy",
        questionText: p3 + "\n\n**Q13.** The passage mainly focuses on",
        options: ["Mobile applications", "Cybersecurity challenges", "Programming languages", "Software testing"], 
        correctAnswer: "Cybersecurity challenges",
        explanation: "The entire passage discusses cybersecurity threats and how to prevent them."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p3 + "\n\n**Q14.** According to the author, cybersecurity depends on",
        options: ["Only antivirus software", "Technology and employee awareness", "Firewalls only", "Government policies only"], 
        correctAnswer: "Technology and employee awareness",
        explanation: "The passage states that technology alone isn't enough; employee awareness and training are equally important."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p3 + "\n\n**Q15.** The word sophisticated means",
        options: ["Simple", "Advanced", "Weak", "Cheap"], 
        correctAnswer: "Advanced",
        explanation: "In this context, sophisticated refers to threats that are highly developed and complex."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p3 + "\n\n**Q16.** Preventive measures help organizations",
        options: ["Increase taxes", "Recover faster", "Eliminate computers", "Reduce hiring"], 
        correctAnswer: "Recover faster",
        explanation: "The text says companies investing in preventive measures often recover faster from attacks."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Hard",
        questionText: p3 + "\n\n**Q17.** The tone is",
        options: ["Informative", "Sarcastic", "Comic", "Personal"], 
        correctAnswer: "Informative",
        explanation: "The passage provides factual information and expert advice regarding cybersecurity."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p3 + "\n\n**Q18.** Which statement is FALSE?",
        options: ["Insider threats exist.", "Employee training matters.", "Technology alone is sufficient.", "Preventive measures reduce losses."], 
        correctAnswer: "Technology alone is sufficient.",
        explanation: "The passage explicitly states that technology alone cannot solve cybersecurity problems."
    },

    // ================== Passage 4 ==================
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p4 + "\n\n**Q19.** Why do many startups fail?",
        options: ["Lack of technology", "Poor customer understanding and execution", "Lack of employees", "Government regulations"], 
        correctAnswer: "Poor customer understanding and execution",
        explanation: "The text states that understanding customer needs and execution often matter more than technology alone."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Easy",
        questionText: p4 + "\n\n**Q20.** Successful startups continuously",
        options: ["Ignore customers", "Collect customer feedback", "Reduce innovation", "Stop experimenting"], 
        correctAnswer: "Collect customer feedback",
        explanation: "The passage says successful startups continuously gather customer feedback."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p4 + "\n\n**Q21.** Innovation is described as",
        options: ["A single event", "A continuous process", "An expensive activity", "A marketing strategy"], 
        correctAnswer: "A continuous process",
        explanation: "Innovation should be viewed as a continuous process driven by experimentation and learning."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Hard",
        questionText: p4 + "\n\n**Q22.** The author's tone is",
        options: ["Advisory", "Emotional", "Humorous", "Angry"], 
        correctAnswer: "Advisory",
        explanation: "The author is giving advice on how startups should approach innovation and execution."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p4 + "\n\n**Q23.** The word execution most nearly means",
        options: ["Planning only", "Effective implementation", "Punishment", "Advertising"], 
        correctAnswer: "Effective implementation",
        explanation: "In a business context, execution refers to putting a plan or idea into action successfully."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Hard",
        questionText: p4 + "\n\n**Q24.** Which statement best summarizes the passage?",
        options: ["Technology alone guarantees success.", "Customer-focused execution drives startup success.", "Innovation is unnecessary.", "Marketing is irrelevant."], 
        correctAnswer: "Customer-focused execution drives startup success.",
        explanation: "The main theme is that execution and customer feedback are more crucial than just having good technology."
    },

    // ================== Passage 5 ==================
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Easy",
        questionText: p5 + "\n\n**Q25.** What is the primary purpose of data analytics?",
        options: ["Entertainment", "Supporting strategic decisions", "Hiring employees", "Website development"], 
        correctAnswer: "Supporting strategic decisions",
        explanation: "The passage begins by stating organizations rely on data analytics to support strategic decisions."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p5 + "\n\n**Q26.** According to the passage, data-driven decisions require",
        options: ["Large databases only", "Accurate and relevant data", "Expensive software only", "Artificial Intelligence only"], 
        correctAnswer: "Accurate and relevant data",
        explanation: "The text says data-driven decisions are effective only when the data is accurate, relevant, and unbiased."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p5 + "\n\n**Q27.** The word optimize most nearly means",
        options: ["Worsen", "Improve efficiently", "Delay", "Eliminate"], 
        correctAnswer: "Improve efficiently",
        explanation: "To optimize means to make the best or most effective use of a situation or resource."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Medium",
        questionText: p5 + "\n\n**Q28.** The author warns against",
        options: ["Using computers", "Blind dependence on data alone", "Statistical analysis", "Business forecasting"], 
        correctAnswer: "Blind dependence on data alone",
        explanation: "Experts caution against excessive dependence on data without human judgment."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Hard",
        questionText: p5 + "\n\n**Q29.** The tone of the passage is",
        options: ["Objective", "Emotional", "Humorous", "Satirical"], 
        correctAnswer: "Objective",
        explanation: "The passage presents facts about data analytics impartially without personal feelings."
    },
    {
        category: "Verbal Ability", topic: "Reading Comprehension", difficulty: "Hard",
        questionText: p5 + "\n\n**Q30 (Ultra Tough).** Which statement best reflects the central idea?",
        options: ["Human judgment and quality data should complement each other.", "Managers should never trust data.", "Predictive analytics always fails.", "Organizational culture is measurable through statistics alone."], 
        correctAnswer: "Human judgment and quality data should complement each other.",
        explanation: "The passage highlights the usefulness of data while warning that human judgment is still essential."
    }
];

const seedBatch49ReadingComprehension = async () => {
    try {
        console.log("🧹 Clearing old Reading Comprehension records...");
        await Question.deleteMany({ topic: "Reading Comprehension" }); 
        
        console.log(`🚀 Injecting ${batch49Questions.length} Questions with exact matches...`);
        await Question.insertMany(batch49Questions);
        
        console.log(`✅ SUCCESS! All 30 Reading Comprehension Questions Seeded perfectly.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch49ReadingComprehension();