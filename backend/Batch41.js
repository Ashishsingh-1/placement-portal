const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Verbal Ability Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch42Questions = [
    // ================== SET 1: Basic Synonyms ==================
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Easy",
        questionText: "**Q1.** Choose the synonym of **Abate**",
        options: ["Increase", "Diminish", "Multiply", "Expand"], correctAnswer: "Diminish",
        explanation: "'Abate' means to become less intense or widespread. Therefore, 'Diminish' (to decrease) is the correct synonym."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Easy",
        questionText: "**Q2.** Choose the synonym of **Pragmatic**",
        options: ["Practical", "Emotional", "Theoretical", "Naive"], correctAnswer: "Practical",
        explanation: "'Pragmatic' refers to dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q3.** Choose the synonym of **Meticulous**",
        options: ["Careless", "Thorough", "Lazy", "Rough"], correctAnswer: "Thorough",
        explanation: "'Meticulous' means showing great attention to detail; very careful and precise. 'Thorough' is the closest meaning."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q4.** Choose the synonym of **Resilient**",
        options: ["Weak", "Flexible", "Fragile", "Passive"], correctAnswer: "Flexible",
        explanation: "'Resilient' means able to withstand or recover quickly from difficult conditions. 'Flexible' represents adaptability in tough situations."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Easy",
        questionText: "**Q5.** Choose the synonym of **Obsolete**",
        options: ["Ancient", "Modern", "Current", "Latest"], correctAnswer: "Ancient",
        explanation: "'Obsolete' means no longer produced or used; out of date. 'Ancient' or outdated fits this definition perfectly."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q6.** Choose the synonym of **Scrutinize**",
        options: ["Ignore", "Examine", "Destroy", "Reject"], correctAnswer: "Examine",
        explanation: "'Scrutinize' means to examine or inspect closely and thoroughly. Hence, 'Examine' is the right choice."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Easy",
        questionText: "**Q7.** Choose the synonym of **Benevolent**",
        options: ["Cruel", "Kind", "Angry", "Rude"], correctAnswer: "Kind",
        explanation: "'Benevolent' comes from the Latin root 'bene' (good), meaning well-meaning and kindly."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q8.** Choose the synonym of **Imminent**",
        options: ["Distant", "About to happen", "Hidden", "Permanent"], correctAnswer: "About to happen",
        explanation: "'Imminent' is used to describe an event (often a threat) that is about to happen very soon."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Easy",
        questionText: "**Q9.** Choose the synonym of **Candid**",
        options: ["Honest", "Clever", "Silent", "Proud"], correctAnswer: "Honest",
        explanation: "'Candid' means truthful and straightforward; frank. 'Honest' is the exact synonym."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q10.** Choose the synonym of **Lucid**",
        options: ["Confusing", "Clear", "Difficult", "Strange"], correctAnswer: "Clear",
        explanation: "'Lucid' means expressed clearly; easy to understand. For example, a 'lucid explanation'."
    },

    // ================== SET 2: Advanced Vocabulary ==================
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q11.** Choose the synonym of **Ubiquitous**",
        options: ["Rare", "Present Everywhere", "Hidden", "Small"], correctAnswer: "Present Everywhere",
        explanation: "'Ubiquitous' means present, appearing, or found everywhere simultaneously (e.g., smartphones are ubiquitous)."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q12.** Choose the synonym of **Ambiguous**",
        options: ["Clear", "Uncertain", "Loud", "Bold"], correctAnswer: "Uncertain",
        explanation: "'Ambiguous' means open to more than one interpretation; having a double meaning or unclear nature."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q13.** Choose the synonym of **Concise**",
        options: ["Lengthy", "Brief", "Complicated", "Slow"], correctAnswer: "Brief",
        explanation: "'Concise' means giving a lot of information clearly and in a few words; brief but comprehensive."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q14.** Choose the synonym of **Emulate**",
        options: ["Copy", "Criticize", "Avoid", "Destroy"], correctAnswer: "Copy",
        explanation: "'Emulate' means to match or surpass a person or achievement, typically by imitation or copying their success."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q15.** Choose the synonym of **Futile**",
        options: ["Successful", "Useless", "Helpful", "Productive"], correctAnswer: "Useless",
        explanation: "'Futile' means incapable of producing any useful result; pointless or useless."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q16.** Choose the synonym of **Magnanimous**",
        options: ["Generous", "Selfish", "Arrogant", "Lazy"], correctAnswer: "Generous",
        explanation: "'Magnanimous' means very generous or forgiving, especially toward a rival or someone less powerful."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q17.** Choose the synonym of **Novice**",
        options: ["Expert", "Beginner", "Teacher", "Leader"], correctAnswer: "Beginner",
        explanation: "'Novice' refers to a person who is new to or inexperienced in a field or situation; a beginner."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q18.** Choose the synonym of **Peril**",
        options: ["Safety", "Danger", "Peace", "Comfort"], correctAnswer: "Danger",
        explanation: "'Peril' refers to serious and immediate danger. For example, 'his life was in peril'."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q19.** Choose the synonym of **Tedious**",
        options: ["Interesting", "Boring", "Exciting", "Pleasant"], correctAnswer: "Boring",
        explanation: "'Tedious' means too long, slow, or dull; tiresome or monotonous (boring)."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q20.** Choose the synonym of **Vivid**",
        options: ["Dull", "Bright", "Dark", "Weak"], correctAnswer: "Bright",
        explanation: "'Vivid' means producing powerful feelings or strong, clear, bright images in the mind."
    },

    // ================== SET 3: Ultra Tough Company-Level ==================
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q21.** Choose the closest synonym of **Eloquent**",
        options: ["Silent", "Fluent", "Shy", "Slow"], correctAnswer: "Fluent",
        explanation: "'Eloquent' means fluent or persuasive in speaking or writing. An eloquent speaker is highly articulate."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q22.** Choose the synonym of **Coherent**",
        options: ["Logical", "Broken", "Weak", "Random"], correctAnswer: "Logical",
        explanation: "'Coherent' (of an argument, theory, or policy) means logical and consistent."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q23.** Choose the synonym of **Diligent**",
        options: ["Hardworking", "Lazy", "Clever", "Proud"], correctAnswer: "Hardworking",
        explanation: "'Diligent' means having or showing care and conscientiousness in one's work; extremely hardworking."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q24.** Choose the synonym of **Ephemeral**",
        options: ["Permanent", "Short-lived", "Ancient", "Strong"], correctAnswer: "Short-lived",
        explanation: "'Ephemeral' means lasting for a very short time; transient or fleeting."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Medium",
        questionText: "**Q25.** Choose the synonym of **Hostile**",
        options: ["Friendly", "Aggressive", "Calm", "Happy"], correctAnswer: "Aggressive",
        explanation: "'Hostile' means unfriendly or antagonistic; showing aggression."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q26.** Choose the synonym of **Impartial**",
        options: ["Fair", "Biased", "Angry", "Emotional"], correctAnswer: "Fair",
        explanation: "'Impartial' means treating all rivals or disputants equally; fair and just without bias."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q27.** Choose the synonym of **Plausible**",
        options: ["Impossible", "Believable", "Unrealistic", "Weak"], correctAnswer: "Believable",
        explanation: "'Plausible' means (of an argument or statement) seeming reasonable, probable, or believable."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q28.** Choose the synonym of **Reconcile**",
        options: ["Separate", "Restore Harmony", "Punish", "Ignore"], correctAnswer: "Restore Harmony",
        explanation: "'Reconcile' means to restore friendly relations between individuals or groups; resolving harmony."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q29.** Choose the synonym of **Tenacious**",
        options: ["Determined", "Weak", "Careless", "Nervous"], correctAnswer: "Determined",
        explanation: "'Tenacious' means tending to keep a firm hold of something; highly persistent and determined."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Synonyms", difficulty: "Hard",
        questionText: "**Q30 (Ultra Tough).** Choose the synonym of **Vindicate**",
        options: ["Blame", "Justify / Clear from blame", "Criticize", "Condemn"], correctAnswer: "Justify / Clear from blame",
        explanation: "'Vindicate' means to clear someone of blame or suspicion, or to show or prove to be right, reasonable, or justified."
    }
];

const seedBatch42Synonyms = async () => {
    try {
        console.log("🧹 Clearing old Vocabulary records...");
        await Question.deleteMany({ topic: "Vocabulary - Synonyms" }); 
        
        console.log(`🚀 Injecting ${batch42Questions.length} Formatted Questions...`);
        await Question.insertMany(batch42Questions);
        
        console.log(`✅ SUCCESS! All 30 Verbal Ability Questions Seeded with Proper Explanations.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch42Synonyms();