export class Quiz {
    constructor(category, difficulty, amout) {
        this.category = category;
        this.difficulty = difficulty;
        this.amout = amout;
        this.score = 0;
    }

    async getQuestions() {
        const respo = await fetch(`https://opentdb.com/api.php?amount=${this.amout}&category=${this.category}&difficulty=${this.difficulty}`)
        const data = await respo.json()
        return data.results
    }

    endQuiz() {
        return `
    <div
      class="question shadow-lg col-lg-6 offset-lg-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3"
    >
      <h2 class="mb-0">
      ${this.score == this.amout * 10
                ? `Congratulations 🎉`
                : `Your score is ${this.score} of ${this.amout * 10}`
            }      
      </h2>
      <button class="again btn btn-primary rounded-pill"><i class="bi bi-arrow-repeat"></i> Try Again</button>
    </div>
  `;
    }

}