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
const IntroBox = ({player, createPlayer, handle}) =>{

    const [btnBackground, setBtnBackground] = useState([]); //sets a url
    const [display, setDisplay] = useState(false);
    const [name, setName] = useState(`${player.name}`); //sets the name

    const handleName = (e) =>{
        setName(e.target.value)
    }
        //creates a new Object
    const handleSubmit = (name, level) =>{
        createPlayer(name, level)
        handle(prevState => !prevState);
        // console.log({pName: name, pLevel: level});
    }

    useEffect(() => {
        const showMenu = setInterval(() => {
            setDisplay(true)
        }, 3000);

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

        return () =>{
            clearInterval(showMenu);
        };
    },[])

    const CustomLoader = () => <div className='custom-loader'></div>;
    
    return(
        <>
            {!display && <CustomLoader />}
            {display && 
            
            <div className="input-form">
            <div className='input-form-row'>
                <label className='name-input'>
                    <input type="text" value={name} onChange={handleName} placeholder='PLAYERS_NAME'></input>
                </label>
            </div>  
            <div className="input-form-row btn-levels-group">
                <div className='btn-level-container'>
                    <button className="btn-level"
                        style={{
                            backgroundImage: `url(${btnBackground[0].imgUrl})`,
                        }} onClick={() => handleSubmit(name, "campaign")}
                        >Campaign
                    </button>
                </div>
                <div className="btn-level-container">
                    <button className="btn-level" 
                        style={{
                            backgroundImage: `url(${btnBackground[1].imgUrl})`,
                        }}
                        onClick={() => handleSubmit(name, "easy")}>Easy</button>
                </div>
                <div className= "btn-level-container">
                    <button className="btn-level"
                        style={{
                            backgroundImage: `url(${btnBackground[2].imgUrl})`,
                        }} onClick={() => handleSubmit(name, "medium")}>Medium</button>
                </div>
                <div className= "btn-level-container">
                    <button className="btn-level" 
                        style={{
                            backgroundImage: `url(${btnBackground[3].imgUrl})`,
                            }}
                            onClick={() => handleSubmit(name, "hard")}>Hard</button>
                </div>
            </div>
        </div>
            }
         
        </>
    )
}

export default IntroBox;