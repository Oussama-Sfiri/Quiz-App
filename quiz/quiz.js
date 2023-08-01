import Question from "./question.js";
import Final from "./final.js";
class Quiz{
    constructor(quizElement, amount, questions){
        this.quizElement = quizElement;
        this.currentElement = document.querySelector(".current");
        this.totalElement = document.querySelector(".total");
        this.finalElement = document.querySelector(".final");
        this.nextBtn = document.querySelector("#next");
        this.totalAmount = amount;
        this.answeredAmount = 0;
        this.questionsObjs = this.setQuestions(questions);
        this.nextBtn.addEventListener("click" , this.nextQuestion);
        this.renderQuestion();
    };

    setQuestions = (questions) => {
        return questions.map((questionObj) => new Question(questionObj));
    };

    renderQuestion = () => {
        this.questionsObjs[this.answeredAmount].render();
        this.currentElement.innerHTML = this.answeredAmount + 1;
        this.totalElement.innerHTML = this.totalAmount;
    };

    nextQuestion = () => {
        const checkedElement = this.questionsObjs[this.answeredAmount].answerElements.find((element) => element.firstChild.checked);
        if(checkedElement){
            this.questionsObjs[this.answeredAmount].answer(checkedElement);
            this.answeredAmount++;
            this.answeredAmount < this.totalAmount ? this.renderQuestion() : this.endQuizApp();
        }else{
            alert("Plesase choose an answer");
        }
    };

    endQuizApp = () => {
        this.toggleElements();
        const nbrOfCorrectAnswers = this.countCorrectAnswers();
        new Final(nbrOfCorrectAnswers , this.totalAmount);
    };

    countCorrectAnswers = () => {
        let count = 0;
        this.questionsObjs.forEach( (questionObj) => {
            if(questionObj.isCorrect){
                count++;
            }
        });
        return count;
    };

    toggleElements = () => {
        this.quizElement.style.display = "none";
        this.finalElement.style.display = "block";
    };
};
export default Quiz;

