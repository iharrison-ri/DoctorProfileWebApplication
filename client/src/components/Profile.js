import React, {Component} from 'react';

import {Consumer} from '../store';
import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';
import NavBtn from './NavBtn';

class Profile extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const {profiles, linkInfo, profileEditId} = value;
                    const currentProfile = profiles.filter(profile => profile.id === profileEditId);
                    return (
                        <React.Fragment>
                            <div className="navholder flexRow">
                                <NavBtn link={linkInfo.edit.url} text={linkInfo.edit.text}/>
                                <NavBtn link={linkInfo.search.url} text={linkInfo.search.text}/>
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
