const mongoose = require('mongoose');
require('dotenv').config(); 
const Question = require('./models/Question'); // Apne path ke hisaab se adjust kar lena

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected for Database Module'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const mongoDbQuestions = [
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q1.** A collection contains 50 million documents. Most queries are:\n\n\`\`\`javascript\ndb.users.find({\n    email: 'abc@gmail.com',\n    isActive: true\n})\n\`\`\`\n\nWhich indexing strategy provides the best performance?",
        options: ["Index only email", "Index only isActive", "Compound Index (email, isActive)", "Text Index on email"],
        correctAnswer: "Compound Index (email, isActive)",
        explanation: "A compound index on both fields allows MongoDB to efficiently narrow down the result set. It supports queries that match on the prefix of the index."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Hard",
        questionText: "**Q2.** Consider the query:\n\n\`\`\`javascript\ndb.orders.find({\n    amount: { $gt: 1000 }\n}).sort({\n    createdAt: -1\n})\n\`\`\`\n\nWhich compound index is generally the most effective?",
        options: ["amount, createdAt", "createdAt, amount", "amount", "createdAt"],
        correctAnswer: "createdAt, amount",
        explanation: "Based on MongoDB's ESR (Equality, Sort, Range) rule, you should index fields for Sort before Range to avoid in-memory sorting."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q3.** Which aggregation stage must appear first when you want to minimize work performed by the pipeline?",
        options: ["$group", "$lookup", "$match", "$project"],
        correctAnswer: "$match",
        explanation: "Placing `$match` as early as possible filters out unnecessary documents early, reducing the amount of data processed in subsequent stages."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q4.** Which aggregation stage performs the equivalent of an SQL INNER/LEFT JOIN between collections?",
        options: ["$union", "$merge", "$lookup", "$facet"],
        correctAnswer: "$lookup",
        explanation: "The `$lookup` stage performs a left outer join to an unsharded collection in the same database to filter in documents from the joined collection."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q5.** Given collections:\n\n\`\`\`javascript\n// Users Collection\n{ _id, name }\n\n// Orders Collection\n{ _id, userId, amount }\n\`\`\`\n\nTo calculate the total order amount per user, which aggregation stage is essential?",
        options: ["$sort", "$group", "$limit", "$unset"],
        correctAnswer: "$group",
        explanation: "The `$group` stage separates documents into groups according to a group key (userId) and allows applying accumulators like `$sum`."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q6.** Which aggregation stage is primarily used to reshape the output document by including, excluding, or computing fields?",
        options: ["$project", "$group", "$count", "$merge"],
        correctAnswer: "$project",
        explanation: "The `$project` stage passes along the documents with the requested fields to the next stage in the pipeline."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q7.** What is the purpose of the `$unwind` stage?",
        options: ["Deletes arrays.", "Converts each array element into a separate document.", "Sorts arrays.", "Removes duplicate array elements."],
        correctAnswer: "Converts each array element into a separate document.",
        explanation: "`$unwind` deconstructs an array field from the input documents to output a document for each element."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q8.** Which aggregation stage allows multiple independent pipelines to run in parallel on the same input documents?",
        options: ["$bucket", "$facet", "$lookup", "$sample"],
        correctAnswer: "$facet",
        explanation: "The `$facet` stage processes multiple aggregation pipelines within a single stage on the same set of input documents."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q9.** A collection stores user sessions that expire after 24 hours. Which MongoDB index is most appropriate?",
        options: ["Compound Index", "Text Index", "TTL Index", "Hashed Index"],
        correctAnswer: "TTL Index",
        explanation: "Time-To-Live (TTL) indexes are special single-field indexes that MongoDB uses to automatically remove documents after a certain amount of time."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q10.** Which index type is designed primarily for full-text search?",
        options: ["Sparse Index", "Compound Index", "Text Index", "TTL Index"],
        correctAnswer: "Text Index",
        explanation: "A Text Index supports text search queries on string content by tokenizing and stemming the text."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q11.** Which statement about Compound Indexes is correct?",
        options: ["They can index only numeric fields.", "They index multiple fields in a defined order.", "They automatically optimize every query.", "They replace the need for single-field indexes."],
        correctAnswer: "They index multiple fields in a defined order.",
        explanation: "Compound indexes hold data for multiple fields. The order of the fields matters based on prefix rules."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q12.** A query frequently filters only documents where:\n\n\`\`\`javascript\nstatus = 'ACTIVE'\n\`\`\`\n\nwhile inactive documents are rarely queried. Which index type is most appropriate?",
        options: ["Partial Index", "Text Index", "TTL Index", "Wildcard Index"],
        correctAnswer: "Partial Index",
        explanation: "Partial indexes only index the documents in a collection that meet a specified filter expression, saving space and improving performance."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q13.** Which command is commonly used to analyze whether a query is using an index efficiently?",
        options: ["db.stats()", "explain()", "profile()", "validate()"],
        correctAnswer: "explain()",
        explanation: "The `explain()` method provides information on the query plan, revealing if an index (IXSCAN) or full scan (COLLSCAN) was used."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q14.** Which statement about MongoDB transactions is correct?",
        options: ["Transactions work only on a single document.", "Multi-document ACID transactions are supported.", "Transactions automatically improve performance.", "Transactions are unavailable in replica sets."],
        correctAnswer: "Multi-document ACID transactions are supported.",
        explanation: "MongoDB supports multi-document ACID transactions across replica sets and sharded clusters."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q15.** What is the primary purpose of a Replica Set?",
        options: ["Horizontal partitioning", "High availability and failover", "Data compression", "Index optimization"],
        correctAnswer: "High availability and failover",
        explanation: "A replica set is a group of MongoDB processes that maintain the same data set, providing redundancy and high availability."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q16.** What is the primary purpose of Sharding?",
        options: ["Automatic backups", "Horizontal scaling by distributing data across multiple servers", "Increasing document size limits", "Replacing indexes"],
        correctAnswer: "Horizontal scaling by distributing data across multiple servers",
        explanation: "Sharding is MongoDB's method for horizontal scaling, partitioning data across multiple machines."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q17.** Which schema design is generally preferred when related data is frequently read together and has a one-to-few relationship?",
        options: ["Referencing", "Embedding", "Sharding", "Bucketing"],
        correctAnswer: "Embedding",
        explanation: "Embedding related data in a single document reduces read operations, making it highly efficient for one-to-few relationships."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q18.** Which schema design is generally preferred when related documents are large, frequently updated independently, or shared by multiple documents?",
        options: ["Embedding", "Referencing", "Denormalization only", "TTL"],
        correctAnswer: "Referencing",
        explanation: "Referencing (using ObjectIds) normalizes data and is best when relationships are complex or child data updates frequently."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q19.** In Mongoose, which method populates referenced documents?",
        options: ["join()", "populate()", "merge()", "expand()"],
        correctAnswer: "populate()",
        explanation: "Mongoose's `populate()` method replaces specified paths in a document with actual documents from other collections."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q20.** What is the main advantage of using `.lean()` in Mongoose queries?",
        options: ["Enables transactions.", "Returns plain JavaScript objects, reducing memory and improving performance.", "Automatically populates references.", "Prevents indexing."],
        correctAnswer: "Returns plain JavaScript objects, reducing memory and improving performance.",
        explanation: "Using `.lean()` returns plain JS objects instead of heavy Mongoose Documents, making read operations much faster."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q21.** Which Mongoose feature allows computed properties that are not stored in MongoDB?",
        options: ["Hooks", "Middleware", "Virtuals", "Validators"],
        correctAnswer: "Virtuals",
        explanation: "Virtuals are properties you can get and set but do not persist to MongoDB, useful for computed fields like `fullName`."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q22.** Which Mongoose middleware executes before saving a document?",
        options: ["post('save')", "pre('save')", "pre('find')", "post('validate')"],
        correctAnswer: "pre('save')",
        explanation: "The `pre('save')` hook runs before a document is inserted or updated, commonly used for hashing passwords."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q23.** Which Mongoose middleware executes after a document is successfully saved?",
        options: ["post('save')", "pre('save')", "pre('remove')", "pre('update')"],
        correctAnswer: "post('save')",
        explanation: "The `post('save')` hook runs immediately after a document has been successfully saved to the database."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q24.** Which option ensures a field is unique at the database level (assuming the index is created successfully)?",
        options: ["required: true", "unique: true", "immutable: true", "trim: true"],
        correctAnswer: "unique: true",
        explanation: "In Mongoose, `unique: true` builds a MongoDB unique index, ensuring no two documents have the same value for that field."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q25.** Which validation runs automatically before a document is persisted when using `save()`?",
        options: ["MongoDB Aggregation Validation", "Mongoose Schema Validation", "Express Validation", "JWT Validation"],
        correctAnswer: "Mongoose Schema Validation",
        explanation: "Mongoose automatically executes schema validations (like required, min, max) before sending the operation to MongoDB."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q26.** Which operation is generally atomic in MongoDB without requiring a transaction?",
        options: ["Updating a single document", "Updating multiple documents across collections", "Joining two collections", "Aggregating multiple collections"],
        correctAnswer: "Updating a single document",
        explanation: "In MongoDB, write operations are strictly atomic on the level of a single document."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Easy",
        questionText: "**Q27.** A query returns only:\n\n\`\`\`javascript\nname\nemail\n\`\`\`\n\nWhich optimization minimizes unnecessary data transfer?",
        options: ["$lookup", "Projection", "Populate", "$facet"],
        correctAnswer: "Projection",
        explanation: "Projection explicitly includes or excludes fields from returned documents, reducing network and memory usage."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Hard",
        questionText: "**Q28.** Which query pattern is most likely to benefit from a covered query?",
        options: ["Query uses indexed fields and returns only indexed fields.", "Query performs $lookup.", "Query scans the entire collection.", "Query updates every document."],
        correctAnswer: "Query uses indexed fields and returns only indexed fields.",
        explanation: "A covered query happens when all queried and returned fields are part of an index, so MongoDB doesn't even need to examine the actual documents."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q29.** Which MongoDB feature best supports high read throughput across multiple servers?",
        options: ["Replica Sets with read preferences", "TTL Indexes", "Aggregation Pipelines", "Virtual Fields"],
        correctAnswer: "Replica Sets with read preferences",
        explanation: "Configuring read preferences allows routing read operations to secondary members, vastly scaling read capacity."
    },
    {
        category: "Backend Development", topic: "MongoDB & Mongoose", difficulty: "Medium",
        questionText: "**Q30.** A production database becomes slow because many queries perform full collection scans. What should be your first investigation?",
        options: ["Increase RAM immediately.", "Drop all indexes.", "Analyze slow queries using explain() and verify index usage.", "Convert every collection into a capped collection."],
        correctAnswer: "Analyze slow queries using explain() and verify index usage.",
        explanation: "Using `explain()` on slow queries identifies whether they are doing full collection scans, allowing you to create the correct indexes to fix the issue."
    }
];

const seedMongoDbQuestions = async () => {
    try {
        console.log("🧹 Clearing old MongoDB & Mongoose records...");
        // await Question.deleteMany({ category: "Backend Development", topic: "MongoDB & Mongoose" }); 
        
        console.log(`🚀 Injecting ${mongoDbQuestions.length} Formatted Questions...`);
        await Question.insertMany(mongoDbQuestions);
        
        console.log(`✅ SUCCESS! All 30 MongoDB & Mongoose Questions Seeded.`);
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
};

seedMongoDbQuestions();