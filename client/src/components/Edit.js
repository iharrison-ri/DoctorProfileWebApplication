import React, {Component} from 'react';

import {Consumer} from '../store';
import NavBtn from './NavBtn';
import BtnEditField from './BtnEditField';
import RangeSlider from './RangeSlider';
import ProfileImg from './ProfileImg';
import AddNewFieldBtn from './AddNewFieldBtn';
import AddField from './AddField';

import {update} from '../util/methods.js';

// actions
import {
    EDIT_NAME,
    ADD_DETAILS_ENTRY,
    REMOVE_DETAILS_ENTRY,
    EDIT_DROPDOWN,
    TOGGLE_NAME_EDITOR,
    TOGGLE_SLIDER
} from '../store/actions.js';

class Edit extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const {profiles, dispatch, profileEditId, linkInfo} = value;
                    const {details, img} = profiles[profileEditId];
                    const detailsObjKeys = Object.keys(details);
                    const pecilEditFields = detailsObjKeys.filter(data => details[data].isTextEdit);
                    const sliderEditFields = detailsObjKeys.filter(data => !details[data].isList && !details[data].isTextEdit && details[data].hasSlider);
                    const dropDownEditFields = detailsObjKeys.filter(data => !details[data].isList && !details[data].isTextEdit && !details[data].hasSlider);
                    const listEditFields = detailsObjKeys.filter(data => details[data].isList);
                    return (
                        <div className="flexCol">

                            <div className="navholder flexRow">
                                <NavBtn link={linkInfo.save.url} text={linkInfo.save.text}/>
                                <NavBtn link={linkInfo.profile.url} text={linkInfo.profile.text}/>
                            </div>

                            <div className="top flexRow">

                                <div className="flexCol">
                                    <ProfileImg img={img}/>
                                    <AddNewFieldBtn />
                                </div>

                                <div className="topRightEdit flexCol">
                                    <div className="topRightEditLiner">

                                        <div className="listGroupEdit">
                                            {pecilEditFields.map((fieldName, index) => {
                                                const {value, edit} = details[fieldName];
                                                return ((edit)
                                                    ? (
                                                        <div key={index} className="editSection flexRow">
                                                            <BtnEditField
                                                                key={index}
                                                                data={index}
                                                                profileEditId={profileEditId}
                                                                id='nameField'
                                                                actionType={EDIT_NAME}
                                                                dispatch={dispatch}
                                                                icon='fas fa-plus'
                                                                btnColor='blue'
                                                                isInput={true}
                                                                placeHolder={value}
                                                                fieldName={fieldName}/>
                                                        </div>
                                                    )
                                                    : (<BtnEditField
                                                        key={index}
                                                        profileEditId={profileEditId}
                                                        actionType={TOGGLE_NAME_EDITOR}
                                                        dispatch={dispatch}
                                                        icon='fas fa-pencil-alt'
                                                        btnColor='blue'
                                                        item={value}
                                                        fieldName={fieldName}/>))
                                            })}

                                        </div>

                                        <div className="listGroupEdit">
                                            {sliderEditFields.map((fieldName, index) => {
                                                const {hasSlider, name, value, sliderValues, showSlider} = details[fieldName];
                                                return (
                                                    <div key={index} className="listGroupEdit">

                                                        {(hasSlider === true && showSlider)
                                                            ? <RangeSlider
                                                                    fieldName={fieldName}
                                                                    profileEditId={profileEditId}
                                                                    sliderValues={sliderValues}/>
                                                            : null}

                                                        <div className="oneLineInfoEdit">

                                                            <p className="listHeadingEdit">
                                                                {name}
                                                            </p>

                                                            <div className="pointer">
                                                                <p
                                                                    className="noMargins"
                                                                    onClick={() => {
                                                                    dispatch({
                                                                        type: TOGGLE_SLIDER,
                                                                        payload: {
                                                                            field: fieldName,
                                                                            index: profileEditId
                                                                        }
                                                                    })
                                                                }}>{value}
                                                                    <i className="fas fa-exchange-alt rangeBtn"></i>
                                                                </p>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className="listGroupEdit">
                                            {dropDownEditFields.map((fieldName, index) => {
                                                const {name, options} = details[fieldName];
                                                return (
                                                    <div key={index} className="listGroupEdit">

                                                        <div className="oneLineInfoEdit">
                                                            <p className="listHeadingEdit">
                                                                {name}
                                                            </p>

                                                            <select
                                                                onBlur={update.bind(this, {
                                                                actionType: EDIT_DROPDOWN,
                                                                dispatch,
                                                                fieldName,
                                                                profileEditId
                                                            })}
                                                                className="selectBox"
                                                                name=""
                                                                id="">
                                                                {options.map((fieldOption, i) => (
                                                                    <option key={i} value="">
                                                                        {fieldOption}
                                                                    </option>
                                                                ))}
                                                            </select>

                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div className="listGroupEdit">
                                            {listEditFields.map((fieldName, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <div className="listHeadingEdit flexRow">
                                                            <div>
                                                                {details[fieldName].name}
                                                            </div>
                                                        </div>
                                                        <div className="editSection flexRow">
                                                            <BtnEditField
                                                                profileEditId={profileEditId}
                                                                actionType={ADD_DETAILS_ENTRY}
                                                                dispatch={dispatch}
                                                                name={fieldName}
                                                                icon='fas fa-plus'
                                                                btnColor='blue'
                                                                isInput={true}/>
                                                        </div>
                                                        <div className="listGroupEditChildren">
                                                            {details[fieldName]
                                                                .value
                                                                .map((value, i) => (<BtnEditField
                                                                    profileEditId={profileEditId}
                                                                    actionType={REMOVE_DETAILS_ENTRY}
                                                                    dispatch={dispatch}
                                                                    index={index}
                                                                    reference={fieldName}
                                                                    detailsName={details[fieldName].name}
                                                                    key={i}
                                                                    icon='fas fa-minus'
                                                                    btnColor='red'
                                                                    item={value}/>))}
                                                        </div>
                                                    </React.Fragment>
                                                )

                                            })}
                                        </div>

                                    </div>
                                    <AddField />
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
