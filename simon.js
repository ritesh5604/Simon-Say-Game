let gameseq = [];
let userseq = [];
let btns = ["red", "green", "yellow", "purple"];
let level = 0;
let started = false;
let highestScore = 0; 
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game is started");
        started = true;
        levelup();
    }
});

function documentflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level} | Highest Score ${highestScore}`;
    let randomIdx = Math.floor(Math.random() * 4);
    let randcolor = btns[randomIdx];
    let ranbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    documentflash(ranbtn);
}

function checkAns(idx) {
    if (gameseq[idx] === userseq[idx]) {
        if (gameseq.length === userseq.length) {
            if (level > highestScore) {
                highestScore = level;
            }
            setTimeout(levelup, 1500);
        }
    } else {
        h3.innerHTML = `"Game Over! Your score was <b>${level}</b> | Highest Score ${highestScore} <br> Press any key to Start"`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    console.log(userseq);

    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}