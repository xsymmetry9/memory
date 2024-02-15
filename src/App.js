import React, {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import MenuBox from './components/MenuBox';
import Header from './components/Header';
import Footer from './components/Footer';
import MessageBoard from "./components/MessageBoard";

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
    if(item === "campaign")
    {
        return 1;
    }
    else if(item === "easy")
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

const App = () => {
    
        //Sets the background theme
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        const [theme, setTheme] = useState(prefersDarkScheme.matches ? "dark" : "light");

        const body = document.querySelector("body");
        body.style.backgroundColor = `${theme === "dark" ? "var(--dark)" : "var(--light)"}`;

        const changeTheme = () => {
            setTheme(theme => theme === "dark" ? "light" : "dark");
        }

        //Creates a player
        const [player, setPlayer] = useState({name: "DEFAULT_NAME", mode: "hard", move: [], score: 0, isGameOver: true})

        const [introDisplay, setIntroDisplay] = useState(true);

        //game
        const [cards, setCards] = useState(Array.from({length: checkLevel(player.mode)}, () => ({})));

        //high score box
        const [history, setHistory] = useState([Array.from(10, () => ({name: '', score: 0}))]); //could be set to local memory
        const [message, setMessage] = useState("");

        useEffect(() => {
            const fetchPokemon = async () => {
              try {
                const newCards = await Promise.all(
                  Array.from({ length: checkLevel(player.mode) }, (_, index) => createPokemon(index + 1))
                );
                
                setCards(newCards);
              } catch (error) {
                console.error('Error fetching Pokemon data', error);
              }
            };
      
            fetchPokemon();
          }, [checkLevel(player.mode)]);

        const createNewPlayer = (name, mode) =>{
            setPlayer({...player, "name": name, "mode": mode, isGameOver: false});
        }
     
        const reset = () =>{
            setPlayer({...player, score: 0, isGameOver: false, move: []});
        }

        const playerMove = (e) =>{
            const pokemonName = e.currentTarget.name;
            // console.log(player);

            const isGameOver = () =>{
                setPlayer({...player, isGameOver: true})
            }

            if(!player.move.includes(pokemonName))
            {
                // memory.push(e.currentTarget.name);
                setPlayer({...player, move: player.move.push(pokemonName)});
                setPlayer({...player, score: player.score + 1})
                
                if(player.move.length !== cards.length)
                {
                    console.log("Choose another one!")
                    setCards(shuffledCards(cards));
             
                } else {
                    setMessage("You win!");
                    isGameOver();
                    setHistory(prevHistory => [...prevHistory, {name: player.name, score: player.move.length}]);
                    console.log(history);
                }
            } else {
                setMessage("Sorry, you lose.  Try again!");
                isGameOver(); 
                setHistory(prevHistory => [...prevHistory, {name: player.name, score: player.move.length}]);
                console.log(history);
                // checksHighScorer();

            }
        };

        const playAgainBtn = () =>{
            console.log("Resets");
            reset();
            // setCards(shuffledCards(cards));
        }
        console.log(player);

        const toMenuBtn = () =>{
            console.log("to menu")
            reset();
            setIntroDisplay(prevState => !prevState);
        }

        const getLength = () =>{
            const getWidthWindow = document.querySelector(".game-content");
            const length = getWidthWindow.offsetWidth/checkLevel(player.mode);

            if(length < 150 || length > 300)
            {
                return 200;
            } else{
                return length;
            }
        }

        const Card = ({item, playerMove}) =>{
            const length = getLength();
    
            return(
                <button className="cards" onClick={playerMove} name={item.name}>
                    <img key={item.id} width={`${length}`} className="pokemon-card" src = {item.imgUrl} />
                    <p className="pokemon-name" key={`${item.id}-text`}>{item.name}</p>
                </button>
            )
        }
        const Memory = () =>{
            return (
                <div className="game-container">
                    <div className="display-cards">
                        { cards.map((item, index) =>{
                            return(<Card key={index} item={item} playerMove={playerMove}/>)
                        })}
                    </div>
                </div>
            )
        }

        return(
            <>
                <Header theme = {theme} darkWhiteBtn = {changeTheme}/>
                <div className="game-content">
                    {introDisplay && <MenuBox player = {player} createPlayer ={createNewPlayer} handle ={setIntroDisplay}/>}

                    {!introDisplay && 
                        <>
                            {!player.isGameOver && <Memory />}
                            {player.isGameOver && <MessageBoard player = {player} message = {message} history = {history} toMenuBtn ={toMenuBtn} playAgainBtn={playAgainBtn}/>}
                        </>
                    }       
                </div>
   
                <Footer theme ={theme} player = {player}/>
            </>
        )
    }

export default App;