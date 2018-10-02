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
                    return (
                        <React.Fragment>
                            <div className="navholder flexRow">
                                <NavBtn link={linkInfo.edit.url} text={linkInfo.edit.text}/>
                                <NavBtn link={linkInfo.search.url} text={linkInfo.search.text}/>
                            </div>
                            <ProfileTop profile={profiles[profileEditId]}/>
                            <ProfileBottom profile={profiles[profileEditId]}/>
                        </React.Fragment>
                    )
                }}
            </Consumer>
        );
    }
}

export default Profile;
