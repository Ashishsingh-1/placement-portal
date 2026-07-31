const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected for Blood Relations Seeding'))
  .catch(err => console.log(err));

const batch23Questions = [
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Easy",
        questionText: "Pointing to a photograph, Rahul said: 'She is the daughter of the only son of my grandfather.' How is the woman related to Rahul?",
        options: ["Sister", "Aunt", "Cousin", "Mother"],
        correctAnswer: "Sister",
        explanation: "Step 1: Break down the sentence from the end. 'My grandfather's only son' = Rahul's Father. \nStep 2: 'Daughter of Rahul's father' = Rahul's Sister. \nStep 3: Therefore, the woman is Rahul's Sister."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "A man introduced a woman as: 'Her mother's husband's sister is my aunt.' How is the woman related to the man?",
        options: ["Sister", "Cousin", "Wife", "Niece"],
        correctAnswer: "Sister",
        explanation: "Step 1: 'Her mother's husband' = Her Father. \nStep 2: 'Her father's sister' = Her Aunt. \nStep 3: The man says 'Her Aunt is my Aunt'. This means they share the same Aunt, making them siblings or cousins. Since 'Sister' is a direct relation given in the options, she is his sister."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Easy",
        questionText: "A is the brother of B. B is the mother of C. C is the sister of D. How is A related to D?",
        options: ["Uncle", "Father", "Brother", "Grandfather"],
        correctAnswer: "Uncle",
        explanation: "Step 1: B is the mother of C, and C is the sister of D. So, B is the mother of D as well. \nStep 2: A is the brother of B (who is D's mother). \nStep 3: Mother's brother = Maternal Uncle."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "P is the father of Q. R is the wife of P. S is the brother of Q. T is the daughter of S. How is T related to R?",
        options: ["Niece", "Granddaughter", "Daughter", "Sister"],
        correctAnswer: "Granddaughter",
        explanation: "Step 1: P is father of Q and R is wife of P. So, R is the mother of Q and S (since S is Q's brother). \nStep 2: T is the daughter of S. \nStep 3: Since S is R's son, T (S's daughter) is R's granddaughter."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Easy",
        questionText: "Introducing a boy, a girl said: 'He is the son of the daughter of my father.' How is the boy related to the girl?",
        options: ["Son", "Brother", "Nephew", "Son or Nephew"],
        correctAnswer: "Son or Nephew",
        explanation: "Step 1: 'Daughter of my father' can either be the girl herself or her sister. \nStep 2: If she is the only daughter, the boy is her Son. \nStep 3: If she has a sister, the boy is her Nephew. Hence, Son or Nephew."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "A woman said: 'The person in the photograph is the son of my father's only daughter.' Who is the person in the photograph?",
        options: ["Her brother", "Her nephew", "Her son", "Her father"],
        correctAnswer: "Her son",
        explanation: "Step 1: 'My father's only daughter' = The woman herself. \nStep 2: The person is the 'son of the woman'. \nStep 3: Therefore, the person is her son."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "Pointing to a man, Rohan said: 'His mother is the only daughter of my grandmother.' How is the man related to Rohan?",
        options: ["Brother", "Cousin", "Uncle", "Father"],
        correctAnswer: "Brother",
        explanation: "Step 1: 'Only daughter of my grandmother' = Rohan's mother. \nStep 2: Rohan says 'His mother is Rohan's mother'. \nStep 3: This means the man and Rohan share the same mother. Hence, he is Rohan's brother."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "A is B's sister. B is C's father. D is C's brother. How is A related to D?",
        options: ["Aunt", "Mother", "Grandmother", "Sister"],
        correctAnswer: "Aunt",
        explanation: "Step 1: B is the father of C and D is C's brother. So, B is also D's father. \nStep 2: A is B's sister. \nStep 3: Father's sister = Aunt. Therefore, A is D's Aunt."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "Pointing to a woman, Aman said: 'Her brother's father is my grandfather.' How is the woman related to Aman?",
        options: ["Sister", "Aunt", "Mother", "Aunt or Mother"],
        correctAnswer: "Aunt or Mother",
        explanation: "Step 1: 'Her brother's father' = Her father. \nStep 2: Aman says 'Her father is my grandfather'. \nStep 3: This means the woman is the daughter of Aman's grandfather. She could either be Aman's mother or his Aunt (father's sister)."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "If X is Y's father, Y is Z's daughter and Z is W's mother, how is X related to W?",
        options: ["Father", "Uncle", "Grandfather", "Brother"],
        correctAnswer: "Father",
        explanation: "Step 1: Y is Z's daughter, and X is Y's father. This means X and Z are married (X is Husband, Z is Wife). \nStep 2: Z is W's mother. \nStep 3: Since X is married to Z, X must be W's father."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Easy",
        questionText: "A is the father of B. B is the mother of C. C is married to D. E is the son of C. How is A related to E?",
        options: ["Grandfather", "Great-grandfather", "Uncle", "Father"],
        correctAnswer: "Great-grandfather",
        explanation: "Step 1: C is E's mother. \nStep 2: B is C's mother. So, B is E's grandmother. \nStep 3: A is B's father. So, A is the father of E's grandmother = Great-grandfather."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Easy",
        questionText: "P is the sister of Q. Q is married to R. R is the father of S. How is P related to S?",
        options: ["Mother", "Aunt", "Grandmother", "Sister"],
        correctAnswer: "Aunt",
        explanation: "Step 1: Q and R are married. R is the father of S, so Q is the mother of S. \nStep 2: P is Q's sister. \nStep 3: Mother's sister = Aunt. P is S's Aunt."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "A man said: 'The woman standing there is the wife of the grandson of my father.' How is the woman related to the man?",
        options: ["Daughter", "Sister-in-law", "Daughter-in-law", "Niece"],
        correctAnswer: "Daughter-in-law",
        explanation: "Step 1: 'Grandson of my father' = The man's son (assuming he is the only son) or nephew. \nStep 2: Wife of son = Daughter-in-law. (Standard placement assumption aligns with direct relations)."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "A is the son of B. B is the daughter of C. C is the wife of D. How is D related to A?",
        options: ["Father", "Uncle", "Grandfather", "Great-grandfather"],
        correctAnswer: "Grandfather",
        explanation: "Step 1: C is wife of D, so D is husband. \nStep 2: B is daughter of C and D. \nStep 3: A is the son of B. \nStep 4: Therefore, D is the father of A's mother, making D the Grandfather (Maternal) of A."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Easy",
        questionText: "M is the father of N. N is married to O. O is the mother of P. How is M related to P?",
        options: ["Uncle", "Grandfather", "Father", "Brother"],
        correctAnswer: "Grandfather",
        explanation: "Step 1: N is married to O, and O is the mother of P. So, N is the father of P. \nStep 2: M is the father of N. \nStep 3: Father's father = Grandfather. M is P's Grandfather."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "Pointing to a girl, Raj said: 'She is the daughter of the wife of the only son of my grandfather.' How is the girl related to Raj?",
        options: ["Aunt", "Sister", "Cousin", "Niece"],
        correctAnswer: "Sister",
        explanation: "Step 1: 'Only son of my grandfather' = Raj's Father. \nStep 2: 'Wife of Raj's father' = Raj's Mother. \nStep 3: 'Daughter of Raj's mother' = Raj's Sister."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "A's mother is B's sister. B's husband is C. C's father is D. How is D related to A?",
        options: ["Uncle", "Grandfather", "Father of Uncle", "Brother-in-law"],
        correctAnswer: "Father of Uncle",
        explanation: "Step 1: B is A's Aunt (Mother's sister). \nStep 2: C is B's husband, making C A's Uncle (by marriage). \nStep 3: D is C's father. Thus, D is the father of A's Uncle."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "Introducing a man, Ravi said: 'His wife's mother is the only daughter of my father.' How is the man related to Ravi?",
        options: ["Brother-in-law", "Son-in-law", "Niece's Husband", "Nephew"],
        correctAnswer: "Niece's Husband",
        explanation: "Step 1: 'Only daughter of my father' = Ravi's sister. \nStep 2: Ravi's sister is the man's wife's mother. \nStep 3: The man's wife is Ravi's sister's daughter (Ravi's Niece). \nStep 4: Therefore, the man is the husband of Ravi's niece."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Easy",
        questionText: "A is the brother of B. B is married to C. C is the mother of D. How is A related to D?",
        options: ["Uncle", "Father", "Grandfather", "Brother"],
        correctAnswer: "Uncle",
        explanation: "Step 1: B is married to C, and C is mother of D. So, B is the father of D. \nStep 2: A is the brother of B. \nStep 3: Father's brother = Uncle. A is D's Uncle."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "P is Q's daughter. Q is R's son. R is S's husband. How is P related to S?",
        options: ["Daughter", "Granddaughter", "Niece", "Sister"],
        correctAnswer: "Granddaughter",
        explanation: "Step 1: R is S's husband. So S is R's wife. \nStep 2: Q is R's (and S's) son. \nStep 3: P is Q's daughter. \nStep 4: Son's daughter = Granddaughter. P is S's granddaughter."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "Pointing to a photograph, Mohan said: 'The woman in the photograph is the daughter of the wife of the only son of my grandfather.' How is the woman related to Mohan?",
        options: ["Mother", "Sister", "Aunt", "Wife"],
        correctAnswer: "Sister",
        explanation: "Step 1: 'Only son of my grandfather' = Mohan's Father. \nStep 2: 'Wife of Mohan's father' = Mohan's Mother. \nStep 3: 'Daughter of Mohan's mother' = Mohan's Sister."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "A is the father of B. B is the brother of C. C is married to D. D is the mother of E. How is A related to E?",
        options: ["Grandfather", "Uncle", "Father", "Great-grandfather"],
        correctAnswer: "Grandfather",
        explanation: "Step 1: C is married to D, and D is E's mother. So, C is E's father. \nStep 2: B is C's brother, and A is B's father. So A is also C's father. \nStep 3: Since A is the father of E's father (C), A is E's Grandfather."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "A woman said: 'My mother's father's only grandson is my brother.' How is the brother related to the woman's grandfather?",
        options: ["Son", "Grandson", "Nephew", "Uncle"],
        correctAnswer: "Grandson",
        explanation: "Step 1: 'My mother's father' = Grandfather. \nStep 2: The question directly asks how the brother is related to the grandfather. \nStep 3: A brother to the woman is automatically a Grandson to her grandfather."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "Pointing to a person, Neha said: 'His father's mother is my grandmother.' How is the person related to Neha?",
        options: ["Brother / Cousin", "Father", "Uncle", "Nephew"],
        correctAnswer: "Brother / Cousin",
        explanation: "Step 1: 'His father's mother' = His Grandmother. \nStep 2: Neha says 'His grandmother is my grandmother'. \nStep 3: If they share the same grandmother, they are either siblings (brother/sister) or first cousins."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "A is B's son. B is C's daughter. C is D's wife. How is D related to A?",
        options: ["Father", "Uncle", "Grandfather", "Brother"],
        correctAnswer: "Grandfather",
        explanation: "Step 1: C is D's wife, meaning D is C's husband. \nStep 2: B is C's (and D's) daughter. \nStep 3: A is B's son. \nStep 4: Therefore, D is the father of A's mother, making D the Grandfather."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "A family consists of 2 grandparents, 2 parents, and 3 children. How many members are there at minimum?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7",
        explanation: "Step 1: The standard minimal non-overlapping hierarchy: 2 Grandparents (Generation 1). \nStep 2: They have a child who is married. Those 2 are the Parents (Generation 2). \nStep 3: The parents have 3 children (Generation 3). \nStep 4: Total = 2 + 2 + 3 = 7 members."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "Pointing to a photograph, Amit said: 'This man is the husband of the granddaughter of my grandfather.' How is the man related to Amit?",
        options: ["Brother", "Brother-in-law", "Cousin", "Son-in-law"],
        correctAnswer: "Brother-in-law",
        explanation: "Step 1: 'Granddaughter of my grandfather' = Amit's Sister or Cousin. \nStep 2: The man is the husband of Amit's sister/cousin. \nStep 3: Sister's husband = Brother-in-law."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Easy",
        questionText: "A's father is B. B's father is C. C's father is D. How is D related to A?",
        options: ["Grandfather", "Great-grandfather", "Uncle", "Father"],
        correctAnswer: "Great-grandfather",
        explanation: "Step 1: C is A's Grandfather. \nStep 2: D is C's father. \nStep 3: Therefore, D is the father of A's grandfather, making him A's Great-grandfather."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Medium",
        questionText: "P is the mother of Q. Q is the father of R. R is married to S. T is the daughter of R. How is T related to P?",
        options: ["Granddaughter", "Daughter", "Great-granddaughter", "Niece"],
        correctAnswer: "Great-granddaughter",
        explanation: "Step 1: Q is child of P. R is child of Q. T is child of R. \nStep 2: This means T is 3 generations below P. \nStep 3: Therefore, T is the Great-granddaughter of P."
    },
    {
        category: "Logical Reasoning", topic: "Blood Relations", difficulty: "Hard",
        questionText: "Six persons: A, B, C, D, E and F. A and B are married. C is brother of A. D is father of B. E is daughter of C. F is son of D. How is F related to E?",
        options: ["Uncle", "Brother", "Uncle's Brother-in-law", "Grandfather"],
        correctAnswer: "Uncle's Brother-in-law",
        explanation: "Step 1: C is E's father. \nStep 2: A is C's sibling (Aunt/Uncle of E). \nStep 3: B is married to A. \nStep 4: D is father of B and F is son of D. So, F is B's brother. \nStep 5: Therefore, F is the brother of E's Aunt/Uncle's spouse. (Uncle's Brother-in-law or No direct blood relation)."
    }
];

const seedBatch23BloodRelations = async () => {
    try {
        console.log("🧹 ALERT: Deleting old Blood Relations questions...");
        await Question.deleteMany({ topic: "Blood Relations" }); 
        console.log("🗑️ Purana Data safely deleted!");

        console.log(`🚀 Injecting all ${batch23Questions.length} Blood Relations Questions...`);
        
        await Question.insertMany(batch23Questions);
        console.log(`✅ BOOM! Tumhare pure 30 Blood Relations questions successfully seed ho gaye hain!`);
        
        process.exit();
    } catch (error) {
        console.error("Error seeding data: ", error);
        process.exit(1);
    }
};

seedBatch23BloodRelations();