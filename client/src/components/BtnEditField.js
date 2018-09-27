import React, { Component } from 'react';
import { update, btnClass } from '../util/methods.js';
import {
    ADD_DETAILS_ENTRY,
    ADD_INPUT_REFERENCE 
} from '../store/actions.js';

class BtnEditField extends Component {
    render(){
        // bring in the property varriables
        const { btnColor, icon, item, name, isInput, id, placeHolder, data } = this.props;
        return  (
            <div className='btnBox flexRow'>
                {/* this is the icon that displays */}
                <div onClick={update.bind(this, this.props)} className={ btnClass(btnColor) + " btn flexRow" }>
                    <div className="hoverColor fullSize"></div>
                    <p><i className={ icon }></i></p>
                </div>
                {/* display if there is an edit item next to a pencil icon */}
                { (item) ? (<span>{item}</span>) : null }
                {/* display if there is an edit item next to a plus icon */}
                { (isInput) ? (<input id={"input:" + data} name={name} className="editInput" type="text" defaultValue={ placeHolder ? placeHolder : "new entry" } />) : null }
            </div>
        )
    }
}

export default BtnEditField;