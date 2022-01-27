import React, { useState, useEffect } from 'react'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';

import MenuModal from './menumodal'


export default function Homepage(props) {
    const [hovered, setHovered] = useState();

    useEffect(() => {
        document.getElementById("burgMenu").style.cursor = hovered ? "Pointer" : "Auto";


    }, [hovered])


    function ShowModal() {
        let modalID = document.getElementById("modalContainer");
        modalID.style.display = "block";
        modalID.style.transform = "translateX(0em)";
    }


    return (
        <>
            <div className="header" >
                <Fade left cascade opposite >
                    <div className="logo">
                        <a href="/" > <img src="./images/apc_rams_logo.png" alt="image was here"></img></a>
                    </div>
                </Fade>
                <Fade right cascade >
                    <div className="menu" >
                        <a href="/view/about" >ABOUT</a>
                        <a href="/view/projects">PROJECTS</a>
                        <a className="burgerMenu" id="burgMenu" onClick={() => ShowModal()} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>
                </Fade>
            </div>
            <Zoom>
                <span className="bgtext" >SCHOOL<br />OF<br />ENGINEERING</span>
            </Zoom>
            <div className="footer">

                <Fade left cascade >
                    <div className="socialMedia" >
                        <a href="https://www.facebook.com/asiapacificcollege.edu" ><i className="fa fa-facebook"></i></a>
                        <a href="https://www.apc.edu.ph/programs/school-of-engineering/" ><i className="fa fa-external-link"></i></a>
                    </div>
                </Fade>
                <Fade bottom>
                    <div className="credits" >
                        <span>Reister Ruedas © 2021 </span>
                    </div>
                </Fade>
                <Fade right cascade>
                    <div className="contactDetails" >

                        <a></a>
                        <a>email</a>
                        <a>disclaimer</a>
                    </div>
                </Fade>

            </div>
            <MenuModal />
        </>
    )
}




