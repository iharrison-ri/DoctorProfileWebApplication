import React, {Component} from 'react';

import {Consumer} from '../store';
import {SEARCHED_PROFILES} from '../store/actions.js'
import {isMatchingString, getSearchValues, isInArray} from "../util/methods";

class SearchBar extends Component {
    render() {

        const search = (profiles, dispatch, e) => {
            const matchingProfiles = [];
            const values = getSearchValues(e);
            values.forEach(word => {
                profiles.forEach(data => {
                    const {id} = data;
                    const dataKeys = Object.keys(data.details);
                    dataKeys.forEach(key => {
                        if (matchingProfiles.includes(id)) {
                            return null
                        }
                        const isString = (typeof data.details[key].value === "string");
                        const isMatch = (isString)
                            ? isMatchingString(data.details[key].value, word)
                            : isInArray(data.details[key].value, word);
                        if (isMatch) {
                            matchingProfiles.push(id);
                        }
                    })
                });
            })
            const matchedProfilesData = profiles.filter(profile => matchingProfiles.includes(profile.id));
            dispatch({type: SEARCHED_PROFILES, payload: matchedProfilesData})
        }

        return (
            <Consumer>
                {value => {
                    const {profiles, dispatch} = value;
                    return (
                        <div
                            className="searchBar flexRow"
                            onKeyPress={search.bind(this, profiles, dispatch)}>
                            <input placeholder="search..."/>
                            <div className="searchBtn flexRow">
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        );
    }
}

export default SearchBar;
