/**
 * Professional Seeding Script for Web Development (React & CSS)
 * Format: Q-Numbering included in questionText
 */

const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

const reactCssBatch = [
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q31.\nAfter the initial render (production mode, no StrictMode), what will be displayed?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n  React.useEffect(() => {\n    setCount(count + 1);\n  }, []);\n  return <h1>{count}</h1>;\n}", options: ["A. 0", "B. 1", "C. Infinite re-render", "D. Runtime Error"], correctAnswer: "B", explanation: "The useEffect runs once after the initial render, updating the count to 1." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q32.\nThe button is clicked once. What is the output?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <button onClick={() => {\n        setCount(count + 1);\n        setCount(count + 1);\n    }}>{count}</button>\n  );\n}", options: ["A. 1", "B. 2", "C. 3", "D. Depends on the browser"], correctAnswer: "A", explanation: "React batches state updates. Both calls use '0 + 1', resulting in 1." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q33.\nAfter one click, what is the output?\n\nfunction App() {\n  const [count, setCount] = React.useState(0);\n  return (\n    <button onClick={() => {\n        setCount(c => c + 1);\n        setCount(c => c + 1);\n    }}>{count}</button>\n  );\n}", options: ["A. 1", "B. 2", "C. 3", "D. Infinite Loop"], correctAnswer: "B", explanation: "Functional updates use the latest state value from the queue, applying both updates." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q34.\nWhich statement about the Virtual DOM is correct?", options: ["A. React updates real DOM immediately", "B. React compares Virtual DOMs before updating real DOM", "C. Virtual DOM is browser feature", "D. Virtual DOM replaces real DOM"], correctAnswer: "B", explanation: "React uses 'diffing' between Virtual DOM trees to optimize DOM updates." },
    { category: "Web Development", topic: "React", difficulty: "Hard", questionText: "Q35.\nWhich React algorithm determines the minimum DOM updates during rendering?", options: ["A. BFS", "B. Reconciliation", "C. Memoization", "D. Hydration"], correctAnswer: "B", explanation: "Reconciliation is the process of updating the DOM based on Virtual DOM changes." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q36.\nWhich of the following will NOT trigger a component re-render?", options: ["A. Updating state", "B. Receiving new props", "C. Updating a useRef().current value", "D. Context value change"], correctAnswer: "C", explanation: "useRef changes are side effects and do not trigger re-renders." },
    { category: "Web Development", topic: "React", difficulty: "Hard", questionText: "Q37.\nIf obj.name is changed directly without creating a new object, what happens?", options: ["A. Child auto re-renders", "B. React detects mutation", "C. UI may not update", "D. React throws error"], correctAnswer: "C", explanation: "React shallowly compares object references; if the reference is unchanged, it assumes no update is needed." },
    { category: "Web Development", topic: "React", difficulty: "Easy", questionText: "Q38.\nWhich Hook persists a mutable value across renders without causing re-renders?", options: ["A. useState", "B. useMemo", "C. useRef", "D. useEffect"], correctAnswer: "C", explanation: "useRef stores values without triggering re-renders." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q39.\nWhat is the primary purpose of useMemo()?", options: ["A. Prevent API calls", "B. Memoize expensive computed values", "C. Replace useEffect", "D. Prevent state updates"], correctAnswer: "B", explanation: "useMemo caches the result of expensive calculations." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q40.\nWhich statement about useCallback() is correct?", options: ["A. Memoizes values", "B. Memoizes function references", "C. Replaces Redux", "D. Prevents child re-renders"], correctAnswer: "B", explanation: "useCallback prevents function re-creation on every render." },
    { category: "Web Development", topic: "React", difficulty: "Hard", questionText: "Q41.\nChild re-renders unnecessarily with React.memo. Optimization?", options: ["A. Replace with useEffect", "B. Wrap callback in useCallback", "C. Replace props with state", "D. Use useRef"], correctAnswer: "B", explanation: "Memoized components need stable callback references to avoid re-renders." },
    { category: "Web Development", topic: "React", difficulty: "Easy", questionText: "Q42.\nWhich Hook performs API requests after mount?", options: ["A. useMemo", "B. useCallback", "C. useEffect", "D. useRef"], correctAnswer: "C", explanation: "useEffect is standard for handling side effects like data fetching." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q43.\nWhich dependency array causes useEffect to execute after every render?", options: ["A. []", "B. [count]", "C. No dependency array", "D. [ ] || null"], correctAnswer: "C", explanation: "No array means the effect runs after every render cycle." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q44.\nWhich dependency array causes useEffect to execute only once?", options: ["A. No array", "B. [count]", "C. []", "D. [{}]"], correctAnswer: "C", explanation: "An empty array ensures the effect runs only on mount." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q45.\nWhich statement about React keys is correct?", options: ["A. Keys must be random", "B. Keys identify list items efficiently", "C. Keys accessible via props.key", "D. Array index is best key"], correctAnswer: "B", explanation: "Keys help React track list items during reconciliation." },
    { category: "Web Development", topic: "CSS", difficulty: "Medium", questionText: "Q46.\nWhich CSS selector has highest specificity?", options: ["A. div p", "B. .container p", "C. #content p", "D. *"], correctAnswer: "C", explanation: "ID selectors have higher weight than class or tag selectors." },
    { category: "Web Development", topic: "CSS", difficulty: "Hard", questionText: "Q47.\nWhich CSS property creates a new stacking context?", options: ["A. margin", "B. padding", "C. transform", "D. display"], correctAnswer: "C", explanation: "Transform creates a stacking context for its children." },
    { category: "Web Development", topic: "CSS", difficulty: "Medium", questionText: "Q48.\nWhich position property removes element from flow and positions it relative to ancestor?", options: ["A. static", "B. relative", "C. absolute", "D. sticky"], correctAnswer: "C", explanation: "Absolute position is relative to the nearest positioned ancestor." },
    { category: "Web Development", topic: "CSS", difficulty: "Easy", questionText: "Q49.\nWhich Flexbox property controls main axis direction?", options: ["A. align-items", "B. justify-content", "C. flex-direction", "D. align-content"], correctAnswer: "C", explanation: "flex-direction sets the axis to row or column." },
    { category: "Web Development", topic: "CSS", difficulty: "Medium", questionText: "Q50.\nIn CSS Grid, which property defines column size?", options: ["A. grid-template-columns", "B. grid-column-gap", "C. grid-auto-flow", "D. justify-items"], correctAnswer: "A", explanation: "grid-template-columns defines the sizing of grid columns." },
    { category: "Web Development", topic: "HTML", difficulty: "Easy", questionText: "Q51.\nWhich HTML element is most semantic for primary navigation?", options: ["A. div", "B. section", "C. nav", "D. aside"], correctAnswer: "C", explanation: "The <nav> element is specifically for navigation." },
    { category: "Web Development", topic: "HTML", difficulty: "Easy", questionText: "Q52.\nWhich HTML element is most appropriate for a blog post?", options: ["A. article", "B. span", "C. main", "D. header"], correctAnswer: "A", explanation: "<article> denotes independent, self-contained content." },
    { category: "Web Development", topic: "HTML", difficulty: "Easy", questionText: "Q53.\nWhich attribute improves image accessibility?", options: ["A. title", "B. src", "C. alt", "D. loading"], correctAnswer: "C", explanation: "alt text is essential for screen readers." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q54.\nWhich React feature enables code splitting?", options: ["A. React.memo", "B. React.lazy", "C. useMemo", "D. Fragment"], correctAnswer: "B", explanation: "React.lazy enables lazy loading of components." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q55.\nWhich API is used with React.lazy() to handle async loading?", options: ["A. Context", "B. Suspense", "C. Portal", "D. StrictMode"], correctAnswer: "B", explanation: "Suspense provides a fallback UI for lazy components." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q56.\nWhich statement about controlled components is correct?", options: ["A. DOM manages data", "B. React state manages data", "C. No validation", "D. Faster than uncontrolled"], correctAnswer: "B", explanation: "State is the source of truth for controlled inputs." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q57.\nWhich statement about uncontrolled components is correct?", options: ["A. State stores input", "B. Accessed via refs", "C. Requires Redux", "D. Cannot be used with forms"], correctAnswer: "B", explanation: "Uncontrolled components store data in DOM, accessed via refs." },
    { category: "Web Development", topic: "React", difficulty: "Hard", questionText: "Q58.\nOptimization for rendering 100k items?", options: ["A. React.memo", "B. Virtualization", "C. useEffect", "D. Fragment"], correctAnswer: "B", explanation: "Virtualization renders only visible items." },
    { category: "Web Development", topic: "React", difficulty: "Medium", questionText: "Q59.\nOptimization for object literals passed as props?", options: ["A. useEffect", "B. useMemo", "C. useRef", "D. ReactDOM.render"], correctAnswer: "B", explanation: "useMemo memoizes the object reference." },
    { category: "Web Development", topic: "React", difficulty: "Hard", questionText: "Q60.\nBest description of React Fiber?", options: ["A. CSS engine", "B. Reconciliation architecture", "C. Virtual DOM replacement", "D. Browser API"], correctAnswer: "B", explanation: "Fiber manages incremental rendering scheduling." }
];

const seedReactQuestions = async () => {
    try {
        console.log("🧹 Clearing old Web Dev (React/CSS) records...");
        await Question.deleteMany({ category: "Web Development", topic: { $in: ["React", "CSS", "HTML"] } });
        await Question.insertMany(reactCssBatch);
        console.log(`✅ SUCCESS! ${reactCssBatch.length} questions seeded.`);
        process.exit();
    } catch (e) {
        console.error("❌ Error:", e);
        process.exit(1);
    }
};

seedReactQuestions();