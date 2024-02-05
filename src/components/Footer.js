import React from "react";

const now = new Date();
const year = now.getFullYear();


const Footer = ({theme}) =>{
    return(
        <>
            <footer className={`${theme === "light" ? "light-theme" : "dark-theme"}`}>
                <div className="container">
                    <ul>
                        <li>© {year}</li>
                        <li>Xsymmetry</li>
                        <li>An Odin Project</li>
                    </ul>
                
                </div>
            </footer>
        </>
    )
}

export default Footer;