import React from "react";

const now = new Date();
const year = now.getFullYear();


const Footer = ({theme, player}) =>{
    const user = {"name": "xsymmetry", "project": "Odin Project", "year": year}
    const FooterUser = () =>{
        return(
            <ul key="footer">
                <li>© {user.year}</li>
                <li>{user.name}</li>
                <li>An {user.project}</li>
            </ul>
        )
    }

    const ScoreBoard = ({pName, pScore}) =>{
        return (
            
            <div className="score-board">
                <p className="left">{pName}</p>
                <p className="right player-score">Score: {pScore} </p>
            </div>  
            
        )
    }
    return(
        <>
            <footer className={`${theme === "light" ? "light-theme" : "dark-theme"}`}>
                <div className="container">
                    {player.isGameOver && <FooterUser/>}
                    {!(player.isGameOver) && <ScoreBoard pName = {player.name} pScore = {player.score}/>}
                </div>
            </footer>
            


        </>
    )
}

export default Footer;