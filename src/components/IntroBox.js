import React, {useState} from 'react';

const IntroBox = ({handlePlayer, handle}) =>{

    const [name, setName] = useState("Terry");
    const [level, setLevel] = useState("medium");

    const levels = [{name: "easy", value: 3}, {name: "medium", value: 5}, {name: "hard", value: 10}];

    const onHandleLevels = (e) =>{
        setLevel(e.currentTarget.value);
    }

    const Levels = () =>{
        return(
            <>
             {
                levels.map((item, index) => {
                    return(
                        <label key={index}>
                            <input
                                type="radio"
                                id={`radio-${index}`}
                                name= "level"
                                className="input-radio"
                                value= {item.name}
                                checked = {item.name === level}
                                onChange = {onHandleLevels}
                                />
                            {item.name}
                        </label>)
            })}
        
            </>
        )
    }
    
    const handleName = (e) =>{
        setName(prevState => e.target.value)
    }

        //creates a new Object
    const handleSubmit = (name, level) =>{
        console.log({"name": name, "level": level, "score": 0})
        handlePlayer(name, level)
        handle(prevState => !prevState);
    }
    
    return(
        <>
            <div className="input-form">
                 <h1>Memory Game</h1> 
                 <div className='grid-single-row'>
                        <label className='even-rows'>
                           <p>
                               Choose your name:
                           </p>
                            <input type="text" value={name} onChange={handleName}></input>
                        </label>
                        <Levels />
                        <button onClick={() => handleSubmit(name, level)}>Enter</button>
                    </div>  
            
            </div>
        
        </>
    )
}

export default IntroBox;