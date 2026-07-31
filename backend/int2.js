const mongoose = require('mongoose');
const InterviewQuestion = require('./models/InterviewQuestion'); 
require('dotenv').config();

const mrQuestionsData = [
    // ==========================================
    // 🧠 MR: Leadership & Ownership
    // ==========================================
    { roundType: 'MR', questionText: 'Tell me about a time when you took complete ownership of a project.', explanation: 'Candidate should use the STAR method to describe end-to-end accountability, from initial planning to final delivery, ideally referencing a project from their resume.' },
    { roundType: 'MR', questionText: 'Describe a situation where you led a team without having formal authority.', explanation: 'Candidate must highlight influence, collaboration, and guiding peers through expertise and trust rather than bossing them around.' },
    { roundType: 'MR', questionText: 'What would you do if your team consistently missed deadlines?', explanation: 'Candidate should focus on identifying root causes (bottlenecks, resource lack, unclear requirements) rather than just punishing the team. Mention Agile/scrum adjustments if applicable.' },
    { roundType: 'MR', questionText: 'How do you divide work among team members?', explanation: 'Candidate should explain delegating based on individual strengths, current workload, and growth opportunities, ensuring clear communication of expectations.' },
    { roundType: 'MR', questionText: 'How do you motivate a team member who is not performing?', explanation: 'Candidate should suggest a private 1-on-1 meeting to understand personal or technical blockers, offer support/training, and set clear, achievable goals.' },
    { roundType: 'MR', questionText: 'Tell me about a time when you made a difficult decision as a leader.', explanation: 'Candidate must show data-driven decision making, weighing pros and cons, and taking responsibility for a tough call (e.g., cutting a feature to meet a deadline).' },
    { roundType: 'MR', questionText: 'What would you do if your team disagreed with your decision?', explanation: 'Candidate should encourage open dialogue, listen to their concerns, explain the "why" behind the decision with data, and build consensus.' },
    { roundType: 'MR', questionText: 'How do you handle a team member who takes credit for your work?', explanation: 'Candidate should show emotional intelligence by addressing it professionally in private, and ensuring future work is well-documented and visible to stakeholders.' },
    { roundType: 'MR', questionText: 'Have you ever failed as a leader? What did you learn?', explanation: 'Candidate must show extreme ownership, admitting a mistake (e.g., poor delegation, miscommunication) and explaining the framework they built to prevent it.' },
    { roundType: 'MR', questionText: 'What is more important: being liked by your team or being respected?', explanation: 'Candidate should ideally choose respect, explaining that tough, fair decisions earn respect and drive results, which ultimately builds a healthy team culture.' },

    // ==========================================
    // ⚔️ MR: Conflict & Team Management
    // ==========================================
    { roundType: 'MR', questionText: 'Tell me about a serious conflict you had with a teammate.', explanation: 'Candidate should avoid playing the victim. Must explain how they used empathy, active listening, and compromise to solve a professional disagreement.' },
    { roundType: 'MR', questionText: 'What would you do if two team members were constantly fighting?', explanation: 'Candidate should act as a mediator, separating personal issues from professional ones, and aligning both members toward the common project goal.' },
    { roundType: 'MR', questionText: 'What if your teammate is not contributing but wants equal credit?', explanation: 'Candidate should discuss holding a direct conversation about accountability, tracking task assignments clearly (e.g., Jira), and escalating to management only if unresolved.' },
    { roundType: 'MR', questionText: 'What would you do if your manager and teammate gave you conflicting instructions?', explanation: 'Candidate should bring both parties together for a quick sync to clarify priorities, ensuring everyone is aligned on the business goal.' },
    { roundType: 'MR', questionText: 'How do you handle criticism from your team members?', explanation: 'Candidate must show a growth mindset, thanking the team for feedback, objectively analyzing it, and taking actionable steps to improve.' },
    { roundType: 'MR', questionText: 'What would you do if a senior team member was performing poorly?', explanation: 'Candidate should approach them with respect, asking if they need help or are blocked, rather than directly criticizing their seniority.' },
    { roundType: 'MR', questionText: 'What if your team rejects your idea?', explanation: 'Candidate should not take it personally. They should ask for constructive feedback, understand the flaws in their idea, and support the team’s chosen direction.' },
    { roundType: 'MR', questionText: 'How do you deal with someone who is difficult to work with?', explanation: 'Candidate should focus on maintaining professionalism, setting clear boundaries, and communicating exclusively through documented channels if necessary.' },
    { roundType: 'MR', questionText: 'What would you do if a teammate made a serious mistake?', explanation: 'Candidate should focus on fixing the problem first as a team (blame-free culture), and later discussing how to improve the process to prevent it.' },
    { roundType: 'MR', questionText: 'Have you ever disagreed with your manager? What did you do?', explanation: 'Candidate should explain how they presented their counter-argument with data/logic privately, but ultimately committed fully once the manager made the final call.' },

    // ==========================================
    // ⏱️ MR: Pressure, Deadlines & Priorities
    // ==========================================
    { roundType: 'MR', questionText: 'You have three urgent tasks and only enough time for one. What do you do?', explanation: 'Candidate should mention prioritization frameworks (e.g., Eisenhower Matrix), evaluating business impact vs urgency, and communicating with stakeholders.' },
    { roundType: 'MR', questionText: 'What would you do if you knew your team would miss an important deadline?', explanation: 'Candidate MUST emphasize early communication. Inform stakeholders immediately, propose a revised timeline, or suggest cutting non-critical features.' },
    { roundType: 'MR', questionText: 'How do you prioritize tasks when everything seems urgent?', explanation: 'Candidate should explain consulting with the product owner/manager to align on business value, and breaking tasks into smaller, manageable milestones.' },
    { roundType: 'MR', questionText: 'What would you do if your manager assigns you a new task near the deadline?', explanation: 'Candidate should transparently explain their current bandwidth and ask the manager to help reprioritize the existing tasks to accommodate the new one.' },
    { roundType: 'MR', questionText: 'How do you work under extreme pressure?', explanation: 'Candidate should describe their coping mechanism: breaking problems down, avoiding panic, staying organized, and asking for help when needed.' },
    { roundType: 'MR', questionText: 'Tell me about a time you delivered results with limited resources.', explanation: 'Candidate should highlight creativity, optimizing existing tools, and focusing strictly on the MVP (Minimum Viable Product) to deliver value.' },
    { roundType: 'MR', questionText: 'What would you do if requirements changed at the last moment?', explanation: 'Candidate should show Agile adaptability. Assess the impact of the change, communicate the delay it will cause, and execute without frustration.' },
    { roundType: 'MR', questionText: 'How do you handle multiple projects simultaneously?', explanation: 'Candidate should mention context-switching strategies, using project management tools (Jira, Trello), and blocking calendar time for deep work.' },
    { roundType: 'MR', questionText: 'What would you do if you made a mistake one day before deployment?', explanation: 'Candidate must take immediate ownership, alert the team, propose a rollback or hotfix strategy, and work extra hours to resolve it safely.' },
    { roundType: 'MR', questionText: 'Would you sacrifice quality to meet a deadline?', explanation: 'Candidate should explain that while perfection is the enemy of good, core functionality and security can never be sacrificed. Non-critical bugs can be documented for later.' },

    // ==========================================
    // 💻 MR: Technical Project & Problem-Solving
    // ==========================================
    { roundType: 'MR', questionText: 'Explain the most difficult technical problem you have solved.', explanation: 'Candidate should explain the problem clearly, the technical approach they took, and the business impact, ensuring they tie it back to a resume project.' },
    { roundType: 'MR', questionText: 'Tell me about a project that failed or did not go as planned.', explanation: 'Candidate should focus on the post-mortem analysis. What went wrong (architecture, scaling, planning) and how they applied that lesson to future projects.' },
    { roundType: 'MR', questionText: 'What was your exact contribution to your project?', explanation: 'Candidate must use "I" instead of "We", clearly defining the modules, architecture, or features they personally coded or managed.' },
    { roundType: 'MR', questionText: 'How do you prove that you actually worked on the project mentioned in your resume?', explanation: 'Candidate should confidently offer to explain the specific database schema, architectural decisions, debugging challenges, or share the GitHub repo.' },
    { roundType: 'MR', questionText: 'What would you improve in your best project if you had more time?', explanation: 'Candidate should show critical thinking, mentioning scalable architecture (microservices), better test coverage, or CI/CD pipelines.' },
    { roundType: 'MR', questionText: 'Why did you choose your technology stack?', explanation: 'Candidate must justify the stack based on project requirements (e.g., Node for async I/O, React for dynamic UI) rather than just saying "because I knew it".' },
    { roundType: 'MR', questionText: 'What was the biggest technical decision you made in your project?', explanation: 'Candidate should mention a choice like Database selection (SQL vs NoSQL), state management, or deployment strategy, and explain the trade-offs.' },
    { roundType: 'MR', questionText: 'How do you handle a problem when you don’t know the solution?', explanation: 'Candidate should outline a troubleshooting process: reading docs, isolating the bug, searching StackOverflow/GitHub issues, and eventually asking a senior.' },
    { roundType: 'MR', questionText: 'What would you do if your technical approach was rejected by your senior?', explanation: 'Candidate should show willingness to learn, asking the senior to explain the flaws in their approach and adopting the better, scalable solution.' },
    { roundType: 'MR', questionText: 'How do you balance technical perfection with business requirements?', explanation: 'Candidate should acknowledge that delivering business value on time is the priority. Technical debt can be incurred knowingly and paid off in future sprints.' },

    // ==========================================
    // 🔥 MR: High-Level Managerial Trap Questions
    // ==========================================
    { roundType: 'MR', questionText: 'Why should I trust you with an important responsibility?', explanation: 'Candidate should point to a track record of reliability, extreme ownership, and proactive communication mentioned in their resume.' },
    { roundType: 'MR', questionText: 'What would you do if your manager takes credit for your work?', explanation: 'Candidate should handle it diplomatically. Mention keeping a paper trail of contributions, and focusing on team success while ensuring visibility with skip-level managers.' },
    { roundType: 'MR', questionText: 'What would you do if you discover that your teammate is hiding a serious mistake?', explanation: 'Candidate must prioritize company safety. Encourage the teammate to confess, but escalate it to management immediately if it risks the project or client.' },
    { roundType: 'MR', questionText: 'If your best friend in the team is underperforming, how would you handle it?', explanation: 'Candidate should draw a strict line between personal and professional life. Have an honest feedback session, but hold them to the same standard as anyone else.' },
    { roundType: 'MR', questionText: 'What would you do if you strongly disagree with a company decision?', explanation: 'Candidate should express disagreement through proper internal channels with data, but if it doesn’t violate ethics, commit to executing the company’s vision.' },
    { roundType: 'MR', questionText: 'If you are made a manager tomorrow, what is the first thing you would change?', explanation: 'Candidate should avoid arrogant answers. They should say they would first spend time observing, conducting 1-on-1s, and understanding the current processes before changing anything.' },
    { roundType: 'MR', questionText: 'What is your biggest weakness as a team member?', explanation: 'Candidate should mention a collaborative weakness (e.g., struggling to delegate, taking on too much work) and how they use tools/communication to fix it.' },
    { roundType: 'MR', questionText: 'Tell me about a decision you made that you later regretted.', explanation: 'Candidate must show vulnerability and growth. Mention a bad technical or planning choice, the consequences, and the exact lesson learned.' },
    { roundType: 'MR', questionText: 'What would you do if you were asked to work on a technology you don’t like?', explanation: 'Candidate should demonstrate a language-agnostic mindset. As an engineer, the goal is solving problems, and technology is just a tool.' },
    { roundType: 'MR', questionText: 'Why should we select you for this role over other candidates?', explanation: 'Candidate should weave their technical capability, proven leadership (referencing resume), and strong cultural fit into a confident closing statement.' }
];

// 🔥 DATABASE INJECTION LOGIC 🔥
const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/interview_db');
        
        console.log('🔄 Database connected. Cleaning up OLD MR questions only...');
        
        // 🔥 SIRF MR ROUND KE QUESTIONS DELETE HONGE (Tere HR safe rahenge) 🔥
        await InterviewQuestion.deleteMany({ roundType: 'MR' }); 
        
        console.log(`⏳ Injecting ${mrQuestionsData.length} new MR questions...`);
        await InterviewQuestion.insertMany(mrQuestionsData); 
        
        console.log('✅ Success! All 50 MR questions injected perfectly.');
        process.exit(); 
    } catch (err) {
        console.error('❌ Error during seeding:', err);
        process.exit(1);
    }
};

seedDatabase();