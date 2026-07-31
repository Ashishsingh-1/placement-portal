const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Syllogism Seeding'))
  .catch(err => console.log(err));

const batch22Questions = [
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nAll Engineers are Programmers.\nSome Programmers are Analysts.\nNo Analyst is Manager.\n\nConclusions:\nI. Some Engineers are Analysts.\nII. No Engineer is Manager.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: Draw Venn Diagram. Engineers are inside Programmers. Programmers overlap with Analysts. Analysts and Managers have no overlap.\nStep 2: Conclusion I says 'Some Engineers are Analysts'. There is no direct overlap between Engineers and Analysts. So, False.\nStep 3: Conclusion II says 'No Engineer is Manager'. There is no negative relation given between Engineer and Manager, they might or might not overlap. So, False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nAll Doctors are Scientists.\nSome Scientists are Writers.\nAll Writers are Artists.\n\nConclusions:\nI. Some Doctors are Artists.\nII. Some Scientists are Artists.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only II follows",
        explanation: "Step 1: Doctors are inside Scientists. Scientists overlap with Writers. Writers are entirely inside Artists.\nStep 2: Conclusion I: 'Some Doctors are Artists'. No direct connection is established between Doctors and Artists. False.\nStep 3: Conclusion II: 'Some Scientists are Artists'. Since Scientists overlap with Writers, and all Writers are Artists, the overlapping part is definitely Artists. True."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nAll Cats are Animals.\nSome Animals are Wild.\nNo Wild is Pet.\n\nConclusions:\nI. Some Cats are not Pets.\nII. No Cat is Wild.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: Cats are inside Animals. Animals overlap with Wild. Wild does not touch Pet.\nStep 2: Conclusion I: We don't know the exact relation between Cats and Pets. False.\nStep 3: Conclusion II: We don't know the relation between Cats and Wild. They might overlap. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nSome Books are Novels.\nAll Novels are Stories.\nSome Stories are Poems.\n\nConclusions:\nI. Some Books are Stories.\nII. Some Poems are Novels.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: Books overlap with Novels. Novels are inside Stories. Stories overlap with Poems.\nStep 2: Conclusion I: Books overlap with Novels, and all Novels are Stories, so Books must overlap with Stories. True.\nStep 3: Conclusion II: Poems overlap with Stories, but not necessarily with Novels. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nAll Cars are Vehicles.\nSome Vehicles are Electric.\nNo Electric is Diesel.\n\nConclusions:\nI. Some Cars are Electric.\nII. No Car is Diesel.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: Cars are inside Vehicles. Vehicles overlap with Electric. Electric does not touch Diesel.\nStep 2: Conclusion I: Cars and Electric have no direct overlap given. False.\nStep 3: Conclusion II: Cars and Diesel have no direct negative relation. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nAll Apples are Fruits.\nSome Fruits are Mangoes.\nNo Mango is Orange.\n\nConclusions:\nI. Some Apples are Mangoes.\nII. No Apple is Orange.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: Apples are inside Fruits. Fruits overlap with Mangoes. Mangoes don't touch Orange.\nStep 2: Conclusion I: Apples and Mangoes have no definitive overlap. False.\nStep 3: Conclusion II: Apples and Oranges have no definitive negative restriction. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nSome Teachers are Singers.\nAll Singers are Artists.\nSome Artists are Dancers.\n\nConclusions:\nI. Some Teachers are Artists.\nII. Some Dancers are Singers.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: Teachers overlap with Singers. Singers are inside Artists. Artists overlap with Dancers.\nStep 2: Conclusion I: Since Teachers overlap with Singers and all Singers are Artists, Teachers overlap with Artists. True.\nStep 3: Conclusion II: Dancers overlap with Artists, but not necessarily Singers. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nAll Pens are Stationery.\nSome Stationery are Books.\nNo Book is Magazine.\n\nConclusions:\nI. Some Pens are Books.\nII. No Pen is Magazine.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: Pens are inside Stationery. Stationery overlaps with Books. Books don't touch Magazine.\nStep 2: Conclusion I: Pens and Books have no direct link. False.\nStep 3: Conclusion II: Pens and Magazines have no direct negative link. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nSome Students are Athletes.\nAll Athletes are Fit.\nSome Fit are Trainers.\n\nConclusions:\nI. Some Students are Fit.\nII. Some Trainers are Athletes.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: Students overlap with Athletes. Athletes are inside Fit. Fit overlaps with Trainers.\nStep 2: Conclusion I: Students overlap with Athletes, all Athletes are Fit, so Students overlap with Fit. True.\nStep 3: Conclusion II: Trainers and Athletes have no direct link. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Easy",
        questionText: "Statements:\nAll Rivers are Water Bodies.\nSome Water Bodies are Lakes.\nNo Lake is Ocean.\n\nConclusions:\nI. Some Rivers are Lakes.\nII. No River is Ocean.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: Rivers are inside Water Bodies. Water Bodies overlap with Lakes. Lakes don't touch Ocean.\nStep 2: Conclusion I: Rivers and Lakes have no direct link. False.\nStep 3: Conclusion II: Rivers and Ocean have no direct negative link. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Medium",
        questionText: "Statements:\nAll A are B.\nSome B are C.\nNo C is D.\n\nConclusions:\nI. Some A are C.\nII. No A is D.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: A is inside B. B overlaps with C. C does not touch D.\nStep 2: Conclusion I: A and C have no direct link. False.\nStep 3: Conclusion II: A and D have no direct negative relation. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Medium",
        questionText: "Statements:\nSome P are Q.\nAll Q are R.\nSome R are S.\n\nConclusions:\nI. Some P are R.\nII. Some S are Q.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: P overlaps with Q. Q is inside R. R overlaps with S.\nStep 2: Conclusion I: P overlaps with Q, and all Q is R, so P overlaps with R. True.\nStep 3: Conclusion II: S and Q have no direct link. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Medium",
        questionText: "Statements:\nAll M are N.\nNo N is O.\nSome O are P.\n\nConclusions:\nI. No M is O.\nII. Some P are not N.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Both I and II follow",
        explanation: "Step 1: M is inside N. N does not touch O. O overlaps with P.\nStep 2: Conclusion I: Since M is entirely inside N, and N never touches O, M can never touch O. True.\nStep 3: Conclusion II: The part of P that overlaps with O can never be N (since no O is N). Thus, some P are not N. True."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Medium",
        questionText: "Statements:\nSome A are B.\nSome B are C.\nAll C are D.\n\nConclusions:\nI. Some A are D.\nII. Some B are D.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only II follows",
        explanation: "Step 1: A overlaps with B. B overlaps with C. C is inside D.\nStep 2: Conclusion I: A and D have no direct link. False.\nStep 3: Conclusion II: B overlaps with C, and all C is D, so B definitely overlaps with D. True."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Medium",
        questionText: "Statements:\nAll X are Y.\nSome Y are Z.\nNo Z is W.\n\nConclusions:\nI. No X is W.\nII. Some X are Z.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: X is inside Y. Y overlaps with Z. Z does not touch W.\nStep 2: Conclusion I: No direct negative relation between X and W. False.\nStep 3: Conclusion II: No direct overlap between X and Z. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nAll Engineers are Employees.\nSome Employees are Managers.\nNo Manager is Intern.\n\nConclusions:\nI. No Engineer is Intern.\nII. Some Employees are not Intern.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only II follows",
        explanation: "Step 1: Engineers inside Employees. Employees overlap with Managers. Manager does not touch Intern.\nStep 2: Conclusion I: Engineers and Interns have no direct negative link. False.\nStep 3: Conclusion II: Employees who are Managers can never be Interns. So, some Employees are definitely not Interns. True."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nSome Coders are Testers.\nAll Testers are Developers.\nSome Developers are Designers.\n\nConclusions:\nI. Some Coders are Developers.\nII. Some Designers are Testers.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: Coders overlap Testers. Testers inside Developers. Developers overlap Designers.\nStep 2: Conclusion I: Coders overlap Testers, and all Testers are Developers. So Coders overlap Developers. True.\nStep 3: Conclusion II: Designers overlap Developers, but not necessarily Testers. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nAll Planets are Celestial Bodies.\nSome Celestial Bodies are Stars.\nNo Star is Satellite.\n\nConclusions:\nI. No Planet is Satellite.\nII. Some Stars are Planets.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: Planets inside Celestial Bodies. Celestial Bodies overlap Stars. Star does not touch Satellite.\nStep 2: Conclusion I: Planets and Satellites have no direct negative link. False.\nStep 3: Conclusion II: Stars and Planets have no direct overlap. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nSome Fruits are Vegetables.\nAll Vegetables are Healthy.\nNo Healthy is Junk.\n\nConclusions:\nI. Some Fruits are Healthy.\nII. No Fruit is Junk.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: Fruits overlap Vegetables. Vegetables inside Healthy. Healthy does not touch Junk.\nStep 2: Conclusion I: Fruits overlap Vegetables, and all Vegetables are Healthy, so Fruits overlap Healthy. True.\nStep 3: Conclusion II: Some Fruits are Healthy (and thus not Junk), but we cannot say NO Fruit is Junk, because the fruits that are not Vegetables might be Junk. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nAll Programmers are Logical.\nSome Logical are Gamers.\nNo Gamer is Athlete.\n\nConclusions:\nI. No Programmer is Athlete.\nII. Some Programmers are Gamers.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: Programmers inside Logical. Logical overlaps Gamers. Gamer does not touch Athlete.\nStep 2: Conclusion I: Programmers and Athletes have no direct negative link. False.\nStep 3: Conclusion II: Programmers and Gamers have no direct overlap. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nSome A are B.\nSome B are C.\nNo C is D.\nAll D are E.\n\nConclusions:\nI. Some A are C.\nII. No B is D.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: A overlaps B. B overlaps C. C does not touch D. D is inside E.\nStep 2: Conclusion I: No direct overlap between A and C. False.\nStep 3: Conclusion II: B overlaps C, but the remaining part of B can touch D. So we cannot definitively say no B is D. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nAll P are Q.\nAll Q are R.\nSome R are S.\nNo S is T.\n\nConclusions:\nI. Some P are S.\nII. No P is T.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: P inside Q. Q inside R. R overlaps S. S does not touch T.\nStep 2: Conclusion I: P and S have no direct link. False.\nStep 3: Conclusion II: P and T have no direct negative link. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nSome M are N.\nNo N is O.\nSome O are P.\nAll P are Q.\n\nConclusions:\nI. Some Q are O.\nII. No M is O.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: M overlaps N. N does not touch O. O overlaps P. P inside Q.\nStep 2: Conclusion I: O overlaps P, and all P is Q, so O must overlap Q. True.\nStep 3: Conclusion II: Only the part of M that is N cannot be O. The rest of M can be O. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nAll Doctors are Humans.\nSome Humans are Scientists.\nSome Scientists are Inventors.\n\nConclusions:\nI. Some Doctors are Inventors.\nII. Some Humans are Inventors.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Neither I nor II follows",
        explanation: "Step 1: Doctors inside Humans. Humans overlap Scientists. Scientists overlap Inventors.\nStep 2: Conclusion I: Doctors and Inventors have no direct link. False.\nStep 3: Conclusion II: Humans and Inventors have no direct link. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nSome Cars are Bikes.\nAll Bikes are Vehicles.\nNo Vehicle is Aircraft.\n\nConclusions:\nI. Some Cars are Vehicles.\nII. No Car is Aircraft.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: Cars overlap Bikes. Bikes inside Vehicles. Vehicles do not touch Aircraft.\nStep 2: Conclusion I: Cars overlap Bikes, and all Bikes are Vehicles, so Cars overlap Vehicles. True.\nStep 3: Conclusion II: Some Cars are Vehicles (thus not Aircraft). But we cannot guarantee NO Car is an Aircraft. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nOnly A are B.\nAll B are C.\n\nConclusions:\nI. All A are C.\nII. Some C are A.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only II follows",
        explanation: "Step 1: 'Only A are B' means 'All B are A'. So B is inside A.\nStep 2: All B are C. So B is inside C too.\nStep 3: Conclusion I: B is inside A, but all A is not necessarily C. False.\nStep 4: Conclusion II: Since B is inside both A and C, A and C must overlap. True."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nOnly Doctors are Scientists.\nSome Scientists are Writers.\n\nConclusions:\nI. Some Writers are Doctors.\nII. All Doctors are Scientists.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: 'Only Doctors are Scientists' translates to 'All Scientists are Doctors'.\nStep 2: Scientists overlap Writers.\nStep 3: Conclusion I: Since Scientists overlap Writers and all Scientists are Doctors, Writers overlap Doctors. True.\nStep 4: Conclusion II: 'All Scientists are Doctors' does not mean 'All Doctors are Scientists'. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nOnly Managers are Leaders.\nAll Leaders are Employees.\n\nConclusions:\nI. All Managers are Employees.\nII. Some Employees are Leaders.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only II follows",
        explanation: "Step 1: 'Only Managers are Leaders' translates to 'All Leaders are Managers'.\nStep 2: All Leaders are Employees. (So Leaders are inside both Managers and Employees).\nStep 3: Conclusion I: All Leaders are Managers and Employees, but not all Managers are Employees. False.\nStep 4: Conclusion II: All Leaders are Employees naturally means some Employees are Leaders. True."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nOnly Coders are Developers.\nSome Developers are Testers.\n\nConclusions:\nI. Some Testers are Coders.\nII. All Coders are Developers.",
        options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither I nor II follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: 'Only Coders are Developers' means 'All Developers are Coders'.\nStep 2: Developers overlap Testers.\nStep 3: Conclusion I: Developers overlap Testers, and all Developers are Coders. So Testers overlap Coders. True.\nStep 4: Conclusion II: It is 'All Devs are Coders', not the other way around. False."
    },
    {
        category: "Logical Reasoning", topic: "Syllogism", difficulty: "Hard",
        questionText: "Statements:\nAll Analysts are Employees.\nSome Employees are Managers.\nNo Manager is Director.\nSome Directors are Executives.\n\nConclusions:\nI. Some Employees are not Directors.\nII. No Analyst is Director.\nIII. Some Executives are Managers.",
        options: ["Only I follows", "Only I and II follow", "Only II and III follow", "None follows"],
        correctAnswer: "Only I follows",
        explanation: "Step 1: Analysts inside Employees. Employees overlap Managers. Managers do not touch Directors. Directors overlap Executives.\nStep 2: Conclusion I: The Employees that are Managers can never be Directors. So, some Employees are definitely not Directors. True.\nStep 3: Conclusion II: Analysts and Directors have no direct negative link. False.\nStep 4: Conclusion III: Executives and Managers have no direct link. False."
    }
];

const seedBatch22Syllogism = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Syllogism questions...");
        await Question.deleteMany({ topic: "Syllogism" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch22Questions.length} Syllogism Questions...`);
        
        await Question.insertMany(batch22Questions);
        console.log(`✅ BOOM! Tumhare pure 30 Syllogism questions successfully seed ho gaye hain!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch22Syllogism();