import React from "react";
import InfoButton from "../../InfoButton"
const TokenFormWrap = (props) => {
    return (
        <div className="token-form">
            <InfoButton info="s"/> 
            <h3>{props.title}</h3>
            {props.children}
        </div>
    )
};

export default TokenFormWrap;