const startButton = document.getElementById('start-button');
const script = document.getElementById('script');
const input = document.createElement("input");
let computerScore = 0;
let humanScore = 0;
let position = 0;
let name = '';
let dialogueArray = [
    '. . . ',
    `You're finally awake!`,
    `I was getting worried I'd have to call an ambulance or something.`,
    `...Anyway, I read your file but I can't seem to remember... what's your name again?`,
    `You can't remember? That's embarrassing! I'll call you Player`,
    `Listen, I don't really care anyway. I'm guessing you've already got an idea of what's going on here, right?`,
    `You died, dummy.`,
    `And not only that, but you left me to clean up the mess. Ugh!`,
    `You're probably curious as to what happened.`,
    `You were trying to eat a pomelo fruit and got a bit too excited and choked to death. Yeesh!`,
    `I always find it hilarious how you earthlings think your good deeds will decide your fate in the afterlife.`,
    `I know you devoted your life to saving homeless animals but unfortunately it will have no impact here.`,
    `All it really comes down to is if you can beat me in a game of rock, paper, scissors. Funny right?`,
    `Best of 5, if you win you go to heaven, if you lose you go to hell`
];
const laugh = document.getElementById("laugh");
const container = document.querySelector(".main");
const textBox = document.querySelector(".text-box");
const continueButton = document.querySelector("button");
const createChatBox = () => {
    const textBox = document.createElement("div");
    textBox.classList.add("text-box");
    container.appendChild(textBox);
    return textBox;
};

const createContinueButton = () => {
    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    container.appendChild(continueButton);
    return continueButton;
};

const advanceDialogue = (textBox, continueButton) => {
    textBox.textContent = dialogueArray[position];
    if (position === 6) {
        laugh.play();
    } else if (position === 3) {
        container.appendChild(input);
        continueButton.textContent = "Submit";
        continueButton.onclick = () => {
            name = input.value || 'Player';
            input.remove();
            continueButton.textContent = "Continue";
            dialogueArray[4] = `${name}? Huh, who came up with a name like that?`;
            position++;
            advanceDialogue(textBox, continueButton);
        };
    } else {
        continueButton.onclick = () => {
            position++;
            if (position < dialogueArray.length) {
                advanceDialogue(textBox, continueButton);
            } else {
                gameLoop(); // Move game loop call here
            }
        };
    }
};

const startGame = () => {
    const music = document.getElementById("music");
    music.play();
    setTimeout(() => {
        const textBox = createChatBox();
        const continueButton = createContinueButton();
        advanceDialogue(textBox, continueButton);
    }, 100);
};

const checkGameEnd = () => {
    console.log("Checking game end...");
    console.log("Human Score:", humanScore, "Computer Score:", computerScore);
    setTimeout(() => {
        const textBox = document.querySelector(".text-box");
        const continueButton = document.querySelector("button");
        if (computerScore === 3) {
            console.log("Computer wins!");
            textBox.textContent =`You lose! Straight to hell with Pinky!`;
        } else if (humanScore === 3) {
            console.log("Human wins!");
            textBox.textContent =`Okay, okay. You win, you can go to heaven with Gucio.`;
        }
        input.remove();
        continueButton.remove();
    }, 1000);}

const gameLoop = () => {
    let computerChoice = getComputerChoice();
    const textBox = document.querySelector(".text-box");
    const continueButton = document.querySelector("button");
    container.appendChild(input);
    continueButton.onclick = () => { // Change event listener to onclick handler
        let humanChoice = input.value.toLowerCase();
        rockPaperScissors(humanChoice, computerChoice);
    };
};

const rockPaperScissors = (humanChoice, computerChoice) => {
    const textBox = document.querySelector(".text-box");
    const continueButton = document.querySelector("button");
    const humanChoiceCapitalised = humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1);

    if (humanChoice === computerChoice) {
        textBox.textContent = `${humanChoiceCapitalised}? I have ${computerChoice}. That's a draw! ${humanScore} : ${computerScore}`;
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'rock') ||
        (humanChoice === 'rock' && computerChoice === 'paper') ||
        (humanChoice === 'paper' && computerChoice === 'scissors')
    ) {
        computerScore++;
        textBox.textContent = `${humanChoiceCapitalised}? I have ${computerChoice}. ${humanScore} : ${computerScore}`;
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'paper') ||
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock')
    ) {
        humanScore++;
        textBox.textContent = `${humanChoiceCapitalised}? I have ${computerChoice}. ${humanScore} : ${computerScore}`;
    } else {
        textBox.textContent = `What on earth is a ${humanChoice}?`;
    }

    updateScores();

    if (computerScore === 3 || humanScore === 3) {
        checkGameEnd();
    } else {
        // If the game hasn't ended, proceed with the next round
        gameLoop();
    }
};



const updateScores = () => {
    console.log("Updating Scores...");
    console.log("Previous Scores - Human:", humanScore, "Computer:", computerScore);
    document.querySelector('.computer-score').textContent = computerScore;
    document.querySelector('.human-score').textContent = humanScore;
    document.querySelector('.human-score-title').textContent = name.charAt(0).toUpperCase() + name.slice(1);
    document.querySelector('.computer-score-title').textContent = 'Death';
    console.log("Updated Scores - Human:", humanScore, "Computer:", computerScore);
};

function getComputerChoice() {
    let value = Math.random();
    return (value <= 0.33) ? "scissors" : (value <= 0.66) ? "rock" : "paper"; 
}

startButton.addEventListener('click', () => {
    startButton.remove();
    startGame();
})
