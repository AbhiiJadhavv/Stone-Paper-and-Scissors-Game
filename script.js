

const hands = {

    "stone": '<div id="stone2" class="picked"><div><img src="Stone.png" id="stoneimg"></div></div>',
    "paper": '<div id="paper2" class="picked"><div><img src="Paper.png" id="paperimg"></div></div>',
    "scissors": '<div id="scissors2" class="picked"><div><img src="Scissors.png" id="scissorsimg"></div></div>'
}

var rules = document.getElementById("rules");
var openBtn = document.getElementById("open-rules");
var closeBtn = document.getElementById("close-rules");
var openYourOptions = document.getElementById("yourOptions");
var closeResult = document.getElementById("result");
var playAgainBtn = document.getElementById("playAgain1");
var playAgainBtn2 = document.getElementById("playAgain2");
var background1 = document.getElementById("background1");
var background2 = document.getElementById("background2");
var scoreboard = document.getElementById("scoreboard");
var nextBtn = document.getElementById("open-hurray");
let YOURSCORE = localStorage.getItem('yourScore') || 0;
let PCSCORE = localStorage.getItem('pcScore') || 0;

openBtn.onclick = function() {
    rules.style.display = "block";
}

closeBtn.onclick = function() {
    rules.style.display = "none";
}

playAgainBtn.onclick = function() {
    openYourOptions.style.display = "flex";
    closeResult.style.display = "none";
    nextBtn.style.display = "none";
    stopAnimation1();
    stopAnimation2();
}

playAgainBtn2.onclick = function() {
    background2.style.display = "none";
    background1.style.display = "flex";
    scoreboard.style.display = "flex";
    openYourOptions.style.display = "flex";
    nextBtn.style.display = "none";
    stopAnimation1();
    stopAnimation2();
}

nextBtn.onclick = function() {
    scoreboard.style.display = "none";
    closeResult.style.display = "none";
    background1.style.display = "none";
    background2.style.display = "flex";
    nextBtn.style.display = "none";
    stopAnimation1();
    stopAnimation2();
}

const pickYourCircle = (circle) => {

    let yourOptions = document.getElementById("yourOptions");
    yourOptions.style.display = "none";

    let result = document.getElementById("result");
    result.style.display = "flex";

    result.querySelector("#youPicked").innerHTML = hands[circle];

    let pcCircle = pickComputerCircle();
    referee(circle, pcCircle)

}

const pickComputerCircle = () => {

    let computerOptions = ["stone", "paper", "scissors"]
    let pcCircle = computerOptions[Math.floor(Math.random() * 3)]

    result.querySelector("#pcPicked").innerHTML = hands[pcCircle];

    return pcCircle;

}

const referee = (circle, pcCircle) => {
    switch (circle + pcCircle) {
        case "stonestone":
        case "paperpaper":
        case "scissorsscissors":
            setDecision("TIE UP");
            tieUp("");
            break;
        case "stonepaper":
        case "paperscissors":
        case "scissorsstone":
            setDecision("YOU LOST");
            setPcScore(parseInt(PCSCORE) + 1);
            addAnimation2("block");
            tieUp("AGAINST PC");
            break;
        case "stonescissors":
        case "paperstone":
        case "scissorspaper":
            setDecision("YOU WIN");
            setYourScore(parseInt(YOURSCORE) + 1);
            addNext("block");
            addAnimation1("block");
            tieUp("AGAINST PC");
            break;
    }
}

const setDecision = (decision) => {
    document.querySelector("#youWin").innerText = decision;
}

const tieUp = (empty) => {
    document.querySelector("#against").innerText = empty;
}

const setYourScore = (yourscore) => {
    YOURSCORE = yourscore;
    document.querySelector("#yourScore").innerText = yourscore;
    localStorage.setItem('yourScore', yourscore);
}

const setPcScore = (pcscore) => {
    PCSCORE = pcscore;
    document.querySelector("#computerScore").innerText = pcscore;
    localStorage.setItem('pcScore', pcscore);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#yourScore").innerText = YOURSCORE;
    document.querySelector("#computerScore").innerText = PCSCORE;
});

const addNext = (next) => {
    let openHurray = document.getElementById("open-hurray");
    openHurray.style.display = next;
}

const addAnimation1 = (anime1) => {
    let animation1Elements = document.querySelectorAll(".animation1");
    animation1Elements.forEach(element => {
        element.style.display = anime1;
    });
}

const addAnimation2 = (anime2) => {
    let animation2Elements = document.querySelectorAll(".animation2");
    animation2Elements.forEach(element => {
        element.style.display = anime2;
    });
}

function stopAnimation1() {
    let animationElements = document.querySelectorAll(".animation1");
    animationElements.forEach(element => {
        element.style.display = "none";
    });
}

function stopAnimation2() {
    let animationElements = document.querySelectorAll(".animation2");
    animationElements.forEach(element => {
        element.style.display = "none";
    });
}

function resetScores() {
    localStorage.setItem('yourScore', 0);
    localStorage.setItem('pcScore', 0);
    setYourScore(0);
    setPcScore(0);
}