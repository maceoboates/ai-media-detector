const quizQuestions = [
  {
    category: "PHOTO",
    question: "A photo shows a person holding a mug. One hand has six fingers. What should you do?",
    answers: [
      "Assume it is real because the photo looks realistic.",
      "Treat it as a clue and inspect the image more carefully.",
      "Share it immediately so friends can see it."
    ],
    correct: 1,
    explanation: "Correct! An unusual hand is a warning sign, but it is not proof by itself. Look for other clues and check the source."
  },
  {
    category: "VIDEO",
    question: "A video has strange lip movement that doesn't quite match the audio. What should you do?",
    answers: [
      "Check whether reliable sources confirm the video or event.",
      "Believe it because the person's face looks real.",
      "Assume every video online is fake."
    ],
    correct: 0,
    explanation: "Correct! Strange lip-syncing can be a clue. Verification from trustworthy sources is more important than one visual detail."
  },
  {
    category: "AUDIO",
    question: "You receive a call that sounds exactly like a family member asking for money urgently. What should you do?",
    answers: [
      "Send the money immediately.",
      "Ask the caller for private information.",
      "Hang up and contact the family member using a number you already trust."
    ],
    correct: 2,
    explanation: "Correct! AI can imitate voices. Contact the person through a trusted phone number instead."
  },
  {
    category: "SOURCE",
    question: "A shocking post has thousands of shares, but you cannot find who originally posted it. What should you do?",
    answers: [
      "Share it because lots of people already did.",
      "Pause and look for the original source and independent confirmation.",
      "Assume it is true because it has lots of comments."
    ],
    correct: 1,
    explanation: "Correct! Popularity isn't proof. Find the original source and look for independent confirmation."
  },
  {
    category: "SCAM",
    question: "Someone sends a message saying you must act in five minutes and keep the request secret. What's the biggest warning sign?",
    answers: [
      "The message uses normal spelling.",
      "The request creates urgency and secrecy.",
      "The message includes a familiar name."
    ],
    correct: 1,
    explanation: "Correct! Urgency and secrecy are common scam tactics. Slow down and verify the request."
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("quizQuestion");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("quizFeedback");
const nextBtn = document.getElementById("nextBtn");
const categoryEl = document.getElementById("quizCategory");
const numberEl = document.getElementById("quizNumber");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

function renderQuestion() {
  const q = quizQuestions[currentQuestion];

  answered = false;

  categoryEl.textContent = q.category;
  numberEl.textContent =
    `${String(currentQuestion + 1).padStart(2, "0")} / 05`;

  questionEl.textContent = q.question;

  answersEl.innerHTML = "";
  feedbackEl.textContent = "";
  feedbackEl.className = "quiz-feedback";

  nextBtn.hidden = true;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer";
    button.textContent = answer;

    button.addEventListener("click", () => {
      chooseAnswer(index);
    });

    answersEl.appendChild(button);
  });

  const percent =
    ((currentQuestion + 1) / quizQuestions.length) * 100;

  progressBar.style.width = `${percent}%`;

  progressText.textContent =
    `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
}

function chooseAnswer(index) {
  if (answered) return;

  answered = true;

  const q = quizQuestions[currentQuestion];

  const buttons =
    [...answersEl.querySelectorAll(".answer")];

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === q.correct) {
      button.classList.add("correct");
    }

    if (i === index && i !== q.correct) {
      button.classList.add("wrong");
    }
  });

  if (index === q.correct) {
    score++;

    feedbackEl.textContent =
      "✓ " + q.explanation;

    feedbackEl.classList.add("good");
  } else {
    feedbackEl.textContent =
      "Not quite. " + q.explanation.replace("Correct! ", "");

    feedbackEl.classList.add("bad");
  }

  nextBtn.hidden = false;

  if (currentQuestion === quizQuestions.length - 1) {
    nextBtn.textContent = "See my result →";
  } else {
    nextBtn.textContent = "Next question →";
  }
}

function showResult() {
  categoryEl.textContent = "RESULT";
  numberEl.textContent = "DONE";

  questionEl.textContent =
    `You scored ${score} out of ${quizQuestions.length}.`;

  answersEl.innerHTML = "";

  feedbackEl.className = "quiz-feedback good";

  if (score === 5) {
    feedbackEl.textContent =
      "Excellent! You are thinking like a careful media detective.";
  } else if (score >= 3) {
    feedbackEl.textContent =
      "Nice work! Remember the three most important habits: pause, inspect, and verify.";
  } else {
    feedbackEl.textContent =
      "Good start. The goal isn't to spot every fake — it's to build the habit of slowing down and verifying.";
  }

  nextBtn.textContent = "Try again ↻";
  nextBtn.hidden = false;

  progressBar.style.width = "100%";

  progressText.textContent =
    `Final score: ${score}/${quizQuestions.length}`;
}

nextBtn.addEventListener("click", () => {

  if (currentQuestion < quizQuestions.length - 1) {

    currentQuestion++;

    renderQuestion();

  } else {

    if (nextBtn.textContent.includes("Try again")) {

      currentQuestion = 0;
      score = 0;

      renderQuestion();

    } else {

      showResult();

    }
  }
});


/* SCROLL ANIMATIONS */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

      }

    });

  },
  {
    threshold: 0.12
  }
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => {

    observer.observe(element);

  });


/* LARGE TEXT MODE */

const textSizeBtn =
  document.getElementById("textSizeBtn");

if (textSizeBtn) {

  textSizeBtn.addEventListener("click", () => {

    document.body.classList.toggle("large-text");

    if (
      document.body.classList.contains("large-text")
    ) {

      textSizeBtn.textContent = "A";

      textSizeBtn.setAttribute(
        "aria-label",
        "Return to normal text size"
      );

    } else {

      textSizeBtn.textContent = "A+";

      textSizeBtn.setAttribute(
        "aria-label",
        "Increase text size"
      );

    }

  });

}


/* START QUIZ */

if (questionEl) {

  renderQuestion();

}
