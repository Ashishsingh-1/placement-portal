const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk'); 
const InterviewQuestion = require('../models/InterviewQuestion'); 

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ==========================================
// 🧠 HELPER: DYNAMIC QUESTION ENGINE
// ==========================================
async function generatePersonalizedQuestion(resumeText, roundType = "", previousQuestions = [], questionType = "MIDDLE") {
    
    const typeStr = roundType.toLowerCase();
    let mappedRound = 'HR'; 
    
    if (/\bhr\b/.test(typeStr) || typeStr.includes("human resource")) {
        mappedRound = 'HR';
    } else if (/\bmr\b/.test(typeStr) || typeStr.includes("manager")) {
        mappedRound = 'MR';
    } else if (/\btr\b/.test(typeStr) || typeStr.includes("tech") || typeStr.includes("developer") || typeStr.includes("engineer")) {
        mappedRound = 'TR';
    }

    let baseQuestion = "";
    let baseExplanation = "";
    let isTrMiddle = false; 

    if (questionType === "INTRO") {
        const intros = {
            'HR': [
                { q: "Tell me about yourself and your academic background.", e: "Candidate should summarize their education and skills." },
                { q: "Walk me through your resume, focusing on your college projects.", e: "Candidate should highlight key academic milestones." },
                { q: "Describe your journey through college and what sparked your interest in this field.", e: "Candidate should show passion for their chosen career." }
            ],
            'MR': [
                { q: "Walk me through a college project where you had to take the lead or manage a team.", e: "Candidate should highlight teamwork and responsibility." },
                { q: "Describe a time during your academics when you managed a difficult team situation.", e: "Candidate should explain conflict resolution in a student project." },
                { q: "How do you prioritize your tasks when you have multiple assignments and exams at the same time?", e: "Candidate should demonstrate time management." }
            ],
            'TR': [
                { q: "Walk me through the technical architecture of your most complex college project.", e: "Candidate should explain the tech stack and system design." },
                { q: "Which programming language or framework are you most comfortable with, and why?", e: "Candidate should justify their tech preference technically." },
                { q: "Tell me about a time you faced a major technical bug in your project and how you fixed it.", e: "Candidate should demonstrate debugging skills." }
            ]
        };
        const selected = intros[mappedRound][Math.floor(Math.random() * 3)];
        baseQuestion = selected.q;
        baseExplanation = selected.e;
    } 
    else if (questionType === "OUTRO") {
        const outros = {
            'HR': [
                { q: "Do you have any questions for us about starting your career here?", e: "Candidate should ask about training, culture, or growth." },
                { q: "Where do you see yourself in the first 3 years of your career?", e: "Candidate should express a desire to learn and contribute." },
                { q: "Why should we hire you for this entry-level role?", e: "Candidate must connect their academic skills to the job." }
            ],
            'MR': [
                { q: "As you step into the corporate world, what kind of management style do you respond best to?", e: "Candidate should discuss their ideal work environment." },
                { q: "If selected, how would you approach your first 30 days working in our team?", e: "Candidate should mention learning, observing, and adapting." },
                { q: "What are your expectations from your future manager?", e: "Candidate should show eagerness for mentorship and feedback." }
            ],
            'TR': [
                { q: "Do you have any technical questions about the technologies we use here?", e: "Candidate should ask about the company's tech stack." },
                { q: "Which new technology or framework are you planning to learn next?", e: "Candidate should show continuous learning mindset." },
                { q: "If you could redesign your final year project today, what technical changes would you make?", e: "Candidate should show critical thinking about their own code." }
            ]
        };
        const selected = outros[mappedRound][Math.floor(Math.random() * 3)];
        baseQuestion = selected.q;
        baseExplanation = selected.e;
    } 
    else {
        if (mappedRound === 'TR') {
            isTrMiddle = true;
        } else {
            const HR_INTROS = ["Tell me about yourself.", "Walk me through your resume."];
            const HR_OUTROS = ["Do you have any questions for us?", "Where do you see yourself in 5 years?", "What are your short-term and long-term career goals?", "Why should we hire you?"];
            const MR_INTROS = ["Tell me about a time when you took complete ownership of a project.", "Describe a situation where you led a team without having formal authority.", "Why should I trust you with an important responsibility?"];
            const MR_OUTROS = ["If you are made a manager tomorrow, what is the first thing you would change?", "Why should we select you for this role over other candidates?", "What is more important: being liked by your team or being respected?"];

            const introList = mappedRound === 'HR' ? HR_INTROS : MR_INTROS;
            const outroList = mappedRound === 'HR' ? HR_OUTROS : MR_OUTROS;
            
            const allExcludedQuestions = [...previousQuestions, ...introList, ...outroList];

            const randomQuestionArray = await InterviewQuestion.aggregate([
                { $match: { roundType: mappedRound, questionText: { $nin: allExcludedQuestions } } },
                { $sample: { size: 1 } }
            ]);

            baseQuestion = randomQuestionArray.length > 0 ? randomQuestionArray[0].questionText : "Tell me about a challenge you faced and how you overcame it.";
            baseExplanation = randomQuestionArray.length > 0 ? randomQuestionArray[0].explanation : "Assess problem-solving skills.";
        }
    }

    let promptContent = "";

    if (isTrMiddle) {
        const techTopics = ["Performance Optimization", "Security", "Database Design", "Debugging", "API Architecture", "Data Structures"];
        const randomTopic = techTopics[Math.floor(Math.random() * techTopics.length)];
        
        promptContent = `
            You are a professional Technical Lead interviewing a Recent Graduate.
            Resume: "${resumeText.substring(0, 1500)}"
            Previously Asked: ${previousQuestions.join(" | ")}

            TASK 1: Generate a specific technical question focusing on **${randomTopic}** based on their academic projects.
            DO NOT output any greetings. Ask DIRECTLY. Keep it under 30 words.
            CRITICAL RULE: Speak directly to the applicant using "you". NEVER use the word "candidate".

            TASK 2: Write the ideal technical keywords they must mention.

            STRICT JSON FORMAT: { "finalQuestion": "...", "dynamicExplanation": "..." }
        `;
    } else {
        promptContent = `
            You are a professional ${mappedRound} Interviewer interviewing a Recent Graduate.
            Resume: "${resumeText.substring(0, 1500)}"
            
            YOUR ASSIGNED QUESTION TO ASK: "${baseQuestion}"
            IDEAL ANSWER EXPECTATION: "${baseExplanation}"

            TASK 1: You MUST output the exact ASSIGNED QUESTION provided above. 
            CRITICAL RULE: DO NOT use any greetings or conversational fillers. Ask DIRECTLY.
            CRITICAL RULE 2: Speak directly to the applicant using "you". NEVER use the word "candidate" in your spoken output.

            TASK 2: Adapt the IDEAL ANSWER EXPECTATION for this fresher's specific resume context.

            STRICT JSON FORMAT: { "finalQuestion": "...", "dynamicExplanation": "..." }
        `;
    }

    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "system", content: promptContent }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.1, 
    });

    let rawOutput = chatCompletion.choices[0]?.message?.content.replace(/```json|```/g, "").trim();
    try {
        const parsedData = JSON.parse(rawOutput);
        return {
            finalQuestion: parsedData.finalQuestion || baseQuestion,
            baseExplanation: parsedData.dynamicExplanation || baseExplanation
        };
    } catch (err) {
        return { finalQuestion: baseQuestion, baseExplanation };
    }
}

// ==========================================
// 🚀 API ROUTES
// ==========================================

router.post('/generate-question', async (req, res) => {
    try {
        const { roundType, resumeText = "", previousQuestions = [] } = req.body;
        const qData = await generatePersonalizedQuestion(resumeText, roundType, previousQuestions, "INTRO");
        res.json({ question: qData.finalQuestion, explanation: qData.baseExplanation });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/process-text-answer', async (req, res) => {
    try {
        const { currentQuestion, userTranscript, resumeText = "", roundType, previousQuestions = [], questionIndex } = req.body;

        const finalTranscript = (userTranscript && userTranscript.trim() !== "") ? userTranscript : "[User remained silent]";

        let qType = "MIDDLE";
        if (questionIndex >= 6) { 
            qType = "OUTRO";
        }

        const qData = await generatePersonalizedQuestion(resumeText, roundType, previousQuestions, qType);

        // 🔥 THE ULTIMATE JSON FIX FOR REPEAT LOGIC 🔥
        const transitionPrompt = `
            You are a professional human ${roundType} Interviewer.
            Current Question Asked: "${currentQuestion}"
            Candidate's Reply (Speech-to-Text): "${finalTranscript}"
            Next Planned Question: "${qData.finalQuestion}"

            TASK:
            Determine if the candidate's reply is RELEVANT, IRRELEVANT, or SILENT.

            1. SILENT: If reply is exactly "[User remained silent]".
            2. IRRELEVANT: If the reply is blatantly off-topic (e.g., talking about cooking food, sleeping, movies, or complete gibberish).
            3. RELEVANT: Any genuine attempt to answer the question, even if it has bad grammar, is incomplete, or is short. Be highly lenient due to STT errors.

            Based on your determination, generate a JSON response:
            - If RELEVANT: 
              "spokenDialogue" = A detailed 2-3 sentence professional remark acknowledging a point they made, followed directly by the Next Planned Question. 
              "isRepeat" = false
              "pureQuestion" = "${qData.finalQuestion}"
            
            - If IRRELEVANT: 
              "spokenDialogue" = "I think we got a bit off track there. Let me repeat the question. ${currentQuestion}"
              "isRepeat" = true
              "pureQuestion" = "${currentQuestion}"
            
            - If SILENT: 
              "spokenDialogue" = "I didn't quite catch that. Let me repeat the question. ${currentQuestion}"
              "isRepeat" = true
              "pureQuestion" = "${currentQuestion}"

            OUTPUT STRICTLY VALID JSON ONLY:
            {
              "spokenDialogue": "...",
              "pureQuestion": "...",
              "isRepeat": true/false
            }
        `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "system", content: transitionPrompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2, // Low temp for strictly accurate JSON
        });

        let parsedResponse = {
            spokenDialogue: `Got it. Let's move on. ${qData.finalQuestion}`,
            pureQuestion: qData.finalQuestion,
            isRepeat: false
        };

        try {
            const rawJson = chatCompletion.choices[0]?.message?.content.replace(/```json|```/g, "").trim();
            parsedResponse = JSON.parse(rawJson);
        } catch(e) {
            console.error("JSON parsing failed, using fallback.");
        }

        res.json({
            userTranscript: finalTranscript,
            spokenDialogue: parsedResponse.spokenDialogue,
            pureQuestion: parsedResponse.pureQuestion,
            explanation: parsedResponse.isRepeat ? "Wait for relevant answer." : qData.baseExplanation,
            isRepeat: parsedResponse.isRepeat
        });

    } catch (err) {
        res.status(500).json({ error: "Failed to process answer." });
    }
});

router.post('/wrap-up', async (req, res) => {
    try {
        const { roundType, userTranscript } = req.body;
        const finalTranscript = (userTranscript && userTranscript.trim() !== "") ? userTranscript : "[User remained silent]";

        const wrapUpPrompt = `
            You are a professional ${roundType} Interviewer.
            You just asked the candidate your final closing question (e.g., "Do you have any questions for us?").
            The candidate replied: "${finalTranscript}"

            TASK:
            1. If the candidate asked a valid professional question, ANSWER IT in detail (3-4 sentences) based on your role to give them a satisfying response.
            2. If their answer is completely irrelevant, politely ignore it and move to conclusion.
            3. If they remained silent or said no, warmly acknowledge it.
            4. Finally, CONCLUDE the interview (e.g., "Thank you so much for your time today. It was great speaking with you. We will get back to you soon with the next steps!").
            
            CRITICAL RULES:
            - NEVER use the word "candidate". Speak directly to them.
            - Output ONLY the exact dialogue you will speak.
        `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "system", content: wrapUpPrompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.6, 
        });

        let finalReply = chatCompletion.choices[0]?.message?.content.replace(/^"|"$/g, '').trim();
        res.json({ finalReply });
    } catch (err) {
        res.status(500).json({ error: "Failed to wrap up interview." });
    }
});

router.post('/evaluate-interview', async (req, res) => {
    try {
        const { roundType, transcriptions } = req.body; 

        const interviewDataString = transcriptions.map((t, i) => 
            `Q${i+1}: ${t.question}\nCandidate Answer: ${t.answer}\nIdeal Explanation Required: ${t.explanation || 'General analysis'}`
        ).join("\n\n-----------------\n\n");

        const evaluationPrompt = `
            You are an elite Corporate Evaluator grading a ${roundType} round for a FRESHER candidate. 
            
            IMPORTANT CONTEXT: The "Candidate Answer" was generated via a Speech-to-Text browser API. 
            You MUST ignore spelling mistakes, weird homophones, and broken grammar caused by the microphone. Evaluate them ONLY on the core points they were trying to make compared to the 'Ideal Explanation Required'.
            
            ${interviewDataString}

            TASK 1: Evaluate on 4 specific levels (contentQuality, grammarAndVocab, clarityAndConciseness, confidenceAndDelivery).
            TASK 2: Analyze the completeness of their answers to provide 'answerStats':
            - 'unanswered': Count of answers that are exactly "[User remained silent]".
            - 'answeredPartially': Count of answers that are too short, incomplete, evasive, or off-topic.
            - 'answeredFully': Count of answers that adequately and correctly address the question.
            - 'totalQuestions': Total number of questions asked.

            Format exactly like this JSON structure, output ONLY valid JSON, no markdown tags:
            {
              "overallScore": 85,
              "answerStats": {
                "totalQuestions": 7,
                "answeredFully": 4,
                "answeredPartially": 2,
                "unanswered": 1
              },
              "metrics": {
                "contentQuality": 88,
                "grammarAndVocab": 85, 
                "clarityAndConciseness": 80,
                "confidenceAndDelivery": 85
              },
              "detailedAnalysis": {
                "grammarFeedback": "Feedback on communication flow (ignore STT typos).",
                "explanationFeedback": "How well did they match the Ideal Expectations? Mention if they were off-topic.",
                "areasToImprove": ["Specific point 1", "Specific point 2"]
              },
              "verdict": "Clear, professional summary of their performance."
            }
        `;

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "system", content: evaluationPrompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1, 
        });

        let rawJson = chatCompletion.choices[0]?.message?.content.trim();
        rawJson = rawJson.replace(/```json|```/g, "").trim();
        
        const evaluationReport = JSON.parse(rawJson);
        res.json(evaluationReport);
    } catch (err) {
        res.status(500).json({ error: "Failed to generate evaluation report." });
    }
});

module.exports = router;