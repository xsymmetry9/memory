import React from "react";

const Button = ({setGameOver}) =>{
    const onHandle = () =>{
        setGameOver(prev => {
            prev = false;
        })
    }
    return(
        <>
            <button onClick={onHandle}>Start</button> 
        </>
    )

}

export default Button;