const startButton = document.getElementById('start-button');
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
    `Best of 5, if you win you go to heaven, if you lose you go to hell`,
    `So, what will it be, rock, paper or scissors?`

];
const laugh = document.querySelector("#laugh");
const container = document.querySelector(".main");
const speak = document.querySelector("#speak");
const buttonsContainer = document.createElement("div");
buttonsContainer.classList.add("buttons");


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
            speak.play();
            textBox.textContent += dialogueArray[position].charAt(letter);
            letter++;
            setTimeout(typeWriter, 30);
        } else {
            showContinueButton();
        }
    };

    const showContinueButton = () => {
        continueButton.style.display = 'inline-block';

        if (position === 6) {
            laugh.play();
            setTimeout(() => {
                continueButton.style.display = 'inline-block';
            }, 4000);
        } else {
            continueButton.style.display = 'inline-block';
        }

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
        } else {
            continueButton.onclick = () => {
                position++;
                if (position < dialogueArray.length) {
                    advanceDialogue(textBox, continueButton);
                } else {
                    continueButton.remove(); 
                    gameLoop();
                }
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
    const death = document.getElementById("death");
    const heaven = document.getElementById("heaven");
    if (computerScore >= 3) {
        death.play();
        textBox.textContent = `You lose! Straight to hell with Pinky!`;
    } else if (humanScore >= 3) {
        heaven.play();
        textBox.textContent = `Okay, okay. You win, you can go to heaven with Gucio.`;
    }
};

const gameLoop = () => {
    let computerChoice = getComputerChoice();
    const textBox = document.querySelector(".text-box");
container.appendChild(buttonsContainer);
    buttonsContainer.textContent = ''; 

    const rock = document.createElement("button");
    rock.classList.add('choice-button');
    rock.textContent = '🪨';
    buttonsContainer.appendChild(rock);

    const scissors = document.createElement("button");
    scissors.classList.add('choice-button');
    scissors.textContent = '✂️';
    buttonsContainer.appendChild(scissors);

    const paper = document.createElement("button");
    paper.classList.add('choice-button');
    paper.textContent = '📄';
    buttonsContainer.appendChild(paper);

    rock.addEventListener("click", () => {
        let humanChoice = "rock";
        rockPaperScissors(humanChoice, computerChoice);
    });

    scissors.addEventListener("click", () => {
        let humanChoice = "scissors";
        rockPaperScissors(humanChoice, computerChoice);
    });

    paper.addEventListener("click", () => {
        let humanChoice = "paper";
        rockPaperScissors(humanChoice, computerChoice);
    });
};

const rockPaperScissors = (humanChoice, computerChoice) => {
    const textBox = document.querySelector(".text-box");
    const humanChoiceCapitalised = humanChoice.charAt(0).toUpperCase() + humanChoice.slice(1);
    const rattle = document.querySelector("#rattle");
    rattle.play();
    document.querySelectorAll('.choice-button').forEach(button => button.remove());

    let resultText = "";
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
    }

    let index = 0;
    textBox.textContent = "";
    const typeWriter = () => {
        if (index < resultText.length) {
            speak.play();
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
    document.querySelector('.computer-score').textContent = computerScore;
    document.querySelector('.human-score').textContent = humanScore;
    document.querySelector('.human-score-title').textContent = name.charAt(0).toUpperCase() + name.slice(1);
    document.querySelector('.computer-score-title').textContent = 'Death';
};

function getComputerChoice() {
    let value = Math.random();
    return (value <= 0.33) ? "scissors" : (value <= 0.66) ? "rock" : "paper";
}

startButton.addEventListener('click', () => {
    startButton.remove();
    startGame();
});
