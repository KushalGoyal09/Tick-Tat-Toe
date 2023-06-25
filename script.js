const startBtn = document.getElementById("play")
const cells = document.querySelectorAll(".cell")
let cellHTML = []
const player1 = document.getElementById("player1")
const player2 = document.getElementById("player2")
const player1Heading = player1.querySelector(".secondary-heading")
const player2Heading = player2.querySelector(".secondary-heading")
const player1Score = player1.querySelector(".score")
const player2Score = player2.querySelector(".score")
let condition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
const winnerHeading = document.querySelector(".winner-heading")
const roundHeading = document.querySelector(".round-heading")
let round = 1

startBtn.addEventListener('click', () => {
    location.reload()
})

let p1Score = 0
let p2Score = 0
let player1Turn
let player2Turn

const resetTurn = () => {
    player1Turn = true
    player2Turn = false
}
resetTurn()

const manageTurn = () => {
    if (player1Turn === true) {
        player1Heading.style.color = "green"
        player2Heading.style.color = "red"
    } else if (player2Turn === true) {
        player2Heading.style.color = "green"
        player1Heading.style.color = "red"
    }
}

const manageRound = () => {
    if (round === 3) {
        manageWinner()
    } else {
        round++
        resetTurn()
        condition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    }
    roundHeading.textContent = `Round ${round}`
}

const clearBoard = () => {
    for (let index = 0; index < cells.length; index++) {
        cells[index].innerHTML = ""
    }
}

const handleClick = () => {
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.innerHTML) return
            if (player1Turn === true) {
                cell.innerHTML = `<i class="fa-regular fa-circle"></i>`
            } else if (player2Turn === true) {
                cell.innerHTML = `<i class="fa-solid fa-xmark"></i>`
            }
            player1Turn = !player1Turn
            player2Turn = !player2Turn
            manageTurn()
            manageScore()
            manageEnd()
        })
    })
}
handleClick()

const manageScore = () => {
    cellHTML = []
    cells.forEach(cell => {
        cellHTML.push(cell.innerHTML)
    })
    for (let index = 0; index < condition.length; index++) {
        const arr = condition[index];
        const e1 = arr[0]
        const e2 = arr[1]
        const e3 = arr[2]
        if (cellHTML[e1] === cellHTML[e2] && cellHTML[e2] === cellHTML[e3] && cellHTML[e3] !== "") {
            if (cellHTML[e1] === `<i class="fa-regular fa-circle"></i>`) {
                p1Score++
                showScore()
                clearBoard()
                manageRound()
                break
            } else if (cellHTML[e1] === `<i class="fa-solid fa-xmark"></i>`) {
                p2Score++
                showScore()
                clearBoard()
                manageRound()
                break
            }
            condition.splice(index, 1)
        }
    }
}

const showScore = () => {
    player1Score.textContent = p1Score
    player2Score.textContent = p2Score
}

const manageWinner = () => {
    if (p1Score === p2Score && p1Score === 0) {
        winnerHeading.textContent = `No one is Winner`
    } else if (p1Score === p2Score) {
        winnerHeading.textContent = `Its a Tie`
    } else if (p1Score > p2Score) {
        winnerHeading.innerHTML = `Player 1 &nbsp; Wins`
    } else if (p2Score > p1Score) {
        winnerHeading.innerHTML = `Player 2 &nbsp; Wins`
    }
    winnerHeading.style.display = "block"
    stop()
}

const manageEnd = () => {
    let end = 1
    cells.forEach(cell => {
        if (cell.innerHTML === "") {
            end = 0
        }
    })
    if (end) {
        clearBoard()
        manageRound()
    }
}

const stop = () => {
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            cell.innerHTML = ""
        })
    })
}

manageTurn()