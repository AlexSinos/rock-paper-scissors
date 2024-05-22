const startButton = document.getElementById('startbutton');

function startGame() {
    const music = document.getElementById("music");
    music.play();
    setTimeout(() => {
        alert('. . . ');
        alert(`You're finally awake! `)
        alert(`I was getting worried I'd have to call an ambulance or something`)
        const name = prompt(`...Anyway, I read your file but I can't seem to remember... what's your name again?`)
        prompt(`${name}? what kind of stupid name is that?`)
        alert(`Listen, I don't really care anyway. I'm guessing you've already got an idea of what's going on here, right?`)
        const laugh = document.getElementById("laugh");
        laugh.play();
        setTimeout(() => {
            alert(`You died, dummy`)
            alert(`And not only that, but you left me to clean up the mess. Ugh!`)
            alert(`You're probably curious as to what happened`)
            alert(`You were trying to eat a pomelo fruit and got a bit too excited and choked to death. Yeesh!`)
            alert(`Anyway ${name}, right click anywhere and then click inspect element and then navigate to console so we can get started`)
            console.log(`Wow, good job, not as useless as you look are you?`)
            setTimeout(() => {
                alert(`I always find it hilarious how you earthlings think your good deeds will decide your fate in the afterlife`)
                alert(`I know you devoted your life to saving homeless animals but unfortunately it will have no impact here`)
                alert(`All it really comes down to is if you can beat me in a game of rock, paper, scissors. Funny right?`)
                gameLoop();
            }, 15000)
        }, 2000)
    }, 6000)
}

function gameLoop() {
    let play = true;
    while (play) {
        let computerChoice = getComputerChoice();
        let humanChoice = prompt(`Well, wipe your tears away and when you're ready give me your answer.. rock, paper or scissors`)
        humanChoice = humanChoice.toLowerCase();
        game(humanChoice, computerChoice);
        play = playAgain();
    }
}

function game(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        alert(`Draw! You get reincarnated with Redek!`)
    } else if (humanChoice === 'scissors' && computerChoice === 'rock') {
        alert('You lose! Straight to hell with Pinky!')
    } else if (humanChoice === 'scissors' && computerChoice === 'paper') {
        alert('Okay, okay. You win, you can go to heaven with Gucio')
    } else if (humanChoice === 'rock' && computerChoice === 'paper') {
        alert('You lose! Straight to hell with Pinky!')
    } else if (humanChoice === 'rock' && computerChoice === 'scissors') {
        alert('Okay, okay. You win, you can go to heaven with Gucio')
    } else if (humanChoice === 'paper' && computerChoice === 'scissors') {
        alert('You lose! Straight to hell with Pinky!')
    } else if (humanChoice === 'paper' && computerChoice === 'rock') {
        alert('Okay, okay. You win, you can go to heaven with Gucio')
    }
}

function playAgain() {
    let answer = prompt(`Wanna play again?`)
    answer = answer.toLowerCase();
    return answer === 'yeah' || answer === 'yes' || answer === 'yep' || answer === 'tak'|| answer === 'yeap'|| answer === 'ok' || answer === 'okay'|| answer === 'fine' || answer === 'nai' || answer === 'maybe';
}

function getComputerChoice() {
    let value = Math.random(); // Call Math.random() to generate a random number
    if (value <= 0.33) {
        return "scissors";
    } else if (value <= 0.66) {
        return "rock";
    } else {
        return "paper";
    }
}

startButton.addEventListener(`click`, startGame);