import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Consumer } from '../store';
import ProfileTop from './ProfileTop';

class Search extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const { profiles } = value;
                    return (
                        <div>
                            <div className="searchBar flexRow">
                                <div className="searchBtn flexRow">
                                    <i className="fas fa-search"></i>
                                </div>
                                <input />
                            </div>
                            <div className="searchProfile">
                                {profiles.map((profile, index) => {
                                    const link = `/profile/${profile.id}`;
                                    return (
                                        <Link key={index} to={link}>
                                            <ProfileTop profile={profile} />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default Search;
