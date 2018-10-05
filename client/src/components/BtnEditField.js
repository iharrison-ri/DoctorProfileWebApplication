import React, {Component} from "react";
import {update, btnClass} from "../util/methods.js";

class BtnEditField extends Component {
    render() {
        // bring in the property varriables
        const {
            btnColor,
            icon,
            item,
            name,
            data
        } = this.props;

        const field = (item)
        ? <span>{item}</span>
        : <input
            id={"input:" + data}
            name={name}
            className="editInput"
            type="text"
            placeholder="new entry"/>

        return (
            <div className='btnBox flexRow'>
                <div
                    onClick={update.bind(this, this.props)}
                    className={btnClass(btnColor) + " btn flexRow shadowSmall activeBtn"}>
                    <div className="hoverColor fullSize"></div>
                    <p>
                        <i className={icon}></i>
                    </p>
                </div>

                {field}

            </div>
        )
    }
}

export default BtnEditField;