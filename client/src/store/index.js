import React, { Component } from 'react';

import {
    EDIT_NAME,
    ADD_DETAILS_ENTRY,
    REMOVE_DETAILS_ENTRY,
    EDIT_DROPDOWN,
    TOGGLE_NAME_EDITOR,
    ADD_INPUT_REFERENCE
} from './actions.js';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case EDIT_NAME:
            const newProfiles = [...state.profiles];
            newProfiles[action.payload.id].name = action.payload.value.trim();
            return {
                ...state,
                editName: !state.editName,
                profiles: [
                    ...newProfiles
                ]
            }
        case TOGGLE_NAME_EDITOR:
            return {
                ...state,
                editName: !state.editName
            }
        case EDIT_DROPDOWN:
            const newProfiles1 = [...state.profiles];
            const keys = Object.keys(action.payload);
            newProfiles1[action.payload.id].details[keys[0]].value = action.payload[keys[0]];
            return {
                ...state,
                profiles: [
                    ...newProfiles1
                ]
            }
        case ADD_DETAILS_ENTRY:
            const newProfiles2 = { ...state.profiles };
            newProfiles2[action.payload.id].details[action.payload.ref].value.push(action.payload.value.trim());
            return {
                ...state,
                profiles: newProfiles2
            };
        case REMOVE_DETAILS_ENTRY:
            const newProfiles3 = { ...state.profiles };
            newProfiles3[action.payload.id].details[action.payload.ref].value = state.profiles[action.payload.id].details[action.payload.ref].value.filter(data => data !== action.payload.item);
            return {
                ...state,
                profiles: newProfiles3
            };
        case ADD_INPUT_REFERENCE:
            return {
                ...state,
                inputRefs: { ...state.inputRefs, ...action.payload }
            }
        default:
            return state
    }
}

export class Provider extends Component {

    state = {
        editName: false,
        inputRefs: {},
        profileEditId: 0,
        profiles: [
            {
                name: "Kris C. Dodson",
                id: 0,
                suffix: "MD",
                apmAbbrev: "CDOD",
                isPartner: true,
                dob: "3/11/1977",
                age: "41",
                officeLocations: [ "Center City", "Bryn Mawr" ],
                surgicalLocations: [ "Bryn Mawr Hospital", "Vincera Surgery Center", "Riverview Surgical Center", "Brynmawr Surgical Center" ],
                expertise: [ "AC Joint Seperation", "Achilles Tendon Rupture", "ACL", "Athletic Injuries", "Distal Bicep Tendon Tear/Rupture", "Distal Tricep Tear", "Elbow Epicondylitis", "Elbow Lateral Ligament Tear", "Exertional Compartment Syndrome", "Hamstring Tear/Rupture", "Loose Bodies", "Loose Bodies in Elbow", "Medial Meniscus Tear", "Patellar Fracture", "Pectoralis Major Rupture", "Quad Tear/Rupture", "Rotator Cuff Repair", "Shoulder Dislocation", "Shoulder Fracture", "Shoulder Impingement", "Shoulder Labrum Tear", "Tommy John Surgery", "Total Shoulder Replacement", ],
                details: {
                    patientAgeRange: {
                        name: 'Patient Age Range',
                        value: "12+",
                        isList: false
                    },
                    patientExceptions: {
                        name: 'Patient Exceptions',
                        value: [ "NO Tibial Plateau Fractures", "NO Patella Fractures", "NO Elbow Fractures", "NO Elbow Replacements", "NO Knee Replacements" ],
                        isList: true
                    },
                    workComp: {
                        name: 'Work Comp',
                        value: "Yes",
                        options: ["Yes", "No"],
                        isList: false
                    },
                    auto: {
                        name: 'Auto',
                        value: "Yes",
                        options: ["Yes", "No"],
                        isList: false
                    },
                    acuteInjuries: {
                        name: 'Acute Injuries',
                        value: "Yes",
                        options: ["Yes", "No"],
                        isList: false
                    }
                }
            }
        ],
        dispatch: (action) => this.setState(state => reducer(state, action))
    }

    render(){
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;