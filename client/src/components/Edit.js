import React, { Component } from 'react';

import { Consumer } from '../store';
import { update } from '../util/methods.js';

// actions
import {
    EDIT_NAME,
    ADD_DETAILS_ENTRY,
    REMOVE_DETAILS_ENTRY,
    EDIT_DROPDOWN,
    TOGGLE_NAME_EDITOR,
    TOGGLE_SLIDER
} from '../store/actions.js';

import Btn from './Btn';
import RangeSlider from './RangeSlider';

class Edit extends Component {
    state = {
        
    }

    render() {
        return (
        <Consumer>
            {value => {
                const { profiles, dispatch, editName, profileEditId } = value;
                const { name, details } =  profiles[profileEditId];
                const detailsObjKeys = Object.keys(details);
                return (
                    <div className="top flexRow">
                        <div className="doctorImage">
                            <img src="./img/doctor.png" alt="" />
                        </div>
                        <div className="topRightEdit flexCol">
                            <div className="topRightEditLiner">

                                <div className="listGroupEdit">
                                {(editName) ? (<div className="editSection flexRow">
                                        <Btn
                                            profileEditId={profileEditId}
                                            id='nameField'
                                            fieldName='name'
                                            actionType={EDIT_NAME}
                                            dispatch={dispatch}
                                            fieldName='name'
                                            icon='fas fa-plus'
                                            btnColor='blue'
                                            isInput={true}
                                            placeHolder={name} />
                                    </div>) : (<Btn
                                                        profileEditId={profileEditId}
                                                        actionType={TOGGLE_NAME_EDITOR}
                                                        dispatch={dispatch}
                                                        icon='fas fa-pencil-alt'
                                                        btnColor='blue'
                                                        item={name} />)
                                }
                                
                            </div>

                            {detailsObjKeys.map((fieldName, index) => {
                                const { isList, hasSlider, name, options, value, sliderValues, showSlider } = details[fieldName];
                                if(isList === false){
                                    return (
                                    <div key={index} className="listGroupEdit">
                                        { (hasSlider === true && showSlider) ? <RangeSlider fieldName={fieldName} profileEditId={profileEditId} sliderValues={sliderValues} /> : null }
                                        <div className="oneLineInfoEdit">
                                            <p className="listHeadingEdit"> { name } </p>
                                            {
                                                hasSlider ? (
                                                    <div className="pointer" >
                                                        <p
                                                            onClick={ hasSlider ? () => {
                                                                dispatch({ type: TOGGLE_SLIDER, payload: { field: fieldName, index: profileEditId } })
                                                            } : null }
                                                        >{value} <i className="fas fa-angle-down"></i></p>
                                                    </div>
                                                ) : (
                                                    <select
                                                        onBlur={update.bind(this, {actionType: EDIT_DROPDOWN, dispatch, fieldName, profileEditId })}
                                                        className="selectBox"
                                                        name=""
                                                        id="">
                                                        {(options) ? (
                                                            options.map((fieldOption, i) => (<option key={i} value=""> { fieldOption } </option>))
                                                        ) :  (
                                                            <option> {value } </option>
                                                        )}
                                                    </select>
                                                )
                                            }
                                        </div>
                                    </div>
                                    )
                                }
                                return null
                            })}

                            {detailsObjKeys.map((fieldName, index) => {
                                if(details[fieldName].isList !== false){
                                    return (
                                    <div key={index} className="listGroupEdit">
                                        <div className="listHeadingEdit flexRow">
                                            <div> { details[fieldName].name } </div>
                                        </div>
                                        <div className="editSection flexRow">
                                            <Btn
                                                profileEditId={profileEditId}
                                                actionType={ADD_DETAILS_ENTRY}
                                                dispatch={dispatch}
                                                name={fieldName}
                                                icon='fas fa-plus'
                                                btnColor='blue'
                                                isInput={true} />
                                        </div>
                                        <div className="listGroupEditChildren">
                                            {details[fieldName].value.map((value, i) => (
                                                <Btn
                                                    profileEditId={profileEditId}
                                                    actionType={REMOVE_DETAILS_ENTRY}
                                                    dispatch={dispatch}
                                                    index={index}
                                                    reference={fieldName}
                                                    detailsName={details[fieldName].name}
                                                    key={i} icon='fas fa-minus'
                                                    btnColor='red'
                                                    item={value} />
                                                )
                                            )}
                                        </div>
                                    </div>
                                    )
                                }
                                return null
                            })}

                            </div>
                        </div>
                    </div>
                )
            }}
        </Consumer>
        );
    }
}

export default Edit;
