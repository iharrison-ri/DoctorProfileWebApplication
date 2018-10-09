import React, {Component} from "react";
import {capitalizeFirstLetter} from "../util/methods";

class Heading extends Component {
    render() {
        return (
            <div className="listHeadingEdit flexRow">
                <div>
                    {capitalizeFirstLetter(this.props.heading)}
                </div>
            </div>
        );
    }
}

export default Heading;
