import React from "react";
import InfoButton from "../../InfoButton"
const TokenFormWrap = (props) => {
    return (
        <div className="token-form">
            <InfoButton info={props.helperText}/> 
            <h3>{props.title}</h3>
            {props.children}
        </div>
    )
};

export default TokenFormWrap;