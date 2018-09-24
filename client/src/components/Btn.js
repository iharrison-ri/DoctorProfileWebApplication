import React, { Component } from 'react';
import { update, btnClass } from '../util/methods.js';
import {
    ADD_DETAILS_ENTRY,
    ADD_INPUT_REFERENCE 
} from '../store/actions.js';

class Btn extends Component {
    // componentDidMount(){
    //     const hasInputRef = (Object.keys(this.inputRef).length > 0);
    //     if(hasInputRef){
    //         update({ actionType: ADD_INPUT_REFERENCE, payload: this.inputRef, dispatch: this.props.dispatch })
    //     }
    // }
    // inputRef = {}
    render(){
        const { btnColor, btnColor2, icon, icon2, item, name, isInput, id, placeHolder, index } = this.props;
        // if(this.props.actionType === ADD_DETAILS_ENTRY){
        //     this.inputRef[name] = name;
        // }
        return  (
            <div className='btnBox flexRow'>
                <div onClick={update.bind(this, this.props)} className={ btnClass(btnColor) + " btn flexRow" }>
                    <div className="hoverColor fullSize"></div>
                    <p><i className={ icon }></i></p>
                </div>
                { (icon2) ? (
                    <div className={ btnClass(btnColor2) + " btn flexRow" }>
                        <div className="hoverColor fullSize"></div>
                        <p><i className={ icon2 }></i></p>
                    </div>
                ) : null }
                { (item) ? (<span>{item}</span>) : null }
                { (isInput) ? (<input name={name} id={id} className="editInput" type="text" defaultValue={ placeHolder ? placeHolder : "new entry" } />) : null }
            </div>
        )
    }
}

export default Btn;