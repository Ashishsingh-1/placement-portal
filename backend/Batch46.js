const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for One Word Substitution Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const batch47Questions = [
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Easy",
        questionText: "**Q1.** A person who can speak many languages.",
        options: ["Linguist", "Polyglot", "Orator", "Lexicographer"], correctAnswer: "Polyglot",
        explanation: "A polyglot is someone who knows and is able to use several languages."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Easy",
        questionText: "**Q2.** A person who designs buildings.",
        options: ["Engineer", "Mason", "Architect", "Surveyor"], correctAnswer: "Architect",
        explanation: "An architect is a person who designs buildings and advises in their construction."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q3.** A speech delivered without preparation.",
        options: ["Monologue", "Dialogue", "Extempore", "Prologue"], correctAnswer: "Extempore",
        explanation: "Extempore refers to something spoken or done without preparation."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q4.** A person who studies ancient human history through excavation.",
        options: ["Archaeologist", "Anthropologist", "Geologist", "Historian"], correctAnswer: "Archaeologist",
        explanation: "An archaeologist studies human history and prehistory through the excavation of sites."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q5.** A government ruled by the wealthy.",
        options: ["Democracy", "Oligarchy", "Plutocracy", "Monarchy"], correctAnswer: "Plutocracy",
        explanation: "Plutocracy is a system of government where the wealthiest citizens rule."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q6.** A person who doubts accepted beliefs or claims.",
        options: ["Believer", "Skeptic", "Fanatic", "Optimist"], correctAnswer: "Skeptic",
        explanation: "A skeptic is a person inclined to question or doubt accepted opinions."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Easy",
        questionText: "**Q7.** One who cannot read or write.",
        options: ["Ignorant", "Illiterate", "Innocent", "Amateur"], correctAnswer: "Illiterate",
        explanation: "Illiterate refers to a person who is unable to read or write."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q8.** A person who compiles dictionaries.",
        options: ["Linguist", "Editor", "Lexicographer", "Bibliographer"], correctAnswer: "Lexicographer",
        explanation: "A lexicographer is a person whose job is to write or compile dictionaries."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q9.** A place where books and manuscripts are kept.",
        options: ["Museum", "Library", "Archive", "Gallery"], correctAnswer: "Archive",
        explanation: "An archive is a collection of historical documents or records providing information about a place, institution, or group of people."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q10.** A person who loves books.",
        options: ["Bibliophile", "Philatelist", "Numismatist", "Calligrapher"], correctAnswer: "Bibliophile",
        explanation: "A bibliophile is a person who collects or has a great love for books."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q11.** A medicine that prevents infection.",
        options: ["Antibiotic", "Antiseptic", "Analgesic", "Antidote"], correctAnswer: "Antiseptic",
        explanation: "An antiseptic is a substance that stops or slows down the growth of microorganisms to prevent infection."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q12.** A speech made to oneself.",
        options: ["Soliloquy", "Dialogue", "Debate", "Oration"], correctAnswer: "Soliloquy",
        explanation: "A soliloquy is the act of speaking one's thoughts aloud, regardless of any hearers, especially by a character in a play."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q13.** A person who collects coins.",
        options: ["Philatelist", "Numismatist", "Antiquarian", "Curator"], correctAnswer: "Numismatist",
        explanation: "A numismatist is a person who studies or collects coins, paper money, and medals."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q14.** A person who collects stamps.",
        options: ["Numismatist", "Archivist", "Philatelist", "Cartographer"], correctAnswer: "Philatelist",
        explanation: "A philatelist is a person who studies or collects postage stamps."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q15.** A person who travels from place to place without a permanent home.",
        options: ["Nomad", "Tourist", "Pilgrim", "Migrant"], correctAnswer: "Nomad",
        explanation: "A nomad is a member of a people having no permanent abode, and who travel from place to place."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Easy",
        questionText: "**Q16.** The study of earthquakes.",
        options: ["Seismology", "Meteorology", "Geology", "Ecology"], correctAnswer: "Seismology",
        explanation: "Seismology is the branch of science concerned with earthquakes and related phenomena."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q17.** A person who loves mankind.",
        options: ["Philanthropist", "Humanist", "Altruist", "Socialist"], correctAnswer: "Philanthropist",
        explanation: "A philanthropist is a person who seeks to promote the welfare of others, especially by the generous donation of money to good causes."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q18.** A person who hates mankind.",
        options: ["Sadist", "Cynic", "Misanthrope", "Egoist"], correctAnswer: "Misanthrope",
        explanation: "A misanthrope is a person who dislikes humankind and avoids human society."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q19.** A person appointed to settle disputes between parties.",
        options: ["Arbitrator", "Mediator", "Negotiator", "Judge"], correctAnswer: "Arbitrator",
        explanation: "An arbitrator is an independent person or body officially appointed to settle a dispute."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q20.** A person who is new to a profession or activity.",
        options: ["Veteran", "Novice", "Expert", "Professional"], correctAnswer: "Novice",
        explanation: "A novice is a person new to or inexperienced in a field or situation."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q21.** A statement that contradicts itself but may still contain truth.",
        options: ["Irony", "Oxymoron", "Paradox", "Euphemism"], correctAnswer: "Paradox",
        explanation: "A paradox is a seemingly absurd or self-contradictory statement that may prove to be well-founded or true."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Easy",
        questionText: "**Q22.** A word that has the opposite meaning of another word.",
        options: ["Synonym", "Homonym", "Antonym", "Acronym"], correctAnswer: "Antonym",
        explanation: "An antonym is a word opposite in meaning to another."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q23.** The art of beautiful handwriting.",
        options: ["Typography", "Calligraphy", "Lexicography", "Cartography"], correctAnswer: "Calligraphy",
        explanation: "Calligraphy is the design and execution of lettering with a broad-tipped instrument, brush, or other writing instrument."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q24.** A person who deliberately sets fire to property.",
        options: ["Assassin", "Arsonist", "Smuggler", "Saboteur"], correctAnswer: "Arsonist",
        explanation: "An arsonist is a person who commits the criminal act of deliberately setting fire to property."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q25.** A person who cannot be corrected or reformed.",
        options: ["Incorrigible", "Incurable", "Indifferent", "Insolvent"], correctAnswer: "Incorrigible",
        explanation: "Incorrigible describes a person or their tendencies not able to be corrected, improved, or reformed."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q26.** A person who spends money recklessly.",
        options: ["Miser", "Spendthrift", "Economist", "Investor"], correctAnswer: "Spendthrift",
        explanation: "A spendthrift is a person who spends money in an extravagant and irresponsible way."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q27.** A person who abstains from alcoholic drinks.",
        options: ["Teetotaler", "Abstainer", "Ascetic", "Hermit"], correctAnswer: "Teetotaler",
        explanation: "A teetotaler is a person who never drinks alcohol."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Medium",
        questionText: "**Q28.** A person who studies celestial objects like stars and planets.",
        options: ["Astrologer", "Astronomer", "Cosmologist", "Physicist"], correctAnswer: "Astronomer",
        explanation: "An astronomer studies the universe and the objects within it, such as planets, stars, and galaxies."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q29.** A person who is skilled in many different fields.",
        options: ["Genius", "Polymath", "Specialist", "Scholar"], correctAnswer: "Polymath",
        explanation: "A polymath is a person of wide-ranging knowledge or learning."
    },
    {
        category: "Verbal Ability", topic: "One Word Substitution", difficulty: "Hard",
        questionText: "**Q30 (Ultra Tough).** A person who examines financial records to ensure accuracy and compliance.",
        options: ["Accountant", "Auditor", "Treasurer", "Actuary"], correctAnswer: "Auditor",
        explanation: "An auditor is a person authorized to review and verify the accuracy of financial records and ensure that companies comply with tax laws."
    }
];

const seedBatch47OneWordSubstitution = async () => {
    try {
        console.log("🧹 Clearing old One Word Substitution records...");
        await Question.deleteMany({ topic: "One Word Substitution" }); 
        
        console.log(`🚀 Injecting ${batch47Questions.length} Questions with exact matches...`);
        await Question.insertMany(batch47Questions);
        
        console.log(`✅ SUCCESS! All 30 One Word Substitution Questions Seeded perfectly.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedBatch47OneWordSubstitution();