import Quiz from "./quiz.js";
class Settings {
    constructor(){
        this.settingDom = document.querySelector(".settings");
        this.quizDom = document.querySelector(".quiz");
        this.categoryDom = document.querySelector("#category");
        this.nQuestionsDom = document.querySelector("#nQuestions");
        this.startBtn = document.querySelector("#startBtn");
        this.difficultyDom = [
            document.querySelector("#easy"),
            document.querySelector("#medium"),
            document.querySelector("#hard"),
        ];
        this.quiz = {};
        this.startBtn.addEventListener("click" , this.startQuizApp);
    };

    startQuizApp = async () => {
            try{
               const amount = this.getAmount();
               const categoryID = this.categoryDom.value;
               const difficulty = this.getDifficulty();
   
               if(amount && categoryID && difficulty){
                    const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryID}&difficulty=${difficulty}&type=multiple`;
                    let result = await this.fetchData(url);
                    if(result){
                        this.quiz = new Quiz(this.quizDom, amount, result);
                        this.toggleElements();
                    }else{
                        window.alert("Error in fetching data from server");
                    }
               }else{
                    window.alert("Please enter valid inputs");
               }

           }catch(err){
               window.alert(err);
           }
    };

    toggleElements = () => {
        this.settingDom.style.display = "none";
        this.quizDom.style.display = "block";
    };

    fetchData = async (url) => {
        let result = await fetch(url).then((response) => response.json())
                                     .then((data) => {return data.results});
        return result;
    };

    getAmount = () => {
        const amount = this.nQuestionsDom.value;
        if(amount > 0 && amount <= 20){
            return amount;
        }else{
            window.alert("Please enter number of questions between 1 and 20");
            return null;
        }
    };

    getDifficulty = () => {
        const difficulty = this.difficultyDom.filter((element) => element.checked);
        if(difficulty.length == 1){
            return difficulty[0].id;
        }else{
            window.alert("Please select the difficulty");
            return null;
        }
    };
};
export default Settings;

