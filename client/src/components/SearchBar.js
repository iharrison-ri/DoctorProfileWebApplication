import React, {Component} from 'react';
import {Consumer} from '../store';

import {SEARCHED_PROFILES} from '../store/actions.js'

class SearchBar extends Component {
    render() {
        const isMatchingString = (comparer, word) => {
            return comparer
                .toUpperCase()
                .includes(word.toUpperCase())
        }
        const isInArray = (comparer, word) => {
            let returnValue = false;
            comparer.map(data => {
                if (data.toUpperCase().includes(word.toUpperCase())) {
                    returnValue = true;
                }
            })
            return returnValue;
        }
        const search = (profiles, dispatch, e) => {
            const matchingProfiles = [];
            if (e.key === "Enter") {
                const values = e
                    .target
                    .value
                    .trim()
                    .split(" ")
                    .filter(data => data !== "");
                values.map(word => {
                    profiles.map(data => {
                        const {id} = data;
                        const dataDetailsKeys = Object.keys(data.details);
                        dataDetailsKeys.map(key => {
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
                
                dispatch({
                    type: SEARCHED_PROFILES,
                    payload: matchedProfilesData
                })
            }
        }
        return (
            <Consumer>
                {value => {
                    console.log(value)
                    const {profiles, dispatch} = value;
                    return (
                        <div className="searchBar flexRow" onKeyPress={search.bind(this, profiles, dispatch)}>
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
