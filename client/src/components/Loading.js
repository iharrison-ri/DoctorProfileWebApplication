import React, {Component} from 'react';
import {Consumer} from '../store';
//bring in axios to make requests
import axios from "axios";

import {POPULATE_UI} from "../store/actions.js";
import {extractProfileData, extractAllDatabaseData} from "../util/methods";

class Loading extends Component {
    state = {}

    componentDidMount() {
        //make call for all records in the DB
        axios
            .get("/allrecords")
            .then(data => {
                extractAllDatabaseData(data.data);
                const appState = extractProfileData(data.data);
                this.globalDispatch({type: POPULATE_UI, payload: appState});
            })
            .catch(err => {
                console.log(err);
                this.setState({hasLoadingErrors: true});
            });
    }

    globalDispatch;

    render() {
        return (
            <Consumer>
                {value => {
                    const {loadComplete, dispatch} = value;
                    this.globalDispatch = dispatch;
                    let right = true;

                    const goToPage = (page) => {
                        this
                            .props
                            .history
                            .push(`/${page}`);
                    }

                    const loading = setInterval(() => {
                        const loadingImg = document.getElementById("loadingImg");
                        if (loadingImg) {
                            loadingImg
                                .classList
                                .remove("rotateRight");
                            loadingImg
                                .classList
                                .remove("rotateLeft");
                            if (right) {
                                if (loadComplete) {
                                    clearInterval(loading);
                                    goToPage("search");
                                } else {
                                    loadingImg
                                        .classList
                                        .add("rotateRight");
                                }
                            } else {
                                if (loadComplete) {
                                    clearInterval(loading);
                                    goToPage("search");
                                } else {
                                    loadingImg
                                        .classList
                                        .add("rotateLeft");
                                }
                            }
                            right = !right;
                        } else {
                            clearInterval(loading);
                        }
                    }, 600);
                    return (
                        <div className="loading flexCol fullSize">
                            {(!this.state.hasLoadingErrors)
                                ? (
                                    <React.Fragment>
                                        <img id="loadingImg" src={process.env.PUBLIC_URL + "./img/rothmanLoading.png"}/>
                                        <p>loading...</p>
                                    </React.Fragment>
                                )
                                : (
                                    <React.Fragment>
                                        <i className="fas fa-exclamation errorIcon"></i>
                                        <p>Sorry Try Reloading The Page...</p>
                                    </React.Fragment>
                                )}
                        </div>
                    )
                }}
            </Consumer>

        );
    }
}

export default Loading;
