import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//bring in axios to make requests
import axios from "axios";

import {DOCTOR_SELECTED, POPULATE_UI} from "../store/actions.js";
import {extractProfileData} from "../util/methods";

import {Consumer} from "../store";
import SearchBar from "./SearchBar";
import ProfileTop from "./ProfileTop";

class Search extends Component {
    componentDidMount() {
        //make call for all records in the DB
        axios
            .get("/allrecords")
            .then(data => {
                const appState = extractProfileData(data);
                this.globalDispatch({type: POPULATE_UI, payload: appState})
            })
    }

    globalDispatch;

    render() {

        // style to each doctor profile card that is only applied on the search screen
        // this is passed down as props to the ProfileTop component
        const style = {
            margin: "0 auto",
            width: "60em",
            padding: "1em 0",
            border: "none",
            transform: "scale(0.9)"
        }

        return (
            <Consumer>
                {value => {
                    const {profiles, dispatch, linkInfo, matchedProfilesData} = value;
                    const displayProfiles = (matchedProfilesData && matchedProfilesData.length > 0)
                        ? matchedProfilesData
                        : profiles;
                    this.globalDispatch = dispatch;
                    return (
                        <React.Fragment>

                            <SearchBar/>

                            <div className="searchProfile">
                                {displayProfiles.map((profile, index) => {

                                    const action = {
                                        type: DOCTOR_SELECTED,
                                        payload: profile.id
                                    }
                                    const selectDoctor = (e) => {
                                        dispatch(action)
                                    }
                                    return (
                                        <Link key={index} to={linkInfo.profile.url} onClick={selectDoctor.bind(this)}>
                                            <ProfileTop profile={profile} addStlye={style}/>
                                        </Link>
                                    )
                                })}
                            </div>
                        </React.Fragment>
                    )
                }}
            </Consumer>
        );
    }
}

export default Search;
