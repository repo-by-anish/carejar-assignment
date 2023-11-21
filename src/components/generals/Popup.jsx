import React from "react"
const Popup = ({message, response, setOpenPopup, path}) => {
    return (
        <div className="popup_illusion">
            <div className="popup">
                <span onClick={()=>setOpenPopup(false)} className="close">
                    &times; 
                </span>
                <span className="message">
                    {message}
                </span>
                <img src={response===200?`${path}logo/success.svg`:`${path}logo/failure.svg`} alt="Icon" />
            </div>
        </div>
    )
}

export default Popup