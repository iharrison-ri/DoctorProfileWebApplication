import React, { Component } from 'react';
import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';

class Profile extends Component {
    render() {
        return (
            <div>
                <ProfileTop />
                <ProfileBottom />
            </div>
        );
    }
}

export default Profile;
