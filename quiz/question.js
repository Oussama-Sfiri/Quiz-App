class Question{
    constructor(questionObj){
        this.questionElement = document.querySelector("#question");
        this.answerElements = [
            document.querySelector("#a1"),
            document.querySelector("#a2"),
            document.querySelector("#a3"),
            document.querySelector("#a4"),
        ];
        this.correctAnswer = questionObj.correct_answer;
        this.question = questionObj.question;
        this.isCorrect = false;
        this.answers = [this.correctAnswer , ...questionObj.incorrect_answers];
        this.shuffleAnswers();
    };

    shuffleAnswers() {
        for (let i = this.answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.answers[i], this.answers[j]] = [this.answers[j], this.answers[i]];
        }
    };

    answer = (checkedElement) => {
        this.isCorrect = checkedElement.textContent == this.correctAnswer ? true : false;
    };

    render = () => {
        this.questionElement.innerHTML = this.question;
        this.answerElements.forEach((element , index) => {
            element.innerHTML = '<input type="radio" name="unique">'+this.answers[index];
        });
    };
};
export default Question;

