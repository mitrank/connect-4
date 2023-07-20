import { NO_PLAYER } from "./components/Constants";

export const isWinner = (gameBoard, id, currPlayer) => {
    const board = [...gameBoard];
    board[id] = currPlayer;
    const winLines = [
        [0, 1, 2, 3], 
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7 ,11, 15],
        [0, 5 , 10, 15],
        [3, 6, 9, 12]
    ];

    for (let i = 0; i < winLines.length; i++) {
        const [c1, c2, c3, c4] = winLines[i];
        if (board[c1] > 0 && 
            board[c1] === board[c2] &&
            board[c2] === board[c3] &&
            board[c3] === board[c4]) return true;
    }
    return false;
}

export const isDraw = (gameBoard, id, currPlayer) => {
    const board = [...gameBoard];
    board[id] = currPlayer;

    let count = board.reduce((acc, x) => acc + (x === 0), 0);
    return count === 0;
}

const getRandomComputerMove = (gameBoard) => {
    let validMoves = [];
    for (let i = 0; i < gameBoard.length; i++) {
        validMoves.push(i);
    }
    let randMove;
    do {
        randMove = Math.floor(Math.random() * validMoves.length);
    } while (gameBoard[randMove] !== NO_PLAYER);
    console.log(randMove);
    return randMove;
}

const getPosition = (gameBoard, moveChecks) => {
    for (let i = 0; i < moveChecks.length; i++) {
        for (let j = 0; j < moveChecks[i].max; j += moveChecks[i].step) {
            let series = gameBoard[j + moveChecks[i].indexes[0]].toString() +
                        gameBoard[j + moveChecks[i].indexes[1]].toString() +
                        gameBoard[j + moveChecks[i].indexes[2]].toString() + 
                        gameBoard[j + moveChecks[i].indexes[3]].toString();
            switch (series) {
                case "1110":
                case "2220":
                    return (j + moveChecks[i].indexes[3]);
                case "1101":
                case "2202":
                    return (j + moveChecks[i].indexes[2]);
                case "1011":
                case "2022":
                    return (j + moveChecks[i].indexes[1]);
                case "0111":
                case "0222":
                    return (j + moveChecks[i].indexes[0]);
                default:
            }
        }
    }
    return -1;
};

export const getComputerMove = (gameBoard) => {
    let moveChecks = [
        {// Vertical
            indexes: [0, 4, 8 , 12],
            max: 4,
            step: 1
        },
        {// Horizontal
            indexes: [0, 1, 2, 3],
            max: 16,
            step: 4
        },
        {// Diagonal 1
            indexes: [0, 5, 10, 15],
            max: 16,
            step: 16
        },
        {// Diagonal 2
            indexes: [3, 6 , 9, 12],
            max: 16,
            step: 16
        }
    ];
    let position = getPosition(gameBoard, moveChecks);
    if (position === -1) return getRandomComputerMove(gameBoard);
    return position;
}