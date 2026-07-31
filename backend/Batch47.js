const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Active/Passive Voice Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch48Questions = [
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Easy",
        questionText: "**Q1.** Choose the correct passive voice.\nThe software engineer developed the application.",
        options: ["The application developed by the software engineer.", "The application was developed by the software engineer.", "The application is developed by the software engineer.", "The application had developed by the software engineer."], 
        correctAnswer: "The application was developed by the software engineer.",
        explanation: "Simple past tense 'developed' changes to 'was developed' in the passive structure."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Easy",
        questionText: "**Q2.** Choose the correct passive voice.\nThe HR manager will announce the results tomorrow.",
        options: ["The results will announce tomorrow.", "The results will be announced tomorrow by the HR manager.", "The results are announced tomorrow.", "The results were announced tomorrow."], 
        correctAnswer: "The results will be announced tomorrow by the HR manager.",
        explanation: "The future tense 'will announce' changes to 'will be announced'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q3.** Choose the correct passive voice.\nThey have completed the security audit.",
        options: ["The security audit has been completed by them.", "The security audit had been completed.", "The security audit was completed.", "The security audit is completed."], 
        correctAnswer: "The security audit has been completed by them.",
        explanation: "Present perfect 'have completed' changes to 'has been completed'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Easy",
        questionText: "**Q4.** Choose the correct passive voice.\nThe interviewer asked several technical questions.",
        options: ["Several technical questions were asked by the interviewer.", "Several technical questions have asked.", "Several technical questions asked.", "Several technical questions are asked."], 
        correctAnswer: "Several technical questions were asked by the interviewer.",
        explanation: "Simple past 'asked' changes to 'were asked' because the object 'questions' is plural."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q5.** Choose the correct passive voice.\nThe company is launching a new AI platform.",
        options: ["A new AI platform is being launched by the company.", "A new AI platform was launched.", "A new AI platform has launched.", "A new AI platform launches."], 
        correctAnswer: "A new AI platform is being launched by the company.",
        explanation: "Present continuous 'is launching' changes to 'is being launched'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q6.** Choose the correct passive voice.\nThe developers were fixing the production bug.",
        options: ["The production bug was being fixed by the developers.", "The production bug has been fixed.", "The production bug is fixed.", "The production bug fixed."], 
        correctAnswer: "The production bug was being fixed by the developers.",
        explanation: "Past continuous 'were fixing' changes to 'was being fixed'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q7.** Choose the correct passive voice.\nThe client had approved the proposal before the meeting.",
        options: ["The proposal had been approved by the client before the meeting.", "The proposal has approved.", "The proposal was approved before the meeting.", "The proposal is approved."], 
        correctAnswer: "The proposal had been approved by the client before the meeting.",
        explanation: "Past perfect 'had approved' changes to 'had been approved'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q8.** Choose the correct passive voice.\nThe QA team can detect security vulnerabilities.",
        options: ["Security vulnerabilities can be detected by the QA team.", "Security vulnerabilities could detect.", "Security vulnerabilities detect.", "Security vulnerabilities have detected."], 
        correctAnswer: "Security vulnerabilities can be detected by the QA team.",
        explanation: "Modals like 'can' are followed by 'be' and the past participle ('detected')."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q9.** Choose the correct passive voice.\nSomeone has stolen confidential data.",
        options: ["Confidential data has been stolen.", "Confidential data had stolen.", "Confidential data is stealing.", "Confidential data stole."], 
        correctAnswer: "Confidential data has been stolen.",
        explanation: "Present perfect 'has stolen' changes to 'has been stolen'. The unknown agent 'someone' is dropped."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q10.** Choose the correct passive voice.\nPeople speak English across the world.",
        options: ["English is spoken across the world.", "English was spoken across the world.", "English has spoken across the world.", "English speaks across the world."], 
        correctAnswer: "English is spoken across the world.",
        explanation: "Simple present 'speak' changes to 'is spoken'. General subjects like 'people' are omitted."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Easy",
        questionText: "**Q11.** Choose the correct passive voice.\nThe professor is evaluating the answer sheets.",
        options: ["The answer sheets are being evaluated by the professor.", "The answer sheets have evaluated.", "The answer sheets evaluated.", "The answer sheets were evaluated."], 
        correctAnswer: "The answer sheets are being evaluated by the professor.",
        explanation: "Present continuous 'is evaluating' changes to 'are being evaluated'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q12.** Choose the correct passive voice.\nThe startup may introduce a new hiring policy.",
        options: ["A new hiring policy may be introduced by the startup.", "A new hiring policy can introduced.", "A new hiring policy is introducing.", "A new hiring policy may introduced."], 
        correctAnswer: "A new hiring policy may be introduced by the startup.",
        explanation: "The modal 'may' changes to 'may be introduced'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q13.** Choose the correct passive voice.\nThe team must complete the migration today.",
        options: ["The migration must be completed today by the team.", "The migration must completed.", "The migration has completed.", "The migration is completing."], 
        correctAnswer: "The migration must be completed today by the team.",
        explanation: "The modal 'must' changes to 'must be completed'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Easy",
        questionText: "**Q14.** Choose the correct passive voice.\nThe committee has selected five candidates.",
        options: ["Five candidates have been selected by the committee.", "Five candidates had selected.", "Five candidates are selecting.", "Five candidates selected."], 
        correctAnswer: "Five candidates have been selected by the committee.",
        explanation: "Present perfect 'has selected' changes to 'have been selected' to match the plural subject."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q15.** Choose the correct passive voice.\nThe company should revise the recruitment policy.",
        options: ["The recruitment policy should be revised by the company.", "The recruitment policy should revised.", "The recruitment policy has revised.", "The recruitment policy revises."], 
        correctAnswer: "The recruitment policy should be revised by the company.",
        explanation: "The modal 'should' changes to 'should be revised'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q16.** Choose the correct active voice.\nThe report was prepared by the analyst.",
        options: ["The analyst prepared the report.", "The analyst prepares the report.", "The analyst has prepared the report.", "The analyst had prepared the report."], 
        correctAnswer: "The analyst prepared the report.",
        explanation: "Passive 'was prepared' converts back to simple past 'prepared'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q17.** Choose the correct active voice.\nThe interview schedule has been finalized by HR.",
        options: ["HR finalized the interview schedule.", "HR has finalized the interview schedule.", "HR finalizes the interview schedule.", "HR had finalized the interview schedule."], 
        correctAnswer: "HR has finalized the interview schedule.",
        explanation: "Passive 'has been finalized' converts back to present perfect 'has finalized'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q18.** Choose the correct active voice.\nThe proposal will be reviewed by the board next week.",
        options: ["The board reviews the proposal next week.", "The board will review the proposal next week.", "The board reviewed the proposal next week.", "The board has reviewed the proposal."], 
        correctAnswer: "The board will review the proposal next week.",
        explanation: "Passive 'will be reviewed' converts back to simple future 'will review'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q19.** Choose the correct active voice.\nThe customer was informed by the support executive.",
        options: ["The support executive informed the customer.", "The support executive informs the customer.", "The support executive has informed the customer.", "The support executive had informed the customer."], 
        correctAnswer: "The support executive informed the customer.",
        explanation: "Passive 'was informed' converts back to simple past 'informed'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q20.** Choose the correct active voice.\nThe server is being monitored by the DevOps team.",
        options: ["The DevOps team monitors the server.", "The DevOps team is monitoring the server.", "The DevOps team monitored the server.", "The DevOps team has monitored the server."], 
        correctAnswer: "The DevOps team is monitoring the server.",
        explanation: "Passive 'is being monitored' converts back to present continuous 'is monitoring'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Hard",
        questionText: "**Q21.** Choose the correct active voice.\nThe contract had been signed before the deadline.",
        options: ["They sign the contract before the deadline.", "They had signed the contract before the deadline.", "They have signed the contract before the deadline.", "They signed the contract before the deadline."], 
        correctAnswer: "They had signed the contract before the deadline.",
        explanation: "Passive 'had been signed' converts back to past perfect 'had signed'. A general subject like 'They' is added."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q22.** Choose the correct active voice.\nThe issue can be resolved by the technical team.",
        options: ["The technical team resolves the issue.", "The technical team can resolve the issue.", "The technical team resolved the issue.", "The technical team has resolved the issue."], 
        correctAnswer: "The technical team can resolve the issue.",
        explanation: "Passive 'can be resolved' converts back to 'can resolve'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q23.** Choose the correct active voice.\nThe application must be submitted before Friday.",
        options: ["Applicants submit the application before Friday.", "Applicants must submit the application before Friday.", "Applicants submitted the application before Friday.", "Applicants have submitted the application before Friday."], 
        correctAnswer: "Applicants must submit the application before Friday.",
        explanation: "Passive 'must be submitted' converts back to 'must submit'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q24.** Choose the correct active voice.\nThe documents are checked every morning.",
        options: ["The clerk checked the documents every morning.", "The clerk checks the documents every morning.", "The clerk has checked the documents every morning.", "The clerk is checking the documents every morning."], 
        correctAnswer: "The clerk checks the documents every morning.",
        explanation: "Passive 'are checked' is simple present, so it converts to active 'checks'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Medium",
        questionText: "**Q25.** Choose the correct active voice.\nThe payment has already been processed.",
        options: ["They process the payment already.", "They have already processed the payment.", "They processed already the payment.", "They had processed the payment."], 
        correctAnswer: "They have already processed the payment.",
        explanation: "Passive 'has been processed' converts to present perfect active 'have processed'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Hard",
        questionText: "**Q26.** Choose the correct passive voice.\nWho solved this algorithm?",
        options: ["By whom was this algorithm solved?", "Who was solved this algorithm?", "By whom this algorithm solved?", "Whom solved this algorithm?"], 
        correctAnswer: "By whom was this algorithm solved?",
        explanation: "Questions starting with 'Who' change to 'By whom' in passive voice, followed by the helping verb."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Hard",
        questionText: "**Q27.** Choose the correct passive voice.\nOpen the emergency exit immediately.",
        options: ["Let the emergency exit be opened immediately.", "The emergency exit is opened immediately.", "The emergency exit was opened immediately.", "Opening the emergency exit immediately."], 
        correctAnswer: "Let the emergency exit be opened immediately.",
        explanation: "Imperative sentences often use 'Let + object + be + past participle' in passive voice."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Hard",
        questionText: "**Q28.** Choose the correct passive voice.\nPlease submit your documents before 5 PM.",
        options: ["You are requested to submit your documents before 5 PM.", "Your documents submit before 5 PM.", "Submit your documents before 5 PM.", "Documents have submitted before 5 PM."], 
        correctAnswer: "You are requested to submit your documents before 5 PM.",
        explanation: "Requests starting with 'Please' convert to 'You are requested to' in passive voice."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Hard",
        questionText: "**Q29.** Choose the correct passive voice.\nDo not disclose confidential information.",
        options: ["Let confidential information not be disclosed.", "Confidential information is not disclosed.", "Confidential information was not disclosed.", "Do not confidential information disclose."], 
        correctAnswer: "Let confidential information not be disclosed.",
        explanation: "Negative imperative sentences use 'Let + object + not be + past participle'."
    },
    {
        category: "Verbal Ability", topic: "Active & Passive Voice", difficulty: "Hard",
        questionText: "**Q30 (Ultra Tough).** Choose the correct passive voice.\nThey made me lead the technical discussion.",
        options: ["I was made to lead the technical discussion.", "I was made lead the technical discussion.", "I made to lead the technical discussion.", "I had made to lead the technical discussion."], 
        correctAnswer: "I was made to lead the technical discussion.",
        explanation: "The verb 'make' in active voice takes a bare infinitive ('lead'), but in passive voice it requires a full infinitive ('to lead')."
    }
];

const seedBatch48ActivePassive = async () => {
    try {
        console.log("🧹 Clearing old Active/Passive Voice records...");
        await Question.deleteMany({ topic: "Active & Passive Voice" }); 
        await Question.insertMany(batch48Questions);
        console.log(`✅ SUCCESS! All 30 Active/Passive Voice Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
};

seedBatch48ActivePassive();