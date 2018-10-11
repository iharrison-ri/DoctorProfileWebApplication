import React, {Component} from 'react';

import {Consumer} from '../store';
import NavBtn from './NavBtn';
import BtnEditField from './BtnEditField';
import ProfileImg from './ProfileImg';
import Heading from './Heading';

import {goToLoadingScreen, getKey} from "../util/methods";
import {SAVE_PROFILE} from '../store/actions';

// actions
import {EDIT_NAME, ADD_DETAILS_ENTRY, REMOVE_DETAILS_ENTRY, TOGGLE_NAME_EDITOR} from '../store/actions.js';

class Edit extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    (value.profiles.length === 0)
                        ? goToLoadingScreen()
                        : null;

                    const {dispatch, profileEditId, linkInfo, editingProfile} = value;
                    const {details, img} = editingProfile;
                    const detailsObjKeys = Object.keys(details);
                    const pecilEditFields = detailsObjKeys.filter(data => details[data].isTextEdit && data !== "age");
                    const listEditFields = detailsObjKeys.filter(data => details[data].isList);
                    const saveProfileClick = () => {
                        dispatch({type: SAVE_PROFILE})
                    }

                    return (
                        <div className="flexCol">

                            <div className="navholder flexRow">
                                <div onClick={saveProfileClick}>
                                    <NavBtn link={linkInfo.save.url} text={linkInfo.save.text}/>
                                </div>
                                <div>
                                    <NavBtn link={linkInfo.profile.url} text={linkInfo.profile.text}/>
                                </div>
                            </div>

                            <div className="top flexRow">

                                <div className="flexCol">
                                    <ProfileImg img={img}/>
                                </div>

                                <div className="topRightEdit flexCol">

                                    <div className="topRightEditLiner">

                                        <div className="listGroupEdit">
                                            {pecilEditFields.map((fieldName, index) => {
                                                const {value, edit} = details[fieldName];

                                                const plusBtnField = (
                                                    <div key={getKey()} className="editSection flexRow">
                                                        <BtnEditField
                                                            key={getKey()}
                                                            data={index}
                                                            profileEditId={profileEditId}
                                                            id='nameField'
                                                            actionType={EDIT_NAME}
                                                            dispatch={dispatch}
                                                            icon='fas fa-plus'
                                                            btnColor='blue'
                                                            isInput={true}
                                                            placeholder={value}
                                                            fieldName={fieldName}/>
                                                    </div>
                                                );

                                                const pencilBtnField = (<BtnEditField
                                                    key={getKey()}
                                                    profileEditId={profileEditId}
                                                    actionType={TOGGLE_NAME_EDITOR}
                                                    dispatch={dispatch}
                                                    icon='fas fa-pencil-alt'
                                                    btnColor='blue'
                                                    item={value}
                                                    fieldName={fieldName}/>);

                                                return (
                                                    <React.Fragment key={getKey()}>
                                                        <Heading key={getKey()} heading={details[fieldName].name}/> {edit
                                                            ? plusBtnField
                                                            : pencilBtnField}
                                                    </React.Fragment>
                                                )
                                            })}

                                        </div>
                                        {/* end: listGroupEdit */}

                                        <div className="listGroupEdit">
                                            {listEditFields.map((fieldName, index) => {

                                                const inputField = (
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
                                                )

                                                const listFields = (
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
                                                                key={getKey()}
                                                                icon='fas fa-minus'
                                                                btnColor='red'
                                                                item={value}/>))}
                                                    </div>
                                                )

                                                return (
                                                    <React.Fragment key={getKey()}>
                                                        <Heading heading={details[fieldName].name}/>
                                                        <div>
                                                            {inputField}
                                                            {listFields}
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </div>
                                        {/* end: listGroupEdit */}

                                    </div>
                                    {/* end: topRightEditLiner */}

                                </div>
                                {/* end: topRightEdit */}

                            </div>
                            {/* end: top */}

                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default Edit;