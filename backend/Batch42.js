const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Verbal Ability - Antonyms Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch43Questions = [
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q1.** Choose the antonym of **Arduous**",
        options: ["Difficult", "Effortless", "Exhausting", "Demanding"], correctAnswer: "Effortless",
        explanation: "'Arduous' means requiring strenuous effort; difficult and tiring. Its direct opposite is 'Effortless'."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q2.** Choose the antonym of **Belligerent**",
        options: ["Aggressive", "Hostile", "Peaceful", "Violent"], correctAnswer: "Peaceful",
        explanation: "'Belligerent' describes someone who is hostile, aggressive, or eager to fight. 'Peaceful' is the exact antonym."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Hard",
        questionText: "**Q3.** Choose the antonym of **Cumbersome**",
        options: ["Heavy", "Bulky", "Handy", "Clumsy"], correctAnswer: "Handy",
        explanation: "'Cumbersome' means large or heavy and therefore difficult to carry or use (clunky). 'Handy' means convenient to handle or use."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q4.** Choose the antonym of **Deplete**",
        options: ["Consume", "Exhaust", "Replenish", "Reduce"], correctAnswer: "Replenish",
        explanation: "'Deplete' means to use up the supply or resources of something. 'Replenish' means to fill something up again."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q5.** Choose the antonym of **Erratic**",
        options: ["Random", "Unpredictable", "Consistent", "Irregular"], correctAnswer: "Consistent",
        explanation: "'Erratic' means not even or regular in pattern or movement; unpredictable. Its opposite is 'Consistent'."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Hard",
        questionText: "**Q6.** Choose the antonym of **Frugal**",
        options: ["Economical", "Thrifty", "Extravagant", "Careful"], correctAnswer: "Extravagant",
        explanation: "'Frugal' means sparing or economical as regards to money or food. 'Extravagant' means lacking restraint in spending money."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Hard",
        questionText: "**Q7.** Choose the antonym of **Gregarious**",
        options: ["Friendly", "Reserved", "Sociable", "Outgoing"], correctAnswer: "Reserved",
        explanation: "'Gregarious' means fond of company; sociable. The antonym is 'Reserved', meaning slow to reveal emotion or opinions; introverted."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q8.** Choose the antonym of **Hinder**",
        options: ["Delay", "Prevent", "Facilitate", "Obstruct"], correctAnswer: "Facilitate",
        explanation: "'Hinder' means to create difficulties resulting in delay or obstruction. 'Facilitate' means to make an action or process easier."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Hard",
        questionText: "**Q9.** Choose the antonym of **Incessant**",
        options: ["Constant", "Continuous", "Intermittent", "Unending"], correctAnswer: "Intermittent",
        explanation: "'Incessant' means continuing without pause or interruption. 'Intermittent' means occurring at irregular intervals; not continuous."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Easy",
        questionText: "**Q10.** Choose the antonym of **Jovial**",
        options: ["Cheerful", "Gloomy", "Merry", "Happy"], correctAnswer: "Gloomy",
        explanation: "'Jovial' means cheerful and friendly. The opposite is 'Gloomy', meaning dark or poorly lit, especially so as to appear depressing or frightening."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q11.** Choose the antonym of **Keen**",
        options: ["Sharp", "Enthusiastic", "Indifferent", "Eager"], correctAnswer: "Indifferent",
        explanation: "'Keen' implies having or showing eagerness or enthusiasm. 'Indifferent' means having no particular interest or sympathy; unconcerned."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Easy",
        questionText: "**Q12.** Choose the antonym of **Lethargic**",
        options: ["Lazy", "Sluggish", "Energetic", "Tired"], correctAnswer: "Energetic",
        explanation: "'Lethargic' means feeling a lack of energy or a lack of interest in doing things. The antonym is 'Energetic'."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q13.** Choose the antonym of **Mundane**",
        options: ["Ordinary", "Routine", "Extraordinary", "Common"], correctAnswer: "Extraordinary",
        explanation: "'Mundane' means lacking interest or excitement; dull or ordinary. 'Extraordinary' is its exact opposite."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q14.** Choose the antonym of **Notorious**",
        options: ["Infamous", "Dishonorable", "Honorable", "Wicked"], correctAnswer: "Honorable",
        explanation: "'Notorious' means famous or well known, typically for some bad quality or deed. 'Honorable' is the positive opposite."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Easy",
        questionText: "**Q15.** Choose the antonym of **Optimistic**",
        options: ["Hopeful", "Positive", "Pessimistic", "Confident"], correctAnswer: "Pessimistic",
        explanation: "'Optimistic' means hopeful and confident about the future. The antonym is 'Pessimistic', meaning tending to see the worst aspect of things."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Hard",
        questionText: "**Q16.** Choose the antonym of **Pernicious**",
        options: ["Harmful", "Dangerous", "Beneficial", "Toxic"], correctAnswer: "Beneficial",
        explanation: "'Pernicious' means having a harmful effect, especially in a gradual or subtle way. 'Beneficial' is its exact antonym."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Hard",
        questionText: "**Q17.** Choose the antonym of **Quell**",
        options: ["Calm", "Suppress", "Agitate", "Silence"], correctAnswer: "Agitate",
        explanation: "'Quell' means to put an end to (a rebellion or other disorder), typically by the use of force. To 'Agitate' means to make someone troubled or nervous, stirring things up."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q18.** Choose the antonym of **Robust**",
        options: ["Strong", "Healthy", "Fragile", "Sturdy"], correctAnswer: "Fragile",
        explanation: "'Robust' means strong and healthy; vigorous. The antonym 'Fragile' means easily broken or damaged."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Easy",
        questionText: "**Q19.** Choose the antonym of **Sincere**",
        options: ["Honest", "Genuine", "Deceitful", "Truthful"], correctAnswer: "Deceitful",
        explanation: "'Sincere' means free from pretense or deceit; proceeding from genuine feelings. Its opposite is 'Deceitful'."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Easy",
        questionText: "**Q20.** Choose the antonym of **Trivial**",
        options: ["Minor", "Significant", "Unimportant", "Petty"], correctAnswer: "Significant",
        explanation: "'Trivial' means of little value or importance. The antonym 'Significant' means sufficiently great or important to be worthy of attention."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q21.** Choose the antonym of **Vigilant**",
        options: ["Alert", "Watchful", "Negligent", "Careful"], correctAnswer: "Negligent",
        explanation: "'Vigilant' means keeping careful watch for possible danger or difficulties. 'Negligent' means failing to take proper care in doing something."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q22.** Choose the antonym of **Withhold**",
        options: ["Keep", "Retain", "Grant", "Refuse"], correctAnswer: "Grant",
        explanation: "'Withhold' means to refuse to give (something that is due to or is desired by another). To 'Grant' is to agree to give or allow."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q23.** Choose the antonym of **Yield**",
        options: ["Surrender", "Resist", "Submit", "Give in"], correctAnswer: "Resist",
        explanation: "'Yield' in a conflict means to give way to arguments, demands, or pressure. The antonym is 'Resist'."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Hard",
        questionText: "**Q24.** Choose the antonym of **Zenith**",
        options: ["Peak", "Summit", "Nadir", "Highest Point"], correctAnswer: "Nadir",
        explanation: "'Zenith' refers to the time at which something is most powerful or successful (the peak). 'Nadir' is the lowest point in the fortunes of a person or organization."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Hard",
        questionText: "**Q25.** Choose the antonym of **Austere**",
        options: ["Strict", "Luxurious", "Plain", "Simple"], correctAnswer: "Luxurious",
        explanation: "'Austere' means severe or strict in manner, attitude, or appearance, or having no comforts/luxuries. 'Luxurious' is the opposite."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q26.** Choose the antonym of **Coarse**",
        options: ["Rough", "Crude", "Refined", "Harsh"], correctAnswer: "Refined",
        explanation: "'Coarse' means rough or loose in texture or grain, or rude in speech. 'Refined' means elegant and cultured in appearance, manner, or taste."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q27.** Choose the antonym of **Dormant**",
        options: ["Sleeping", "Inactive", "Active", "Idle"], correctAnswer: "Active",
        explanation: "'Dormant' refers to having normal physical functions suspended or slowed down for a period of time; in or as if in a deep sleep. Its antonym is 'Active'."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q28.** Choose the antonym of **Explicit**",
        options: ["Clear", "Definite", "Vague", "Precise"], correctAnswer: "Vague",
        explanation: "'Explicit' means stated clearly and in detail, leaving no room for confusion or doubt. 'Vague' means of uncertain, indefinite, or unclear character or meaning."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Medium",
        questionText: "**Q29.** Choose the antonym of **Fluctuate**",
        options: ["Vary", "Oscillate", "Stabilize", "Change"], correctAnswer: "Stabilize",
        explanation: "'Fluctuate' means to rise and fall irregularly in number or amount. 'Stabilize' means to make or become unlikely to give way or overturn; to become steady."
    },
    {
        category: "Verbal Ability", topic: "Vocabulary - Antonyms", difficulty: "Easy",
        questionText: "**Q30 (Ultra Tough).** Choose the antonym of **Humble**",
        options: ["Modest", "Respectful", "Arrogant", "Polite"], correctAnswer: "Arrogant",
        explanation: "'Humble' means having or showing a modest or low estimate of one's own importance. The antonym is 'Arrogant', meaning having or revealing an exaggerated sense of one's own importance or abilities."
    }
];

const seedBatch43Antonyms = async () => {
    try {
        console.log("🧹 Clearing old Vocabulary - Antonyms records...");
        await Question.deleteMany({ topic: "Vocabulary - Antonyms" }); 
        
        console.log(`🚀 Injecting ${batch43Questions.length} Formatted Questions...`);
        await Question.insertMany(batch43Questions);
        
        console.log(`✅ SUCCESS! All 30 Verbal Ability (Antonyms) Questions Seeded with Explanations.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch43Antonyms();