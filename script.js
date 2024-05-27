const startButton = document.getElementById('start-button');
const script = document.getElementById('script')
let computerScore = 0;
let humanScore = 0;
let position = 0;
let name = '';
let capitalisedName = '';
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

const createChatBox = () => {
    const container = document.querySelector(".main")
    const textBox = document.createElement("div")
    textBox.classList.add("text-box")
    container.appendChild(textBox);
    return textBox;
}
const createContinueButton = () => {
    const container = document.querySelector(".main")
    const continueButton = document.createElement("button")
    continueButton.classList.add("continue-button")
    container.appendChild(continueButton)
    continueButton.textContent = "Continue"
    return continueButton; 
}


const startGame = () => {
    const music = document.getElementById("music");
    music.play();
    setTimeout(() => {
        const textBox = createChatBox()
        const continueButton = createContinueButton()
        continueButton.addEventListener('click', () => {
            textBox.textContent = dialogueArray[position]
            position++
            })
        const laugh = document.getElementById("laugh");
        laugh.play();
        
            }, 100);
        }
const checkGameEnd = () => {
    setTimeout(() => {
    computerScore === 3 ? alert(` You lose! Straight to hell with Pinky!`) : humanScore === 3 ? alert(`Okay, okay. You win, you can go to heaven with Gucio`) : gameLoop()
    }, 1000)}

const gameLoop = () => {
        let computerChoice = getComputerChoice();
        let humanChoice = prompt(`Well, wipe your tears away and when you're ready give me your answer.. rock, paper or scissors?`);
        humanChoice = humanChoice.toLowerCase();
        game(humanChoice, computerChoice);
        checkGameEnd()
}

const game = (humanChoice, computerChoice) => {
    let humanChoiceCapitalised = humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1);
    if (humanChoice === computerChoice) {
        alert(`${humanChoiceCapitalised}? I have ${computerChoice}. That's a draw! 
        ${humanScore} : ${computerScore}`);
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'rock') ||
        (humanChoice === 'rock' && computerChoice === 'paper') ||
        (humanChoice === 'paper' && computerChoice === 'scissors')
    ) {
        computerScore++;
        alert(`${humanChoiceCapitalised}? I have ${computerChoice}. 
        ${humanScore} : ${computerScore}`);
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'paper') ||
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock')
    ) {
        humanScore++
        alert(`${humanChoiceCapitalised}? I have ${computerChoice}.
        ${humanScore} : ${computerScore}`);
        ;
    } else {
        alert(`What on earth is a ${humanChoice}?`);
    }
    updateScores();
}

const updateScores = () => {
    document.querySelector('.computer-score').innerHTML = computerScore;
    document.querySelector('.human-score').innerHTML = humanScore;
    document.querySelector('.human-score-title').innerHTML = capitalisedName;
    document.querySelector('.computer-score-title').innerHTML = 'Death';
}

function getComputerChoice() {
    let value = Math.random();
    return (value <= 0.33) ? "scissors" : (value <= 0.66) ? "rock" : "paper"; 
}

startButton.addEventListener('click', () => {
    startButton.remove();
    startGame();
});


