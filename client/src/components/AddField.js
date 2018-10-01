import React, { Component } from 'react';

import {getAddHoverImg} from "../util/methods"

class AddField extends Component {
    state = {
        hoverImg: ""
    }
    render() {
        let img = "";
        const changeImg = (index) => {
            this.setState({
                hoverImg: getAddHoverImg(index)
            })
        }
        return (
            <div className="addField flexCol">
                <p>Choose a field to add</p>
                <div className="ChoiceBtnHolder flexRow">
                    <div className="fieldChoiceBtn shadow activeBtn" onMouseEnter = {changeImg.bind(this, 1)}>
                        <p>Dropdown</p>
                    </div>
                    <div className="fieldChoiceBtn shadow activeBtn" onMouseEnter = {changeImg.bind(this, 2)}>
                        <p>List</p>
                    </div>
                    <div className="fieldChoiceBtn shadow activeBtn" onMouseEnter = {changeImg.bind(this, 3)}>
                        <p>Range</p>
                    </div>
                    <div className="fieldChoiceBtn shadow activeBtn" onMouseEnter = {changeImg.bind(this, 4)}>
                        <p>Input</p>
                    </div>
                </div>
                <img src={process.env.PUBLIC_URL + this.state.hoverImg} alt=""/>
            </div>
        );
    }
}

export default AddField;
