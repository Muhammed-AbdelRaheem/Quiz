

// ==================HTML ELemets========================

import { Question } from "./question.js"
import { Quiz } from "./quiz.js"
export const questionscontainer = document.querySelector(".questions-container")

const categoryMenu = document.getElementById('categoryMenu')
const difficultyOptions = document.getElementById('difficultyOptions')
const questionsNumber = document.getElementById('questionsNumber')
const startQuizBtn = document.getElementById('startQuiz')
const quizOptions = document.getElementById('quizOptions')




export let questions = []
export let currentQuiz;
// ======================EVENT===========================

startQuizBtn.addEventListener('click', async function () {
    let category = categoryMenu.value;
    let difficulty = difficultyOptions.value;
    let amount = questionsNumber.value;


    currentQuiz = new Quiz(category, difficulty, amount)
    console.log(currentQuiz)
    questions = await currentQuiz.getQuestions()
    quizOptions.classList.replace('d-flex', 'd-none')
    const firstQuestion = new Question(0)
    firstQuestion.displayQs()
    console.log(firstQuestion);

}



)
