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
const laugh = document.querySelector("#laugh");
const container = document.querySelector(".main");
const speak = document.querySelector("#speak")

const createChatBox = () => {
    const textBox = document.createElement("div");
    textBox.classList.add("text-box");
    container.appendChild(textBox);
    return textBox;
};

const createContinueButton = () => {
    const continueButton = document.createElement("button");
    continueButton.textContent = "Continue";
    continueButton.style.display = 'none';
    container.appendChild(continueButton);
    return continueButton;
};

const advanceDialogue = (textBox, continueButton) => {
    let letter = 0;
    textBox.textContent = ''; 

    const typeWriter = () => {
        if (letter < dialogueArray[position].length) {
            speak.play()
            textBox.textContent += dialogueArray[position].charAt(letter);
            letter++;
            setTimeout(typeWriter, 30);
        } else {
            showContinueButton(); 
        }
    };

    const showContinueButton = () => {
        if (position === 6) {
            laugh.play();
            setTimeout(() => {
                continueButton.style.display = 'inline-block';
            }, 4000);
        } else {
            continueButton.style.display = 'inline-block';
        }

        continueButton.onclick = () => {
            position++;
            if (position < dialogueArray.length) {
                advanceDialogue(textBox, continueButton);
            } else {
                gameLoop();
            }
        };

        if (position === 3) {
            continueButton.textContent = "Submit";
            container.appendChild(input);
            continueButton.onclick = () => {
                name = input.value || 'Player';
                input.remove();
                continueButton.textContent = "Continue";
                dialogueArray[4] = `${name}? Huh, who came up with a name like that?`;
                position++;
                advanceDialogue(textBox, continueButton);
            };
        }
    };

    continueButton.style.display = 'none';
    typeWriter();
};


const startGame = () => {
    const music = document.getElementById("music");
    music.play();
    setTimeout(() => {
        const textBox = createChatBox();
        const continueButton = createContinueButton();
        advanceDialogue(textBox, continueButton);
    }, 1000);
};

const checkGameEnd = () => {
    const textBox = document.querySelector(".text-box");
    const continueButton = document.querySelector("button");
    const death = document.getElementById("death");
    const heaven = document.getElementById("heaven");
    if (computerScore >= 3) {
        death.play();
        textBox.textContent = `You lose! Straight to hell with Pinky!`;
    } else if (humanScore >= 3) {
        heaven.play();
        textBox.textContent = `Okay, okay. You win, you can go to heaven with Gucio.`;
    }
    input.remove();
    continueButton.remove();
};

const gameLoop = () => {
    let computerChoice = getComputerChoice();
    const textBox = document.querySelector(".text-box");
    const continueButton = document.querySelector("button");
    container.appendChild(input);
    continueButton.onclick = () => { 
        let humanChoice = input.value.toLowerCase();
        rockPaperScissors(humanChoice, computerChoice);
    };
};

const rockPaperScissors = (humanChoice, computerChoice) => {
    const textBox = document.querySelector(".text-box");
    const continueButton = document.querySelector("button");
    const humanChoiceCapitalised = humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1);
    const rattle = document.querySelector("#rattle");
    rattle.play();


    let resultText;
    if (humanChoice === computerChoice) {
        resultText = `${humanChoiceCapitalised}? I have ${computerChoice}. That's a draw! ${humanScore} : ${computerScore}`;
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'rock') ||
        (humanChoice === 'rock' && computerChoice === 'paper') ||
        (humanChoice === 'paper' && computerChoice === 'scissors')
    ) {
        resultText = `${humanChoiceCapitalised}? I have ${computerChoice}. ${humanScore} : ${++computerScore}`;
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'paper') ||
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock')
    ) {
        resultText = `${humanChoiceCapitalised}? I have ${computerChoice}. ${++humanScore} : ${computerScore}`;
    } else {
        resultText = `What on earth is a ${humanChoice}?`;
    }

    let index = 0;
    textBox.textContent = "";
    const typeWriter = () => {
        speak.play()
        if (index < resultText.length) {
            textBox.textContent += resultText.charAt(index);
            index++;
            setTimeout(typeWriter, 30); 
        } else {
            updateScores();

            if (computerScore === 3 || humanScore === 3) {
                checkGameEnd();
            } else {
                gameLoop();
            }
        }
    };

    setTimeout(typeWriter, 2000);
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
});
