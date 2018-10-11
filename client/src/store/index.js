import React, {Component} from 'react';

import {
    EDIT_NAME,
    ADD_DETAILS_ENTRY,
    REMOVE_DETAILS_ENTRY,
    EDIT_DROPDOWN,
    TOGGLE_NAME_EDITOR,
    SET_RANGE,
    TOGGLE_SLIDER,
    DOCTOR_SELECTED,
    SEARCHED_PROFILES,
    POPULATE_UI,
    EDIT_PROFILE,
    SAVE_PROFILE
} from './actions.js';

import {getIndex, getEditedFields} from "../util/methods";
import {saveProfile} from "../util/api";

const Context = React.createContext();

const reducer = (state, action) => {
    console.log(action.type)
    let newProfiles;
    let index;
    switch (action.type) {
        case POPULATE_UI:
            return {
                ...state,
                loadComplete: true,
                profiles: [...action.payload]
            }
        case EDIT_NAME:
            newProfiles = JSON.parse(JSON.stringify({...state.editingProfile}));
            newProfiles.details[action.payload.fieldName].value = action
                .payload
                .value
                .trim();
            const editedFields = getEditedFields(state.editingProfile, action);
            return {
                ...state,
                editingProfile: {
                    ...newProfiles,
                    editedFields: [...editedFields]
                }
            }
        case TOGGLE_NAME_EDITOR:
            newProfiles = {...state.editingProfile};
            newProfiles.details[action.payload].edit = !newProfiles.details[action.payload].edit;
            return {
                ...state,
                editingProfile: {...newProfiles}
            }
        case EDIT_DROPDOWN:
            newProfiles = [...state.profiles];
            const keys = Object.keys(action.payload);
            index = getIndex(newProfiles, state.profileEditId);
            newProfiles[index].details[keys[0]].value = action.payload[keys[0]];
            return {
                ...state,
                profiles: [...newProfiles]
            }
        case ADD_DETAILS_ENTRY:
            newProfiles = [...state.profiles];
            index = getIndex(newProfiles, state.profileEditId);
            newProfiles[index]
                .details[action.payload.ref]
                .value
                .unshift(action.payload.value.trim());
            return {
                ...state,
                profiles: [...newProfiles]
            }
        case REMOVE_DETAILS_ENTRY:
            newProfiles = [...state.profiles];
            index = getIndex(newProfiles, state.profileEditId);
            newProfiles[index].details[action.payload.ref].value = newProfiles[index]
                .details[action.payload.ref]
                .value
                .filter(data => data !== action.payload.item);
            return {
                ...state,
                profiles: [...newProfiles]
            }
        case SET_RANGE:
            newProfiles = [...state.profiles];
            index = getIndex(newProfiles, state.profileEditId);
            const {high, low} = action.payload;
            newProfiles[index].details[action.payload.field].sliderValues.low = action.payload.low;
            newProfiles[index].details[action.payload.field].sliderValues.high = action.payload.high;

            newProfiles[index].details[action.payload.field].value = (action.payload.low === action.payload.high)
                ? action.payload.low
                : ((high === 100 || high === "100") && (high !== low))
                    ? `${low}+`
                    : `${low} - ${high}`;
            return {
                ...state,
                profiles: [...newProfiles]
            }
        case TOGGLE_SLIDER:
            newProfiles = [...state.profiles];
            index = getIndex(newProfiles, state.profileEditId);
            const currentBool = newProfiles[action.payload.index].details[action.payload.field].showSlider;
            newProfiles[index].details[action.payload.field].showSlider = !currentBool;
            return {
                ...state,
                profiles: [...newProfiles]
            }
        case DOCTOR_SELECTED:
            return {
                ...state,
                profileEditId: action.payload
            }
        case SEARCHED_PROFILES:
            return {
                ...state,
                matchedProfilesData: action.payload
            }
        case EDIT_PROFILE:
            index = getIndex(state.profiles, state.profileEditId);
            return {
                ...state,
                editingProfile: {
                    ...state.profiles[index]
                }
            }
        case SAVE_PROFILE:
            newProfiles = [...state.profiles];
            index = getIndex(newProfiles, state.profileEditId)
            newProfiles[index] = {...state.editingProfile};
            saveProfile(state.editingProfile);
            return {
                ...state,
                editingProfile: {},
                profiles: [...newProfiles]
            }
        default:
            return state
    }
}

export class Provider extends Component {

    state = {
        loadComplete: false,
        inputRefs: {},
        profileEditId: 0,
        linkInfo: {
            save: {
                url: "/profile",
                text: "Save"
            },
            profile: {
                url: "/profile",
                text: "Back To Profile"
            },
            edit: {
                url: "/edit",
                text: "Edit Profile"
            },
            search: {
                url: "/",
                text: "Back To Search"
            }
        },
        profiles: [],
        editingProfile: {},
        dispatch: (action) => this.setState(state => reducer(state, action))
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;