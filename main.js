function getComputerChoice() {
    let number = Math.random() * 3;
    if (number < 1) {
        return "rock";
    } else if (number < 2) {
        return "paper";
    } else {
        return "scissors";
    }
}

let getHumanChoice = () => prompt("Choose \"rock\", \"paper\", or \"scissors\"")

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    // returns "tie" or "nontie"
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();
    console.log("Computer chose "+computerChoice+".");

    if (humanChoice === computerChoice) {
        console.log("Tied round! You both chose " + humanChoice + ".");
        return "tie";
    }

    // KEY -> VAL means KEY beats VAL, a literal rps map
    let map = new Map([['rock', 'scissors'], ['scissors', 'paper'], ['paper', 'rock']]);
    // cleverness to drastically cut down LoC in solution
    let playerWin = (map.get(humanChoice) === computerChoice);

    if (playerWin) {
        console.log("You won this round! As "+humanChoice+ " beats "+computerChoice+".");
        humanScore++;
    } else {
        console.log("You lost this round! As "+computerChoice+ " beats "+humanChoice+".");
        computerScore++;
    }
    return "nontie";
}

function playGame() {
    console.log("Let's play Rock, Paper, Scissors, best of 5!")
    let humanSelection, computerSelection, tieStatus;
    let gameCount = 0; // doesn't increment on ties
    while (gameCount < 5 && humanScore < 3 && computerScore < 3) {
        console.log("This is round "+(gameCount+1)+" and the score count is Human: "
        +humanScore+' - CPU: '+computerScore+".")
        humanSelection = getHumanChoice();
        computerSelection = getComputerChoice();
        tieStatus = playRound(humanSelection, computerSelection);
        if (tieStatus === "nontie") {
            gameCount++;
        }
    }
    console.assert(humanScore != computerScore);
    winnerMessage = (humanScore > computerScore) ? "You win!" : "The CPU wins!"
    console.log("The game has finished and the score count is Human: "
        +humanScore+' - CPU: '+computerScore+". "+winnerMessage)
}

playGame();