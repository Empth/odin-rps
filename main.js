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
let gameCount = 0; // counts the round number

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();
    gameCount++;
    let cpuMessage = "CPU chooses "+computerChoice+".";

    if (humanChoice === computerChoice) {
        logMessage(cpuMessage + "Tied round! You both chose " + humanChoice + ".");
        return;
    }

    // KEY -> VAL means KEY beats VAL, a literal rps map
    let map = new Map([['rock', 'scissors'], ['scissors', 'paper'], ['paper', 'rock']]);
    // cleverness to drastically cut down LoC in solution
    let playerWin = (map.get(humanChoice) === computerChoice);

    if (playerWin) {
        logMessage(cpuMessage + "You won this round! As "+humanChoice+ " beats "+computerChoice+".");
        humanScore++;
    } else {
        logMessage(cpuMessage + "You lost this round! As "+computerChoice+ " beats "+humanChoice+".");
        computerScore++;
    }
    return;
}

function logMessage(text) {
    // Adds messages as <p> paragraphs to the log
    const log = document.querySelector(".result");
    const message = document.createElement("p");
    message.textContent = text;
    log.appendChild(message);
}

function makeMoveAndMessage() {
    // event function on rps button click. Returns "done" if game is finished.
    let humanChoice = this.className; // this is the button that accessed this callback 
    playRound(humanChoice, getComputerChoice());
    if (humanScore == 5 || computerScore == 5) {
        console.assert(humanScore != computerScore);
        winnerMessage = (humanScore > computerScore) ? "You win!" : "The CPU wins!";
        logMessage("The game has finished and the score count is Human: "
        +humanScore+' - CPU: '+computerScore+". "+winnerMessage);
        moveList.forEach(move => move.removeEventListener("click", makeMoveAndMessage));
        return;
    }
    logMessage("This is round "+(gameCount+1)+" and the score count is Human: "
    +humanScore+' - CPU: '+computerScore+".");
}


logMessage("Let's play Rock, Paper, Scissors, best of 5!");
logMessage("This is round 1 and the score count is Human: 0 - CPU: 0");

let moveList = [...document.querySelectorAll("button")]; // rock, paper, scissor move buttons
moveList.forEach(move => move.addEventListener("click", makeMoveAndMessage));