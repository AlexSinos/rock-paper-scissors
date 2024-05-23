const startButton = document.getElementById('startbutton');
let computerScore = 0;
let humanScore = 0;
let name = '';

function updateScores() {
    document.querySelector('.computer-score').innerHTML = computerScore;
    document.querySelector('.human-score').innerHTML = humanScore;
    document.querySelector('.human-score-title').innerHTML = name;
    document.querySelector('.computer-score-title').innerHTML = 'Death';
}

function startGame() {
    const music = document.getElementById("music");
    music.play();
    setTimeout(() => {
        alert('. . . ');
        alert(`You're finally awake!`);
        alert(`I was getting worried I'd have to call an ambulance or something.`);
        name = prompt(`...Anyway, I read your file but I can't seem to remember... what's your name again?`);
        if (!name) {
            alert(`You can't remember? That's embarrassing!`);
            name = 'Player';
        } else {
            alert(`${name}? What kind of amazing name is that?`);
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
            }, 3);
        }, 2000);
    }, 6000);
}

function gameLoop() {
    
    if (computerScore === 3) {alert(`
    You lose! Straight to hell with Pinky!`)
    }
    else if (humanScore === 3) {alert(`Okay, okay. You win, you can go to heaven with Gucio`
    )}
    else {
        let computerChoice = getComputerChoice();
        let humanChoice = prompt(`Well, wipe your tears away and when you're ready give me your answer.. rock, paper or scissors?`);
        humanChoice = humanChoice.toLowerCase();
        game(humanChoice, computerChoice);
        playAgain();
}
}

function game(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        alert(`${humanChoice}? I have ${computerChoice}. That's a draw! 
        ${humanScore} : ${computerScore}`);
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'rock') ||
        (humanChoice === 'rock' && computerChoice === 'paper') ||
        (humanChoice === 'paper' && computerChoice === 'scissors')
    ) {
        computerScore++;
        alert(`${humanChoice}? I have ${computerChoice}. 
        ${humanScore} : ${computerScore}`);
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'paper') ||
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock')
    ) {
        humanScore++
        alert(`${humanChoice}? I have ${computerChoice}.
        ${humanScore} : ${computerScore}`);
        ;
    } else {
        alert(`What on earth is a ${humanChoice}?`);
    }
    updateScores();
}

function playAgain() {
    setTimeout(() => {
    let answer = prompt(`Ready for the next round?`);
    answer = answer.toLowerCase();
    const yesAnswers = ['yeah', 'yes', 'yep', 'okay', 'yeap', 'ok', 'tak', 'fine', 'si', 'whatever', 'w/e', 'nai', '', 'go', 'one more', 'if i have to'];
    yesAnswers.includes(answer) ? gameLoop() : alert("farewell")
}, 2000)
}

function getComputerChoice() {
    let value = Math.random();
    if (value <= 0.33) {
        return "scissors";
    } else if (value <= 0.66) {
        return "rock";
    } else {
        return "paper";
    }
}

startButton.addEventListener('click', startGame);
