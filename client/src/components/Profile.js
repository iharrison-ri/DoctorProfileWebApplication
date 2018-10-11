import React, {Component} from 'react';

import {EDIT_PROFILE} from "../store/actions";

import {Consumer} from '../store';
import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';
import NavBtn from './NavBtn';

class Profile extends Component {
    render() {
        return (
            <Consumer>
                {value => {

                    const {profiles, linkInfo, profileEditId, dispatch} = value;
                    const currentProfile = profiles.filter(profile => profile.id === profileEditId);
                    const editProfileClick = () => {
                        dispatch({type: EDIT_PROFILE})
                    }

                    return (
                        <React.Fragment>
                            <div className="navholder flexRow">
                                <div onClick={editProfileClick}>
                                    <NavBtn link={linkInfo.edit.url} text={linkInfo.edit.text} navId={"edit"}/>
                                </div>
                                <div>
                                    <NavBtn
                                        link={linkInfo.search.url}
                                        text={linkInfo.search.text}
                                        navId={"search"}/>
                                </div>
                            </div>
                            <ProfileTop profile={currentProfile[0]}/>
                            <ProfileBottom profile={currentProfile[0]}/>
                        </React.Fragment>
                    )
                }}
            </Consumer>
        );
    }
}

export default Profile;
