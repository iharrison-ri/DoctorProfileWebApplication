import React, { Component } from 'react';

import { Consumer } from '../store';
import { update } from '../util/methods.js';

import NavBtn from './NavBtn';

// actions
import {
    EDIT_NAME,
    ADD_DETAILS_ENTRY,
    REMOVE_DETAILS_ENTRY,
    EDIT_DROPDOWN,
    TOGGLE_NAME_EDITOR,
    TOGGLE_SLIDER
} from '../store/actions.js';

import BtnEditField from './BtnEditField';
import RangeSlider from './RangeSlider';

class Edit extends Component {
    state = {
        
    }

    render() {
        return (
        <Consumer>
            {value => {
                const { profiles, dispatch, profileEditId, linkInfo } = value;
                const { details, img } =  profiles[profileEditId];
                const detailsObjKeys = Object.keys(details);
                return (
                    <div className="flexCol">
                        <div className="navholder flexRow">
                            <NavBtn
                                link={linkInfo.save.url}
                                text={linkInfo.save.text} />
                            <NavBtn
                                link={linkInfo.profile.url}
                                text={linkInfo.profile.text} />
                        </div>
                        <div className="top flexRow">
                            <div  className="doctorImage">
                                <img src={img} alt="" />
                            </div>
                            <div className="topRightEdit flexCol">
                                <div className="topRightEditLiner">

                                    <div className="listGroupEdit">
                                    {detailsObjKeys.map((fieldName, index) => {
                                        const { value, isTextEdit, edit} = details[fieldName];
                                        if(isTextEdit){
                                            return (
                                                (edit) ? (<div className="editSection flexRow">
                                                    <BtnEditField
                                                        key={index}
                                                        data={index}
                                                        profileEditId={profileEditId}
                                                        id='nameField'
                                                        fieldName='name'
                                                        actionType={EDIT_NAME}
                                                        dispatch={dispatch}
                                                        fieldName='name'
                                                        icon='fas fa-plus'
                                                        btnColor='blue'
                                                        isInput={true}
                                                        placeHolder={value}
                                                        fieldName={fieldName} />
                                                </div>) : (<BtnEditField
                                                                    key={index}
                                                                    profileEditId={profileEditId}
                                                                    actionType={TOGGLE_NAME_EDITOR}
                                                                    dispatch={dispatch}
                                                                    icon='fas fa-pencil-alt'
                                                                    btnColor='blue'
                                                                    item={value}
                                                                    fieldName={fieldName} />)
                                            )
                                        }
                                    })}
                                    
                                </div>

                                {detailsObjKeys.map((fieldName, index) => {
                                    const { isList, hasSlider, name, options, value, sliderValues, showSlider, isTextEdit } = details[fieldName];
                                    if(isList === false && !isTextEdit){
                                        return (
                                        <div key={index} className="listGroupEdit">
                                            { (hasSlider === true && showSlider) ? <RangeSlider
                                                                                                            fieldName={fieldName}
                                                                                                            profileEditId={profileEditId}
                                                                                                            sliderValues={sliderValues} /> : null }
                                            <div className="oneLineInfoEdit">
                                                <p className="listHeadingEdit"> { name } </p>
                                                {
                                                    hasSlider ? (
                                                        <div className="pointer" >
                                                            <p
                                                                className="noMargins"
                                                                onClick={ hasSlider ? () => {
                                                                    dispatch({ type: TOGGLE_SLIDER, payload: { field: fieldName, index: profileEditId } })
                                                                } : null }
                                                            >{value} <i className="fas fa-exchange-alt rangeBtn"></i></p>
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
                                                <BtnEditField
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
                                                    <BtnEditField
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
                    </div>
                )
            }}
        </Consumer>
        );
    }
}

export default Edit;
