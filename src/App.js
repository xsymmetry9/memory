import React, {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import ReactDOM from 'react-dom';
// import Timer from './components/Timer.js';
// import Button from './components/Button.js';

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


function App () {
    
    const Game = () =>{
        const [numberOfCards, setNumberOfCards] = useState(10);
        const [cards, setCards] = useState(Array.from({length: numberOfCards}, () => ({})));
        const [score, setScore] = useState(0);
        const [memory, setMemory] = useState([]);

        useEffect(() => {
            const fetchPokemon = async () => {
              try {
                const newCards = await Promise.all(
                  Array.from({ length: numberOfCards }, (_, index) => createPokemon(index + 1))
                );
                
                setCards(newCards);
              } catch (error) {
                console.error('Error fetching Pokemon data', error);
              }
            };
      
            fetchPokemon();
          }, [numberOfCards]);
     

        
        const getInfo = (e) =>{

            if(memory.includes(e.currentTarget.name))
            {
                alert("you lose");
                setScore(0);
                setCards(shuffledCards(cards));
            } else {
                memory.push(e.currentTarget.name);
                setScore(prevScore => prevScore + 1);
                setCards(shuffledCards(cards));
            }

        }
        const handleInputCards = (e) =>{
            setNumberOfCards(e.currentTarget.value);
        }


        return(
            <>
                <h1>Memory Game</h1>
                <label>Number of pokemon
                    <input onChange={handleInputCards} value = {numberOfCards} />
                </label>
                <p>Score: {score}</p>
                <div className="display-cards">
                    {cards.map((item, index) =>{
                        return(
                        <button key ={index} className="cards" onClick={getInfo} name={item.name}>
                            <img key={item.id} className="pokemon-card" src = {item.imgUrl} />
                            <p className="pokemon-name" key={`${item.id}-text`}>{item.name}</p>
                        </button>)
                    })}
           
                </div>
          
     
         
                {/* {!gameOver ? <Timer setGameOver = {setGameOver} /> : <Button setGameOver = {setGameOver}/>} */}
            </>
        )
    }

 return <Game />

} 
export default App