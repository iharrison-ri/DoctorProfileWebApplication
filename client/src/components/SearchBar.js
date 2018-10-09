import React, {Component} from 'react';

import {Consumer} from '../store';
import {SEARCHED_PROFILES} from '../store/actions.js'
import {isMatchingString, getSearchValues, isInArray} from "../util/methods";

class SearchBar extends Component {
    state = {}
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        const search = (profiles, dispatch, e) => {
            setTimeout(() => {
                const matchingProfiles = [];
                const values = getSearchValues(this.state.search);
                values.forEach(word => {
                    profiles.forEach(data => {
                        const {id} = data;
                        const dataKeys = Object.keys(data.details);
                        dataKeys.forEach(key => {
                            if (matchingProfiles.includes(id)) {
                                return null
                            }
                            data.details[key].value = (typeof data.details[key].value === "number")
                                ? data
                                    .details[key]
                                    .value
                                    .toString()
                                : data.details[key].value;
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
            })
        }

        return (
            <Consumer>
                {value => {
                    const {profiles, dispatch} = value;
                    return (
                        <div
                            className="searchBar flexRow"
                            onKeyDown={search.bind(this, profiles, dispatch)}>
                            <input
                                name="search"
                                placeholder="search..."
                                value={this.state.search}
                                onChange={this.onChange}/>
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
