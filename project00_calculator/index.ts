const inquirer = require('inquirer');

console.log("Simple calculator")

let operationType: string;

inquirer
    .prompt([
        {
            name: "opType",
            message: "Type:\n A for addition\n S for subtraction\n M for multiplication\n D for division"
        }
    ])
    .then(async (opAns) => {
        console.log("Selected operation: " + opAns.opType.toUpperCase() + "\n")
        operationType = opAns.opType.toUpperCase()
        console.log("The result is: " + await operation())
    })
    .catch((err) => {
        console.log(err);
    });



async function operation():Promise<number> {
    let result: number|string = 0;
    await inquirer.prompt(
        [
            { name: "num_one", message: "Please enter first number" },
            { name: "num_two", message: "Please enter second number" }
        ]
    ).then((answers) => {
        let firstNum: number = parseFloat(answers.num_one)
        let secondNum: number = parseFloat(answers.num_two)
        result = operationType == "A" ? firstNum + secondNum : operationType == "S" ? firstNum - secondNum : operationType == "M" ? firstNum * secondNum : operationType == "D" ? firstNum / secondNum : "Invalid operation type entered"
    })
    return result
}