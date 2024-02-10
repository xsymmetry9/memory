import React from "react";
import logoURL from "./images/pokeball.png"
import darkImg from "./images/night.png"
import lightImg from "./images/light.png"

const Header = ({theme, highScorer, darkWhiteBtn, isGameOver}) =>{
    const setBackground = () =>{
        return theme === "light" ? "light-theme" : "dark-theme";
    }

    const darkLightBtnImg = () =>{
        if(theme === "dark")
        {
            return darkImg;
        } else {
            return lightImg;
        }
    }
    // const HighScoreBox = (data) =>{
    //     return(
    //         <div className={`highScore-container ${setBackground} ${isGameOver ? "hidden" : ""}`}>
    //             <p>Name: {data.name}</p>
    //             <p>HighScore: {data.score}</p>
    //         </div>
    //     )
    // }
    const DarkAndWhiteBtn = () =>{
        return(
            <div className="darkWhiteToggle">
                <button 
                className= {`darkWhiteToggleBtn ${theme === "light" ? "light" : "dark"}`}
                name="dark" 
                onClick={darkWhiteBtn}>
                    <img src= {darkLightBtnImg()} alt="Dark/Light Button"/>
                </button>
            </div>
        )
    }
    return(
        <header className= {`${theme === "light" ? "light-theme" : "dark-theme"}`}>
            <div className="header-container">
                <div className="header-left">
                    <a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons"><img className= "logo" src={logoURL}/></a>
                    <h1 className="logo-title">Po-kery</h1>
                </div>
                <div className="right">
                    <DarkAndWhiteBtn />
                </div>
            </div>
       
        </header>
    )

}

export default Header;