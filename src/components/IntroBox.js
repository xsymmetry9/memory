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
            <div className="level-container">
                <p>Choose your desired level:</p>
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
                                checked = {item.name.toLowerCase() === level}
                                onChange = {onHandleLevels}
                                />
                            <span className='level-items'>{item.name}</span>
                        </label>)
            })}
        
            </div>
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
                 <h1 className='title'>Memory Game</h1> 
                 <div className='grid-single-row'>
                        <label className='even-rows'>
                           <p>
                               Choose your name:
                           </p>
                            <input type="text" value={name} onChange={handleName}></input>
                        </label>
                        <Levels />
                    </div>  
                    <button onClick={() => handleSubmit(name, level)}>Enter</button>

            
            </div>
        
        </>
    )
}

export default IntroBox;