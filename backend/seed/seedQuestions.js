/**
 * seedQuestions.js
 *
 * Populates the database with 50 hand-curated EAMCET-level MCQ questions
 * on the chapter "Functions".
 *
 * Run once:  npm run seed
 *
 * To re-seed from scratch, delete db/quiz.db and run again.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const { initializeDatabase } = require('../db/database');
const { insertManyQuestions, countQuestions } = require('../models/questionModel');

// ── 50 Functions Questions ────────────────────────────────────────────────────
const QUESTIONS = [
  {
    question: "What is a function?",
    optionA: "A relation where one input has many outputs",
    optionB: "A relation where each input has exactly one output",
    optionC: "A set of numbers",
    optionD: "A graph only",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "A function maps each element of the domain to exactly one element of the codomain. Multiple outputs for a single input violates the definition.",
    chapter: "Functions"
  },
  {
    question: "Which of the following is a function?",
    optionA: "{(1,2), (1,3)}",
    optionB: "{(1,2), (2,3), (3,4)}",
    optionC: "{(2,1), (2,4)}",
    optionD: "{(5,6), (5,7)}",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "In option B every x-value appears exactly once, so each input maps to exactly one output. Options A, C, D each repeat an x-value with different y-values.",
    chapter: "Functions"
  },
  {
    question: "The set of all input values of a function is called:",
    optionA: "Range",
    optionB: "Domain",
    optionC: "Codomain",
    optionD: "Image",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "The domain is the complete set of possible input (independent variable) values for a function.",
    chapter: "Functions"
  },
  {
    question: "The set of actual output values of a function is called:",
    optionA: "Domain",
    optionB: "Codomain",
    optionC: "Range",
    optionD: "Relation",
    correctAnswer: "C",
    difficulty: "Easy",
    explanation: "The range (or image) is the set of all values actually produced by the function, which may be a subset of the codomain.",
    chapter: "Functions"
  },
  {
    question: "Which notation represents a function?",
    optionA: "x + y",
    optionB: "f(x)",
    optionC: "x:y",
    optionD: "x→",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "f(x) is the standard functional notation meaning 'the value of function f at input x'.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = 3x + 2, then f(4) =",
    optionA: "10",
    optionB: "12",
    optionC: "14",
    optionD: "16",
    correctAnswer: "C",
    difficulty: "Easy",
    explanation: "f(4) = 3(4) + 2 = 12 + 2 = 14.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = x², then f(5) =",
    optionA: "10",
    optionB: "20",
    optionC: "25",
    optionD: "30",
    correctAnswer: "C",
    difficulty: "Easy",
    explanation: "f(5) = 5² = 25.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = x − 7, then f(10) =",
    optionA: "17",
    optionB: "3",
    optionC: "-3",
    optionD: "70",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "f(10) = 10 − 7 = 3.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = 2x, then f(−3) =",
    optionA: "-6",
    optionB: "6",
    optionC: "-3",
    optionD: "3",
    correctAnswer: "A",
    difficulty: "Easy",
    explanation: "f(−3) = 2 × (−3) = −6.",
    chapter: "Functions"
  },
  {
    question: "The domain of f(x) = 1/x is:",
    optionA: "All real numbers",
    optionB: "x ≠ 0",
    optionC: "x > 0",
    optionD: "x < 0",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "Division by zero is undefined, so x = 0 must be excluded. The domain is all real numbers except 0.",
    chapter: "Functions"
  },
  {
    question: "The domain of f(x) = √x is:",
    optionA: "x ≤ 0",
    optionB: "x ≥ 0",
    optionC: "x ≠ 0",
    optionD: "All real numbers",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "The square root of a negative number is not real, so the domain is x ≥ 0.",
    chapter: "Functions"
  },
  {
    question: "Which function is linear?",
    optionA: "x²",
    optionB: "3x + 5",
    optionC: "1/x",
    optionD: "√x",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "A linear function has the form f(x) = mx + c. Only 3x + 5 fits this form.",
    chapter: "Functions"
  },
  {
    question: "Which function is quadratic?",
    optionA: "2x + 1",
    optionB: "x² − 4",
    optionC: "√x",
    optionD: "|x|",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "A quadratic function has the form f(x) = ax² + bx + c with a ≠ 0. x² − 4 fits this form.",
    chapter: "Functions"
  },
  {
    question: "Which function is a constant function?",
    optionA: "f(x) = 7",
    optionB: "f(x) = x",
    optionC: "f(x) = x²",
    optionD: "f(x) = 1/x",
    correctAnswer: "A",
    difficulty: "Easy",
    explanation: "A constant function returns the same value for every input. f(x) = 7 always outputs 7.",
    chapter: "Functions"
  },
  {
    question: "Which function is the identity function?",
    optionA: "f(x) = 0",
    optionB: "f(x) = x",
    optionC: "f(x) = x²",
    optionD: "f(x) = 2x",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "The identity function maps every input to itself: f(x) = x.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = x + 9, then f(6) =",
    optionA: "15",
    optionB: "54",
    optionC: "3",
    optionD: "9",
    correctAnswer: "A",
    difficulty: "Easy",
    explanation: "f(6) = 6 + 9 = 15.",
    chapter: "Functions"
  },
  {
    question: "Which of the following is NOT a function?",
    optionA: "Each student has one ID",
    optionB: "Each person has one birth date",
    optionC: "One person has two birth dates",
    optionD: "Each employee has one salary",
    correctAnswer: "C",
    difficulty: "Easy",
    explanation: "A function requires exactly one output per input. One person having two birth dates violates this rule.",
    chapter: "Functions"
  },
  {
    question: "The output value of a function is called its:",
    optionA: "Variable",
    optionB: "Image",
    optionC: "Domain",
    optionD: "Constant",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "The output (or value) of a function for a given input is called the image of that input.",
    chapter: "Functions"
  },
  {
    question: "Which test determines whether a graph represents a function?",
    optionA: "Horizontal line test",
    optionB: "Vertical line test",
    optionC: "Diagonal line test",
    optionD: "Circle test",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "The vertical line test: if any vertical line crosses the graph more than once, the graph does not represent a function.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = 5x − 2, then f(3) =",
    optionA: "11",
    optionB: "13",
    optionC: "15",
    optionD: "17",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "f(3) = 5(3) − 2 = 15 − 2 = 13.",
    chapter: "Functions"
  },
  {
    question: "The range of f(x) = x² over all real numbers is:",
    optionA: "All real numbers",
    optionB: "y ≥ 0",
    optionC: "y ≤ 0",
    optionD: "y ≠ 0",
    correctAnswer: "B",
    difficulty: "Medium",
    explanation: "Squaring any real number gives a non-negative result, so the range is y ≥ 0.",
    chapter: "Functions"
  },
  {
    question: "Which function is one-to-one (injective)?",
    optionA: "x²",
    optionB: "x³",
    optionC: "|x|",
    optionD: "x² + 1",
    correctAnswer: "B",
    difficulty: "Medium",
    explanation: "x³ is strictly increasing for all real x, so distinct inputs always produce distinct outputs. x², |x|, and x²+1 each map both x and −x to the same value.",
    chapter: "Functions"
  },
  {
    question: "A function is onto (surjective) if:",
    optionA: "Every element in the codomain has a pre-image",
    optionB: "Inputs repeat",
    optionC: "Outputs repeat",
    optionD: "The domain is empty",
    correctAnswer: "A",
    difficulty: "Medium",
    explanation: "A surjective function covers every element of the codomain, meaning every possible output is achieved by at least one input.",
    chapter: "Functions"
  },
  {
    question: "The inverse of a one-to-one function is:",
    optionA: "Always a function",
    optionB: "Never a function",
    optionC: "Always quadratic",
    optionD: "Undefined",
    correctAnswer: "A",
    difficulty: "Medium",
    explanation: "A one-to-one (injective) function has a unique inverse that is itself a function.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = x − 4, then f(9) =",
    optionA: "13",
    optionB: "5",
    optionC: "-5",
    optionD: "36",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "f(9) = 9 − 4 = 5.",
    chapter: "Functions"
  },
  {
    question: "Which function has no maximum value?",
    optionA: "x²",
    optionB: "x³",
    optionC: "−x²",
    optionD: "5",
    correctAnswer: "B",
    difficulty: "Medium",
    explanation: "x³ increases without bound as x → +∞, so it has no maximum. −x² has a maximum at 0; x² and 5 are bounded above for restricted or constant ranges.",
    chapter: "Functions"
  },
  {
    question: "The graph of a constant function is:",
    optionA: "A vertical line",
    optionB: "A horizontal line",
    optionC: "A curve",
    optionD: "A circle",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "f(x) = c produces the same y-value for every x, giving a horizontal line at height c.",
    chapter: "Functions"
  },
  {
    question: "Which function is even?",
    optionA: "x³",
    optionB: "x²",
    optionC: "x",
    optionD: "x⁵",
    correctAnswer: "B",
    difficulty: "Medium",
    explanation: "A function is even if f(−x) = f(x). For x²: (−x)² = x². Odd-power functions satisfy f(−x) = −f(x).",
    chapter: "Functions"
  },
  {
    question: "Which function is odd?",
    optionA: "x²",
    optionB: "x⁴",
    optionC: "x³",
    optionD: "x² + 1",
    correctAnswer: "C",
    difficulty: "Medium",
    explanation: "A function is odd if f(−x) = −f(x). For x³: (−x)³ = −x³ = −f(x). ✓",
    chapter: "Functions"
  },
  {
    question: "If f(x) = 4x, then f(7) =",
    optionA: "21",
    optionB: "28",
    optionC: "32",
    optionD: "24",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "f(7) = 4 × 7 = 28.",
    chapter: "Functions"
  },
  {
    question: "The composition of two functions f and g is written as:",
    optionA: "f + g",
    optionB: "f ∘ g",
    optionC: "f / g",
    optionD: "f − g",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "Composition f ∘ g means apply g first, then f: (f ∘ g)(x) = f(g(x)).",
    chapter: "Functions"
  },
  {
    question: "If f(x) = x + 2 and g(x) = 2x, then f(g(3)) =",
    optionA: "6",
    optionB: "8",
    optionC: "10",
    optionD: "12",
    correctAnswer: "B",
    difficulty: "Medium",
    explanation: "g(3) = 2 × 3 = 6. Then f(6) = 6 + 2 = 8.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = x², then f(−4) =",
    optionA: "-16",
    optionB: "16",
    optionC: "-8",
    optionD: "8",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "f(−4) = (−4)² = 16.",
    chapter: "Functions"
  },
  {
    question: "The codomain of a function is:",
    optionA: "The set of all possible outputs declared for the function",
    optionB: "The set of actual outputs",
    optionC: "The set of inputs",
    optionD: "A set of constants",
    correctAnswer: "A",
    difficulty: "Medium",
    explanation: "The codomain is the declared target set; the range (actual outputs) is a subset of the codomain.",
    chapter: "Functions"
  },
  {
    question: "Which is an example of a real-life function?",
    optionA: "Student → Roll Number",
    optionB: "Student → Friends",
    optionC: "Person → Multiple phone numbers",
    optionD: "City → Buildings",
    correctAnswer: "A",
    difficulty: "Easy",
    explanation: "Each student has exactly one roll number — a perfect one-to-one mapping that satisfies the definition of a function.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = 6 (constant function), then f(100) =",
    optionA: "100",
    optionB: "600",
    optionC: "6",
    optionD: "106",
    correctAnswer: "C",
    difficulty: "Easy",
    explanation: "A constant function returns the same value regardless of input. f(100) = 6.",
    chapter: "Functions"
  },
  {
    question: "Which function is decreasing for all real x?",
    optionA: "−x",
    optionB: "x",
    optionC: "x²",
    optionD: "x³",
    correctAnswer: "A",
    difficulty: "Medium",
    explanation: "f(x) = −x has slope −1, so it decreases strictly for all real x.",
    chapter: "Functions"
  },
  {
    question: "Which function is increasing for all real x?",
    optionA: "x³",
    optionB: "−x",
    optionC: "−x²",
    optionD: "|x|",
    correctAnswer: "A",
    difficulty: "Medium",
    explanation: "f(x) = x³ is strictly increasing for all real x (its derivative 3x² ≥ 0 and equals 0 only at a single point).",
    chapter: "Functions"
  },
  {
    question: "If f(x) = 2x + 5, then f(0) =",
    optionA: "0",
    optionB: "2",
    optionC: "5",
    optionD: "10",
    correctAnswer: "C",
    difficulty: "Easy",
    explanation: "f(0) = 2(0) + 5 = 5.",
    chapter: "Functions"
  },
  {
    question: "The inverse of f(x) = x + 3 is:",
    optionA: "x − 3",
    optionB: "x + 3",
    optionC: "3x",
    optionD: "x²",
    correctAnswer: "A",
    difficulty: "Medium",
    explanation: "To find the inverse, swap x and y then solve: y = x + 3 → x = y + 3 → y = x − 3.",
    chapter: "Functions"
  },
  {
    question: "Which function is many-to-one?",
    optionA: "x²",
    optionB: "x",
    optionC: "x³",
    optionD: "2x + 1",
    correctAnswer: "A",
    difficulty: "Medium",
    explanation: "f(x) = x² maps both x and −x to the same value (e.g., f(2) = f(−2) = 4), so it is many-to-one.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = 10 − x, then f(7) =",
    optionA: "17",
    optionB: "3",
    optionC: "-3",
    optionD: "70",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "f(7) = 10 − 7 = 3.",
    chapter: "Functions"
  },
  {
    question: "Which symbol denotes 'maps to' in function notation?",
    optionA: "=",
    optionB: "→",
    optionC: "+",
    optionD: "×",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "The arrow → is used to show mapping, e.g., f: A → B means f maps set A to set B.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = x² + 1, then f(2) =",
    optionA: "3",
    optionB: "4",
    optionC: "5",
    optionD: "6",
    correctAnswer: "C",
    difficulty: "Easy",
    explanation: "f(2) = 2² + 1 = 4 + 1 = 5.",
    chapter: "Functions"
  },
  {
    question: "Which function has domain of all real numbers?",
    optionA: "1/x",
    optionB: "√x",
    optionC: "x²",
    optionD: "1/(x − 2)",
    correctAnswer: "C",
    difficulty: "Medium",
    explanation: "x² is defined for every real number. 1/x excludes 0; √x requires x ≥ 0; 1/(x−2) excludes x = 2.",
    chapter: "Functions"
  },
  {
    question: "If f is the constant function f(x) = 5, then the range of f is:",
    optionA: "{5}",
    optionB: "All real numbers",
    optionC: "{0}",
    optionD: "Empty set",
    correctAnswer: "A",
    difficulty: "Easy",
    explanation: "The constant function always outputs 5, so the range is the single-element set {5}.",
    chapter: "Functions"
  },
  {
    question: "Which of the following is a polynomial function?",
    optionA: "x² + 2x + 1",
    optionB: "1/x",
    optionC: "√x",
    optionD: "log x",
    correctAnswer: "A",
    difficulty: "Medium",
    explanation: "A polynomial has non-negative integer exponents. x² + 2x + 1 qualifies; the others involve negative exponents, radicals, or logarithms.",
    chapter: "Functions"
  },
  {
    question: "If f(x) = 3x − 1, then f(5) =",
    optionA: "14",
    optionB: "15",
    optionC: "16",
    optionD: "13",
    correctAnswer: "A",
    difficulty: "Easy",
    explanation: "f(5) = 3(5) − 1 = 15 − 1 = 14.",
    chapter: "Functions"
  },
  {
    question: "Which function is not defined at x = 0?",
    optionA: "x²",
    optionB: "x + 1",
    optionC: "1/x",
    optionD: "5",
    correctAnswer: "C",
    difficulty: "Easy",
    explanation: "1/x requires x ≠ 0; all other options are defined at x = 0.",
    chapter: "Functions"
  },
  {
    question: "A function assigns to each input:",
    optionA: "Many outputs",
    optionB: "Exactly one output",
    optionC: "No output",
    optionD: "Two outputs",
    correctAnswer: "B",
    difficulty: "Easy",
    explanation: "By definition, a function assigns exactly one output to every input in its domain.",
    chapter: "Functions"
  }
];

// ── Main Seed Logic ───────────────────────────────────────────────────────────
async function seed() {
  await initializeDatabase();

  const existing = await countQuestions();
  if (existing > 0) {
    console.log(`ℹ️  Database already has ${existing} questions. Skipping.`);
    console.log('   Delete db/quiz.db and run "npm run seed" to reseed.');
    return;
  }

  await insertManyQuestions(QUESTIONS);
  console.log(`🎉  Seeded ${QUESTIONS.length} Functions questions successfully.`);
}

seed().catch((err) => {
  console.error('❌  Seed failed:', err);
});
