const startButton = document.getElementById('startbutton');
let computerScore = 0;
let humanScore = 0;
let name = '';  // Declared globally

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
        alert(`I was getting worried I'd have to call an ambulance or something`);
        name = prompt(`...Anyway, I read your file but I can't seem to remember... what's your name again?`);
        if (!name) {
            alert(`You can't remember? That's embarrassing!`);
            name = 'Player';
        } else {
            alert(`${name}? What kind of stupid name is that?`);
        }
        alert(`Listen, I don't really care anyway. I'm guessing you've already got an idea of what's going on here, right?`);
        const laugh = document.getElementById("laugh");
        laugh.play();
        setTimeout(() => {
            alert(`You died, dummy`);
            alert(`And not only that, but you left me to clean up the mess. Ugh!`);
            alert(`You're probably curious as to what happened`);
            alert(`You were trying to eat a pomelo fruit and got a bit too excited and choked to death. Yeesh!`);
            alert(`Anyway ${name}, right click anywhere and then click inspect element and then navigate to console so we can get started`);
            console.log(`Wow, good job, not as useless as you look are you?`);
            setTimeout(() => {
                alert(`I always find it hilarious how you earthlings think your good deeds will decide your fate in the afterlife`);
                alert(`I know you devoted your life to saving homeless animals but unfortunately it will have no impact here`);
                alert(`All it really comes down to is if you can beat me in a game of rock, paper, scissors. Funny right?`);
                gameLoop();
            }, 0);
        }, 2000);
    }, 6000);
}

function gameLoop() {
    let play = true;
    while (play) {
        let computerChoice = getComputerChoice();
        let humanChoice = prompt(`Well, wipe your tears away and when you're ready give me your answer.. rock, paper or scissors`);
        humanChoice = humanChoice.toLowerCase();
        game(humanChoice, computerChoice);
        play = playAgain();
    }
}

function game(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        alert(`${humanChoice}? I have ${computerChoice}. Draw! You get reincarnated with Redek!`);
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'rock') ||
        (humanChoice === 'rock' && computerChoice === 'paper') ||
        (humanChoice === 'paper' && computerChoice === 'scissors')
    ) {
        alert(`${humanChoice}? I have ${computerChoice}. You lose! Straight to hell with Pinky!`);
        computerScore++;
    } else if (
        (humanChoice === 'scissors' && computerChoice === 'paper') ||
        (humanChoice === 'rock' && computerChoice === 'scissors') ||
        (humanChoice === 'paper' && computerChoice === 'rock')
    ) {
        alert(`${humanChoice}? I have ${computerChoice}. Okay, okay. You win, you can go to heaven with Gucio`);
        humanScore++;
    } else {
        alert(`What on earth is a ${humanChoice}?`);
    }
    updateScores();
}

function playAgain() {
    let answer = prompt(`Wanna play again?`);
    answer = answer.toLowerCase();
    const yesAnswers = ['yeah', 'yes', 'yep', 'okay', 'yeap', 'ok', 'tak', 'fine', 'si', 'whatever', 'w/e', 'nai', '', 'go', 'one more', 'if i have to'];
    return yesAnswers.includes(answer);
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
