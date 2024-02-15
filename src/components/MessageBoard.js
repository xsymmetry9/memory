import React from 'react';

const HighScoreBox = (props) =>{
    const {player, message, history, playAgainBtn, toMenuBtn} = props;

    const ButtonGroups = () =>{
        return(
            <div className='buttons-group'>
                <button className="messageBoard-buttons" id="again" onClick={playAgainBtn}>Again?</button>
                <button className="messageBoard-buttons" id="changeMode" onClick= {toMenuBtn}>Change Level</button>
            </div>
        )
    }

    const History = ({history}) =>{
        return(
            <div className='history-container'>
                <ol className='history-list'>
                    {history.map((item, index) =>{
                        return (
                            <li key={index} className='history-names'>
                                <p>{item.name}</p>
                                <p>{item.score}</p>
                            </li>
                        )
                    })}
                </ol>
            </div>
        )
    }
    return (
        <>
             <div className="message-board">
                <h1>{message}</h1>
                <h2>{player.name}, your score is {player.move.length}</h2>
                <History history = {history}/>
                <ButtonGroups />          
            </div>
        </>
    )
}

export default HighScoreBox;