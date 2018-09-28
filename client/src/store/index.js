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
    SEARCHED_PROFILES
} from './actions.js';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case EDIT_NAME:
            const newProfiles = [...state.profiles];
            newProfiles[state.profileEditId].details[action.payload.fieldName].value = action
                .payload
                .value
                .trim();
            return {
                ...state,
                editName: !state.editName,
                profiles: newProfiles
            }
        case TOGGLE_NAME_EDITOR:
            const newProfiles6 = [...state.profiles];
            newProfiles6[state.profileEditId].details[action.payload].edit = !newProfiles6[state.profileEditId].details[action.payload].edit;
            return {
                ...state,
                profiles: [...newProfiles6]
            }
        case EDIT_DROPDOWN:
            const newProfiles1 = [...state.profiles];
            const keys = Object.keys(action.payload);
            newProfiles1[state.profileEditId].details[keys[0]].value = action.payload[keys[0]];
            return {
                ...state,
                profiles: [...newProfiles1]
            }
        case ADD_DETAILS_ENTRY:
            const newProfiles2 = [...state.profiles];
            newProfiles2[state.profileEditId]
                .details[action.payload.ref]
                .value
                .unshift(action.payload.value.trim());
            return {
                ...state,
                profiles: newProfiles2
            }
        case REMOVE_DETAILS_ENTRY:
            const newProfiles3 = [...state.profiles];
            newProfiles3[state.profileEditId].details[action.payload.ref].value = state
                .profiles[action.payload.id]
                .details[action.payload.ref]
                .value
                .filter(data => data !== action.payload.item);
            return {
                ...state,
                profiles: newProfiles3
            }
        case SET_RANGE:
            const newProfiles4 = [...state.profiles]
            newProfiles4[state.profileEditId].details[action.payload.field].sliderValues.low = action.payload.low;
            newProfiles4[state.profileEditId].details[action.payload.field].sliderValues.high = action.payload.high;
            newProfiles4[state.profileEditId].details[action.payload.field].value = (action.payload.low === action.payload.high) ? action.payload.low : `${action.payload.low} - ${action.payload.high}`;
            return {
                ...state,
                profiles: newProfiles4
            }
        case TOGGLE_SLIDER:
            const newProfiles5 = [...state.profiles]
            const currentBool = newProfiles5[action.payload.index].details[action.payload.field].showSlider;
            newProfiles5[state.profileEditId].details[action.payload.field].showSlider = !currentBool;
            return {
                ...state,
                profiles: newProfiles5
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
        default:
            return state
    }
}

export class Provider extends Component {

    state = {
        editName: false,
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
        profiles: [
            {
                id: 0,
                img: "./img/doctor1.png",
                excludedInRightSideColumn: [
                    "expertise",
                    "surgicalLocations",
                    "officeLocations",
                    "name",
                    "suffix",
                    "apmAbbrev",
                    "partnerStatus",
                    "dob",
                    "age"
                ],
                details: {
                    name: {
                        name: "name",
                        value: "Kris C. Dodson",
                        edit: false,
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    suffix: {
                        name: "suffix",
                        value: "MD",
                        isTextEdit: true,
                        edit: false,
                        isList: false,
                        hasSlider: false
                    },
                    apmAbbrev: {
                        name: "APM Abbrev",
                        value: "CDOD",
                        isTextEdit: true,
                        edit: false,
                        isList: false,
                        hasSlider: false
                    },
                    partnerStatus: {
                        name: "Partner Status",
                        value: "Partner",
                        options: [
                            "Partner", "Associate"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    dob: {
                        name: "Date of birth",
                        value: "3/11/1977",
                        isTextEdit: true,
                        edit: false,
                        isList: false,
                        hasSlider: false
                    },
                    age: {
                        name: "Age",
                        value: "41",
                        isTextEdit: true,
                        edit: false,
                        isList: false,
                        hasSlider: false
                    },
                    patientAgeRange: {
                        name: 'Patient Age Range',
                        value: "12+",
                        isList: false,
                        hasSlider: true,
                        sliderValues: {
                            low: 12,
                            high: 100
                        },
                        showSlider: false
                    },
                    expertise: {
                        name: 'Expertise',
                        value: [
                            "AC Joint Seperation",
                            "Achilles Tendon Rupture",
                            "ACL",
                            "Athletic Injuries",
                            "Distal Bicep Tendon Tear/Rupture",
                            "Distal Tricep Tear",
                            "Elbow Epicondylitis",
                            "Elbow Lateral Ligament Tear",
                            "Exertional Compartment Syndrome",
                            "Hamstring Tear/Rupture",
                            "Loose Bodies",
                            "Loose Bodies in Elbow",
                            "Medial Meniscus Tear",
                            "Patellar Fracture",
                            "Pectoralis Major Rupture",
                            "Quad Tear/Rupture",
                            "Rotator Cuff Repair",
                            "Shoulder Dislocation",
                            "Shoulder Fracture",
                            "Shoulder Impingement",
                            "Shoulder Labrum Tear",
                            "Tommy John Surgery",
                            "Total Shoulder Replacement"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    patientExceptions: {
                        name: 'Patient Exceptions',
                        value: [
                            "NO Tibial Plateau Fractures", "NO Patella Fractures", "NO Elbow Fractures", "NO Elbow Replacements", "NO Knee Replacements"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    officeLocations: {
                        name: 'Office Locations',
                        value: [
                            "Center City", "Bryn Mawr"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    surgicalLocations: {
                        name: 'Surgical Locations',
                        value: [
                            "Bryn Mawr Hospital", "Vincera Surgery Center", "Riverview Surgical Center", "Brynmawr Surgical Center"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    workComp: {
                        name: 'Work Comp',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    auto: {
                        name: 'Auto',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    acuteInjuries: {
                        name: 'Acute Injuries',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    }
                }
            }, {
                id: 1,
                img: "./img/doctor2.png",
                excludedInRightSideColumn: [
                    "expertise",
                    "surgicalLocations",
                    "officeLocations",
                    "name",
                    "suffix",
                    "apmAbbrev",
                    "isPartner",
                    "dob",
                    "age"
                ],
                details: {
                    name: {
                        name: "name",
                        value: "Sarah G. Patterson",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    suffix: {
                        name: "suffix",
                        value: "MD",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    apmAbbrev: {
                        name: "APM Abbrev",
                        value: "CDOD",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    partnerStatus: {
                        name: "Partner Status",
                        value: "Partner",
                        options: [
                            "Partner", "Associate"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    dob: {
                        name: "Date of birth",
                        value: "3/11/1977",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    age: {
                        name: "Age",
                        value: "41",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    patientAgeRange: {
                        name: 'Patient Age Range',
                        value: "12+",
                        isList: false,
                        hasSlider: true,
                        sliderValues: {
                            low: 12,
                            high: 100
                        },
                        showSlider: false
                    },
                    expertise: {
                        name: 'Expertise',
                        value: [
                            "AC Joint Seperation",
                            "Achilles Tendon Rupture",
                            "ACL",
                            "Athletic Injuries",
                            "Distal Bicep Tendon Tear/Rupture",
                            "Distal Tricep Tear",
                            "Elbow Epicondylitis",
                            "Elbow Lateral Ligament Tear",
                            "Exertional Compartment Syndrome",
                            "Hamstring Tear/Rupture",
                            "Loose Bodies",
                            "Loose Bodies in Elbow",
                            "Medial Meniscus Tear",
                            "Patellar Fracture",
                            "Pectoralis Major Rupture",
                            "Quad Tear/Rupture",
                            "Rotator Cuff Repair",
                            "Shoulder Dislocation",
                            "Shoulder Fracture",
                            "Shoulder Impingement",
                            "Shoulder Labrum Tear",
                            "Tommy John Surgery",
                            "Total Shoulder Replacement"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    patientExceptions: {
                        name: 'Patient Exceptions',
                        value: [
                            "NO Tibial Plateau Fractures", "NO Patella Fractures", "NO Elbow Fractures", "NO Elbow Replacements", "NO Knee Replacements"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    officeLocations: {
                        name: 'Office Locations',
                        value: [
                            "Center City", "Bryn Mawr"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    surgicalLocations: {
                        name: 'Surgical Locations',
                        value: [
                            "Bryn Mawr Hospital", "Vincera Surgery Center", "Riverview Surgical Center", "Brynmawr Surgical Center"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    workComp: {
                        name: 'Work Comp',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    auto: {
                        name: 'Auto',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    acuteInjuries: {
                        name: 'Acute Injuries',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    }
                }
            }, {
                id: 2,
                img: "./img/doctor3.png",
                excludedInRightSideColumn: [
                    "expertise",
                    "surgicalLocations",
                    "officeLocations",
                    "name",
                    "suffix",
                    "apmAbbrev",
                    "isPartner",
                    "dob",
                    "age"
                ],
                details: {
                    name: {
                        name: "name",
                        value: "Anthany W. Rivers",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    suffix: {
                        name: "suffix",
                        value: "MD",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    apmAbbrev: {
                        name: "APM Abbrev",
                        value: "CDOD",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    partnerStatus: {
                        name: "Partner Status",
                        value: "Partner",
                        options: [
                            "Partner", "Associate"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    dob: {
                        name: "Date of birth",
                        value: "3/11/1977",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    age: {
                        name: "Age",
                        value: "41",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    patientAgeRange: {
                        name: 'Patient Age Range',
                        value: "12+",
                        isList: false,
                        hasSlider: true,
                        sliderValues: {
                            low: 12,
                            high: 100
                        },
                        showSlider: false
                    },
                    expertise: {
                        name: 'Expertise',
                        value: [
                            "AC Joint Seperation",
                            "Achilles Tendon Rupture",
                            "ACL",
                            "Athletic Injuries",
                            "Distal Bicep Tendon Tear/Rupture",
                            "Distal Tricep Tear",
                            "Elbow Epicondylitis",
                            "Elbow Lateral Ligament Tear",
                            "Exertional Compartment Syndrome",
                            "Hamstring Tear/Rupture",
                            "Loose Bodies",
                            "Loose Bodies in Elbow",
                            "Medial Meniscus Tear",
                            "Patellar Fracture",
                            "Pectoralis Major Rupture",
                            "Quad Tear/Rupture",
                            "Rotator Cuff Repair",
                            "Shoulder Dislocation",
                            "Shoulder Fracture",
                            "Shoulder Impingement",
                            "Shoulder Labrum Tear",
                            "Tommy John Surgery",
                            "Total Shoulder Replacement"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    patientExceptions: {
                        name: 'Patient Exceptions',
                        value: [
                            "NO Tibial Plateau Fractures", "NO Patella Fractures", "NO Elbow Fractures", "NO Elbow Replacements", "NO Knee Replacements"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    officeLocations: {
                        name: 'Office Locations',
                        value: [
                            "Center City", "Bryn Mawr"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    surgicalLocations: {
                        name: 'Surgical Locations',
                        value: [
                            "Bryn Mawr Hospital", "Vincera Surgery Center", "Riverview Surgical Center", "Brynmawr Surgical Center"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    workComp: {
                        name: 'Work Comp',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    auto: {
                        name: 'Auto',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    acuteInjuries: {
                        name: 'Acute Injuries',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    }
                }
            }, {
                id: 3,
                img: "./img/doctor4.png",
                excludedInRightSideColumn: [
                    "expertise",
                    "surgicalLocations",
                    "officeLocations",
                    "name",
                    "suffix",
                    "apmAbbrev",
                    "isPartner",
                    "dob",
                    "age"
                ],
                details: {
                    name: {
                        name: "name",
                        value: "Pam B. Jones",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    suffix: {
                        name: "suffix",
                        value: "MD",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    apmAbbrev: {
                        name: "APM Abbrev",
                        value: "CDOD",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    partnerStatus: {
                        name: "Partner Status",
                        value: "Partner",
                        options: [
                            "Partner", "Associate"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    dob: {
                        name: "Date of birth",
                        value: "3/11/1977",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    age: {
                        name: "Age",
                        value: "41",
                        isTextEdit: true,
                        isList: false,
                        hasSlider: false
                    },
                    patientAgeRange: {
                        name: 'Patient Age Range',
                        value: "12+",
                        isList: false,
                        hasSlider: true,
                        sliderValues: {
                            low: 12,
                            high: 100
                        },
                        showSlider: false
                    },
                    expertise: {
                        name: 'Expertise',
                        value: [
                            "AC Joint Seperation",
                            "Achilles Tendon Rupture",
                            "ACL",
                            "Athletic Injuries",
                            "Distal Bicep Tendon Tear/Rupture",
                            "Distal Tricep Tear",
                            "Elbow Epicondylitis",
                            "Elbow Lateral Ligament Tear",
                            "Exertional Compartment Syndrome",
                            "Hamstring Tear/Rupture",
                            "Loose Bodies",
                            "Loose Bodies in Elbow",
                            "Medial Meniscus Tear",
                            "Patellar Fracture",
                            "Pectoralis Major Rupture",
                            "Quad Tear/Rupture",
                            "Rotator Cuff Repair",
                            "Shoulder Dislocation",
                            "Shoulder Fracture",
                            "Shoulder Impingement",
                            "Shoulder Labrum Tear",
                            "Tommy John Surgery",
                            "Total Shoulder Replacement"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    patientExceptions: {
                        name: 'Patient Exceptions',
                        value: [
                            "NO Tibial Plateau Fractures", "NO Patella Fractures", "NO Elbow Fractures", "NO Elbow Replacements", "NO Knee Replacements"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    officeLocations: {
                        name: 'Office Locations',
                        value: [
                            "Center City", "Bryn Mawr"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    surgicalLocations: {
                        name: 'Surgical Locations',
                        value: [
                            "Bryn Mawr Hospital", "Vincera Surgery Center", "Riverview Surgical Center", "Brynmawr Surgical Center"
                        ],
                        isList: true,
                        hasSlider: false
                    },
                    workComp: {
                        name: 'Work Comp',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    auto: {
                        name: 'Auto',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    },
                    acuteInjuries: {
                        name: 'Acute Injuries',
                        value: "Yes",
                        options: [
                            "Yes", "No"
                        ],
                        isList: false,
                        hasSlider: false
                    }
                }
            }
        ],
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