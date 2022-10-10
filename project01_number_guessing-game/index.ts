const inquirer = require('inquirer');

let roundsWon = {
    first: false,
    second: false
}

let runGame = async () => {
    await game(10)
    if (roundsWon.first==true) {
        await game(20)
    }
    if (roundsWon.second==true) {
        console.log("Congrats! You won all rounds")
    }
}

let game = async (maxLimit:number)=>{
    await
    inquirer.prompt([
        {name:"user_num", message:"Please guess a whole number between 1 to " + maxLimit}
    ])
    .then((answer)=>{
        let randNum: number = Math.ceil(Math.random()*maxLimit)
        if (answer.user_num <1 || answer.user_num >maxLimit || answer.user_num%1!=0) {
            console.log("Please enter a whole number within range")
        }
        else if (answer.user_num == randNum) {
            console.log("Hurrah you guessed the correct number!")
            roundsWon.first=true
            console.log(roundsWon.first)
        }
        else {
            console.log("Sorry, the correct number is: " + randNum)
        }
    })
}

runGame()