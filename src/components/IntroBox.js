import React, {useState, useEffect} from 'react';

async function fetchPokemonData(id){
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if(!pokemon.ok) return "Error";
    const pokemonJson = await pokemon.json();
    return{
        name: pokemonJson.name,
        imgUrl: pokemonJson.sprites.other['official-artwork']['front_default'],
    };
}
const IntroBox = ({handlePlayer, handle}) =>{

    const [btnBackground, setBtnBackground] = useState([]); //sets a url

    const [name, setName] = useState(""); //sets the name

    const handleName = (e) =>{
        setName(prevState => e.target.value)
    }

        //creates a new Object
    const handleSubmit = (name, level) =>{
        console.log({"name": name, "level": level, "score": 0})
        handlePlayer(name, level)
        handle(prevState => !prevState);
    }

    useEffect(() => {
        async function getPokemon(pokemonNames){
            try{
                const newPokemons = await Promise.all(
                   pokemonNames.map((name) => fetchPokemonData(name))
                );
                setBtnBackground(newPokemons);
            } catch (error){
                console.error("Error fetching data:", error);
            }
        }
        const pokemonNames = ['pikachu', 'charizard', 'snorlax', 'mewtwo'];
        getPokemon(pokemonNames);
    },[])

    console.log(btnBackground);
    
    return(
        <>
            <div className="input-form">
                 <div className='grid-single-row'>
                        <label className='even-rows'>
                           <p>
                               Choose your name:
                           </p>
                            <input type="text" value={name} onChange={handleName}></input>
                        </label>
                    </div>  
                    <div className="btn-levels-group">
                        <div className='btn-level-container'>
                            <button className="btn-level"
                            style={{
                                backgroundImage: `url(${btnBackground[0]?.imgUrl})`,
                            }} onClick={() => handleSubmit(name, "")} disabled>Campaign</button>
                        </div>
                        <div className="btn-level-container">
                            <button className="btn-level" 
                            style={{
                                backgroundImage: `url(${btnBackground[1]?.imgUrl})`,
                            }}
                            onClick={() => handleSubmit(name, "easy")}>Easy</button>
                        </div>
                        <div className= "btn-level-container">
                            <button className="btn-level"
                            style={{
                                backgroundImage: `url(${btnBackground[2]?.imgUrl})`,
                            }} onClick={() => handleSubmit(name, "medium")}>Medium</button>
                        </div>
                        <div className= "btn-level-container">
                            <button className="btn-level" 
                                style={{
                                    backgroundImage: `url(${btnBackground[3]?.imgUrl})`,
                                }}
                                onClick={() => handleSubmit(name, "hard")}>Hard</button>
                        </div>
                    </div>
          

            
            </div>
        
        </>
    )
}

export default IntroBox;