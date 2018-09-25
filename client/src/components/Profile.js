import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Consumer } from '../store';

import ProfileTop from './ProfileTop';
import ProfileBottom from './ProfileBottom';

class Profile extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const profileIndex = this.props.match.params.index;
                    const editLink = `/edit/${profileIndex}`;
                    return (
                        <div>
                            <div className="editProfileBtn flexRow">
                                <Link to={editLink}>
                                    <p>Edit Profile</p>
                                </Link>
                            </div>
                            <ProfileTop profile={value.profiles[profileIndex]} />
                            <ProfileBottom profile={value.profiles[profileIndex]} />
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default Profile;
