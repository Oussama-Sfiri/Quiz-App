class Final{
    constructor(nbrOfCorrectAnswers , totalAmount){
        this.scoreElement = document.querySelector(".score");
        this.restartBtn = document.querySelector("#restart");
        this.render(nbrOfCorrectAnswers , totalAmount);
        this.restartBtn.addEventListener("click" , this.restartQuizGame);
    };

    restartQuizGame = () => {
        window.location.reload();
    };

    render = (nbrOfCorrectAnswers , totalAmount) => {
        this.scoreElement.innerHTML = `You answered ${nbrOfCorrectAnswers} question(s) out of ${totalAmount} correctly !`;
    };
};
export default Final;

