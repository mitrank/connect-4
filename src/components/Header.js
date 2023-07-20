import React from 'react'
import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN } from './Constants';

const Header = ({currPlayer, winPlayer, gameState}) => {
  const renderLabel = () => {
    switch (gameState) {
        case GAME_STATE_PLAYING:
            return <div>Player {currPlayer} Turn</div>
        case GAME_STATE_WIN:
            return <div>Player {winPlayer} Wins!</div>
        case GAME_STATE_DRAW:
            return <div>Game is a DRAW!</div>
        default:
    }
  }
  return (
    <div className='panel header'>
        <div className='header-text'>
            {renderLabel()}
        </div>
    </div>
  )
}

export default Header;