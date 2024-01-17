import React, {useState} from 'react'
import Score from './components/Score.js'

function App () {
    const [score, setScore] = useState(0);

    setInterval(() =>{
        setScore(count => count + 1)
    }, 1000)
 return(
    <>
        <h1>Memory Game</h1>
        <p>score: {score}</p>
        <Score score={score}/>
    </>
 )
} 
export default App