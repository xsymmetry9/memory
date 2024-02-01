import React from "react";

const Header = ({highScorer}) =>{

    const PlotHeader = (data) =>{
        return(
            <div className="highScore-container">
                <p>Name: {data.name}</p>
                <p>HighScore: {data.score}</p>
            </div>
        )
    }
    return(
        <header>
            <PlotHeader data = {highScorer} />
        </header>
    )

}

export default Header;