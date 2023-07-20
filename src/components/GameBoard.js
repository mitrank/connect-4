import { React, useEffect, useState} from "react";
import GameCircle from "./GameCircle";
import '../Game.css';
import Header from "./Header";
import Footer from "./Footer";
import { getComputerMove, isDraw, isWinner } from "../helper";
import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN, NO_PLAYER, PLAYER_1, PLAYER_2, noOfCircles } from "./Constants";

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(noOfCircles).fill(NO_PLAYER));
    const [currPlayer, setCurrPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER);

    useEffect(() => {
        console.log('init game');
        initGame();
    }, [])

    const initGame = () => {
        setGameBoard(Array(noOfCircles).fill(NO_PLAYER));
        setCurrPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
    }

    const initBoard = () => {
        const circles = [];
        for (let i = 0; i < noOfCircles; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    }

    const suggestMove = () => {
        circleClick(getComputerMove(gameBoard));
    }

    const circleClick = (id) => {
        if (gameBoard[id] !== NO_PLAYER) return;

        if (gameState !== GAME_STATE_PLAYING) return;

        if (isWinner(gameBoard, id, currPlayer)) {
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currPlayer);
        }
        if (isDraw(gameBoard, id, currPlayer)) {
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }

        setGameBoard(prev => {
            return prev.map((circle, posInArray) => {
                if (posInArray === id) return currPlayer;
                else return circle;
            })
        })
        setCurrPlayer(currPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    }

    const renderCircle = (id) => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClick={circleClick} />
    }

    return (
        <>
        <Header currPlayer={currPlayer} winPlayer={winPlayer} gameState={gameState} />
        <div className="gameBoard">
            {initBoard()}
        </div>
        <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState} />
        </>
    )
}

export default GameBoard;