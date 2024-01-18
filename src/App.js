import React, {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import ReactDOM from 'react-dom';
// import Timer from './components/Timer.js';
// import Button from './components/Button.js';

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
        const [id, setId] = useState(100);
        const [numberOfCards, setNumberOfCards] = useState(10);
        const [cards, setCards] = useState(Array.from({length: numberOfCards}, () => ({})));

        useEffect(() => {
            const fetchPokemon = async () => {
              try {
                const newCards = await Promise.all(
                  Array.from({ length: numberOfCards }, (_, index) => createPokemon(id + index + 1))
                );
                setCards(newCards);
              } catch (error) {
                console.error('Error fetching Pokemon data', error);
              }
            };
      
            fetchPokemon();
          }, [id, numberOfCards]);

        const handleInputId = (e) =>{
            setId(e.currentTarget.value);
        }
        const handleInputCards = (e) =>{
            setNumberOfCards(e.currentTarget.value);
        }

        console.log(cards);


        return(
            <>
                <h1>Memory Game</h1>
                <label>Pokemon Id: 
                    <input onChange={handleInputId} value = {id}/>
                </label>
                <label>Number of pokemon
                    <input onChange={handleInputCards} value = {numberOfCards} />
                </label>
                <div className="display-cards">
                    {cards.map((item, index) =>{
                        return(
                        <div key ={item.id} className="cards">
                            <img className="pokemon-card" key={index} src = {item.imgUrl} />
                            <p>{item.name}</p>
                        </div>)
                    })}
           
                </div>
          
     
         
                {/* {!gameOver ? <Timer setGameOver = {setGameOver} /> : <Button setGameOver = {setGameOver}/>} */}
            </>
        )
    }

 return <Game />

} 
export default App