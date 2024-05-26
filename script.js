const startButton = document.getElementById('startbutton');
let computerScore = 0;
let humanScore = 0;
let name = '';
let capitalisedName = '';

const startGame = () => {
    const music = document.getElementById("music");
    music.play();
    setTimeout(() => {
        alert('. . . ');
        alert(`You're finally awake!`);
        alert(`I was getting worried I'd have to call an ambulance or something.`);
        name = prompt(`...Anyway, I read your file but I can't seem to remember... what's your name again?`);
        if (!name) {
            alert(`You can't remember? That's embarrassing! I'll call you Player`);
            name = 'Player';
        } else {
            capitalisedName = name.charAt(0).toUpperCase() + name.slice(1);
            alert(`${capitalisedName}? What kind of amazing name is that?`);
        }
        alert(`Listen, I don't really care anyway. I'm guessing you've already got an idea of what's going on here, right?`);
        const laugh = document.getElementById("laugh");
        laugh.play();
        setTimeout(() => {
            alert(`You died, dummy.`);
            alert(`And not only that, but you left me to clean up the mess. Ugh!`);
            alert(`You're probably curious as to what happened.`);
            alert(`You were trying to eat a pomelo fruit and got a bit too excited and choked to death. Yeesh!`);
            setTimeout(() => {
                alert(`I always find it hilarious how you earthlings think your good deeds will decide your fate in the afterlife.`);
                alert(`I know you devoted your life to saving homeless animals but unfortunately it will have no impact here.`);
                alert(`All it really comes down to is if you can beat me in a game of rock, paper, scissors. Funny right?`);
                alert(`Best of 5, if you win you go to heaven, if you lose you go to hell`);
                gameLoop();
            }, 100);
        }, 2000);
    }, 6000);
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


