import React, { Component } from "react";

import "./index.css"

class InfoButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: "Placehold A really long sentence, hopefully it wraps, blah blah blah blah, something else this that and the other."
        };
    }

    componentDidMount = async () => {

    }

    render() {
        return (
            <div className="form-info-div" onClick={()=> {console.log("infobutton")}}>
                <span>?</span>
                <span class="tooltiptext">{this.state.info}</span>
            </div>
        );
    }
}



export default InfoButton;