import React from "react";
import logoURL from "./images/pokeball.png"

const Header = ({theme, highScorer, darkWhiteBtn}) =>{
    const setBackground = () =>{
        return theme === "light" ? "light-theme" : "dark-theme";
    }

    const HighScoreBox = (data) =>{
        return(
            <div className={`highScore-container ${setBackground}`}>
                <p>Name: {data.name}</p>
                <p>HighScore: {data.score}</p>
            </div>
        )
    }
    const DarkAndWhiteBtn = () =>{
        return(
            <div className="darkWhiteToggleBtn">
                <button name="dark" onClick={darkWhiteBtn}>{theme === "dark" ? "Dark" : "Light"}</button>
            </div>
        )
    }
    return(
        <header className= {`${theme === "light" ? "light-theme" : "dark-theme"}`}>
            <div className="left">
                <a href="https://www.flaticon.com/free-icons/pokemon" title="pokemon icons"><img className= "logo" src={logoURL}/></a>
                <h1>Po-kery</h1>
            </div>
            <HighScoreBox data = {highScorer} />
            <DarkAndWhiteBtn />
        </header>
    )

}

export default Header;