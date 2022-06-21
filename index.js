const input1 = document.querySelector('.fill_in .txt')
const input2 = document.querySelector('.fill_in .submit')
const reset = document.querySelector('.fill_in .reset')
const final_answer = document.querySelector('.fill_in .guess_number')
const luckyMe = document.querySelector('.fill_in .lucky')

var code = ' '

input1.addEventListener("click", function (e) {
    input1.value = ""
})

input2.addEventListener("click", function (e) {
    if (input1.value == '請於此輸入想猜的數字...' || code == 'running' || code == 'win' || code == 'lose') {
        console.log('detected clicked! but block by system cause the code is running or player has already won/lose the game')
        return;
    } else {
        console.log(`detected clicked! system goes on`)
        try {
            //randomNumber();
            guessNumber();
            console.log(typeof (input1.value))
        } catch (err) {
            console.log(err)
        }
    }
})

reset.addEventListener("click", function (e) {
    playeranswer = [];
    gameRound = 10;
    final_answer.innerHTML = '<p></p>';
})

luckyMe.addEventListener("click", function(e) {
    if(code == 'running' || code == 'win' || code == 'lose'){
        console.log('detected clicked! but refused by system due to the code is running')
        return;
    } else {
    luckyNumber = Math.floor(Math.random() *100);
    guessNumber(luckyNumber);
    }
})

console.log(input1)

console.log(input1.value)

const P = [
    ' ',
    '比',
    '比對',
    '比對中',
    '比對中 . ',
    '比對中 . .',
    '比對中 . . .'
];
let x = 0; 0

let luckyNumber = Math.floor(Math.random() *100);

let randomnumber1 = Math.floor(Math.random() * 100);
console.log(randomnumber1)

let playeranswer = []
let gameRound = 10

function randomNumber() {
    randomnumber1 = Math.floor(Math.random() * 100);
}

function syncDelay(milliseconds) {
    var start = new Date().getTime();
    var end = 0;
    while ((end - start) < milliseconds) {
        end = new Date().getTime();
    }
}

function guessNumber(a) {
    if(a != null){
        input1.value = a
    }
    value = Number(input1.value)
    console.log(typeof (value))
    console.log(gameRound)
    if (isNaN(value)) {
        final_answer.innerHTML = `<p class="guess_number">系統辨別非數字! 請重試<p/><p class="guess_number">你已猜過了：${playeranswer}<p/>`
        console.log(`系統辨別非數字，請重試`);
    } else if (!isNaN(value)) {
        gameRound -= 1;
        code = 'running'
        playeranswer.push(value);
        console.log(`system is running here b `);

        if (value === randomnumber1) {
            console.log(`system is running here A `)
            const loader = setInterval(() => {
                final_answer.innerHTML = `<p class="guess_number">你所選的數字為：${value} ${P[x++]}<p/><p class="guess_number">你已猜過了：${playeranswer}<p/><p class="guess_number">剩餘次數：${gameRound}</p>`;
                x %= P.length;
            }, 250);

            setTimeout(() => {
                clearInterval(loader);
                final_answer.innerHTML = `<p class="guess_number">你所選的數字為：${value} 正確無誤!<p/><p class="guess_number">你已猜過了：${playeranswer}<p/><p class="guess_number">剩餘次數：${gameRound}</p>`
                code = 'win'
            }, 5000);
        } else if (value < randomnumber1) {
            const loader = setInterval(() => {
                final_answer.innerHTML = `<p class="guess_number">你所選的數字為：${value} ${P[x++]}<p/><p class="guess_number">你已猜過了：${playeranswer}<p/><p class="guess_number">剩餘次數：${gameRound}</p>`;
                x %= P.length;
            }, 250);

            setTimeout(() => {
                clearInterval(loader);
                final_answer.innerHTML = `<p class="guess_number">你所選的數字為：${value} 太小了! 請再猜一次<p/><p class="guess_number">你已猜過了：${playeranswer}<p/><p class="guess_number">剩餘次數：${gameRound}</p>`
                code = 'finish'
                checkLose();
            }, 5000);
        } else if (value > randomnumber1) {
            const loader = setInterval(() => {
                final_answer.innerHTML = `<p class="guess_number">你所選的數字為：${value} ${P[x++]}<p/><p class="guess_number">你已猜過了：${playeranswer}<p/><p class="guess_number">剩餘次數：${gameRound}</p>`;
                x %= P.length;
            }, 250);

            setTimeout(() => {
                clearInterval(loader);
                final_answer.innerHTML = `<p class="guess_number">你所選的數字為：${value} 太大了! 請再猜一次<p/><p class="guess_number">你已猜過了：${playeranswer}<p/><p class="guess_number">剩餘次數：${gameRound}</p>`
                code = 'finish'
                checkLose();
            }, 5000);
        }
    }
}

function checkLose() {
    if (gameRound == 0) {
        code = 'lose'
        final_answer.innerHTML = `<p class="guess_number">遊戲結束。你已用盡次數，正確的答案為 ${randomnumber1} <p/><p class="guess_number">你已猜過了：${playeranswer}<p/>`
    }
}