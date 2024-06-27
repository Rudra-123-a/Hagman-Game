const hint = document.getElementById("hint");
const word = document.getElementById("word");
const msg = document.getElementById("msg");

const wordsToGuess = [
    ['apple','a fruit'],
    ['elephant','an animal'],
    ['vijayawada', 'city name'],
    
];
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");
const restartBtn = document.getElementById("restartBtn");

canvas.height = 400;
canvas.width = 400;
let selectedWord = "";
let displayWord = "";
let attempts = 0;
let maxAttempts = 6;
let guessedLetters = [];

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const initializeGame = () => {
    attempts = 0;
    guessedLetters = [];
    msg.innerText = "";
    msg.className = "";
    
    const selectedIndex = Math.floor(Math.random() * wordsToGuess.length);
    selectedWord = wordsToGuess[selectedIndex][0];
    hint.innerText = `Hint: ${wordsToGuess[selectedIndex][1]}`;
    displayWord = "_ ".repeat(selectedWord.length).trim();
    word.innerText = displayWord;
    
    clearCanvas();
    drawHangman();
};

const drawHangman = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw base
    ctx.beginPath();
    ctx.rect(50, 370, 300, 20);
    ctx.stroke();
    // vertical pole
    ctx.beginPath();
    ctx.rect(100, 50, 20, 320);
    ctx.stroke();
    // horizontal line
    ctx.beginPath();
    ctx.rect(120, 70, 120, 10);
    ctx.stroke();
    
    if (attempts > 0) {
        // top
        ctx.beginPath();
        ctx.moveTo(200, 80);
        ctx.lineTo(200, 120);
        ctx.stroke();
    }
    if (attempts > 1) {
        // face
        ctx.beginPath();
        ctx.arc(200, 150, 30, 0, Math.PI * 2);
        ctx.stroke();
    }
    if (attempts > 2) {
        // body
        ctx.beginPath();
        ctx.moveTo(200, 180);
        ctx.lineTo(200, 280);
        ctx.stroke();
    }
    if (attempts > 3) {
        // left hand
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(150, 240);
        ctx.stroke();
    }
    if (attempts > 4) {
        // right hand
        ctx.beginPath();
        ctx.moveTo(200, 200);
        ctx.lineTo(260, 240);
        ctx.stroke();
    }
    if (attempts > 5) {
        // left leg
        ctx.beginPath();
        ctx.moveTo(200, 280);
        ctx.lineTo(150, 320);
        ctx.stroke();
    }
    if (attempts > 6) {
        // right leg
        ctx.beginPath();
        ctx.moveTo(200, 280);
        ctx.lineTo(260, 320);
        ctx.stroke();
    }
};

const updateWord = () => {
    let updated = '';
    for (let i = 0; i < selectedWord.length; i++) {
        if (guessedLetters.indexOf(selectedWord[i]) > -1) {
            updated += selectedWord[i] + " ";
        } else {
            updated += "_ ";
        }
    }
    displayWord = updated.trim();
    word.innerText = updated;
};

const performAction = (event) => {
    const keyPressed = event.key.toLowerCase();
    if (guessedLetters.includes(keyPressed)) {
        return;
    }
    if (selectedWord.includes(keyPressed)) {
        guessedLetters.push(keyPressed.toLowerCase());
    } else {
        attempts++;
    }
    console.log({ attempts, guessedLetters });
    updateWord();
    drawHangman();
    if (displayWord.replace(/ /g, '') === selectedWord) {
        msg.innerHTML = "Congratulations! <i class='fas fa-trophy'></i> You Won!";
        msg.className = "success";
        
    }
    if (attempts === maxAttempts) {
        msg.innerHTML = "Oops,try again! <i class='fas fa-sad-tear'></i> You Lost";
        msg.className = "warning";
    }
};

restartBtn.addEventListener('click', initializeGame);
document.addEventListener('keydown', performAction);

initializeGame();
