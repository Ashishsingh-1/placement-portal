const mongoose = require('mongoose');
const InterviewQuestion = require('./models/InterviewQuestion'); // Apna path verify kar lena
require('dotenv').config();

const questionsData = [
    // ==========================================
    // 🧠 1. Self-Introduction & Personality
    // ==========================================
    {
        roundType: 'HR',
        questionText: 'Tell me about yourself.',
        explanation: 'Candidate should provide a concise professional summary, highlighting relevant skills, past experiences, and how their background aligns with this specific role. Avoid overly personal details.'
    },
    {
        roundType: 'HR',
        questionText: 'Walk me through your resume.',
        explanation: 'Candidate must logically summarize their career or academic timeline, focusing on major milestones, impact, and growth rather than just reading bullet points aloud.'
    },
    {
        roundType: 'HR',
        questionText: 'What makes you different from other candidates?',
        explanation: 'Candidate should highlight a unique combination of hard skills, soft skills, or a specific standout achievement that brings direct value to the company.'
    },
    {
        roundType: 'HR',
        questionText: 'What is your biggest strength? Give a real example.',
        explanation: 'Candidate must state a relevant professional strength and back it up strictly using a real-world example (preferably using the STAR method).'
    },
    {
        roundType: 'HR',
        questionText: 'What is your biggest weakness, and what are you doing to improve it?',
        explanation: 'Candidate should mention a genuine, manageable professional weakness and focus heavily on the actionable steps they are actively taking to overcome it.'
    },
    {
        roundType: 'HR',
        questionText: 'How would your friends, teachers, or teammates describe you?',
        explanation: 'Candidate should mention positive collaborative traits (e.g., reliable, problem-solver, adaptable) and ideally provide a brief context or example.'
    },
    {
        roundType: 'HR',
        questionText: 'What is one thing about you that is not mentioned in your resume?',
        explanation: 'Candidate should share a positive personal trait, a relevant hobby, or a soft skill that showcases their personality, drive, or cultural fit.'
    },
    {
        roundType: 'HR',
        questionText: 'What achievement are you most proud of and why?',
        explanation: 'Candidate should describe a significant professional or academic milestone, explaining the effort required and the impact it created.'
    },
    {
        roundType: 'HR',
        questionText: 'Tell me about a failure that taught you something important.',
        explanation: 'Candidate must take accountability for a past mistake without blaming others, and clearly articulate the specific lesson learned and how they apply it now.'
    },
    {
        roundType: 'HR',
        questionText: 'What motivates you to perform better?',
        explanation: 'Candidate should mention intrinsic or extrinsic professional motivators (e.g., solving complex problems, learning new tech, making an impact) rather than just money.'
    },

    // ==========================================
    // 💼 2. Tough Behavioral Questions
    // ==========================================
    {
        roundType: 'HR',
        questionText: 'Tell me about a time when you failed. What did you learn?',
        explanation: 'Candidate must use the STAR method to describe a specific failure, accept responsibility, and explain the corrective actions they took to prevent it from happening again.'
    },
    {
        roundType: 'HR',
        questionText: 'Tell me about a conflict you had with a teammate. How did you resolve it?',
        explanation: 'Candidate should demonstrate emotional intelligence, active listening, and a collaborative approach to resolving disagreements without getting defensive or toxic.'
    },
    {
        roundType: 'HR',
        questionText: 'Tell me about a time when you disagreed with your senior or team leader.',
        explanation: 'Candidate should explain how they communicated their disagreement respectfully, backed their perspective with data/logic, and ultimately respected authority if the decision went the other way.'
    },
    {
        roundType: 'HR',
        questionText: 'Describe a situation where you had to work under extreme pressure.',
        explanation: 'Candidate must show resilience, prioritization skills, and the ability to maintain quality and composure when deadlines or stakes were high.'
    },
    {
        roundType: 'HR',
        questionText: 'Tell me about a time when you made a mistake.',
        explanation: 'Candidate needs to show ownership of the error, the immediate steps taken to mitigate damage, and the system they put in place to avoid repeating it.'
    },
    {
        roundType: 'HR',
        questionText: 'Tell me about a time when you took initiative without being asked.',
        explanation: 'Candidate should provide an example of proactive problem-solving, going above and beyond their assigned role to improve a process or help the team.'
    },
    {
        roundType: 'HR',
        questionText: 'Describe a situation where you had to meet a very tight deadline.',
        explanation: 'Candidate should detail their time-management strategy, how they prioritized critical tasks, and if they successfully communicated status updates to stakeholders.'
    },
    {
        roundType: 'HR',
        questionText: 'Tell me about a time you received negative feedback. How did you react?',
        explanation: 'Candidate must show maturity, an open mind to constructive criticism, and a clear example of how they practically implemented the feedback to improve.'
    },
    {
        roundType: 'HR',
        questionText: 'Tell me about a difficult decision you had to make.',
        explanation: 'Candidate should explain their decision-making framework (analyzing pros/cons, consulting others, data-driven choice) and stand by the outcome.'
    },
    {
        roundType: 'HR',
        questionText: 'Describe a time when you had to convince someone who disagreed with you.',
        explanation: 'Candidate should demonstrate strong persuasion and negotiation skills, using empathy, facts, and logical reasoning to achieve consensus.'
    },

    // ==========================================
    // 🎯 3. Career & Company Questions
    // ==========================================
    {
        roundType: 'HR',
        questionText: 'Why should we hire you?',
        explanation: 'Candidate must connect their specific skills and past achievements directly to the needs and goals of this particular role and company.'
    },
    {
        roundType: 'HR',
        questionText: 'Why do you want to join our company?',
        explanation: 'Candidate should demonstrate they have researched the company (products, culture, recent news) and explain why it aligns with their professional values.'
    },
    {
        roundType: 'HR',
        questionText: 'Why this role?',
        explanation: 'Candidate must articulate a clear understanding of the job description and express genuine passion for the day-to-day responsibilities involved.'
    },
    {
        roundType: 'HR',
        questionText: 'Why should we choose you over a candidate with more experience?',
        explanation: 'Candidate should pivot to their high adaptability, fast learning curve, modern skill set, or exceptional drive and dedication.'
    },
    {
        roundType: 'HR',
        questionText: 'Where do you see yourself in 5 years?',
        explanation: 'Candidate should express realistic ambition, a desire to grow within the company or industry, and continuous learning, avoiding statements about leaving the company quickly.'
    },
    {
        roundType: 'HR',
        questionText: 'What are your short-term and long-term career goals?',
        explanation: 'Candidate should outline immediate goals (mastering the current role) and long-term goals (leadership or deep expertise) that make sense for this career path.'
    },
    {
        roundType: 'HR',
        questionText: 'What do you know about our company?',
        explanation: 'Candidate must provide accurate details about the company’s core business, recent milestones, competitors, or values to prove their genuine interest.'
    },
    {
        roundType: 'HR',
        questionText: 'Why do you want to leave your current job?',
        explanation: 'Candidate must remain professional and positive (no badmouthing the current employer) and focus on seeking new challenges, growth, or better alignment.'
    },
    {
        roundType: 'HR',
        questionText: 'What are your salary expectations?',
        explanation: 'Candidate should provide a well-researched, realistic range or express willingness to negotiate based on the total compensation package.'
    },
    {
        roundType: 'HR',
        questionText: 'If we offer you a lower salary than expected, what will you do?',
        explanation: 'Candidate should show flexibility, asking about other benefits (growth, stock, bonuses, learning opportunities) before making a hard decision.'
    },

    // ==========================================
    // ⚠️ 4. High-Level Trap Questions
    // ==========================================
    {
        roundType: 'HR',
        questionText: 'Why should we not hire you?',
        explanation: 'Candidate should confidently flip this trap by mentioning a trait that might not fit a different environment, but is perfect for this one, or politely state they believe they are a strong fit.'
    },
    {
        roundType: 'HR',
        questionText: 'What would you do if you received a better offer after joining us?',
        explanation: 'Candidate should emphasize integrity, commitment, and loyalty, stating that once they commit to a team, they honor that commitment.'
    },
    {
        roundType: 'HR',
        questionText: 'If you get selected by both our company and your dream company, which one will you choose?',
        explanation: 'Candidate should diplomatically explain why THIS company practically aligns better with their current career goals, showing logical decision-making over blind emotion.'
    },
    {
        roundType: 'HR',
        questionText: 'Are you willing to relocate?',
        explanation: 'Candidate should give a clear, honest answer regarding their flexibility, showing enthusiasm for the role regardless of location logistics.'
    },
    {
        roundType: 'HR',
        questionText: 'Are you willing to work night shifts or flexible shifts?',
        explanation: 'Candidate should be honest about their boundaries but ideally show flexibility and dedication to meeting critical project deadlines if required occasionally.'
    },
    {
        roundType: 'HR',
        questionText: 'What would you do if your manager asks you to do something you disagree with?',
        explanation: 'Candidate should state they would voice their concerns politely with logic/data, but ultimately commit to executing the manager’s final decision professionally.'
    },
    {
        roundType: 'HR',
        questionText: 'What would you do if your teammate takes credit for your work?',
        explanation: 'Candidate should demonstrate conflict resolution by having a private, professional conversation with the teammate, and ensuring future work is visibly documented.'
    },
    {
        roundType: 'HR',
        questionText: 'What would you do if you realize your manager is making a wrong decision?',
        explanation: 'Candidate should show tact by addressing the issue privately, presenting data to show the risk, but respecting the chain of command.'
    },
    {
        roundType: 'HR',
        questionText: 'If you are assigned work outside your skill set, how will you handle it?',
        explanation: 'Candidate should express enthusiasm for learning, a proactive approach to researching the new topic, and knowing when to ask for help.'
    },
    {
        roundType: 'HR',
        questionText: 'What would you do if you are not promoted for several years?',
        explanation: 'Candidate should focus on self-reflection, seeking constructive feedback from management, and focusing on skill enhancement rather than expressing entitlement or anger.'
    },

    // ==========================================
    // 🔥 5. Extremely Tough & Frequently Asked
    // ==========================================
    {
        roundType: 'HR',
        questionText: 'What is the biggest misconception people have about you?',
        explanation: 'Candidate should show high self-awareness, explaining a trait that is often misunderstood (e.g., being quiet means lacking confidence) and how they correct it.'
    },
    {
        roundType: 'HR',
        questionText: 'What is one opinion you strongly hold that most people disagree with?',
        explanation: 'Candidate should provide a safe, professional opinion (e.g., a specific approach to coding or team management) to show independent critical thinking without being highly controversial.'
    },
    {
        roundType: 'HR',
        questionText: 'What would you do if you were given a task with no instructions?',
        explanation: 'Candidate should demonstrate autonomy by explaining how they would gather requirements, research, create a draft, and seek feedback to ensure alignment.'
    },
    {
        roundType: 'HR',
        questionText: 'If you could change one thing about yourself, what would it be?',
        explanation: 'Candidate should highlight a minor professional flaw and frame it constructively, showing a growth mindset.'
    },
    {
        roundType: 'HR',
        questionText: 'What is the biggest risk you have ever taken?',
        explanation: 'Candidate should describe a calculated risk (e.g., changing career paths, taking on a complex project) and evaluate the outcome and lessons learned.'
    },
    {
        roundType: 'HR',
        questionText: 'What would you do if you knew you were going to miss a deadline?',
        explanation: 'Candidate must emphasize early communication to stakeholders, proposing a revised timeline or scope reduction, and never hiding the delay.'
    },
    {
        roundType: 'HR',
        questionText: 'Tell me about a time when you had to learn something very quickly.',
        explanation: 'Candidate should demonstrate high adaptability and a clear learning framework (e.g., reading docs, building a POC, asking targeted questions).'
    },
    {
        roundType: 'HR',
        questionText: 'What is more important: hard work or smart work? Why?',
        explanation: 'Candidate should ideally balance both: smart work for efficiency and planning, and hard work for execution and perseverance.'
    },
    {
        roundType: 'HR',
        questionText: 'If we reject you today, what will you do next?',
        explanation: 'Candidate should show resilience and a growth mindset, stating they would ask for feedback, improve their weak areas, and continue pursuing their career goals.'
    },
    {
        roundType: 'HR',
        questionText: 'Do you have any questions for us?',
        explanation: 'Candidate MUST ask insightful questions about the company culture, tech stack, team structure, or expectations for the role to demonstrate genuine interest.'
    }
];

// 🔥 DATABASE ME INJECT KARNE KA LOGIC 🔥
const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interview_db');
        
        console.log('🔄 Database connected. Clearing old AI Interview questions...');
        // Sirf naye 'InterviewQuestion' collection ko clean karega, purane MCQ safe rahenge!
        await InterviewQuestion.deleteMany(); 
        
        console.log(`⏳ Injecting ${questionsData.length} new HR questions...`);
        await InterviewQuestion.insertMany(questionsData); 
        
        console.log('✅ Success! All 50 HR questions injected perfectly.');
        process.exit(); 
    } catch (err) {
        console.error('❌ Error during seeding:', err);
        process.exit(1);
    }
};

seedDatabase();