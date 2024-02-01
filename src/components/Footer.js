import React from "react";

const now = new Date();
const year = now.getFullYear();


const Footer = () =>{
    return(
        <>
            <footer>
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