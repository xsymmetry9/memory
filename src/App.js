import React, {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import IntroBox from './components/IntroBox';
import Header from './components/Header';
import Footer from './components/Footer';

const shuffledCards = (array) =>{
    let newArray = [];

    while(array.length > 0)
    {
        let index = Math.floor(Math.random() * array.length);
        newArray.push(array.splice(index, 1)[0]);
    }
    return newArray;
}
async function createPokemon(id){
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`);
    if(!pokemon.ok) return "Error";
    const pokemonJson = await pokemon.json();
    return{
        name: pokemonJson.name,
        imgUrl: pokemonJson.sprites.other['official-artwork']['front_default'],
        id: uuid(),
        clicked: false,
    };
}
const checkLevel = (item) => {
    if(item === "easy")
    {
        return 3;
    }
    else if(item ==="medium")
    {
        return 5;
    }
    else if(item === "hard")
    {
        return 10;
    } else{
        return alert("error");
    }
}


function App () {
    
    const Game = () =>{
        //Sets the background theme
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const [theme, setTheme] = useState(prefersDarkScheme.matches ? "dark" : "light");

        const body = document.querySelector("body");
        body.style.backgroundColor = `${theme === "dark" ? "var(--dark)" : "var(--light)"}`;

        const changeTheme = () => {
            setTheme(theme => theme === "dark" ? "light" : "dark");
        }

        //Creates a player
        const [introDisplay, setIntroDisplay] = useState(true);
        const [player, setPlayer] = useState({name: "Gary", level: "hard", score: 0})

        //game
        const [isGameOver, isSetGameOver] = useState(false);
        const [cards, setCards] = useState(Array.from({length: checkLevel(player.level)}, () => ({})));
        const [memory, setMemory] = useState([]);

        //high score box
        const [highScorer, setHighScorer] = useState({name:"", score: 0}); //could be set to local memory

        useEffect(() => {
            const fetchPokemon = async () => {
              try {
                const newCards = await Promise.all(
                  Array.from({ length: checkLevel(player.level) }, (_, index) => createPokemon(index + 1))
                );
                
                setCards(newCards);
              } catch (error) {
                console.error('Error fetching Pokemon data', error);
              }
            };
      
            fetchPokemon();
          }, [checkLevel(player.level)]);
     
        const clearMemory = () =>{
            setMemory(prevMemory => 
                {
                    while(prevMemory.length > 0){
                        prevMemory.pop();
                    }
                    return prevMemory;
                });
        }
        const reset = () =>{
            setPlayer({...player, score: 0})
            clearMemory();
            setCards(shuffledCards(cards));
            isSetGameOver(false);
        }
        const getInfo = (e) =>{
            const pokemonName = e.currentTarget.name;

            if(memory.includes(pokemonName))
            {
                console.log("you lose");
                checksHighScorer();
                isSetGameOver(true);
                // reset();
            } else {
                console.log("Phew...!")
                memory.push(e.currentTarget.name);
                setPlayer({...player, score: player.score + 1});
                if(memory.length === cards.length)
                {
                    console.log("You win!")
                    checksHighScorer();
                    isSetGameOver(true);
             
                } else {
                    setCards(shuffledCards(cards));
                }
            }

        };

        const createNewPlayer = (name, level) =>{
            setPlayer({...player, "name": name, "level": level});
        }

        const checksHighScorer = () =>{
            if(player.score > highScorer.score){
                console.log(player.name + player.score);
                setHighScorer({...highScorer, name: player.name, score: player.score})
            }
        }
        const handleMenu = () =>{
            reset();
            setIntroDisplay(prevState => !prevState);
        }

        return(
            <>
                <Header theme = {theme} highScorer = {highScorer} darkWhiteBtn = {changeTheme}/>
                <div className="gameContent">
                    
                </div>
                {introDisplay && <IntroBox player = {player} handlePlayer ={createNewPlayer} handle ={setIntroDisplay}/>}
                {!introDisplay && 
                
                <div className="game-display">
                    {!isGameOver && 
                        <>
                            <div className="display-cards">
                                {cards.map((item, index) =>{
                                    return(
                                    <button key ={index} className="cards" onClick={getInfo} name={item.name}>
                                        <img key={item.id} className="pokemon-card" src = {item.imgUrl} />
                                        <p className="pokemon-name" key={`${item.id}-text`}>{item.name}</p>
                                    </button>)
                                })}

                                </div>
                                <div className="score-board">
                                    <p className="left">{player.name}</p>
                                    <p className="right player-score">Score: {player.score}</p>
                                </div>           
                        </>            
                    }
                    {isGameOver && 
                        <div className="message-board">
                            <h2>{player.name}, your score is {player.score}</h2>
                            <div className="buttons-group">
                                <button id="again" onClick={reset}>Again?</button>
                                <button onClick= {handleMenu}>New Player</button>
                            </div>            
                        </div>}
                    </div>
                
                }
                <Footer theme ={theme}/>
            </>
        )
    }

 return <Game />

} 
export default App