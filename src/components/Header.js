import React from "react";

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
    console.log(setBackground());
    return(
        <header className= {`${theme === "light" ? "light-theme" : "dark-theme"}`}>
            <HighScoreBox data = {highScorer} />
            <DarkAndWhiteBtn />
        </header>
    )

}

export default Header;