const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Narration Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch44Questions = [
    // ================== Part A: Direct to Indirect ==================
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q1.** Rahul said, 'I am preparing for the campus placement.'",
        options: ["Rahul said that I was preparing...", "Rahul said that he was preparing...", "Rahul said that he is preparing...", "Rahul said he has prepared..."], correctAnswer: "Rahul said that he was preparing for the campus placement.",
        explanation: "Present Continuous (am preparing) changes to Past Continuous (was preparing). 'I' changes to 'he'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q2.** She said, 'I completed the project yesterday.'",
        options: ["She said that she completed...", "She said that she had completed...", "She said that she has completed...", "She said she completed..."], correctAnswer: "She said that she had completed the project the previous day.",
        explanation: "Simple Past (completed) changes to Past Perfect (had completed). 'Yesterday' changes to 'the previous day'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q3.** The manager said, 'We will announce the results tomorrow.'",
        options: ["The manager said that they would announce...", "The manager said that we will announce...", "The manager said they announce...", "The manager said they announced..."], correctAnswer: "The manager said that they would announce the results the next day.",
        explanation: "'Will' changes to 'would'. 'Tomorrow' changes to 'the next day'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q4.** Aman said, 'I can solve this puzzle.'",
        options: ["Aman said that he could solve that puzzle.", "Aman said that he can solve this puzzle.", "Aman said he solved that puzzle.", "Aman said he could solve this."], correctAnswer: "Aman said that he could solve that puzzle.",
        explanation: "'Can' changes to 'could'. 'This' changes to 'that'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q5.** Riya said, 'I have submitted the assignment.'",
        options: ["Riya said she had submitted the assignment.", "Riya said she has submitted the assignment.", "Riya said she submitted the assignment now.", "Riya said she was submitting the assignment."], correctAnswer: "Riya said she had submitted the assignment.",
        explanation: "Present Perfect (have submitted) changes to Past Perfect (had submitted)."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Hard",
        questionText: "**Q6.** He said, 'I was working late last night.'",
        options: ["He said that he had been working late the previous night.", "He said he was working late last night.", "He said he has worked late...", "He said he worked late..."], correctAnswer: "He said that he had been working late the previous night.",
        explanation: "Past Continuous (was working) changes to Past Perfect Continuous (had been working)."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q7.** Priya said, 'I must complete the task today.'",
        options: ["Priya said she had to complete the task that day.", "Priya said she must completed...", "Priya said she has to complete...", "Priya said she completed..."], correctAnswer: "Priya said she had to complete the task that day.",
        explanation: "'Must' changes to 'had to' for obligation. 'Today' changes to 'that day'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q8.** The teacher said, 'The Earth revolves around the Sun.'",
        options: ["The teacher said that the Earth revolved...", "The teacher said that the Earth revolves...", "The teacher said that the Earth had revolved...", "The teacher said the Earth was revolving..."], correctAnswer: "The teacher said that the Earth revolves around the Sun.",
        explanation: "Universal truths do not change tense in indirect speech."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q9.** He said, 'I may join Deloitte next year.'",
        options: ["He said he might join Deloitte the following year.", "He said he may join Deloitte next year.", "He said he joined Deloitte...", "He said he would join Deloitte."], correctAnswer: "He said he might join Deloitte the following year.",
        explanation: "'May' changes to 'might'. 'Next year' changes to 'the following year'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Easy",
        questionText: "**Q10.** Neha said, 'I am not feeling well.'",
        options: ["Neha said she was not feeling well.", "Neha said she is not feeling well.", "Neha said she had not felt well.", "Neha said she was feeling better."], correctAnswer: "Neha said she was not feeling well.",
        explanation: "Present Continuous changes to Past Continuous."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Hard",
        questionText: "**Q11.** The CEO said, 'Our company achieved record profits this year.'",
        options: ["The CEO said their company had achieved record profits that year.", "The CEO said the company achieved...", "The CEO said the company has achieved...", "The CEO said the company achieves..."], correctAnswer: "The CEO said their company had achieved record profits that year.",
        explanation: "Simple Past (achieved) changes to Past Perfect (had achieved). 'This year' changes to 'that year'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q12.** Rohit said, 'I had finished the report before lunch.'",
        options: ["Rohit said he had finished the report before lunch.", "Rohit said he finished...", "Rohit said he has finished...", "Rohit said he was finishing..."], correctAnswer: "Rohit said he had finished the report before lunch.",
        explanation: "Past Perfect remains Past Perfect in indirect speech."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q13.** She said, 'I will be attending the interview.'",
        options: ["She said she would be attending the interview.", "She said she will attend...", "She said she attended...", "She said she has attended..."], correctAnswer: "She said she would be attending the interview.",
        explanation: "'Will' changes to 'would'. Tense remains continuous."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q14.** He said, 'I need your help.'",
        options: ["He said he needed my help.", "He said he needs my help.", "He said he needed your help.", "He said he has needed my help."], correctAnswer: "He said he needed my help.",
        explanation: "Simple Present (need) changes to Simple Past (needed)."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q15.** They said, 'We were waiting outside.'",
        options: ["They said they had been waiting outside.", "They said they were waiting...", "They said they have waited...", "They said they waited..."], correctAnswer: "They said they had been waiting outside.",
        explanation: "Past Continuous (were waiting) changes to Past Perfect Continuous (had been waiting)."
    },

    // ================== Part B: Indirect to Direct ==================
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q16.** He said that he was ready.",
        options: ["He said, 'I am ready.'", "He said, 'I was ready.'", "He said, 'I will be ready.'", "He said, 'I have been ready.'"], correctAnswer: "He said, 'I am ready.'",
        explanation: "Reverse of Present to Past transformation."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q17.** She said that she had completed her work.",
        options: ["She said, 'I completed my work.'", "She said, 'I have completed my work.'", "She said, 'I had completed my work.'", "She said, 'I complete my work.'"], correctAnswer: "She said, 'I have completed my work.'",
        explanation: "Past Perfect in indirect usually comes from Present Perfect or Simple Past."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q18.** The teacher said that honesty is the best policy.",
        options: ["The teacher said, 'Honesty is the best policy.'", "The teacher said, 'Honesty was the best policy.'", "The teacher said, 'Honesty had been the best policy.'", "The teacher said, 'Honesty will be the best policy.'"], correctAnswer: "The teacher said, 'Honesty is the best policy.'",
        explanation: "Universal truth stays as is."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Hard",
        questionText: "**Q19.** Rahul said that he would call me the next day.",
        options: ["Rahul said, 'I will call you tomorrow.'", "Rahul said, 'I would call you tomorrow.'", "Rahul said, 'I called you tomorrow.'", "Rahul said, 'I shall call you yesterday.'"], correctAnswer: "Rahul said, 'I will call you tomorrow.'",
        explanation: "'Would' reverses to 'will', 'Next day' reverses to 'tomorrow'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Hard",
        questionText: "**Q20.** She said that she could solve the problem.",
        options: ["She said, 'I can solve the problem.'", "She said, 'I could solve the problem.'", "She said, 'I solved the problem.'", "She said, 'I have solved the problem.'"], correctAnswer: "She said, 'I can solve the problem.'",
        explanation: "'Could' reverses to 'can'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Hard",
        questionText: "**Q21.** The manager said that the meeting had been postponed.",
        options: ["The manager said, 'The meeting has been postponed.'", "The manager said, 'The meeting was postponed.'", "The manager said, 'The meeting had been postponed.'", "The manager said, 'The meeting is postponed.'"], correctAnswer: "The manager said, 'The meeting has been postponed.'",
        explanation: "Past perfect often comes from Present perfect."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Hard",
        questionText: "**Q22.** He said that he might visit Mumbai.",
        options: ["He said, 'I may visit Mumbai.'", "He said, 'I might visit Mumbai.'", "He said, 'I visited Mumbai.'", "He said, 'I will visit Mumbai.'"], correctAnswer: "He said, 'I may visit Mumbai.'",
        explanation: "'Might' reverses to 'may'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Hard",
        questionText: "**Q23.** She said that she had never seen such a beautiful place before.",
        options: ["She said, 'I have never seen such a beautiful place before.'", "She said, 'I never see...'", "She said, 'I saw...'", "She said, 'I am seeing...'"], correctAnswer: "She said, 'I have never seen such a beautiful place before.'",
        explanation: "Past Perfect 'had never seen' comes from Present Perfect 'have never seen'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q24.** He said that he was learning Java.",
        options: ["He said, 'I am learning Java.'", "He said, 'I learned Java.'", "He said, 'I have learned Java.'", "He said, 'I learn Java.'"], correctAnswer: "He said, 'I am learning Java.'",
        explanation: "Past continuous 'was learning' comes from Present continuous 'am learning'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q25.** They said that they had already left.",
        options: ["They said, 'We have already left.'", "They said, 'We already left.'", "They said, 'We had already left.'", "They said, 'We leave already.'"], correctAnswer: "They said, 'We have already left.'",
        explanation: "Past perfect 'had already left' comes from Present perfect 'have already left'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q26.** The doctor said that the patient needed rest.",
        options: ["The doctor said, 'The patient needs rest.'", "The doctor said, 'The patient needed rest.'", "The doctor said, 'The patient has needed rest.'", "The doctor said, 'The patient will need rest.'"], correctAnswer: "The doctor said, 'The patient needs rest.'",
        explanation: "Simple past 'needed' usually comes from simple present 'needs'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q27.** She said that she would help me.",
        options: ["She said, 'I will help you.'", "She said, 'I would help you.'", "She said, 'I help you.'", "She said, 'I helped you.'"], correctAnswer: "She said, 'I will help you.'",
        explanation: "'Would' reverses to 'will'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q28.** He said that he had forgotten my name.",
        options: ["He said, 'I forgot your name.'", "He said, 'I have forgotten your name.'", "He said, 'I had forgotten your name.'", "He said, 'I forget your name.'"], correctAnswer: "He said, 'I have forgotten your name.'",
        explanation: "Past perfect 'had forgotten' often comes from Present perfect 'have forgotten'."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Medium",
        questionText: "**Q29.** The scientist said that water boils at 100°C.",
        options: ["The scientist said, 'Water boiled at 100°C.'", "The scientist said, 'Water boils at 100°C.'", "The scientist said, 'Water will boil at 100°C.'", "The scientist said, 'Water has boiled at 100°C.'"], correctAnswer: "The scientist said, 'Water boils at 100°C.'",
        explanation: "Scientific fact stays in simple present."
    },
    {
        category: "Verbal Ability", topic: "Grammar - Narration", difficulty: "Hard",
        questionText: "**Q30 (Ultra Tough).** The HR said, 'You have performed exceptionally well in the interview today.'",
        options: ["The HR said that I had performed exceptionally well in the interview that day.", "The HR said that you had performed...", "The HR said that I have performed...", "The HR said that I performed..."], correctAnswer: "The HR said that I had performed exceptionally well in the interview that day.",
        explanation: "Change 'you' to 'I', 'have performed' to 'had performed', and 'today' to 'that day'."
    }
];

const seedBatch44Narration = async () => {
    try {
        console.log("🧹 Clearing old Narration records...");
        await Question.deleteMany({ topic: "Grammar - Narration" }); 
        
        console.log(`🚀 Injecting ${batch44Questions.length} Formatted Questions...`);
        await Question.insertMany(batch44Questions);
        
        console.log(`✅ SUCCESS! All 30 Narration Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch44Narration();