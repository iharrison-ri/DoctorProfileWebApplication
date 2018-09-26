import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    DOCTOR_SELECTED
} from '../store/actions.js';

import { Consumer } from '../store';
import ProfileTop from './ProfileTop';

class Search extends Component {
    render() {
        return (
            <Consumer>
                {value => {
                    const { profiles, dispatch } = value;
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
                                    const style ={padding: "5px 20px"}
                                    const action ={
                                        type: DOCTOR_SELECTED,
                                        payload: profile.id
                                    }
                                    const selectDoctor = (e) => {
                                        dispatch(action)
                                    }
                                    return (
                                        <Link key={index} to={link} onClick={selectDoctor.bind(this)}>
                                            <ProfileTop profile={profile} addStlye={style} />
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
