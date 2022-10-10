const inquirer = require('inquirer');

let userId: string = "waqas"
let userPin: string = "1234"
let loggedIn: boolean = false
let accountBalance: number = Math.ceil(Math.random() * 25000)
let accountType: number = Math.round(Math.random())
let correctAccountSelected = false

let main = new Promise((resolve, reject): void => {
    let logIn = () => {
        inquirer.prompt([
            {
                name: "id",
                message: "Please enter 'waqas' as user id"
            },
            {
                name: "pass",
                message: "Please enter '1234' as user pin"
            }
        ]).then((answers) => {
            if (answers.id == "waqas" && answers.pass == "1234") {
                loggedIn = true
                console.log("Success you are logged in")
                resolve("OK")
            }
            else {
                console.log("Login failed")
                logIn()
            }
        })
    }
    logIn()
})

main.then(() => {
    let selAcc = new Promise((resolve, reject)=>{
        let selectAccount = async () => {
            await
                inquirer.prompt([
                    {
                        name: "selectedAccount",
                        message: "Please enter S for savings account & C for current account"
                    }
                ]).then((answer) => {
                    if ((answer.selectedAccount.toUpperCase() == "S" && accountType == 0) || (answer.selectedAccount.toUpperCase() == "C" && accountType == 1)) {
                        correctAccountSelected = true
                        console.log("Ok, please proceed")
                        resolve("OK")
                    }
                    else {
                        console.log("incorrect account selected")
                        selectAccount()
                    }
                })
        }
        selectAccount()
    })
    selAcc.then(()=>{
        let seeBal = new Promise ((resolve, reject)=>{
            seeBalance()
            resolve("OK")
        })
        seeBal.then(()=>{
            withdrawFunds()
        })    
    })
})
    
function seeBalance() {
    console.log("Your account balance is: Rs. " + accountBalance)
}

async function withdrawFunds() {
    await
        inquirer.prompt([
            {
                name: "amountEntered",
                message: "Please enter amount to withdraw"
            }
        ]).then((answer) => {
            if (answer.amountEntered <= accountBalance) {
                console.log("withdrawal successful")
            }
            else {
                console.log("Please select amount within limit")
                withdrawFunds()
            }
        })
}

