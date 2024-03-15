import { currentQuiz, questionscontainer, questions } from "./index.js";

export class Question {
    constructor(index) {
        this.index = index
        this.question = questions[index].question
        this.correct = questions[index].correct_answer
        this.wrong = questions[index].incorrect_answers
        this.category = questions[index].category
        this.allAnswers = this.getAllAnswers()
        this.answerd = false
    }


    getAllAnswers() {
        return this.wrong.concat(this.correct).sort()
    }
    displayQs() {
        let blackbox = `
    <div
    class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__fadeInBottomLeft"
    >
    <div class="w-100 d-flex justify-content-between">
      <span class="btn btn-category">${this.category}</span>
      <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length} Questions</span>
    </div>
    <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
    <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
    ${this.allAnswers.map((Qs) => `<li>${Qs}</li>`).join("")}
    </ul>
    <h2 class="text-capitalize text-center score-color h3 fw-bold">
      <i class="bi bi-emoji-laughing"></i> 
      Score: ${currentQuiz.score}
    </h2>        
    </div>
    
    `
        questionscontainer.innerHTML = blackbox;
        let allChoices = document.querySelectorAll('.choices li');
        allChoices.forEach((choice) => { choice.addEventListener('click', (event) => { this.checkAnswer(event) }) })

    }



    checkAnswer(event) {

        if (!this.answerd) {
            this.answerd = true
            if (this.correct.toLowerCase() === event.target.innerHTML.toLowerCase()) {
                event.target.classList.add(
                    "correct",
                    "animate__animated",
                    "animate__flipInY")
                currentQuiz.score += 10;
            }
            else {
                event.target.classList.add(
                    "wrong",
                    "animate__animated",
                    "animate__shakeX")
            }
            this.animatQs(event.target)
            // console.log(event.target.innerHTML);
        }
    }

    nextQs() {
        this.index++
        if (this.index < questions.length) {
            let nextQuestion = new Question(this.index)
            nextQuestion.displayQs()
        }
        else {
            let endQuiz = currentQuiz.endQuiz()
            questionscontainer.innerHTML = endQuiz
            let tryagainBtn = document.querySelector(".again")
            tryagainBtn.addEventListener('click', () => { window.location.reload() })

        }

    }

    animatQs(element) {
        setTimeout(() => {
            element
                .closest(".question")
                .classList.replace("animate__fadeInBottomLeft", "animate__bounceOutLeft")

            setTimeout(() => {
                this.nextQs();
            }, 1000);
        }, 1000);
    }
}