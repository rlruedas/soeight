import React, { useState, useEffect } from 'react'

export default function MenuModal() {
    const [width, setWidth] = useState();
    const [hovered, setHovered] = useState(false)


    useEffect(() => {
        window.addEventListener("resize", updateDimensions);

        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        document.getElementById("modalContainer").style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered])

    function updateDimensions() {
        setWidth(window.innerWidth);

    }
    if (width > 1080) {
        closeModal();
    }

    function closeModal() {
        let close = document.getElementById("modalContainer");
        close.style = "";

    }



    return (
        <div id="modalContainer" className="modal">
            <div className="modalContent" >
                <div
                    className="close"
                    id="closeButton"
                ><i onClick={() => closeModal()}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)} className="	fa fa-close"></i></div>
                <a>About</a>
                <a>Projects</a>
                <a>Contact</a>
                <a>Disclaimer</a>
            </div>
        </div>
    )
}

